import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getalluserActivity,findActivity,getbroker } from "../../../Services/Comman/Setting";


 /////getalluserActivity  
 
 export const getActivity = createAsyncThunk(
    "find/activity/category",
    async (data) => {
      try {
        const res = await getalluserActivity(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );


  ///findActivity

  export const findstatus = createAsyncThunk(
    "find/activity",
    async (data) => {
      try {
        const res = await findActivity(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );

  //  get broker detail

  export const brokerdetail = createAsyncThunk(
    "/broker/get",
    async (data) => {
      try {
        const res = await getbroker(data);
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
      getActivity:null,
      findstatus:null,
      brokerdetail:null,
    },
  
    
    
    
  
  
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getActivity.pending, (state, action) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(getActivity.fulfilled, (state, action) => {
          state.isLoading = false;
          state.getActivity = action.payload;
        })
        .addCase(getActivity.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
        }).addCase(findstatus.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(findstatus.fulfilled, (state, action) => {
            state.isLoading = false;
          })
          .addCase(findstatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(brokerdetail.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(brokerdetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brokerdetail = action.payload;
          })
          .addCase(brokerdetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
    },
  });
  
  export default GrouoServicesSlice;
  
