import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_GROUP_SERVICS, ADD_GROUP_SERVICS } from "../../../Services/Subadmin/groupService.service";

export const GetAll_Group_Servics = createAsyncThunk("groupservices/getall",
    async (data) => {
        console.log("data :", data);
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
        console.log("data :", data);
        try {
            const res = await ADD_GROUP_SERVICS(data);
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
    },
});

export default GrouoServicesSlice;
