import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserInfo, TRADING_OFF_BTN } from "../../../Services/Comman/comman";

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

export const Trading_Off_Btn = createAsyncThunk('tradingoff',
    async (data) => {
        try {
            const res = await TRADING_OFF_BTN(data);
            return res;
        } catch (err) {
            throw err
        }
    })



const Userinfo1Slice = createSlice({
    name: "UserinfoSlice",
    initialState: {
        isLoading: false,
        isError: false,
        userInfo: null,
        tradingoff: null,




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
                state.userInfo = action.payload
            })
            .addCase(Userinfo.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(Trading_Off_Btn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tradingoff = action.payload
            })

    },
});

export default Userinfo1Slice;
