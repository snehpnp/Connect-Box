// src/hooks/useGetCompany.js

import { useDispatch } from 'react-redux';
import { GetCompany_info } from '../ReduxStore/Slice/Admin/System';

const useGetCompany = () => {
    const dispatch = useDispatch();

    const getCompany = async () => {
        try {
            const response = await dispatch(GetCompany_info()).unwrap();
            if (response.status) {
                return response.data;
            } else {
                console.error("Failed to fetch company info", response);
                return null;
            }
        } catch (error) {
            console.error("An error occurred while fetching company info", error);
            return null;
        }
    };

    return getCompany;
};



export default useGetCompany;
