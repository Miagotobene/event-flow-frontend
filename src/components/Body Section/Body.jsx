// import React from 'react';
// import TopEvents from '../Body Section/Top Section/TopEvents.jsx';
import EventList from './Events Section/EventList.jsx';
import Rsvp from '../Body Section/RSVP section/Rsvp.jsx';
import './body.css';
import { Routes, Route } from "react-router-dom";
// import Dashboard from './Dashboard.jsx';
import EventDetails from './Events Section/EventDetails.jsx';
// import Profile from './Profile.jsx';
import Search from '../search/Search.jsx'


const Body = () => {
  return (
    <div className='mainContent'>
      {/* <TopEvents/> */}
      <div className='bottom flex'>
        <Routes>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/rsvps' element={<Rsvp />}></Route>
          <Route path='/events' element={<EventList />}></Route>
          <Route path='/event/:id' element={<EventDetails/>}></Route>
          </Routes>
      </div>
    </div>
  )
}

export default Body;