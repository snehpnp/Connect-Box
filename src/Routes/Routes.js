import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AdminRouting from './Admin_routes';
import EmployeeRouting from './Employee_routes';
import SubadminRouting from './Subadmin_routes';
import UserRouting from './User_routes';
import StrategyForm from '../externalS/demoForm'

import Login from '../Layouts/Auth/Login';

const Routing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user_details = JSON.parse(localStorage.getItem("user_details"));
    const roles = JSON.parse(localStorage.getItem('user_role'));

    useEffect(() => {

        // Check if user details exist
        if (!user_details || !roles || user_details === "null" || roles === "null") {
            navigate("/login");
            return;
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
            <Route path='/addStrategy' element={<StrategyForm/>}/>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Routing;
