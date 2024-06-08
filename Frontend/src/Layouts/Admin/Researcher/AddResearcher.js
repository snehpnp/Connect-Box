import React,{useEffect, useState} from 'react';
import AddForm from '../../../Components/ExtraComponents/forms/AddForm'
import { useFormik } from 'formik'
import { Add_Researcher } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'





const AddResearcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem('user_details')).user_id
  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      PhoneNo: '',
      email: '',
      password: '',
      strategy_percentage: '',
      // prifix_key: '',
      Balance: '',
    },
    validate: (values) => {
      let errors = {}
      if (!values.fullName) {
        errors.fullName = "Please Enter Full Name"
      }
      if (!values.userName) {
        errors.userName = "Please Enter User name"
      }
      if (!values.email) {
        errors.email = "Please Enter Email Address";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please Enter a valid Email address.";
      }
      if (!values.PhoneNo) {
        errors.PhoneNo = "Please Enter Phone Number";
      } else if (!/^\d{10}$/.test(values.PhoneNo)) {
        errors.PhoneNo = "Please enter a valid 10-digit phone number.";
      }
      if (!values.password) {
        errors.password = "Please Enter Password"
      }
      if (!values.strategy_percentage) {
        errors.strategy_percentage = "Please Enter Revenue Percentage"
      }
      // if (!values.prifix_key) {
      //   errors.prifix_key = "Please Enter Unique Prifx key"
      // }
      if (!values.Balance) {
        errors.Balance = "Please Enter Balance"
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const data = {
          FullName: values.fullName,
          UserName: values.userName,
          Email: values.email,
          PhoneNo: values.PhoneNo,
          Password: values.password,
          Strategy_percentage_to_researcher: values.strategy_percentage,
          // prifix_key: values.prifix_key,
          user_id: user_id,
          Balance: values.Balance,
        };
        const response = await dispatch(Add_Researcher(data)).unwrap();

        if (response.status) {
          Swal.fire({
            title: "Added Successfully",
            text: "New Researcher Added Successfully",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            didClose: () => {
              navigate("/admin/allresearch");
            }
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.msg,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,

          });

        }

      } catch (error) {
        console.log("Error in Adding Researcher", error);
      }
    }
  });



  const fields = [
 
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "userName",
      label: "User Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
      autoComplete:"off"
    },

    {
      name: "email",
      label: "Email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
      autoComplete: "new-email",
    },
    {
      name: "PhoneNo",
      label: "Phone Number ",
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
    // {
    //   name: "prifix_key",
    //   label: "Prefix Key",
    //   type: "text2",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    // },
    {
      name: "Balance",
      label: "Balance",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "strategy_percentage",
      label: "Revenue Percentage",
      type: "text4",
      label_size: 12,
      col_size: 6,
      disable: false,
    },

  ]

 


  return (
    <>
      <AddForm
        fields={fields}
        page_title="Add New Researcher"
        btn_name="Add Researcher"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/admin/allresearch"}
        

      />

    </>
  )
}

export default AddResearcher