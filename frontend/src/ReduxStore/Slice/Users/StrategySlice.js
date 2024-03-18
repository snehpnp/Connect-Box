import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { DispatchLogin } from "../../../Layout/Auth/Login";
import { STRATEGY_DESCRIPTION,STRATEGY_DESCRIPTION1, user_create_order,user_create_order1,user_update_order,Get_update_plan1 } from "../../../Service/user.service";


export const Get_Strategy_Description = createAsyncThunk("user/strat_desc", async (data) => {
    const { _id, token } = data

    try {
        const res = await STRATEGY_DESCRIPTION({ user_id: _id }, token);
        return await res;
    } catch (err) {
        return err;
    }
});


export const Get_create_order = createAsyncThunk("api/create-order", async (data) => {
    try {
        const res = await user_create_order(data);
        console.log("res cpp:", data);
        return await res;
    } catch (err) {
        return err;
    }
});


export const Get_create_order1 = createAsyncThunk("api/order/plan", async (data) => {
    try {
        const res = await user_create_order1(data);
        console.log("res cpp:", data);
        return await res;
    } catch (err) {
        return err;
    }
});


export const Get_update_plan = createAsyncThunk("api/update/plan", async (data) => {
    try {
        const res = await Get_update_plan1(data);
        console.log("res cpp:", data);
        return await res;
    } catch (err) {
        return err;
    }
});

export const Get_update_order = createAsyncThunk("api/update-order", async (data) => {


 
    try {
        const res = await user_update_order(data);
        console.log("res cpp:", data);
        return await res;
    } catch (err) {
        return err;
    }
});



export const Get_Strategy_Description1 = createAsyncThunk("user/strat_desc1", async (data) => {
    const { _id, token } = data

    try {
        const res = await STRATEGY_DESCRIPTION1({ user_id: _id }, token);
        return await res;
    } catch (err) {
        return err;
    }
});

const StrategyDescSlice = createSlice({
    name: "StrategyDescSlice",
    initialState: {
        isLoading: false,
        isError: false,
        strategy: [],
        status: false,
        update_status:[]
    },

    recuders: {},
    extraReducers: {

        [Get_Strategy_Description.pending]: (state, { payload }) => {
            // state.isLoading = false;
            // return { ...state, get_dashboard: [], isLoading: true };
        },
        [Get_Strategy_Description.fulfilled]: (state, { payload }) => {
            // state.isLoading = false;
            return { ...state, strategy: payload, isLoading: false };
        },
        [Get_Strategy_Description1.fulfilled]: (state, { payload }) => {
            // state.isLoading = false;
            return { ...state, strategy: payload, isLoading: false };
        },
        [Get_update_order.fulfilled]: (state, { payload }) => {
            // state.isLoading = false;
            return { ...state, update_status: payload, isLoading: false };
        },
        [Get_Strategy_Description.rejected]: (state, action) => {
            // return { ...state, get_dashboard: action, isLoading: false };
        },

    },
});




export default StrategyDescSlice;
