import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import "../App.css";
import "../styles/Adminmain.css";
import filterOut from '../scripts/transform'
import { Dot } from 'react-animated-dots';

function Upload(props) {

  const [harFile, setHarFile] = useState();
  const [uploadChoice, setChoice] = useState("");
  const [ip, setIP] = useState("");
  const [harFileHasBeenFiltered, setHarFileHasBeenFiltered] = useState(false);
  const [message, setMessage] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false)

  const getGeoLocData = async () => {
    const geolocation = await axios.get('https://geolocation-db.com/json/')
    setIP(geolocation.data.IPv4)
  }
  
  useEffect( () => {
    getGeoLocData()
  }, [])

  const filterSensitive= async (e) => {
    setMessage("");
    setSubmitClicked(false);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = (e) => {
      let filteredJSON = filterOut(JSON.parse(e.target.result));
      setHarFile(filteredJSON);
      setHarFileHasBeenFiltered(true);
    };
  }

  const readRadio = (e) => {
    setChoice(e.target.value)
  }

  const onSubmit = () => {
    setSubmitClicked(true);
    harFile.userIP = ip;
    harFile.userID = props.state.userID;
    if(uploadChoice==="server"){
      axios.post("http://localhost:3001/upload", harFile).then( (response) => {
        setMessage(response.data.message);
      });
    }else if(uploadChoice==="local"){
      const harText = JSON.stringify(harFile)
      localStorage.setItem("harFile", harText)
      setMessage("Saved locally!")
    }else{
      alert("You must choose an upload option!");
    }
  };

  return (
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
    
   </div> 
      <div className="upload">
        <input 
        style={{color: "white"}}
        className="formik_field" 
        type="file" 
        onChange={filterSensitive} 
        />
        <div>
          <label  className="caption">Save Locally</label>
          <input 
            type="radio"
            value="local"
            name="uploadChoice"
            onChange={readRadio}
            />
        </div>
        <div>
          <label className="caption">Upload to Server</label>
          <input 
            type="radio"
            value="server"
            name="uploadChoice"
            onChange={readRadio}
          />
        </div>
        {!message && submitClicked
        ? <h1 className="caption"><Dot>.</Dot><Dot>.</Dot><Dot>.</Dot></h1>
        : <h4 className="caption">{message}</h4>
        }

        <button className="formik_field" onClick={onSubmit} disabled={!(ip && harFileHasBeenFiltered) || submitClicked}>
          Submit
        </button>

      </div>
      {/* <h4>Your IP Address: {ip}</h4> */}
    </div>
  );
}

export default Upload