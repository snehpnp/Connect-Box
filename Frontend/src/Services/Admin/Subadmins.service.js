import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GetAllSubAdmins(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}subadmin/getall`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}
