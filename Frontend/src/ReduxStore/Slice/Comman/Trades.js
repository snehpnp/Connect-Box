import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getOrders_data, getTrade_data, UpdateTrade ,Tradehistory_data,UserTradehistory_data} from "../../../Services/Comman/Trade/Trades";




// SIGNAL (ORDER) GET DATA
export const Orders_Details = createAsyncThunk("orders/data",async (data) => {
    try {
      const {req,token} = data

      const res = await getOrders_data(req,token);
      return res;
    } catch (err) {
      throw err;
    }
  }
);


// TRADE (MAIN SIGNAL) TRADE HISTORY DATA
export const Trade_Details = createAsyncThunk(
  "trade/data",
  async (data) => {
    try {
      const res = await getTrade_data(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);


// UPDATE STOP LOSS TARGETG AND TIME
export const Update_Signals = createAsyncThunk(
  "update/trade",
  async (data) => {
    try {
      const res = await UpdateTrade(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);


// TRADE HISTORY DATA 
export const Trade_history_data = createAsyncThunk(
  "tradehistory/data",
  async (data) => {
    try {
      const res = await Tradehistory_data(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

// USER TRADE HISTORY 
export const User_Tradehistory_data = createAsyncThunk(
  "user/tradehistory",
  async (data) => {
    try {
      const res = await UserTradehistory_data(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);


const TradeSlice = createSlice({
  name: "TradeSlice",
  initialState: {
    isLoading: false,
    isError: false,
    orders: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Orders_Details.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(Orders_Details.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(Orders_Details.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(Trade_Details.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(Update_Signals.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(User_Tradehistory_data.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(Trade_history_data.fulfilled, (state, action) => {
        state.isLoading = false;
      })
   

  },

});

export default TradeSlice;
