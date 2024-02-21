import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
const Home = () => {
  const [user, setUser]= useState([])
  const url = 'http://localhost:3001/api/user/login';
  const getData = async (url) => {
    try {
      const response = await axios.post(url);
      console.log(response.data)
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.authentication) {
        toast.error(error.response.data.errors.authentication); // Display error message to user
      } else {
        console.log(error); // Log other errors to console
      }
    }
  };

  useEffect(() => {
    getData(url);
  }, []);
  return (
    <>
      {user}
    </>
  )
}

export default Home
