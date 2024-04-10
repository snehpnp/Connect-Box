import React from "react";
import { Route, Routes } from "react-router-dom";
import Overview from "../Layouts/Admin/Dashboard/Overview";
import Header from "../Components/Dashboard/Header/Header";
import MainHeader from "../Components/Dashboard/Header/Main_header";
import System from "../Layouts/SubAdmin/Systems/System.js";
import Adduser from "../Layouts/SubAdmin/Users/User_Add.js";
import ALLUSER from "../Layouts/SubAdmin/Users/Alluser.js";
import Strategy from "../Layouts/SubAdmin/Strategys/Strategy.jsx";

import Grpservices from "../Layouts/SubAdmin/GroupServices/Grpservices";
import AllServices from "../Layouts/SubAdmin/AllServices/AllServices";
import Edit_Strategies from "../Layouts/SubAdmin/Strategys/Edit_Strategies"


import Help from '../Layouts/Comman/Help';
import MessageBroadcast from '../Layouts/SubAdmin/MessageBroadCast/MessageBroadCast';


import Chain from '../Layouts/SubAdmin/Option/Chain';
import Add_Group from '../Layouts/SubAdmin/GroupServices/Add_Groups.js'


import Makecall from '../Layouts/SubAdmin/Make/Makecall.js';
import Strategytransaction from '../Layouts/SubAdmin/Strategytransaction/Strategy_transaction.js';
import Edit_Group_Service from '../Layouts/SubAdmin/GroupServices/Edit_Group.js'
import Edit_User from '../Layouts/SubAdmin/Users/EditUser.js'

import Wallets from '../Layouts/Comman/Wallet/Wallets';

import Strategyhistory from '../Layouts/SubAdmin/StrategyHistory/Strategy_history.js'

// strategydesc
const SubAdmin_Routing = () => {

  return (
    <>
      <MainHeader />
      <Header />
      <div className="page-wrapper">
        <Routes>
          <Route exact path="/dashboard" element={<Overview />} />
          <Route exact path="/system" element={<System />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/message-broadcast" element={<MessageBroadcast />} />
          <Route exact path="/strategys" element={<Strategy />} />
          <Route exact path="/group-service" element={<Grpservices />} />
          <Route exact path="/group_service/add" element={<Add_Group />} />
          <Route exact path="/servicesAll" element={<AllServices />} />
          <Route exact path="/users" element={<ALLUSER />} />
          <Route exact path="/option-chain" element={<Chain />} />
          <Route exact path="/servicesAll" element={<AllServices />} />
          <Route exact path="/user/add" element={<Adduser />} />
          <Route exact path="/make-call" element={<Makecall />} />
          <Route exact path="/edit/strategies/:id" element={<Edit_Strategies />} />

          <Route exact path="/strategys/transaction" element={<Strategytransaction />} />
          <Route exact path="/group-service/edit/:id" element={<Edit_Group_Service />} />
          <Route exact path="/user/edit/:id" element={<Edit_User />} />
          
          <Route exact path="/wallet" element={<Wallets />} />
          <Route exact path="/strategys/history" element={<Strategyhistory />} />



        </Routes>
      </div>
    </>
  );
};


export default SubAdmin_Routing
