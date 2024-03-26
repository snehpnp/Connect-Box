import React from 'react';
import DynamicForm from '../../../Components/ExtraComponents/forms/FormField';

import { useFormik } from 'formik';

const AddClient = () => {
  
const userDetails = JSON.parse(localStorage.getItem("user_details"));
// Check if userDetails exists and has Role property
const Role = userDetails?.Role;
const user_id = userDetails?.user_id;
const user_token = userDetails?.token;

console.log("roles 11:-", Role);


  const fields = [
    { name: 'fullName', label: 'FullName', type: 'text', label_size: 6, col_size: 6, disable: false },
    { name: 'username', label: 'Username', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'email', label: 'Email', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'phone', label: 'Phone No', type: 'number', label_size: 12, col_size: 6, disable: false },
    { name: 'balance', label: 'Balance', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'password', label: 'password', type: 'password', label_size: 12, col_size: 6, disable: false },
    { name: 'prifix_key', label: 'Prifix Key', type: 'text', label_size: 12, col_size: 6, disable: false },
    {
      name: 'subadmin_servic_type', label: 'Subadmin Servic Type', type: 'select',
      options: [
        { label: 'Per Trade', value: '0' },
        { label: 'Per Strategy', value: '1' },
      ]
      , label_size: 12, col_size: 6, disable: false
    },

  ];

  const ProfileShow = 1;


  const formik = useFormik({
    initialValues: {
      fullName: null,
      username: null,
      email: null,
      phone: null,
      balance: null,
      password: null,
      prifix_key: null,
      subadmin_servic_type: '0',
      strategy_Percentage: '0',
      Per_trade: '0',
      parent_id: null,
      parent_role: null,

    },
    validate: (values) => {

      const errors = {};
      // if (!values.username && formik.touched.username) {
      //   errors.username = valid_err.USERNAME_ERROR;
      // }
      // if (!values.fullName && formik.touched.fullName) {
      //   errors.fullName = valid_err.FULLNAME_ERROR;
      // }
      // else if (!isValidName(values.fullName) && formik.touched.fullName) {
      //   errors.fullName = valid_err.INVALID_ERROR;
      // }
      // if (!values.mobile && formik.touched.mobile) {
      //   errors.mobile = valid_err.CONTACT_ERROR;
      // } else if (!isValidContact(values.mobile) && formik.touched.mobile) {
      //   errors.mobile = valid_err.INVALID_CONTACT_ERROR;
      // }
      // if (!values.email && formik.touched.email) {
      //   errors.email = valid_err.EMPTY_EMAIL_ERROR;
      // } else if (!isValidEmail(values.email) && formik.touched.email) {
      //   errors.email = valid_err.INVALID_EMAIL_ERROR;
      // }




      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        "FullName": values.fullName,
        "UserName": values.username,
        "Email": values.email,
        "PhoneNo": values.mobile,
        "prifix_key": values.prifix_key,
        "password": values.password,
        "balance": values.balance,
        "subadmin_servic_type": values.subadmin_servic_type,
        "strategy_Percentage": values.strategy_Percentage,
        "Per_trade": values.Per_trade,
        "parent_id": values.parent_id == null || values.parent_id === "" ? user_id : values.parent_id,
        "parent_role": values.parent_id == null || values.parent_id === "" ? "ADMIN" : "SUBADMIN",
  
      }

      console.log("req",req)


      // await dispatch(Add_User({ req: req, token: user_token })).unwrap().then((response) => {
      //   if (response.status === 409) {
      //     toast.error(response.data.msg);
      //   }
      //   else if (response.status) {
      //     toast.success(response.msg);
      //     setTimeout(() => {
      //       navigate("/admin/allclients")
      //     }, 1000);
      //   }
      //   else if (!response.status) {
      //     toast.error(response.msg);
      //   }
      // })
    }
  });



  return (
    <>

      <DynamicForm
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
