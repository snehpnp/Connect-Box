import React from 'react';
import { Route, Routes } from "react-router-dom";
import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/SubAdmin/Systems/System.jsx';
import Adduser from '../Layouts/SubAdmin/Users/User_Add.js';
import ALLUSER from '../Layouts/SubAdmin/Users/Alluser.js';
import Strategy from '../Layouts/SubAdmin/Strategys/Strategy.jsx';

import Help from '../Layouts/Admin/Help/Help.js';
import Msgbrodcast from '../Layouts/Admin/MessageBrodcast/MessageBrodcast.js';



// strategydesc
const SubAdmin_Routing = () => {

    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >

                <Routes>
                    <Route exact path="/dashboard" element={<Overview />} />
                    <Route exact path="/system" element={<System />} />
                    
                    <Route exact path="/help" element={<Help />} />
                    <Route exact path="/message-broadcast" element={<Help />} />


                    <Route exact path="/strategys" element={<Strategy />} />

                    <Route exact path="/User/add" element={<Adduser />} />
                    <Route exact path="/users" element={<ALLUSER />} />
                    <Route exact path="/message-broadcast" element={<Msgbrodcast />} />

                </Routes>

            </div>
        </>
    )
}

export default SubAdmin_Routing
