import React from "react";

const StockOutModal = ({ rowData, onClose }) => {
  console.log("neha 1", rowData);

  const handleUpdate=()=>{
    console.log("Updting")
  }
 

  return (
    <div className=" modal custom-modal d-block">
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
          <form action="#">
            <div className="modal-body">
              <div className="row">

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label> Subadmin Name</label>
                    <input type="text" className="form-control" defaultValue={rowData.makerInfo.FullName}/>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>EMAIL</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      defaultValue={rowData.email}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>CC*</label>
                    <input type="email" className="form-control" defaultValue={rowData.cc_mail}/>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>BCC*</label>
                    <input type="email" className="form-control" defaultValue={rowData.bcc_mail} />
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
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>HOST*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Host"
                      defaultValue={rowData.smtphost}
                    />
                  </div>
                </div>
                
                <div className="col-lg-6 col-md-12">
                  <div className="input-block mb-3">
                    <label>PORT*</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Port"
                      defaultValue={rowData.smtpport}
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
                data-bs-dismiss="modal"
                className="btn btn-primary paid-continue-btn"
                onClick={handleUpdate} 
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
