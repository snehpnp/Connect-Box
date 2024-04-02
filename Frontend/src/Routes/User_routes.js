import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Faqs from '../Layouts/Admin/Help/Faqs';
import Dashboards from '../Layouts/User/Dashboard/Dashboards';

import Help from '../Layouts/Admin/Help/Help';



// strategydesc

const User_Routing = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >

                <Routes>
                    <Route exact path="/dashboard" element={<Dashboards />} />


                    <Route  path="/faqs" element={<Faqs />} />
                    <Route  path="/help" element={<Help />} />


              

                </Routes>

            </div>
        </>
    )
}

export default User_Routing
