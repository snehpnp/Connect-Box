import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_USERS} from "../../../Services/Subadmin/all.service";


export const GetAllUsers = createAsyncThunk("user/getAll",
    async (data) => {
        
        try {
            const res = await GET_ALL_USERS(data);
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
        userslice: null,
      

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

          
         
    },
});

export default StrategySlice;
