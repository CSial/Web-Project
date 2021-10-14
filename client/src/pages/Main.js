import React, { useEffect, useState } from "react";

export default function Main(props) {

  return (
    <div>
      <h2>Welcome to the Main Page {props.state.username}!!</h2>
      {/* <h3>Username: {props.state.username}</h3>
      <h3>Role: {props.state.role}</h3>
      <h3>UserID: {props.state.userID}</h3>
      <h3>LoggedIn: {props.state.loggedInStatus ? "YES" : "NO"}</h3> */}
    </div>
  );
}