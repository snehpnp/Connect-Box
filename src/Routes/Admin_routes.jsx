import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';
import Help from '../Layouts/Admin/Help/Help';
import MessageBrodcast from '../Layouts/Admin/MessageBrodcast/MessageBrodcast';






const Admin_Routing = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper' >
                <Routes>
                    <Route exact path="/dashboard" element={<Overview />} />
                    <Route exact path="/system" element={<System />} />
                    <Route exact path="/help" element={<Help />} />
                    <Route exact path="/message-broadcast" element={<MessageBrodcast />} />



                </Routes>
            </div>

        </>
    )
}

export default Admin_Routing
