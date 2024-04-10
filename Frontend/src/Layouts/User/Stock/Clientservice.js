import React from 'react'

function Clientservice() {
  return (
    <>
    <div className="content container-fluid">
      <div className="content-page-header mt-2">
        <h5>Stock List</h5>
      </div>
      <div className="form-group-item">
        <div className="card-table">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-center table-hover datatable">
                <thead className="thead-light">
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
                  <tr>
                    <td>1</td>
                    <td>ABB[O]</td>
                    <td>250</td>
                    <td>500</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </td>

                    <td>
                      250
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">jhg</option>
                        <option value="2">RSI</option>

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
                        <input id="rating_1" className="check" type="checkbox" defaultChecked="" />
                        <label htmlFor="rating_1" className="checktoggle checkbox-bg">
                          checkbox
                        </label>
                      </div>

                    </td>





                  </tr>
                  <tr>
                    <td>2</td>
                    <td>AXISBANK[O]</td>
                    <td>625</td>
                    <td>625</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </td>

                    <td>
                      625
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">jhg</option>
                        <option value="2">RSI</option>

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
                        <input id="rating_2" className="check" type="checkbox" defaultChecked="" />
                        <label htmlFor="rating_2" className="checktoggle checkbox-bg">
                          checkbox
                        </label>
                      </div>

                    </td>




                  </tr>
                  <tr>
                    <td>3</td>
                    <td>BANKNIFTY[O]</td>
                    <td>15</td>
                    <td>150</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </td>

                    <td>
                      15
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">jhg</option>
                        <option value="2">RSI</option>

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
                        <input id="rating_3" className="check" type="checkbox" defaultChecked="" />
                        <label htmlFor="rating_3" className="checktoggle checkbox-bg">
                          checkbox
                        </label>
                      </div>

                    </td>





                  </tr>
                  <tr>
                    <td>4</td>
                    <td>CRUDEOIL[MO]</td>
                    <td>100</td>
                    <td>100</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </td>

                    <td>
                      100
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">jhg</option>
                        <option value="2">RSI</option>

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
                        <input id="rating_4" className="check" type="checkbox" defaultChecked="" />
                        <label htmlFor="rating_4" className="checktoggle checkbox-bg">
                          checkbox
                        </label>
                      </div>

                    </td>





                  </tr>
                  <tr>
                    <td>5</td>
                    <td>CRUDEOIL[MO]</td>
                    <td>100</td>
                    <td>100</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </td>

                    <td>
                      100
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">jhg</option>
                        <option value="2">RSI</option>

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
                        <input id="rating_5" className="check" type="checkbox" defaultChecked="" />
                        <label htmlFor="rating_5" className="checktoggle checkbox-bg">
                          checkbox
                        </label>
                      </div>

                    </td>




                  </tr>
                  <tr>
                    <td>6</td>
                    <td>CRUDEOIL[MO]</td>
                    <td>100</td>
                    <td>100</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </td>

                    <td>
                      100
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">jhg</option>
                        <option value="2">RSI</option>

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
                        <input id="rating_6" className="check" type="checkbox" defaultChecked="" />
                        <label htmlFor="rating_6" className="checktoggle checkbox-bg">
                          checkbox
                        </label>
                      </div>

                    </td>





                  </tr>
                  <tr>
                    <td>7</td>
                    <td>CRUDEOIL[MO]</td>
                    <td>100</td>
                    <td>100</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                      />
                    </td>

                    <td>
                      100
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">jhg</option>
                        <option value="2">RSI</option>

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
                        <input id="rating_7" className="check" type="checkbox" defaultChecked="" />
                        <label htmlFor="rating_7" className="checktoggle checkbox-bg">
                          checkbox
                        </label>
                      </div>

                    </td>




                  </tr>






                </tbody>
                <div className='ms-2 mt-2 mb-2'>

                  <button className='btn btn-primary'>Update</button>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Clientservice