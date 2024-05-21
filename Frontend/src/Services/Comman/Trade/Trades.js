import axios from "axios";

// import Files
import * as Config from "../../../Utils/Config";
import { header } from "../../../Utils/ApiHeader";



//Orders From SubAdmin
export async function getOrders_data(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}orders/data`, data, {
            data: {},
            headers: header(token),

        })
        return await res?.data;
    }
    catch (err) {
        return await err;
    }

}



//Trade Orders From SubAdmin
export async function getTrade_data(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}trade/data`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;
    }
}


//Trade Orders From SubAdmin
export async function UpdateTrade(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}update/trade`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;
    }
}


//Trade HISTORY Orders From SubAdmin
export async function Tradehistory_data(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}tradehistory/data`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }


}





//Trade HISTORY Orders From SubAdmin
export async function UserTradehistory_data(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}user/tradehistory`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }


}