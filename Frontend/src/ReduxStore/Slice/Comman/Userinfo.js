import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserInfo } from "../../../Services/Comman/comman";
import { GetBrokerData } from "../../../Services/Comman/Optionchain";


export const Userinfo = createAsyncThunk(
    "get/userinfo",
    async (data) => {
        
        try {
            const res = await GetUserInfo(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const GetBrokerDatas = createAsyncThunk(
    "get/brokercredentail",
    async (data) => {
        
        try {
            const res = await GetBrokerData(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);



const Userinfo1Slice = createSlice({
    name: "UserinfoSlice",
    initialState: {
        isLoading: false,
        isError: false,
       
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(Userinfo.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(Userinfo.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(Userinfo.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(GetBrokerDatas.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetBrokerDatas.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(GetBrokerDatas.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
    },
});

export default Userinfo1Slice;
