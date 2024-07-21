import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import Dashboard from './components/Body Section/Dashboard';
import { getUser, signout } from './services/apiServices';
import EventList from './components/Body Section/Events Section/EventList';



const App = () => {

  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(getUser());
  const handleSignout = () => {
    signout()
    setUser(null)
  }

  return (

    <div className={`container ${theme} `} id='App'>
      <Navbar theme={theme} setTheme={setTheme} user={user} handleSignout={handleSignout} />
      <Routes>

        {user ? (
           <>
           <Route path="/" element={<Dashboard user={user} />} />
           <Route path="/events" element={<EventList events={events} user={user} />} />
           </>
          

        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path='/about' element={<About />}></Route>
        <Route path='/signup' element={<SignUp setUser={setUser} />}></Route>
        <Route path='/login' element={<Login setUser={setUser} />}></Route>

      </Routes>

    </div>
  )
}

export default App;