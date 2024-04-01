import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import login from "../assets/login.jfif";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce, Zoom, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { signIn } from '../features/user/userSlice';
import {setCredentials} from '../features/authentication/authSlice'

const Login = () => {
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

  const dispatch = useDispatch();

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
        dispatch(signIn(value))
        // dispatch(setCredentials())
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
        toast.error(error.response.data.errors.authentication); // Display error message to user
      } else {
        console.log(error); // Log other errors to console
      }
    }
  }

  return (
    <div>
      <div className="form-signup flex h-[100vh] justify-around">
        <div className='flex-col'>
          <div>
          <p className='font-mono font-thin text-xl mr-[50%] text-blue-600 ml-[85vh] bg-opacity-'>"Login Yourself"</p>
          </div>
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
          <div className='sm:mx-[20em] sm:my-[5%] sm:h-[900px]'>
            <img src={login} alt="this is login" />
          </div>
      </div>
    </div>
  )
}

export default Login
