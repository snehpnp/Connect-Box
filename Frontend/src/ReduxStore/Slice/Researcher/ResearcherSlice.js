import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_RESEARCHER } from '../../../Services/Researcher/researcher.service'

export const Add_Researcher = createAsyncThunk("researcher/add",
    async (data) => {
        try {
            const res = await ADD_RESEARCHER(data);
            return await res;
        }
        catch (err) {
            throw err
        }

    })


    const ResearcherSlice = createSlice({
        name: "ResearcherSlice",
        initialState: {
          isLoading: false,
          isError: false,
          add_researcher: null,
          
      
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(Add_Researcher.pending, (state, action) => {
              state.isLoading = true;
              state.isError = false;
            })
            .addCase(Add_Researcher.fulfilled, (state, action) => {
              state.isLoading = false;
              state.add_researcher = action.payload;
            })
            .addCase(Add_Researcher.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
            })
            
        },
      });
      
      export default ResearcherSlice;