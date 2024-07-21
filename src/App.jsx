import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import Dashboard from './components/Body Section/Dashboard';
import EventList from './components/Body Section/Events Section/EventList';
import EventDetails from './components/Body Section/Events Section/EventDetails';
import { fetchEvents, eventForm, deleteEvent } from './services/apiServices'
import EventForm from './components/Body Section/Events Section/EventForm';



const App = () => {

  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // function for handling all events
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const EventsData = await fetchEvents();
      console.log('EventsData:', EventsData);

      // Set state
      setEvents(EventsData)
    };
    if (user) fetchAllEvents();
  }, [user]);

  // function for adding new events. Also not sure if Tommy added a handle add function already
  const handleAddEvent = async (eventFormData) => {
    const newEvent = await eventForm(eventFormData);
    // console.log('FormData', eventFormData);
    setEvents([newEvent, ...events])
    navigate('/events'); 
  };

  // function to delete event
  const handleDeleteEvent = async (eventId) => {
    // console.log('eventId', eventId);
    const deletedEvent = await deleteEvent(eventId);
    setEvents(events.filter((event) => event._id !== deletedEvent._id));
    // redirect the user
    navigate('/events');
  }

  return (

    <div className={`container ${theme} `} id='App'>
      <Navbar theme={theme} setTheme={setTheme} user={user} />
      <Routes>

        {user ? (
           <>
           <Route path="/" element={<Dashboard user={user} />} />
           <Route path="/events" element={<EventList events={events} />} />
           <Route path="/events/:eventId" element={<EventDetails/>} />
           <Route path="/events/new" element={<EventForm handleAddEvent={handleAddEvent} />} />
           <Route path="/events/:eventId" element={<EventDetails handleDeleteHoot={handleDeleteEvent} />}/>
           <Route path="/events/:eventId/edit" element={<EventForm />} />

           </>
          

        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path='/about' element={<About />}></Route>
        <Route path='/signup' element={<SignUp setUser={setUser} />}></Route>
        <Route path='/login' element={<Login setUser={setUser} />}></Route>

      </Routes>

    </div>
  )
}

export default App;