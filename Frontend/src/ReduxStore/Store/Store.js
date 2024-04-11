import { configureStore } from "@reduxjs/toolkit";

//AUTH SLICE
import AuthSlice from "../Slice/Auth/AuthSlice";
import SystemSlice from "../Slice/Admin/System";
import SubAdminSystemSlice from "../Slice/Admin/SubAdminCompanyInfo";


import StrategySlice from "../Slice/Subadmin/Strategy";
import GrouoServicesSlice from "../Slice/Subadmin/GroupServicesSlice";
import UsersSlice from '../Slice/Subadmin/UsersSlice'
import ClientServiceSlice from '../Slice/Users/ClientServiceSlice'






const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer,
    SystemSlice: SystemSlice.reducer,
    SubAdminSystemSlice: SubAdminSystemSlice.reducer,
    StrategySlice: StrategySlice.reducer,
    GrouoServicesSlice : GrouoServicesSlice.reducer,
    UsersSlice : UsersSlice.reducer,
    ClientServiceSlice : ClientServiceSlice.reducer


  },
});

export default store;
