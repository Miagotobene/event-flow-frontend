import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Calendar from 'react-calendar';
import TimePicker from 'react-bootstrap-time-picker';
import 'react-calendar/dist/Calendar.css';
import './EventForm.css';
import {
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { createEvent, editEvent } from '../../services/apiServices';

const EventForm = ({ handleAddEvent }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const formModel = {
    title: '',
    description: '',
    date: '',
    time: '',
    country: '',
    state: '',
    category: ''
  };
  console.log(location.pathname)

  const [eventDetails, setEventDetails] = useState(formModel);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(0);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (status.message) {
      setStatus({});
    }
  }, [eventDetails, date, time]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventDate = new Date(date);
    eventDate.setSeconds(time);

    const updatedEventDetails = {
      ...eventDetails,
      date: eventDate,
    };
    try {
      let fetchEventResponse;
      if (location.pathname === `/events/${eventId}/edit`) {
        console.log('Fetch Type: edit')
        fetchEventResponse = await editEvent(updatedEventDetails, eventId);
      } else {
        console.log('Fetch Type: Create')
        fetchEventResponse = await createEvent(updatedEventDetails);
      }


      if (fetchEventResponse.status === 200 || fetchEventResponse.status === 201) {
        setStatus({ success: true, message: 'Event updated successfully' });
        setEventDetails(formModel);
        handleAddEvent(updatedEventDetails);
        navigate('/myevents');
      } else {
        throw new Error('Event update failed');
      }
    } catch (error) {
      setStatus({ success: false, message: 'Something went wrong, please try again!' });
    }
  };

  const handleChange = (event) => {
    setEventDetails({ ...eventDetails, [event.target.name]: event.target.value });
  };

  const handleLocationChange = (category, value) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [category]: value
    }));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setEventDetails({ ...eventDetails, date: newDate });
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    setEventDetails({ ...eventDetails, time: newTime });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setEventDetails({ ...eventDetails, category: value });
  };

  return (
    <div className='event-form'>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3 form-group" controlId="formHorizontalEmail">
          <Form.Label></Form.Label>
          <h1>{eventId ? 'Edit Event' : 'New Event'}</h1>
          <Form.Control className='form-space' type="text" placeholder={eventDetails.title} name="title" value={eventDetails.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} className="b-3 form-group" controlId="formGridPassword">
          <Form.Control className='form-space' as="textarea" rows={3} placeholder="Description" name="description" value={eventDetails.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Country</Form.Label>
          <CountrySelect className='country'
            onChange={(e) => {
              setCountryid(e.id);
              handleLocationChange('country', e.name);
            }}
            placeHolder="Select Country"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>State</Form.Label>
          <StateSelect className='state'
            countryid={countryid}
            onChange={(e) => {
              setStateid(e.id);
              handleLocationChange('state', e.name)
            }}
            placeHolder="Select State"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label className='label'>Category</Form.Label>
            <Form.Select aria-label="category" onChange={handleCategoryChange}>
              <option value="Birthdays">Birthdays</option>
              <option value="Weddings">Weddings</option>
              <option value="Graduations">Graduations</option>
              <option value="Baby Showers">Baby Showers</option>
              <option value="Parties">Parties</option>
              <option value="ART">ART</option>
              <option value="Science & Technology">Science & Technology</option>
              <option value="Sports">Sports</option>
              <option value="Workshops">Workshops</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label className='label'>Time</Form.Label>
            <TimePicker start="08:00" end="21:00" step={30} format={12} value={time} onChange={handleTimeChange} />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" className='button'>
          Submit
        </Button>
      </Form>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
    </div>
  );
};

export default EventForm;