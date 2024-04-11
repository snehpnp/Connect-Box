import React from 'react';

function Clientservice() {
  return (
    <div className="content container-fluid">
      <div className="content-page-header mt-2">
        <h5>Stock List</h5>
      </div>
      <div className="form-group-item">
        <div className="card-table">
          <div className="card-body">
            <div className="table-responsive table-container scrollbar" id="style-8" style={{ maxHeight: "600px" }}>
              <table className="table table-center table-hover datatable">
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
                  {Array.from({ length: 20 }, (_, index) => (
                    <tr key={index}>
                      <td>{index}</td>
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
                      <td>250</td>
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
                          <input id={`rating_${index}`} className="check" type="checkbox" defaultChecked="" />
                          <label htmlFor={`rating_${index}`} className="checktoggle checkbox-bg">
                            checkbox
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientservice;
