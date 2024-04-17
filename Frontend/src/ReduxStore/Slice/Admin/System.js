import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCompanyInfo,ProfileData,EditCompanyInfo,Subadminhelp, getSubadminhelp ,postuserhelpdata, gethelpdata,deleteuserhelpdata,deletesubadmindata } from "../../../Services/Admin/System.service";

export const GetCompany_info = createAsyncThunk(
    "get/company",
    async (data) => {
        
        try {
            const res = await GetCompanyInfo(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);

export const updateSystemInfo = createAsyncThunk(
    "emailinfo/edit",
    async (data) => {
        
        try {
            const res = await EditCompanyInfo(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const ProfileInfo = createAsyncThunk(
    "subadmin/get",
    async (data) => {
        
        try {
            const res = await ProfileData(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const SubadminHelpmessage = createAsyncThunk(
    "subadminhelpmessage",
    async (data)=>{
        try {
            const res = await Subadminhelp(data);
              return res;
        } catch (err) {
            throw err;
        }
    }
)


export const getsubadmintable = createAsyncThunk(
    "getsubadminhelpmessage",
    async (data)=>{
        try {
            const res = await getSubadminhelp(data);
              return res;
        } catch (err) {
            throw err;
        }
    }
)

export const postuserhelp = createAsyncThunk(
    "userhelpmessage",
    async (data)=>{
        try {
            const res = await postuserhelpdata(data);
              return res;
        } catch (err) {
            throw err;
        }
    }
)

export const userdataforhelp = createAsyncThunk(
    "getuserhelpdata",
    async (data)=>{
        try {
            const res = await gethelpdata(data);
              return res;
        } catch (err) {
            throw err;
        }
    }
)


export const deleteuserdata = createAsyncThunk(
    "getuserdelete",
    async (data)=>{
        try {
            const res = await deleteuserhelpdata(data);
              return res;
        } catch (err) {
            throw err;
        }
    }
)

//  



export const deletesubadminhelpdata = createAsyncThunk(
    "getsubadmindelete",
    async (data)=>{
        try {
            const res = await deletesubadmindata(data);
              return res;
        } catch (err) {
            throw err;
        }
    }
)



const SystemSlice = createSlice({
    name: "SystemSlice",
    initialState: {
        isLoading: false,
        isError: false,
        companyInfo: null,
        profileInfo: null,
        SubadminHelpmessage:null,
        getsubadmintable:null,
        postuserhelp:null,
        userdataforhelp:null,
        deleteuser_data:null,
        deletesubadminhelpdata:null,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(GetCompany_info.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetCompany_info.fulfilled, (state, action) => {

                state.isLoading = false;
                state.companyInfo = action.payload;
            })
            .addCase(GetCompany_info.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })  
             .addCase(ProfileInfo.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(ProfileInfo.fulfilled, (state, action) => {

                state.isLoading = false;
                state.profileInfo = action.payload;
            })
            .addCase(ProfileInfo.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
            .addCase(updateSystemInfo.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateSystemInfo.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(updateSystemInfo.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            }).addCase(SubadminHelpmessage.pending,(state,action)=>{
                state.isLoading = true;
                state.isError = false;
            }).addCase(SubadminHelpmessage.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
            }).addCase(SubadminHelpmessage.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.SubadminHelpmessage = action.payload;
            }).addCase(getsubadmintable.pending,(state,action)=>{
                state.isLoading = true;
                state.isError = false;
            }).addCase(getsubadmintable.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
            }).addCase(getsubadmintable.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.getsubadmintable = action.payload;
            }).addCase(postuserhelp.pending,(state,action)=>{
                state.isLoading = true;
                state.isError = false;
            }).addCase(postuserhelp.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
            }).addCase(postuserhelp.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.postuserhelp = action.payload;
            }).addCase(userdataforhelp.pending,(state,action)=>{
                state.isLoading = true;
                state.isError = false;
            }).addCase(userdataforhelp.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
            }).addCase(userdataforhelp.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.userdataforhelp = action.payload;
            }).addCase(deleteuserdata.pending,(state,action)=>{
                state.isLoading = true;
                state.isError = false;
            }).addCase(deleteuserdata.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
            }).addCase(deleteuserdata.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.deleteuser_data = action.payload;
            }).addCase(deletesubadminhelpdata.pending,(state,action)=>{
                state.isLoading = true;
                state.isError = false;
            }).addCase(deletesubadminhelpdata.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
            }).addCase(deletesubadminhelpdata.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.deletesubadminhelpdata = action.payload;
            })
    },
});

export default SystemSlice;
