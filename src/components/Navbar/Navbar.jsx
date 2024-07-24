// import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import dayIcon from '../../assets/images/day.png';
import nightIcon from '../../assets/images/night.png';
import { AuthedUserContext } from '../../App';


const Navbar = ({ theme, setTheme, handleSignout }) => {
  const user = useContext(AuthedUserContext);
  // function for theme : changing between light and dark mode
  // const toggle_mode = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light')
  // }

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className='title'>Event Flow</Link>

      <div className='menu' onClick={() => {
        setMenuOpen(!menuOpen)
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li><NavLink to="/about">About</NavLink></li>
        {user ? (
          <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><Link to="/events/new">New Event</Link></li>
            <li><NavLink to="" onClick={handleSignout}>Sign Out</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="/login">Log In</NavLink></li>
          </>
        )}
        <li>
          <img src={theme == 'light' ? dayIcon : nightIcon} alt="" className='toggle-icon'  onClick={switchTheme}   /> 
        </li>
      </ul>


    </nav>
  )
}

export default Navbar;

// onClick={() => toggle_mode()}