import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";

// Add Researcher

export async function GET_PERMISSION(data) {
    try {
        const res = await axios.post(`${Config.base_url}permission/getall`, data, {
            data: {}
        })
        return await res?.data
    }
    catch (err) {
        console.log("err", err);
        return await err;

    }
}

 