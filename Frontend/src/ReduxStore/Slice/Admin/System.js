import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCompanyInfo,ProfileData,EditCompanyInfo } from "../../../Services/Admin/System.service";

export const GetCompany_info = createAsyncThunk(
    "get/company",
    async (data) => {
        console.log("data :", data);
        try {
            const res = await GetCompanyInfo(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const updateSystemInfo = createAsyncThunk(
    "emailinfo/edit",
    async (data) => {
        console.log("data :", data);
        try {
            const res = await EditCompanyInfo(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const ProfileInfo = createAsyncThunk(
    "subadmin/get",
    async (data) => {
        console.log("data :", data);
        try {
            const res = await ProfileData(data);
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

    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetCompany_info.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetCompany_info.fulfilled, (state, action) => {

                state.isLoading = false;
                state.companyInfo = action.payload;
            })
            .addCase(GetCompany_info.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })  
             .addCase(ProfileInfo.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProfileInfo.fulfilled, (state, action) => {

                state.isLoading = false;
                state.profileInfo = action.payload;
            })
            .addCase(ProfileInfo.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(updateSystemInfo.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateSystemInfo.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(updateSystemInfo.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default SystemSlice;
