import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LogOut } from '../ReduxStore/Slice/Auth/AuthSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async (user_id, ip) => {


        setTimeout(async () => {
            // Sneh jaiswal

            const data = { userId: user_id, Device: "WEB", system_ip: ip };

            try {
                const response = await dispatch(LogOut(data)).unwrap();

                if (response.status) {

                    Swal.fire({
                        title: "Logout Successful!",
                        icon: "success",
                        position: "top-end",
                        text: response.msg,
                        showConfirmButton: false,
                        timer: 700,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        // SNEH JAISWAL
                        localStorage.removeItem("user_details");
                        localStorage.removeItem("user_role");
                        navigate("/login");
                        window.location.reload()
                    }, 700);




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
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred during logout.",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                });
            }

        }, 3000);

    };

    return logout;
};

export default useLogout;
