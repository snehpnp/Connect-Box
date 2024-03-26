import React from 'react'

const Profile = () => {
    return (
        <div>
            <div className="content container-fluid pb-0">
                <div className="row justify-content-lg-center">
                    <div className="col-lg-10">
                        <div className="page-header">
                            <div className="content-page-header">
                                <h5>Profile</h5>
                            </div>
                        </div>
                        <div className="profile-cover">
                            <div className="profile-cover-wrap">
                                <img
                                    className="profile-cover-img"
                                    src="assets/img/profiles/avatar-02.jpg"
                                    alt="Profile Cover"
                                    id="cover-image"
                                />
                                <div className="cover-content">
                                    <div className="custom-file-btn">
                                        <input
                                            type="file"
                                            className="custom-file-btn-input"
                                            id="cover_upload"
                                        />
                                        <label
                                            className="custom-file-btn-label btn btn-sm btn-white"
                                            htmlFor="cover_upload"
                                        >
                                            <i className="fas fa-camera" />
                                            <span className="d-none d-sm-inline-block ms-1">
                                                Update Cover
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mb-5">
                            <label
                                className="avatar avatar-xxl profile-cover-avatar"
                                htmlFor="avatar_upload"
                            >
                                <img
                                    className="avatar-img"
                                    src="assets/img/user.png"
                                    alt="Profile Image"
                                    id="blah"
                                />
                                <input type="file" id="avatar_upload" />
                                <span className="avatar-edit">
                                    <i className="fe fe-edit avatar-uploader-icon shadow-soft" />
                                </span>
                            </label>
                            <h2>
                                Elon Musk{" "}
                                <i
                                    className="fas fa-certificate text-primary small"
                                    data-bs-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Verified"
                                />
                            </h2>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <i className="far fa-building" /> <span>Hafner Pvt Ltd.</span>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fas fa-map-marker-alt" /> West Virginia, US
                                </li>
                                <li className="list-inline-item">
                                    <i className="far fa-calendar-alt" />{" "}
                                    <span>Joined November 2017</span>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card card-body">
                                    <h5>Complete your profile</h5>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="progress progress-md flex-grow-1">
                                            <div
                                                className="progress-bar bg-primary"
                                                role="progressbar"
                                                style={{ width: "30%" }}
                                                aria-valuenow={30}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                        <span className="ms-4">30%</span>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title d-flex justify-content-between">
                                            <span>Profile</span>
                                            <a className="btn btn-sm btn-white" href="settings.html">
                                                Edit
                                            </a>
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-unstyled mb-0">
                                            <li className="py-0">
                                                <h6>About</h6>
                                            </li>
                                            <li>Charles Hafner</li>
                                            <li>Hafner Pvt Ltd.</li>
                                            <li className="pt-2 pb-0">
                                                <h6>Contacts</h6>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    className="__cf_email__"
                                                    data-cfemail="f4979c95869891879c95929a9186b4918c9599849891da979b99"
                                                >

                                                </a>
                                            </li>
                                            <li>+91 123-456-7890</li>
                                            <li className="pt-2 pb-0">
                                                <h6>Address</h6>
                                            </li>
                                            <li>
                                                4663 Agriculture Lane,
                                                <br />
                                                Miami,
                                                <br />
                                                Florida - 33165,
                                                <br />
                                                United States.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">Activity</h5>
                                    </div>
                                    <div className="card-body card-body-height">
                                        <ul className="activity-feed">
                                            <li className="feed-item">
                                                <div className="feed-date">Nov 16</div>
                                                <span className="feed-text">
                                                    <a href="profile.html" style={{ color: 'blue' }}>Brian Johnson</a> has paid the
                                                    invoice
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Nov 7</div>
                                                <span className="feed-text">
                                                    <a href="profile.html" style={{ color: 'blue' }}>Marie Canales</a> has accepted your
                                                    estimate
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Oct 24</div>
                                                <span className="feed-text">
                                                    New expenses added
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Oct 24</div>
                                                <span className="feed-text">
                                                    New expenses added
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Oct 24</div>
                                                <span className="feed-text">
                                                    New expenses added
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Oct 24</div>
                                                <span className="feed-text">
                                                    New expenses added
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Oct 24</div>
                                                <span className="feed-text">
                                                    New expenses added
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Jan 27</div>
                                                <span className="feed-text">
                                                    <a href="profile.html" style={{ color: 'blue' }}>Robert Martin</a> gave a review for{" "}
                                                    <a href="product-details.html" style={{ color: 'blue' }}>"Dell Laptop"</a>
                                                </span>
                                            </li>
                                            <li className="feed-item">
                                                <div className="feed-date">Jan 14</div>
                                                <span className="feed-text">
                                                    New customer registered{" "}
                                                    <a href="profile.html" style={{ color: 'blue' }}>"Tori Carter"</a>
                                                </span>
                                            </li>
                                        </ul>
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

export default Profile

