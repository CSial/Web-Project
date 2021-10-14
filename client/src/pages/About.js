import React from "react";
//import MultiplePizzas from "../assets/multiplePizzas.jpeg";
import MultiplePizzas from "../assests/3959331.jpg";//Nai den yphrxe multiplepizzas opote ekana allh eikona multiplepizzas
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <h3>
          The presented wep application is the sole creation of the individuals named in the project report, for the purposes of the compulsory course "Web Programming & Systems", 
          Academic Year 2020-2021, Semester 8
        </h3>
      </div>
    </div>
  );
}

export default About;