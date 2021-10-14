const {verify} = require('jsonwebtoken') 

const validateToken = (req,res,next) => {

    const accessToken = req.header("accessToken");
    if (!accessToken){
        res.json({loggedInStatus: false})
        console.log("!accesToken")
    }
    try{
        const validToken = verify(accessToken,"Gh5HQXhGBWs24fpAIRmAbn0TELM4");
        req.user = validToken;
        if(validToken){
            return next(); 
        }
    }catch(err){
        return res.json(err)
    }
}

module.exports = {validateToken}