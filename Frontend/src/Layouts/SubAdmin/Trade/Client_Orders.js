import React, { useState, useEffect } from "react";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import ExportToExcel from "../../../Utils/ExportCSV";
import toast from "react-hot-toast";
import { ClientsOrders_Details } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { useDispatch } from "react-redux";

function Client_Orders() {
  const dispatch = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const [tableData, setTableData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  const userDataRes = async () => {
    const subadminId = userDetails.user_id;
    await dispatch(ClientsOrders_Details({ subadminId }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setTableData(response.data);
          setFilteredData(response.data);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    userDataRes();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
    filterDataBySearch(event.target.value.toLowerCase());
  };

  const filterDataBySearch = (input) => {
    const filtered = tableData.filter((item) =>
      item.type.toLowerCase().includes(input) ||
      item.symbol.toLowerCase().includes(input) ||
      item.fullName.toLowerCase().includes(input)

    );
    setFilteredData(filtered);
  };

  const renderTableRows = () => {
    return filteredData.map((data, index) => (
        <tr key={index}>
        <td>{data.fullName}</td>
          <td>{data.symbol}</td>
          <td>{data.type}</td>
          <td>{data.qty_percent}</td>
          <td>{data.strategy}</td>
          <td>{data.tr_price}</td>
          <td>{data.segment}</td>
        </tr>
    ));
  };

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="content-page-header">
            <h5>Clients Orders</h5>
            <div className="page-content">
              <div className="list-btn">
                <ul className="filter-list">
                  <li className="mt-3">
                    <p
                      className="btn-filters"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Refresh"
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
                        placeholder="Search by type or symbol..."
                        aria-label="Search"
                        aria-describedby="search-addon"
                        value={searchInput}
                      onChange={handleSearchInputChange} 
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
                <th>Client Name</th>
                  <th>Stock Symbol</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Strategy</th>
                  <th>Target Price</th>
                  <th>Segment</th>
                </tr>
              </thead>
              <tbody>
            {filteredData.length > 0 ? renderTableRows() : (
              <tr>
                <td colSpan="2">No matching data found</td>
              </tr>
            )}
          </tbody>
            </table>
          </div>
        </div>

        <ToastButton />
      </div>
    </>
  );
}

export default Client_Orders;
