import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetSubadmminCompanyInfo } from "../../../Services/Admin/SubadminCompany.service";

export const fetchSubadminCompanyInfo = createAsyncThunk(
    "subadmin/company/fetchAll",
    async (data, thunkAPI) => {
        try {
            const response = await GetSubadmminCompanyInfo(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

const subAdminSystemSlice = createSlice({
    name: "subAdminSystem",
    initialState: {
        isLoading: false,
        isError: false,
        companyInfo: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubadminCompanyInfo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchSubadminCompanyInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.companyInfo = action.payload;
            })
            .addCase(fetchSubadminCompanyInfo.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default subAdminSystemSlice;
