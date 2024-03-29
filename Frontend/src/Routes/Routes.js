import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AdminRouting from './Admin_routes';
import EmployeeRouting from './Employee_routes';
import SubadminRouting from './Subadmin_routes';
import UserRouting from './User_routes';
import Profile from '../Layouts/Admin/Profile/Profile';


import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Login from '../Layouts/Auth/Login';

const Routing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem('user_role'));
    const user_details = JSON.parse(localStorage.getItem("user_details"));

    console.log("roles:-", roles)

    useEffect(() => {

        // Check if user details exist
        if (!user_details || !roles || user_details === "null" || roles === "null") {
            navigate("/login");
            return;
        }

        if (location.pathname === "/profile") {
            navigate("/profile");
        }

        // Redirect based on user role
        switch (roles) {
            case "ADMIN":
                if (location.pathname === "/login" || location.pathname === "/") {
                    navigate("/admin/dashboard");
                }
                break;
            case "USER":
                if (location.pathname === "/login" || location.pathname === "/") {
                    navigate("/user/dashboard");
                }
                break;
            case "SUBADMIN":
                if (location.pathname === "/login" || location.pathname === "/") {
                    navigate("/subadmin/dashboard");
                }
                break;
            case "SUPERADMIN":
                if (location.pathname === "/login" || location.pathname === "/") {
                    navigate("/employee/dashboard");
                }
                break;
            default:
                break;
        }
    }, [location.pathname]);


    return (
        <Routes>
            <Route path="/admin/*" element={(roles === "ADMIN") ? <AdminRouting /> : <Login />} />
            <Route path="/employee/*" element={(roles === "EMPLOYEE") ? <EmployeeRouting /> : <Login />} />
            <Route path="/subadmin/*" element={(roles === "SUBADMIN") ? <SubadminRouting /> : <Login />} />
            <Route path="/user/*" element={(roles === "USER") ? <UserRouting /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<>     <MainHeader />
                <Header />  <div className="page-wrapper"><Profile /></div></>} />

        </Routes>
    );
}

export default Routing;
