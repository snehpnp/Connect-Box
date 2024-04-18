import axios from "axios";

import * as Config from "../../Utils/Config";


// GET OPTION SYMBOLS
export async function GET_OPTION_SYMBOLS(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}get/option_symbols`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;
    }

}

export async function GET_OPTION_ALL_ROUND_TOKEN(data, token) {
  
    try {
        const res = await axios.post(`${Config.base_url}get/all_round_token`, data, {
            data: {},
        })
        return await res?.data
    }
    catch (err) {
        return await err;
    }
}


export async function GET_SYMBOL_EXPRIY(data) {
    try {
        const res = await axios.post(`${Config.base_url}get/option_symbol_expiry`, data, {
            data: {}
        })
        return await res?.data

    }
    catch (err) {
        return await err;
    }
}

export async function GET_COMPANY_INFOS(data) {
    try {
        const res = await axios.get(`${Config.base_url}company/get`, data, {
            data: {}
        })
        return await res?.data

    }
    catch (err) {
        return await err
    }
}


export async function GET_ALL_STRETGY_NAME_FOR_CLIENT(data) {
    try {
        const res = await axios.post(`${Config.base_url}sub/strategy/getall`, data, {
            data: {}
        })
        return await res?.data

    }
    catch (err) {
        return await err;
    }
}
