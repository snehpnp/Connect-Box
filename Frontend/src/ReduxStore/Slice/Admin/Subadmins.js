import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllSubAdmins } from "../../../Services/Admin/Subadmins.service";

export const GetAllSubAdmin = createAsyncThunk(
    "subadmin/getall",
    async (data) => {
        console.log("data :", data);
        try {
            const res = await GetAllSubAdmins(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

const SubAdminSlice = createSlice({
    name: "SubAdminSlice",
    initialState: {
        isLoading: false,
        isError: false,
        subadminsInfo: null,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetAllSubAdmin.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetAllSubAdmin.fulfilled, (state, action) => {

                state.isLoading = false;
                state.subadminsInfo = action.payload;
            })
            .addCase(GetAllSubAdmin.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default SubAdminSlice;
