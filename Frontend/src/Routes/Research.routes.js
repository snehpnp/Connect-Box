import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';

import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';

import Empdashboard from '../Layouts/Employee/Dashboard/Empdashboard';
import Wallets from '../Layouts/Comman/Wallet/Wallets';



// strategydesc

const Research = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >
                <Routes>
                    <Route exact path="/dashboard" element={<Empdashboard />} />
                    <Route exact path="/wallet" element={<Wallets />} />

                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/faqs" element={<Faqs />} />

                </Routes>
            </div>


        </>
    )
}

export default Research
