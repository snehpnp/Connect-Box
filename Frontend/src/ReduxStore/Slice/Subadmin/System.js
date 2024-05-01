import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetInfo_Company, Edit_Company_info, GetInfo_strategyTransaction, GetInfo_strategyHistory, GetInfo_strategyTransactionUser, update_broker_info,Get_broker_info } from "../../../Services/Subadmin/system.service";

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

export const FindStgTranscDataUser = createAsyncThunk(
    "user/strategy/transaction",
    async (data) => {

        try {
            const res = await GetInfo_strategyTransactionUser(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const FindStgHistoryData = createAsyncThunk(
    "strategy/history",
    async (data) => {

        try {
            const res = await GetInfo_strategyHistory(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const update_broker_Data = createAsyncThunk(
    "update/Brokerinfo",
    async (data) => {

        try {
            const res = await update_broker_info(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Get_broker_Data = createAsyncThunk(
    "get/Brokerinfo",
    async (data) => {

        try {
            const res = await Get_broker_info(data);
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
        stg_history: null,



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
            .addCase(FindStgHistoryData.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(FindStgHistoryData.fulfilled, (state, action) => {

                state.isLoading = false;
                state.stg_history = action.payload;
            })
            .addCase(FindStgHistoryData.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(FindStgTranscDataUser.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(FindStgTranscDataUser.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(FindStgTranscDataUser.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(update_broker_Data.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(Get_broker_Data.fulfilled, (state, action) => {

                state.isLoading = false;
            })
    },
});

export default SystemSlice;
