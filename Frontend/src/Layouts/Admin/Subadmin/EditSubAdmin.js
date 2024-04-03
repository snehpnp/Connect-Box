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

  const navigate = useNavigate();
  const location = useLocation();
  // const rowData = location.state?.rowData || {};
  const [rowData, setRowData] = useState(
    location.state && location.state.rowData
  );
  const [userId, setUserId] = useState(location.state && location.state.rowData._id);

  console.log("RowData", rowData && rowData);

  const formik = useFormik({
    initialValues: {
      _id: userId,
      username: "",
      fullName: "",
      email: "",
      mobile: "",
    },

    validate: (values) => {
      let errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        _id: values._id,
        UserName: values.username,
        FullName: values.fullName,
        Email: values.email,
        PhoneNo: values.mobile,
      };

      console.log("Request is Onn", req);
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
    console.log("USERNAME", rowData._id);
    formik.setFieldValue("username", rowData !== undefined && rowData.UserName);
    formik.setFieldValue("fullName", rowData !== undefined && rowData.FullName);
    formik.setFieldValue("email", rowData !== undefined && rowData.Email);
    formik.setFieldValue("mobile", rowData !== undefined && rowData.PhoneNo);
  }, [rowData]);

  console.log("Formic value", formik.values);

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
