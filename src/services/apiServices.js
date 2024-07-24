const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const fetchLogin = async(formData)=>{
    try{
        const res = await fetch(`${BASE_URL}/users/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        console.log('Log-in Response status:', res.status);
       
        const data = await res.json()
        console.log('Log-in Response data:', data);
        if(data.err){
            throw new Error(data.err)
        }
        if (data.token) {
          localStorage.setItem('token', data.token); // add this line to store the JWT token in localStorage
          const user = JSON.parse(atob(data.token.split('.')[1]));
          return {
            status: res.status,
            user:user
          }
        }
    }catch(error){
        console.log(error)
        throw error
    }
}

const fetchSignup = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);
      if (data.err) {
        throw new Error(data.err);
      }
      if (data.token) {
        localStorage.setItem('token', data.token); 
        const user = JSON.parse(atob(data.token.split('.')[1]));
        return {
          status: response.status,
          user:user
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUser = () =>  {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  }
  const signout = () => {
    localStorage.removeItem('token');
  };

  // function for fetching events 
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const events = await response.json();
      console.log(events)
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

    const fetchOneEvent = async (eventId) => {
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          throw new Error('No authorization token found');
        }
      const res = await fetch(`${BASE_URL}/events/${eventId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
    const eventForm = async (formData) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authorization token found');
        }
        // check what the route in the backend is
        const res = await fetch(`${BASE_URL}/events/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    }

    const createEvent = async(eventData) => {
      try {
        const token = localStorage.getItem('token');
    
        if (!token) {
          throw new Error('No authorization token found');
        }
    
        console.log('-----Event Data------- fired', eventData); // Log eventData to verify its structure
    
        const response = await fetch(`${BASE_URL}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        });
    
        console.log('-----Response-------', response);
    
        const data = await response.json();
    
        return {
          status: response.status,
          event: data,
        };
      } catch (error) {
        console.error('Error creating event:', error);
        return { status: 500, error: error.message };
      }
    }
    const editEvent = async (eventData, eventId) => {
      try {
        const token = localStorage.getItem('token');
    
        if (!token) {
          throw new Error('No authorization token found');
        }
    
        // Remove the colon from the beginning of the eventId if it exists
        if (eventId.startsWith(':')) {
          eventId = eventId.slice(1);
        }
    
        console.log('Event ID-', eventId);
    
        const response = await fetch(`${BASE_URL}/events/${eventId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        });
        console.log(response.status, response)
    
        const data = await response.json();
    
        return {
          status: response.status,
          event: data,
        };
      } catch (error) {
        console.error('Error editing event:', error);
        return { status: 500, error: error.message };
      }
    };
    
    // Delete an event
    const deleteEvent = async (eventId) => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch(`${BASE_URL}/events/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,


          },
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchMyEvents = async() =>{
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authorization token found');
        }
        const response = await fetch(`${BASE_URL}/events/myevents`,{
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        return data
      } catch (error) {
        return { status: 500, error: error.message };
      }
    }

    const createRsvp = async(eventData, eventId) => {
      console.log(eventData)
      try {
        const token = localStorage.getItem('token');
    
        if (!token) {
          throw new Error('No authorization token found');
        }
    
        const requestData = {
          eventData,
          eventId: eventId,
        };
    
        console.log('-----RSVP Data------- fired', requestData);
    
        const response = await fetch(`${BASE_URL}/rsvp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });
    
        console.log('-----Response-------', response);
        const data = await response.json();
    
        return {
          status: response.status,
          event: data,
        };
      } catch (error) {
        console.error('Error creating RSVP:', error);
        return { status: 500, error: error.message };
      }
    };    

    // Fetch RSVP'ed events
    const fetchRSVP = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/rsvp/myrsvp`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const rsvp = await response.json();
        console.log('my RSVP DATA', rsvp)
        return rsvp;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    };

    const fetchEventsByCategory = async (category) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authorization token found');
        }
    
        const response = await fetch(`${BASE_URL}/events/category?category=${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
    
        const events = await response.json();
        console.log(events);
        return events;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    };


export {fetchLogin, fetchSignup, fetchEvents, fetchOneEvent, eventForm, deleteEvent, createEvent, editEvent, getUser, signout, fetchMyEvents, fetchRSVP, fetchEventsByCategory, createRsvp}



