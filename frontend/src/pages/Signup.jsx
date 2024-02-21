import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''

  })
  const[errorMessage, setErrorMessage] = useState('');
  
  async function onSubmit(values) {
    try {
      const response = axios.post('http://localhost:3001/api/user/signup', values)
      console.log(values)
      console.log(response.data);
      // navigate('/login')
    } catch (error) {
      if(error){
        if (error.response) {
          setErrorMessage(error.message);
          // setTimeout(() => {
          //   setErrorMessage('');
          // }, 5000);
      }
    }
  }

  }

  return (
    <div>
       <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-100 px-4 py-2 rounded-md transition-opacity duration-500 ${
          errorMessage ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <p className="text-red-600">{errorMessage}</p>
      </div>
      <div className="form-signup flex bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 h-[100vh]">
        <div>
          <p className='font-mono font-bold text-4xl text-center ml-[85vh]'>Register <br /> For Free!!</p>
          <div className="sign-up">
            <form method="post" action='/' onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="username">First Name <br /> </label>
              <input id="username"
                placeholder="Enter your Name"
                className="input-field"
                {...register("username", { required: true })}
              /> {errors.username && (
                <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 -mb-2">Username is required</p>
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
                className="input-field"
              />
              {errors.phoneNumber && (
                <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Password is required</p>
              )}
              <br />
              <button className='input-button'>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
