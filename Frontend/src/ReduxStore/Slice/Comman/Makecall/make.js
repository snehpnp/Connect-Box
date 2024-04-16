import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_SERVICS ,GET_ALL_Catagory ,GET_EXPIRY_BY_SCRIPT,GET_ALL_STRIKE_PRICE} from "../../../../Services/Comman/Makecall/make.service";

export const getAllServices = createAsyncThunk(
  "make/ServiceByCatagory",
  async (data) => {
    try {
      const {req,token} = data
      const res = await GET_ALL_SERVICS(req,token);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const getCatogries = createAsyncThunk(
    "make/allCatagory",
    async (data) => {
      try {
        const {req,token} = data

        // console.log("req ",req)
        // console.log("token ",token)
        const res = await GET_ALL_Catagory(req,token);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );

export const getexpirymanualtrade = createAsyncThunk(
    "make/getexpirymanualtrade",
    async (data) => {
      try {
        const {req,token} = data

      //  console.log("req ",req)
       // console.log("token ",token)
        const res = await GET_EXPIRY_BY_SCRIPT(req,token);
        return res;
      } catch (err) {
        throw err;
      }
    }
  );


 export const getAllStrikePriceApi = createAsyncThunk(
    "make/getAllStrikePriceApi",
    async (data) => {
      try {
        const {req,token} = data

      //  console.log("req ",req)
       // console.log("token ",token)
        const res = await GET_ALL_STRIKE_PRICE(req,token);
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
    AllGetScriptExpiry: null,
    AllGetStrikePrice: null,

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


      .addCase(getexpirymanualtrade.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getexpirymanualtrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllGetScriptExpiry = action.payload;
      })
      .addCase(getexpirymanualtrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getAllStrikePriceApi.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllStrikePriceApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllGetStrikePrice = action.payload;
      })
      .addCase(getAllStrikePriceApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

  },
});

export default GrouoServicesSlice;
