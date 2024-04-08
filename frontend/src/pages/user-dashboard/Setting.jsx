import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, NavLink } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const Setting = () => {
  const [userData, setUserData] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handleLogout=()=>{
    console.log('clicked')
    const token = localStorage.removeItem('token');
    if(!token){

      navigate('/login')
    }
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
      <div className='flex justify-center w-[100vw] h-full bg'>
        <div className=' w-1/2 relative mr-[25rem] bg-red-100'>
          <div className="container flex justify-center absolute top-44 ">
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
            </div>
            <div>
            </div>
          </div>
              <button className='text-white bg-green-500 h-10 w-[30vh] my-[5vh] ml-[20vw] rounded float-left hover:bg-green-700 transition-all delay-75 hover:text-lg absolute bottom-72 text-md '
              oncClick={()=>handleLogout()}
              >LOGOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Setting
