const express = require("express");
const router = express.Router();
const { entries } = require("../models");
const {Op, sequelize} = require('sequelize')

router.get("/", async(req,res)=>{
  
  let alreadyCheckedObjArray = [];
  let waitInfo = await entries.findAll({attributes: ['content_type','wait','createdAt','isp','method','cache_control'],
  where:{
    wait:{[Op.not]:""},
    cache_control:{[Op.not]:""}
  }
  });

  const alreadyChecked = (queryEntry)=>{
    let checkBool = false;
    for(let i=0; i<alreadyCheckedObjArray.length; i++){
      if(queryEntry.content_type === alreadyCheckedObjArray[i].content_type){
        if(queryEntry.wait === alreadyCheckedObjArray[i].wait){
          if(queryEntry.createdAT=== alreadyCheckedObjArray[i].createdAt){
            if(queryEntry.isp===alreadyCheckedObjArray[i].isp){
              if(queryEntry.method===alreadyCheckedObjArray[i].method){
                if(queryEntry.chache_control===alreadyCheckedObjArray[i].cache_control){
                  checkBool = true;
                  alreadyCheckedObjArray[i].count++
                }
              }
            }
          }
        }
      }
    }
    return checkBool;
  }
   
  const waitInfoComplete=()=>{
    return waitInfo.map((entry)=>{
      if(alreadyChecked(entry)){
        //
      }else{
        let alreadyCheckedObj={
          content_type: "",
          wait:"",
          createdAt:"",
          isp:"",
          method:"",
          cache_control:"",
          count:1
        };
        alreadyCheckedObj.content_type = entry.content_type;
        alreadyCheckedObj.wait = entry.wait;
        alreadyCheckedObj.createdAt = entry.createdAt;
        alreadyCheckedObj.isp = entry.isp;
        alreadyCheckedObj.method = entry.method;
        alreadyCheckedObj.cache_control = entry.cache_control;
        alreadyCheckedObjArray.push(alreadyCheckedObj);
      }
    })
  }
  
  waitInfoComplete()
  res.json(alreadyCheckedObjArray)
})

module.exports = router;