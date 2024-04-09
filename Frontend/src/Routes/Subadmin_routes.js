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
import Msgbrodcast from '../Layouts/Admin/MessageBrodcast/MessageBrodcast.js';


import Chain from '../Layouts/SubAdmin/Option/Chain';
import Add_Group from '../Layouts/SubAdmin/GroupServices/Add_Groups.js'


import Makecall from '../Layouts/SubAdmin/Make/Makecall.js';
import Strategytransaction from '../Layouts/SubAdmin/Strategytransaction/Strategy_transaction.js';



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
          <Route exact path="/message-broadcast" element={<Msgbrodcast />} />
          <Route exact path="/strategys" element={<Strategy />} />
          <Route exact path="/group-service" element={<Grpservices />} />
          <Route exact path="/group_service/add" element={<Add_Group />} />
          <Route exact path="/servicesAll" element={<AllServices />} />
          <Route exact path="/users" element={<ALLUSER />} />
          <Route exact path="/option-chain" element={<Chain />} />
          <Route exact path="/servicesAll" element={<AllServices />} />

          <Route exact path="/User/add" element={<Adduser />} />
          <Route exact path="/make-call" element={<Makecall />} />

          <Route exact path="/edit/strategies/:id" element={<Edit_Strategies />} />

          <Route exact path="/strategys/transaction" element={<Strategytransaction />} />

        </Routes>
      </div>
    </>
  );
};


export default SubAdmin_Routing
