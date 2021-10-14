import {Link} from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import "../App.css";
import {useParams, useHistory} from 'react-router-dom'

import "../styles/Adminmain.css";
import "../styles/AdminChart.css";
import {Bar, Line} from 'react-chartjs-2';


function AdminTtlChart(props){
    
      const[chartData, setChartData] = useState([]);
     
      let history = useHistory();
        
       const chartC = async()=>{
          let createdA = [];
          let ageH = [];
          let ageI = [];
          let ageC = [];
          let ageJ = [];

          axios.get('http://localhost:3001/adminchart/')
          .then(response=>{
             for(const  dataObj of response.data){ 
                 if(dataObj.content_type==="text/html; charset=UTF-8"){
                   ageH.push((dataObj.cache_control))
                   createdA.push(dataObj.createdAt)
                 }
                //  }else if(dataObj.content_type==="image/jpeg"){
                //     waitI.push(parseInt(dataObj.wait))
                //     createdA.push(dataObj.createdAt)
                // }else if(dataObj.content_type==="text/css"){
                //     waitC.push(parseInt(dataObj.wait))
                //     createdA.push(dataObj.createdAt)
                // }else if(dataObj.content_type==="text/javascript"){
                //     waitJ.push(parseInt(dataObj.wait))
                //     createdA.push(dataObj.createdAt)
                // }
              console.log(ageH)
                
              
            }
            setChartData({
                labels: ageH,
                datasets:[
                    {
                        label: "Html",
                        data: ageH.length,
                        backgroundColor: [
                            'rgba(0,0,128,0.8)',
                            
                        ],
                        borderColor: [
                            
                            'rgba(54, 162, 235, 1)',
                            
                        ],
                        borderWidth: 1
                    }
                    // {
                    //     label: "Image",
                    //     data: waitI,
                    //     backgroundColor: [
                            
                    //         'rgba(0,0,128,0.7)',
                            
                    //     ],
                    //     borderColor: [
                    //         'rgba(255, 99, 132, 1)',
                            
                    //     ],
                    //     borderWidth: 1
                    // },
                    // {
                    //     label: "Css",
                    //     data: waitC,
                    //     backgroundColor: [
                            
                    //         'rgba(0,0,128,0.6)',
                    //     ], 
                    //     borderColor: [
                    //         'rgba(255, 99, 132, 1)'
                            
                    //     ],
                    //     borderWidth: 1
                    // },
                    
                   
                    // {
                    //     label: "Javascript",
                    //     data: waitJ,
                    //     backgroundColor: [
                           
                    //         'rgba(128,0,128, 0.7)'
                    //     ],
                    //     borderColor: [
                            
                    //         'rgba(255, 159, 64, 1)'
                    //     ],
                    //     borderWidth: 1
                    // }
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
         <button onClick={ () => props.handleClick('ttl')}>TTL Chart</button> 
         
            <Bar
                  data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text: "Chart per Isp",
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
               


export default AdminTtlChart;
