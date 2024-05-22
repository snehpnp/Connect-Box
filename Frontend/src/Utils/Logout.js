import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LogOut } from '../ReduxStore/Slice/Auth/AuthSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async (user_id, ip) => {

        const data = { userId: user_id, Device: "WEB", system_ip: ip };

        try {
            const response = await dispatch(LogOut(data)).unwrap();

            if (response.status) {
                localStorage.clear()
                navigate("/login");
               
                Swal.fire({
                    title: "Logout Successful!",
                    icon: "success",
                    position: "top-end",
                    text: response.msg,
                    showConfirmButton: false,
                    timer: 700,
                    timerProgressBar: true
                });

              

            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.msg,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                });
            }
        } catch (error) {
            console.log("Error in logout user", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred during logout.",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            });
        }
    };

    return logout;
};

export default useLogout;
