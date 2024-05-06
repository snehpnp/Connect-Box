import { configureStore } from "@reduxjs/toolkit";

//AUTH SLICE
import AuthSlice from "../Slice/Auth/AuthSlice";
import SystemSlice from "../Slice/Admin/System";
import SubAdminSystemSlice from "../Slice/Admin/SubAdminCompanyInfo";
import StrategySlice from "../Slice/Subadmin/Strategy";
import GrouoServicesSlice from "../Slice/Subadmin/GroupServicesSlice";
import UsersSlice from '../Slice/Subadmin/UsersSlice'
import ClientServiceSlice from '../Slice/Users/ClientServiceSlice'
import UserdashboardSlice from '../Slice/Users/Userdashboard.Slice'
import OptionChainSlice from '../Slice/Subadmin/OptionChainSlice'
import TradeDetailsSlice from '../Slice/Subadmin/TradeDetailsSlice'
import ResearcherSlice from '../Slice/Researcher/ResearcherSlice'
import AllResearcherStrategySlice from "../Slice/Subadmin/AllResearcherStrategySlice";
import EmployeeSlice from '../Slice/Employee/EmployeeSlice'
import BrokerResponseSlice from '../Slice/Users/BrokerResponseSlice'



import Userinfo1Slice from '../Slice/Comman/Userinfo'



const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer,
    SystemSlice: SystemSlice.reducer,
    SubAdminSystemSlice: SubAdminSystemSlice.reducer,
    StrategySlice: StrategySlice.reducer,
    GrouoServicesSlice : GrouoServicesSlice.reducer,
    UsersSlice : UsersSlice.reducer,
    ClientServiceSlice : ClientServiceSlice.reducer,
    OptionChainSlice : OptionChainSlice.reducer,
    UserdashboardSlice : UserdashboardSlice.reducer,
    TradeDetailsSlice : TradeDetailsSlice.reducer,
    Userinfo1Slice: Userinfo1Slice.reducer,
    ResearcherSlice : ResearcherSlice.reducer,
    AllResearcherStrategySlice : AllResearcherStrategySlice.reducer,
    EmployeeSlice : EmployeeSlice.reducer,
    BrokerResponseSlice : BrokerResponseSlice.reducer

  },
});

export default store;
