import { Link } from 'react-router-dom';
import './event.css'

const EventList = ({ events }) => {
  console.log('render the list of events here', events)
  if (!events || events.length === 0) {
    return <p>No events available</p>;
  }

  return (
    <main>
      {events.map((event) => (
        <Link key={event._id} to={`/events/${event._id}`}>
          <article>
            {/* <p>Render one event here {event}</p> */}
            <header>
              <h2>{event.title}</h2>
              <p>{event.organizer} posted on {event.date} at {event.time}</p>
            </header>
            <p>{event.description}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}

export default EventList;
