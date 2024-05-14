import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { SIGN_IN_USER , SIGN_UP_USER,PasswordChange, FORGET_PASSWORD,resetPassword , LOG_OUT_USER} from "../../../Services/Auth/Auth.service";



export const SignIn = createAsyncThunk("DispatchLogin", async (data) => {

  try {
    const res = await SIGN_IN_USER(data);
    return await res;
  } catch (err) {
    return err;
  }
});

export const SignUpUser = createAsyncThunk("signup", async (data) => {
  try {
    const res = await SIGN_UP_USER(data);
     
    return await res;
  } catch (err) {
    return err;
  }
});

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


export const LogOut = createAsyncThunk("logoutUser", async (data) => {
  try {
    const res = await LOG_OUT_USER(data)
    return res;
  }
  catch (err) {
    return err;
  }
});


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


//  Forget Password
export const ForgetPassword = createAsyncThunk("ForgetPassword", async (data) => {
  try {
    const res = await FORGET_PASSWORD(data)
    return res;
  }
  catch (err) {
    return err;
  }
});

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



export const ChangedPassword = createAsyncThunk("Password change", async (data) => {
  try {
    const res = await PasswordChange(data);
     
    return await res;
  } catch (err) {
    return err;
  }
});



export const UpdatePassword = createAsyncThunk("update password", async (data) => {
  try {
    const res = await resetPassword(data);
     
    return await res;
  } catch (err) {
    return err;
  }
});




const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    isLoading: false,
    isError: false,
    signIn : [],
    signup_user : null,
    ChangedPassword:null,
    ForgetPassword:null,
    UpdatePassword:null,
    logout:null,
     
  },

  reducers: {},  
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signIn = action.payload;
      })
      .addCase(SignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(SignUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signup_user = action.payload;
      }).addCase(ChangedPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ChangedPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ChangedPassword = action.payload;
      })
      .addCase(ChangedPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      }).addCase(ForgetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ForgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ForgetPassword = action.payload;
      })
      .addCase(ForgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      }).addCase(UpdatePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.UpdatePassword = action.payload;
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(LogOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logout = action.payload;
      })
  },
   
});

export default AuthSlice;
