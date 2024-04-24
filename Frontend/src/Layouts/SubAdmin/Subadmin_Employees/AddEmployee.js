import { useFormik } from "formik";
import { useState, useEffect } from "react";
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Add_Employee } from "../../../ReduxStore/Slice/Subadmin/Strategy";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const prfix = JSON.parse(localStorage.getItem("user_details")).prifix_key;
  const Role = JSON.parse(localStorage.getItem("user_details")).Role;

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
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
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.phone) {
        errors.phone = "Phone is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        password: values.password,
        PhoneNo: values.phone,
        parent_id: user_id,
        parent_role: Role || "SUBADMIN",
        prifix_key: prfix,
      };

      try {
        const response = await dispatch(Add_Employee(req)).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Create Successful!",
            text: response.msg,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          }).then(() => {
            navigate("/subadmin/employees");
          });;
        }
      } catch (error) {
        console.log("Error:", error);
      }
    },
  });

  return (
    <AddForm
      fields={fields.filter(
        (fld) => !fld.showWhen || fld.showWhen(formik.values)
      )}
      page_title="Add Employee"
      btn_name="Add"
      btn_name1="Cancel"
      btn_name1_route="/subadmin/employees"
      formik={formik}
    />
  );
};

export default AddEmployee;
