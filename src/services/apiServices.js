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
  const fetchEvents = async() => {
    
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No authorization token found');
      }

      const response = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },});

      const data = await response.json();
      console.log(`${response.status} and ${data}`)

      return {
        status: response.status,
        event: data,
      };
    }catch (error) {
      console.log(error);
    }
  };

    // function for fetching a single event
    const fetchOneEvent = async (eventId) => {
      try {
        const res = await fetch(`${BASE_URL}/events/${eventId}`, {
          headers: {'Content-Type': 'application/json'},
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };
    

    const eventForm = async (formData) => {
      try {
        // check what the route in the backend is
        const res = await fetch(`${BASE_URL}/events/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    }

    const createEvent = async(eventData)=>{
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          throw new Error('No authorization token found');
        }
  
        const response = await fetch(`${BASE_URL}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        });
  
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


    // RSVP Form
    const RsvpCreate = async (eventId, formData) => {
      try {
        const res = await fetch(`${BASE_URL}/${eventId}/rsvp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };
  

    // Delete an event
    const deleteEvent = async (eventId) => {
      try {
        const res = await fetch(`${BASE_URL}/events/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',

          },
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };



export {fetchLogin, fetchSignup, fetchEvents, fetchOneEvent, eventForm, RsvpCreate, deleteEvent, createEvent, getUser, signout}



