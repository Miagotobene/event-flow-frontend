import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';
import TimePicker from 'react-bootstrap-time-picker';
import 'react-calendar/dist/Calendar.css';
import './EventForm.css';
import { useParams } from 'react-router-dom';

const EventForm = ({handleAddEvent}) => {
    const formModel = {
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: ''
    };

    const [eventDetails, setEventDetails] = useState(formModel);
    const [formData, setFormData] = useState('')
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(0);

    const { eventId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventDate = new Date(date);
        eventDate.setSeconds(time);
        const updatedEventDetails = {
            ...eventDetails,
            date: eventDate,
        };
        console.log(updatedEventDetails);
        setFormData(updatedEventDetails);
        setEventDetails(formModel);
        handleAddEvent(formData);

    };

    const handleChange = (event) => {
        setEventDetails({ ...eventDetails, [event.target.name]: event.target.value });
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setEventDetails({ ...eventDetails, date: newDate });
    };

    const handleTimeChange = (newTime) => {
        setTime(newTime);
        setEventDetails({ ...eventDetails, time: newTime });
    };

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} className="form">
                <Form.Group className="form-group">
                    <Form.Label>Event Title</Form.Label>
                    <h1>{eventId ? 'Edit Event' : 'New Event'}</h1>
                    <Form.Control type="text" placeholder="Title" name="title" value={eventDetails.title} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Your awesome event" name="description" value={eventDetails.description} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Category</Form.Label>
                    {/* <Form.Control as="textarea" rows={3} placeholder="Your awesome event" name="description" value={eventDetails.description} onChange={handleChange} /> */}
                    <select
                        required
                        name="category"
                        id="category-input"
                        value={eventDetails.category}
                        onChange={handleChange}
                        >
                        <option value="Weddings">Weddings</option>
                        <option value="Birthdays">Birthdays</option>
                        <option value="BabyShowers">Baby Showers</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Art">Art</option>
                        </select>

                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" name="location" value={eventDetails.location} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Time</Form.Label>
                    <TimePicker start="08:00" end="21:00" step={30} format={12} value={time} onChange={handleTimeChange} />
                </Form.Group>

                <Button variant="primary" type="submit" size='sm' className='button'>
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
