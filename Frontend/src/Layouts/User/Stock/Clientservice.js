import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { GetAllclientDetails } from '../../../ReduxStore/Slice/Users/ClientServiceSlice'




function Clientservice() {
  const dispatch = useDispatch()
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const [getAllClientService, setAllClientService] = useState({
    loading: false,
    data: []
  })


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
          <div className="form-group-item">
            <div className="card-table">
              <div className="card-body">
                <div>
                  {/* <table className="table table-center table-hover datatable">
                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff", height: "50px" }}>
                  <tr>
                    <th>#</th>
                    <th>Symbol</th>
                    <th>Lot Size</th>
                    <th>Max Qty</th>
                    <th>Lot Size</th>
                    <th>Quantity</th>
                    <th>Strategy</th>
                    <th>Order Type</th>
                    <th>Product Type</th>
                    <th>Trading</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getAllClientService.data.services && getAllClientService.data.services.map((item, index) => (
                      <>
                        <tr>
                          <td>{index}</td>
                          <td>{item.service.name}</td>
                          <td>{item.service.lotsize}</td>
                          <td>500</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              defaultValue={1}
                            />
                          </td>
                          <td>250</td>
                          <td>
                            <select className="form-select" aria-label="Default select example">
                              <option
                                value={getAllClientService.data.strategy.map((data) => { if (data.result._id.includes(item.strategy_id[0])) return data.result._id })}
                                className="text-success h6"
                                selected

                              >
                                {getAllClientService.data.strategy.map((data) => { if (data.result._id.includes(item.strategy_id[0])) return data.result.strategy_name })}
                              </option>

                              {
                                getAllClientService.data.strategy.map((data, index) => {
                                  if (data.result._id.includes(item.strategy_id[0])) {

                                  }
                                  else {
                                    return <option value={index} className='text-danger'>{data.result.strategy_name}</option>

                                  }


                                })}



                            </select>
                          </td>
                          <td>
                            <select className="form-select" aria-label="Default select example">
                              <option selected>Stoploss Market</option>
                              <option value="1">Market</option>
                              <option value="2">Limit</option>
                              <option value="3">Stoploss Limit</option>
                            </select>
                          </td>
                          <td>
                            <select className="form-select" aria-label="Default select example">
                              <option selected>MIS</option>
                              <option value="1">CNC</option>
                              <option value="2">BO</option>
                              <option value="3">So</option>
                            </select>
                          </td>
                          <td>
                            <div className="status-toggle">
                              <input id={`rating_${index}`} className="check" type="checkbox" defaultChecked="" />
                              <label htmlFor={`rating_${index}`} className="checktoggle checkbox-bg">
                                checkbox
                              </label>
                            </div>
                          </td>
                        </tr>
                      </>

                    ))}
                </tbody>
              </table> */}
                  <section className="pricing-section p-0">
                    <div className="container">
                      <div className="sec-title mb-4">
                        <h3></h3>
                      </div>
                      <div className="outer-box">
                        <div className="row">
                          {/* Pricing Block */}
                          <div className="pricing-block col-lg-3 col-md-6 col-sm-12 wow fadeInUp">
                            <div className="inner-box">
                              <div className="icon-box">
                                <div className="icon-outer">
                                  <i className="fas fa-paper-plane" />
                                </div>
                              </div>
                              <div className="price-box">
                                <div className="title">BANKNIFTY</div>
                                <div className="d-flex justify-content-center price">
                                  <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />

                                  </div>
                                </div>

                              </div>
                              <ul className="features">
                                <li className="true">Lot Size: 15</li>
                                <li className="true">Max Qty: 500</li>
                                <li className="true">Lot Size: 1</li>
                                <li className="true">Quantity: 250</li>
                                <li className="true"> <select className="form-select" aria-label="Default select example">
                                  <option selected>Stoploss Market</option>
                                  <option value="1">Market</option>
                                  <option value="2">Limit</option>
                                  <option value="3">Stoploss Limit</option>
                                </select></li>
                                <li>
                                  <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                      Dropdown button
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>

                                    </ul>

                                  </div>
                                </li>
                              </ul>

                            </div>
                          </div>
                          {/* Pricing Block */}
                          <div
                            className="pricing-block col-lg-3 col-md-6 col-sm-12 wow fadeInUp"
                            data-wow-delay="400ms"
                          >
                            <div className="inner-box">
                              <div className="icon-box">
                                <div className="icon-outer">
                                  <i className="fas fa-gem" />
                                </div>
                              </div>
                              <div className="price-box">
                                <div className="title">Nifty</div>
                                <div className="d-flex justify-content-center price">
                                  <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                  </div>
                                </div>
                              </div>
                              <ul className="features">
                                <li className="true">Lot Size: 15</li>
                                <li className="true">Max Qty: 500</li>
                                <li className="true">Lot Size: 1</li>
                                <li className="true">Quantity: 250</li>
                                <li className="true"> <select className="form-select" aria-label="Default select example">
                                  <option selected>Stoploss Market</option>
                                  <option value="1">Market</option>
                                  <option value="2">Limit</option>
                                  <option value="3">Stoploss Limit</option>
                                </select></li>
                                <li>
                                  <div class="dropdown">
                                    <button class="btn btn-primary  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                      Dropdown button
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>

                                    </ul>

                                  </div>
                                </li>
                              </ul>

                            </div>
                          </div>
                          {/* Pricing Block */}
                          <div
                            className="pricing-block col-lg-3 col-md-6 col-sm-12 wow fadeInUp"
                            data-wow-delay="800ms"
                          >
                            <div className="inner-box">
                              <div className="icon-box">
                                <div className="icon-outer">
                                  <i className="fas fa-rocket" />
                                </div>
                              </div>
                              <div className="price-box">
                                <div className="title">Nifty 50</div>
                                <div className="d-flex justify-content-center price">
                                  <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />

                                  </div>
                                </div>
                              </div>
                              <ul className="features">
                                <li className="true">Lot Size: 15</li>
                                <li className="true">Max Qty: 500</li>
                                <li className="true">Lot Size: 1</li>
                                <li className="true">Quantity: 250</li>
                                <li className="true"> <select className="form-select" aria-label="Default select example">
                                  <option selected>Stoploss Market</option>
                                  <option value="1">Market</option>
                                  <option value="2">Limit</option>
                                  <option value="3">Stoploss Limit</option>
                                </select></li>
                                <li>
                                  <div class="dropdown">
                                    <button class="btn btn-primary  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                      Dropdown button
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>

                                    </ul>

                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div
                            className="pricing-block col-lg-3 col-md-6 col-sm-12 wow fadeInUp"
                            data-wow-delay="800ms"
                          >
                            <div className="inner-box">
                              <div className="icon-box">
                                <div className="icon-outer">
                                  <i className="fas fa-rocket" />
                                </div>
                              </div>
                              <div className="price-box">
                                <div className="title">Nifty 50</div>
                                <div className="d-flex justify-content-center price">
                                  <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />

                                  </div>
                                </div>
                              </div>
                              <ul className="features">
                                <li className="true">Lot Size: 15</li>
                                <li className="true">Max Qty: 500</li>
                                <li className="true">Lot Size: 1</li>
                                <li className="true">Quantity: 250</li>
                                <li className="true"> <select className="form-select" aria-label="Default select example">
                                  <option selected>Stoploss Market</option>
                                  <option value="1">Market</option>
                                  <option value="2">Limit</option>
                                  <option value="3">Stoploss Limit</option>
                                </select></li>
                                <li>
                                  <div class="dropdown">
                                    <button class="btn btn-primary  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                      Dropdown button
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>
                                      <li> <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">Check me</label>
                                      </div></li>

                                    </ul>

                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientservice;