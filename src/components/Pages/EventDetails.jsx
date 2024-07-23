import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { fetchOneEvent, deleteEvent } from '../../services/apiServices'; // RsvpCreate
import './EventForm.css';
import { AuthedUserContext } from '../../App';
import './eventlist.css';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [rsvpFormData, setRsvpFormData] = useState({ userId: '', rsvp: 'Yes' });
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await fetchOneEvent(eventId);
        console.log('EventData', eventData);
        setEvent(eventData);
        if (user && user._id) {
          setRsvpFormData({ ...rsvpFormData, userId: user._id });
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchEvent();
  }, [eventId, user]);

  const handleAddForm = async (formData) => {
    try {
      console.log('RSVP FormData', formData);
      const newRsvp = await RsvpCreate(eventId, formData);
      console.log(newRsvp)
      navigate('/rsvp')
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRsvpFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddForm(rsvpFormData);
  };

  console.log('event state:', event);
  console.log('rsvpFormData:', rsvpFormData);

  if (error) {
    return <p>Error loading event: {error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  const handleDeleteEvent = async (eventId) => {
    const deletedEvent = await deleteEvent(eventId);
    navigate('/myevents');
  };
  return (
    <main>
      <h1>{event.title}</h1>
      <div className='event-card'>
        <p>Organized by: {event.organizer?.name}</p>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Time: {event.time}</p>
        <p>{event.description}</p>
        <p>{event.tags ? event.tags.map(tag => tag.name).join(', ') : 'No tags available'}</p>

        {event.organizer?._id === user?._id ? (
          <>
            <Link to={`/events/:${eventId}/edit`}>
              <Button variant="primary" size='sm' className='button'>Edit</Button>
            </Link>
            <Button variant="danger" size='sm' className='button' onClick={() => handleDeleteEvent(eventId)}>Delete</Button>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="rsvp-group">
              <Form.Label>RSVP</Form.Label>
              <Form.Select aria-label="category" name="rsvp" value={rsvpFormData.rsvp} onChange={handleFormChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" size='sm' className='button'>RSVP</Button>
          </Form>
        )}
      </div>
    </main>
  );
};

export default EventDetails;
