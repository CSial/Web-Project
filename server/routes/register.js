const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require('bcryptjs');

router.post("/", async (req,res)=>{

  const {username, email, password, role} = req.body;

  const emailAlreadyExists = await users.findOne(({ where: { email: req.body.email } }));

  if(!emailAlreadyExists){
    bcrypt.hash(password, 10).then((hash) =>{
      users.create({
        username: username,
        password: hash,
        email: email,
        role: role
      });
      res.json(
      {
        message:"Registration completed!",
        registerDone:true
      });
    });    
  }else{
    res.json(
    {
      message:"Email already exists. Try another one.",
      registerDone: false
    });
  }
});

module.exports = router;