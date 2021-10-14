import {Link} from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import "../App.css";
import {useParams, useHistory} from 'react-router-dom'

import "../styles/Adminmain.css";
import "../styles/AdminChart.css";
import {Bar, Line} from 'react-chartjs-2';


function AdminContentChart(props){
    
      const[chartData, setChartData] = useState([]);
     
      let history = useHistory();
        
       const chartC = async()=>{
          let createdA = [];
          let waitH = [];
          let waitI = [];
          let waitC = [];
          let waitJ = [];

          axios.get('http://localhost:3001/adminchart/')
          .then(response=>{
             for(const  dataObj of response.data){ 
                 if(dataObj.content_type==="text/html; charset=UTF-8"){
                   waitH.push(parseInt(dataObj.wait))
                   createdA.push(dataObj.createdAt)
                 }else if(dataObj.content_type==="image/jpeg"){
                    waitI.push(parseInt(dataObj.wait))
                    createdA.push(dataObj.createdAt)
                }else if(dataObj.content_type==="text/css"){
                    waitC.push(parseInt(dataObj.wait))
                    createdA.push(dataObj.createdAt)
                }else if(dataObj.content_type==="text/javascript"){
                    waitJ.push(parseInt(dataObj.wait))
                    createdA.push(dataObj.createdAt)
                }
              
                
              
            }
            setChartData({
                labels: [
                    "00:00-00:59",
                    "01:00-01:59",
                    "02:00-02:59",
                    "03:00-03:59",
                    "04:00-04:59",
                    "05:00-05:59",
                    "06:00-06:59",
                    "07:00-07:59",
                    "08:00-08:59",
                    "09:00-09:59",
                    "10:00-10:59",
                    "11:00-11:59",
                    "12:00-12:59",
                    "13:00-13:59",
                    "14:00-14:59",
                    "15:00-15:59",
                    "16:00-16:59",
                    "17:00-17:59",
                    "18:00-18:59",
                    "19:00-19:59",
                    "20:00-20:59",
                    "21:00-21:59",
                    "22:00-22:59",
                    "23:00-23:59",
                  ],
                datasets:[
                    {
                        label: "Html",
                        data: waitH,
                        backgroundColor: [
                            'rgba(0,0,128,0.8)',
                            
                        ],
                        borderColor: [
                            
                            'rgba(54, 162, 235, 1)',
                            
                        ],
                        borderWidth: 1
                    },
                    {
                        label: "Image",
                        data: waitI,
                        backgroundColor: [
                            
                            'rgba(0,0,128,0.7)',
                            
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            
                        ],
                        borderWidth: 1
                    },
                    {
                        label: "Css",
                        data: waitC,
                        backgroundColor: [
                            
                            'rgba(0,0,128,0.6)',
                        ], 
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                            
                        ],
                        borderWidth: 1
                    },
                    
                   
                    {
                        label: "Javascript",
                        data: waitJ,
                        backgroundColor: [
                           
                            'rgba(128,0,128, 0.7)'
                        ],
                        borderColor: [
                            
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            })
          })
          .catch(err=>{
              console.log(err);
          });
        //   console.log(waitA)

      }
      useEffect(()=>{
          chartC();
      },[])
      
    

    
    

    return(
        <div className ="adminmain" >
            
         <div className="test">
         <button onClick={ () => props.handleClick('content')}>Content Type Chart</button> 
         <button onClick={ () => props.handleClick('isp')}>ISP Chart</button> 
         <button onClick={ () => props.handleClick('method')}>Http Method Chart</button> 
         <button onClick={ () => props.handleClick('day')}>Day Chart</button>
            <Bar
                  data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text: "Response time per hour",
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        },
                        scales: {
                            yAxes: [
                              {
                                ticks: {
                                  autoSkip: true,
                                  maxTicksLimit: 50,
                                  beginAtZero: true
                                },
                                gridLines: {
                                  display: false
                                }
                              }
                            ],
                            xAxes: [
                              {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 24,
                                    beginAtZero: true
                                  },
                                gridLines: {
                                  display: false
                                }
                            }]
                        }
                    }}
                /> 

                 </div>
                 </div>
            
         
        
    );
}
               


export default AdminContentChart;