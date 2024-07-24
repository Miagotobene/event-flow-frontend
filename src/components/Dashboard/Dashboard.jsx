
// import React from 'react';
import './dashboard.css';
import Sidebar from '../Sidebar Section/Sidebar.jsx'
import Body from './Body.jsx';
import { useContext, useState, useEffect } from 'react';
import { AuthedUserContext } from '../../App';
// import dayIcon from '../../assets/images/day.png';
// import nightIcon from '../../assets/images/night.png';

// import { Link } from 'react-router-dom';
const Dashboard = () => {

  const [theme, setTheme] = useState('light');


  const user = useContext(AuthedUserContext);
  return (
    <div className='container-dash'>
      <Sidebar theme={theme} setTheme={setTheme} />
      <Body  user={user}  />


    </div>

  )
}

export default Dashboard;