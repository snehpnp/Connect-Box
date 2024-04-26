import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_RESEARCHER_STRATEGY } from "../../../Services/Subadmin/all.service";

export const Get_All_Researcher_Strategy = createAsyncThunk('subadmin/allsearcher/strategy',
    async (data) => {
        try {
            const res = await GET_ALL_RESEARCHER_STRATEGY(data)
            return await res
        }
        catch (err) {
            return await err
        }
    })


const AllResearcherStrategySlice = createSlice({
    name: "AllResearcherStrategySlice",
    initialState: {
        isLoading: false,
        isError: false,
        get_all_researcher_strategy: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Get_All_Researcher_Strategy.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(Get_All_Researcher_Strategy.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(Get_All_Researcher_Strategy.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_all_researcher_strategy = action.payload;
            })
    }
})

export default AllResearcherStrategySlice;