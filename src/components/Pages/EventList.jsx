import { Link } from 'react-router-dom';
import './eventlist.css'

const EventList = ({ events }) => {
  console.log('render the list of events here', events)
  if (!events || events.length === 0) {
    return <p>No events available</p>;
  }

  return (
    <main>
      <h1>Latest Events</h1>
      <div className='event-list'>
      {events.map((event) => (
        <div key={event._id} className='event-card'>
          <h2>{event.title}</h2>
          <p>Organized by: {event.organizer?.name} </p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Time: {event.time}</p>
          <button><Link to={`/events/${event._id}`}>Details</Link></button>
        </div>
      ))}

      </div>
   
    </main>
  );
}

export default EventList;
