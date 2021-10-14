import {Link, Switch, Route} from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import "../App.css";
import {useParams, useHistory} from 'react-router-dom'
import "../styles/Adminmain.css";
import "../styles/AdminHeader.css";
import AdminTtlChart from "../components/AdminTtlChart.js"

function adminheader(props){
    let history = useHistory();
    const [chart, setChart] = useState('select')

    const handleClick = (chartState) =>{
        setChart(chartState)
    }
    return(
        <div className ="adminmain" >
            
           
             <div className="col-md-12 text-center">
             <div className="btn-group" role="group" aria-label="Welcome Back Admin, {props.state.username}">
                <Link to="/admininfo">
                    <button type="button" className="btn btn-secondary">Basic Information</button>
                </Link>
                <Link to="/adminresponse">
                   <button type="button" className="btn btn-secondary">Response Time</button>
                </Link>
                <Link to="/adminheader">
                <button type="button" className="btn btn-secondary">Header Analysis</button>
                </Link>
                <Link to="/adminvizualize">
                <button type="button" className="btn btn-secondary">Vizualize Data</button>
                </Link>
                {(()=>{
                  switch(chart){
                      case 'ttl':
                          return <AdminTtlChart handleClick={handleClick}/>
                    //   case 'isp':
                    //       return <AdminIspChart handleClick ={handleClick}/>
                    //   case 'method':
                    //       return <AdminMethodChart handleClick={handleClick}/> 
                    //   case 'day':
                    //         return <AdminDayChart handleClick={handleClick}/>     
                      default:
                        return <AdminTtlChart handleClick={handleClick}/>          
                  }
              })()}
                
                
                </div>
            
           </div> 
        </div>
    );
}
               


export default adminheader;