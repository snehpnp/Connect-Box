import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { SIGN_IN_USER} from "../../../Services/Auth/Auth.service";



export const SignIn = createAsyncThunk("DispatchLogin", async (data) => {

  // console.log("data :", data)
  try {
    const res = await SIGN_IN_USER(data);
    return await res;
  } catch (err) {
    return err;
  }
});

// export const SignUpUser = createAsyncThunk("DispatchSignUp", async (data) => {
//   try {
//     const res = await SIGN_UP_USER(data);
     
//     return await res;
//   } catch (err) {
//     return err;
//   }
// });

// // for check status
// export const Verify_User_Device = createAsyncThunk("DispatchDeviceLogin", async (data) => {
//   try {
//     const res = await VARIFY_USER_DEVICE(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });


// export const Log_Out_User = createAsyncThunk("DispatchUserLogout", async (data) => {
//   try {
//     const res = await LOG_OUT_USER(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });


// export const get_theme_details = createAsyncThunk("/get/theme", async (data) => {
//   try {
//     const res = await SET_THEME_DETAILS(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });

// //  Forget Password
// export const Forget_Password = createAsyncThunk("/forget/password", async (data) => {
//   try {
//     const res = await FORGET_PASSWORD(data)
//     return res;
//   }
//   catch (err) {
//     throw err;
//   }
// });

// //  Forget Password
// export const Update_Password = createAsyncThunk("/update/password", async (data) => {
//   try {
//     const res = await UPDATE_PASSWORD(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });


// //  Forget Password
// export const Reset_Password = createAsyncThunk("/reset/password", async (data) => {
//   try {
//     const res = await RESET_PASSWORD(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });


// //  Forget Password
// export const Get_Panel_Informtion = createAsyncThunk("/get/panelinfo", async (data) => {
//   try {
//     const res = await GET_PANEL_INFORMATION(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });

// //  OTP_SEND_USEHERE
// export const OTP_SEND_USEHERES = createAsyncThunk("/session/clear", async (data) => {
//   try {
//     const res = await OTP_SEND_USEHERE(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });
// //  OTP_SEND_USEHERE
// export const Logout_From_Other_Device = createAsyncThunk("/session/clear", async (data) => {
//   try {
//     const res = await LOGOUT_FROM_OTHER_DEVICE(data)
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// });






const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    isLoading: false,
    isError: false,
    signIn : [],
     
  },

   

  
  reducers: {}, // Reducers object is empty
  extraReducers: (builder) => {
    // Use builder callback to define extra reducers
    builder
      .addCase(SignIn.pending, (state, action) => {
        // Handle pending action
        state.isLoading = true;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        // Handle fulfilled action
        state.isLoading = false;
        state.signIn = action.payload;
      })
      .addCase(SignIn.rejected, (state, action) => {
        // Handle rejected action
        state.isLoading = false;
        state.isError = true;
      });
  },
   
});

// export const {ganpat} = HomeScreenSlice.actions
export default AuthSlice;
