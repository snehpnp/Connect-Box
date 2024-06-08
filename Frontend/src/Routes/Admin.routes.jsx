import React from 'react';
import { Route, Routes } from "react-router-dom";

import Overview from '../Layouts/Admin/Dashboard/Overview';
import Header from '../Components/Dashboard/Header/Header';
import MainHeader from '../Components/Dashboard/Header/Main_header';
import System from '../Layouts/Admin/System/System';

import Help from '../Layouts/Comman/Help/Help';
import Faqs from '../Layouts/Comman/Faqs';
import Payment from '../Layouts/Admin/Payment/Payment';
import Orders from '../Layouts/Admin/Trade/Order';
import Positions from '../Layouts/Admin/Trade/Position';
import Login from '../Layouts/Auth/Login';
import MessageBrodcast from '../Layouts/Admin/MessageBrodcast/MessageBrodcast';


// SUBADMIN
import AddSubadmin from "../Layouts/Admin/Subadmin/AddSubAdmin"
import EditSubadmin from "../Layouts/Admin/Subadmin/EditSubAdmin"
import AllSubadmin from "../Layouts/Admin/Subadmin/AllSubAdmin"
import Profile from '../Layouts/Comman/Profile/Profile';
import Wallets from '../Layouts/Comman/Wallet/Wallets';
//Researcher
import AddResearcher from '../Layouts/Admin/Researcher/AddResearcher'
import EditResearcher from '../Layouts/Admin/Researcher/EditResearcher'
import AllResearcher from '../Layouts/Admin/Researcher/AllResearcher'
import SubAdCompanyInfo from '../Layouts/Admin/SubAdminCompany/SubAdCompanyInfo';
import Settings from '../Layouts/Comman/Setting_Page/Settings';
import Companies from '../Layouts/Admin/System/System';



const Admin_Routing = () => {
    return (
        <>
            <MainHeader />
            <Header />
            <div className="page-wrapper">
                <Routes>
                    <Route exact path="/subadmin/add" element={<AddSubadmin />} />
                    <Route exact path="/subadmin/edit/:id" element={<EditSubadmin />} />
                    <Route exact path="/allsubadmin" element={<AllSubadmin />} />
                    <Route exact path="/help" element={<Help />} />
                    <Route exact path="/faqs" element={<Faqs />} />
                    <Route exact path="/message-broadcast" element={<MessageBrodcast />} />

                    <Route path="/login" element={<Login />} />
                    <Route exact path="/subadmin/company" element={<SubAdCompanyInfo />} />
                    <Route exact path="/orders" element={<Orders />} />
                    <Route exact path="/position" element={<Positions />} />

                    <Route exact path="/dashboard" element={<Overview />} />
                    <Route exact path="/system" element={<System />} />
                    <Route exact path="/payment" element={<Payment />} />
                    <Route exact path="/wallet" element={<Wallets />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/research/add" element={<AddResearcher />} />
                    <Route exact path="/research/edit/:id" element={<EditResearcher />} />
                    <Route exact path="/allresearch" element={<AllResearcher />} />
                    <Route exact path="/setting" element={<Settings />} />
                    <Route exact path="/company" element={<Companies />} />

                </Routes>
            </div>
        </>
    )
}

export default Admin_Routing
