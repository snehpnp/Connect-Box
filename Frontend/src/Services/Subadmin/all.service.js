import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";

//getServices data 
export async function GET_ALL_SERVICS(data) {
    try {
        const res = await axios.post(`${Config.base_url}ServiceByCatagory`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function GET_ALL_Catagory(data) {
    try {
        const res = await axios.post(`${Config.base_url}allCatagory`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function GET_ALL_USERS(data) {
    try {
        const res = await axios.post(`${Config.base_url}user/getall`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function ADD_USERS(data) {
    try {
        const res = await axios.post(`${Config.base_url}user/add`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function UPDATE_USERS(data) {
    try {
        const res = await axios.post(`${Config.base_url}user/update`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}



export async function GET_ALL_BROKER() {
    try {
        const res = await axios.get(`${Config.base_url}broker/get`, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

//Active Status Data
export async function active_Status(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}user/status_update`, data, {
            data: {},
        });
        return await res?.data;
    } catch (err) {
        return await err;
    }
}

// FIND ONE USER

export async function GET_ONE_USER(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}user/get`, data, {
            data: {}
        });
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function DELETE_USER(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}user/delete`, data, {
            data: {}
        })
        return await res?.data;

    }
    catch (err) {
        return await err;
    }
}

//GET ALL TREADE DETAILS
export async function GET_ALL_TRADE_DETAILS(data) {
    try {
        const res = await axios.post(`${Config.base_url}getall/user/signals`, data, {
            data: {}
        })
        return await res?.data;
    }
    catch (err) {
        return await err;
    }
}


export async function GET_ALL_RESEARCHER_STRATEGY(data) {
    try {
        const res = await axios.post(`${Config.base_url}subadmin/allsearcher/strategy`, data, {
            data: {}
        })
        return await res?.data;
    }
    catch (err) {
        return await err
    }
}

//GET ALL SUBADMIN USERS
export async function GET_ALL_SUBADMIN_USERS(data) {
    try {
        const res = await axios.post(`${Config.base_url}subadmin/user/getAll`, data, {
            data: {}
        })
        return await res?.data;
    }
    catch (err) {
        return await err
    }
}


