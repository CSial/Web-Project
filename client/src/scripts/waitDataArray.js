function arraych(waitChartData){
    var chartArray = [];

    for(var i=0;i<waitChartData.length;i++){
        console.log(waitChartData[i].wait)
        if(waitChartData[i].wait !==""){
            const existData = alreadyExists({
                cT: waitChartData[i].content_type,
                wT: waitChartData[i].wait,
                cA: waitChartData[i].createdAt,
                mH: waitChartData[i].method,
                iN: waitChartData[i].isp,
                array: chartArray 
            })
            if(existData.exists){
               chartArray[existData.index][5]=chartArray[existData.index][5]+1;

            }else{
                var nestedArray = [waitChartData[i].content_type, waitChartData[i].wait, waitChartData[i].createdAt, waitChartData[i].method, waitChartData[i].isp,1]
                chartArray.push(nestedArray)
            }
        }
    }
    return chartArray;

}

function alreadyExists(obj){
    var found = false;
    for(var i=0; i<obj.array.length; i++){
        if(obj.array[i][1]=obj.content && obj.array[i][2]===obj.wait){
            found = true;
            return{exists:true, index:i}
        }
        if(!found){
            return{ exists:false}
        }
    }
}

export default arraych