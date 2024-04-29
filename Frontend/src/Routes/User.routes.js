import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Faqs from '../Layouts/Comman/Faqs';
import Dashboards from '../Layouts/User/Dashboard/Dashboards';
import Help from '../Layouts/Comman/Help/Helpuser';
import Stocklist from '../Layouts/User/Stock/Clientservice';
import Strategies from '../Layouts/User/Strategy/Strategies';
import Profile from '../Layouts/Comman/Profile/Profile';
import Bresponse from '../Layouts/User/Brokerresponse/Bresponse';

import Orders from '../Layouts/User/Trade/Order';
import TradeHistory from '../Layouts/User/Trade/TradeHistory';

import Subscriptiondata from '../Layouts/User/Subscription/Subscriptiondata';





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
                    <Route path="/strategy" element={<Strategies />} />
                    <Route path="/broker-response" element={<Bresponse />} />

                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/orders" element={<Orders />} />
                    <Route exact path="/positions" element={<TradeHistory />} />
                    <Route exact path="/subscription" element={<Subscriptiondata />} />









                </Routes>

            </div>
        </>
    )
}

export default User_Routing