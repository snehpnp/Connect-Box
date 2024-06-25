import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_RESEARCHER, GET_ALL_RESEARCHER, UPDATE_BALANCE, DELETE_RESEARCHER ,STRATEGY_TRANSACTION_DETAILS ,  ADD_RESEARCHER_STRATEGY, EDIT_RESEARCHER_STRATEGY, GET_ONE_RESEARCHER_STRATEGY, GET_ALL_RESEARCHER_STRATEGY , UPDATE_RESEARCHER , Delete_Strategy , STRATEGY_USERS,COLLA_NAME,COLLA_ADD_BALANCE,updateFreePlan} from '../../../Services/Researcher/researcher.service'


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
export const EditResearcherStrategys= createAsyncThunk('researcher/editstrategy',
async(data)=>{
  try{
    const res= await EDIT_RESEARCHER_STRATEGY(data);
    return await res;
  }
  catch(err){
    return await err
  }

})

export const GetOneResearcherStrategys= createAsyncThunk('researcher/getonestrategy',
async(data)=>{
  try{
    const res= await GET_ONE_RESEARCHER_STRATEGY(data);
    return await res;
  }
  catch(err){
    return await err
  }

})

export const GetAllResearcherStrategys= createAsyncThunk('researcher/getll',
async(data)=>{
  try{
    const res= await GET_ALL_RESEARCHER_STRATEGY(data);
    return await res;
  }
  catch(err){
    return await err
  }

})

export const Update_Researcher=createAsyncThunk('researcher/edit',
async (data)=>{
  try{
    const res = await UPDATE_RESEARCHER(data)
    return await res;
  }
  catch(err){
    return await err
  }

})

export const Strategy_Transaction_Details=createAsyncThunk('strategy/order/get',
async (data)=>{
  try{
    const res = await STRATEGY_TRANSACTION_DETAILS(data)
    return await res;
  }
  catch(err){
    return await err
  }
})

export const DELETE_STRATEGY = createAsyncThunk("researcher/strategy/delete",
    async (data) => {
        
        try {
            const res = await Delete_Strategy(data);
            
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Strategy_Users = createAsyncThunk("researcher/strategy/users",
    async (data) => {
        
        try {
            const res = await STRATEGY_USERS(data);
            
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const COLLA_NAME_DATA = createAsyncThunk("researcher/colla/name",
    async (data) => {
        
        try {
            const res = await COLLA_NAME(data);
            
            return res;
        } catch (err) {
            throw err;
        }
    }
);



export const COLLA_ADD_BALANCE_DATA = createAsyncThunk("colla/balance/add",
    async (data) => {
        
        try {
            const res = await COLLA_ADD_BALANCE(data);
            
            return res;
        } catch (err) {
            throw err;
        }
    }
);



//  for free plan
export const getFreePlan = createAsyncThunk("strategy/order/freePlan",
  
  async (data) => {
      
      try {
          const res = await updateFreePlan(data);
          
          return res;
      } catch (err) {
          throw err;
      }
  }
);



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
    editResearcherStrategys: null,
    getOneResearcherStrategys:null,
    getallResearcherStrategys: null,
    updateResearcher :null,
    strategy_transation_details:null,
    delete_strategy :null,
    strategy_users :null,
    getFreePlan:null,


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
      .addCase(EditResearcherStrategys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editResearcherStrategys = action.payload;
      })
      .addCase(GetOneResearcherStrategys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getOneResearcherStrategys = action.payload;
      })
      .addCase(GetAllResearcherStrategys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getallResearcherStrategys = action.payload;
      })

      .addCase(Update_Researcher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateResearcher = action.payload;
      })
      .addCase(Strategy_Transaction_Details.fulfilled, (state, action) => {
        state.isLoading = false;
        state.strategy_transation_details = action.payload;
      })
      .addCase(DELETE_STRATEGY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.delete_strategy = action.payload;
      })
      .addCase(Strategy_Users.fulfilled, (state, action) => {
        state.isLoading = false;
        state.strategy_users = action.payload;
      })
      .addCase(COLLA_NAME_DATA.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(COLLA_ADD_BALANCE_DATA.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getFreePlan.fulfilled, (state, action) => {
        state.isLoading = false;
      })
  },
});


export default ResearcherSlice;