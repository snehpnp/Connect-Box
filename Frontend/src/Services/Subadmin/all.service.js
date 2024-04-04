import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";

//getServices data 
export async function GET_ALL_SERVICS(data) {
    try {
        const res = await axios.post(`${Config.base_url}AllService/get`, data, {  
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