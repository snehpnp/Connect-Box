import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";
import { header } from "../../Utils/ApiHeader";


// LOGIN-USER
export async function GetCompanyInfo(data, token) {
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


export async function EditCompanyInfo(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}emailinfo/edit`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}


export async function ProfileData(data, token) {

    try {
        const res = await axios.post(`${Config.base_url}subadmin/get`, data, {  
            data: {},
            headers: header(token),
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}


//help user subadmin post 
export async function Subadminhelp(data,token){
    try {

        const res = await axios.post(`${Config.base_url}subadminhelpmessage`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}


//get help for table of subadmin 
export async function getSubadminhelp(data,token){
    try {

        const res = await axios.get(`${Config.base_url}getsubadminhelpmessage`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}


//post help for user data
export async function  postuserhelpdata(data,token){
    try {

        const res = await axios.post(`${Config.base_url}userhelpmessage`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}



// get user help data
export async function  gethelpdata(data,token){
    try {

        const res = await axios.get(`${Config.base_url}getuserhelpdata`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}


// delete user help data 
export async function  deleteuserhelpdata(data,token){
    try {

        const res = await axios.post(`${Config.base_url}getuserdelete`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}



// delete subadmin help data  
export async function  deletesubadmindata(data,token){
    try {

        const res = await axios.post(`${Config.base_url}getsubadmindelete`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}


// api for prefix compare to 
export async function  ComparePrefix_key(data,token){
    try {

        const res = await axios.post(`${Config.base_url}userdataByPrefix`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}

// get Researcher table


export async function  Researcherdetail(data,token){
    try {

        const res = await axios.post(`${Config.base_url}getResearcher`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}


// get employree table

export async function  getEmployeetable(data,token){
    try {

        const res = await axios.post(`${Config.base_url}getEmployee`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}



//get data employee for profile ifo

export async function  getEmployeeBYid(data,token){
    try {

        const res = await axios.post(`${Config.base_url}getEmployeebyid`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}

export async function  GET_PARENT_NAME(data,token){
    try {

        const res = await axios.post(`${Config.base_url}parentname/get`,data,{
            data:{},
            
        })
   
           return await res?.data;
        
    } catch (err) {
        return await err;
    }
}