import React, { useState, useEffect, useCallback } from "react";
import { GetCompany_info } from "../../../ReduxStore/Slice/Admin/System";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function System() {
  const dispatch = useDispatch();
  const [getCompanyData, setCompanyData] = useState(null);
  const [modal, setModal] = useState(0);
  const [formData, setFormData] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const OpenModal = (value) => {
    setModal(value)
  }


  const [selectedImages, setSelectedImages] = useState({
    Favicon: null,
    logo: null,
    loginimage: null
  });

  const handleImageChange = (event, imageName) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImages({
          ...selectedImages,
          [imageName]: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("formData", formData)

  }



  const fetchCompanyData = useCallback(async () => {
    try {
      const response = await dispatch(GetCompany_info()).unwrap();
   
      if (response.status) {
        setCompanyData(response.data);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);





  return (
    <div className="content container-fluid">
      <div className="row mb-2">
        <div className="col-lg-4 col-md-4" data-aos="fade-left">
          <div className="page-header">
            <div className="content-page-header">
              <h5>System Information</h5>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-8" data-aos="fade-right">
          <ul className="nav nav-tabs nav-tabs-solid horizontal-tab d-flex justify-content-center ">
            <li className="nav-item">
              <a className="nav-link active" href="#solid-tab1" data-bs-toggle="tab">
                <i className="fa-solid fa-landmark pe-2"></i>
                Company Information
              </a>
            </li>
            <li className="nav-item mx-md-5">
              <a className="nav-link" href="#solid-tab2" data-bs-toggle="tab">
                <i className="fa-solid fa-envelope pe-2"></i>
                Email Information
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#solid-tab3" data-bs-toggle="tab">
                <i className="fa-regular fa-image pe-2"></i>
                Background Images
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-4" data-aos="fade-right">
          <div className="card">
            <div className="card-body">
              <div data-aos="fade-down" className="gif-div h-100">
                <img src="/assets/img/gif/Investment-data.gif" alt="Investment data" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-8" data-aos="fade-left">
          <div className="card h-100">
            <div className="card-body">
              <div className="tab-content">
                {/* Tab panes */}
                <div className="tab-pane show active" id="solid-tab1">
                  <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="card-title mb-0 w-auto">
                      <i className="fa-solid fa-landmark pe-2"></i> Company Information
                    </h5>
                    <div className="pay-btn text-end w-auto">
                      <button className="btn btn-primary" onClick={() => OpenModal(1)}>
                        Edit Customer Information
                      </button>
                    </div>
                  </div>
                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">
                      <p>
                        Company Name <span>{getCompanyData && getCompanyData[0].panel_name}</span>
                      </p>
                      <p>
                        Panel Key <span>{getCompanyData && getCompanyData[0].panel_key}</span>
                      </p>
                      <p>
                        Company Short Name <span>{getCompanyData && getCompanyData[0].panel_short_name}</span>
                      </p>
                      <p>
                        Version <span>{getCompanyData && getCompanyData[0].version}</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Tab panes */}
                <div className="tab-pane" id="solid-tab2">
                  <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="card-title mb-0 w-auto">
                      <i className="fa-solid fa-envelope pe-2"></i> Email Information
                    </h5>
                    <div className="pay-btn text-end w-auto">
                      <button className="btn btn-primary" onClick={() => OpenModal(2)}>
                        Edit Email Information
                      </button>
                    </div>
                  </div>
                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">
                      <p>Email <span>{getCompanyData && getCompanyData[0].email}</span></p>
                      <p>CC <span>{getCompanyData && getCompanyData[0].cc_mail}</span></p>
                      <p>BCC <span>{getCompanyData && getCompanyData[0].bcc_mail}</span></p>
                      <p>Password <span>{getCompanyData && getCompanyData[0].smtp_password}</span></p>
                      <p>SMTP Port <span>{getCompanyData && getCompanyData[0].smtpport}</span></p>
                      <p>SMTP Host <span>{getCompanyData && getCompanyData[0].smtphost}</span></p>
                    </div>
                  </div>
                </div>
                {/* Tab panes */}
                <div className="tab-pane" id="solid-tab3">
                  <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="card-title mb-0 w-auto">
                      <i className="fa-regular fa-image pe-2"></i> Background Images
                    </h5>
                    <div className="pay-btn text-end w-auto">
                      <button className="btn btn-primary" onClick={() => OpenModal(3)}>
                        Update Images
                      </button>
                    </div>
                  </div>
                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">
                      <p>Favicon <img src={getCompanyData && getCompanyData[0].favicon} alt="Favicon" style={{ height: '80px', width: '80px' }} /></p>
                      <p>Logo <img src={getCompanyData && getCompanyData[0].logo} alt="Logo" style={{ height: '80px', width: '80px' }} /></p>
                      <p>Login Image <img src={getCompanyData && getCompanyData[0].loginimage} alt="Login Image" style={{ height: '80px', width: '80px' }} /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {modal !== 0 && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal custom-modal d-block">
            {/* Modal content */}
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <div className="form-header modal-header-title text-start mb-0">
                    <h4 className="mb-0">Update Details</h4>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setModal(0)}
                  ></button>
                </div>
                {modal == 1 ? (<form onSubmit={handleUpdate}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="input-block mb-3">
                          <label>Company Name</label>
                          <input
                            type="company_name"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            defaultValue= {getCompanyData && getCompanyData[0].panel_name || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="input-block mb-3">
                          <label>Panel Key*</label>
                          <input
                            type="text"
                            className="form-control"
                            name="panel_key"
                            defaultValue= {getCompanyData && getCompanyData[0].panel_key || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="input-block mb-3">
                          <label>Version*</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Version"
                            placeholder="Host"
                            defaultValue= {getCompanyData && getCompanyData[0].Version || ''}
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
                    // onClick={onClose}
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
                </form>) : modal == 2 ? (<form onSubmit={handleUpdate}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="input-block mb-3">
                          <label>Email</label>
                          <input
                            type="Email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            defaultValue= {getCompanyData && getCompanyData[0].email || ''}
                            onChange={handleInputChange}
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
                            defaultValue= {getCompanyData && getCompanyData[0].email || ''}
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
                            defaultValue= {getCompanyData && getCompanyData[0].cc_mail || ''}
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
                            defaultValue= {getCompanyData && getCompanyData[0].bcc_mail || ''}
                            onChange={handleInputChange}
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
                            defaultValue= {getCompanyData && getCompanyData[0].smtphost || ''}
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
                            defaultValue= {getCompanyData && getCompanyData[0].smtpport || ''}
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
                    // onClick={onClose}
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
                </form>) : (
                  <form onSubmit={handleUpdate}>
                    <div className="modal-body">
                      <div className="row">


                        <div className="col-lg-6 col-md-12">
                          <label>Favicon</label>
                          <input
                            type="file"
                            className="form-control"
                            name="Favicon"
                            accept="image/*"
                            onChange={(event) => handleImageChange(event, "Favicon")}
                          />
                          {selectedImages.Favicon && (
                            <div className="mt-3">
                              <img
                                src={selectedImages.Favicon}
                                alt="Selected Favicon"
                                className="img-fluid"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-lg-6 col-md-12">
                          <label>logo</label>
                          <input
                            type="file"
                            className="form-control"
                            name="logo"
                            accept="image/*"
                            onChange={(event) => handleImageChange(event, "logo")}
                          />
                          {selectedImages.logo && (
                            <div className="mt-3">
                              <img
                                src={selectedImages.logo}
                                alt="Selected Image 2"
                                className="img-fluid"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-lg-6 col-md-12">
                          <label>Login Image</label>
                          <input
                            type="file"
                            className="form-control"
                            name="loginimage"
                            accept="image/*"
                            onChange={(event) => handleImageChange(event, "loginimage")}
                          />
                          {selectedImages.loginimage && (
                            <div className="mt-3">
                              <img
                                src={selectedImages.loginimage}
                                alt="Selected Image 3"
                                className="img-fluid"
                              />
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-back cancel-btn me-2"
                      // onClick={onClose}
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
                  </form>)}


              </div>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}

export default System;
