import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useHistory} from 'react-router-dom'

function Login(props) {

  const [message, setMessage] = useState("");
  let history = useHistory();

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  });

  const login = (data) => {
    axios.post("http://localhost:3001/login", data).then((response) => {
      setMessage(response.data.message);
      if(response.data.token){
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
  };

  const eraseMessage = ()=>{
    setMessage("");
  }

  if(!props.state.loggedInStatus){
    return (
      <div className="App">
        <Formik 
          initialValues={initialValues}
          onSubmit={login}
          validationSchema={validationSchema}
        >
          {Formik => {
            return(
              <Form className="login">
                <label className="caption">Email</label>
                <ErrorMessage className="validationWarning" name="email" component="span" />
                <Field className="formik_field"
                  name="email"
                  autoComplete="off"
                  onFocus={eraseMessage}
                />
                <label className="caption">Password</label>
                <ErrorMessage className="validationWarning" name="password" component="span" />
                <Field className="formik_field"
                  name="password"
                  autoComplete="off"
                  type="password"
                  onFocus={eraseMessage}
                />
                <h4 className="message">{message}</h4>
                <button type="submit" className="formik_field">Log In</button>
              </Form>
            )
          }}
        </Formik>       
      </div>
    );
  }else{
    return(   
      <h1>You are already logged in!!</h1>
    )
  }
}

export default Login