import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';

import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';

import Empdashboard from '../Layouts/Employee/Dashboard/Empdashboard';

import Companies from '../Layouts/Comman/Company/Companies';



// strategydesc

const Research = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >
                <Routes>
                    <Route exact path="/dashboard" element={<Empdashboard />} />

                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/faqs" element={<Faqs />} />
                    <Route exact path="/company" element={<Companies/>} />
                      
                    

                </Routes>
            </div>


        </>
    )
}

export default Research
