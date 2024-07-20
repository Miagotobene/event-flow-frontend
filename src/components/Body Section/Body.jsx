// import React from 'react';
import TopEvents from '../Body Section/Top Section/TopEvents';
import Events from '../Body Section/Events Section/Events';
import Rsvp from '../Body Section/RSVP section/Rsvp';
import './body.css'

const Body = () => {
  return (
    <div className='mainContent'>
      <TopEvents />

      <div className='bottom flex'>
        <Events />
        < Rsvp />
      </div>
    </div>
  )
}

export default Body;