
// import React from 'react';
import './dashboard.css';
import Sidebar from '../Sidebar Section/Sidebar.jsx'
import Body from './Body.jsx';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
// import { Link } from 'react-router-dom';



const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  return (
    <div className='container-dash'>
      <Sidebar />
      <Body user={user} />
    </div>

  )
}

export default Dashboard;