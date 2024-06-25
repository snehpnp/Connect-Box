import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GetSubadmminCompanyInfo(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}subadmin/company/getall`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}


export async function RechargeDetailsGet(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}recharge/get`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

    
}

export async function RechargeDetailsGetById(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}recharge/id/get`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

    
}


export async function SubadminDetails(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}subadmin/company/edit`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

    
}



