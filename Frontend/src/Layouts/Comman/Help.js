import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { GetCompany_info } from "../../ReduxStore/Slice/Admin/System";
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

                                    <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                        <h5 className="card-title mb-0 w-auto"> <i className="fa-solid fa-landmark pe-2"></i>How Can I Help You</h5>
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
                              

                            </div>
                        </div>
                    </div>
                </div>







            </div>
        </div>

    );
}

export default System;
