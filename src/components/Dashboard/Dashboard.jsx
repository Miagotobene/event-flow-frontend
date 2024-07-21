
// import React from 'react';
import './dashboard.css';
import Sidebar from '../Sidebar Section/Sidebar.jsx'
import Body from './Body.jsx';
// import { Link } from 'react-router-dom';



const Dashboard = ({ user }) => {
  return (
    <div className='container-dash'>
      <Sidebar />
      <Body user={user} />
      </div>

  )
}

export default Dashboard;