
import { Outlet } from 'react-router-dom';
import './body.css';

const Body = () => {
  return (
    <div className='mainContent'>
      {/* <TopEvents/> */}
      <div className='bottom flex'>
        <Outlet />
      </div>
    </div>
  )
}

export default Body;