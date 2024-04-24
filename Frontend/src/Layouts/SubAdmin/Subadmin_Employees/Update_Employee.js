import { useFormik } from "formik";
import { useState, useEffect } from "react";
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Update_Employee,
  GetEmployeeByID,
} from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { useParams } from "react-router-dom";

const Edit_Employee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idData, setIdData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(GetEmployeeByID({ id })).unwrap();
        if (response.status) {
          toast.success("Data Retrieved Successfully");
          setIdData(response.data);
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error fetching user data");
      }
    };

    fetchData();
  }, [dispatch]);

  const fields = [
    {
      name: "fullName",
      label: "FullName",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      label_size: 12,
      col_size: 6,
      disable: false,
      placeholder: "Enter new password",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.fullName) {
        errors.fullName = "Full Name is required";
      }
      if (!values.username) {
        errors.username = "Username is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.phone) {
        errors.phone = "Phone is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        id: id,
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        Password: values.password,
        PhoneNo: values.phone,
      };
      if (values.password.trim() !== "") {
        req.Password = values.password;
      }

      try {
        const response = await dispatch(Update_Employee(req)).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Create Successful!",
            text: response.msg,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          }).then(() => {
            navigate("/subadmin/employees");
          });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    },
  });

  useEffect(() => {
    if (idData) {
      formik.setValues({
        fullName: idData.FullName || "",
        username: idData.UserName || "",
        email: idData.Email || "",
        password: idData.Password,
        phone: idData.PhoneNo || "",
      });
    }
  }, [idData]);

  return (
    <AddForm
      fields={fields.filter(
        (fld) => !fld.showWhen || fld.showWhen(formik.values)
      )}
      page_title="Update Employee"
      btn_name="Update"
      btn_name1="Cancel"
      btn_name1_route="/subadmin/employees"
      formik={formik}
    />
  );
};

export default Edit_Employee;
