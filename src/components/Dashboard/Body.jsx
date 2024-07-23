
import { Outlet, useLocation } from 'react-router-dom';
import './body.css';
import 'boxicons'
import EventList from '../Pages/EventList';
import { useEffect, useState } from 'react';
import { fetchMyEvents } from '../../services/apiServices';


const Body = () => {
  const location = useLocation();

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchAllMyEvents = async () => {
      const EventsData = await fetchMyEvents();
      console.log('myevents:', EventsData);

      // Ensure data structure matches what is expected
      if (Array.isArray(EventsData)) {
        setUserEvents(EventsData);
      } else {
        console.error('Unexpected data structure:', EventsData);
      }
    };

    fetchAllMyEvents()
  }, [])

  return (
    <div className='mainContent'>
      {/* <TopEvents/> */}
      <div className='bottom flex'>

        {location.pathname !== '/' ? <Outlet /> :
          <>
            <div className="container_dash">
              <div className='categories'>
                <box-icon name='edit' type='solid' value='art' style={{ width: '9em', height: '9em' }}></box-icon>
                <box-icon name='cake' type='solid' value='birthdays' style={{ width: '9em', height: '9em' }}></box-icon>
                <box-icon name='party' type='solid' value='parties' style={{ width: '9em', height: '9em' }}></box-icon>
                <box-icon name='hard-hat' type='solid' value='workshops' style={{ width: '9em', height: '9em' }}></box-icon>
                <box-icon name='cricket-ball' type='solid' value='sports' style={{ width: '9em', height: '9em' }}></box-icon>
              </div>
              <EventList events={userEvents} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Body;