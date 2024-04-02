import React from 'react'

const Dashboards = () => {

    var Role = JSON.parse(localStorage.getItem("user_details")).Role
    var UserNAme = JSON.parse(localStorage.getItem("user_details")).UserName

    const getGreetingMessage = () => {
        const currentTime = new Date().getHours();

        if (currentTime < 12) {
            return { greeting: "Good Morning", icon: "fe-sun" };
        } else if (currentTime < 18) {
            return { greeting: "Good Afternoon", icon: "fe-sun" };
        } else {
            return { greeting: "Good Evening", icon: "fe-moon" };
        }
    };

    const { greeting, icon } = getGreetingMessage();

    return (
        <div>

            <div className="content container-fluid pb-0">
                <div className="page-header">
                    <div className="content-page-header">
                        <h5>User Dashboard</h5>
                    </div>
                </div>
                <div className="super-admin-dashboard">
                    <div className="row">
                        <div className="col-xl-5 d-flex">
                            <div className="dash-user-card w-100">

                                <h4>
                                    <i className={`fe ${icon}`} />
                                    {greeting}, {UserNAme}
                                </h4>

                                <p>14 New Strategies Subscribed</p>
                                <div className="dash-btns">
                                    <a href="companies.html" className="btn view-company-btn">
                                        View Companies
                                    </a>
                                    <a href="packages.html" className="btn view-package-btn">
                                        All Packages
                                    </a>
                                </div>
                                <div className="dash-img">
                                    <img src="assets/img/dashboard-card-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-7 d-flex p-0">
                            <div className="row dash-company-row w-100 m-0">
                                <div className="col-lg-3 col-sm-6 d-flex">
                                    <div className="company-detail-card w-100">
                                        <div className="company-icon">
                                            <img src="assets/img/icons/dash-card-icon-01.svg" alt="" />
                                        </div>
                                        <div className="dash-comapny-info">
                                            <h6>Total Companies</h6>
                                            <h5>987</h5>
                                            <p>
                                                <span>
                                                    14% <i className="fe fe-chevrons-up" />
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 d-flex">
                                    <div className="company-detail-card bg-info-light w-100">
                                        <div className="company-icon">
                                            <img src="assets/img/icons/dash-card-icon-02.svg" alt="" />
                                        </div>
                                        <div className="dash-comapny-info">
                                            <h6>Active Companies</h6>
                                            <h5>154</h5>
                                            <p>
                                                <span>
                                                    1% <i className="fe fe-chevrons-up" />
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 d-flex">
                                    <div className="company-detail-card bg-pink-light w-100">
                                        <div className="company-icon">
                                            <img src="assets/img/icons/dash-card-icon-03.svg" alt="" />
                                        </div>
                                        <div className="dash-comapny-info">
                                            <h6>Inactive Company</h6>
                                            <h5>2</h5>
                                            <p>
                                                <span>
                                                    2% <i className="fe fe-chevrons-up" />
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 d-flex">
                                    <div className="company-detail-card bg-success-light w-100">
                                        <div className="company-icon">
                                            <img src="assets/img/icons/dash-card-icon-04.svg" alt="" />
                                        </div>
                                        <div className="dash-comapny-info">
                                            <h6>Total Active Plans</h6>
                                            <h5>6</h5>
                                            <p>
                                                <span>
                                                    6% <i className="fe fe-chevrons-up" />
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 d-flex">
                            <div className="card super-admin-dash-card">
                                <div className="card-header">
                                    <div className="row align-center">
                                        <div className="col">
                                            <h5 className="card-title mt-2 ms-2">Latest Registered Companies</h5>
                                        </div>
                                        <div className="col-auto">
                                            <a
                                                href="companies.html"
                                                className="btn-right btn btn-sm btn-outline-primary mt-2 me-2"
                                            >
                                                View All
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-stripped table-hover">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a
                                                                href="profile.html"
                                                                className="company-avatar avatar-md me-2 companies company-icon"
                                                            >
                                                                <img
                                                                    className="avatar-img rounded-circle company"
                                                                    src="assets/img/companies/company-01.svg"
                                                                    alt="Company Image"
                                                                />
                                                            </a>
                                                            <a href="companies.html">
                                                                Hermann Groups{" "}
                                                                <span className="plane-type">Basic (Monthly)</span>
                                                            </a>
                                                        </h2>
                                                    </td>
                                                    <td>24 Feb 2024</td>
                                                    <td className="text-end">
                                                        <a href="companies.html" className="view-companies btn">
                                                            View
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a
                                                                href="profile.html"
                                                                className="company-avatar avatar-md me-2 companies company-icon"
                                                            >
                                                                <img
                                                                    className="avatar-img rounded-circle company"
                                                                    src="assets/img/companies/company-02.svg"
                                                                    alt="Company Image"
                                                                />
                                                            </a>
                                                            <a href="companies.html">
                                                                Skiles LLC{" "}
                                                                <span className="plane-type">
                                                                    Enterprise (Yearly)
                                                                </span>
                                                            </a>
                                                        </h2>
                                                    </td>
                                                    <td>23 Feb 2024</td>
                                                    <td className="text-end">
                                                        <a href="companies.html" className="view-companies btn">
                                                            View
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a
                                                                href="profile.html"
                                                                className="company-avatar avatar-md me-2 companies company-icon"
                                                            >
                                                                <img
                                                                    className="avatar-img rounded-circle company"
                                                                    src="assets/img/companies/company-03.svg"
                                                                    alt="Company Image"
                                                                />
                                                            </a>
                                                            <a href="companies.html">
                                                                Kerluke Group{" "}
                                                                <span className="plane-type">
                                                                    Advanced (Monthly)
                                                                </span>
                                                            </a>
                                                        </h2>
                                                    </td>
                                                    <td>22 Feb 2024</td>
                                                    <td className="text-end">
                                                        <a href="companies.html" className="view-companies btn">
                                                            View
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a
                                                                href="profile.html"
                                                                className="company-avatar avatar-md me-2 companies company-icon"
                                                            >
                                                                <img
                                                                    className="avatar-img rounded-circle company"
                                                                    src="assets/img/companies/company-04.svg"
                                                                    alt="Company Image"
                                                                />
                                                            </a>
                                                            <a href="companies.html">
                                                                Schowalter Group{" "}
                                                                <span className="plane-type">Basic (Yearly)</span>
                                                            </a>
                                                        </h2>
                                                    </td>
                                                    <td>21 Feb 2024</td>
                                                    <td className="text-end">
                                                        <a href="companies.html" className="view-companies btn">
                                                            View
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a
                                                                href="profile.html"
                                                                className="company-avatar avatar-md me-2 companies company-icon"
                                                            >
                                                                <img
                                                                    className="avatar-img rounded-circle company"
                                                                    src="assets/img/companies/company-05.svg"
                                                                    alt="Company Image"
                                                                />
                                                            </a>
                                                            <a href="companies.html">
                                                                Accentric Global{" "}
                                                                <span className="plane-type">Basic (Monthly)</span>
                                                            </a>
                                                        </h2>
                                                    </td>
                                                    <td>20 Feb 2024</td>
                                                    <td className="text-end">
                                                        <a href="companies.html" className="view-companies btn">
                                                            View
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 d-flex">
                            <div className="card super-admin-dash-card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title mt-2 ms-2">Earnings </h5>
                                        <div className="d-flex align-center">
                                            <span className="earning-income-text">
                                                <i />
                                                Income
                                            </span>
                                            <div className="dropdown main">
                                                <button
                                                    className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    2024
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton"
                                                >
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">
                                                            2023
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">
                                                            2022
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">
                                                            2021
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div id="earnings-chart" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-flex">
                            <div className="card super-admin-dash-card flex-fill">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title mt-2 ms-2">Most Ordered Plan</h5>
                                        <div className="dropdown main">
                                            <button
                                                className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                                                type="button"
                                                id="dropdownMenuButton2"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                This Month
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton2"
                                            >
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        Today
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        This Week
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        This Year
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="dash-plane-list">
                                        <div className="plane-info">
                                            <span className="icon-plane">
                                                <img
                                                    src="assets/img/icons/dashboard-plane-icon.svg"
                                                    alt=""
                                                />
                                            </span>
                                            <div className="plane-name">
                                                Enterprise <span>(Monthly)</span> <h6>Total Order : 201</h6>
                                            </div>
                                        </div>
                                        <span className="plane-rate">$549.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-flex">
                            <div className="card super-admin-dash-card flex-fill">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title mt-2 ms-2">Top Company with Plan</h5>
                                        <div className="dropdown main">
                                            <button
                                                className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                                                type="button"
                                                id="dropdownMenuButton3"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Today
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton3"
                                            >
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        This Month
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        This Week
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        This Year
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="dash-plane-list">
                                        <div className="plane-info">
                                            <span className="icon-company">
                                                <img src="assets/img/companies/company-01.svg" alt="" />
                                            </span>
                                            <span className="name-company">Hermann Groups</span>
                                        </div>
                                        <span className="plane-rate">10 Plans</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-flex">
                            <div className="card super-admin-dash-card flex-fill">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title mt-2 ms-2">Most Domains</h5>
                                        <div className="dropdown main">
                                            <button
                                                className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                                                type="button"
                                                id="dropdownMenuButton4"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                This Week
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton4"
                                            >
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        This Month
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        Today
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" className="dropdown-item">
                                                        This Year
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="dash-plane-list">
                                        <div className="plane-info">
                                            <span className="icon-company">
                                                <img src="assets/img/companies/company-04.svg" alt="" />
                                            </span>
                                            <div className="plane-name">
                                                <span>Schowalter Group</span> <h6>sk.example.com</h6>
                                            </div>
                                        </div>
                                        <span className="plane-rate">150 Users</span>
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

export default Dashboards
