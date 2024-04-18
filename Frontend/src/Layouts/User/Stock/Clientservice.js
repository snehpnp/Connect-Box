import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { GetAllclientDetails } from '../../../ReduxStore/Slice/Users/ClientServiceSlice'
import { SquarePen } from 'lucide-react';





function Clientservice() {
  const dispatch = useDispatch()
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const [getAllClientService, setAllClientService] = useState({
    loading: false,
    data: []
  })

  const [modal, setModal] = useState(false)
  const GetAllClientServiceDetails = async () => {

    var data = { user_Id: user_id };
    await dispatch(GetAllclientDetails(data)).unwrap()
      .then((response) => {

        if (response.status) {

          setAllClientService({
            loading: true,
            data: response
          })
        }
        else {
          setAllClientService({
            loading: false,
            data: []
          })

        }
      })
      .catch((error) => {
        console.log("Error is found in finding client service detail", error)
      })

  }

  useState(() => {
    GetAllClientServiceDetails();
  }, []);


  return (
    <div className="content container-fluid">
      <div className='card'>
        <div className="card-header">
          <h5 className='card-title'>Stock List</h5>
        </div>
        <div className='card-body'>
          <section className="pricing-section p-0">
            <div className="container">
              <div className="sec-title">
                <h3></h3>
              </div>
              <div className="outer-box">
                <div className="row">
                  {/* Pricing Block */}

                  {getAllClientService.data.services && getAllClientService.data.services.map((item, index) =>
                    <>
                      <div className="pricing-block col-lg-3 col-md-6 col-sm-12 wow fadeInUp">
                        <div className="inner-box">
                          <div className="icon-box">
                            <div className="icon-outer">
                              <i className="fas fa-paper-plane" />
                            </div>
                          </div>
                          <div className="price-box">
                            <div className="title">{item.service.name}</div>
                            <div className="d-flex justify-content-center price">
                              <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                              </div>
                            </div>

                          </div>
                          <ul className="features">
                            <li className="true">
                              <div className='d-flex justify-content-between'>
                                <p>Quantity:</p>
                                <p>250</p>
                              </div>
                            </li>




                            <li className="true">
                              <div className='d-flex justify-content-between'>
                                <p>Order Type:</p>
                                <p>Limit</p>
                              </div>
                            </li>
                            <li>
                              <div className='d-flex justify-content-between'>
                                <p>Product Type:</p>
                                <p>MIS</p>
                              </div>

                            </li>

                          </ul>
                          <div className="d-flex justify-content-center" onClick={(e) => setModal(!modal)}>
                            <SquarePen />
                          </div>


                        </div>
                      </div>

                    </>)
                  }




                </div>
              </div>
            </div>
          </section>
        </div>
      </div>


      {modal && (
        <div className="modal custom-modal d-block" id="add_vendor" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Vendor</h4>
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
                    <div className="col-lg-12 col-sm-12">
                      <div className="input-block mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                      <div className="input-block mb-3">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                      <div className="input-block mb-0">
                        <label>Closing Balance</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Closing Balance Amount"
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
                    Add Vendor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientservice;