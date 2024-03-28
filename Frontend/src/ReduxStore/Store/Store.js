import { configureStore } from "@reduxjs/toolkit";

//AUTH SLICE
import AuthSlice from "../Slice/Auth/AuthSlice";
import SystemSlice from "../Slice/Admin/System";
import SubAdminSystemSlice from "../Slice/Admin/SubAdminCompanyInfo";





const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer,
    SystemSlice: SystemSlice.reducer,
    SubAdminSystemSlice: SubAdminSystemSlice.reducer
  },
});

export default store;
