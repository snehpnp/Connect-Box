import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_SERVICS ,GET_ALL_Catagory , Addbalanceforuser ,Get_user_balance , UpdateStatus} from "../../../Services/Subadmin/all.service";

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


  export const AddBalance = createAsyncThunk(
    "adduserbalance",
    async (data) => {
      try {
        const res = await Addbalanceforuser(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );
  


  // get add balance


  export const Get_User_Balance = createAsyncThunk(
    "getwalletbalance",
    async (data) => {
      try {
        const res = await Get_user_balance(data);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );



  // update statsu for balance

  export const Update_status_balance = createAsyncThunk(
    "update_payment_status",
    async (data) => {
      try {
        const res = await UpdateStatus(data);
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
    AddBalance:null,
    Get_User_Balance:null,
    Update_status_balance:null,
  
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
      })
      .addCase(AddBalance.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(AddBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AddBalance = action.payload;
      })
      .addCase(AddBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(Get_User_Balance.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Get_User_Balance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Get_User_Balance = action.payload;
      })
      .addCase(Get_User_Balance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(Update_status_balance.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Update_status_balance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Update_status_balance = action.payload;
      })
      .addCase(Update_status_balance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export default GrouoServicesSlice;
