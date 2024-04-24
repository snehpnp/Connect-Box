import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';
import Empdashboard from '../Layouts/Employee/Dashboard/Empdashboard';
import Wallets from '../Layouts/Comman/Wallet/Wallets';
import AllStrategy from '../Layouts/Admin/Researcher/Services/strategy/Allstrategy'
import Companies from '../Layouts/Comman/Company/Companies';


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
                    <Route exact path="/allstrategy" element={<AllStrategy />} />
                    <Route exact path="/company" element={<Companies/>} />
                      
                    

                </Routes>
            </div>


        </>
    )
}

export default Research
