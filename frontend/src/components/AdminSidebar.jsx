import React from 'react'
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';


const AdminSidebar = () => {
  return (
    <>
      <div className='h-screen bg-orange-200 w-64 mr-4'>
        <div className=" pr-2 ">
          <img src={logo} alt="Logo" />
        </div>
        <div className="flex flex-col text-lg">
          <NavLink to="/admin"
            className={({ isActive }) => `
            p-[10px] px-[110px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-orange-500 " : "text-black"} 
            user-active`}
            style={({ isActive }) => ({
              transition: "0.23s ease"
            })}
          >Dashboard</NavLink>
          <NavLink to="/admin/all-user"
            className={({ isActive }) => `
            p-[10px] px-[110px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-orange-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23 ease"
            })}
          >Users</NavLink>
          <NavLink to="all-properties"
            className={ ({isActive})=>`
            p-[10px] px-[95px] py-[20px] duration-200 block
            ${isActive?"text-white duration-75 bg-orange-500 ":"text-black" } 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23s ease",

            })}
          >Properties</NavLink>
          <NavLink to="/admin/rents"
            className={({ isActive }) => `
            p-[10px] px-[105px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-orange-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "b0.23s ease",
            })}
          >Rents</NavLink>
          <NavLink to="/admin/payment"
            className={({ isActive }) => `
            p-[10px] px-[90px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-orange-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23s ease",
            })}
          >Payments</NavLink>
          <NavLink to="/admin/report"
            className={({ isActive }) => `
            p-[10px] pl-14 py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-orange-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23s ease",
            })}
          >Reported Properties</NavLink>
          <NavLink to="/admin/login"
            className={({ isActive }) => `
            p-[10px] pl-14 py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-orange-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23s ease",
            })}
          >Login</NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
