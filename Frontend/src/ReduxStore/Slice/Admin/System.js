import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCompanyInfo, ProfileData, EditCompanyInfo, Subadminhelp, getSubadminhelp, postuserhelpdata, gethelpdata, deleteuserhelpdata, deletesubadmindata, ComparePrefix_key, Researcherdetail, getEmployeetable, getEmployeeBYid, GET_PARENT_NAME } from "../../../Services/Admin/System.service";

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

export const Get_Parent_Type = createAsyncThunk(
    "parentname/get",
    async (data) => {

        try {
            const res = await GET_PARENT_NAME(data);
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
            const { req, token } = data

            const res = await ProfileData(req, token);
            return res;
        } catch (err) {
            throw err;
        }
    }
);


export const SubadminHelpmessage = createAsyncThunk(
    "subadminhelpmessage",
    async (data) => {
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
    async (data) => {
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
    async (data) => {
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
    async (data) => {
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
    async (data) => {
        try {
            const res = await deleteuserhelpdata(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
)

//   delet subadmin data



export const deletesubadminhelpdata = createAsyncThunk(
    "getsubadmindelete",
    async (data) => {
        try {
            const res = await deletesubadmindata(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
)


/// Prefix_key  data 

export const userprifix_key = createAsyncThunk(
    "userdataByPrefix",
    async (data) => {
        try {
            const res = await ComparePrefix_key(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
)


/// get researcher detail

export const getResearch = createAsyncThunk(
    "getResearcher",
    async (data) => {
        try {
            const res = await Researcherdetail(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
)


/// get employee detail

export const getemployee = createAsyncThunk(
    "getEmployee",
    async (data) => {
        try {
            const res = await getEmployeetable(data);
            return res;
        } catch (err) {
            throw err;
        }
    }
)


// get employee data by subdmin id


export const Employeedatabyid = createAsyncThunk(
    "getEmployeebyid",
    async (data) => {
        try {
            const res = await getEmployeeBYid(data);
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
        SubadminHelpmessage: null,
        getsubadmintable: null,
        postuserhelp: null,
        userdataforhelp: null,
        deleteuser_data: null,
        deletesubadminhelpdata: null,
        userprifix_key: null,
        getResearch: null,
        getemployee: null,
        Employeedatabyid: null,
        get_parent_type: null,
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
            }).addCase(SubadminHelpmessage.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(SubadminHelpmessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(SubadminHelpmessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.SubadminHelpmessage = action.payload;
            }).addCase(getsubadmintable.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(getsubadmintable.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(getsubadmintable.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getsubadmintable = action.payload;
            }).addCase(postuserhelp.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(postuserhelp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(postuserhelp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postuserhelp = action.payload;
            }).addCase(userdataforhelp.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(userdataforhelp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(userdataforhelp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userdataforhelp = action.payload;
            }).addCase(deleteuserdata.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(deleteuserdata.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(deleteuserdata.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteuser_data = action.payload;
            }).addCase(deletesubadminhelpdata.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(deletesubadminhelpdata.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(deletesubadminhelpdata.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deletesubadminhelpdata = action.payload;
            }).addCase(userprifix_key.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(userprifix_key.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(userprifix_key.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userprifix_key = action.payload;
            }).addCase(getResearch.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(getResearch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(getResearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getResearch = action.payload;
            }).addCase(getemployee.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(getemployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(getemployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getemployee = action.payload;
            }).addCase(Employeedatabyid.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(Employeedatabyid.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }).addCase(Employeedatabyid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Employeedatabyid = action.payload;
            })
            .addCase(Get_Parent_Type.fulfilled, (state, action) => {
                state.isLoading = false;
                state.get_parent_type = action.payload;
            })
    },
});

export default SystemSlice;
