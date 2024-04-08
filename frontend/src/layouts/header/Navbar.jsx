import React, { useState } from 'react';
import axios from 'axios'
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import Account from '../../utils/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const Navbar = () => {

  const makePayment = async () => {
    try {
      // Fetch the checkout session from the server
      const response = await axios.post(
        'http://localhost:3001/api/payment/create-checkout-session',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using Bearer token authentication
          },
          withCredentials: true,
        }
      );

      // Extract the session ID from the response data
      const sessionId = response.data.sessionId;

      // Load Stripe instance with your publishable key
      const stripe = await loadStripe(
        'pk_test_51P2s3xSAPstj23SmhxozRn7OTCakBfVINHapD1H9hrcKFBcIZdFFbCR1mWEfty1O3WOsESekqkt1AH3vOk66vAMG00FS5qO0nl'
      );

      // Redirect to the Stripe Checkout session using the session ID
      await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
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
        <button onClick={makePayment}>Click here</button>
      </div>
    </>
  );
};

export default Navbar;
