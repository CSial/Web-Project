const express = require("express");
const router = express.Router();
const {entries} = require("../models");
const whois = require('whois-json');
const { userGeoLoc } = require('../middleware/analyzeUserIP')
const { serverGeoLoc } = require('../middleware/analyzeServerIP')

router.post("/", userGeoLoc, serverGeoLoc, async (req,res)=>{

  let loopsDone = 0;
  let allLoopsDone = false;

  for(let i=0; i<req.body.entries.length; i++){
    await entries.create({
      userIPAddress: req.body.userIP,
      userLatitude: req.userLatitude,
      userLongitude: req.userLongitude,
      isp: req.isp,
      serverIPAddress: req.body.entries[i].serverIPAddress,
      serverLatitude: req.ipToGeoLoc.get(req.body.entries[i].serverIPAddress).latitude,
      serverLongitude: req.ipToGeoLoc.get(req.body.entries[i].serverIPAddress).longitude,
      wait: req.body.entries[i].wait,
      startedDateTime: req.body.entries[i].startedDateTime,
      method:req.body.entries[i].method,
      url: req.body.entries[i].url,
      status: req.body.entries[i].status,
      statusText: req.body.entries[i].statusText,
      age: req.body.entries[i].age,
      expires: req.body.entries[i].expires,
      last_modified: req.body.entries[i].last_modified,
      content_type: req.body.entries[i].content_type,
      cache_control: req.body.entries[i].cache_control,
      pragma: req.body.entries[i].pragma,
      host: req.body.entries[i].host,
      userId: req.body.userID
    }).then(()=>{
        console.log(`Entry ${i+1} created!`)
        loopsDone++;
        if(loopsDone === req.body.entries.length) allLoopsDone = true;
      });
  }
  if(allLoopsDone){
    res.json({message: "Uploaded to server successfully!"})
  }

});

module.exports = router;