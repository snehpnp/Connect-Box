import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMsgByOwnerId,
  deleteMsgById,
  editMsgData,
  addMessage,
  getUserbroadcast,
} from "../../../Services/Admin/Subadmins.service";
//AllApi Belogns To Msg BroadCast

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

export const add_message = createAsyncThunk("messageData", async (data) => {
  try {
    const res = await addMessage(data);
    return res;
  } catch (err) {
    throw err;
  }
});

export const admin_Msg_Delete = createAsyncThunk(
  "messageData/delete",
  async (data) => {
    try {
      const res = await deleteMsgById(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const admin_Msg_Edit = createAsyncThunk(
  "/messagedata/edit",
  async (data) => {
    try {
      const res = await editMsgData(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

// get broadcast message for user 
export const Get_UserBroadcast = createAsyncThunk(
  "/getbroadcastMsg",
  async (data) => {
    try {
      const res = await getUserbroadcast(data);
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
    Get_UserBroadcast:null,
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

      .addCase(admin_Msg_Delete.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(admin_Msg_Delete.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(admin_Msg_Delete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(admin_Msg_Edit.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(admin_Msg_Edit.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(admin_Msg_Edit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(add_message.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(add_message.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(add_message.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(Get_UserBroadcast.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Get_UserBroadcast.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(Get_UserBroadcast.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default SubAdminSlice;
