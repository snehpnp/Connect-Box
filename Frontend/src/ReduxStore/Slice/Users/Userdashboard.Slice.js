import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER_DASHBOARD, OrderCreateStg, OrderUpdateStg ,UserBalanceAddReq} from "../../../Services/Users/allUsers.service";

export const GetUserDashboardData = createAsyncThunk("user/dashboard",
  async (data) => {
    try {
      const { req, token } = data
      const res = await GET_USER_DASHBOARD(req, token);
      return res;
    } catch (err) {
      throw err;
    }
  }
);


export const OrderCreateStgUser = createAsyncThunk("user/strategy/order/create",
  async (data) => {
    try {
      const res = await OrderCreateStg(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const OrderUpdateStgUser = createAsyncThunk("user/strategy/order/update",
  async (data) => {
    try {
      const res = await OrderUpdateStg(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const UserBalanceAddReqApi = createAsyncThunk("user/add/balance",
  async (data) => {
    try {
      const res = await UserBalanceAddReq(data);
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
    stgOrder: null,
    balaneReq:[],


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
      .addCase(OrderCreateStgUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(OrderCreateStgUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stgOrder = action.payload;
      })
      .addCase(OrderCreateStgUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(OrderUpdateStgUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(UserBalanceAddReqApi.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(UserBalanceAddReqApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balaneReq = action.payload;
      })
      .addCase(UserBalanceAddReqApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

  },
});

export default DashboardSlice;
