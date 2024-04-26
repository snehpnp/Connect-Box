import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_GROUP_SERVICS, ADD_GROUP_SERVICS,Get_All_Services_Given,Get_All_Employee_Name, GET_ALL_CATAGORY, SERVICE_BY_CATAGORY, Get_All_Services_Name, DELETE_GROUP_SERVICE, GET_GROUP_DATA, EDIT_GROUP_SERVICE } from "../../../Services/Subadmin/groupService.service";

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

export const GET_ALL_SERVICES_NAMES = createAsyncThunk('servicesName/getall',
    async (data) => {

        try {
            const res = await Get_All_Services_Name(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GET_ALL_SERVICES_GIVEN = createAsyncThunk('servicesGiven/getall',
    async (data) => {

        try {
            const res = await Get_All_Services_Given(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Get_All_Employee_Names = createAsyncThunk('employees/name/get',
    async (data) => {

        try {
            const res = await Get_All_Employee_Name(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);
export const Delete_GroupServices = createAsyncThunk('groupServices/delete',
    async (data) => {

        try {
            const res = await DELETE_GROUP_SERVICE(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Get_Group_Data = createAsyncThunk('services/bygroupid1/get',
    async (data) => {

        try {
            const res = await GET_GROUP_DATA(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);
export const Edit_Group_Service = createAsyncThunk('groupservice/edit',

 
    async (data) => {

        try {
            const res = await EDIT_GROUP_SERVICE(data);
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
        Add_group_servics: null,
        delete_strategy: null,
        service_by_catagory: null,
        get_all_services_name: null,
        delete_groupservice:null,
        get_group_data:null,
        edit_group_service:null,
        get_all_services_given:null,
        Get_All_Employee:null


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
            .addCase(GET_ALL_SERVICES_NAMES.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_all_services_name = action.payload;
            })
            .addCase(GET_ALL_SERVICES_GIVEN.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_all_services_given = action.payload;
            })
            .addCase(Delete_GroupServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.delete_groupservice = action.payload;
            })
            .addCase(Get_Group_Data.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_group_data = action.payload;
            })
            .addCase(Edit_Group_Service.fulfilled, (state, action) => {
                state.isLoading = false;
                state.edit_group_service = action.payload;
            })
            .addCase(Get_All_Employee_Names.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(Get_All_Employee_Names.fulfilled, (state, action) => {

                state.isLoading = false;
                state.Get_All_Employee = action.payload;
            })
            .addCase(Get_All_Employee_Names.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
    },
});

export default GrouoServicesSlice;
