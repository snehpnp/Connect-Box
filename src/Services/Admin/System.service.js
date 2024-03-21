import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GetCompanyInfo(data, token) {
    try {
        const res = await axios.get(`${Config.base_url}get/company`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}
