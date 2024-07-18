import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

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
        <img  alt="" className='logo'/>
        <ul>
            <li><Link>Home</Link></li>
            <li><Link>About</Link></li>
            <li><Link>Sign Up</Link></li>
            <li><Link>Log In</Link></li>
        </ul>
        
        <div className='search-box'>
            <input type="text" placeholder='Search'/>
            <img src={theme == 'light' ? searchIconLight : searchIconDark } alt="" />
        </div>

        <img src={theme== 'light'? dayIcon : nightIcon} alt="" className='toggle-icon' onClick={() => toggle_mode()}/>
    </div>
  )
}

// src={theme == 'light' ? logo_light : logo_dark}

export default Navbar;



            {/* <a href="/home"><li>Home</li></a>
            <a href="/about"><li>About</li></a>
            <a href="/sign up"><li>Sign Up</li></a>
            <a href="/login"><li>Log In</li></a> */}