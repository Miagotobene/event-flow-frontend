
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './body.css';
import 'boxicons'
import EventList from '../Pages/EventList';
import { useEffect, useState } from 'react';
import { fetchMyEvents } from '../../services/apiServices';


const Body = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchAllMyEvents = async () => {
      const EventsData = await fetchMyEvents();
      // Ensure data structure matches what is expected
      if (Array.isArray(EventsData)) {
        setUserEvents(EventsData);
      } else {
        console.error('Unexpected data structure:', EventsData);
      }
    };
    fetchAllMyEvents()
  }, [])



  const handleClick = (value) => {
    navigate(`/category/${value}`);
  };

  return (
    <div className='mainContent'>
      {/* <TopEvents/> */}
      <div className='bottom flex'>

        {location.pathname !== '/' ? <Outlet /> :
          <>
            <div className="container_dash">
              <div className='categories'>
                <box-icon
                  name='edit'
                  type='solid'
                  style={{ width: '9em', height: '9em' }}
                  onClick={() => handleClick('Art')}
                ></box-icon>
                <box-icon
                  name='cake'
                  type='solid'
                  style={{ width: '9em', height: '9em' }}
                  onClick={() => handleClick('Birthday')}
                ></box-icon>
                <box-icon
                  name='party'
                  type='solid'
                  style={{ width: '9em', height: '9em' }}
                  onClick={() => handleClick('Parties')}
                ></box-icon>
                <box-icon
                  name='hard-hat'
                  type='solid'
                  style={{ width: '9em', height: '9em' }}
                  onClick={() => handleClick('Workshops')}
                ></box-icon>
                <box-icon
                  name='cricket-ball'
                  type='solid'
                  style={{ width: '9em', height: '9em' }}
                  onClick={() => handleClick('Sports')}
                ></box-icon>
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