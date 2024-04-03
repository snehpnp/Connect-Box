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
