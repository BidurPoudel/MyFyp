import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, Zoom, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        console.log('clicked')
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3001/api/user/changepassword',
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            setMessage(response.data.message);

            if (response.status === 200) {
                toast.success('Your password is changed !!', {
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
                navigate('/owner/setting')
            }
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
            <div className='ml-32 mt-44'>
                <div className=' justify-center items-center mt- mx-52 py-16 px-20 bg-slate-100 shadow-md'>
                    <h2 className='text-xl flex justify-center -mt-2 mb-5 font-semibold'>Change Your Password</h2>
                    <form action="/login" method='post' onSubmit={handleSubmit}>
                        <div>
                            <label>Old Password:</label>
                            <input
                                type="password"
                                name="oldPassword"
                                className='mx-4 '
                                value={oldPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>New Password:</label>
                            <input
                                type="password"
                                className='mx-3'
                                name="newPassword"
                                value={newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className='ml-2 bg-green-500 rounded p-2 text-white font-normal hover:bg-green-700 '>Change Password</button>
                    </form>
                    {message && <div>{message}</div>}
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
