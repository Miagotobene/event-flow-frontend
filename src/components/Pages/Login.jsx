// import React from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import SignUp from './SignUp';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';





const Login = () => {

  return (
      <>
      <div className='wrapper'>
        <div className='form-box login'>
          <form action="">
            <h1>Login</h1>
            <div className='input-box'>
              <input type="text" placeholder='usename' required />
              < FaUser className='icon'/>
            </div>

            <div className='input-box'>
              <input type="text" placeholder='Password' required />
              <FaLock className='icon'/>
            </div>

            <div className='register-link'>
            <button type='submit'>Login</button>
              <p>
              Don't have an account? <a href='/signup'>Sign Up</a>
              </p>
            </div>
          </form>
        </div>

      </div>
      
      </>
    )
  
}


export default Login