import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import Footer from './components/Pages/Footer';
import Dashboard from './components/Body Section/Dashboard';




const App = () => {

  const [theme, setTheme] = useState('light')
  return (

    <div className={`container ${theme} `} id='App'>
      <Navbar  theme={theme} setTheme={setTheme}/>
      <Routes>
        {/* Routest for main pages */}
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route> 
      {/* Add route for when user logs in/signs up */}
        <Route path='/dash' element={<Dashboard />}></Route>

        {/* Routes for dashboard */}

      </Routes>
      <Footer />
    </div>
  )
}

export default App;