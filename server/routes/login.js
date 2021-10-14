const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require('bcryptjs');
const {sign} = require('jsonwebtoken')
const { validateToken } = require('../middleware/auth')

router.get("/auth", validateToken, async (req, res) => {
  res.json({
     loggedInStatus: true,
     username: req.user.username,
     role: req.user.role, 
     userID: req.user.id
  }); 
});

router.post("/", async (req, res) => {

  const {email, password} = req.body;

  const user = await users.findOne(({ where: { email: email } }));
  if(user === null) {
    res.json({message: `No user with email: ${email}`});
  }
  else{
    bcrypt.compare(password, user.password).then((match) => {
      if(!match){
        res.json({message: "Incorrect password!"});
      }else{
        const accessToken = sign({ username : user.username, id : user.id, role: user.role},"Gh5HQXhGBWs24fpAIRmAbn0TELM4");
        res.json({
          username: user.username, 
          role: user.role, 
          userID: user.id, 
          loggedInStatus: true, 
          token: accessToken
        });
      }
    });
  }
});

module.exports = router;