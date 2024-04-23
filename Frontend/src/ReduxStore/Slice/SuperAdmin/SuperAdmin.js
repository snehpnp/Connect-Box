import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admindata } from "../../../Services/SuperAdmin/SuperadminPanel";




//getting admin data for superadmin panel  a
export const getadmindata = createAsyncThunk(
    "superadminPanel",
    async (data) => {
      try {
        const res = await admindata(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );


  const GrouoServicesSlice = createSlice({
    name: "SystemSlice",
    initialState: {
      isLoading: false,
      isError: false,
      getadmindata:null,
  
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
          .addCase(getadmindata.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(getadmindata.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getadmindata = action.payload;
          })
          .addCase(getadmindata.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          
      },
    });
    
    export default GrouoServicesSlice;

