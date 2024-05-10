import React,{useEffect, useState} from 'react';
import AddForm from '../../../Components/ExtraComponents/forms/AddForm'
import { useFormik } from 'formik'
import { Update_Researcher } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams , useLocation} from 'react-router-dom'
import Swal from 'sweetalert2'





const AddResearcher = () => {
  
  const location = useLocation();
  const { rowData } = location.state;
 
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
        errors.fullName = "Please Enter fullName"
      }
      if (!values.userName) {
        errors.userName = "Please Enter userName"
      }
      if (!values.email) {
        errors.email = "Please Enter Email Address";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
      }
      if (!values.PhoneNo) {
        errors.PhoneNo = "Please Enter Phone Number";
      } else if (!/^\d{10}$/.test(values.PhoneNo)) {
        errors.PhoneNo = "Please enter a valid 10-digit phone number.";
      }
      // if (!values.password) {
      //   errors.password = "Please Enter password"
      // }
      if (!values.strategy_percentage) {
        errors.strategy_percentage = "Please Enter strategy percentage"
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
          id: rowData && rowData._id,
          FullName: values.fullName,
          
           
          Password: values.password,
          Strategy_percentage_to_researcher: values.strategy_percentage,
          // prifix_key: values.prifix_key,
           
          Balance: values.Balance,
        };
        const response = await dispatch(Update_Researcher(data)).unwrap();

        if (response.status) {
          Swal.fire({
            title: "Update Successfully",
            text: response.msg,
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
      disable: true,
    },

    {
      name: "email",
      label: "Email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
    },
    {
      name: "PhoneNo",
      label: "Phone Number ",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: true,
    },
    // {
    //   name: "password",
    //   label: "Password",
    //   type: "password",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: true,
    // },
    // {
    //   name: "prifix_key",
    //   label: "Prefix Key",
    //   type: "text2",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    // },
    // {
    //   name: "Balance",
    //   label: "Balance",
    //   type: "text3",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    // },
    {
      name: "strategy_percentage",
      label: "Revenue Percentage",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
    },

  ]


  useEffect(()=>{
  formik.setFieldValue("userName",rowData !== undefined && rowData.UserName);
  formik.setFieldValue("fullName",rowData !== undefined && rowData.FullName);
  formik.setFieldValue("email",rowData !== undefined && rowData.Email);
  formik.setFieldValue("PhoneNo",rowData !== undefined && rowData.PhoneNo);
  formik.setFieldValue("strategy_percentage",rowData !== undefined && rowData.Strategy_percentage_to_researcher);
  formik.setFieldValue("Balance",rowData !== undefined && rowData.Balance);
  
 

  },[])

  return (
    <>
      <AddForm
        fields={fields}
        page_title="Edit Researcher"
        btn_name="Update"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/admin/allresearch"}
        

      />

    </>
  )
}

export default AddResearcher