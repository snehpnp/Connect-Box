import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER_DASHBOARD} from "../../../Services/Users/allUsers.service";

export const GetUserDashboardData = createAsyncThunk("user/dashboard",
  async (data) => {
    try {
      const res = await GET_USER_DASHBOARD(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);
 

const DashboardSlice = createSlice({
  name: "ClientServiceSlice",
  initialState: {
    isLoading: false,
    isError: false,
    userdashboard: null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUserDashboardData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetUserDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userdashboard = action.payload;
      })
      .addCase(GetUserDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      
  },
});

export default DashboardSlice;
