import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admindata,addadminandupdate,History } from "../../../Services/SuperAdmin/SuperadminPanel";




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


  // update a balance 
   
  export const updateBalance = createAsyncThunk(
    "addAdminandupdate",
    async (data) => {
      try {
        const res = await addadminandupdate(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );

  // admin History for superadmin page 


export const Adminhistory = createAsyncThunk(
    "AdminHistory",
    async (data) => {
      try {
        const res = await History(data);
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
      updateBalance:null,
      Adminhistory:null,
  
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
          }) .addCase(updateBalance.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(updateBalance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateBalance = action.payload;
          })
          .addCase(updateBalance.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          }).addCase(Adminhistory.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(Adminhistory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Adminhistory = action.payload;
          })
          .addCase(Adminhistory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          
      },
    });
    
    export default GrouoServicesSlice;

