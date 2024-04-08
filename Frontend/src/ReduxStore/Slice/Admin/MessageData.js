import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMsgByOwnerId
  } from "../../../Services/Admin/Subadmins.service";

  export const admin_Msg_Get = createAsyncThunk(
    "getMessageData",
    async (data) => {
      try {
        const res = await getMsgByOwnerId(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );

  const SubAdminSlice = createSlice({
    name: "SubAdminSlice",
    initialState: {
      isLoading: false,
      isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(admin_Msg_Get.pending, (state, action) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(admin_Msg_Get.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(admin_Msg_Get.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
        })
    },
  });
  
  export default SubAdminSlice;