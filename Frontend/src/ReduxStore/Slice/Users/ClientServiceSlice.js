import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CLIENT_ALL_SERVICE} from "../../../Services/Users/allUsers.service";

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
 

const ClientServiceSlice = createSlice({
  name: "ClientServiceSlice",
  initialState: {
    isLoading: false,
    isError: false,
    getAllservice: null,

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
      
  },
});

export default ClientServiceSlice;
