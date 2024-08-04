import React from 'react'
import logo from "../images/logoWithBg.png"
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function SignUp() {
    const navigate = useNavigate();
  return (
    <div className='login-container'>
        <div className='login-logo-container'>
            <img src={logo} className='login-logo' alt='logo'/>
            <h1>Dev Kritrima</h1>
        </div>
        
        <div className='login-form-container'>
            <div className='login-box'>

                <div className='login-box-header'>
                    <p>Create your Account</p>
                </div>

                <div className='login-box-inputs'>
                    <TextField id="outlined-basic" label="Enter Your name" variant="outlined" />
                    <TextField id="outlined-basic" label="Enter Email Address" variant="outlined" />
                    <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
                </div>

                <div className='login-box-submit'>
                    <Button onClick={() => {navigate("./app/welcome")}} variant="outlined">Sign Up</Button>
                    
                </div>
                
                <div className='login-box-login'>
                    <p>Already have an account? <a href="/">Login</a></p>
                </div>
            </div>
        </div>

        </div>
  )
}

export default SignUp;