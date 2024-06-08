import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function SIGN_IN_USER(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}login`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

// SIGNUP USER
export async function SIGN_UP_USER(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}signup`, data, {
            data: {},
        })

        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}





// FORGET PASSWORD
export async function FORGET_PASSWORD(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}ForgetPassword`, data, {
            // headers: header(token),
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return err
    }

}


// update Password 
export async function resetPassword(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}UpdatePassword`, data, {
            // headers: header(token),
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return err
    }

}



export async function PasswordChange(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}PasswordChanged`, data, {
           
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return err

    }

}


export async function LOG_OUT_USER(data,token) {
    try {
        const res = await axios.post(`${Config.base_url}logoutUser`, data, {
           
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return err

    }

}





