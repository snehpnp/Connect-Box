import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AdminRouting from './Admin_routes';
import EmployeeRouting from './Employee_routes';
import SubadminRouting from './Subadmin_routes';
import UserRouting from './User_routes';

import Login from '../Layouts/Auth/Login';

const Routing = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const user_details = JSON.parse(localStorage.getItem("user_details"));
        const roles = JSON.parse(localStorage.getItem('user_role'));

        // Check if user details exist
        if (!user_details || !roles || user_details === "null" || roles === "null") {
            navigate("/login");
            return;
        }

        // Redirect based on user role
        switch (roles) {
            case "ADMIN":
                if (location.pathname === "/login") {
                    navigate("/admin/dashboard");
                }
                break;
            case "USER":
                if (location.pathname === "/login") {
                    navigate("/client/dashboard");
                }
                break;
            case "SUBADMIN":
                if (location.pathname === "/login") {
                    navigate("/subadmin/clients");
                }
                break;
            case "SUPERADMIN":
                if (location.pathname === "/login") {
                    navigate("/super/dashboard");
                }
                break;
            default:
                break;
        }
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/admin/*" element={<AdminRouting />} />
            <Route path="/employee/*" element={<EmployeeRouting />} />
            <Route path="/subadmin/*" element={<SubadminRouting />} />
            <Route path="/user/*" element={<UserRouting />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Routing;
