const express = require("express");
const router = express.Router();
const { entries } = require("../models");
const { validateToken } = require('../middleware/auth')
const {Op, sequelize} = require('sequelize')


router.get("/", async (req, res)=>{
  
  let alreadyCheckedObjArray = [];
  let locationInfo = await entries.findAll({attributes: ['userLatitude', 'userLongitude', 'serverLatitude','serverLongitude'], 
  where:{
    serverLongitude:{[Op.not]: ""},
    serverLatitude:{[Op.not]: ""}
  }});
  
  const alreadyChecked = (queryEntry) =>{
    let checkBool = false;
    for(let i=0; i<alreadyCheckedObjArray.length; i++){
      if(queryEntry.userLatitude === alreadyCheckedObjArray[i].userLatitude){
        if(queryEntry.userLongitude === alreadyCheckedObjArray[i].userLongitude){
          if(queryEntry.serverLatitude === alreadyCheckedObjArray[i].serverLatitude){
            if(queryEntry.serverLongitude === alreadyCheckedObjArray[i].serverLongitude){
              checkBool = true;
              alreadyCheckedObjArray[i].count++
            }
          }
        }
      }
    }
    return checkBool;
  }

  const locationInfoComplete =() => {
    return locationInfo.map((entry) => {
      if(alreadyChecked(entry)){
        // entry.count++;
      }else{
        let alreadyCheckedObj = {
          userLatitude:"",
          userLongitude:"",
          serverLatitude:"",
          serverLongitude:"",
          count: 1
        };
        alreadyCheckedObj.userLatitude = entry.userLatitude;
        alreadyCheckedObj.userLongitude = entry.userLongitude;
        alreadyCheckedObj.serverLatitude = entry.serverLatitude;
        alreadyCheckedObj.serverLongitude = entry.serverLongitude;
        alreadyCheckedObjArray.push(alreadyCheckedObj);
      }
    }) 
  }
  locationInfoComplete()
  res.json(alreadyCheckedObjArray)
})
    
module.exports = router;