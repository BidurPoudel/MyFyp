import React, { useEffect, useState } from 'react'

// import sign from "../assets/sign.png"
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce, Zoom, toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [values, setValeus] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''

  })

  async function onSubmit(values) {

    try {
      const response = await axios.post('http://localhost:3001/api/user/login', values, {
        headers: {
          'Content-Type': 'application/json', // Example header, adjust as needed
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      // console.log(response);
      // console.log(values);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(token)
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
      // navigate('/')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.authentication) {
        toast.error(error.response.data.errors.authentication); // Display error message to user
      } else {
        console.log(error); // Log other errors to console
      }
    }
  }

  return (
    <div>
      <div className="form-signup flex bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 h-[100vh]">
        <div>
          <p className='font-mono font-bold text-4xl text-center ml-[85vh]'>Register <br /> For Free!!</p>
          <div className="form">
            <form action="/login" method='post' onSubmit={handleSubmit(onSubmit)}>
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

              <button className='input-button'>
                login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
