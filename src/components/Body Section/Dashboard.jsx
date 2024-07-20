
// import React from 'react';
import './dashboard.css';
import Sidebar from '../Sidebar Section/Sidebar.jsx'
import Body from './Body.jsx'


const Dashboard = ({ user }) => {
  return (
    <div className='container-dash'>
      <Sidebar />
      <Body user={user} />

    </div>

  )
}

export default Dashboard;