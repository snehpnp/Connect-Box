import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetSubStrategy, ADD_STRATEGY, Delete_Strategy,EDIT_STRATEGY,Get_Strategy_By_Id , GET_ALL_STRETGY_WITH_IMG,getOrders_data,EmployeeData,AddEmployeeBySub,DeleteEmployee,UpdateEmployee,get_Employee_Id,get_Employee_Status,GetAllStrategyFor_Employee,GetAllServicesForEmployee,StrategyPurchaseBySubadmin,strategyOrderUpdate,starategyTradeCharge} from "../../../Services/Subadmin/Strategy.service";


export const GetEmployeeServices= createAsyncThunk(
    "get/allgroupServices",
    async (data) => {
        try {
            const res = await GetAllServicesForEmployee(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GetEmployeeStrategy= createAsyncThunk(
    "get/strategy",
    async (data) => {
        try {
            const res = await GetAllStrategyFor_Employee(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GetEmployeeStatus= createAsyncThunk(
    "employee/statusUpdate",
    async (data) => {
        try {
            const res = await get_Employee_Status(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GetEmployeeByID= createAsyncThunk(
    "employee/edit",
    async (data) => {
        try {
            const res = await get_Employee_Id(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Update_Employee= createAsyncThunk(
    "employee/update",
    async (data) => {
        try {
            const res = await UpdateEmployee(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Delete_Employee= createAsyncThunk(
    "Delete/employee",
    async (data) => {
        try {
            const res = await DeleteEmployee(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);
export const Add_Employee= createAsyncThunk(
    "add/employee/data",
    async (data) => {
        try {
            const res = await AddEmployeeBySub(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const Employee_Details = createAsyncThunk(
    "employee/data",
    async (data) => {
        try {
            const res = await EmployeeData(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);




export const EditSubStrategys = createAsyncThunk(
    "strategy/edit",
    async (data) => {
        
        try {
            const res = await EDIT_STRATEGY(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GetSubStrategys_ById = createAsyncThunk(
    "strategy/get",
    async (data) => {
        
        try {
            const res = await Get_Strategy_By_Id(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const GetSubStrategys = createAsyncThunk( "sub/strategy/getall",
    async (data) => {
        
        try {
            const res = await GetSubStrategy(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GetStretgyWithImg = createAsyncThunk( "strategy/getall",
    async (data) => {
        
        try {
            const res = await GET_ALL_STRETGY_WITH_IMG(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const AddStrategy = createAsyncThunk("strategy/add",
    async (data) => {
        
        try {
            const res = await ADD_STRATEGY(data);
         
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const DELETE_STRATEGY = createAsyncThunk("strategy/delete",
    async (data) => {
        
        try {
            const res = await Delete_Strategy(data);
            
            return res;
        } catch (err) {
            throw err;
        }
    }
);



export const Stg_by_Subadmin = createAsyncThunk("strategy/order/create",
    async (data) => {
        
        try {
            const res = await StrategyPurchaseBySubadmin(data);
            
            return res;
        } catch (err) {
            throw err;
        }
    }
);




export const update_Stg_order = createAsyncThunk("strategy/order/update",
    async (data) => {
        
        try {
            const res = await strategyOrderUpdate(data);
            
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const TradeCharge  = createAsyncThunk("sub/trade/charges",
    async (data) => {
        
        try {
            const res = await starategyTradeCharge(data);
            
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
        StrategyInfo: null,
        Add_Strategy:null,
        delete_strategy:null,
        get_stretgy_with_img:null,
        TradeCharge:null,

    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetSubStrategys.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetSubStrategys.fulfilled, (state, action) => {

                state.isLoading = false;
                state.StrategyInfo = action.payload;
            })
            .addCase(GetSubStrategys.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })  

            .addCase(AddStrategy.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Add_Strategy = action.payload;
            })
            .addCase(DELETE_STRATEGY.fulfilled, (state, action) => {
                state.isLoading = false;
                state.delete_strategy = action.payload;
            })
            .addCase(EditSubStrategys.fulfilled, (state, action) => {
                state.isLoading = false;
                state.delete_strategy = action.payload;
            })
            .addCase(GetSubStrategys_ById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.delete_strategy = action.payload;
            })
            .addCase(GetStretgyWithImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_stretgy_with_img = action.payload;
            })
         
            .addCase(Employee_Details.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(Add_Employee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Add_Employee = action.payload;
            })
            .addCase(Delete_Employee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Delete_Employee = action.payload;
            })
            .addCase(Update_Employee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Update_Employee = action.payload;
            })
            .addCase(GetEmployeeByID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.GetEmployeeByID = action.payload;
            })
            .addCase(GetEmployeeStatus.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(GetEmployeeStrategy.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(GetEmployeeServices.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(Stg_by_Subadmin.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(update_Stg_order.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(TradeCharge.fulfilled, (state, action) => {
                state.isLoading = false;
            })
        
          
    },
});

export default StrategySlice;
