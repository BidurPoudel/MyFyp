import React from 'react'
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const navigate = useNavigate()
  const navigation=()=>{
    navigate('/admin/dashboard')
  }
  return (
    <div>
      <div>
      </div>
      <button onClick={navigation} className=''>this </button>
    </div>
  )
}

export default AdminLogin
