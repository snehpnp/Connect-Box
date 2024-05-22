import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../Layouts/SubAdmin/Dashboard/DashBoard1.js";
import Header from "../Components/Dashboard/Header/Header";
import MainHeader from "../Components/Dashboard/Header/Main_header";
import System from "../Layouts/SubAdmin/Systems/System.js";
import Adduser from "../Layouts/SubAdmin/Users/User_Add.js";
import ALLUSER from "../Layouts/SubAdmin/Users/Alluser.js";
import Strategy from "../Layouts/SubAdmin/Services/Strategys/Strategy.jsx";
import Grpservices from "../Layouts/SubAdmin/Services/GroupServices/Grpservices";
import AllServices from "../Layouts/SubAdmin/Services/AllServices/AllServices.js";
import Edit_Strategies from "../Layouts/SubAdmin/Services/Strategys/Edit_Strategies"
import Help from '../Layouts/Comman/Help/Helpsubadmin.js';
import MessageBroadcast from '../Layouts/SubAdmin/MessageBroadCast/MessageBroadCast';
import Option_Chain from '../Layouts/SubAdmin/Option/Option_Chain.js';
import Add_Group from '../Layouts/SubAdmin/Services/GroupServices/Add_Groups.js'
import Makecall from '../Layouts/Comman/Make/Makecall.js';
import Strategytransaction from '../Layouts/SubAdmin/Services/Strategys/Strategy_transaction.js';
import Edit_Group_Service from '../Layouts/SubAdmin/Services/GroupServices/Edit_Group.js'
import Edit_User from '../Layouts/SubAdmin/Users/EditUser.js'
import Wallets from '../Layouts/Comman/Wallet/Wallets';
import Strategyhistory from '../Layouts/SubAdmin/Services/Strategys/Strategy_history.js'
import OrderDetails from '../Layouts/SubAdmin/Trade/Order.js'
import Position from '../Layouts/SubAdmin/Trade/Position.js'
import Profile from '../Layouts/Comman/Profile/Profile';
import Openposition from '../Layouts/SubAdmin/Option/Open_Positions.js';
import Faqs from '../Layouts/Comman/Faqs';
import Client_Orders from '../Layouts/SubAdmin/Trade/Client_Orders'
import Settings from '../Layouts/Comman/Setting_Page/Settings.js';
import AllEmployees from '../Layouts/SubAdmin/Subadmin_Employees/AllEmployee'
import AddEmployee from '../Layouts/SubAdmin/Subadmin_Employees/AddEmployee'
import Edit_Employee from '../Layouts/SubAdmin/Subadmin_Employees/Update_Employee'
import AllResearcherStrategy from '../Layouts/SubAdmin/Researcher/AllResearcherStrategy.js'

import Test from '../Layouts/SubAdmin/MessageBroadCast/test.js'


import Tradecharges from '../Layouts/SubAdmin/Services/Strategys/Tradecharges.js'






// strategydesc
const SubAdmin_Routing = () => {

  return (
    <>
      <MainHeader />
      <Header />
      <div className="page-wrapper">
        <Routes>
          <Route exact path="/dashboard" element={<DashBoard />} />

          <Route exact path="/system" element={<System />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/message-broadcast" element={<MessageBroadcast />} />
          <Route exact path="/strategys" element={<Strategy />} />
          <Route exact path="/group-service" element={<Grpservices />} />
          <Route exact path="/group_service/add" element={<Add_Group />} />
          <Route exact path="/servicesAll" element={<AllServices />} />
          <Route exact path="/users" element={<ALLUSER />} />
          <Route exact path="/option-chain" element={<Option_Chain />} />
          <Route exact path="/servicesAll" element={<AllServices />} />
          <Route exact path="/user/add" element={<Adduser />} />
          <Route exact path="/make-call" element={<Makecall />} />
          <Route exact path="/edit/strategies/:id" element={<Edit_Strategies />} />
          <Route exact path="/strategys/transaction" element={<Strategytransaction />} />
          <Route exact path="/group-service/edit/:id" element={<Edit_Group_Service />} />
          <Route exact path="/user/edit/:id" element={<Edit_User />} />
          <Route exact path="/wallet" element={<Wallets />} />
          <Route exact path="/strategys/history" element={<Strategyhistory />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/orders" element={<OrderDetails />} />
          <Route exact path="/position" element={<Position />} />
          <Route exact path="/open-position" element={<Openposition />} />
          <Route exact path="/client/orders" element={<Client_Orders/>}/>
           <Route exact path="/employees" element={<AllEmployees/>}/>
           <Route exact path="/employee/add" element={<AddEmployee/>}/>
           <Route exact path="/employee/edit/:id" element={<Edit_Employee/>}/>

          <Route exact path="/faqs" element={<Faqs />} />
          <Route exact path="/setting" element={<Settings />} />
          <Route exact path="/researcher-strategy" element={<AllResearcherStrategy />} />



          <Route exact path="/trade/charges" element={<Tradecharges/>} /> 



        </Routes>
      </div>
    </>
  );
};


export default SubAdmin_Routing