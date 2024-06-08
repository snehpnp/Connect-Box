import React from 'react';
import { Route, Routes } from "react-router-dom";
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import Profile from '../Layouts/Comman/Profile/Profile';
import Faqs from '../Layouts/Comman/Faqs';
import Researcher_dashboard from '../Layouts/Researcher/Dashboard/Researcher_dashboard.jsx';
import Wallets from '../Layouts/Comman/Wallet/Wallets';
import Companies from '../Layouts/Comman/Company/Companies';
import AllStrategy from '../Layouts/Researcher/Service/Strategys/Strategy'
import Edit_Strategies from '../Layouts/Researcher/Service/Strategys/Edit_Strategies'
import AllServices from '../Layouts/Researcher/Service/allService/AllServices'
import Orders from '../Layouts/Researcher/Trade/Order.js'
import Position from '../Layouts/Researcher/Trade/Position.js'
import OptionChain from '../Layouts/SubAdmin/Option/Option_Chain'
import MakeCall from '../Layouts/Comman/Make/Makecall'
import MessageBroadcast from '../Layouts/Researcher/MessageBroadcast/MessageBroadcast.js';
import Help from '../Layouts/Comman/Help/HelpResearcher.js';
import Sthtrans from '../Layouts/Researcher/Strategy_transaction/Strategy_transaction.js';
import OprnPosition from '../Layouts/SubAdmin/Option/Open_Positions.js';
import Settings from '../Layouts/Comman/Setting_Page/Settings.js';
import Strategy_Users from '../Layouts/Researcher/StrategyUsers/Strategy_Users.js'

import Collaborators from '../Layouts/Researcher/StrategyUsers/Partners.js';



const Research = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >
                <Routes>
                    <Route exact path="/dashboard" element={<Researcher_dashboard />} />
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
                    <Route exact path='/open/position' element = {<OprnPosition/>}/>
                    <Route exact path='/message_broadcast' element = {<MessageBroadcast/>}/>
                    <Route exact path='/help' element = {<Help/>}/>
                    <Route exact path='/strategys/transaction' element = {<Sthtrans/>}/>
                    <Route exact path='/strategy/user' element = {<Strategy_Users/>}/>
                    <Route exact path="/setting" element={<Settings />} />
                    <Route exact path="/collaborators" element={<Collaborators />} />

                </Routes>
            </div>


        </>
    )
}

export default Research
