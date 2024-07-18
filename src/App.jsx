import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';


const App = () => {

  const [theme, setTheme]= useState('light')
  return (
    <div className={`container ${theme} `} id='App'>
      <Navbar  theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>


      </Routes>
    </div>
  )
}

export default App;