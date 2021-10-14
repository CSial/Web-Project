import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import React from "react";

function Navbar(props) {

  return (
    <div className="navbar">
        <div className="leftSide">
            <Link to="/"> Home </Link>
            <Link to="/about"> About </Link>
            <Link to="/contact"> Contact </Link>

        </div>
        <div className="rightSide">
            {props.state.loggedInStatus 
            ?   <div className="rightSide"> 
                  {props.state.loggedInStatus 
                  ?   <div>  
                        {props.state.role==="admin"
                        ?<div>
                          <Link to="/admininfo">{props.state.username}</Link>
                        </div>
                        :<div>  
                          <Link to="/usermain">{props.state.username}</Link>
                        </div>
                        }  
                      </div>  
                  :   <div> </div> 
                  }
                  <Link to="/" onClick={props.logOut}>Log Out</Link> 
                </div>  
            :   <div className="rightSide">
                    <Link to="/register">Register </Link>
                    <Link to="/login"> Log In</Link>
                </div> 
            }
            {/* <button onClick={toggleNavbar}>
                <ReorderIcon />
            </button> */}
        </div>
    </div>
  );
}

export default Navbar;