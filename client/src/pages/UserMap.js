import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import "../App.css";
import "../styles/Adminmain.css";
import Map from "../components/UserMap.js"
import {useParams, useHistory} from 'react-router-dom'

function UserMap(props){

    const [userEntries, setUserEntries] = useState([])

    useEffect( () => {
        axios.get(`http://localhost:3001/usermap/byuserId/${props.state.userID}`).then((response)=>{
            setUserEntries(response.data)
            // console.log(response.data)
        }) 
      }, [])
    
    let history = useHistory();
    
    return(
        <div className ="usermain" >
            {/* <h1>For some (CSS) reason this is not rendered and what's underneath is.</h1> */}
            {/* <h5> Welcome Back, {props.state.username} </h5>  */}
            <div className="col-md-12 text-center">
                <div className="btn-group" role="group" aria-label="Welcome Back, {props.state.username}">
                    <Link to="/editprofile">
                        <button type="button" className="btn btn-secondary">Edit Profile</button>
                    </Link>
                    <Link to="/upload">
                    <button type="button" className="btn btn-secondary">Upload Data</button>
                    </Link>
                    <Link to="/usermap">
                    <button type="button" className="btn btn-secondary">Visualize Data</button>
                    </Link>
                </div>
                <Map {...props} heatmapData={userEntries}/>
                
            </div> 
        </div>
    );
}

export default UserMap;