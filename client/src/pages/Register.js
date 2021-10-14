import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Link, useHistory} from "react-router-dom";

function Register() {

  const [message, setMessage] = useState("");
  const [registerDone, setRegisterDone] = useState("");
  
  let history = useHistory();

  const initialValues = {
    username: "",
    password: "",
    email: "",
    role: "user"
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").matches(/(?=.*?[A-ZΑ-Ω])(?=.*?[0-9])(?=.*?[#$*&@])/, "Password must contain at least 1 capital letter, 1 digit and one special character (#$*&@)").required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
  });

  const register = (data) => {
      Axios.post("http://localhost:3001/register", data).then((response) => {
        setMessage(response.data.message);
        setRegisterDone(response.data.registerDone);
        // history.push('/login')
      });
  };  

  useEffect(() => {
    Axios.get("http://localhost:3001/register").then((response) => {
      setRegisterDone(response.data.registerDone)
    });
  }, []);

  const eraseMessage = ()=>{
    setMessage("");
  }
  
  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={register}
        validationSchema={validationSchema}
      >
        {Formik => {
          return(
              <Form className="register">
                <label className="caption">Username</label>
                <ErrorMessage className="validationWarning" name="username" component="span" />
                <Field className="formik_field"
                  name="username"
                  autoComplete="off"
                  onFocus={eraseMessage}
                />
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
                <button type="submit" className="formik_field" disabled={!(Formik.isValid && !(registerDone))}>Register</button>
                {/* <Link to="/" className="caption">Home Page</Link> */}
              </Form>
            )
          }  
        }
      </Formik>       
    </div>
  );
}

export default Register