import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import house from '../assets/houses.png';
import owner from '../assets/owner.webp'
import rooms from '../assets/rooms.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBuildingUser, faBuildingCircleCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Footer from '../layouts/Footer/Footer';

const Home = () => {
  const [allUsers, setUsers] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [allRents, setAllRents] = useState([]);
  // const userToken = localStorage.getItem('token')
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const makePayment = async () => {
    console.log('clicked')
    try {
      const payload = {
        "return_url": "http://127.0.0.1:5173/create",
        "website_url": "http://127.0.0.1:5173/properties",
        "amount": 1300,
        "purchase_order_id": "test12",
        "purchase_order_name": "test",
        "customer_info": {
          "name": "Bidur poudel",
          "email": "opbi2058@gmail.com",
          "phone": "9800000123"
        },
      };
      const response = await axios.post('http://localhost:3001/api/payment/initiate-checkout', payload);
      const { payment_url } = response.data;
      window.location.href = payment_url;
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };



  // const [token, setToken] = useState(null);
  const totalUser = 20;
  const totalProperty = 10;
  const totalRent = 6;

  const allUserUrl = 'http://localhost:3001/api/admin/allUsers';
  const allPropertiesUrl = 'http://localhost:3001/api/admin/allProperties';
  const allRentUrl = 'http://localhost:3001/api/admin/allRents';
  const allReportedPropertiesUrl = 'http://localhost:3001/api/admin/allReportedProperties';


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(allUserUrl);
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    const fetchProperties = async () => {
      try {
        const response = await axios.get(allPropertiesUrl);
        console.log(response.data)
        setAllProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    const fetchRentedProperties = async () => {
      try {
        const response = await axios.get(allRentUrl);
        console.log(response.data)
        setAllRents(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    const fetchReportedProperties = async () => {
      try {
        const response = await axios.get(allReportedPropertiesUrl);
        console.log(response.data)
        setAllReportedProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchUsers();
    fetchProperties();
    fetchRentedProperties();
    fetchReportedProperties();

  }, [])

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
              <span className="text-blue-600 underline underline-offset-8 mx-[0.75rem] ">
                Rent</span>
              that <br />suits you</p>
          </div>
          <div className='mx-[7rem] my-[2rem] text-slate-400 text-wrap'>
            <p>We help you to rent the wide and highest quality of property which is suitable for your budget</p>
          </div>
          <div className="explore-more w-full h-full ">
            <div className="flex mx-[7rem] mb-5 justify-around">
              <NavLink to='/properties'>
                <div className='flex hover:border-1 px-5 py-2 hover:border-black hover:bg-green-100
                hover:rounded-full -mt-6  hover:outline-1 hover:outline-black'>
                  <p className='text-lg'>Explore more</p>
                  <FontAwesomeIcon icon={faArrowRight}
                    size='1x'
                    style={{ color: 'black', paddingTop: "10px" }}
                    className=' cursor-pointer -mt-[0.1rem] mx-2'
                    onClick={() => setOpen(!open)}
                  />
                </div>
              </NavLink>
            </div>
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
            <div className='text-xl ml-16'>{allUsers.length}</div>
          </div>
          <div className="property-data h-full ">
            <div className='my-5 mx-[35%]'>
              <FontAwesomeIcon icon={faBuildingUser}
                size='3x'
                style={{ color: 'black', paddingTop: "10px" }}
                className='cursor-pointer relative'
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className='text-xl '>total Properties</div>
            <div className='text-xl mx-12 '>{allProperties.length}</div>
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
            <div className='text-xl ml-[4.5rem]'>{allRents.length}</div>
          </div>
        </div>
      </div>

      <div>
        <div className='last-div flex flex-wrap mt-14 justify-between'>
          <div className="left justify-center mt-10 w-full">

            <div>
              <p className='flex justify-center ml-52 mt-2 text-5xl tracking-wider font-semibold'>
                Be Owner by Listing Your property
              </p>
            </div>
            <div className='flex flex-wrap my-2 mx-[3rem]'>
              <div className="">
                <img src={owner} alt="house" className=' rounded-3xl' />
              </div>
              <button className='text-white bg-green-500 h-10 w-[30vh] mt-[250px] ml-[20vw] rounded float-left hover:bg-green-700 transition-all delay-75 hover:text-lg'
                onClick={() => makePayment()}

              >BE OWNER</button>
            </div>
          </div>
        </div>
      </div>
        <div>
        </div>
      {/* footer section */}
      <div className='w-full bg-red-100 '>
      <Footer/>
      </div>
    </div>
  );
};

export default Home;