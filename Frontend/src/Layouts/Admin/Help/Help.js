import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { GetCompany_info } from "../../../ReduxStore/Slice/Admin/System";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";


function System() {


    const dispatch = useDispatch();

    const [getCompnayData, SetCompnayData] = useState();


    const GetCompnayData = async () => {


        await dispatch(GetCompany_info())
            .unwrap()
            .then(async (response) => {
                console.log("response", response.data)

                if (response.status) {
                    SetCompnayData(response.data)
                } else {
                    toast.error(response.msg);
                }

            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        GetCompnayData()
    }, [])


    return (

        <div className="content container-fluid ">

            <div className="row mb-2">
                <div className="col-lg-4 col-md-4" data-aos="fade-left">
                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>Help Center</h5>
                        </div>
                    </div>
                </div>


                <div className="col-lg-8 col-md-8 card" data-aos="fade-right">

                    <ul className="d-flex justify-content-center pt-2">
                        <li className="nav-item" style={{ margin: 5 }}>

                            <input type="radio" name="choose" value="user" style={{ margin: 5 }} />User
                        </li>
                        <li className="nav-item" style={{ margin: 5 }}>

                            <input type="radio" name="choose" value="admin" style={{ margin: 5 }} />Admin
                        </li>
                        <li className="nav-item" style={{ margin: 5 }}>

                            <input type="radio" name="choose" value="subadmin" style={{ margin: 5 }} />Subadmin
                        </li>
                    </ul>

                </div>

            </div>


            <div className="row">
                <div className="col-lg-4 col-md-4" data-aos="fade-right">
                    <div className="card">
                        <div className="card-body" >

                            <div data-aos="fade-down" className="gif-div h-100 " >
                                {/* <iframe src="https://lottie.host/embed/f3fed07f-0f56-45f1-ae1f-8e87bad0c51b/q3MDJRT4iV.json"></iframe> */}
                                <img src="/assets/img/gif/Investment-data.gif" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-8 col-md-8" data-aos="fade-left">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane show active" id="solid-tab1">

                                    <div class="card-header d-flex justify-content-between align-items-center border-bottom">
                                        <h5 class="card-title mb-0 w-auto"> <i className="fa-solid fa-landmark pe-2"></i>How Can I Help You</h5>
                                        <div className="pay-btn text-end w-auto">
                                            <button className="btn btn-primary " data-bs-toggle="modal"
                                                data-bs-target="#company">
                                                Edit
                                            </button>
                                        </div>
                                    </div>


                                    <div className="invoice-total-box px-3 border">
                                        <div className="invoice-total-inner">
                                            <form action="#" className="mt-3">
                                                <div className="card">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-12">
                                                            <div className="input-block mb-3">
                                                                <label>Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter your Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-12">
                                                            <div className="input-block mb-3">
                                                                <label>Email ID</label>
                                                                <input
                                                                    type="email"
                                                                    className="bg-white-smoke form-control"
                                                                    placeholder="Enter your email id"
                                                                />
                                                            </div>

                                                        </div>

                                                        <div className="col-lg-6 col-md-12">
                                                            <div className="input-block mb-0">
                                                                <label>Phone No</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Enter your Number"
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-12">
                                                            <div className="input-block mb-0">
                                                                <label>City</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter your current city"
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="input-block mb-0 mt-2">
                                                                <label>Message</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="About"
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="modal-footer mt-2" style={{ justifyContent: "center !important" }}>

                                                            <button
                                                                type="submit"
                                                                data-bs-dismiss="modal"
                                                                className="btn btn-primary paid-continue-btn"
                                                            >
                                                                Send
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="tab-pane" id="solid-tab2">
                                    <div class="card-header d-flex justify-content-between align-items-center border-bottom">
                                        <h5 class="card-title mb-0 w-auto"> <i className="fa-solid fa-envelope pe-2"></i> Email Information</h5>
                                        <div className="pay-btn text-end w-auto">
                                            <button className="btn btn-primary " data-bs-toggle="modal"
                                                data-bs-target="#email">
                                                Edit Email Information
                                            </button>
                                        </div>
                                    </div>


                                    <div className="invoice-total-box px-3 border">
                                        <div className="invoice-total-inner">
                                            <p>
                                                Email ID <span>$120.00</span>
                                            </p>
                                            <p>
                                                Email <span>$13.20</span>
                                            </p>
                                            <p>
                                                CC <span>$0.00</span>
                                            </p>
                                            <p>
                                                BCC <span>$0.00</span>
                                            </p>
                                            <p>
                                                Password <span>$0.00</span>
                                            </p>
                                            <p>
                                                SMTP Port <span>$0.00</span>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane" id="solid-tab3">
                                    <div class="card-header d-flex justify-content-between align-items-center border-bottom">
                                        <h5 class="card-title mb-0 w-auto">  <i class="fa-regular fa-image pe-2"></i> Background Images</h5>
                                        <div className="pay-btn text-end w-auto">
                                            <button className="btn btn-primary " data-bs-toggle="modal"
                                                data-bs-target="#back">
                                                Update Images
                                            </button>
                                        </div>
                                    </div>

                                    <div className="invoice-total-box px-3 border">
                                        <div className="invoice-total-inner">
                                            <p>
                                                Id <span>$0.00</span>
                                            </p>
                                            <p>
                                                Favicon <span>$120.00</span>
                                            </p>
                                            <p>
                                                Logo <span>$13.20</span>
                                            </p>
                                            <p>
                                                Login Image <span>$0.00</span>
                                            </p>
                                            <p>
                                                Mark <span>$0.00</span>
                                            </p>
                                        </div>
                                    </div>


                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>




                {/* Card design */}

                <div className="card flex-fill bg-white">

                    <div className="card-header"><h5 className="card-title">Special title treatment</h5></div>

                    <div className="card-body card-buttons">

                        <p className="card-text">

                            Some quick example text to build on the card title and make up the bulk of

                            the card's content.

                        </p>

                    </div>
                    <div className="modal custom-modal fade" id="company" role="dialog">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 pb-0">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Any Query</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <form action="#">
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="input-block mb-3">

                                                    <input
                                                        type="text"
                                                        className="bg-white-smoke form-control"
                                                        placeholder="Message"
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
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            data-bs-dismiss="modal"
                                            className="btn btn-primary paid-continue-btn"
                                        >
                                            send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* <div className="modal custom-modal fade" id="email" role="dialog">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 pb-0">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0"> Email Information</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <form action="#">
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="input-block mb-3">
                                                    <label>Email ID</label>
                                                    <input
                                                        type="email"
                                                        className="bg-white-smoke form-control"
                                                        placeholder="email"
                                                    />
                                                </div>

                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="input-block mb-3">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Company Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="input-block mb-0">
                                                    <label>CC</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="CC"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="input-block mb-0">
                                                    <label>BCC</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Bcc"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="input-block mb-0">
                                                    <label>SMTP Port</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={0}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="input-block mb-0">
                                                    <label>Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Password "
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
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            data-bs-dismiss="modal"
                                            className="btn btn-primary paid-continue-btn"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="modal custom-modal fade" id="back" role="dialog">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 pb-0">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0"> Background Images</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <form action="#">
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="input-block mb-3">
                                                    <label>ID</label>
                                                    <input
                                                        type="text"
                                                        className="bg-white-smoke form-control"
                                                        placeholder="email"
                                                    />
                                                </div>

                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="input-block mb-3">
                                                    <label>Favicon</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="Company Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="input-block mb-0">
                                                    <label>Logo </label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="CC"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="input-block mb-0">
                                                    <label>Login Image</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="Bcc"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="input-block mb-0">
                                                    <label>Mark</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Mark"
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
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            data-bs-dismiss="modal"
                                            className="btn btn-primary paid-continue-btn"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> */}

                    <div className="card-footer text-muted">This is my footer</div>

                </div>



            </div>
        </div>

    );
}

export default System;
