
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


// // add admin and update 
// export async function addadminandupdate(data) {
//     try {
//         const res = await axios.post(`${Config.base_url}addAdminandupdate`, data, {  
//             data: {},
//         })
//         return await res?.data;
//     }
//     catch (err) {
//         return await err;

//     }
// }