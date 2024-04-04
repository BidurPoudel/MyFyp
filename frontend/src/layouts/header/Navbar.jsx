import React from 'react';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
// import KhaltiCheckout from "khalti-checkout-web";
// import config from "../../components/Khalti/KhaltiConfig";
import Account from '../../utils/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
  // let checkout = new KhaltiCheckout(config);

  return (
    <>
      <div className="navbar flex relative justify-end pr-[10vh] bg-blue-400 text-md h-[10vh] md:text-sm  sm:text-sm">
        <img src={logo} alt="" className="h-[119px] absolute rounded-full -top-[2vh] left-24" />
        <div className="nav-link ">
          <ul className='flex gap-10 mt-5 font-semibold text-lg'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => `
                inline-block sm:p-[10px] pb-[25px] duration-200 font-bold tracking-[.1em]
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
                inline-block sm:p-[10px] pb-[25px] duration-200 font-bold tracking-[.1em]
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
                // onClick={() => checkout.show({ amount: 500000 })}
                className={({ isActive }) => `
                inline-block sm:p-[10px] pb-[25px] duration-200 font-bold tracking-[.1em]
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
                size='2xl'
                style={{ color: 'black', paddingTop: "10px" }}
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
