import React from 'react'

const Help = () => {
    return (

        <div className="page-wrapper">
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card bg-white">
                            <div className="card-header head-card">
                                <h5 className="card-title tittle">Help Center</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-3 col-md-4">
                                        <div className="card">
                                            <div className="card-body tab-card">
                                                <ul className="nav nav-tabs nav-tabs-solid flex-column ul-input">
                                                    <li className="nav-item li-input">
                                                        {/* <button
                              className="nav-link active 0"
                              href="#solid-tab1"
                              data-bs-toggle="tab"
                            >
                            User
                            </button> */}
                                                        <input className='input-btn' type="radio" name='choose' value="user" />User


                                                    </li>
                                                    <li className="nav-item li-input">
                                                        {/* <a
                              className="nav-link "
                              href="#solid-tab2"
                              data-bs-toggle="tab"
                            >
                              Admin
                            </a> */}
                                                        <input className='input-btn-admin' type="radio" name='choose' value="admin" />admin
                                                    </li>
                                                    <li className="nav-item li-input">
                                                        {/* <a
                              className="nav-link"
                              href="#solid-tab3"
                              data-bs-toggle="tab"
                            >
                              Sub Admin
                            </a> */}
                                                        <input className='input-btn-sub' type="radio" name='choose' value="Subadmin" />Subadmin
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-md-8">
                                        <div className="card bg-white">
                                            <div className="card-body bodycard">
                                                <div className="tab-content">
                                                    <div className="tab-pane show active" id="solid-tab1">
                                                        <h5>Contact us</h5>
                                                        <div className="card-body w-100">

                                                            <form action="#">
                                                                <div className="row">
                                                                    <div className="col-lg-12 col-sm-12">
                                                                        <div className="input-block mb-3">

                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Subject"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12 description-box">
                                                                        <div className="input-block mb-3">

                                                                            <textarea
                                                                                className="summernote form-control area-text"
                                                                                placeholder="Type your message"
                                                                                defaultValue={""}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="seo-setting">
                                                                            <div className="profile-picture">
                                                                                <div className="upload-profile">
                                                                                    <div className="profile-img company-profile-img">
                                                                                        <img
                                                                                            id="company-img"
                                                                                            className="img-fluid me-0"
                                                                                            src="assets/img/companies/company-add-img.svg"
                                                                                            alt="profile-img"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="add-profile">
                                                                                        <h5>Upload a New Photo</h5>
                                                                                        <span>Profile-pic.jpg</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="img-upload">
                                                                                    <label className="btn btn-upload">
                                                                                        Upload <input type="file" />
                                                                                    </label>
                                                                                    <a className="btn btn-remove">Remove</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <div className="modal-footer p-0">
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
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Help
