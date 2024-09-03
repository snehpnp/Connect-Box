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
export async function ADD_RESEARCHER_STRATEGY(data){
    try{
        const res= await axios.post(`${Config.base_url}researcher/addstrategy`, data,{
            data:{}
        })
        return await res?.data
    }
    catch(err){
        return await err;
    }
}

export async function EDIT_RESEARCHER_STRATEGY(data){
    try{
        const res= await axios.post(`${Config.base_url}researcher/editstrategy`, data,{
            data:{}
        })
        return await res?.data
    }
    catch(err){
        return await err;
    }
}

export async function GET_ONE_RESEARCHER_STRATEGY(data){
    try{
        const res= await axios.post(`${Config.base_url}researcher/getonestrategy`, data,{
            data:{}
        })
        return await res?.data
    }
    catch(err){
        return await err;
    }
}

export async function GET_ALL_RESEARCHER_STRATEGY(data){
    try{
        const res= await axios.post(`${Config.base_url}researcher/getll`, data, {
            data:{}
        })
        return await res?.data
    }
    catch(err){
        return await err;
    }
}
export async function UPDATE_RESEARCHER(data){
    try{
        const res = await axios.post(`${Config.base_url}researcher/edit` , data , {
            data: {}
        })
        return res?.data
    }
    catch(err){
        return await err
    }
}

export async function STRATEGY_TRANSACTION_DETAILS(data){
    try{
        const res = await axios.post(`${Config.base_url}strategy/order/get` , data , {
            data: {}
        })
        return res?.data
    }
    catch(err){
        return await err
    }
}

export async function Delete_Strategy(data){
    try{
        const res = await axios.post(`${Config.base_url}researcher/strategy/delete` , data , {
            data: {}
        })
        return res?.data
    }
    catch(err){
        return await err
    }
}


export async function STRATEGY_USERS(data){
    try{
        const res = await axios.post(`${Config.base_url}researcher/strategy/users` , data , {
            data: {}
        })
        return res?.data
    }
    catch(err){
        return await err
    }
}



export async function COLLA_NAME(data){
    try{
        const res = await axios.post(`${Config.base_url}researcher/colla/name` , data , {
            data: {}
        })
        return res?.data
    }
    catch(err){
        return await err
    }
}



export async function COLLA_ADD_BALANCE(data){
    try{
        const res = await axios.post(`${Config.base_url}colla/balance/add` , data , {
            data: {}
        })
        return res?.data
    }
    catch(err){
        return await err
    }
}



export async function updateFreePlan(data){
    try{
        const res = await axios.post(`${Config.base_url}strategy/order/freePlan` , data , {
            data: {}
        })
        return res?.data
    }
    catch(err){
        return await err
    }
}