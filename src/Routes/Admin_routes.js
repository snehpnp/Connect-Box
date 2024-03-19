import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';

// strategydesc

const Admin_Routing = () => {


    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/dashboard" element={<Overview />} />
            </Routes>
        </>
    )
}

export default Admin_Routing
