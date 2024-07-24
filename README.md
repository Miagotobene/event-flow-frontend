# SEI SEBPT220 Project 3: Event Flow

Event Flow is an experience coordination application enabling user to seamlessly RSVP to popular events in their area.

[Application Page](/assets/Updated_MockUp.png)

## How It Works

Registered users of can create and coordinate events. Users can additionaly RSVP to popular events in their area.

## Event-Flow-Frontend

React Web App. Servring RESTful API using Node.JS and Express.

## Features

### TBD

- **Routes - frontend:** ```js 
 <Navbar theme={theme} setTheme={setTheme} user={user} />
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard user={user} />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path='/about' element={<About />}></Route>
        <Route path='/signup' element={<SignUp setUser={setUser} />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/porfile' element={<body />}></Route>
        <Route path='/rsvp' element={<body />}></Route>
        <Route path='/event' element={<body />}></Route>
      </Routes>```

- **RSVP form:** Make RSVP Form component possibly leverage event form component.

### Event Form

- **react-calender:** react-calender dependecy component integrated into the application.
- **Event form:** Front end reusable component.

### Data fetching Frontend api functions

- **Service functions:** Api Service functions to interact with the backend: fetchLogin, fetchSignup, fetchEvents, fetchOneEvent, eventForm, deleteEvent, createEvent, editEvent, getUser, signout, fetchMyEvents, fetchRSVP, fetchEventsByCategory, createRsvp

## User Stories

1. **Create an account:**
   - User Can create an account
2. **RSVP to an event:**
   - User can create an RSVP.
3. **Create an event:**
   - User can create an event.
4. **Edit an event::**
   - User can edit an event.
5. **Delete an event::**
   - User can Delete an event.

## Setup Instructions for Local Deployment

To set up this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone 
   ```

2. **Navigate to the project directory:**

   ```bash
   cd 
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up the environment variables:**

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     VITE_BACK_END_SERVER_URL='http://localhost:3000'
     ```

5. **Run the application:**

   ```bash
   npm start
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## Live Demo

[Live Demo Site]()

## Code Snippets

### User Login Function
```js 
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
```



## Inspiration

- [EventBrite](https://www.eventbrite.com/)
- [GetYourGuide](https://www.getyourguide.com/)
- [Lu Ma](https://lu.ma/)
- [AirTable](https://www.airtable.com/)

## Mockups

![Musicfy](assets/img/firstDraft.png)
![Event Flow ERD](assets/img/EventFlowERD.png)

```

```
