import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetSubStrategy } from "../../../Services/Subadmin/Strategy.service";

export const GetSubStrategys = createAsyncThunk(
    "sub/strategy/getall",
    async (data) => {
        console.log("data :", data);
        try {
            const res = await GetSubStrategy(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

const StrategySlice = createSlice({
    name: "SystemSlice",
    initialState: {
        isLoading: false,
        isError: false,
        StrategyInfo: null,

    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetSubStrategys.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetSubStrategys.fulfilled, (state, action) => {

                state.isLoading = false;
                state.StrategyInfo = action.payload;
            })
            .addCase(GetSubStrategys.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })  
         
    },
});

export default StrategySlice;
