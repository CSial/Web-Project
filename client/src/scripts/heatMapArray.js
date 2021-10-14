import HeatmapLayer from "react-leaflet-heatmap-layer";

function arrayfy(heatMapData){
    var heatArray = [];
    // var ipAddressHeat = [];

    // console.log("inside arrayfy")
    // console.log(heatMapData[0]);

    for(var i=0; i<heatMapData.length; i++){
   
        console.log(heatMapData[i].serverIPAddress)
        if(heatMapData[i].serverIPAddress !== ""){
            const existData = alreadyExists({
                lat:heatMapData[i].serverLatitude,
                long: heatMapData[i].serverLongitude, 
                array:heatArray})
            if(existData.exists){
               heatArray[existData.index][2]= heatArray[existData.index][2]+1;
            }else{ 
                var nestedArray = [heatMapData[i].serverLatitude,heatMapData[i].serverLongitude,1]
                heatArray.push(nestedArray)
            }
        }    
    }
    return heatArray;
}

function alreadyExists(obj){
    
    var found = false;
    for(var i=0; i<obj.array.length; i++){
        if(obj.array[i][0]===obj.lat && obj.array[i][1]===obj.long){
            found = true;
            return {exists: true, index: i};    
        }
    }
    if(!found){
        return {exists: false}
    }

    
}
    


export default arrayfy