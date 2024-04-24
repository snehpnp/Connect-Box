import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_SERVICS ,GET_ALL_Catagory,getalluserActivity} from "../../../Services/Subadmin/all.service";

export const getAllServices = createAsyncThunk(
  "ServiceByCatagory",
  async (data) => {
    try {
      const res = await GET_ALL_SERVICS(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);
export const getCatogries = createAsyncThunk(
    "AllService/get",
    async (data) => {
      try {
        const res = await GET_ALL_Catagory(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );

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





const GrouoServicesSlice = createSlice({
  name: "SystemSlice",
  initialState: {
    isLoading: false,
    isError: false,
    AllgroupService: null,
    Allcategaory: null,
    getActivity:null,

  },

  
  
  


  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllgroupService = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCatogries.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCatogries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Allcategaory = action.payload;
      })
      .addCase(getCatogries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      }).addCase(getActivity.pending, (state, action) => {
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
      });
  },
});

export default GrouoServicesSlice;
