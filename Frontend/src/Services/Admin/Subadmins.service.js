import axios from "axios";
// import Files
import * as Config from "../../Utils/Config";

// ADD SUBADMNS
export async function AddSubadmins(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}subadmin/add`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}
//Edit SubAdmins
export async function EditSubadmins(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}subadmin/edit`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

export async function GetAllSubAdmins(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}subadmin/getall`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

// GET RESEARCHER AND SUBADMIN NAME
export async function GetNAme(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}messagedata/name/get`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//get One SubAdmin
export async function GetOneSubAdmins(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}subadmin/get`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Update balance From Row
export async function updateBalance(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}balance/add`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}


//Active Status Data
export async function active_Status(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}activestatus/update`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Admin DashBoard Data 
export async function admin_dashData(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}admin/dashboard`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}
//Admin DashBoard Data 
export async function admin_dashData1(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}admin/dashboard1`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Top 5 Subadmin Data
export async function topSubadmin_dashData(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}admin/top/dashboard`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}


export async function SubadminsName(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}subadmin/name/getall`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Admin MessageGet
export async function getMsgByOwnerId(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}getMessageData`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Admin Delete MessageBoadcast Data
export async function deleteMsgById(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}messageData/delete`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Admin edit MessageBoadcast data
export async function editMsgData(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}messagedata/edit`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}


export async function addMessage(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}messageData`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//get Strategy In Subadmin BroadCast
export async function strategy_All(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}strategy_for_add_client/getall`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//get broker In Subadmin BroadCast
export async function broker_All(data, token) {
  try {
    const res = await axios.get(`${Config.base_url}broker/get`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Subadmin DashBoard
export async function subadmin_dashboard(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}data/dashboard`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//EMPLOYEE  DashBoard DATA
export async function employee_dashboard(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}employee/dashboard`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//subadmin dash data chart
export async function chartData_Subadmin(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}subadmin/userdata`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}

//Subadmin Dashboard Sales API
export async function SalesData_Subadmin(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}subadmin/user/balance`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}


//user getbroadcast message

export async function getUserbroadcast(data, token) {
  try {
    const res = await axios.post(`${Config.base_url}getbroadcastMsg`, data, {
      data: {},
    });
    return await res?.data;
  } catch (err) {
    return await err;
  }
}