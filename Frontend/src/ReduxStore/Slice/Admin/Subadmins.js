import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddSubadmins, GetAllSubAdmins,EditSubadmins,GetOneSubAdmins,updateBalance,active_Status } from "../../../Services/Admin/Subadmins.service";





export const AddSubadmin = createAsyncThunk(
    "subadmin/add",
    async (data) => {
        
        try {
            const res = await AddSubadmins(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const editSubadmin = createAsyncThunk(
    "subadmin/edit",
    async (data) => {
        
        try {
            const res = await EditSubadmins(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const getSubAdminById = createAsyncThunk(
    "subadmin/getall",
    async (data) => {
        
        try {
            const res = await GetOneSubAdmins(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const GetAllSubAdmin = createAsyncThunk(
    "subadmin/getall",
    async (data) => {
        
        try {
            const res = await GetAllSubAdmins(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const update_Balance = createAsyncThunk(
    "balance/add",
    async (data) => {
        
        try {
            const res = await updateBalance(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const Show_Status = createAsyncThunk(
    "subadmin/add",
    async (data) => {
        
        try {
            const res = await active_Status(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

const SubAdminSlice = createSlice({
    name: "SubAdminSlice",
    initialState: {
        isLoading: false,
        isError: false,
        subadminsInfo: null,
        Edit_Subadmin:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllSubAdmin.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetAllSubAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subadminsInfo = action.payload;
            })
            .addCase(GetAllSubAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(AddSubadmin.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(AddSubadmin.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(AddSubadmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(editSubadmin.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(editSubadmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Edit_Subadmin = action.payload;
            })
            .addCase(editSubadmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getSubAdminById.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getSubAdminById.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getSubAdminById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(update_Balance.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(update_Balance.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(update_Balance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(Show_Status.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(Show_Status.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(Show_Status.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default SubAdminSlice;
