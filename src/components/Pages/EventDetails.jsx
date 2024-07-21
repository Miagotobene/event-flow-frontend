import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { fetchOneEvent, RsvpCreate } from '../../services/apiServices';
import './EventForm.css';
import RsvpForm from './RsvpForm';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import './eventlist.css'
import { Form } from 'react-bootstrap';


const EventDetails = (props) => {
  const { eventId } = useParams();
  console.log('eventId', eventId);

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

  const handleAddForm = async (formData) => {
    console.log('RSVP FormData', formData);
    const newRsvp = await RsvpCreate(eventId, formData);
    setEvent({ ...event, RSVPs: [...event.RSVPs, newRsvp] });
  };

  console.log('event state:', event);

  // handle RSVP category change
  const [eventDetails, setEventDetails] = useState(formModel);


  const handleRSVPCategoryChange = (event) => {
    const { value } = event.target;
    setEventDetails({ ...eventDetails, category: value })
}

  // Add a check to ensure the event data is loaded before rendering
  if (error) {
    return <p>Error loading event: {error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <main>
        {/* <p>{event.category?.toUpperCase()}</p> */}
        <h1>{event.title}</h1>
        <div className='event-card'>
          <p>Organized by: {event.organizer?.name} </p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Time: {event.time}</p>
          <p>{event.description}</p>
          <p>{event.tags ? event.tags.join(', ') : 'No tags available'}</p>

          {/* <Form.Group className="rsvp-group">
                    <Form.Label>RSVP </Form.Label>
                    <Form.Select aria-label="category" onChange={handleRSVPCategoryChange} >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </Form.Select>
                        </Form.Group> */}
        {/* <Link to={`events/:eventId/rsvp`}><button>RSVP</button></Link> */}

         
      </div>
    </main>
  );
};

export default EventDetails;
// onChange={handleCategoryChange} 
 {/* <RsvpForm handleAddFrom={handleAddForm} /> */}