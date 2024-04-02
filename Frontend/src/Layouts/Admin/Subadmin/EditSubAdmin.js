import React, { useState, useEffect } from "react";
import EditForm from "../../../Components/ExtraComponents/forms/EditForm";
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

  const navigate = useNavigate();
  const location = useLocation();
  // const rowData = location.state?.rowData || {};
  const [rowData, setRowData] = useState();

  useEffect(() => {
    if (location.state && location.state.rowData) {
      setRowData(location.state.rowData);
      console.log("API response:", location.state.rowData);
    } else {
      console.error("Row data is not available");
    }
  }, [location.state]);

  console.log("RowData", rowData);

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      mobile: "",
      onChange: (e) => handleChange("username", e.target.value),
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
    onSubmit: async (values) => {
      const req = {
        UserName: values.username,
        FullName: values.fullName,
        Email: values.email,
        PhoneNo: values.mobile,
      };

      await dispatch(editSubadmin(req))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            console.log("Response From API Edit", response);
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
      name: "username",
      label: "Username",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
     
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
      disable: false,
     
    },
    {
      name: "mobile",
      label: "Mobile",
      type: "text",
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
    console.log("USERNAME", rowData.UserName);
    formik.setFieldValue("username", rowData !== undefined && rowData.UserName);
    formik.setFieldValue("fullName", rowData !== undefined && rowData.FullName);
    formik.setFieldValue("email", rowData !== undefined && rowData.Email);
    formik.setFieldValue("mobile", rowData !== undefined && rowData.PhoneNo);
  }, [rowData]);

  const BackOnAll = () => {
    navigate("/admin/allsubadmin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} has been changed to:`, value);
    formik.handleChange(e);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={BackOnAll}
        >
          Back
        </button>
        <div>
          <EditForm
            fields={fields.filter(
              (field) => !field.showWhen || field.showWhen(formik.values)
            )}
            page_title="Update Subadmin Details"
            formik={formik}
            btn_name="Update"
            fromDate={formik.values.fromDate}
            toDate={formik.values.todate}
          />
          <ToastButton />
        </div>
      </div>
    </>
  );
};
export default EditClient;
