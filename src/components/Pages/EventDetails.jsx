import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { fetchOneEvent, RsvpCreate } from '../../services/apiServices';
import './EventForm.css';
import RsvpForm from './RsvpForm';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import './eventlist.css'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



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

          <Form>
          { <Form.Group className="rsvp-group" >
                              <Form.Label>RSVP </Form.Label>
                              <Form.Select aria-label="category"  >
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>

                                
                                  </Form.Select>
                                  </Form.Group> }
                                  {/* <button>RSVP</button> */}
                                  <Button variant="primary" type="submit" size='sm' className='button'>RSVP</Button>

          </Form>
        

         
      </div>
    </main>
  );
};

export default EventDetails;
// onChange={handleCategoryChange} 
 {/* <RsvpForm handleAddFrom={handleAddForm} /> */}