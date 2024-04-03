import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetSubStrategy, ADD_STRATEGY, Delete_Strategy } from "../../../Services/Subadmin/Strategy.service";

export const GetSubStrategys = createAsyncThunk(
    "sub/strategy/getall",
    async (data) => {
        
        try {
            const res = await GetSubStrategy(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const AddStrategy = createAsyncThunk("strategy/add",
    async (data) => {
        
        try {
            const res = await ADD_STRATEGY(data);
            console.log("resSlice :", res)
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const DELETE_STRATEGY = createAsyncThunk("strategy/delete",
    async (data) => {
        
        try {
            const res = await Delete_Strategy(data);
            console.log("resSlice :", res)
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
        Add_Strategy:null,
        delete_strategy:null

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

            .addCase(AddStrategy.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Add_Strategy = action.payload;
            })
            .addCase(DELETE_STRATEGY.fulfilled, (state, action) => {
                state.isLoading = false;
                state.delete_strategy = action.payload;
            })
         
    },
});

export default StrategySlice;
