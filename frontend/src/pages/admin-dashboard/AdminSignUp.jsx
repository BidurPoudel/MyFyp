import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axois from 'axios';
import { Bounce, Zoom, toast } from 'react-toastify';



const AdminSignUp = () => {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(value) {
    try {
      const response = await axois.post('http://localhost:3001/api/admin/signup', value);
      if (response.status === 200) {
        navigate('/admin/login')
      }
      toast.success('Successfully Admin Created', {
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
      } else {
        toast.error('An error occurred. Please try again later.'); // Generic error message
      }
    }
  }



  return (
    <div>
      <div className='flex  drop-shadow-xl justify-center mt-36 w-full h-full p-2'>
        <div className='w-1/2 border border-1 border-black shadow-2xl  '>
          <div className='flex-col '>
            <div className=' flex justify-center absolute ml-96 top-14'>
              <p className='font-mono font-thin text-2xl text-blue-600 '>"Sign Up As admin"</p>
            </div>
            <div className="flex  justify-center items-center mt-32">
              <form action="/admin/login" method='post' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="useranme">User Name <br /> </label>
                <input id="userame"
                  {...register("username", { required: true })}
                  placeholder="Enter your Name"
                  className="mb-7 p-[4vw] py-[0.56rem]  w-[24vw] border border-black rounded-lg outline-blue-500"
                /> {errors.userame && (
                  <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Email is required</p>
                )}<br />
                
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

                <button className='text-white bg-orange-500 w-[24vw] mt-4 mb-28 py-2 rounded-full'>
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSignUp
