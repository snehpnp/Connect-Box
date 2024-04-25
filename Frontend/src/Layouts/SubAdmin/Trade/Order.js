import React, { useState, useEffect } from "react";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import ExportToExcel from "../../../Utils/ExportCSV";
import toast from "react-hot-toast";
import { Orders_Details } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { useDispatch } from "react-redux";

function GroupStrategy() {
  const dispatch = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const [tableData, setTableData] = useState("");

  const userDataRes = async () => {
    const subadminId= userDetails.user_id 
    await dispatch(Orders_Details({ subadminId }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setTableData(response.data);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(()=>{
    userDataRes()
  },[])


  return (
    <>
      <div className="content container-fluid">
        {/* PAGE HEADER */}
        <div className="page-header">
          <div className="content-page-header">
            <h5>All Trades</h5>
            <div className="page-content">
              <div className="list-btn">
                <ul className="filter-list">
                  <li className="mt-3">
                    <p
                      className="btn-filters"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Refresh"
                      // onClick={RefreshHandle}
                    >
                      <span>
                        <i className="fe fe-refresh-ccw" />
                      </span>
                    </p>
                  </li>
                  <li>
                    <div className="input-group input-block">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="search-addon"
                        // onChange={(e) => SetInputSearch(e.target.value || '')}
                        // value={inputSearch}
                      />
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown dropdown-action"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Download"
                    >
                      <li>
                        <div className="card-body">
                          <ExportToExcel
                            className="btn btn-primary "
                            // apiData={ForGetCSV}
                            fileName={"All Strategy"}
                          />
                        </div>
                      </li>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-body p-0 mr-2"
          style={{ maxHeight: "100%", overflowY: "auto" }}
        >
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Stock Symbol</th>
                  <th>Trade Type</th>
                  <th>Quantity</th>
                  <th>Strategy</th>
                  <th>Target Price</th>
                  <th>Segment</th>
                </tr>
              </thead>
              <tbody>
                {/* JavaScript loop */}
                {tableData && tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.symbol}</td>
                    <td>{data.TradeType}</td>
                    <td>{data.qty_percent}</td>
                    <td>{data.strategy}</td>
                    <td>{data.tr_price}</td>
                    <td>{data.segment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ToastButton />
      </div>
    </>
  );
}

export default GroupStrategy;
