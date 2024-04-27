import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_RESEARCHER, GET_ALL_RESEARCHER, UPDATE_BALANCE, DELETE_RESEARCHER , ADD_RESEARCHER_STRATEGY } from '../../../Services/Researcher/researcher.service'


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
    try {
      const res = await GET_ALL_RESEARCHER(data);
      return await res;
    }
    catch (error) {
      throw error
    }
  })

export const Update_Balance = createAsyncThunk('researcher/updatebalance',
  async (data) => {
    try {
      const res = await UPDATE_BALANCE(data)
      return await res;
    }
    catch (err) {
      throw await err
    }
  })

  export const Delete_Researcher= createAsyncThunk('researcher/delete',
async(data)=>{
  try{
    const res= await DELETE_RESEARCHER(data);
    return await res;
  }
  catch(err){
    return await err
  }

})

export const AddResearcherStrategy= createAsyncThunk('researcher/addstrategy',
async(data)=>{
  try{
    const res= await ADD_RESEARCHER_STRATEGY(data);
    return await res;
  }
  catch(err){
    return await err
  }

})



const ResearcherSlice = createSlice({
  name: "ResearcherSlice",
  initialState: {
    isLoading: false,
    isError: false,
    add_researcher: null,
    get_all_researcher: null,
    update_balance: null,
    delete_researcher:null,
    addResearcherStrategy: null,


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
      .addCase(Update_Balance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.update_balance = action.payload;
      })
      .addCase(Delete_Researcher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.delete_researcher = action.payload;
      })
      .addCase(AddResearcherStrategy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addResearcherStrategy = action.payload;
      })

  },
});


export default ResearcherSlice;