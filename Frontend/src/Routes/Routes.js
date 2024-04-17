import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AdminRouting from './Admin_routes';
import EmployeeRouting from './Employee_routes';
import SubadminRouting from './Subadmin_routes';
import UserRouting from './User_routes';

import Login from '../Layouts/Auth/Login';
import EditSubAdmin from '../Layouts/Admin/Subadmin/EditSubAdmin'
import Register from '../Layouts/Auth/Register';


const Routing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem('user_role'));
    const user_details = JSON.parse(localStorage.getItem("user_details"));


    useEffect(() => {
        // Check if user details exist
        // if (!user_details || !roles || user_details === "null" || roles === "null" || location.pathname === "/login") {
        //     navigate("/login");
        //     return;
        // }

        if (location.pathname === "/register") {
            navigate("/register");
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
    }, [navigate, location.pathname, roles, user_details]);

    return (
        <Routes>
            <Route path="/admin/*" element={(roles === "ADMIN") ? <AdminRouting /> : <Login />} />
            <Route path='/editSubAdmin' element={<EditSubAdmin />} />
            <Route path="/employee/*" element={(roles === "EMPLOYEE") ? <EmployeeRouting /> : <Login />} />
            <Route path="/subadmin/*" element={(roles === "SUBADMIN") ? <SubadminRouting /> : <Login />} />
            <Route path="/user/*" element={(roles === "USER") ? <UserRouting /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

        </Routes>
    );
}

export default Routing;
