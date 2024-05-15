import axios from "axios";

// import Files
import * as Config from "../../Utils/Config";


// LOGIN-USER
export async function GetSubStrategy(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}sub/strategy/getall`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;
    }
}

export async function GET_ALL_STRETGY_WITH_IMG(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/getall`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;
    }
}

export async function ADD_STRATEGY(data) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/add`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function Delete_Strategy(data) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/delete`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function EDIT_STRATEGY(data) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/edit`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}

export async function Get_Strategy_By_Id(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/get`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }


}



//SUBADMIN EMPLOYEE SECTION
export async function EmployeeData(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}employee/data`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function AddEmployeeBySub(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}add/employee/data`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function DeleteEmployee(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}Delete/employee`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function UpdateEmployee(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}employee/update`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function get_Employee_Id(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}employee/edit`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}

export async function get_Employee_Status(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}employee/statusUpdate`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function GetAllStrategyFor_Employee(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}get/strategy`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}
export async function GetAllServicesForEmployee(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}get/allgroupServices`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function StrategyPurchaseBySubadmin(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/order/create`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function strategyOrderUpdate(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}strategy/order/update`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}


export async function  starategyTradeCharge(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}sub/trade/charges`, data, {  
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }
}





