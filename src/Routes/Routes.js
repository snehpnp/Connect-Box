import React from 'react';
import { Route, Routes } from "react-router-dom";

import Admin_Routing from './Admin_routes';
import MainHeader from '../Components/Dashboard/Header/Main_header';

// CP


// strategydesc

const Routing = () => {

 


    return (
        <>
            <MainHeader />
            <Routes>
                {/* <Route path="/super/*" element={(roles === "SUPERADMIN") ? <SuperAdmin /> : <Login />} /> */}
                {/* <Route path="/admin/*" element={(roles === "ADMIN") ? <Admin_Routing /> : <Login />} /> */}
                {/* <Route path="/admin/*" element={<Admin_Routing />} /> */}

                <Route path="/admin/*" element={<Admin_Routing />} />

                {/* <Route path="/subadmin/*" element={(roles === "SUBADMIN") ? <SubAdmin /> : <Login />} /> */}
                {/* <Route path="/client/*" element={gotodashboard != null ? <Client /> : (roles === "USER") ? <Client /> : <Login />} />

                <Route path="/subadmin/*" element={gotodashboard != null ? <SubAdmin /> : (roles === "SUBADMIN") ? <SubAdmin /> : <Login />} />

                <Route path="/subadmin/*" element={(roles === "SUBADMIN") ? <SubAdmin /> : <Login />} />
                <Route path="/client/*" element={gotodashboard != null ? <Client /> : (roles === "USER") ? <Client /> : <Login />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}

                {/* <Route path="/forget" element={<ForgetPassword />} />
                <Route path="/profile" element={<ForgetPassword />} />
                <Route path="/update/:id" element={<UpdatePassword />} />
                <Route path="/Testing" element={<Testing />} />
                <Route path="/notfound" element={<Deactivate_Company />} /> */}

                {/* <Route path="/*" element={<NotFound />} /> */}

            </Routes>


        </>
    )
}

export default Routing
