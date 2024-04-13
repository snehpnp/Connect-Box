import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { GetAllclientDetails } from '../../../ReduxStore/Slice/Users/ClientServiceSlice'
import Loader from "../../../Utils/Loader";




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
    <>

      <div className="content container-fluid">
        <div className="content-page-header mt-2">
          <h5>Stock List</h5>
        </div>
        {getAllClientService.loading ?
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
                  </table>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
          </div>
          :
          <Loader />
        }
      </div>
    </>

  );
}

export default Clientservice;
