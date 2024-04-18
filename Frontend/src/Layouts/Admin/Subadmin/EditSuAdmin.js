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
import { useLocation, useNavigate } from "react-router-dom";

const EditClient = () => {
  const dispatch = useDispatch();
  const [inputPerTrade, setInputPerTrade] = useState(false);
  const [inputPerStrategy, setInputPerStrategy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const rowData = location.state?.rowData || {};
  const [rowData, setRowData] = useState(
    location.state && location.state.rowData
  );
  const [userId, setUserId] = useState(
    location.state && location.state.rowData._id
  );


  const formik = useFormik({
    initialValues: {
      id: rowData?._id || "",
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
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        id: values.id,
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

  const fields = [
    
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
    formik.setFieldValue("username", rowData !== undefined && rowData.UserName);
    formik.setFieldValue("fullName", rowData !== undefined && rowData.FullName);
    formik.setFieldValue("email", rowData !== undefined && rowData.Email);
    formik.setFieldValue("mobile", rowData !== undefined && rowData.PhoneNo);
    formik.setFieldValue("Per_trade", rowData !== undefined && rowData.Per_trade);
    formik.setFieldValue("strategy_Percentage", rowData !== undefined && rowData.strategy_Percentage);
    formik.setFieldValue("subadmin_servic_type", rowData !== undefined && rowData.subadmin_servic_type == 1 ? "1" : "2");
    formik.setFieldValue("prifix_key", rowData !== undefined && rowData.prifix_key);

  }, [rowData]);


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






 