import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';



// SUBADMIN
import AddSubadmin from "../Layouts/Admin/Subadmin/AddSubAdmin"
import EditSubadmin from "../Layouts/Admin/Subadmin/EditSubAdmin"
import AllSubadmin from "../Layouts/Admin/Subadmin/AllSubAdmin"







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
                </Routes>
            </div>
        </>
    )
}

export default Admin_Routing
