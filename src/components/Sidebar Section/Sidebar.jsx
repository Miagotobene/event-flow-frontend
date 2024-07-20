// import React from 'react';
import './sidebar.css';

// import icons from react-icons
import { IoMdSpeedometer } from 'react-icons/io';
import { BsListStars } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineRsvp } from "react-icons/md";


const Sidebar = () => {
  return (
    <div className='sideBar grid'>
      <div className="logoDiv flex">
        {/* <img src="" alt="" /> inclue logo image here when you create one */}
        {/* <h2>Eevent Flow</h2> */}
      </div>

      {/* Menu Div */}
      <div className='menuDiv'>
        <h3 className='divTitle'>
          Quick Menu
        </h3>
        <ul className="menuLists grid">
          {/* View dashboard */}
          <li className='listItem'>
            <a href="/dashboard" className='menuLink flex'>
              <IoMdSpeedometer className='icon'/>
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>

          {/* View all the events you created */}
          <li className='listItem'>
            <a href="/events" className='menuLink flex'>
            <BsListStars className='icon'/>
              <span className='smallText'>
                My Events 
              </span>
            </a>
          </li>

          {/* Explore all events */}
          {/* <li className='listItem'>
            <a href="/explore/events" className='menuLink flex'>
            <MdOutlineExplore className='icon'/>
              <span className='smallText'>
                Explore
              </span>
            </a>
          </li> */}

           {/* View list of RSVPed events */}
          <li className='listItem'>
            <a href="/rsvp" className='menuLink flex'>
            <MdOutlineRsvp className='icon'/>
              <span className='smallText'>
                My RSVPs
              </span>
            </a>
          </li>
        </ul>
      </div>

      
   </div>
  )
}

export default Sidebar