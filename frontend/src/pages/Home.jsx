import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import house from '../assets/houses.png'
import rooms from '../assets/rooms.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBuildingUser, faBuildingCircleCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Footer from '../layouts/Footer/Footer';

const Home = () => {
  const [token, setToken] = useState(null);
  const totalUser = 20;
  const totalProperty = 10;
  const totalRent = 6;

  return (
    <div>
      <div className='top-firt-div flex flex-wrap  mt-24 justify-between'>
        <div className="left w-[45%] justify-center mt-10 ">
          <div className="flex px-44 -mx-12">
            <p className='h-[10%] w-full text-blue-500 text font-mono text-xl hover:underline underline-offset-[5px] '>Rent with confidence: Don't miss chance</p>
          </div>
          <div>
            <p className='mt-5 mx-[7rem] text-5xl tracking-wider font-semibold'>
              Find best properties for
              <span class="text-blue-600 underline underline-offset-8 mx-[0.75rem] ">
                Rent</span>
              that <br />suits you</p>
          </div>
          <div className='mx-[7rem] my-[2rem] text-slate-400 text-wrap'>
            <p>We help you to rent the wide and highest quality of property which is suitable for your budget</p>
          </div>
          <div className="search w-full h-full ">
            <form action="search" className='flex w-[60%] h-[3.25rem] rounded-full mx-[9rem] relative'>
              <input type="text" className='w-full h-full border-[0.02rem] border-black px-5 rounded-full outline-[0.1rem] outline-blue-300' />
              <button className='absolute right-[0.5rem] top-[0.6rem] px-4 py-[0.3rem]
            bg-gradient-to-r from-green-300 font-semibold to-green-500 text-grey-300 rounded-full
            hover:bg-gradient-to-r hover:from-grey-500 hover:to-green-700 hover:text-white
            ' type=''>Search</button>
            </form>
          </div>

        </div>
        {/* right div */}
        <div className="right flex w-[50%] h-[55vh]">
          <div className="main h-full w-[101%] -mx-20 shadow-lg rounded">
            <img src={house} alt="house" className='w-full h-full rounded-3xl' />
          </div>
          {/* two images */}
          <div className='mx-32 flex flex-col justify-around items-center w-2/3'>
            <div className="w-full">
              <img src={rooms} alt="rooms" className='rounded-3xl' />
            </div>
            <div className="w-full">
              <img src={rooms} alt="rooms" className='rounded-3xl' />
            </div>
          </div>
        </div>
      </div>
      <div className="second flex justify-center rounded-tl-[5rem] rounded-br-[5rem] shadow-md">
        <div className="showing-data flex w-[100%] rounded-tl-[5rem] rounded-br-[5rem] bg-sky-200 h-[13rem] mt-24 justify-around">
          <div className="user-data h-full ">
            <div className='my-5 mx-[55px]'>
              <FontAwesomeIcon icon={faUsers}
                size='3x'
                style={{ color: 'black', paddingTop: "10px" }}
                className=' cursor-pointer relative'
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className='text-xl ml-10'>Total User</div>
            <div className='text-xl ml-16'>{totalUser}</div>
          </div>
          <div className="property-data h-full ">
            <div className='my-5 mx-[35%]'>
              <FontAwesomeIcon icon={faBuildingUser}
                size='3x  '
                style={{ color: 'black', paddingTop: "10px" }}
                className='cursor-pointer relative'
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className='text-xl '>total Properties</div>
            <div className='text-xl mx-12 '>{totalProperty}</div>
          </div>
          <div className="property-data h-full  ">
            <div className='my-5 mx-[60px]'>
              <FontAwesomeIcon icon={faBuildingCircleCheck}
                size='3x'
                style={{ color: 'black', paddingTop: "10px" }}
                className=' cursor-pointer relative'
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className='text-xl'>Total property Rent</div>
            <div className='text-xl ml-[4.5rem]'>{totalRent}</div>
          </div>
        </div>
      </div>
      
      <div>
      <div className='last-div flex flex-wrap mt-14 justify-between'>
        <div className="left justify-center mt-10 w-full">
          <div className="flex mx-[7rem] justify-around">
            <p className='h-[10%] w-1/2 -mx-[20.5rem]  text-blue-500 text text-lg hover:underline underline-offset-[5px] '>Properties for You</p>
            <NavLink to='/properties'>
            <div className='flex hover:border-1 px-5 py-2 hover:border-black hover:bg-green-100
            hover:rounded-full -mt-3 hover:outline-1 hover:outline-black'>
              <p className='text-lg'>Explore more</p>
              <FontAwesomeIcon icon={faArrowRight}
                size='x'
                style={{ color: 'black', paddingTop: "10px" }}
                className=' cursor-pointer -mt-[0.1rem] mx-2'
                onClick={() => setOpen(!open)}
              />
              </div>
            </NavLink>
          </div>
          <div>
            <p className='mt-5 mx-[7rem] text-3xl tracking-wider font-semibold'>
              Featured Properties
            </p>
          </div>
          <div className='flex flex-wrap my-2 mx-[3rem]'>
            <PropertyCard/>
            <PropertyCard/>
            <PropertyCard/>
            <PropertyCard/>
            
          </div>
        </div>
      </div>
      </div>

      {/* footer section */}
      <div>
      <Footer />
      </div>
    </div>
  );
};

export default Home;
