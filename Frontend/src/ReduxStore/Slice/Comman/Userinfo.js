import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetBrokerData } from "../../../Services/Comman/Optionchain";

import { GetUserInfo, TRADING_OFF_BTN ,ProfileData} from "../../../Services/Comman/comman";

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




// profile 

export const ProfilImage = createAsyncThunk(
    "ProfileImagedata",
    async (data) => {
        
        try {
            const res = await ProfileData(data);
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
        userInfo: null,
        tradingoff: null,
        ProfilImage:null,

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

            .addCase(Trading_Off_Btn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tradingoff = action.payload
            }).addCase(ProfilImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ProfilImage = action.payload
            }).addCase(ProfilImage.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            }).addCase(ProfilImage.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })

    },
});

export default Userinfo1Slice;
