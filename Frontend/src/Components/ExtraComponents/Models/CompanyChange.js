import React, { useState } from "react";
import axios from "axios";

const StockOutModal = ({ rowData, onClose }) => {
    const initialFormData = rowData?.companydata || {}; // Initialize with companydata or empty object
    const [formData, setFormData] = useState(initialFormData);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleUpdate = (e) => {
      e.preventDefault();
      const updatedData = {
        ...rowData,
        data: {
          ...rowData.data,
          ...formData,
        },
      };
  
      axios
        .post("http://localhost:7000/subadmin/company/edit", updatedData)
        .then((response) => {
         
          onClose();
        })
        .catch((error) => {
          console.error("Update failed:", error);
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
                      className="form-control"
                      placeholder="password"
                      defaultValue={rowData.razorpay_key}
                      disabled // As it's not editable
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
    </div>
  );
};

export default StockOutModal;
