// import React from 'react';
import './sidebar.css';

// import icons from react-icons
import { IoHomeSharp } from "react-icons/io5";
import { BsListStars } from "react-icons/bs";
// import { MdOutlineExplore } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
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
            <a href="/dash" className='menuLink flex'>
              <IoHomeSharp className='icon'/>
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

          {/* Search Events all events */}
           <li className='listItem'>
            <a href="/explore/events" className='menuLink flex'>
            <IoIosSearch className='icon'/>
              <span className='smallText'>
                Search
              </span>
            </a>
          </li> 

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