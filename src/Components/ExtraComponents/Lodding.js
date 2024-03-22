import React from 'react'
import {  useNavigate } from 'react-router-dom';

const Lodding = () => {
    const navigate = useNavigate()
    setTimeout(() => {
      navigate("/admin/dashboard");
        
    },4000);
  return (
    <div>Lodding........</div>
  )
}

export default Lodding