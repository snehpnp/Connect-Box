import React from 'react'
import AddForm from '../../../Components/ExtraComponents/forms/AddForm'
import { useFormik } from 'formik'

const AddResearcher = () => {

  const formik = useFormik({
    initialValues: {
      fullName : '',
      userName : '',
      PhoneNo : '',
      email : '',
      password : '',
      strategy_percentage: '',
      prifix_key :''
    },
    validate: (value)=>{
      let errors={}
      if(!value.fullName){
        errors.fullName="Please Enter fullName"
      }
      if(!value.userName){
        errors.userName="Please Enter userName"
      }
      if(!value.PhoneNo){
        errors.PhoneNo="Please Enter Phone Number"
      }
      if(!value.email){
        errors.email="Please Enter email"
      }
      if(!value.password){
        errors.password="Please Enter password"
      }
      if(!value.strategy_percentage){
        errors.strategy_percentage="Please Enter strategy percentage"
      }
      if(!value.prifix_key){
        errors.prifix_key="Please Enter Unique Prifx key"
      }
      

      return errors

    },
    onSubmit: async(value)=>{
      const data={
        FullName : value.fullName,
        UserName : value.userName,
        Email : value.email,
        PhoneNo : value.PhoneNo,
        Password : value.password,
        Strategy_percentage_to_researcher : value.strategy_percentage,
        prifix_key : value.prifix_key
      }
      console.log("data :", data)

    }

  })

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
    {
      name: "prifix_key",
      label: "Prifix key",
      type: "text2",
      label_size: 12,
      col_size: 6,
      disable: false,
    }, 
    {
      name: "strategy_percentage",
      label: "Strategy Percentage",
      type: "text3",
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