import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AdminRouting from './Admin_routes';
import EmployeeRouting from './Employee_routes';
import SubadminRouting from './Subadmin_routes';
import UserRouting from './User_routes';
import ResearchRouting from './Research_route';



import Login from '../Layouts/Auth/Login';
import Register from '../Layouts/Auth/Register';


const Routing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem('user_role'));
    const user_details = JSON.parse(localStorage.getItem("user_details"));

    useEffect(() => {
        if (location.pathname === "/register") {
            navigate("/register");
            return;
        }
        // Check if user details exist
        if (!user_details || !roles || user_details === "null" || roles === "null" || location.pathname === "/login") {
            navigate("/login");
            return;
        }

       
        // Redirect based on user role and route prefix
        switch (roles) {
            case "ADMIN":
                if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/admin")) {
                    navigate("/admin/dashboard");
                }
                break;
            case "USER":
                if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/user")) {
                    navigate("/user/dashboard");
                }
                break;
            case "SUBADMIN":
                if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/subadmin")) {
                    navigate("/subadmin/dashboard");
                }
                break;
            case "EMPLOYEE":
                if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/employee")) {
                    navigate("/employee/dashboard");
                }
                break;
                case "RESEARCH":
                    if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/research")) {
                        navigate("/research/dashboard");
                    }
                    break;
            default:
                break;
        }
    }, [navigate, location.pathname, roles, user_details]);

    return (
        <Routes>
            {/* Use wildcard (*) in the paths to capture all routes starting with a specific prefix */}
            <Route path="/admin/*" element={(roles === "ADMIN") ? <AdminRouting /> : <Login />} />
            <Route path="/subadmin/*" element={(roles === "SUBADMIN") ? <SubadminRouting /> : <Login />} />
            <Route path="/user/*" element={(roles === "USER") ? <UserRouting /> : <Login />} />
            <Route path="/employee/*" element={(roles === "EMPLOYEE") ? <EmployeeRouting /> : <Login />} />
            <Route path="/research/*" element={(roles === "RESEARCH") ? <ResearchRouting /> : <Login />} />


            {/* Add other routes here */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default Routing;
