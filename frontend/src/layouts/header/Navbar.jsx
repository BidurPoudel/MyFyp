import React, { useState } from 'react';
import axios from 'axios'
import logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Account from '../../utils/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faBell } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {


  const handleLogout = async () => {
    const token = localStorage.removeItem('token');
    const navigate = useNavigate();
    navigate('/')
  }

  return (
    <>
      <div className="navbar flex relative justify-end pr-[10vh] bg-blue-400 text-md h-[10vh] md:text-sm  sm:text-sm">
        <img src={logo} alt="" className="h-[90px] absolute rounded-full -top-[1.6vh] left-24" />
        <div className="nav-link ">
          <ul className='flex gap-10 mt-4 text-lg'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => `
                inline-block md:p-[10px] pb-[35px]  duration-200 font-semibold tracking-[.1em]
                ${isActive ? "text-white border-b-4 rounded-lg transition-colors duration-75 hover:border-green-500 border-green-600" : "text-black"} 
                `}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/properties"

                className={({ isActive }) => `
                inline-block sm:p-[10px] pb-[25px] duration-200 font-semibold tracking-[.1em]
                ${isActive ? "text-white border-b-4 rounded-lg transition-all hover:border-green-500 duration-100 border-green-500" : "text-black"} 
                `}
              >
                Properties
              </NavLink>
            </li>
            <li>
              {/* create link*/}
              <NavLink
                to='/create'
                className={({ isActive }) => `
                inline-block sm:p-[10px] pb-[25px] duration-200 font-semibold tracking-[.1em]
                ${isActive ? "text-white border-b-4 rounded-lg transition-all duration-75 hover:border-green-500  border-green-500" : "text-black"} 
                `}
              >
                Create
              </NavLink>
            </li>
            <li>
              {/* create link*/}
              <NavLink
                to='/notification'
                className={({ isActive }) => `
                inline-block sm:p-[10px] pb-[25px] duration-200 font-semibold tracking-[.1em]
                ${isActive ? "text-white border-b-4 rounded-lg transition-all duration-75 hover:border-green-500  border-green-500" : "text-black"} 
                `}
              >
                <FontAwesomeIcon icon={faBell}
                  size='xl'
                  style={{ color: '#373737' }}
                  className=' cursor-pointer relative'
                  
                />
              </NavLink>
            </li>
            <li>
              <Account />
            </li>
            <li>
              <NavLink to='/login'>
                <FontAwesomeIcon icon={faRightFromBracket}
                  size='xl'
                  style={{ color: '#373737', paddingTop: "15px" }}
                  className='-mt-2 cursor-pointer relative'
                  onClick={() => handleLogout()}
                />
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
};

export default Navbar;
