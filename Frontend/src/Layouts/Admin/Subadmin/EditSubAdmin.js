import React, { useState, useEffect } from "react";
import EditForm from "../../../Components/ExtraComponents/forms/AddForm";
import { useFormik } from "formik";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import {
  editSubadmin,
  getSubAdminById,
} from "../../../ReduxStore/Slice/Admin/Subadmins";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'


const EditClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const { id } = useParams();



  const GetSubadminDataById = async () => {
    
    await dispatch(getSubAdminById({ id:id }))
       
      .unwrap()
      .then(async (response) => {
        if (response.status) {
        
          setRowData(response.data);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

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
      const editingContext = formik.initialValues.editingContext;
      if (editingContext === "strategy_Percentage") {
        if (!values.strategy_Percentage) {
          errors.strategy_Percentage = "strategy_Percentage is required";
        }
      } else if (editingContext === "Per_trade") {
        if (!values.Per_trade) {
          errors.Per_trade = "Per_trade is required";
        }
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
             
          } else {
            Swal.fire({
              title: "Subadmin Added!",
              text: response.msg,
              icon: "error",
              timer: 1000,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.log("Error", error);
          
        });
    },
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
      name: "username",
      label: "Username",
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
      name: "mobile",
      label: "Phone Number",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
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
 

    formik.setFieldValue(
      "username",
      rowData !== undefined && rowData[0].UserName
    );
    formik.setFieldValue(
      "fullName",
      rowData !== undefined && rowData[0].FullName
    );
    formik.setFieldValue("email", rowData !== undefined && rowData[0].Email);
    formik.setFieldValue("mobile", rowData !== undefined && rowData[0].PhoneNo);
    formik.setFieldValue(
      "Per_trade",
      rowData !== undefined && rowData[0].Per_trade
    );
    formik.setFieldValue(
      "strategy_Percentage",
      rowData !== undefined && rowData[0].strategy_Percentage
    );
    formik.setFieldValue(
      "subadmin_servic_type",
      rowData !== undefined && rowData[0].subadmin_service_type == 1 ? "1" : "2"
    );
    formik.setFieldValue(
      "prifix_key",
      rowData !== undefined && rowData[0].prifix_key
    );
  }, [rowData]);

  useEffect(() => {
    GetSubadminDataById();
  }, []);

  return (
    <>
      <EditForm
        page_title="Update Sub-Admin Details"
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
