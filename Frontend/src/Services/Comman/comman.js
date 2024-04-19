import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GetProfile(data, token) {
    try {
        const res = await axios.get(`${Config.base_url}company/get`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}


export async function GetUserInfo(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}get/userinfo`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function TRADING_OFF_BTN(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}tradingoff`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}


   ///  profile 


export async function ProfileData(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}ProfileImagedata`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}
