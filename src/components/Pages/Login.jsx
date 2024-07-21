
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

import { fetchLogin } from '../../services/apiServices'


const Login = ({ setUser }) => {
  const navigate = useNavigate(); // added this for navigation purposes
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await fetchLogin(formData);
      setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

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
              <button type='submit' onChange={handleChange}>Login</button>
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



export default Login;