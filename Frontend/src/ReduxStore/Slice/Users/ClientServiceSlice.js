import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CLIENT_ALL_SERVICE, UPDATE_CLIENT_SERVICE, GET_ALL_SUBADMIN_STRATEGY, GET_ALL_STRATEGY, updatestatus, UserTradeCharge } from "../../../Services/Users/allUsers.service";

export const GetAllclientDetails = createAsyncThunk("getall/user/clientServices",
  async (data) => {
    try {
      const res = await GET_CLIENT_ALL_SERVICE(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const UPDATE_CLIENT_SERVICE_DATA = createAsyncThunk("update/clientServices",
  async (data) => {
    try {
      const res = await UPDATE_CLIENT_SERVICE(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const Get_All_Subadmin_Strategy = createAsyncThunk('getall/strategy',
  async (data) => {
    try {
      const res = await GET_ALL_SUBADMIN_STRATEGY(data)
      return await res;
    }
    catch (err) {
      return await err
    }
  })

export const Get_All_Strategy = createAsyncThunk('get/allStrategy',
  async (data) => {
    try {
      const res = await GET_ALL_STRATEGY(data)
      return await res;
    }
    catch (err) {
      return await err
    }
  })

// update active status clientservice
export const statusUpdate = createAsyncThunk('statusUpadate',
  async (data) => {
    try {
      const res = await updatestatus(data)
      return await res;
    }
    catch (err) {
      return await err
    }
  })


  // user trade charge 


  export const UserTrade = createAsyncThunk('user/trade/charges',
  async (data) => {
    try {
      const res = await UserTradeCharge(data)
      return await res;
    }
    catch (err) {
      return await err
    }
  })


const ClientServiceSlice = createSlice({
  name: "ClientServiceSlice",
  initialState: {
    isLoading: false,
    isError: false,
    getAllservice: null,
    get_all_subadmin_strategy: null,
    get_all_strategy: null,
    statusUpdate: null,
    UserTrade:null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllclientDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetAllclientDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllservice = action.payload;
      })
      .addCase(GetAllclientDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(UPDATE_CLIENT_SERVICE_DATA.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(UPDATE_CLIENT_SERVICE_DATA.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(UPDATE_CLIENT_SERVICE_DATA.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(Get_All_Subadmin_Strategy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.get_all_subadmin_strategy = action.payload;
      })
      .addCase(Get_All_Strategy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.get_all_strategy = action.payload;
      })
      .addCase(statusUpdate.pending, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(statusUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(statusUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statusUpdate = action.payload;
      })
      .addCase(UserTrade.pending, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(UserTrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(UserTrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.UserTrade = action.payload;
      })

  },
});

export default ClientServiceSlice;
