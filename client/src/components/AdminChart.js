import React, {useState, useEffect} from "react";
import "../styles/AdminChart.css";
import {
  
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

import arraych from '../scripts/waitDataArray'

function AdminChart(props){
  const dataW= arraych(props.waitChartData)
  
  





  //  var x = ["1","2","3", "4","5","6","7","8","9","10","11","12","13","14","15","16","17",
  // "18","19","20","21","22","23","24" ]
  // get day from createdAt with getDay() and hour with getHours()
    


    return(
      <div style={{ textAlign: "center" }}>
      <h1>histogram go brrr</h1>
      <div className="App">
       
        <BarChart
          width={500}
          height={300}
          data={dataW}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="Time"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="createdAt" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        
      </div>
    </div>
  
      
  )
}

export default AdminChart;