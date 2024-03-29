import { configureStore } from "@reduxjs/toolkit";

//AUTH SLICE
import AuthSlice from "../Slice/Auth/AuthSlice";
import SystemSlice from "../Slice/Admin/System";
import SubAdminSystemSlice from "../Slice/Admin/SubAdminCompanyInfo";


import StrategySlice from "../Slice/Subadmin/Strategy";






const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer,
    SystemSlice: SystemSlice.reducer,
    SubAdminSystemSlice: SubAdminSystemSlice.reducer,
    StrategySlice: StrategySlice.reducer

  },
});

export default store;
