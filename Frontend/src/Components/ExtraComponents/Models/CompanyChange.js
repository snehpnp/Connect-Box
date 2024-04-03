import React, { useState } from "react";
import { SubadminDetail } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast';

const StockOutModal = ({ rowData, onClose }) => {

  const dispatch = useDispatch();


  const initialFormData = rowData ? rowData : {}; // Initialize with companydata or empty object
  const [formData, setFormData] = useState(initialFormData && initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      id: rowData._id,
      companydata: {
        email: formData.email || rowData.email,
        smtp_password: formData.smtp_password || rowData.smtp_password,
        cc_mail: formData.cc_mail || rowData.cc_mail,
        bcc_mail: formData.bcc_mail || rowData.bcc_mail,
        smtphost: formData.smtphost || rowData.smtphost,
        smtpport: formData.smtpport || rowData.smtpport,
        razorpay_key: formData.razorpay_key || rowData.razorpay_key,
        logo: rowData.logo
      }
    };

    console.log("updatedData", updatedData);




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
  };

  return (
    <div className="modal custom-modal d-block">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <div className="form-header modal-header-title text-start mb-0">
              <h4 className="mb-0">Remove Stock</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose} // Added onClick handler to close the modal
            ></button>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label> Subadmin Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={rowData.makerInfo.FullName}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>EMAIL</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>CC*</label>
                    <input
                      type="email"
                      className="form-control"
                      name="cc_mail"
                      value={formData.cc_mail || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>BCC*</label>
                    <input
                      type="email"
                      className="form-control"
                      name="bcc_mail"
                      value={formData.bcc_mail || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>razorpay key*</label>
                    <input
                      type="password"
                      name="razorpay_key"
                      className="form-control"
                      placeholder="password"
                      defaultValue={rowData.razorpay_key}
                      onChange={handleInputChange}
                      autoComplete="new-password" // Set autocomplete to "new-password" to prevent autofill
                    />

                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>HOST*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="smtphost"
                      placeholder="Host"
                      value={formData.smtphost || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>PORT*</label>
                    <input
                      type="number"
                      className="form-control"
                      name="smtpport"
                      placeholder="Enter Port"
                      value={formData.smtpport || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-back cancel-btn me-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary paid-continue-btn"
              >
                Update
              </button>
            </div>
          </form>
        </div>

      </div>
      <ToastButton />
    </div>
  );
};

export default StockOutModal;
