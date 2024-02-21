import React from 'react';

import Sidebar from '../components/Sidebar.jsx'
import OwnerProperty from '../pages/user-dashboard/OwnerProperty.jsx';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <>
      <div className="flex">
      <Sidebar/>
      <Outlet/>
      </div>
    </>
  )
}

export default Dashboard
