import axios from "axios";
import * as Config from "../../Utils/Config";


// CLIENT ALL SERVICE
 export async function GET_CLIENT_ALL_SERVICE(data,token){
    try{
        const res = await axios.post(`${Config.base_url}getall/user/clientServices`, data, {
            data: {}
        })
        return await res?.data

    }
    catch(err){
        return await err

    }
 } 
 
// CLIENT ALL SERVICE
export async function UPDATE_CLIENT_SERVICE(data,token){
    try{
        const res = await axios.post(`${Config.base_url}update/clientServices`, data, {
            data: {}
        })
        return await res?.data

    }
    catch(err){
        return await err

    }
 } 
 



 export async function GET_USER_DASHBOARD(data,token){
    try{
        const res = await axios.post(`${Config.base_url}user/dashboard`, data, {
            data: {}
        })
        return await res?.data

    }
    catch(err){
        return await err

    }
 } 

 export async function GET_ALL_SUBADMIN_STRATEGY(data){
    try{
        const res= await axios.post(`${Config.base_url}getall/strategy`, data, {
            data: {}
        })
        return await res?.data
    }
    catch(err){
        
        return await err
    }
 }
 