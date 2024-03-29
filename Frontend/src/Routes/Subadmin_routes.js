import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Subadmin/System/System';



import AddUser from '../Layouts/Subadmin/Users/AddUser';
import ALLUSER from '../Layouts/Subadmin/Users/AllUsers';


import Strategy from '../Layouts/SubAdmin/Strategy/Strategy';





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
                    <Route exact path="/strategys" element={<Strategy />} />

                <Route exact path="/User/add" element={<AddUser />} />
                <Route exact path="/users" element={<ALLUSER />} />





            </Routes>

</div>
        </>
    )
}

export default SubAdmin_Routing
