import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddSubadmins,
  GetAllSubAdmins,
  EditSubadmins,
  GetOneSubAdmins,
  updateBalance,
  active_Status,
  admin_dashData,
  admin_dashData1,
  topSubadmin_dashData,
  SubadminsName,
  strategy_All,
  broker_All,
  subadmin_dashboard,
  employee_dashboard,
  SalesData_Subadmin,
  chartData_Subadmin,
  GetNAme
} from "../../../Services/Admin/Subadmins.service";


//Subadmin Sales Data
export const Subadmin_SalesData = createAsyncThunk(
  "subadmin/userdata",
  async (data) => {
    try {
      const res = await SalesData_Subadmin(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

//subadmin userCount Bar data
export const Subadmin_DashChartdata = createAsyncThunk(
  "subadmin/userdata",
  async (data) => {
    try {
      const res = await chartData_Subadmin(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

//subadmin dashboard
export const Subadmin_Dashdata = createAsyncThunk(
  "strategy_for_add_client/getall",
  async (data) => {
    try {
      const res = await subadmin_dashboard(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);


//EMPLOYEE dashboard
export const employee_dashboard_data = createAsyncThunk(
  "employee/dashboard",
  async (data) => {
    try {
      const res = await employee_dashboard(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const allStrategy_subAd = createAsyncThunk(
  "strategy_for_add_client/getall",
  async (data) => {
    try {
      const res = await strategy_All(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

//get all broker in subadmin broadcast
export const get_allBroker = createAsyncThunk(
  "broker/get",
  async (data) => {
    try {
      const res = await broker_All(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const Dashboard_admin = createAsyncThunk(
  "admin/dashboard",
  async (data) => {
    try {
      const res = await admin_dashData(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const Dashboard_admin1 = createAsyncThunk(
  "admin/dashboard",
  async (data) => {
    try {
      const res = await admin_dashData1(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);


export const top_Subadmin_dashData = createAsyncThunk(
  "admin/dashboard",
  async (data) => {
    try {
      const res = await topSubadmin_dashData(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const SubadminsNamesData = createAsyncThunk(
  "subadmin/name/getalls",
  async (data) => {
    try {
      const res = await SubadminsName(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const AddSubadmin = createAsyncThunk("subadmin/add", async (data) => {
  try {
    const res = await AddSubadmins(data);
    return res;
  } catch (err) {
    throw err;
  }
});

export const editSubadmin = createAsyncThunk("subadmin/edit", async (data) => {
  try {
    const res = await EditSubadmins(data);
    return res;
  } catch (err) {
    throw err;
  }
});

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

export const GetAllNames = createAsyncThunk(
  "messagedata/name/get",
  async (data) => {
    try {
      const res = await GetNAme(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const update_Balance = createAsyncThunk("balance/add", async (data) => {
  try {
    const res = await updateBalance(data);
    return res;
  } catch (err) {
    throw err;
  }
});

export const Show_Status = createAsyncThunk("subadmin/add", async (data) => {
  try {
    const res = await active_Status(data);
    return res;
  } catch (err) {
    throw err;
  }
});

const SubAdminSlice = createSlice({
  name: "SubAdminSlice",
  initialState: {
    isLoading: false,
    isError: false,
    subadminsInfo: null,
    Edit_Subadmin: null,
    NameSubadmin: null,

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
      })
      .addCase(Dashboard_admin.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Dashboard_admin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(Dashboard_admin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(Dashboard_admin1.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Dashboard_admin1.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(Dashboard_admin1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(SubadminsNamesData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(SubadminsNamesData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(SubadminsNamesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allStrategy_subAd.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(allStrategy_subAd.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(allStrategy_subAd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(get_allBroker.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(get_allBroker.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(get_allBroker.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(Subadmin_Dashdata.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Subadmin_Dashdata.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(Subadmin_Dashdata.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(Subadmin_DashChartdata.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Subadmin_DashChartdata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(Subadmin_DashChartdata.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(Subadmin_SalesData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(Subadmin_SalesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(Subadmin_SalesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(top_Subadmin_dashData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(top_Subadmin_dashData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(top_Subadmin_dashData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(employee_dashboard_data.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(GetAllNames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })

  },
});

export default SubAdminSlice;