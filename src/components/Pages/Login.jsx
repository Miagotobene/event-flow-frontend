import { useState } from 'react'

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

  return (

    <form onSubmit={handleSubmit}>
      <div>
        <input type='username' placeholder='Username' name='username' value={formData.username} onChange={handleChange} required />
        <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit"> Login</button>
    </form>

    <div></div>

  )
}

export default Login