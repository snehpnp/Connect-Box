import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";




 //find/activity/category


 export async function  getalluserActivity(data){
    try{
        const res = await axios.post(`${Config.base_url}find/activity/category`, data,{
            data: {}
        })
        return await res?.data;
    }
    catch(err){
        return await err;
    }
  }



// find activity
export async function  findActivity(data){
    try{
        const res = await axios.post(`${Config.base_url}find/activity`, data,{
            data: {}
        })
        return await res?.data;
    }
    catch(err){
        return await err;
    }
  }


  // broker detail

  export async function  getbroker(data){
    try{
        const res = await axios.get(`${Config.base_url}broker/get`, data,{
            data: {}
        })
        return await res?.data;
    }
    catch(err){
        return await err;
    }
  }


