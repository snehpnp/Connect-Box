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

 





