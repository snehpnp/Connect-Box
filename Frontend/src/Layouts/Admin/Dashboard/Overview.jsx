import React from 'react'

const Overview = () => {

  const cardsData = [
    {
      iconClass: "fas fa-users",
      title: "Total Subadmins",
      count: "1,642",
      progress: 75,
      arrowIcon: "fas fa-arrow-down",
      percentageChange: "1.15%",
      sinceLastWeek: "since last week",
      progressBarClass: "bg-5"
    },
    {
      iconClass: "fas fa-users",
      title: "Active Subadmins",
      count: "3,642",
      progress: 65,
      arrowIcon: "fas fa-arrow-up",
      percentageChange: "2.37%",
      sinceLastWeek: "since last week",
      progressBarClass: "bg-6"
    },
    {
      iconClass: "fas fa-users",
      title: "Inactive Subadmins",
      count: "1,041",
      progress: 85,
      arrowIcon: "fas fa-arrow-up",
      percentageChange: "3.77%",
      sinceLastWeek: "since last week",
      progressBarClass: "bg-7"
    },
    {
      iconClass: "fas fa-users",
      title: "Total Users",
      count: "1,642",
      progress: 75,
      arrowIcon: "fas fa-arrow-down",
      percentageChange: "1.15%",
      sinceLastWeek: "since last week",
      progressBarClass: "bg-5"
    },
    {
      iconClass: "fas fa-users",
      title: "Active Users",
      count: "3,642",
      progress: 65,
      arrowIcon: "fas fa-arrow-up",
      percentageChange: "2.37%",
      sinceLastWeek: "since last week",
      progressBarClass: "bg-6"
    },
    {
      iconClass: "fas fa-users",
      title: "Inactive Users",
      count: "1,041",
      progress: 85,
      arrowIcon: "fas fa-arrow-up",
      percentageChange: "3.77%",
      sinceLastWeek: "since last week",
      progressBarClass: "bg-7"
    }
  ];

  return (
    <div className="main-wrapper">
      <div >
        <div className="content container-fluid">

          <div className='row'>

            <div className='col-md-3'>
              <div className='card'>
                <div className="col card-header">
                  <h5 className="card-title">Admin Dashboard</h5>
                </div>
                <div data-aos="fade-down" className="gif-div " style={{ height: '300px' }}>
                  <iframe src="https://lottie.host/embed/1bc48686-c5b0-401d-ae40-9b241c697e31/qa4LRQq6FD.json"></iframe>
                </div>
              </div>
            </div>

            <div className='col-md-9'>

              <div className="row" data-aos="fade-down">
                {cardsData.map((data, index) => (
                  <div className="col-xl-4 col-sm-6 col-12" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <div className="dash-widget-header">
                          <span className={`dash-widget-icon ${data.progressBarClass}`}>
                            <i className={data.iconClass} />
                          </span>
                          <div className="dash-count">
                            <div className="dash-title">{data.title}</div>
                            <div className="dash-counts">
                              <p>{data.count}</p>
                            </div>
                          </div>
                        </div>
                        <div className="progress progress-sm mt-3">
                          <div
                            className={`progress-bar ${data.progressBarClass}`}
                            role="progressbar"
                            style={{ width: `${data.progress}%` }}
                            aria-valuenow={data.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="text-muted mt-3 mb-0">
                          <span className="text-success me-1">
                            <i className={data.arrowIcon} />
                            {data.percentageChange}
                          </span>{" "}
                          {data.sinceLastWeek}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* <div className="row" data-aos="fade-left">

            <div className="col-xl-12 d-flex">
              <div className="card mb-0">
                <div className="card-header">
                  <div className="row align-center">
                    <div className="col">
                      <h5 className="card-title">Recent Invoices</h5>
                    </div>
                    <div className="col-auto">
                      <a
                        href="invoices.html"
                        className="btn-right btn btn-sm btn-outline-primary"
                      >
                        View All
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="progress progress-md rounded-pill mb-3">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "47%" }}
                        aria-valuenow={47}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "28%" }}
                        aria-valuenow={28}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "15%" }}
                        aria-valuenow={15}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: "10%" }}
                        aria-valuenow={10}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="row">
                      <div className="col-auto">
                        <i className="fas fa-circle text-success me-1" /> Paid
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-circle text-warning me-1" />{" "}
                        Unpaid
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-circle text-danger me-1" />{" "}
                        Overdue
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-circle text-info me-1" /> Draft
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-stripped table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="profile.html">
                                <img
                                  className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="User Image"
                                />
                                Barbara Moore
                              </a>
                            </h2>
                          </td>
                          <td>$118</td>
                          <td>23 Nov 2020</td>
                          <td>
                            <span className="badge bg-success-light">
                              Paid
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="/"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-h" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a
                                  className="dropdown-item"
                                  href="edit-invoice.html"
                                >
                                  <i className="far fa-edit me-2" />
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="invoice-details.html"
                                >
                                  <i className="far fa-eye me-2" />
                                  View
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-trash-alt me-2" />
                                  Delete
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-check-circle me-2" />
                                  Mark as sent
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-paper-plane me-2" />
                                  Send Invoice
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-copy me-2" />
                                  Clone Invoice
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="profile.html">
                                <img
                                  className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                  src="assets/img/profiles/avatar-06.jpg"
                                  alt="User Image"
                                />
                                Karlene Chaidez
                              </a>
                            </h2>
                          </td>
                          <td>$222</td>
                          <td>18 Nov 2020</td>
                          <td>
                            <span className="badge bg-info-light text-info">
                              Sent
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="/"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-h" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a
                                  className="dropdown-item"
                                  href="edit-invoice.html"
                                >
                                  <i className="far fa-edit me-2" />
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="invoice-details.html"
                                >
                                  <i className="far fa-eye me-2" />
                                  View
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-trash-alt me-2" />
                                  Delete
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-check-circle me-2" />
                                  Mark as sent
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-paper-plane me-2" />
                                  Send Invoice
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-copy me-2" />
                                  Clone Invoice
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="profile.html">
                                <img
                                  className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                  src="assets/img/profiles/avatar-08.jpg"
                                  alt="User Image"
                                />
                                Russell Copeland
                              </a>
                            </h2>
                          </td>
                          <td>$347</td>
                          <td>10 Nov 2020</td>
                          <td>
                            <span className="badge bg-warning-light text-warning">
                              Partially Paid
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="/"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-h" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a
                                  className="dropdown-item"
                                  href="edit-invoice.html"
                                >
                                  <i className="far fa-edit me-2" />
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="invoice-details.html"
                                >
                                  <i className="far fa-eye me-2" />
                                  View
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-trash-alt me-2" />
                                  Delete
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-check-circle me-2" />
                                  Mark as sent
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-paper-plane me-2" />
                                  Send Invoice
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-copy me-2" />
                                  Clone Invoice
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="profile.html">
                                <img
                                  className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                  src="assets/img/profiles/avatar-10.jpg"
                                  alt="User Image"
                                />
                                Joseph Collins
                              </a>
                            </h2>
                          </td>
                          <td>$826</td>
                          <td>25 Sep 2020</td>
                          <td>
                            <span className="badge bg-danger-light">
                              Overdue
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="/"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-h" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a
                                  className="dropdown-item"
                                  href="edit-invoice.html"
                                >
                                  <i className="far fa-edit me-2" />
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="invoice-details.html"
                                >
                                  <i className="far fa-eye me-2" />
                                  View
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-trash-alt me-2" />
                                  Delete
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-check-circle me-2" />
                                  Mark as sent
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-paper-plane me-2" />
                                  Send Invoice
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-copy me-2" />
                                  Clone Invoice
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="profile.html">
                                <img
                                  className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                  src="assets/img/profiles/avatar-11.jpg"
                                  alt="User Image"
                                />
                                Jennifer Floyd
                              </a>
                            </h2>
                          </td>
                          <td>$519</td>
                          <td>18 Sep 2020</td>
                          <td>
                            <span className="badge bg-success-light">
                              Paid
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a
                                href="/"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-h" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a
                                  className="dropdown-item"
                                  href="edit-invoice.html"
                                >
                                  <i className="far fa-edit me-2" />
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="invoice-details.html"
                                >
                                  <i className="far fa-eye me-2" />
                                  View
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-trash-alt me-2" />
                                  Delete
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-check-circle me-2" />
                                  Mark as sent
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-paper-plane me-2" />
                                  Send Invoice
                                </a>
                                <a
                                  className="dropdown-item"

                                >
                                  <i className="far fa-copy me-2" />
                                  Clone Invoice
                                </a>
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
            
          </div> */}





          <div className="row" data-aos="fade-left">
            <div className="col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Invoice Analytics</h5>
                    <div className="dropdown main">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Monthly
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a

                            className="dropdown-item"
                          >
                            Weekly
                          </a>
                        </li>
                        <li>
                          <a

                            className="dropdown-item"
                          >
                            Monthly
                          </a>
                        </li>
                        <li>
                          <a

                            className="dropdown-item"
                          >
                            Yearly
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="invoice_chart" />
                  <div className="text-center text-muted">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-4">
                          <p className="mb-2 text-truncate">
                            <i className="fas fa-circle text-primary me-1" />{" "}
                            Invoiced
                          </p>
                          <h5>$2,132</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-4">
                          <p className="mb-2 text-truncate">
                            <i className="fas fa-circle text-success me-1" />{" "}
                            Received
                          </p>
                          <h5>$1,763</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-4">
                          <p className="mb-2 text-truncate">
                            <i className="fas fa-circle text-danger me-1" />{" "}
                            Pending
                          </p>
                          <h5>$973</h5>
                        </div>
                      </div>
                    </div>
                    <div className='gif-div' style={{ height: '400px', marginTop: '-60px' }}>

                      <iframe src="https://lottie.host/embed/703aa556-aee8-45e4-a279-c6b636b0542f/rTWOHxoaxl.json"></iframe>
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

export default Overview