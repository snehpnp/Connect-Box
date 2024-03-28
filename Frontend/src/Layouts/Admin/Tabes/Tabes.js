import React from 'react'

const Tabes = () => {
  return (
    <div>
      <>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <h5>Companies</h5>
              <div className="page-content">
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <a
                        className="btn-filters"
                        href="javascript:void(0);"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Refresh"
                      >
                        <span>
                          <i className="fe fe-refresh-ccw" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn btn-filters w-auto popup-toggle"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Filter"
                      >
                        <span className="me-2">
                          <img src="assets/img/icons/filter-icon.svg" alt="filter" />
                        </span>
                        Filter
                      </a>
                    </li>
                    <li>
                      <div
                        className="dropdown dropdown-action"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Download"
                      >
                        <a
                          href="#"
                          className="btn btn-filters"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="me-2">
                            <i className="fe fe-download" />
                          </span>
                          Export
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="d-block">
                            <li>
                              <a
                                className="d-flex align-items-center download-item"
                                href="javascript:void(0);"
                                download=""
                              >
                                <i className="far fa-file-pdf me-2" />
                                Export as PDF
                              </a>
                            </li>
                            <li>
                              <a
                                className="d-flex align-items-center download-item"
                                href="javascript:void(0);"
                                download=""
                              >
                                <i className="far fa-file-text me-2" />
                                Export as Excel
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a
                        className="btn btn-filters"
                        href="javascript:void(0);"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Print"
                      >
                        <span className="me-2">
                          <i className="fe fe-printer" />
                        </span>{" "}
                        Print
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn btn-primary"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add_companies"
                      >
                        <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                        Add Company
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="super-admin-list-head">
            <div className="row">
              <div className="col-xl-3 col-md-6 d-flex">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="grid-info-item total-items">
                      <div className="grid-info">
                        <span>Total Companies</span>
                        <h4>987</h4>
                      </div>
                      <div className="grid-head-icon">
                        <i className="fe fe-life-buoy" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 d-flex">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="grid-info-item active-items">
                      <div className="grid-info">
                        <span>Active Companies</span>
                        <h4>154</h4>
                      </div>
                      <div className="grid-head-icon">
                        <i className="fe fe-check-square" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 d-flex">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="grid-info-item inactive-items">
                      <div className="grid-info">
                        <span>Inactive Company</span>
                        <h4>2</h4>
                      </div>
                      <div className="grid-head-icon">
                        <i className="fe fe-x-circle" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 d-flex">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="grid-info-item location-info">
                      <div className="grid-info">
                        <span>Company Locations</span>
                        <h4>200</h4>
                      </div>
                      <div className="grid-head-icon">
                        <i className="fe fe-map-pin" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="filter_inputs" className="card filter-card">
            <div className="card-body pb-0">
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <div className="input-block mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="input-block mb-3">
                    <label>Email</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="input-block mb-3">
                    <label>Phone</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card-table">
                <div className="card-body">
                  <div className="table-responsive">
                    <div className="companies-table">
                      <table className="table table-center table-hover datatable">
                        <thead className="thead-light">
                          <tr>
                            <th className="no-sort">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Account URL</th>
                            <th>Plan</th>
                            <th>Change Plan</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th className="no-sort">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
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
                                <a href="#">Hermann Groups</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="dab3b4bcb59abfa2bbb7aab6bff4b9b5b7"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>hru.example.com</td>
                            <td>Advanced (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>19 Jan 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
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
                                <a href="#">Skiles LLC</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="83f0e2efe6f0c3e6fbe2eef3efe6ade0ecee"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>sk.example.com</td>
                            <td>Basic (Yearly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>15 Jan 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
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
                                <a href="#">Kerluke Group</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="fb92959d94bb9e839a968b979ed5989496"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>kerluke.example.com</td>
                            <td>Enterprise (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>04 Jan 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
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
                                <a href="#">Schowalter Group</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="95e0e6f0e7a7a6a6d5f0edf4f8e5f9f0bbf6faf8"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>schowalter.example.com</td>
                            <td>Advanced (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>28 Feb 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
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
                                <a href="#">Accentric Global</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="85e4e6e6eaf0ebf1f6c5e0fde4e8f5e9e0abe6eae8"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>accentric.example.com</td>
                            <td>Advanced (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>20 Feb 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="profile.html"
                                  className="company-avatar avatar-md me-2 companies company-icon"
                                >
                                  <img
                                    className="avatar-img rounded-circle company"
                                    src="assets/img/companies/company-06.svg"
                                    alt="Company Image"
                                  />
                                </a>
                                <a href="#">Dexter Matrix</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="0b786a676e784b6e736a667b676e25686466"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>dexter.example.com</td>
                            <td>Premium (Yearly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>15 Feb 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="profile.html"
                                  className="company-avatar avatar-md me-2 companies company-icon"
                                >
                                  <img
                                    className="avatar-img rounded-circle company"
                                    src="assets/img/companies/company-07.svg"
                                    alt="Company Image"
                                  />
                                </a>
                                <a href="#">Emporis Technologies</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="c5acaba3aa85a0bda4a8b5a9a0eba6aaa8"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>emporis.example.com</td>
                            <td>Free (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>15 Feb 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="profile.html"
                                  className="company-avatar avatar-md me-2 companies company-icon"
                                >
                                  <img
                                    className="avatar-img rounded-circle company"
                                    src="assets/img/companies/company-08.svg"
                                    alt="Company Image"
                                  />
                                </a>
                                <a href="#">Beacon Softwares</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="3f5d4a4c56515a4c4c7f5a475e524f535a115c5052"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>beacon.example.com</td>
                            <td>Enterprise (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>15 Feb 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="profile.html"
                                  className="company-avatar avatar-md me-2 companies company-icon"
                                >
                                  <img
                                    className="avatar-img rounded-circle company"
                                    src="assets/img/companies/company-09.svg"
                                    alt="Company Image"
                                  />
                                </a>
                                <a href="#">Global tech</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="b0c5c3d5c2828384f0d5c8d1ddc0dcd59ed3dfdd"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>global.example.com</td>
                            <td>Free (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>15 Feb 2024</td>
                            <td>
                              <span className="badge bg-success-light d-inline-flex align-items-center">
                                <i className="fe fe-check me-1" />
                                Active
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="profile.html"
                                  className="company-avatar avatar-md me-2 companies company-icon"
                                >
                                  <img
                                    className="avatar-img rounded-circle company"
                                    src="assets/img/companies/company-10.svg"
                                    alt="Company Image"
                                  />
                                </a>
                                <a href="#">High Tech Lead</a>
                              </h2>
                            </td>
                            <td>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="07666464687269737447627f666a776b622964686a"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>high.example.com</td>
                            <td>Enterprise (Monthly)</td>
                            <td>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#change_pane"
                              >
                                <span className="badge bg-purple">Change</span>
                              </a>
                            </td>
                            <td>15 Feb 2024</td>
                            <td>
                              <span className="badge bg-danger-light d-inline-flex align-items-center">
                                <i className="fe fe-x me-1" />
                                Inactive
                              </span>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="dropdown-ul">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#view_companies"
                                      >
                                        <i className="far fa-eye me-2" />
                                        View Company
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_companies"
                                      >
                                        <i className="fe fe-edit me-2" />
                                        Edit
                                      </a>
                                    </li>
                                    <li className="delete-alt">
                                      <div>
                                        <a
                                          className="dropdown-item"
                                          href="javascript:void(0);"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_modal"
                                        >
                                          <i className="fe fe-trash-2 me-2" />
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-user-x me-2" />
                                        Cancel Plan
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                      >
                                        <i className="fe fe-shuffle me-2" />
                                        Subscription Log
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="toggle-sidebar    ">
          <div className="sidebar-layout-filter">
            <div className="sidebar-header">
              <h5>Filter</h5>
              <a href="#" className="sidebar-closes">
                <i className="fa-regular fa-circle-xmark" />
              </a>
            </div>
            <div className="sidebar-body">
              <form action="#" autoComplete="off">
                <div className="accordion" id="accordionMain1">
                  <div className="card-header-new" id="headingOne">
                    <h6 className="filter-title">
                      <a
                        href="javascript:void(0);"
                        className="w-100"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Company Name
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </a>
                    </h6>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample1"
                  >
                    <div className="card-body-chat">
                      <div className="row">
                        <div className="col-md-12">
                          <div id="checkBoxes1">
                            <div className="form-custom">
                              <input
                                type="text"
                                className="form-control member-search-dropdown"
                                id="member_search1"
                                placeholder="Search Company"
                              />
                              <span>
                                <img src="assets/img/icons/search.svg" alt="img" />
                              </span>
                            </div>
                            <div className="selectBox-cont search-dropdown-item">
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" /> Hermann Groups
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" /> Skiles LLC
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" /> Kerluke Group
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" />
                                Schowalter Group
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" /> Accentric Global
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" /> Dexter Matrix
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" /> Emporis Technologies
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" />
                                High Tech Lead
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" /> Beacon Softwares
                              </label>
                              <label className="custom_check w-100">
                                <input type="checkbox" name="bystatus" />
                                <span className="checkmark" />
                                Global tech
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion" id="accordionMain3">
                  <div className="card-header-new" id="headingThree">
                    <h6 className="filter-title">
                      <a
                        href="javascript:void(0);"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Plans
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </a>
                    </h6>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample3"
                  >
                    <div className="card-body-chat">
                      <div id="checkBoxes2">
                        <div className="selectBox-cont">
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> All Plans
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Advanced
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Basic
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Enterprise
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" />
                            Premium
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" />
                            Free
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion" id="accordionMain4">
                  <div className="card-header-new" id="headingFour">
                    <h6 className="filter-title">
                      <a
                        href="javascript:void(0);"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="true"
                        aria-controls="collapseFour"
                      >
                        Plans Type
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </a>
                    </h6>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample4"
                  >
                    <div className="card-body-chat">
                      <div id="checkBoxes2">
                        <div className="selectBox-cont">
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> All Plan Type
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Monthly
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" /> Weekly
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="bystatus" />
                            <span className="checkmark" />
                            Lifetime
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion accordion-last" id="accordionMain2">
                  <div className="card-header-new" id="headingTwo">
                    <h6 className="filter-title">
                      <a
                        href="javascript:void(0);"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Select Date
                        <span className="float-end">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </a>
                    </h6>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample2"
                  >
                    <div className="card-body-chat">
                      <div className="input-block mb-3">
                        <label className="form-control-label">From</label>
                        <div className="cal-icon">
                          <input
                            type="email"
                            className="form-control datetimepicker"
                            placeholder="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="input-block mb-3">
                        <label className="form-control-label">To</label>
                        <div className="cal-icon">
                          <input
                            type="email"
                            className="form-control datetimepicker"
                            placeholder="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter-buttons">
                  <button
                    type="submit"
                    className="d-inline-flex align-items-center justify-content-center btn w-100 btn-primary"
                  >
                    Apply
                  </button>
                  <button
                    type="submit"
                    className="d-inline-flex align-items-center justify-content-center btn w-100 btn-secondary"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal fade modal-delete"
          id="delete_modal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <div className="delete-modal-icon">
                    <span>
                      <i className="fe fe-check-circle" />
                    </span>
                  </div>
                  <h3>Are You Sure?</h3>
                  <p>You want delete company</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="modal-footer justify-content-center p-0">
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary paid-continue-btn me-2"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-back cancel-btn"
                    >
                      No, Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="add_companies"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add New Company</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form action="https://kanakku.dreamstechnologies.com/html/template/companies.html">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-field-item">
                        <h5 className="form-title">Company Profile</h5>
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
                      <div className="input-block mb-3">
                        <label className="form-label">Name </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Company Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Email Address </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Company Email"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Account Url </label>
                        <div className="url-text-box">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Account URL"
                          />
                          <span className="url-text">kanakku.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="mb-2">Phone Number</label>
                        <input
                          className="form-control"
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Website </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Website"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-control-label">Password</label>
                        <div className="pass-group modal-password-field">
                          <input
                            type="password"
                            className="form-control pass-input"
                            placeholder="Password"
                          />
                          <span className="fas toggle-password fa-eye-slash" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-control-label">Confirm Password</label>
                        <div className="pass-group modal-password-field">
                          <input
                            type="password"
                            className="form-control pass-input-two"
                            placeholder="Confirm Password"
                          />
                          <span className="fas toggle-password-two fa-eye-slash" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="form-label">Company Address </label>
                        <textarea
                          type="text"
                          className="form-control"
                          rows={3}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Plan Name</label>
                        <select className="select">
                          <option>Select Plan</option>
                          <option>All Plans</option>
                          <option>Advanced</option>
                          <option>Basic</option>
                          <option>Enterprise</option>
                          <option>Premium</option>
                          <option>Free</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Plan Type</label>
                        <select className="select">
                          <option>Select Plan Type</option>
                          <option>Monthly</option>
                          <option>Yearly</option>
                          <option>Lifetime</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Select Currency</label>
                        <select className="select">
                          <option>Select Currency</option>
                          <option>₹</option>
                          <option>$</option>
                          <option>£</option>
                          <option>€</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Select Language</label>
                        <select className="select">
                          <option>Select language</option>
                          <option>English</option>
                          <option>French</option>
                          <option>Spanish</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex align-items-center mb-3">
                        <h6 className="mb-0">Status</h6>
                        <div className="status-toggle">
                          <input
                            id="access-trail"
                            className="check"
                            type="checkbox"
                            defaultChecked=""
                          />
                          <label
                            htmlFor="access-trail"
                            className="checktoggle checkbox-bg"
                          >
                            checkbox
                          </label>
                        </div>
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
                    Add New
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="edit_companies"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Edit Company</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form action="https://kanakku.dreamstechnologies.com/html/template/companies.html">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-field-item">
                        <h5 className="form-title">Company Profile</h5>
                        <div className="profile-picture">
                          <div className="upload-profile">
                            <div className="profile-img company-profile-img">
                              <img
                                id="edit-company-img"
                                className="img-fluid me-0"
                                src="assets/img/companies/company-01.svg"
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
                      <div className="input-block mb-3">
                        <label className="form-label">Name </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Company Name"
                          defaultValue="Hermann Groups"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Email Address </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Company Email"
                          defaultValue="info@example.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Account Url </label>
                        <div className="url-text-box">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Account URL"
                            defaultValue="www.hru.example.com"
                          />
                          <span className="url-text">kanakku.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="mb-2">Phone Number</label>
                        <input
                          className="form-control"
                          id="phone_2"
                          name="phone"
                          type="text"
                          placeholder="Phone Number"
                          defaultValue={1245547887}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Website </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Website"
                          defaultValue="www.example.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-control-label">Password</label>
                        <div className="pass-group modal-password-field">
                          <input
                            type="password"
                            className="form-control pass-input"
                            placeholder="Password"
                            defaultValue={12345}
                          />
                          <span className="fas toggle-password fa-eye-slash" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-control-label">Confirm Password</label>
                        <div className="pass-group modal-password-field">
                          <input
                            type="password"
                            className="form-control pass-input-two"
                            placeholder="Confirm Password"
                            defaultValue={12345}
                          />
                          <span className="fas toggle-password-two fa-eye-slash" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="form-label">Company Address </label>
                        <textarea
                          type="text"
                          className="form-control"
                          rows={3}
                          defaultValue={"22 Junior Avenue Duluth, GA 30097"}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Plan Name</label>
                        <select className="select">
                          <option>All Plans</option>
                          <option>Advanced</option>
                          <option>Basic</option>
                          <option>Enterprise</option>
                          <option>Premium</option>
                          <option>Free</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Plan Type</label>
                        <select className="select">
                          <option>Monthly</option>
                          <option>Yearly</option>
                          <option>Lifetime</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Select Currency</label>
                        <select className="select">
                          <option>United Stated Dollar (USD)</option>
                          <option>$</option>
                          <option>£</option>
                          <option>€</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Select Language</label>
                        <select className="select">
                          <option>English</option>
                          <option>French</option>
                          <option>Spanish</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex align-items-center mb-3">
                        <h6 className="mb-0">Status</h6>
                        <div className="status-toggle">
                          <input
                            id="access-trail-2"
                            className="check"
                            type="checkbox"
                            defaultChecked=""
                          />
                          <label
                            htmlFor="access-trail-2"
                            className="checktoggle checkbox-bg"
                          >
                            checkbox
                          </label>
                        </div>
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
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="view_companies"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Company Details</h4>
                </div>
                <div className="d-flex details-edit-link">
                  <a
                    href="#"
                    className="modal-edit-link d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_companies"
                  >
                    <i className="fe fe-edit me-2" />
                    Edit Company
                  </a>
                  <button
                    type="button"
                    className="btn-close ms-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-field-item">
                      <div className="profile-picture company-detail-head">
                        <div className="upload-profile">
                          <div className="profile-img company-profile-img">
                            <img
                              id="view-company-img"
                              className="img-fluid me-0"
                              src="assets/img/companies/company-01.svg"
                              alt="profile-img"
                            />
                          </div>
                          <div className="add-profile">
                            <h5>Hermann Groups</h5>
                            <span>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="2a624f58474646584349426a4f524b475a464f04494547"
                              >
                                [email&nbsp;protected]
                              </a>
                            </span>
                          </div>
                        </div>
                        <span className="badge bg-success-light d-inline-flex align-items-center">
                          <i className="fe fe-check me-1" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="plane-basic-info">
                      <h5>Basic Info</h5>
                      <div className="row">
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Account URL</h6>
                            <p>hru.example.com</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Phone Number</h6>
                            <p>+1 15541 54544</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Website</h6>
                            <p>www.example.com</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Company Address</h6>
                            <p>
                              22 Junior Avenue <br />
                              Duluth, GA 30097
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Currency</h6>
                            <p>United Stated Dollar (USD)</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Language</h6>
                            <p>English</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="plane-basic-info plane-detail">
                      <h5>Plan Details</h5>
                      <div className="row">
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Plan Name</h6>
                            <p>Enterprise</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Plan Type</h6>
                            <p>Yearly</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Price</h6>
                            <p>$200</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Register Date</h6>
                            <p>15 Jan 2024</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Expiring On</h6>
                            <p>15 Jan 2025</p>
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
        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="change_pane"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Update Package</h4>
                </div>
                <button
                  type="button"
                  className="btn-close ms-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form action="#">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="plane-basic-info plane-detail">
                        <h5>Current Plan Details</h5>
                        <div className="row">
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Company Name</h6>
                              <p>Hermann Groups</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Plan Name</h6>
                              <p>Enterprise</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Plan Type</h6>
                              <p>Yearly</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Price</h6>
                              <p>$200</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Register Date</h6>
                              <p>15 Jan 2024</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Expiring On</h6>
                              <p>15 Jan 2025</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="plane-basic-info plane-detail">
                        <h5>Change Company Plan</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label>Plan Name</label>
                              <select className="select">
                                <option>Enterprise</option>
                                <option>Advanced</option>
                                <option>Basic</option>
                                <option>Premium</option>
                                <option>Free</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label>Plan Type</label>
                              <select className="select">
                                <option>Yearly</option>
                                <option>Monthly</option>
                                <option>Lifetime</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-label">Amount </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-control-label">
                                Payment Date
                              </label>
                              <div className="cal-icon">
                                <input
                                  type="email"
                                  className="form-control datetimepicker"
                                  placeholder="DD-MM-YYYY"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-control-label">
                                Next Payment Date
                              </label>
                              <div className="cal-icon">
                                <input
                                  type="email"
                                  className="form-control datetimepicker"
                                  placeholder="DD-MM-YYYY"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-control-label">
                                Expiring On
                              </label>
                              <div className="cal-icon">
                                <input
                                  type="email"
                                  className="form-control datetimepicker"
                                  placeholder="DD-MM-YYYY"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
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
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>

    </div>
  )
}

export default Tabes
