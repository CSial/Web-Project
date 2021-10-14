import {Link} from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import "../App.css";
import "../styles/Adminmain.css";
import {useParams, useHistory} from 'react-router-dom'

function admininfo(props){

    let history = useHistory();
    const [totalUsers, setTotalUsers] = useState();

    const [totalIsp, setTotalIsp] = useState();

    const [totalUrl, setTotalUrl] = useState();
    
    const [totalGet, setTotalGet] = useState();
    const [totalPost, setTotalPost] = useState();
    const [totalOptions, setTotalOptions] = useState();
    
    const [total0, setTotal0] = useState();
    const [total200, setTotal200] = useState();
    const [total204, setTotal204] = useState();
    const [total206, setTotal206] = useState();
    const [total302, setTotal302] = useState();
    const [total307, setTotal307] = useState();
    const [total404, setTotal404] = useState();

    const [totalFont, setTotalFont] = useState();
    const [totalText, setTotalText] = useState();
    const [totalJS, setTotalJS] = useState();
    
    const [totalCSS, setTotalCSS] = useState();
    const [totalVideo, setTotalVideo] = useState();
    
    const [totalImage, setTotalImage] = useState();
    const [totalHtml, setTotalHtml] = useState();


    useEffect( ()=>{
        axios.get('http://localhost:3001/admininfo/byTotalUsers/${props.state.userRole}').then((response)=>{
            setTotalUsers(response.data.numberOfUsers)
        })
    },[])

    useEffect(()=>{
        axios.get('http://localhost:3001/admininfo/').then((response)=>{
            setTotalIsp(response.data.numberOfIsp)

            setTotalUrl(response.data.numberOfUrl)

            setTotalGet(response.data.numberOfGet)
            setTotalPost(response.data.numberOfPost)
            setTotalOptions(response.data.numberOfOptions)

            setTotal0(response.data.numberOf0)
            setTotal200(response.data.numberOf200)
            setTotal204(response.data.numberOf204)
            setTotal206(response.data.numberOf206)
            setTotal302(response.data.numberOf302)
            setTotal307(response.data.numberOf307)
            setTotal404(response.data.numberOf404)

            setTotalFont(response.data.numberOfFont)
            setTotalJS(response.data.numberOfJS)
            
            setTotalImage(response.data.numberOfImage)
            
            setTotalText(response.data.numberOfText)
            setTotalVideo(response.data.numberOfVideo)
            setTotalCSS(response.data.numberOfCSS)
            setTotalHtml(response.data.numberOfHtml)
            
        })
    },[])

    
    return(
        <div className ="adminmain" >
            <div class="scroll">
            {/* <h1> Welcome Back Admin, {props.state.username} </h1> */}
             <div className="col-md-12 text-center">
             <div className="btn-group" role="group" aria-label="a">
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
                </div>
            <h1>Basic Information</h1>
            <p class="groove">
            <table className="status" styles="float: left">
                <tr>
                    <th>Total Users</th>
                </tr>
                <tr>
                    <td>{totalUsers}</td>
                </tr>
            </table>

            <table className="status" styles="float: left">
                <tr>
                    <th>Unique Domains</th>
                
                </tr>
                <tr>
                    
                    <td>{totalUrl}</td>
                </tr>
            </table>

            <table className="status" styles="float: left">
                <tr>
                    <th>Unique ISPs</th>
                </tr>
                <tr>
                    <td>{totalIsp}</td>
                </tr>
            </table>
             

            <table className="status" styles="float: left">           
            <tr>
            
                   <th colSpan="2">Entries per method</th> 
                   {/* <th>method</th> */}
            </tr>
            <tr>       
                   <th>POST</th>
                   <td>{totalPost}</td>
                   
            </tr>
            <tr>    
                   <th>GET</th>
                   <td>{totalGet}</td>
            </tr>
            <tr>       
                   <th>OPTIONS</th>
                   <td>{totalOptions}</td>
            </tr>
            
            </table>

            <table className="status" styles="float: left">           
            <tr>
            
                   <th colSpan="2">Entries per status</th> 
                   {/* <th>status</th> */}
            </tr>
            <tr>       
                   <th>0</th>
                   <td>{total0}</td>
                   
            </tr>
            <tr>    
                   <th>200</th>
                   <td>{total200}</td>
            </tr>
            <tr>       
                   <th>204</th>
                   <td>{total204}</td>
            </tr>
            <tr>       
                   <th>206</th>
                   <td>{total206}</td>
            </tr>
            <tr>       
                   <th>302</th>
                   <td>{total302}</td>
            </tr>
            <tr>       
                   <th>307</th>
                   <td>{total307}</td>
            </tr>
            <tr>       
                   <th>404</th>
                   <td>{total404}</td>
            </tr>
            </table>
             
            
            <table className="status" styles="float: left">
            <tr>
                <th colSpan="2">Average age per CONTENT-TYPE</th>
                {/* <th>TYPE</th> */}
            </tr>
            
            <tr>
               <th>Text</th>
               <td>{totalText}</td>
            </tr> 
            <tr>
               <th>Video</th>
               <td>{totalVideo}</td>
            </tr> 
            <tr>
               <th>Image</th>
               <td>{totalImage}</td>
            </tr> 
            <tr>
               <th>Font</th>
               <td>{totalFont}</td>
            </tr> 
            <tr>
               <th>Html</th>
               <td>{totalHtml}</td>
            </tr> 
            <tr>
               <th>CSS</th>
               <td>{totalCSS}</td>
            </tr>
            
            <tr>
               <th>JS App</th>
               <td>{totalJS}</td>
            </tr>
             

            </table>
            
            
        </p>
        </div>
        </div>
    );
}
               


export default admininfo;