import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import Dashboard from './components/Body Section/Dashboard';
import EventList from './components/Body Section/Events Section/EventList';



const App = () => {

  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null);

  return (

    <div className={`container ${theme} `} id='App'>
      <Navbar theme={theme} setTheme={setTheme} user={user} />
      <Routes>

        {user ? (
           <>
           <Route path="/" element={<Dashboard user={user} />} />
           <Route path="/events" element={<EventList user={user} />} />
           </>
          

        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path='/about' element={<About />}></Route>
        <Route path='/signup' element={<SignUp setUser={setUser} />}></Route>
        <Route path='/login' element={<Login setUser={setUser} />}></Route>

        {/* To be deleted -- just testing */}
        <Route path='/dash' element={<Dashboard />}></Route>

      </Routes>

    </div>
  )
}

export default App;