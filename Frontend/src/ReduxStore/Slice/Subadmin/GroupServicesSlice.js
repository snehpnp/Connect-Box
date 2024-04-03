import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_GROUP_SERVICS, ADD_GROUP_SERVICS, GET_ALL_CATAGORY, SERVICE_BY_CATAGORY } from "../../../Services/Subadmin/groupService.service";

export const GetAll_Group_Servics = createAsyncThunk("groupservices/getall",
    async (data) => {
        
        try {
            const res = await GET_ALL_GROUP_SERVICS(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const AddGrpservices = createAsyncThunk("groupservice/add",
    async (data) => {
 
        try {
            const res = await ADD_GROUP_SERVICS(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Get_All_Catagory = createAsyncThunk('allCatagory',
    async (data) => {
 
        try {
            const res = await GET_ALL_CATAGORY(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Service_By_Catagory = createAsyncThunk('ServiceByCatagory',
    async (data) => {
 
        try {
            const res = await SERVICE_BY_CATAGORY(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);



const GrouoServicesSlice = createSlice({
    name: "SystemSlice",
    initialState: {
        isLoading: false,
        isError: false,
        AllgroupService: null,
        Add_group_servics:null,
        delete_strategy:null,
        service_by_catagory:null


    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetAll_Group_Servics.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetAll_Group_Servics.fulfilled, (state, action) => {

                state.isLoading = false;
                state.AllgroupService = action.payload;
            })
            .addCase(GetAll_Group_Servics.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            }) 
            .addCase(AddGrpservices.fulfilled, (state, action) => {

                state.isLoading = false;
                state.Add_group_servics = action.payload;
            }) 
            .addCase(Get_All_Catagory.fulfilled, (state, action) => {

                state.isLoading = false;
                state.get_all_catagory = action.payload;
            }) 
            .addCase(Service_By_Catagory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.service_by_catagory = action.payload;
            }) 
    },
});

export default GrouoServicesSlice;
