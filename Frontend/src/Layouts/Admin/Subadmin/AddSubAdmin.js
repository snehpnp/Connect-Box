import React from 'react';
import AddForm from '../../../Components/ExtraComponents/forms/AddForm';



import { useFormik } from 'formik';

import axios from "axios";

const AddClient = () => {
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const Role = userDetails?.Role;
  const user_id = userDetails?.user_id;
  const user_token = userDetails?.token;
  const ProfileShow = 1;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      balance: "",
      password: "",
      prifix_key: "",
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
      const payload = {
        ProfileImg: "",
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
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
      console.log("PAYLOAD", payload);
      setSubmitting(false);
      try {
        const response = await axios.post(
          "http://localhost:7000/subadmin/add",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Response from AddSubAdmin:", response.data);
      } catch (error) {
        console.error("Error adding subadmin:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
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

  console.log("Formik values:", formik.values);
  console.log("Formik errors:", formik.errors);

  return (
    <>

      <AddForm
        ProfileShow={ProfileShow}
        fields={fields}
        page_title="Add Subadmin"
        btn_name="Add Subadmin"
        btn_name1="Cancel"
        formik={formik}

      />
    </>

  );
};
export default AddClient;
