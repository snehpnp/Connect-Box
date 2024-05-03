import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GET_PERMISSION } from '../../../Services/Employee/Employee.service'


export const Get_Permission = createAsyncThunk("permission/getall",
  async (data) => {
    try {
      const res = await GET_PERMISSION(data);
      return await res;
    }
    catch (err) {
      throw err
    }

  })
 

const EmployeeSlice = createSlice({
  name: "EmployeeSlice",
  initialState: {
    isLoading: false,
    isError: false,
    get_Permission: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Get_Permission.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Get_Permission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.get_Permission = action.payload;
      })
      .addCase(Get_Permission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      
  },
});


export default EmployeeSlice;