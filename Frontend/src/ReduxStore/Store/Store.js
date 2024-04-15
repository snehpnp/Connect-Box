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
   
    TradeDetailsSlice: TradeDetailsSlice.reducer,



  },
});

export default store;
