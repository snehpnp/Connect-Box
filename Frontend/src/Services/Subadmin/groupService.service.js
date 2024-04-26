import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GET_ALL_GROUP_SERVICS(data) {
    try {
        const res = await axios.post(`${Config.base_url}groupservices/getall`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function ADD_GROUP_SERVICS(data) {
    try {
        const res = await axios.post(`${Config.base_url}groupservice/add`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function GET_ALL_CATAGORY() {
    try {
        const res = await axios.post(`${Config.base_url}allCatagory`, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function SERVICE_BY_CATAGORY(data) {
    try {
 
        const res = await axios.post(`${Config.base_url}ServiceByCatagory`,data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function Get_All_Services_Name(data) {
    try {
 
        const res = await axios.post(`${Config.base_url}servicesName/getall`,data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function Get_All_Services_Given(data) {
    try {
 
        const res = await axios.post(`${Config.base_url}groupservice/name`,data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function Get_All_Employee_Name(data) {
    try {
 
        const res = await axios.post(`${Config.base_url}employees/name/get`,data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function DELETE_GROUP_SERVICE(data) {
    try {
 
        const res = await axios.post(`${Config.base_url}groupServices/delete`,data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function GET_GROUP_DATA(data) {
    try {
 
        const res = await axios.post(`${Config.base_url}services/bygroupid1/get`,data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function EDIT_GROUP_SERVICE(data) {
    try {
 
        const res = await axios.post(`${Config.base_url}groupservice/edit`,data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

 





