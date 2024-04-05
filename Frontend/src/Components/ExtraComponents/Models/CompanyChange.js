import React, { useState, useEffect } from "react";
import { SubadminDetail } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast';
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import { useFormik } from "formik";

const StockOutModal = ({ rowData, onClose }) => {

  const dispatch = useDispatch();


  // console.log("rowData", rowData)

  const formik = useFormik({
    initialValues: {
      profile_img: "",
      email: "",
      cc_mail: "",
      bcc_mail: "",
      razorpay_key: "",
      smtphost: "",
      smtpport: "",
      smtp_password:""

    },
    validate: (values) => {
      let errors = {};
      if (!values.razorpay_key) {
        errors.fullName = "Razor pay Key is required";
      }
      if (!values.smtphost) {
        errors.username = "SMTP  is required";
      }
      if (!values.email) {
        errors.email = "Please enter your email address.";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
      }
      if (!values.cc_mail) {
        errors.cc_mail = "Please enter your cc_mail address.";
      } else if (!/^\S+@\S+\.\S+$/.test(values.cc_mail)) {
        errors.cc_mail = "Please enter a valid cc_mail address.";
      }


      if (!values.bcc_mail) {
        errors.bcc_mail = "Please enter your bcc_mail address.";
      } else if (!/^\S+@\S+\.\S+$/.test(values.bcc_mail)) {
        errors.bcc_mail = "Please enter a valid bcc_mail address.";
      }



      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {

      const updatedData = {
        id: rowData._id,
        data: {
          email: values.email || rowData.email,
          smtp_password: values.smtp_password || rowData.smtp_password,
          cc_mail: values.cc_mail || rowData.cc_mail,
          bcc_mail: values.bcc_mail || rowData.bcc_mail,
          smtphost: values.smtphost || rowData.smtphost,
          smtpport: values.smtpport || rowData.smtpport,
          razorpay_key: values.razorpay_key || rowData.razorpay_key,
          logo: values.profile_img || rowData.profile_img
        }
      };

      // console.log("updatedData", updatedData);


      setSubmitting(false);

      await dispatch(SubadminDetail(updatedData))
        .unwrap()
        .then(async (response) => {


          if (response.status) {
            toast.success(response.msg);
            onClose();
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
      name: "FullName",
      label: "Subadmin Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,

    },

    {
      name: "email",
      label: "email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  
    {
      name: "smtp_password",
      label: "Email Password* ",
      type: "password",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "cc_mail",
      label: "CC*",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "bcc_mail",
      label: "BCC* ",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "razorpay_key",
      label: "Razorpay key* ",
      type: "password",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "smtphost",
      label: "HOST* ",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "smtpport",
      label: "PORT* ",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
    },




  ];



  useEffect(() => {

    // console.log("==>", rowData !== undefined && rowData.email)

    formik.setFieldValue("profile_img", rowData !== undefined && rowData.logo);

    formik.setFieldValue("FullName", rowData !== undefined && rowData.makerInfo.FullName);

    formik.setFieldValue("email", rowData !== undefined && rowData.email);
    formik.setFieldValue("smtp_password", rowData !== undefined && rowData.smtp_password);
    formik.setFieldValue("cc_mail", rowData !== undefined && rowData.cc_mail);
    formik.setFieldValue("bcc_mail", rowData !== undefined && rowData.bcc_mail);
    formik.setFieldValue("smtphost", rowData !== undefined && rowData.smtphost);
    formik.setFieldValue("smtpport", rowData !== undefined && rowData.smtpport);
    formik.setFieldValue("razorpay_key", rowData !== undefined && rowData.razorpay_key);






  }, [rowData]);

  return (
    <div className="modal custom-modal d-block">
      <div className="modal-dialog modal-dialog-centered modal-md" >
        <div className="modal-content" style={{ width: "150rem !important" }}>
          <div className="modal-header border-0 pb-0">
            <div className="form-header modal-header-title text-start mb-0">
              <h4 className="mb-0">Update</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose} // Added onClick handler to close the modal
            ></button>
          </div>
          <AddForm
            fields={fields.filter(
              (field) => !field.showWhen || field.showWhen(formik.values)
            )}
            ProfileShow={formik.values.profile_img}

            btn_name="Update"
            formik={formik}
          />

        </div>

      </div>
      <ToastButton />
    </div>
  );
};

export default StockOutModal;



