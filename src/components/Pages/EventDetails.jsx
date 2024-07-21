// import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { fetchOneEvent, RsvpCreate } from '../../services/apiServices';
import './EventForm.css';
import RsvpForm from './RsvpForm';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const EventDetails = (props) => {

  const { eventId } = useParams();
  // console.log('eventId', eventId);

  const [event, setEvent] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await fetchOneEvent(eventId);
      console.log('EventData', eventData);
      setEvent(eventData);
    };
    fetchEvent();
  }, [eventId]);

  //HandleAdd RSVP form
  const handleAddForm = async (formData) => {
    console.log('RSVP FormData', formData);
    const newRsvp = await RsvpCreate(eventId, formData);
    setEvent({ ...event, RSVPs: [...event.comments, newRsvp] });

  };

  // Verify that event state is being set correctly:
  console.log('event state:', event);
  if (!event)
    return (
      <main>
        <header>
          {/* <p>{event.category.toUpperCase()}</p> */}
          <h1>{event.title}</h1>
          <p>
            {event.organizer} posted on
            {event.date}
            at {event.time}
          </p>
        </header>
        <p>{event.description}</p>
        <p>{event.tags}</p>

        {/* should this be a button or link instead? */}
        <section>
          <button>RSVP</button>
          <RsvpForm handleAddFrom={handleAddForm} />
        </section>


        {/* Not sure about this */}
        {event.organizer._id === user._id && (
          <>
            <Link to={`/events/${eventId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
          </>
        )}
      </main>
    )
}

export default EventDetails;