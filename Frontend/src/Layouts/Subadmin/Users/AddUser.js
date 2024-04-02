import React, { useState, useEffect } from "react";
import { AddSubadmin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import AddForm from '../../../Components/ExtraComponents/forms/AddForm';
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast';


import { useFormik } from 'formik';

import axios from "axios";

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const Role = userDetails?.Role;
  const user_id = userDetails?.user_id;
  const user_token = userDetails?.token;
  const ProfileShow = 1;


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
      name: "phone",
      label: "Phone No",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "balance",
      label: "Balance",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "password",
      label: "password",
      type: "password",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "prifix_key",
      label: "Prifix Key",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "license_type",
      label: "Lincense Type",
      type: "select",
      options: [
        { label: "Demo", value: "0" },
        { label: "2 Day Live", value: "1" },
        { label: "Live", value: "2" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'tomonth',
      label: 'To Month',
      type: 'text',
      showWhen: values => values.licence === '2'
      , label_size: 12, col_size: 6, disable: false, isSelected: true
    },
    {
      name: "subadmin_servic_type",
      label: "Subadmin Servic Type",
      type: "select",
      options: [
        { label: "Per Trade", value: "1" },
        { label: "Per Strategy", value: "2" },
      ],
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
      phone: "",
      balance: "",
      password: "",
      tomonth: null,
      prifix_key: "",
      licence:null,
      subadmin_servic_type: "0",
      strategy_Percentage: "0",
      Per_trade: "0",
      parent_id: null,
      parent_role: null,
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
        errors.email = "Please enter your email address.";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
      }

      if (!values.phone) {
        errors.phone = "Please enter your phone number.";
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Please enter a valid 10-digit phone number.";
      }
      if (!values.balance) {
        errors.balance = "Balance is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.prifix_key) {
        errors.prifix_key = "Prefix key is required";
      } else if (values.prifix_key.length !== 3) {
        errors.prifix_key = "Key should be exactly 3 characters/number/both";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {

      const data = {
        ProfileImg: "",
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        licence: values.tomonth,
        PhoneNo: values.phone,
        Balance: values.balance,
        subadmin_service_type: values.subadmin_servic_type,
        strategy_Percentage: values.strategy_Percentage,
        Per_trade: values.Per_trade,
        prifix_key: values.prifix_key,
        password: values.password,
        parent_id: user_id || "65feb434ce02a722ac3b997d",
        parent_role: Role || "ADMIN",
      };

      setSubmitting(false);


      await dispatch(AddSubadmin(data))
        .unwrap()
        .then(async (response) => {


          if (response.status) {
            toast.success(response.msg);
            setTimeout(() => {
              navigate("/admin/allsubadmin")
            }, 1000);

          } else {
            toast.error(response.msg);
          }

        })
        .catch((error) => {
          console.log("Error", error);
        });

    },
  });


  return (
    <>

      <AddForm
        ProfileShow={ProfileShow}
        // fields={fields}
        fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))}
        page_title="Add User"
        btn_name="Add User"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={'/subadmin/users'}

      />
      <ToastButton />
    </>

  );
};
export default AddClient;
