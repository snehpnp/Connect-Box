import React from 'react'

const Strategies = () => {
  return (
    <div>
          <div className="content container-fluid pb-0">
              <div className="subscription-plane-head">
                  <ul>
                      <li>
                          <a href="packages.html" className="active">
                              Subscription Plans
                          </a>
                      </li>
                      <li>
                          <a href="subscription.html">Subscribers List</a>
                      </li>
                  </ul>
              </div>
              <div className="page-header">
                  <div className="content-page-header">
                      <h5>Plans List</h5>
                      <div className="page-content">
                          <div className="list-btn">
                              <ul className="filter-list">
                                  <li>
                                      <a
                                          className="btn-filters active"
                                          href="packages.html"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="bottom"
                                          title="Grid-View"
                                      >
                                          <span>
                                              <i className="fe fe-grid" />
                                          </span>
                                      </a>
                                  </li>
                                  <li>
                                      <a
                                          className="btn-filters"
                                          href="plans-list.html"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="bottom"
                                          title="List-View"
                                      >
                                          <span>
                                              <i className="fe fe-list" />
                                          </span>
                                      </a>
                                  </li>
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
                                          data-bs-target="#add_newpackage"
                                      >
                                          <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                                          Add Plan
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
                                  <div className="grid-info-item total-plane">
                                      <div className="grid-info">
                                          <span>Total Plan</span>
                                          <h4>07</h4>
                                      </div>
                                      <div className="grid-head-icon">
                                          <i className="fe fe-package" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-3 col-md-6 d-flex">
                          <div className="card w-100">
                              <div className="card-body">
                                  <div className="grid-info-item active-plane">
                                      <div className="grid-info">
                                          <span>Active Plans</span>
                                          <h4>07</h4>
                                      </div>
                                      <div className="grid-head-icon">
                                          <i className="fe fe-list" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-3 col-md-6 d-flex">
                          <div className="card w-100">
                              <div className="card-body">
                                  <div className="grid-info-item inactive-plane">
                                      <div className="grid-info">
                                          <span>Inactive Plans</span>
                                          <h4>0</h4>
                                      </div>
                                      <div className="grid-head-icon">
                                          <i className="fe fe-pause-circle" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-3 col-md-6 d-flex">
                          <div className="card w-100">
                              <div className="card-body">
                                  <div className="grid-info-item total-type">
                                      <div className="grid-info">
                                          <span>No of Plan Types</span>
                                          <h4>04</h4>
                                      </div>
                                      <div className="grid-head-icon">
                                          <i className="fe fe-pocket" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      <div className="packages card">
                          <div className="package-header d-flex justify-content-between">
                              <div className="d-flex justify-content-between w-100">
                                  <div className="">
                                      <h6>Monthly</h6>
                                      <h4>Free</h4>
                                  </div>
                                  <span className="icon-frame d-flex align-items-center justify-content-center">
                                      <img src="assets/img/icons/price-01.svg" alt="img" />
                                  </span>
                              </div>
                          </div>
                          <p>Lorem ipsum dolor sit amet doloroli sitiol conse ctetur </p>
                          <h2>$0.00</h2>
                          <h6>What’s included</h6>
                          <ul>
                              <li>
                                  <i className="fa-solid fa-circle-check" />2 Users
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />1 Suppliers
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  10 Products
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />1 Invoice
                              </li>
                          </ul>
                          <div className="d-flex justify-content-center package-edit">
                              <a
                                  className="btn-action-icon me-2"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit_package"
                              >
                                  <i className="fe fe-edit" />
                              </a>
                              <a
                                  className="btn-action-icon"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                              >
                                  <i className="fe fe-trash-2" />
                              </a>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      <div className="packages card">
                          <div className="package-header d-flex justify-content-between">
                              <div className="d-flex justify-content-between w-100">
                                  <div className="">
                                      <h6>Yearly</h6>
                                      <h4>Basic</h4>
                                  </div>
                                  <span className="icon-frame d-flex align-items-center justify-content-center">
                                      <img src="assets/img/icons/price-02.svg" alt="img" />
                                  </span>
                              </div>
                          </div>
                          <p>Lorem ipsum dolor sit amet doloroli sitiol conse ctetur </p>
                          <h2>$19.99</h2>
                          <h6>What’s included</h6>
                          <ul>
                              <li>
                                  <i className="fa-solid fa-circle-check" />5 Users
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />5 Suppliers
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  100 Products
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  10 Invoice
                              </li>
                          </ul>
                          <div className="d-flex justify-content-center package-edit">
                              <a
                                  className="btn-action-icon me-2"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit_package"
                              >
                                  <i className="fe fe-edit" />
                              </a>
                              <a
                                  className="btn-action-icon"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                              >
                                  <i className="fe fe-trash-2" />
                              </a>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      <div className="packages card">
                          <div className="package-header d-flex justify-content-between">
                              <div className="d-flex justify-content-between w-100">
                                  <div className="">
                                      <h6>Lifetime</h6>
                                      <h4>Premium</h4>
                                  </div>
                                  <span className="icon-frame d-flex align-items-center justify-content-center">
                                      <img src="assets/img/icons/price-03.svg" alt="img" />
                                  </span>
                              </div>
                          </div>
                          <span className="recommend-text">Recommended</span>
                          <p>Lorem ipsum dolor sit amet doloroli sitiol conse ctetur </p>
                          <h2>$6549.99</h2>
                          <h6>What’s included</h6>
                          <ul>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  50 Users
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  10 Suppliers
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  1000 Products
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  1000 Invoice
                              </li>
                          </ul>
                          <div className="d-flex justify-content-center package-edit">
                              <a
                                  className="btn-action-icon me-2"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit_package"
                              >
                                  <i className="fe fe-edit" />
                              </a>
                              <a
                                  className="btn-action-icon"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                              >
                                  <i className="fe fe-trash-2" />
                              </a>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                      <div className="packages card">
                          <div className="package-header d-flex justify-content-between">
                              <div className="d-flex justify-content-between w-100">
                                  <div className="">
                                      <h6>Yearly</h6>
                                      <h4>Enterprise</h4>
                                  </div>
                                  <span className="icon-frame d-flex align-items-center justify-content-center">
                                      <img src="assets/img/icons/price-04.svg" alt="img" />
                                  </span>
                              </div>
                          </div>
                          <p>Lorem ipsum dolor sit amet doloroli sitiol conse ctetur </p>
                          <h2>$99.99</h2>
                          <h6>What’s included</h6>
                          <ul>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  1000 Users
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  Unlimited Suppliers
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  Unlimited Products
                              </li>
                              <li>
                                  <i className="fa-solid fa-circle-check" />
                                  Unlimited Invoice
                              </li>
                          </ul>
                          <div className="d-flex justify-content-center package-edit">
                              <a
                                  className="btn-action-icon me-2"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit_package"
                              >
                                  <i className="fe fe-edit" />
                              </a>
                              <a
                                  className="btn-action-icon"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                              >
                                  <i className="fe fe-trash-2" />
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      
    </div>
  )
}

export default Strategies