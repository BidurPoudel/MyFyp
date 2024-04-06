import React from 'react';
import { Outlet } from 'react-router';
import AdminSidebar from '../components/AdminSidebar.jsx';

const AdminSidebarLayout = () => {
  return (
    <>
      <div className="flex">
      <AdminSidebar/>
      <Outlet/>
      </div>
    </>
  )
}

export default AdminSidebarLayout
