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
  const [error, setError] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await fetchOneEvent(eventId);
        console.log('EventData', eventData);
        setEvent(eventData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchEvent();
  }, [eventId]);

  // HandleAdd RSVP form
  const handleAddForm = async (formData) => {
    console.log('RSVP FormData', formData);
    const newRsvp = await RsvpCreate(eventId, formData);
    setEvent({ ...event, RSVPs: [...event.RSVPs, newRsvp] });
  };

  // Verify that event state is being set correctly:
  console.log('event state:', event);


  // Add a check to ensure the event data is loaded before rendering
  if (error) {
    return <p>Error loading event: {error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <header>
        <p>{event.category?.toUpperCase()}</p>
        <h1>{event.title}</h1>
        <p>
          {event.organizer?.name} posted on {event.date} at {event.time}
        </p>
      </header>
      <p>{event.description}</p>
      <p>{event.tags ? event.tags.join(', ') : 'No tags available'}</p>


      <section>
        <h2>RSVP</h2>
        <RsvpForm handleAddFrom={handleAddForm} />
      </section>

      {event.organizer?._id === user?._id && (
        <>
          <Link to={`/events/${eventId}/edit`}>Edit</Link>
          <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
        </>
      )}
    </main>
  );
};

export default EventDetails;
