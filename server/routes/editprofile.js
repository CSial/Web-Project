const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require('bcryptjs');
const {sign} = require('jsonwebtoken')
const { validateToken } = require('../middleware/auth')
const { entries } = require("../models");

router.put("/", validateToken, async (req, res) => {
  
  let { newUsername, oldPassword, newPassword } = req.body;
  let user = await users.findOne({ where: { username: req.user.username } });

  if(newUsername !== "") {
    user.update(
        { username: newUsername },
        { where: { username: req.user.username } }
      );
      const accessToken = sign({ username : newUsername, id : user.id, role: user.role},"Gh5HQXhGBWs24fpAIRmAbn0TELM4");
      res.json({
        username: user.username, 
        role: user.role, 
        userID: user.id, 
        loggedInStatus: true, 
        token: accessToken
      });
    }

  if(newPassword && oldPassword) {   
    bcrypt.compare(oldPassword, user.password).then(async (match) => {
      if(!match)  {
        res.json({ error: "Wrong Password Entered!" });
      }else{
        bcrypt.hash(newPassword, 10).then((hash) => {
          user.update(
            { password: hash },
            { where: { username: req.user.username } }
          );
          res.json({
            username: user.username, 
            role: user.role, 
            userID: user.id, 
            loggedInStatus: true, 
            token: validateToken.accessToken
          });
        });
      }
    });
    console.log("trying to change password")
  }
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const userEntries = await entries.findAll({where: {userId: id}});
  const lastEntry = await entries.findOne({where: { userId: id }, order: [ [ 'createdAt', 'DESC' ]],});
  res.json({numberOfEntries: userEntries.length, lastEntryDate: lastEntry.createdAt});
});

module.exports = router;