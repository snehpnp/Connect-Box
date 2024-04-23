import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import { ADD_RESEARCHER, GET_ALL_RESEARCHER } from '../../../Services/Researcher/researcher.service'


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
  export const Get_All_Researcher = createAsyncThunk('researcher/getall',
    async (data) => {
      try{
        const res= await GET_ALL_RESEARCHER(data);
        return await res;
      }
      catch(error){
        throw error
      }
     

    })


  const ResearcherSlice = createSlice({
    name: "ResearcherSlice",
    initialState: {
      isLoading: false,
      isError: false,
      add_researcher: null,
      get_all_researcher: null,

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
        .addCase(Get_All_Researcher.fulfilled, (state, action) => {
          state.isLoading = false;
          state.get_all_researcher = action.payload;
        })

    },
  });


  export default ResearcherSlice;