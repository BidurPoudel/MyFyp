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
          <NavLink to="/owner"
            className={({ isActive }) => `
            p-[10px] px-[90px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-blue-500 " : "text-black"} 
            user-active`}
            style={({ isActive }) => ({
              transition: "0.23s ease"
            })}
          >Property</NavLink>
          <NavLink to="chat"
            className={({ isActive }) => `
            p-[10px] px-[90px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-blue-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23 ease"
            })}
          >Chats</NavLink>
          <NavLink to="payment"
            className={ ({isActive})=>`
            p-[10px] px-[90px] py-[20px] duration-200 block
            ${isActive?"text-white duration-75 bg-blue-500 ":"text-black" } 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23s ease",

            })}
          >Payment</NavLink>
          <NavLink to="setting"
            className={({ isActive }) => `
            p-[10px] px-[90px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-blue-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "b0.23s ease",
            })}
          >Settings</NavLink>
          <NavLink to="/"
            className={({ isActive }) => `
            p-[10px] px-[90px] py-[20px] duration-200 block
            ${isActive ? "text-white duration-75 bg-blue-500 " : "text-black"} 
            user-active`}
            style={({ isactive }) => ({
              transition: "0.23s ease",
            })}
          >Exit</NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar
