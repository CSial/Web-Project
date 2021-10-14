import {Link, Switch, Route} from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import "../App.css";
import {useParams, useHistory} from 'react-router-dom'
import AdminContentChart from "../components/AdminContentChart.js";
import AdminIspChart from "../components/AdminIspChart.js";
import AdminMethodChart from "../components/AdminMethodChart.js";
import AdminDayChart from "../components/AdminDayChart.js";
import "../styles/Adminmain.css";


function adminresponse(props){
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
                </div>
              {(()=>{
                  switch(chart){
                      case 'content':
                          return <AdminContentChart handleClick={handleClick}/>
                      case 'isp':
                          return <AdminIspChart handleClick ={handleClick}/>
                      case 'method':
                          return <AdminMethodChart handleClick={handleClick}/> 
                      case 'day':
                            return <AdminDayChart handleClick={handleClick}/>     
                      default:
                        return <AdminContentChart handleClick={handleClick}/>          
                  }
              })()}
                
                
                
           </div> 
        </div>
    );
}
               


export default adminresponse;