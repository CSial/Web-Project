import React, { useState, useEffect } from "react";
import {useHistory, Link} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios'
import * as Yup from "yup";
import "../App.css";
import "../styles/Usermain.css";
import "../styles/Adminmain.css";

function EditProfile(props) {

  let history = useHistory();

  
  const [checkboxState, setCheckBox] = useState({
    changeUsername: false,
    changePassword: false
  })
  
  const initialValues = {
    changeUsernameCheckbox : checkboxState.changeUsername,
    changePasswordCheckbox : checkboxState.changePassword,
    newUsername: "",
    oldPassword: "",
    newPassword: ""
  };

  const validationSchema = Yup.object().shape({
    changeUsernameCheckbox: Yup.boolean(),
    changePasswordCheckbox: Yup.boolean(),
    newUsername: Yup.string().when('changeUsernameCheckbox', {
      is: true,
      then: Yup.string().required(
          "You haven't typed a new username"
      ),
      otherwise: Yup.string()
    }),
    newPassword: Yup.string().when("changePasswordCheckbox", {
      is: true,
      then: Yup.string().min(8, "Password must be at least 8 characters").matches(/(?=.*?[A-ZΑ-Ω])(?=.*?[0-9])(?=.*?[#$*&@])/, "Password must contain at least 1 capital letter, 1 digit and one special character (#$*&@)").required(
          "You haven't typed a new password"
      ),
      otherwise: Yup.string()
    }),
    oldPassword: Yup.string().when("changePasswordCheckbox", {
      is: true,
      then: Yup.string().required(
          "Old password is required when setting new password"
      ),
      otherwise: Yup.string()
    })
  });

  const changeInfo = (data) => {

    if(checkboxState.changeUsername || checkboxState.changePassword){
      if(!checkboxState.changeUsername){
        data.newUsername = ""
        console.log("change username was unchecked")
      }
      if(!checkboxState.changePassword){
        data.oldPassword = ""
        data.newPassword = ""
        console.log("change password was unchecked")
      }  
      axios.put("http://localhost:3001/editprofile", data,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }else{
          sessionStorage.setItem("accessToken",response.data.token)
          props.setStatus({
            username : response.data.username,
            role : response.data.role,
            userID : response.data.userID,
            loggedInStatus : response.data.loggedInStatus
          })
          history.push('/');
        }
      });
    }else{
      alert("You haven't checked anything!");
    }
  };

  const toggleCheckBox = (e)=>{
    if(e.target.name==="changeUsernameCheckbox"){
      setCheckBox({
        changeUsername: !(checkboxState.changeUsername),
        changePassword: checkboxState.changePassword
      })
      
    }
    if(e.target.name==="changePasswordCheckbox"){
      setCheckBox({
        changeUsername: checkboxState.changeUsername,
        changePassword: !(checkboxState.changePassword)
      })
    }
  }

  return (
    <div className ="usermain" >
    {/* <h1>For some (CSS) reason this is not rendered and what's underneath is.</h1>  */}
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
      <Formik
        initialValues={initialValues}
        onSubmit={changeInfo}
        validationSchema={validationSchema}
      >
        {Formik => {
          return(
              <Form className="editProfile">
                <div className="caption">
                  <label>Change Your Username</label>
                  <Field type="checkbox" name="changeUsernameCheckbox" value={checkboxState.changeUsername} checked={checkboxState.changeUsername} onClick={toggleCheckBox}/>
                </div>
                <Field className="formik_field"
                  name="newUsername"
                  autoComplete="off"
                  placeholder = "New Username..."
                  disabled = {!checkboxState.changeUsername}
                />
                <ErrorMessage className="validationWarning" name="newUsername" component="span" />
                <div className="caption">
                  <label>Change Your Password</label>
                  <Field type="checkbox" name="changePasswordCheckbox" value={checkboxState.changePassword} checked={checkboxState.changePassword} onClick={toggleCheckBox}/>
                </div>
                <Field className="formik_field"
                  name="oldPassword"
                  autoComplete="off"
                  type="password"
                  placeholder = "Old Password..."
                  disabled = {!checkboxState.changePassword}
                />
                <ErrorMessage className="validationWarning" name="oldPassword" component="span" />
                <Field className="formik_field"
                  name="newPassword"
                  autoComplete="off"
                  type="password"
                  placeholder = "New Password..."
                  disabled = {!checkboxState.changePassword}
                />
                <ErrorMessage className="validationWarning" name="newPassword" component="span" />
                
                 <button type="submit" className="formik_field" >Save Changes</button>
                
              </Form> 
            )
          }  
        }
      </Formik>  
      
            {/* </div> */}
    </div>   
  );
}   

export default EditProfile;