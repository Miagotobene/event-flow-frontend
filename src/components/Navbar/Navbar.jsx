import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

import searchIconLight from '../../assets/images/search-w.png';
import searchIconDark from '../../assets/images/search-b.png';
import dayIcon from '../../assets/images/day.png';
import nightIcon from '../../assets/images/night.png';



const Navbar = ({theme, setTheme}) => {

    // function for theme : changing between light and dark mode
    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
  return (
    <div className='navbar'>
      <Link to="/" className='title'>Event Flow</Link>
      <div className='menu'>
        <span></span>
        <span></span>
        <span></span>

      </div>
     {/* <img  alt="" className='logo'/> */}
        <ul>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="login">Log In</NavLink></li>
        </ul>
        
        {/* {/* <div className='search-box'>
            <input type="text" placeholder='Search'/>
            <img src={theme == 'light' ? searchIconLight : searchIconDark } alt="" />
        </div> */}

        {/* <img src={theme== 'light'? dayIcon : nightIcon} alt="" className='toggle-icon' onClick={() => toggle_mode()}/>  */}
    </div>
  )
}



export default Navbar;

