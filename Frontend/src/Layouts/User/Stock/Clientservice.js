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
  const [modalData, setModalData] = useState({});
  console.log("modalData :", modalData)
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
                          <div className="d-flex justify-content-center" onClick={(e) => { setModal(!modal); setModalData(item) }}>
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
                  <h4 className="mb-0">Edit Stock List</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => setModal(!modal)}
                ></button>
              </div>
              <div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 mb-3">
                      <h6 style={{fontWeight:600, color:'black'}}>Symbol Name : {modalData.service.name}</h6>
                    </div>
                    <div className="col-lg-12 col-sm-12 d-flex">
                      <div className="col-lg-6 col-sm-12">
                        <h6>Lot Size : {modalData.quantity}</h6>
                      </div>
                      <div className="col-lg-6 col-sm-12 d-flex">
                        <h6 className='col-lg-4'>Max Qty	 :</h6>
                        <input type="text" className='col-lg-8 rounded px-2' defaultValue={1} />
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-12 d-flex mb-3 mt-3">
                      <h6 className='col-lg-6'>Strategy :</h6>
                      <select className="col-lg-6 rounded" >
                        
                        <option
                          value={getAllClientService.data.strategy.map((data) => { if (data.result._id.includes(modalData.strategy_id[0])) return data.result._id })}
                          className="text-success "
                          selected
                        >
                          {getAllClientService.data.strategy.map((data) => { if (data.result._id.includes(modalData.strategy_id[0])) return data.result.strategy_name })}
                        </option>
                        {
                          getAllClientService.data.strategy.map((data, index) => {
                            if (data.result._id.includes(modalData.strategy_id[0])) {
                            }
                            else {
                              return <option value={index} className='text-danger'>{data.result.strategy_name}</option>
                            }
                          })}
                      </select>
                    </div>
                    <div className="col-lg-12 col-sm-12 d-flex mb-3">
                      <h6 className='col-lg-6'>Order Type :</h6>
                      <select className="col-lg-6 rounded">
                        <option selected>Stoploss Market</option>
                        <option value="1">Market</option>
                        <option value="2">Limit</option>
                        <option value="3">Stoploss Limit</option>
                      </select>
                    </div>
                    <div className="col-lg-12 col-sm-12 d-flex mb-3">
                      <h6 className='col-lg-6'>Product Type :</h6>
                      <select className="col-lg-6 rounded">
                        <option selected>MIS</option>
                        <option value="1">CNC</option>
                        <option value="2">BO</option>
                        <option value="3">So</option>
                      </select>
                    </div>

                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-back cancel-btn me-2"
                    onClick={(e) => setModal(!modal)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary paid-continue-btn"
                    // onClick={}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientservice;