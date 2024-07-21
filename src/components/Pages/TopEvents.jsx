// import React from 'react';
import './topevents.css';

// import icons 
import { BiSearchAlt } from 'react-icons/bi';


const TopEvents = () => {
  return (
    <div className='topSection'>
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome Back</h1>
        </div>

        <div className='searchBar flex'>
          <input type="text" placeholder='Search Events' />
          < BiSearchAlt className='icon' />
        </div>
      </div>
    </div>
  )
}

export default TopEvents