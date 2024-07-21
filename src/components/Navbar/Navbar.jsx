// import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';


import dayIcon from '../../assets/images/day.png';
import nightIcon from '../../assets/images/night.png';


const Navbar = ({ theme, setTheme, user, handleSignout }) => {
  // function for theme : changing between light and dark mode
  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
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
            <li><NavLink to="/newEvent">Events</NavLink></li>
            <li><NavLink to="" onClick={handleSignout}>Sign Out</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="/login">Log In</NavLink></li>
          </>
        )}
        <li>
          <img src={theme == 'light' ? dayIcon : nightIcon} alt="" className='toggle-icon' onClick={() => toggle_mode()} />
        </li>
      </ul>


    </nav>
  )
}

export default Navbar;

