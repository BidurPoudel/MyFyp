import React from 'react'
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <>
      <div className='h-screen bg-blue-200 w-64'>
        <div className=" bg-green-300 pr-2 ">
          <img src={logo} alt="Logo" />
        </div>
        <div className="flex flex-col text-lg">
          <NavLink to="property"
            className="user-sidebar"
            isActive={() => location.pathname === '/property'}
            style={({ isActive }) => ({
              display: 'inline-block',
              padding: '20px 90px',
              background: isActive ? "#0076FC" : "transparent",

              transition: "border-bottom 0.3s ease",

            })}
          >Property</NavLink>
          <NavLink to="chat"
            className="user-sidebar"
            isActive={() => location.pathname === '/chat'}
            style={({ isActive }) => ({
              display: 'inline-block',
              padding: '20px 95px',
              background: isActive ? "#0076FC" : "transparent",

              transition: "border-bottom 0.3s ease",
            })}
          >Chats</NavLink>
          <NavLink to="payment"
            className="user-sidebar"
            isActive={() => location.pathname === '/payment'}
            style={({ isActive }) => ({
              display: 'inline-block',
              padding: '20px 82px',
              background: isActive ? "#0076FC" : "transparent",
              transition: "border-bottom 0.3s ease",

            })}
          >Payment</NavLink>
          <NavLink to="setting"
            className="user-sidebar"
            isActive={() => location.pathname === '/setting'}
            style={({ isActive }) => ({
              display: 'inline-block',
              padding: '20px 80px',
              backgroundColor: isActive ? "#0076FC" : "transparent",
              transition: "border-bottom 0.3s ease",
            })}
          >Settings</NavLink>
          <NavLink to="/"
            className="user-sidebar"
            isActive={() => location.pathname === '/setting'}
            style={({ isActive }) => ({
              display: 'inline-block',
              padding: '20px 85px',
              backgroundColor: isActive ? "#0076FC" : "transparent",
              transition: "border-bottom 0.3s ease",
            })}
          >Exit</NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar
