import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_TRADE_DETAILS} from "../../../Services/Subadmin/all.service";

export const Get_All_Trade_Details = createAsyncThunk("getall/user/signals",
    async (data) => {
        try {
            const res = await GET_ALL_TRADE_DETAILS(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

 


const TradeDetailsSlice = createSlice({
    name: "TradeDetailsSlice",
    initialState: {
        isLoading: false,
        isError: false,
        get_all_trade_details:null
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(Get_All_Trade_Details.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(Get_All_Trade_Details.fulfilled, (state, action) => {

                state.isLoading = false;
                state.get_all_trade_details = action.payload;
            })
            .addCase(Get_All_Trade_Details.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            
    },
});

export default TradeDetailsSlice;
