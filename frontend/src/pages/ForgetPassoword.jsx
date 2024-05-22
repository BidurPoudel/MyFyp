import React, { useState } from 'react';
import axios from 'axios';
import Model from 'react-modal'
import { Bounce, Zoom, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, selectEmail } from '../features/user/userEmail'
const ForgetPassword = () => {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const emails = useSelector(selectEmail);
    console.log(emails)
    // console.log(email)

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        console.log('clicked')
        event.preventDefault();
        if (confirmPassword !== password) {
            toast.error('confirm password is wrong')
        }
        try {
            const response = await axios.post(
                'http://localhost:3001/api/user/forgotPassword',
                { emails, password, confirmPassword }
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
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setPassword(!showPassword);
    };
    return (
        <>
            <Model

                isOpen={isVisible}
                onRequestClose={() => setIsVisible(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0,0 )',
                    },
                    content: {
                        boxShadow: 'revert',
                        top: '50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: '75%',
                        width: '50%',
                        overflow: 'hidden',
                        borderRadius: '25px',
                        animation: 'fade-in 5s forwards',
                        transition: 'top 1s ease-out',
                    },
                }}
            >

                <div className='ml-1 mt-16 w-full'>
                    <div className=' justify-center items-center mt- mx-52 py-16 px-20'>
                        <h2 className='text-xl flex justify-center -mt-2 mb-5 w-full font-semibold'>Forgot Password</h2>
                        <div className="flex justify-center">
                            <form action="/login" method='post' onSubmit={handleSubmit}>
                                <div>
                                    <label>Password:</label><br />
                                    <div className="flex">
                                    <input
                                       type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        className='forgetPassword'
                                        onChange={handleChange}
                                        required
                                    />
                                    <button type="button" onClick={toggleShowPassword}  
                                    className='ml-2 bg-blue-200 p-2 mb-3 rounded border'>
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                    </div>
                                </div>
                                <div>
                                    <label>Cofirm Password:</label><br />
                                    <div className="flex">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className='forgetPassword'
                                        name="confirmPassword"
                                        value = {confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button type="button" onClick={toggleShowPassword}  
                                    className='ml-2 bg-blue-200 p-2 mb-3 rounded border'>
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                    </div>

                                </div>
                                <button className='w-[89%] bg-green-500 rounded p-2 text-white font-normal hover:bg-green-700 '>Reset Password</button>
                            </form>
                        </div>
                        {message && <div>{message}</div>}
                    </div>
                </div>
            </Model>
        </>
    );
};

export default ForgetPassword;
