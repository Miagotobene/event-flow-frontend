
import { useState } from 'react';
// import { Form, Button, Card } from 'react-bootstrap';
// import SignUp from './SignUp';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

import { fetchLogin } from '../../services/apiServices'


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchLogin(formData);
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }


  // File needs to be connected to backend using handlesubmit and handle change

  return (
    <>
      <div className='wrapper'>
        <div className='form-box login'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='input-box'>
              <input type="text" placeholder='usename' name='username' value={formData.username} onChange={handleChange} required />
              < FaUser className='icon' />
            </div>

            <div className='input-box'>
              <input type="text" placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
              <FaLock className='icon' />
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