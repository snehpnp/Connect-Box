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
 