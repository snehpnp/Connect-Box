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
// import Content from "../../../Components/Dashboard/Content/Content";
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
      disable: false,
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
      type: "number",
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

    {
      name: "demat_userid",
      label: formik.values.broker == 9 ? "User Id" : "",
      type: "text",
      showWhen: (values) => values.broker === "9",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "app_id",
      label:
        formik.values.broker == 1
          ? "Verification Code"
          : formik.values.broker == 5
          ? "Password"
          : formik.values.broker == 7
          ? "Demat Password"
          : formik.values.broker == 11
          ? "Password"
          : formik.values.broker == 2
          ? "Demat UserId"
          : formik.values.broker == 13
          ? "App Id"
          : formik.values.broker == 9
          ? "Password"
          : formik.values.broker == 14
          ? "User Id "
          : "App Id",
      type: "text",
      showWhen: (values) =>
        //  values.broker === '2' ||
        values.broker === "1" ||
        values.broker === "2" ||
        values.broker === "3" ||
        values.broker === "5" ||
        values.broker === "7" ||
        values.broker === "9" ||
        values.broker === "11" ||
        values.broker === "13" ||
        values.broker === "14",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "api_type",
      label:
        formik.values.broker == 5
          ? "DOB"
          : formik.values.broker == 7
          ? "Trade Api Password"
          : formik.values.broker == 9
          ? "Encryption IV"
          : "Api Secret",
      type: "text",
      showWhen: (values) => values.broker === "7" || values.broker === "9",
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
    formik.setFieldValue(
      "prifix_key",
      rowData !== undefined && rowData.prifix_key
    );

    if (rowData !== undefined && rowData.subadmin_servic_type) {
      formik.setFieldValue("subadmin_servic_type",rowData.subadmin_servic_type);
      if (rowData.subadmin_servic_type === "1") {
        formik.setFieldValue("strategy_Percentage",rowData.strategy_Percentage);
      } else if (rowData.subadmin_servic_type === "2") {
        formik.setFieldValue("Per_trade", rowData.Per_trade);
      }
    } else {
      formik.setFieldValue("subadmin_servic_type", "1");
    }
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
