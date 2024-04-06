import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GetSubStrategy(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}sub/strategy/getall`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }


}

export async function ADD_STRATEGY(data) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/add`, data, {  
            data: {},
        })
        console.log("res service :", res)
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function Delete_Strategy(data) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/delete`, data, {  
            data: {},
        })
        console.log("res service :", res)
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function EDIT_STRATEGY(data) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/edit`, data, {  
            data: {},
        })
        console.log("res service :", res)
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function Get_Strategy_By_Id(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/get`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }


}





