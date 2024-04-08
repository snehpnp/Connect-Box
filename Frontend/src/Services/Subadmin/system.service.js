import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GetInfo_Company(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}subadmin/company/getone`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function Edit_Company_info(data, token) {
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