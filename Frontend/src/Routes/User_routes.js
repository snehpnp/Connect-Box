import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Faqs from '../Layouts/Comman/Faqs';
import Dashboards from '../Layouts/User/Dashboard/Dashboards';

import Help from '../Layouts/Comman/Help';
import Stocklist from '../Layouts/User/Stock/Clientservice';
import Stocklist1 from '../Layouts/User/Stock/Clientservice1';

import Strategies from '../Layouts/User/Strategy/Strategies';


import Profile from '../Layouts/Comman/Profile/Profile';

import Orders from '../Layouts/User/Trade/Order';



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
                    <Route path="/stock" element={<Stocklist />} />
                    <Route path="/stock1" element={<Stocklist1 />} />

                    <Route path="/strategy" element={<Strategies />} />

                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/orders" element={<Orders />} />
                    <Route exact path="/positions" element={<Orders />} />
                    <Route exact path="/open-positions" element={<Orders />} />
                    <Route exact path="/broker-response" element={<Orders />} />
                    <Route path="/payment" element={<Orders />} />









                </Routes>

            </div>
        </>
    )
}

export default User_Routing
