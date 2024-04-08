import React from 'react'

const wallets = () => {
  return (
    <div>
      <div className="">
        <div className="card">
          <div className="card-body w-100">

            <div className="owl-carousel" id="plan-billing-slider">
              <div className="owl-carousel-item">
                <div className="packages card active">
                  <div className="package-header d-sm-flex justify-content-between mb-0">
                    <div className="d-sm-flex">

                      <div className="">
                        <h5>
                          Current Balance:

                          <span className='ms-1'><b>₹500</b></span>
                        </h5>
                        <div>

                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className=" card-table">
                  <div className="card-body">
                    <div className="table-responsive table-plan-billing">
                      <table className="table table-center table-hover datatable">
                        <thead className="thead-light">
                          <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Bank Name </th>
                            <th>A/c Number</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>13 Aug 2023</td>
                            <td>
                              ENTERPRISE
                              <p>lifetime</p>
                            </td>
                            <td>12345678901</td>
                            <td>
                              <a
                                className=" btn-action-icon me-2"
                                href="javascript:void(0);"
                                download=""
                              >
                                <i className="fa-solid fa-up-long up"></i>
                              </a>
                            </td>
                            <td>₹2000<span class="badge bg-success ms-1" >
                              cr.
                            </span></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>13 Aug 2023</td>
                            <td>
                              FREE TRAIL
                              <p>monthly</p>
                            </td>
                            <td>12345678901</td>
                            <td>
                              <a
                                className=" btn-action-icon me-2"
                                href="javascript:void(0);"
                                download=""
                              >
                                <i class="fa-solid fa-down-long down"></i>
                              </a>
                            </td>
                            <td>₹2000<span class="badge bg-danger ms-1" >
                              db.
                            </span></td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>13 Aug 2023</td>
                            <td>
                              Basic
                              <p>Yearly</p>
                            </td>
                            <td>12345678901</td>
                            <td>
                              <a
                                className=" btn-action-icon me-2"
                                href="javascript:void(0);"
                                download=""
                              >
                                <i class="fa-solid fa-up-long up"></i>
                              </a>
                            </td>
                            <td>₹2000<span class="badge bg-success ms-1" >
                              cr.
                            </span></td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>13 Aug 2023</td>
                            <td>
                              ENTERPRISE
                              <p>lifetime</p>
                            </td>
                            <td>12345678901</td>
                            <td>
                              <a
                                className=" btn-action-icon me-2"
                                href="javascript:void(0);"
                                download=""
                              >
                                <i class="fa-solid fa-down-long down"></i>
                              </a>
                            </td>
                            <td>₹2000<span class="badge bg-danger ms-1" >
                              db.
                            </span></td>
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
      </div>

    </div>
  )
}

export default wallets
