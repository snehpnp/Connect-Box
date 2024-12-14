import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BROKER_RESPONSE ,GET_ALL_BROKER_RESPONSE} from "../../../Services/Users/allUsers.service";

export const Broker_Response = createAsyncThunk("broker/response",
  async (data) => {
    try {
      const res = await BROKER_RESPONSE(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);
 

export const GET_ALL_BROKER_RESPONSES = createAsyncThunk("getall/order/single", async (user_id) => {
  try {
      const res = await GET_ALL_BROKER_RESPONSE( user_id );
      return await res;
  } catch (err) {
      return err;
  }
});

 

const BrokerResponseSlice = createSlice({
  name: "BrokerResponseSlice",
  initialState: {
    isLoading: false,
    isError: false,
    broker_response: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Broker_Response.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Broker_Response.fulfilled, (state, action) => {
        state.isLoading = false;
        state.broker_response = action.payload;
      })
      .addCase(Broker_Response.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
       
      
  },
});

export default BrokerResponseSlice;
