import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetInfo_Company,Edit_Company_info,GetInfo_strategyTransaction } from "../../../Services/Subadmin/system.service";

export const infocompany = createAsyncThunk(
    "subadmin/company/getone",
    async (data) => {
        
        try {
            const res = await GetInfo_Company(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const edit_company_info = createAsyncThunk(
    "subadmin/company/edit",
    async (data) => {
        
        try {
            const res = await Edit_Company_info(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const FindStgTranscData = createAsyncThunk(
    "strategy/transaction",
    async (data) => {
        
        try {
            const res = await GetInfo_strategyTransaction(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);




const SystemSlice = createSlice({
    name: "SystemSlice",
    initialState: {
        isLoading: false,
        isError: false,
        companyInfo: null,
        profileInfo: null,
        stg_trans: null,


    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(infocompany.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(infocompany.fulfilled, (state, action) => {

                state.isLoading = false;
                state.companyInfo = action.payload;
            })
            .addCase(infocompany.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(edit_company_info.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(edit_company_info.fulfilled, (state, action) => {

                state.isLoading = false;
                state.companyInfo = action.payload;
            })
            .addCase(edit_company_info.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(FindStgTranscData.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(FindStgTranscData.fulfilled, (state, action) => {

                state.isLoading = false;
                state.stg_trans = action.payload;
            })
            .addCase(FindStgTranscData.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
    },
});

export default SystemSlice;
