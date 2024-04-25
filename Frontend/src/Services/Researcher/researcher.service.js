import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";

// Add Researcher

export async function ADD_RESEARCHER(data) {
    try {
        const res = await axios.post(`${Config.base_url}researcher/add`, data, {
            data: {}
        })
        return await res?.data
    }
    catch (err) {
        console.log("err", err);
        return await err;

    }
}

export async function GET_ALL_RESEARCHER(data) {
    try {
        const res = await axios.post(`${Config.base_url}researcher/getall`, data, {
            data: {}
        })
        return await res?.data
    }
    catch (error) {
        return await error
    }
}

export async function UPDATE_BALANCE(data) {
    try {
        const res = await axios.post(`${Config.base_url}researcher/updatebalance`, data, {
            data: {}
        })
        return await res?.data;
    }
    catch (err) {
        return await err
    }
}

export async function DELETE_RESEARCHER(data){
    try{
        const res= await axios.post(`${Config.base_url}researcher/delete`, data,{
            data:{}
        })
        return await res?.data
    }
    catch(err){
        return await err;
    }
}