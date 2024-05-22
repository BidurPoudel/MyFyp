import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, NavLink } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const Setting = () => {
  const [userData, setUserData] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handleLogout = async()=>{
    const token = localStorage.removeItem('token');
    navigate('/login')
  }

  const handleChangePassword=()=>{
    navigate('/owner/change-password')
  }

  useEffect(()=>{
    const user = async () => {
      try {
      const response = await axios.get('http://localhost:3001/api/user/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token 
        }
      });
      console.log(response.data)
      setUserData(response.data)
      console.log(userData)
      } catch (error) {
        console.log(error)
      }
    }
    user()
  },[])


  return (
    <div>
      <div className='flex justify-center w-[80vw] h-full'>
        <div className=' w-1/2 relative ml-[-10rem] my-5 shadow-md  shadow-black bg-Slate-200'>
            <div className='flex justify-center mt-20 text-5xl font-bold'>Your Details</div><br />
          <div className="container flex justify-center absolute top-44  ">
            <div className="img flex justify-center">
            <FontAwesomeIcon icon={faCircleUser}
                  size='5x'
                  style={{ color: '#373737', paddingTop: "15px" }}
                  className='-mt-1 cursor-pointer relative'
                  onClick={() => setOpen(!open)}
                /> 
            </div>
          </div>
          <div className="container flex absolute top-72 px-40 ">
            <div className=" justify-center">
              <p className='text-lg my-5 font-semibold'>User Name: <span className='mx-2'>{userData.username}</span></p>
              <p className='text-lg my-5 font-semibold'>Email address: <span className='mx-2'>{userData.email}</span></p>
              <p className='text-lg my-5 font-semibold'>Phone Number: <span className='mx-2'>{userData.phoneNumber}</span></p>
              <p className='text-lg my-5 font-semibold'>Change password: <button 
              className='bg-green-500 rounded p-2 ml-2 text-white font-normal hover:bg-green-700 '
              onClick={()=>handleChangePassword()}
              >Click here</button></p>
              
            </div>
            <div>
            </div>
          </div>
              <button className='text-white bg-green-500 h-10 w-[30vh] -my-[25vh] ml-[13vw] rounded hover:bg-green-700 transition-all delay-75 hover:text-lg absolute bottom-72 text-md '
              onClick={()=>handleLogout()}
              >LOGOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Setting
