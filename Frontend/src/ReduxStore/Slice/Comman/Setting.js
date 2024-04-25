import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getalluserActivity,findActivity } from "../../../Services/Comman/Setting";


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




  const GrouoServicesSlice = createSlice({
    name: "SystemSlice",
    initialState: {
      isLoading: false,
      isError: false,
      getActivity:null,
      findstatus:null,
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
    },
  });
  
  export default GrouoServicesSlice;
  
