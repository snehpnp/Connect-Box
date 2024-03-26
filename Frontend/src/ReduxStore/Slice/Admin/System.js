import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCompanyInfo } from "../../../Services/Admin/System.service";

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

const SystemSlice = createSlice({
    name: "SystemSlice",
    initialState: {
        isLoading: false,
        isError: false,
        companyInfo: null,
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
            });
    },
});

export default SystemSlice;
