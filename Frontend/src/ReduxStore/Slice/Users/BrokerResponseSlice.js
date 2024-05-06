import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BROKER_RESPONSE} from "../../../Services/Users/allUsers.service";

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
