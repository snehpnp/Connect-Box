import axios from "axios";
import * as Config from "../../Utils/Config";
import { header } from "../../Utils/ApiHeader";



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

 // CLIENT ALL SERVICE
export async function BROKER_RESPONSE(data,token){
    try{
        const res = await axios.post(`${Config.base_url}broker/response`, data, {
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
            data: {},
            headers: header(token),

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



 export async function  GET_ALL_STRATEGY(data){
    try{
        const res= await axios.post(`${Config.base_url}get/allStrategy`, data, {
            data: {}
        })
        return await res?.data
    }
    catch(err){
        
        return await err
    }
 }


 /// update a status
 export async function  updatestatus(data){
    try{
        const res= await axios.post(`${Config.base_url}statusUpadate`, data, {
            data: {}
        })
        return await res?.data
    }
    catch(err){
        
        return await err
    }
 }
 
 // trade cahrge for user


 export async function  UserTradeCharge(data){
    try{
        const res= await axios.post(`${Config.base_url}user/trade/charges`, data, {
            data: {}
        })
        return await res?.data
    }
    catch(err){
        
        return await err
    }
 }
 




//  USER STRATEGY PURCHASE ORDER CREATE API
export async function  OrderCreateStg(data){
    try{
        const res= await axios.post(`${Config.base_url}user/strategy/order/create`, data, {
            data: {}
        })
        return await res?.data
    }
    catch(err){
        
        return await err
    }
 }



 //  USER STRATEGY PURCHASE ORDER UPDATE  API
export async function  OrderUpdateStg(data){
    try{
        const res= await axios.post(`${Config.base_url}user/strategy/order/update`, data, {
            data: {}
        })
        return await res?.data
    }
    catch(err){
        
        return await err
    }
 }