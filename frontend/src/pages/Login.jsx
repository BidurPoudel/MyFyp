import React, { useEffect, useState } from 'react'
import Model from 'react-modal'
import login from "../assets/login.jfif";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { Bounce, Zoom, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const [isVisible, setIsVisible] = useState(true)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [values, setValeus] = useState({
    email: '',
    password: ''
  })



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('login properly!!')
      console.log('User not logged in');
    }
  }, []);

  async function onSubmit(value) {
    try {
      const response = await axios.post('http://localhost:3001/api/user/login', value, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`
        },
        withCredentials: true,
        body: JSON.stringify(value)
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      if (response.status === 200) {
        navigate('/')
      }
      console.log(jwtDecode(token))
      toast.success('logged in', {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      })

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.authentication) {
        toast.error(error.response.data.errors.authentication);
      }else {
        toast.error('An error occurred. Please try again later.'); // Generic error message
      }
    }
  }

  return (
    <div>
      <div className="form-signup flex bg-gradient-to-r from-orange-300 via-purple-300 to-white h-[100vh]">
      </div>
      <Model
        isOpen={isVisible}
        onRequestClose={() => setIsVisible(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '85%',
            width: '80%',
            borderRadius: '25px',
            animation: 'fade-in 5s forwards',
            transition: 'top 1s ease-out',
          },
        }}
      >
        <div className='flex relative w-full h-full p-2'>
          <div className='w-1/2 bg-cyan-50 shadow-sm'>
            <div className='flex-col '>
              <div className=' flex justify-center absolute left-32 top-14'>
                <p className='font-mono font-thin text-5xl text-blue-600 '>"Login Yourself"</p>
              </div>
              <div className="flex  justify-center items-center mt-44">
                <form action="/login" method='post' onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="email">Email <br /> </label>
                  <input id="email"
                    {...register("email", { required: true })}

                    placeholder="Enter your Name"
                    className="mb-7 p-[4vw] py-[0.56rem]  w-[24vw] border border-black rounded-lg outline-blue-500"
                  /> {errors.email && (
                    <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Email is required</p>
                  )}<br />

                  <label htmlFor="password" >Password <br /> </label>
                  <input
                    type='password'
                    placeholder="Enter your new password"
                    className="mb-7 p-[4vw] py-[0.56rem] w-[24vw] border border-black rounded-lg outline-blue-500"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-red-600 font-xs font-thin -mt-3 -mb-2">Password is required</p>
                  )}
                  <br />

                  <button className='text-white bg-green-500 w-[24vw] mt-4 mb-10 py-2 rounded-full'>
                    login
                  </button>
                </form>
              </div>
                <div className='flex justify-center'>
                  <div>
                    Don't have an account yet? <NavLink to='/signup'><span className='text-blue-500'> Sign up </span></NavLink>
                  </div>
                </div>
            </div>
          </div>
          <div>
            <img src={login} alt="this is login" className='h-full w-full' /></div>
        </div>
      </Model>
    </div>
  )
}

export default Login
