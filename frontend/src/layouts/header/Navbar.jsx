import React, { useState } from 'react';
import axios from 'axios'
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../components/Khalti/KhaltiConfig";
import Account from '../../utils/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
  let checkout = new KhaltiCheckout(config);
  

  const handleCreateClick = async () => {
    const url = "http://localhost:3001/api/payment/khalti";
    const data = {
      amount: 100,
      products: [{ product: "test", amount: 100, quantity: 1 }],
    };
    try {
      const response = await axios.post(url, {
        headers: {
          'Content-Type': 'application/json',
        }, 
      })
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      }else{
        console.log("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };

  return (
    <>
      <div className="navbar flex relative justify-end pr-[10vh] bg-blue-400 text-md h-[10vh] md:text-sm  sm:text-sm">
        <img src={logo} alt="" className="h-[119px] absolute rounded-full -top-[2vh] left-24" />
        <div className="nav-link ">
          <ul className='flex gap-10 mt-5 text-lg'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => `
                inline-block sm:p-[10px] pb-[25px] duration-200 font-semibold tracking-[.1em]
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
                onClick={handleCreateClick}
                className={({ isActive }) => `
                inline-block sm:p-[10px] pb-[25px] duration-200 font-semibold tracking-[.1em]
                ${isActive ? "text-white border-b-4 rounded-lg transition-all duration-75 hover:border-green-500  border-green-500" : "text-black"} 
                `}
              >
                Create
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
                className='-mt-1 cursor-pointer relative'
                onClick={() => setOpen(!open)}
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
