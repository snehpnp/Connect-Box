import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';

import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';

import Empdashboard from '../Layouts/Employee/Dashboard/Empdashboard';
import Wallets from '../Layouts/Comman/Wallet/Wallets';


//Strategy 
import AllStrategy from '../Layouts/Researcher/Service/Strategys/Strategy'
import Edit_Strategies from '../Layouts/Researcher/Service/Strategys/Edit_Strategies'






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
                    <Route exact path="/strategys" element={<AllStrategy />} />
                    <Route exact path="/edit/strategies/:id" element={<Edit_Strategies />} />


                </Routes>
            </div>


        </>
    )
}

export default Research
