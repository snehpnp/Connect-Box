import React, { useState, useEffect, useCallback } from "react";
import {
  infocompany,
  edit_company_info,
} from "../../../ReduxStore/Slice/Subadmin/System";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";

function System() {
  const dispatch = useDispatch();
  const [getCompanyData, setCompanyData] = useState(null);
  const [modal, setModal] = useState(0);

  const [refresh, setrefresh] = useState(false);

  const [formData, setFormData] = useState();

  const userDetailsString = localStorage.getItem("user_details");
  const userDetails = JSON.parse(userDetailsString);
  const userId = userDetails ? userDetails.user_id : null;


  const OpenModal = (value) => {
    setModal(value);
  };

  const [selectedImages, setSelectedImages] = useState({
    favicon: null,
    logo: null,
    loginimage: null,
  });

  const handleImageChange = (event, imageName) => {
    if (event.target.files[0].size > 420000) {
      alert("Please  Select file less then 420KB");
      event.target.value = "";
      return;
    } else {

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImages({
            ...selectedImages,
            [imageName]: reader.result,
          });
          setFormData({
            ...formData,
            [imageName]: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    }

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (formData) {
      var data = {
        id: getCompanyData && getCompanyData[0]._id,
        data: formData,
      };

      await dispatch(edit_company_info(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.msg);
            setrefresh(!refresh);
            CloseModal();
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } else {
      console.log("Error formData is null, undefined, empty string, or falsey value");
    }
  };

  const fetchCompanyData = useCallback(async () => {
    try {
      const response = await dispatch(infocompany({ id: userId })).unwrap();
      if (response.status) {
        setCompanyData(response.data);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }, [refresh, dispatch]);

  useEffect(() => {
    fetchCompanyData();
  }, [refresh, fetchCompanyData]);

  const CloseModal = () => {
    setSelectedImages({
      favicon: null,
      logo: null,
      loginimage: null,
    });
    setModal(0);
    setFormData(null);
  };

  return (
    <div className="content container-fluid">
      <div className="row mb-2">
        {/* <div className="col-lg-4 col-md-4" data-aos="fade-left">
          <div className="page-header">
            <div className="content-page-header">
              <h5>System Information</h5>
            </div>
          </div>
        </div> */}

        <div className="col-lg-12 col-md-12" data-aos="fade-right">
          {/* <ul className="nav nav-tabs nav-tabs-solid horizontal-tab d-flex justify-content-center ">


            <li className="nav-item mx-md-5">
              <a className="nav-link active" href="#solid-tab2" data-bs-toggle="tab">
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
          </ul> */}
          <ul className="nav nav-tabs nav-bordered nav-justified" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" href="#solid-tab2" data-bs-toggle="tab">
                <i className="fa-solid fa-envelope pe-2"></i>
                Email Information
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" href="#solid-tab3" data-bs-toggle="tab">
                <i className="fa-regular fa-image pe-2"></i>
                Background Images
              </a>
            </li>

          </ul>

        </div>
      </div>

      <div className="row">
        {/* <div className="subsystem  col-lg-4 col-md-4" data-aos="fade-right">
          <div className="card">
            <div className="card-body">
              <div data-aos="fade-down" className="gif-div h-100">
                <img
                  src="/assets/img/gif/Investment-data.gif"
                  alt="Investment data"
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className="col-lg-12 col-md-12" data-aos="fade-left">
          <div className="h-100">
            <div className>
              <div className="tab-content">
                {/* Tab panes */}

                {/* Tab panes */}
                <div className="tab-pane active" id="solid-tab2">
                  <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="card-title mb-0 w-auto">
                      <i className="fa-solid fa-envelope pe-2"></i> Email
                      Information
                    </h5>
                    <div className="pay-btn text-end w-auto">
                      <button
                        className="btn btn-primary"
                        onClick={() => OpenModal(2)}
                      >
                        Edit Email Information
                      </button>
                    </div>
                  </div>
                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">
                      <div>
                        Email{" "}
                        <span>
                          {getCompanyData && getCompanyData[0]?.email}
                        </span>
                      </div>
                      <div>
                        CC{" "}
                        <span>
                          {getCompanyData && getCompanyData[0]?.cc_mail}
                        </span>
                      </div>
                      <div>
                        BCC{" "}
                        <span>
                          {getCompanyData && getCompanyData[0]?.bcc_mail}
                        </span>
                      </div>
                      <div>
                        Password{" "}
                        <span>
                          {getCompanyData && getCompanyData[0]?.smtp_password}
                        </span>
                      </div>
                      <div>
                        SMTP Port{" "}
                        <span>
                          {getCompanyData && getCompanyData[0]?.smtpport}
                        </span>
                      </div>
                      <div>
                        SMTP Host{" "}
                        <span>
                          {getCompanyData && getCompanyData[0]?.smtphost}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
                {/* Tab panes */}
                <div className="tab-pane" id="solid-tab3">
                  <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="card-title mb-0 w-auto">
                      <i className="fa-regular fa-image pe-2"></i> Background
                      Images
                    </h5>
                    <div className="pay-btn text-end w-auto">
                      <button
                        className="btn btn-primary"
                        onClick={() => OpenModal(3)}
                      >
                        Update Images
                      </button>
                    </div>
                  </div>
                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">
                      {getCompanyData && getCompanyData[0] ? (
                        <>

                          <p>
                            Logo{" "}
                            {getCompanyData[0]?.logo ? (
                              <img
                                src={getCompanyData[0]?.logo}
                                alt="Logo"
                                style={{ height: "80px", width: "80px" }}
                              />
                            ) : (
                              <span>Data not found</span>
                            )}
                          </p>

                        </>
                      ) : (
                        <p>Data not found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal !== 0 && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
        >
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
                    onClick={() => CloseModal()}
                  ></button>
                </div>
                {modal == 1 ? (
                  <form onSubmit={handleUpdate}>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <div className="input-block mb-3">
                            <label>Company Name</label>
                            <input
                              type="company_name"
                              className="form-control"
                              name="panel_name"
                              placeholder="Enter Email"
                              defaultValue={
                                (getCompanyData &&
                                  getCompanyData[0].panel_name) ||
                                ""
                              }
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
                              defaultValue={
                                (getCompanyData &&
                                  getCompanyData[0].panel_key) ||
                                ""
                              }
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
                              defaultValue={
                                (getCompanyData && getCompanyData[0].Version) ||
                                ""
                              }
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
                        onClick={() => CloseModal()}
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
                ) : modal == 2 ? (
                  <form onSubmit={handleUpdate}>
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
                              defaultValue={
                                (getCompanyData && getCompanyData[0].email) ||
                                ""
                              }
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
                              defaultValue={
                                (getCompanyData && getCompanyData[0].email) ||
                                ""
                              }
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
                              defaultValue={
                                (getCompanyData && getCompanyData[0].cc_mail) ||
                                ""
                              }
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
                              defaultValue={
                                (getCompanyData &&
                                  getCompanyData[0].bcc_mail) ||
                                ""
                              }
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
                              defaultValue={
                                (getCompanyData &&
                                  getCompanyData[0].smtphost) ||
                                ""
                              }
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
                              defaultValue={
                                (getCompanyData &&
                                  getCompanyData[0].smtpport) ||
                                ""
                              }
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
                        onClick={() => CloseModal()}
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
                ) : (
                  <form onSubmit={handleUpdate}>
                    <div className="modal-body">
                      <div className="row">
                        {/* <div className="col-lg-6 col-md-12">
                          <label>favicon</label>
                          <input
                            type="file"
                            className="form-control"
                            name="favicon"
                            accept="image/*"
                            onChange={(event) =>
                              handleImageChange(event, "favicon")
                            }
                          />
                          {selectedImages.favicon && (
                            <div className="mt-3">
                              <img
                                src={selectedImages.favicon}
                                alt="Selected favicon"
                                className="img-fluid"
                              />
                            </div>
                          )}
                        </div> */}

                        <div className="col-lg-6 col-md-12">
                          <label>logo</label>
                          <input
                            type="file"
                            className="form-control"
                            name="logo"
                            accept="image/*"
                            onChange={(event) =>
                              handleImageChange(event, "logo")
                            }
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

                        {/* <div className="col-lg-6 col-md-12">
                          <label>Login Image</label>
                          <input
                            type="file"
                            className="form-control"
                            name="loginimage"
                            accept="image/*"
                            onChange={(event) =>
                              handleImageChange(event, "loginimage")
                            }
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
                        </div> */}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-back cancel-btn me-2"
                        onClick={() => CloseModal()}
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastButton />
    </div>
  );
}

export default System;
