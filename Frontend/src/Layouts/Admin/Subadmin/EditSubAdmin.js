import React, { useState, useEffect } from "react";
import EditForm from "../../../Components/ExtraComponents/forms/AddForm";
import { useFormik } from "formik";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import {editSubadmin,getSubAdminById} from "../../../ReduxStore/Slice/Admin/Subadmins";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";



const EditClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const { id } = useParams();


  const GetSubadminDataById = async () => {
    await dispatch(getSubAdminById({ id: id }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setRowData(response.data)
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }



  const formik = useFormik({
    initialValues: {
      id: id,
      username: "",
      fullName: "",
      email: "",
      mobile: "",
      prifix_key: "",
      subadmin_servic_type: "",
      strategy_Percentage: "",
      Per_trade: "",
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
      if (!values.Per_trade ) {
        errors.Per_trade = "Please Enter per trade value";

      } if (!values.strategy_Percentage) {
        errors.strategy_Percentage = "Please Enter strategy percentage value";
      }
    
      if (!values.prifix_key || values.prifix_key=='') {
        errors.prifix_key = "Prefix key is required";
      }  
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        id: id,
        UserName: values.username,
        FullName: values.fullName,
        Email: values.email,
        PhoneNo: values.mobile,
        prifix_key: values.prifix_key,
        subadmin_service_type: values.subadmin_servic_type,
        strategy_Percentage: values.strategy_Percentage,
        Per_trade: values.Per_trade,
      };

      await dispatch(editSubadmin(req))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.msg);
            setTimeout(() => {
              navigate("/admin/allsubadmin");
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
      name: "username",
      label: "Username",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
    },
    {
      name: "fullName",
      label: "FullName",
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
      disable: true,
    },
    {
      name: "mobile",
      label: "Mobile",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
    },
    {
      name: "prifix_key",
      label: "Prifix Key",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
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
      disable: true,
 
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
            ? "Trade Value"
            : "Strategies %"
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


  useEffect(() => {
    formik.setFieldValue("username", rowData !== undefined && rowData[0].UserName);
    formik.setFieldValue("fullName", rowData !== undefined && rowData[0].FullName);
    formik.setFieldValue("email", rowData !== undefined && rowData[0].Email);
    formik.setFieldValue("mobile", rowData !== undefined && rowData[0].PhoneNo);
    formik.setFieldValue("Per_trade", rowData !== undefined && rowData[0].Per_trade);
    formik.setFieldValue("strategy_Percentage", rowData !== undefined && rowData[0].strategy_Percentage);
    formik.setFieldValue("subadmin_servic_type", rowData !== undefined && rowData[0].subadmin_servic_type == 1 ? "1" : "2");
    formik.setFieldValue("prifix_key", rowData !== undefined && rowData[0].prifix_key);



  }, [rowData]);



  useEffect(() => {
    GetSubadminDataById()
  }, []);




  return (
    <>
      <EditForm
        page_title="Update Subadmin Details"
        formik={formik}
        btn_name="Update"
        fromDate={formik.values.fromDate}
        toDate={formik.values.todate}
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        btn_name1="Cancel"
        btn_name1_route={"/admin/allsubadmin"}
      />
      <ToastButton />
    </>
  );
};
export default EditClient;



