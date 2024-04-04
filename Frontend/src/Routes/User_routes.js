import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Faqs from '../Layouts/Comman/Faqs';
import Dashboards from '../Layouts/User/Dashboard/Dashboards';

import Help from '../Layouts/Comman/Help';
import Stocklist from '../Layouts/User/Stock/Clientservice';
import Strategies from '../Layouts/User/Strategy/Strategies';




// strategydesc

const User_Routing = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >

                <Routes>
                    <Route exact path="/dashboard" element={<Dashboards />} />


                    <Route path="/faqs" element={<Faqs />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/stock" element={<Stocklist />} />
                    <Route path="/payment" element={<Stocklist />} />
                    <Route path="/strategy" element={<Strategies />} />






                </Routes>

            </div>
        </>
    )
}

export default User_Routing
