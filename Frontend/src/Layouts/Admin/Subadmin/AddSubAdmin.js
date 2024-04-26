import React, { useState, useEffect } from "react";
import { AddSubadmin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import Swal from 'sweetalert2'

import { useFormik } from "formik";

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const Role = userDetails?.Role;
  const user_id = userDetails?.user_id;
  const user_token = userDetails?.token;
  const ProfileShow = 1;

  const [inputPerTrade, setInputPerTrade] = useState(false);
  const [inputPerStrategy, setInputPerStrategy] = useState(false);

  const handleSelectChange = (e) => {

    const selectedValue = e.target.value;
    formik.handleChange(e);
    if (selectedValue === "1") {
      setInputPerTrade(true);
      setInputPerStrategy(false);
    } else if (selectedValue === "2") {
      setInputPerTrade(false);
      setInputPerStrategy(true);
    } else {
      setInputPerTrade(false);
      setInputPerStrategy(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      profile_img: "",
      fullName: "",
      username: "",
      email: "",
      phone: "",
      balance: "",
      password: "",
      prifix_key: null,
      subadmin_servic_type: "0",
      strategy_Percentage: "0",
      Per_trade: "0",
      parent_id: null,
      parent_role: null,
    },
    validate: (values) => {
      let errors = {};
      if (!values.fullName) {
        errors.fullName = "Please Enter Full Name";
      }
      if (!values.username) {
        errors.username = "Please Enter Username";
      }
      if (!values.email) {
        errors.email = "Please Enter Email Address";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
      }

      if (!values.phone) {
        errors.phone = "Please Enter Phone Number";
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Please enter a valid 10-digit phone number.";
      }
      if (!values.balance) {
        errors.balance = "Please Enter Balance";
      }
      if (!values.password) {
        errors.password = "Please Enter Password";
      }
      if (!values.Per_trade) {
        errors.Per_trade = "Please Enter per trade value";

      } if (!values.strategy_Percentage) {
        errors.strategy_Percentage = "Please Enter strategy percentage value";
      }

      if (!values.prefix_key) {
        errors.prefix_key = "Please Enter Prefix Key";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        ProfileImg: values.profile_img,
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        PhoneNo: values.phone,
        Balance: values.balance,
        subadmin_service_type: values.subadmin_servic_type,
        strategy_Percentage: values.strategy_Percentage,
        Per_trade: values.Per_trade,
        prefix_key: values.prefix_key,
        password: values.password,
        parent_id: user_id || "65feb434ce02a722ac3b997d",
        parent_role: Role || "ADMIN",
      };



      setSubmitting(false);

      await dispatch(AddSubadmin(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            Swal.fire({
              title: "Subadmin Added!",
              text: "subadmin added successfully",
              icon: "success",
              timer: 1000,
              timerProgressBar: true,
            });
            setTimeout(() => {
              navigate("/admin/allsubadmin");
            }, 1000);
          }
          else {
            Swal.fire({
              title: "Error !",
              text: "subadmin add error",
              icon: "error",
              timer: 1000,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.log("error :", error)

        });
    },
  });

  const fields = [
    {
      name: "profile_img",
      label: "Profile Image",
      type: "file",
      label_size: 6,
      col_size: 12,
      disable: false,
    },
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
      name: "phone",
      label: "Phone Number",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "balance",
      label: "Balance",
      type: "text3",
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

      name: "prefix_key",
      label: "Prefix Key",
      type: "text2",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "subadmin_servic_type",
      label: "Subadmin Service Type",
      type: "select",
      options: [
        { label: "Per Trade", value: "1" },
        { label: "Per Strategy", value: "2" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
      onChange: handleSelectChange,
      value: formik.values["subadmin_servic_type"],
    },
    {
      name:
        formik.values.subadmin_servic_type === "1" ||
          formik.values.subadmin_servic_type === "2"
          ? formik.values.subadmin_servic_type === "1"
            ? "Per_trade"
            : "strategy_Percentage"
          : "",
      label:
        formik.values.subadmin_servic_type === "1" ||
          formik.values.subadmin_servic_type === "2"
          ? formik.values.subadmin_servic_type === "1"
            ? "Per Trade Value"
            : "% Per Strategy"
          : "",
      type: "text3",
      placeholder:
        formik.values.subadmin_servic_type === "1" ||
          formik.values.subadmin_servic_type === "2"
          ? formik.values.subadmin_servic_type === "1"
            ? "Please Enter Trade Value"
            : "Please enter % between 1 to 100"
          : "",
      showWhen: (values) =>
        values.subadmin_servic_type === "1" ||
        values.subadmin_servic_type === "2",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];



  return (
    <>
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        ProfileShow={formik.values.profile_img}
        page_title="Add New Subadmin"
        btn_name="Add Subadmin"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/admin/allsubadmin"}
      />
      <ToastButton />
    </>
  );
};

export default AddClient;
