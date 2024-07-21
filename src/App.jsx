import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import EventForm from './components/Pages/EventForm';
import EventDetails from './components/Pages/EventDetails';
import Dashboard from './components/Dashboard/Dashboard';
import EventList from './components/Pages/EventList';
import { getUser, signout, fetchEvents, eventForm, deleteEvent } from './services/apiServices';
import Rsvp from './components/Pages/Rsvp';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(getUser());
  const [events, setEvents] = useState([]);

  const handleSignout = () => {
    signout();
    setUser(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const EventsData = await fetchEvents();
      console.log('EventsData:', EventsData);

      // Ensure data structure matches what is expected
      if (Array.isArray(EventsData)) {
        setEvents(EventsData);
      } else {
        console.error('Unexpected data structure:', EventsData);
      }
    };
    if (user) fetchAllEvents();
  }, [user]);

  const handleAddEvent = async (eventFormData) => {
    const newEvent = await eventForm(eventFormData);
    setEvents([newEvent, ...events]);
    navigate('/events');
  };

  const handleDeleteEvent = async (eventId) => {
    const deletedEvent = await deleteEvent(eventId);
    setEvents(events.filter((event) => event._id !== deletedEvent._id));
    navigate('/events');
  };

  return (
    <AuthedUserContext.Provider value={user}>
      <div className={`container ${theme} `} id='App'>
        <Navbar theme={theme} setTheme={setTheme} user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard />}>
                <Route path="events" element={<EventList events={events} />} />
                <Route path="events/new" element={<EventForm handleAddEvent={handleAddEvent} />} />
                <Route path="events/:eventId" element={<EventDetails handleDeleteEvent={handleDeleteEvent} />} />
                <Route path="events/:eventId/edit" element={<EventForm />} />
                <Route path="event/:id" element={<EventDetails />} />
                <Route path="rsvp" element={<Rsvp />} />
                <Route path="explore/events" element={<EventList events={events} />} />
              </Route>
            </>
          ) : (
            <Route path="/" element={<Home />} />
          )}
          <Route path='about' element={<About />} />
          <Route path='signup' element={<SignUp setUser={setUser} />} />
          <Route path='login' element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </AuthedUserContext.Provider>
  );
}

export default App;
