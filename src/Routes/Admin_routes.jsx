import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';
import Help from '../Layouts/Admin/Help/Help';
import MessageBrodcast from '../Layouts/Admin/MessageBrodcast/MessageBrodcast';





// SUBADMIN
import AddSubadmin from "../Layouts/Admin/Subadmin/AddSubAdmin"
import EditSubadmin from "../Layouts/Admin/Subadmin/EditSubAdmin"
import AllSubadmin from "../Layouts/Admin/Subadmin/AllSubAdmin"
import Lodding from '../Components/ExtraComponents/Lodding';







const Admin_Routing = () => {


    return (
        <>
            <MainHeader />
            <Header />
            <div className='page-wrapper'>
                <Routes>
                    <Route exact path="/dashboard" element={<Overview />} />
                    <Route exact path="/system" element={<System />} />
                    <Route exact path="/subadmin/add" element={<AddSubadmin />} />
                    <Route exact path="/subadmin/edit" element={<EditSubadmin />} />
                    <Route exact path="/allsubadmin" element={<AllSubadmin />} />
                    <Route exact path="/help" element={<Help />} />
                    <Route exact path="/message-broadcast" element={<MessageBrodcast />} />
                    <Route exact path="/lodding" element={<Lodding />} />

                     

                </Routes>
            </div>
        </>
    )
}

export default Admin_Routing
