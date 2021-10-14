import React, { useEffect, useState } from "react";
import Multiple from "../assests/3959331.jpg";
import "../styles/ContactUs.css";

function Contact() {
    return(
    <div className="contact">
        <div
          className="contactTop"
          style={{ backgroundImage: `url(${Multiple})` }}
        ></div>
        <div className="contactBottom">
          <h1> Student Information</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>AM</th>
                <th>Email</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Andreas Kostas</td>
                <td>234754</td>
                <td>234754@upnet.gr</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Nikolaos Nikolaou</td>
                <td>236151</td>
                <td>236151@upnet.gr</td>
                <td>7</td>
              </tr>
              <tr>
                <td>Christina Sialma</td>
                <td>235962</td>
                <td>235962@upnet.gr</td>
                <td>8</td>
              </tr>
            </tbody>
          </table>
          
          
          
          {/* <p>
            Name: Andreas Kostas AM: 230000 Email: 230000@upnet.gr
          </p>
          <p>  
            Name: Nikolaos Nikolaou AM: 230000 Email: 230000@upnet.gr
          </p>
          <p>  
            Name: Christina Sialma AM: 235962 Email: 235962@upnet.gr
          </p> */}
      </div>
      </div>
        
    );         
}

export default Contact;