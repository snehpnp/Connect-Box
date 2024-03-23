import React from 'react'
import { useNavigate } from 'react-router-dom';

const Lodding = () => {
  const User = JSON.parse(localStorage.getItem("user_details"));
  const navigate = useNavigate()


  if (User.Role == "ADMIN") {
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 3000);
  }
  else if (User.Role == "SUBADMIN") {
    setTimeout(() => {
      navigate("/subadmin/dashboard");
    }, 3000);
  }
  else {
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 3000);
  }


  return (
    <div>
      <div className="center">
        WElCOME TO CONNECT BOX
      </div>
      <div className="center">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </div>
    </div>
  )
}

export default Lodding