// import React from 'react'

// import React from 'react';
// import { useState, useEffect } from 'react';
// import { fetchEvents } from '../../../services/apiServices';
import { Link } from 'react-router-dom';

// createContext, 
const EventList = ({events}) => {
  return (
    <main>
      {events.map((event) => (
        <Link key={event._id} to={`/events/${event._id}`}>
          <article>
            <header>
            <h2>{event.title}</h2>
            <p>{event.organizer} posted on 
            {event.date} at {event.time}</p>
            </header>
            <p>{event.description}</p>
          </article>
        </Link>
      
      ))}
    </main>

  )
}

export default EventList;