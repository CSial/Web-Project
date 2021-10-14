function arrayli(lineMapData){
    var lineArray = [];

    for(var i=0; i<lineMapData.length; i++){
        console.log(lineMapData[i].userIPAdrress)
            if(lineMapData[i].userIPAdress !==""){
                const existData = alreadyExists({
                    uIP: lineMapData[i].userIPAddress,
                    uLat:lineMapData[i].userLatitude,
                    uLong: lineMapData[i].userLongitude,
                    sIP: lineMapData[i].serverIPAdress,
                    sLat:lineMapData[i].serverLatitude,
                    sLong: lineMapData[i].serverLongitute,
                    array:lineArray
                })
                if(existData.exists){
                    lineArray[existData.index][6]=lineArray[existData.index][6]+1;

                }else{
                    var nestedArray = [lineMapData[i].userIPAddress,lineMapData[i].userLatitude,lineMapData[i].serverIPAddress, lineMapData[i].userLongitude, lineMapData[i].serverLatitude, lineMapData[i].serverLongitude,1]
                    lineArray.push(nestedArray)
                }
            }
        }
        return lineArray;
    }
    function alreadyExists(obj){
        
        var found = false;
        for(var i=0; i<obj.array.length; i++){
            if(obj.array[i][1]===obj.lat && obj.array[i][2]===obj.long){
                found = true;
                return {exists: true, index: i};    
            }
        }
        if(!found){
            return {exists: false}
        }
}

export default arrayli