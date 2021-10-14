import {Link} from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import "../App.css";
import {useParams, useHistory} from 'react-router-dom'
import "../styles/Adminmain.css";
// import "../styles/AdminMap.css"


import MapChart from "../components/AdminMap.js"

function adminvizualize(props){
    const [locationInfo, setlocationInfo] = useState([])

    useEffect( () => {
        axios.get(`http://localhost:3001/adminmap/`).then((response)=>{
            setlocationInfo(response.data)
            // console.log(response.data)
        }) 
      }, [])
    
    let history = useHistory();

    return(
        <div className ="adminmain" >
            {console.log(locationInfo)}
            {/* <h1> Welcome Back Admin, {props.state.username} </h1> */}
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
                <div class="map">
                  <MapChart {...props} lineMapData={locationInfo}/>
                </div> 
           </div>
        </div>
    );
}
               


export default adminvizualize;