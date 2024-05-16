import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admindata,addadminandupdate,History ,subadmindata,updateuserdata,deleteById} from "../../../Services/SuperAdmin/SuperadminPanel";




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


  // subadmin detail  for superadmin page


  export const Subadmindetail = createAsyncThunk(
    "subadmindetail",
    async (data) => {
      try {
        const res = await subadmindata(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );


  



  // update user in superadmin

  export const updateUser = createAsyncThunk(
    "getUserdetail",
    async (data) => {
      try {
        const res = await updateuserdata(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );

  // delet user by id of superadmin


  export const DeleteUser = createAsyncThunk(
    "deleteUser",
    async (data) => {
      try {
        const res = await deleteById(data);
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
      Subadmindetail:null,
      updateUser:null,
      DeleteUser:null,
  
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
          .addCase(Subadmindetail.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(Subadmindetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Subadmindetail = action.payload;
          })
          .addCase(Subadmindetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          
          .addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateUser = action.payload;
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(DeleteUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(DeleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DeleteUser = action.payload;
          })
          .addCase(DeleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          })
          
      },
    });
    
    export default GrouoServicesSlice;

