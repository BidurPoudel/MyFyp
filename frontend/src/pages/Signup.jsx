import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Model from 'react-modal';
import login from "../assets/login.jfif";
import { Bounce, Zoom, toast } from 'react-toastify';

const SignUp = () => {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''

  })
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(values) {
    try {
      const response = axios.post('http://localhost:3001/api/user/signup', values)
      console.log(values)

        toast.success('email verification link is sent to email address', {
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
      setValues({
        username: '',
        email: '',
        password: '',
        phoneNumber: ''
      });
      reset();
    }  catch (error) {
      if (error.response && error.response.data && error.response.data.errors === "user already existed") {
        toast.error('User already exists');
      } else if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.authentication) {
        toast.error(error.response.data.errors.authentication); // Display authentication error message
      } else {
        toast.error('An error occurred. Please try again later.'); // Generic error message
      }
    }
  }

  return (
    <div>
      <div className="form-signup flex bg-gradient-to-r from-orange-300 via-purple-300 to-white h-[100vh]">
      </div>
      <Model
        isOpen={true}
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
        <div className='flex w-full h-full bg-red-200'>
          <div className="left-image bg-blue-200 w-1/2">
            <img src={login} alt="this is login" className='w-full h-full' />
          </div>
          <div className='right bg-green-100 w-1/2'>
            <div className='flex justify-center text-5xl font-mono mt-14'>
              Create an Account
            </div>
            <div className="w-full mt-[5vh] px-[9.5rem] py-[1rem]">
              <form method="post" action='/' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">First Name <br /> </label>
                <input id="username"
                  placeholder="Enter your Name"
                  className="input-field"
                  {...register("username", { required: true })}
                /> {errors.username && (
                  <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Username is required</p>
                )}<br />

                <label htmlFor="email">Email <br /> </label>
                <input id="email"
                  {...register("email", { required: true })}

                  placeholder="Enter your Name"
                  className="input-field"
                /> {errors.email && (
                  <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Email is required</p>
                )}<br />

                <label htmlFor="password">Password <br /> </label>
                <input
                  type='password'
                  placeholder="Enter your new password"
                  className="input-field"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-600 font-xs font-thin -mt-3 -mb-2">Password is required</p>
                )}
                <br />

                <label htmlFor="phoneNumber">Phone number <br /> </label>
                <input id="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                  placeholder="Enter your phone number"
                  className="input-field py-2"
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Password is required</p>
                )}
                <br />
                <button className='text-white bg-green-500 w-[24vw] mt-4 mb-10 py-2 rounded-full'>
                  Sign Up
                </button>
              </form>
              <div className="flex justify-center -mt-8">
                Have an account already? <NavLink to='/login'><span className='text-blue-500 ml-2'> Login </span></NavLink>
              </div>
            </div>
          </div>
        </div>
      </Model>
    </div>
  )
}

export default SignUp
