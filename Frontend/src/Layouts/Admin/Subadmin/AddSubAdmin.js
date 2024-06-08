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
      fullName: "",
      username: "",
      email: "",
      phone: "",
      balance: "",
      password: "",
      // prefix_key: null,
      subadmin_servic_type: "0",
      strategy_Percentage: "0",
      Per_trade: "0",
      parent_id: null,
      parent_role: null,
      // prefix_key:''
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

      if (values.subadmin_servic_type==0) {
        errors.subadmin_servic_type = "Please Select Subadmin Service Type";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        PhoneNo: values.phone,
        Balance: values.balance,
        subadmin_service_type: values.subadmin_servic_type,
        strategy_Percentage: values.strategy_Percentage,
        Per_trade: values.Per_trade,
        // prifix_key: values.prefix_key,
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
              text:"subadmin added successfully",
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
              text: response.msg || "subadmin add error",
              icon: "error",
              timer: 1000,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.log("Error :", error)

        });
    },
  });

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
    },
    {
      name: "Per_trade",
      label: "Per Trade Value",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
      showWhen: (value)=> formik.values.subadmin_servic_type==1
    },
    {
      name: "strategy_Percentage",
      label: "% Per Strategy",
      type: "text5",
      label_size: 12,
      col_size: 6,
      disable: false,
      showWhen: (value)=> formik.values.subadmin_servic_type==2
    },

    
  ];




  return (
    <>
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
    
        page_title="Add New Sub-Admin"
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
