import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';


import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';

import Dashboard from '../Layouts/SuperAdmin/Dashboard/Dashboard';
import Panel from '../Layouts/SuperAdmin/Dashboard/Panel';
import History from '../Layouts/SuperAdmin/Dashboard/History';
import AllUser from '../Layouts/SuperAdmin/AllUSER/AllUser';





// strategydesc

const Superadmin = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >
                <Routes>
                    <Route exact path="/dashboard" element={<Dashboard />} />

                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/faqs" element={<Faqs />} />
                    <Route exact path="/Panel" element={<Panel/>} />
                    <Route exact path="/history" element={<History/>} />
                    <Route exact path="/alluser" element={<AllUser/>} />
            
                </Routes>
            </div>


        </>
    )
}

export default Superadmin
