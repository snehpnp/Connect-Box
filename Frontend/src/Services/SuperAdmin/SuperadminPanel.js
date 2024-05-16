
import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// getting data for superadmin panel


export async function admindata(data) {
    try {
        const res = await axios.get(`${Config.base_url}superadminPanel`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


// add admin and update 
export async function addadminandupdate(data) {
    try {
        const res = await axios.post(`${Config.base_url}addAdminandupdate`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


// admin history for superadmin page AdminHistory

export async function History(data) {
    try {
        const res = await axios.post(`${Config.base_url}AdminHistory`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}



// getting subadmin data

export async function subadmindata(data) {
    try {
        const res = await axios.post(`${Config.base_url}subadmindetail`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


   
/// get user data 

export async function  updateuserdata(data) {
    try {
        const res = await axios.post(`${Config.base_url}updateUserdetail`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

// delete user by id  in superadmin

export async function  deleteById(data) {
    try {
        const res = await axios.post(`${Config.base_url}deleteUser`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}