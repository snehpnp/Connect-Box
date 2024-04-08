import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_USERS, ADD_USERS ,GET_ALL_BROKER } from "../../../Services/Subadmin/all.service";


export const GetAllUsers = createAsyncThunk("user/getAll",
    async (data) => {

        try {
            const res = await GET_ALL_USERS(data);

            return res;
        } catch (err) {
            throw err;
        }
    }
);
export const AddUsers = createAsyncThunk("user/add",
    async (data) => {

        try {
            const res = await ADD_USERS(data);

            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Get_All_Broker = createAsyncThunk("broker/get",
    async () => {
        try {
            const res = await GET_ALL_BROKER();
            console.log("res :", res)
            return res;
        }
        catch (err) {
            throw err;
        }
    });



const StrategySlice = createSlice({
    name: "SystemSlice",
    initialState: {
        isLoading: false,
        isError: false,
        userslice: null,
        add_users: null,
        get_all_broker:null,


    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetAllUsers.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetAllUsers.fulfilled, (state, action) => {

                state.isLoading = false;
                state.userslice = action.payload;
            })
            .addCase(GetAllUsers.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(AddUsers.fulfilled, (state, action) => {

                state.isLoading = false;
                state.add_users = action.payload;
            })
            .addCase(Get_All_Broker.fulfilled, (state, action) => {

                state.isLoading = false;
                state.get_all_broker = action.payload;
            })



    },
});

export default StrategySlice;
