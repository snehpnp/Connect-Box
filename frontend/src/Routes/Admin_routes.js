import React from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";

import Overview from '../Layouts/User/Overview Hub/Overview';
import Days from '../Layouts/User/7- days tracker/Days';
import Business from '../Layouts/User/Business Essentials/Business';
import Portfolio from '../Layouts/User/Client Portfolio/Portfolio';
import Management from '../Layouts/User/Management/Management';
import Onboarding from '../Layouts/User/Onboarding/Onboarding';
import Partners from '../Layouts/User/Sub Partners/Partners';
import Model from '../Layouts/User/Subadmin Model/Model';
import Terminate from '../Layouts/User/Terminate/Terminate';
import Hub from '../Layouts/User/Trade Hub/Hub';
import Insights from '../Layouts/User/Trade Insights/Insights';
import Tracker from '../Layouts/User/Trade tracker/Tracker';
import Trading from '../Layouts/User/Trading Log/Trading';
import Header from '../Components/Dashboard/Header/Header';


// strategydesc

const Admin_Routing = () => {

    const location = useLocation();
    const navigate = useNavigate()
    console.log("location.pathname Admin=", location.pathname == "/admin/*" ? console.log("RUNN") : null)

    return (
        <>
            <Header />

            <Routes>

                <Route exact path="/dashboard" element={<Overview />} />
                <Route exact path="/days" element={<Days />} />
                <Route exact path="/business" element={<Business />} />
                <Route exact path="/portfolio" element={<Portfolio />} />
                <Route exact path="/management" element={<Management />} />
                <Route exact path="/onboarding" element={<Onboarding />} />
                <Route exact path="/overview" element={<Overview />} />
                <Route exact path="/partner" element={<Partners />} />
                <Route exact path="/model" element={<Model />} />
                <Route exact path="/terminate" element={<Terminate />} />
                <Route exact path="/hub" element={<Hub />} />
                <Route exact path="/insights" element={<Insights />} />
                <Route exact path="/tracker" element={<Tracker />} />
                <Route exact path="/trading" element={<Trading />} />


            </Routes>


        </>
    )
}

export default Admin_Routing
