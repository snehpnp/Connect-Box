import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_USERS, ADD_USERS, UPDATE_USERS,GET_ALL_SUBADMIN_USERS,  GET_ALL_BROKER, active_Status, GET_ONE_USER, DELETE_USER } from "../../../Services/Subadmin/all.service";


export const GetAllUsers = createAsyncThunk("user/getAll",
    async (data) => {

        try {
            const res = await GET_ALL_USERS(data);

            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GetAllSubadminUsers = createAsyncThunk("subadmin/user/getAll",
    async (data) => {

        try {
            const res = await GET_ALL_SUBADMIN_USERS(data);

            return res;
        } catch (err) {
            throw err;
        }
    }
);
export const AddUsers = createAsyncThunk("user/add",
    async (data) => {

        try {
            const res = await ADD_USERS(data);

            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const UpdateUsers = createAsyncThunk("user/update",
    async (data) => {

        try {
            const res = await UPDATE_USERS(data);

            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Get_All_Broker = createAsyncThunk("broker/get",
    async () => {
        try {
            const res = await GET_ALL_BROKER();

            return res;
        }
        catch (err) {
            throw err;
        }
    });

export const Show_Status = createAsyncThunk("user/status_update", async (data) => {
    try {
        const res = await active_Status(data);
        return res;
    } catch (err) {
        throw err;
    }
});

export const GetOneUser = createAsyncThunk('user/get',
    async (data) => {
        try {
            const res = await GET_ONE_USER(data);
            return res;
        }
        catch (err) {
            throw err
        }
    }
)
export const DeleteUser = createAsyncThunk('user/delete',
    async (data) => {
        try {
            const res = await DELETE_USER(data);
            return res;
        }
        catch (err) {
            throw err;
        }
    })




const StrategySlice = createSlice({
    name: "SystemSlice",
    initialState: {
        isLoading: false,
        isError: false,
        userslice: null,
        add_users: null,
        get_all_broker: null,
        show_status: null,
        findone_user: null,
        delete_user: null,
        getallsubadminusers:null,


    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetAllUsers.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetAllUsers.fulfilled, (state, action) => {

                state.isLoading = false;
                state.userslice = action.payload;
            })
            .addCase(GetAllUsers.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(AddUsers.fulfilled, (state, action) => {

                state.isLoading = false;
                state.add_users = action.payload;
            })
            .addCase(Get_All_Broker.fulfilled, (state, action) => {

                state.isLoading = false;
                state.get_all_broker = action.payload;
            })
            .addCase(Show_Status.fulfilled, (state, action) => {
                state.isLoading = false;
                state.show_status = action.payload;
            })
            .addCase(GetOneUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.findone_user = action.payload;
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.delete_user = action.payload;
            })

            .addCase(UpdateUsers.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UpdateUsers.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(UpdateUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(GetAllSubadminUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getallsubadminusers = action.payload;
            })
    },
});

export default StrategySlice;
