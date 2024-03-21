import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function System() {
  return (
   
      <div className="content container-fluid">
        <div class="page-header">
          <div class="content-page-header">
            <h5>System Information</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-4" data-aos="fade-right">
            <div className="card">
              <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid flex-column border">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#solid-tab1"
                      data-bs-toggle="tab"
                    >
                      Company Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#solid-tab2"
                      data-bs-toggle="tab"
                    >
                      Email Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#solid-tab3"
                      data-bs-toggle="tab"
                    >
                      Background Images
                    </a>
                  </li>
                </ul>
              </div>
            </div>
             <div className="card">
            <div data-aos="fade-down" className="gif-div card-body"style={{height:'200px'}}>
            <iframe src="https://lottie.host/embed/f3fed07f-0f56-45f1-ae1f-8e87bad0c51b/q3MDJRT4iV.json"></iframe>            </div>
          </div>
          </div>
          <div className="col-lg-8 col-md-8" data-aos="fade-left">
            <div className="card ">
              <div className="card-body ">
                <div className="tab-content">
                  <div className="tab-pane show active" id="solid-tab1">
                    <table className="table table-inbox table-hover">
                      <thead>
                        <tr>
                          <td>
                            <div className="pay-btn text-end ">
                              <button className="btn btn-primary ">
                                Edit Customer Information
                              </button>
                            </div>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="invoice-total-box">
                              <div className="invoice-total-inner">
                                <p>
                                  Company ID <span>$120.00</span>
                                </p>
                                <p>
                                  Company Name <span>$13.20</span>
                                </p>
                                <p>
                                  Panel Key <span>$0.00</span>
                                </p>
                                <p>
                                  Company Short Name <span>$0.00</span>
                                </p>
                                <p>
                                  Version <span>$0.00</span>
                                </p>
                                <p>
                                  Action <span>$0.00</span>
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tab-pane" id="solid-tab2">
                  <table className="table table-inbox table-hover">
                      <thead>
                        <tr>
                          <td>
                    <div className="pay-btn text-end ">
                      <button className="btn btn-primary ">
                        Edit Email Information
                      </button>
                    </div>
                   </td>
                   </tr>
                   </thead>
                   <tbody>
                    <tr>
                      <td>
                      <div className="invoice-total-box">
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
                      </td>
                    </tr>
                   </tbody>
                    </table>
                  </div>
                  <div className="tab-pane" id="solid-tab3">
                  <table className="table table-inbox table-hover">
                      <thead>
                        <tr>
                          <td>
                    <div className="pay-btn text-end">
                      <button className="btn btn-primary ">
                        Update Images
                      </button>
                    </div>
</td>
</tr>
</thead>
<tbody>
<tr>
  <td>
  <div className="invoice-total-box">
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
    
  );
}

export default System;
