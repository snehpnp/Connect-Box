import React from 'react';
import { Route, Routes } from "react-router-dom";
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';
import Empdashboard from '../Layouts/Employee/Dashboard/Empdashboard';
import Wallets from '../Layouts/Comman/Wallet/Wallets';
import Companies from '../Layouts/Comman/Company/Companies';
import AllStrategy from '../Layouts/Researcher/Service/Strategys/Strategy'
import Edit_Strategies from '../Layouts/Researcher/Service/Strategys/Edit_Strategies'
import AllServices from '../Layouts/Researcher/Service/allService/AllServices'

import Orders from '../Layouts/SubAdmin/Trade/Order'
import Position from '../Layouts/SubAdmin/Trade/Position'
import OptionChain from '../Layouts/SubAdmin/Option/Option_Chain'
import MakeCall from '../Layouts/Comman/Make/Makecall'
import MessageBroadCast from '../Layouts/SubAdmin/MessageBroadCast/MessageBroadCast'
import Help from '../Layouts/Comman/Help/Helpsubadmin.js';








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
                    <Route exact path="/company" element={<Companies />} />
                    <Route exact path="/strategys" element={<AllStrategy />} />
                    <Route exact path="/edit/strategies/:id" element={<Edit_Strategies />} />
                    <Route exact path="/allservice" element={<AllServices />} />
                    <Route exact path="/orders" element={<Orders />} />
                    <Route exact path="/position" element={<Position />} />
                    <Route exact path='/option-chain' element = {<OptionChain/>}/>
                    <Route exact path='/make-call' element = {<MakeCall/>}/>
                    <Route exact path='/message_broadcast' element = {<MessageBroadCast/>}/>
                    <Route exact path='/help' element = {<Help/>}/>









                </Routes>
            </div>


        </>
    )
}

export default Research
