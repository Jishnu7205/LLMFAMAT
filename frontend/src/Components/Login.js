import React, { useState } from 'react';
import axios from 'axios';
import logo from '../images/logoWithBg.png';
import { Button, TextField, Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toaster from './Toaster.js';

function Login() {
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [logInStatus, setLogInStatus] = useState('');
  const [signInStatus, setSignInStatus] = useState('');
  const navigate = useNavigate();

  // To set data into the data (state variable) upon changing the data in the form
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      console.log("hello");
      const response = await axios.post(
        'http://localhost:8080/AMS/login',
        data,
        config
      );
      console.log("hello");
      console.log('Login: ', response);
      setLogInStatus({ msg: 'Login Success', key: Math.random() });
      localStorage.setItem('userData', JSON.stringify(response));
      
      navigate(`/${response.data._id}/welcome`);
    } catch (err) {
      setLogInStatus({
        msg: 'Invalid Username or Password',
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  const signUpHandler = async (e) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post(
        'http://localhost:8080/AMS/signup',
        data,
        config
      );
      console.log('SignUp: ', response);
      setSignInStatus({ msg: 'SignUp Success', key: Math.random() });
      localStorage.setItem('userData', JSON.stringify(response));
      navigate(`/${response.data._id}/welcome`);
    } catch (error) {
      console.log(error);
      setSignInStatus({
        msg: 'Email already exists, please use another one',
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <div className='login-container'>
        <div className='login-logo-container'>
          <img src={logo} className='login-logo' alt='logo' />
          <h1>Dev Kritrima</h1>
        </div>

        <div className='login-form-container'>
          <div className='login-box'>
            <div className='login-box-header'>
              <p>{showLogin ? 'Login to your Account' : 'Create your Account'}</p>
            </div>

            <div className='login-box-inputs'>
              {!showLogin && (
                <TextField
                  id='outlined-basic'
                  label='Enter Your Name'
                  variant='outlined'
                  name='name'
                  onChange={changeHandler}
                />
              )}
              <TextField
                id='outlined-basic'
                label='Enter Email Address'
                variant='outlined'
                name='email'
                onChange={changeHandler}
              />
              <TextField
                id='outlined-password-input'
                label='Password'
                type='password'
                autoComplete='current-password'
                name='password'
                onChange={changeHandler}
              />
            </div>

            <div className='login-box-submit'>
              <Button onClick={showLogin ? loginHandler : signUpHandler} variant='outlined'>
                {showLogin ? 'Login' : 'Sign Up'}
              </Button>
            </div>

            <div className='login-box-login'>
              <p>
                {showLogin ? 'Create an account? ' : 'Already have an account? '}
                <a href='#' onClick={() => setShowLogin(!showLogin)}>
                  {showLogin ? 'Sign Up' : 'Login'}
                </a>
              </p>
            </div>

            {logInStatus && <Toaster key={logInStatus.key} message={logInStatus.msg} />}
            {signInStatus && <Toaster key={signInStatus.key} message={signInStatus.msg} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
