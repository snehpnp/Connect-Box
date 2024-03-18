import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { DispatchLogin } from "../../../Layout/Auth/Login";
import {GET_DASHBOARD_COUNT } from "../../../Service/subadmin.service";




export const Get_Subadmin_Dashboard_Count = createAsyncThunk("get/sub/dashboard", async (user_ID) => {
    try {
        const res = await GET_DASHBOARD_COUNT(user_ID);
        console.log("res" ,res);
        return await res;
    } catch (err) {
        return err;
    }
});


const DashboardSlice = createSlice({
    name: "DashboardSlice",
    initialState: {
        isLoading: false,
        isError: false,
        status: false,
        dashboard: [],
    },

    recuders: {},
    extraReducers: {

        [Get_Subadmin_Dashboard_Count.pending]: (state, { payload }) => {
            // state.isLoading = false;
            console.log("pending Get_All_SUBADMIN ");
            // return { ...state, allService: [], isLoading: true };
        },
        [Get_Subadmin_Dashboard_Count.fulfilled]: (state, { payload }) => {
            // state.isLoading = false;

            return { ...state, dashboard: payload, isLoading: false };
        },
        [Get_Subadmin_Dashboard_Count.rejected]: (state, action) => {
            console.log("pending reject ");
            // return { ...state, allService: action, isLoading: false };
        },
    },
});

export default DashboardSlice;
