import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';

import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';

import Empdashboard from '../Layouts/Employee/Dashboard/Empdashboard';
import AllUsers from '../Layouts/Employee/Users/Alluser';
import AddUser  from '../Layouts/Employee/Users/Adduser';
import Edituser from '../Layouts/Employee/Users/Edituser'
import Help from '../Layouts/Comman/Help/HelpEmployee.js';
import Signal  from "../Layouts/Employee/Signal/Signal.js";
import TradeHistory from '../Layouts/Employee/TradeHistory/TradeHistory.js' 
import Settings from '../Layouts/Comman/Setting_Page/Settings.js';



const Employee_Routing = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >
                <Routes>
                    <Route exact path="/dashboard" element={<Empdashboard />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/allusers" element={<AllUsers />} />
                    <Route exact path="/user/add" element={<AddUser />} />
                    <Route exact path="/user/edit/:id" element={<Edituser />} />
                    <Route exact path="/setting" element={<Settings />} />

     
                    
                    <Route exact path="/faqs" element={<Faqs />} />
                    <Route exact path='/help' element = {<Help/>}/>
                    <Route exact path='/signal' element = {<Signal/>}/>
                    <Route exact path='/tradehistory' element = {<TradeHistory/>}/>

                </Routes>
            </div>


        </>
    )
}

export default Employee_Routing
