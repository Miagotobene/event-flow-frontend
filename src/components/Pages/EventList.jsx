// import React from 'react'

// import React from 'react';
import { useState, useEffect } from 'react';
import { fetchEvents } from '../../services/apiServices';

// createContext, 
const EventList = ({ user }) => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const EventsData = await fetchEvents.index();
      // console.log('EventsData:', EventsData);

      // Set state
      setEvents(EventsData)
    };
    if (user) fetchAllEvents();
  }, [user]);

  return (
    <main>
      {events.map((event) => (
        <>
          <h2 key={event._id}>{event.title}</h2>
          <p >{event.description}</p>
          <p >{event.date}</p>
          <p >{event.time}</p>
          <p >{event.category}</p>
        </>

      ))}
    </main>

  )
}

export default EventList