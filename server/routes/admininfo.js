const express = require("express");
const router = express.Router();
const { users} = require("../models");
const { entries } = require("../models");
const { validateToken } = require('../middleware/auth')
const _ = require("underscore");
const lodash = require("lodash");
const {Op, sequelize} = require('sequelize')

router.get("/byTotalUsers/:role", async (req, res)=>{
  const totalUsers = await users.findAll({
    where: {role:"user"}
  });
  res.json({numberOfUsers: totalUsers.length});
})

router.get("/", async(req,res)=>{
  let totalIsp = await entries.findAll({attributes: ['isp']});
  let UniqueIsp = lodash.uniqWith(totalIsp, lodash.isEqual);
  
  let totalUrl = await entries.findAll({attributes: ['url']});
  let UniqueUrl = lodash.uniqWith(totalUrl, lodash.isEqual);

  let totalGet = await entries.findAll({attributes:['method'], where:{method: 'GET'}});
  let totalPost = await entries.findAll({attributes:['method'], where:{method: 'POST'}});
  let totalOptions = await entries.findAll({attributes:['method'], where:{method: 'OPTIONS'}}); 

  let total0 = await entries.findAll({attributes:['status'], where:{status: 0 }});
  let total200 = await entries.findAll({attributes:['status'], where:{status: 200 }});
  let total204 = await entries.findAll({attributes:['status'], where:{status: 204 }});
  let total206 = await entries.findAll({attributes:['status'], where:{status: 206 }});
  let total302 = await entries.findAll({attributes:['status'], where:{status: 302 }});
  let total307 = await entries.findAll({attributes:['status'], where:{status: 307 }});
  let total404 = await entries.findAll({attributes:['status'], where:{status: 404 }});

  let totalFont = await entries.findAll({attributes:['content_type',[entries.sequelize.fn('AVG',entries.sequelize.col('age')), "avgAge"]], 
  where: {
    content_type:{
      [Op.startsWith]:'font'
    }
  }});
  let avgFontAge = totalFont[0].dataValues.avgAge

  let totalText = await entries.findAll({attributes:['content_type',[entries.sequelize.fn('AVG',entries.sequelize.col('age')), "avgAge"]], 
  where: {
    content_type:{
      [Op.startsWith]:'text'
    }
  }});
  let avgTextAge = totalText[0].dataValues.avgAge

  let totalImage = await entries.findAll({attributes:['content_type',[entries.sequelize.fn('AVG',entries.sequelize.col('age')), "avgAge"]], 
  where: {
    content_type:{
      [Op.startsWith]:'image'
    }
  }});
  let avgImgAge = totalImage[0].dataValues.avgAge

  let totalJS = await entries.findAll({attributes:['content_type',[entries.sequelize.fn('AVG',entries.sequelize.col('age')), "avgAge"]], 
  where: {
    content_type:{
      [Op.or]:['application/javascript','application/javascript; charset=utf-8','application/x-javascript','application/x-javascript; charset=utf-8']
    }
  }});
  let avgJSAge = totalJS[0].dataValues.avgAge

  let totalHtml = await entries.findAll({attributes:['content_type',[entries.sequelize.fn('AVG',entries.sequelize.col('age')), "avgAge"]], 
  where: {
    content_type:{
      [Op.startsWith]:'text/html'
    }
  }});
  let avgHtmlAge = totalHtml[0].dataValues.avgAge

  let totalCSS = await entries.findAll({attributes:['content_type',[entries.sequelize.fn('AVG',entries.sequelize.col('age')), "avgAge"]], 
  where: {
    content_type:{
      [Op.startsWith]:'text/css'
    }
  }});
  let avgCSSAge = totalCSS[0].dataValues.avgAge

  let totalVideo = await entries.findAll({attributes:['content_type',[entries.sequelize.fn('AVG',entries.sequelize.col('age')), "avgAge"]], 
  where: {
    content_type:{
      [Op.startsWith]:'video'
    }
  }});
  let avgVideoAge = totalVideo[0].dataValues.avgAge


 
  res.json({numberOfIsp: UniqueIsp.length, 
    numberOfUrl: UniqueUrl.length,

    numberOfGet: totalGet.length,
    numberOfPost: totalPost.length,
    numberOfOptions: totalOptions.length,

    numberOf0: total0.length,
    numberOf200: total200.length,
    numberOf204: total204.length,
    numberOf206: total206.length,
    numberOf302: total302.length,
    numberOf307: total307.length,
    numberOf404: total404.length,

    numberOfFont: avgFontAge,
    numberOfText: avgTextAge,
    numberOfImage: avgImgAge,
    numberOfJS: avgJSAge,
    numberOfHtml: avgHtmlAge,
    numberOfVideo: avgVideoAge,
    numberOfCSS: avgCSSAge

  });
})



  
 
  
  





    
module.exports = router;