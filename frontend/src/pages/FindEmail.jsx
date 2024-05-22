import React, { useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from  'react-redux'
import { Bounce, Zoom, toast } from 'react-toastify';
import find from '../assets/images.jfif'
import { Navigate, useNavigate } from 'react-router';
import { setEmail, selectEmail } from '../features/user/userEmail';
const FindEmail = () => {
    const [email, setEmailAddres] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmailAddres(value);
            dispatch(setEmail(value))
        }
    };

    const handleSubmit = async (event) => {
        console.log('clicked')
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3001/api/user/findemail',
                { email }
            );
            setMessage(response.data.message);

            
                toast.success('Link is sent to your email!!', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                })
                navigate('/login')
            
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.errors && error.response.data.errors.authentication) {
                    toast.error(error.response.data.errors.authentication);
                } else if (error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
            }
        }
    };

    return (
        <>
            <div className='ml-32 mt-32 flex flex-wrap justify-center mr-16'>
                <div className=' justify-center items-center mx-52 py-16 px-20 shadow-md shadow-black'>
                    <div className='flex justify-center'>
                        <img src={find} alt="search email" className=' h-[10rem]' />
                    </div>
                    <h2 className='text-xl flex justify-center -mt-2 mb-5 font-semibold'>Your Email Address</h2>
                    <div className='text-gray-500 ml-12 my-3'>A Link will be send to your email address</div>
                    <form action="/login" method='post' onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <br />
                            <input
                                type="text"
                                className='forgetPassword'
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                       <div className='flex justify-center'>
                       <button className='w-full bg-green-500 rounded-md p-2 text-white font-normal hover:bg-green-700 '>Send
                        </button>
                       </div>
                    </form>
                    {message && <div>{message}</div>}
                </div>
            </div>
        </>
    );
};

export default FindEmail;
