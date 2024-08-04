import React from 'react';
import logo from "../images/logoWithBg.png";
import "./styles.css";
import { useNavigate, useParams } from 'react-router-dom';

function Welcome() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  // const { user } = useParams();
  // console.log("userId",userData.data._id);
  // console.log(user);
  
  
  
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }
  return (
    <div className='welcome-container'>
        <img src={logo} alt='logo' className='welcome-logo'/>
        <b>Hi , {userData.data.name} 👋</b>
        <p className='welcome-text'>Explore the materials across the world</p>
    </div>
  )
}

export default Welcome;