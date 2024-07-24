// import React from 'react';
// import React from 'react'
// import { useState, useEffect } from 'react';
// import { Form } from 'react-bootstrap';
import './eventlist.css'


const RsvpList = ({rsvps}) => {
// console.log(rsvps)

  return (
    <main>
    <h1>RSVP'ed Events</h1>
    <div className='event-list'>
    {rsvps.map((rsvp) => (
        <div key={rsvp._id} className='event-card'>
        <h2>{rsvp.event.category}</h2>
        <p>Organized by: {rsvp.event.organizer?.name} </p>
        <p>Date: {new Date(rsvp.event.date).toLocaleDateString()}</p>
        <p>Time: {rsvp.event.location}</p>
        <p> {rsvp.event.description}</p>
      </div>
    ))}

    </div>
 
  </main>
  )
}

export default RsvpList;