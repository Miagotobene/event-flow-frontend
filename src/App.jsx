import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home'


const App = () => {

  const [theme, setTheme] = useState('light')
  return (
    <div className={`container ${theme} App`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Home theme={theme} />
    </div>
  )
}

export default App;