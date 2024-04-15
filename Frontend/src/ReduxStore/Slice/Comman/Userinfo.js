import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserInfo } from "../../../Services/Comman/comman";

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
          
    },
});

export default Userinfo1Slice;
