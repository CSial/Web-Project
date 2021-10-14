const request = require('request')
// const url = "http://ipwhois.app/json/"
const url = "https://freegeoip.app/json/"


const serverGeoLoc = (req,res,next)=>{


    let ipToGeoLoc = new Map()
    let requestsAnswered = 0;
    let allRequestsAnswered = false;


    for(let i=0; i<req.body.entries.length; i++){
        if(req.body.entries[i].serverIPAddress !== ""){
           
            console.log(`Entry ${i} has normal serverIPAddress`)
            let fullUrl = url.concat(req.body.entries[i].serverIPAddress);
            
            request({
                url: fullUrl,
                json: true
            }, function (error, response, body) {
            
                if (!error && response.statusCode === 200) {
                    ipToGeoLoc.set(body.ip, {
                        latitude: body.latitude,
                        longitude: body.longitude
                    })

                    requestsAnswered++;
                    console.log(`Normal IP--> Requests answered: ${requestsAnswered}`)
                    if(requestsAnswered === req.body.entries.length) allRequestsAnswered = true;
                    if(allRequestsAnswered){
                        console.log("All requests answered (normal serverIPAddress)")
                        req.ipToGeoLoc = ipToGeoLoc;
                        next();
                    }
                }
            });

        }else{
            console.log(`Entry ${i} has 0 serverIPAddress`)
            ipToGeoLoc.set("", {
                latitude: "",
                longitude: ""
            })
            requestsAnswered++;
            console.log(`0 IP--> Requests answered: ${requestsAnswered}`)
            if(requestsAnswered === req.body.entries.length) allRequestsAnswered = true;
            if(allRequestsAnswered){
                console.log("All requests answered (normal serverIPAddress)")
                req.ipToGeoLoc = ipToGeoLoc;
                next();
            }
        }
    } 
}

module.exports = {serverGeoLoc}