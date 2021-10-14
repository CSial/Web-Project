const request = require('request')
const url = "http://ipwhois.app/json/"

const userGeoLoc = async (req,res,next)=>{

    const fullUrl = url.concat(req.body.userIP);

    request({
        url: fullUrl,
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {

            req.isp = body.isp
            req.userLatitude = body.latitude
            req.userLongitude = body.longitude
            next();
        }
    });
}

module.exports = {userGeoLoc}