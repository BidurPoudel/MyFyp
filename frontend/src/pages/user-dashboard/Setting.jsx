import axios from 'axios'
import React, { useState } from 'react'

const Setting = () => {
  const [userData, setUserData] = useState([])

  const user = async () => {
    try {
    const response = await axios.get('http://localhost:3001/api/user/profile', {
      headers: {
        'Content-Type': 'application/json', // Example header, adjust as needed
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    console.log(response.data)
    console.log(token);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      this is
    </div>
  )
}

export default Setting
