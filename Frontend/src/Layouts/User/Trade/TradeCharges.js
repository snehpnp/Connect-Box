import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import Loader from "../../../Utils/Loader";
import { fDateTime } from "../../../Utils/Date_formet";
import CompanyChange from "../../../Components/ExtraComponents/Models/CompanyChange";
import { IndianRupee } from "lucide-react";
import ExportToExcel from "../../../Utils/ExportCSV"
import { UserTrade } from "../../../ReduxStore/Slice/Users/ClientServiceSlice";
const TradeCharges = () => {
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const subadmin_service_type = JSON.parse(
    localStorage.getItem("user_details")
  ).subadmin_service_type;

  const [searchInput, setSearchInput] = useState('');
  const [refresh, setrefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [companyData, setCompanyData] = useState({
    loading: false,
    data: [],
  });

  const handleOpenModal = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };



  let stg_total = 0;
  let user_charge_total = 0;

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    card: {
      width: "auto",
    },
    boldHeader: {
      fontWeight: "bold",
    },
    headerButton: {
      marginRight: 12,
    },
  };

  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 130,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.value + 1}</b>
        </div>
      ),
    },

    {
      field: "UserName",
      headerName: "UserName",
      width: 230,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div title={params.value}>{params.value || "-"}</div>
      ),
    },

    {
      field: "order_id",
      headerName: "Order Id",
      width: 240,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div title={params.value}>{params.value || "-"}</div>
      ),
    },

    {
      field: "user_charge",
      headerName: "Trade Charge",
      width: 210,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{params.value || "-"}</div>,
    },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 220,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value)}</div>,
    },

  ];

  if (subadmin_service_type == 1) {
    columns = columns.filter((column) => column.field !== "User_charge");
  }

  const getCompanyData = async () => {
    var data = { id: user_id };
    await dispatch(UserTrade(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const formattedData = response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          const filterData = formattedData.filter((item) => {
            const searchInputMatch =
              searchInput == '' ||
              item.UserName.toLowerCase().includes(searchInput.toLowerCase())


            return searchInputMatch
          })

          setCompanyData({
            loading: true,
            data: searchInput ? filterData : formattedData,
          });
        } else {
          setCompanyData({
            loading: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };


  companyData.data &&
    companyData.data.forEach((item) => {
      if (
        !isNaN(item.user_charge) &&
        item.user_charge !== null &&
        item.user_charge !== ""
      ) {
        stg_total += parseInt(item.user_charge);
      }

      if (
        !isNaN(item.user_charge) &&
        item.user_charge !== null &&
        item.user_charge !== ""
      ) {
        user_charge_total += parseInt(item.user_charge);
      }
    });

  useEffect(() => {
    getCompanyData();
  }, [refresh, searchInput]);

  const handleRefresh = () => {
    setSearchInput("");
    setrefresh(!refresh);
  };
  return (
    <>
      {companyData && companyData.loading ? (
        <div className="content container-fluid" data-aos="fade-left">
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="card-title mb-0">
                    <i className="fe fe-users pe-2"></i>
                    Trade Charges
                  </h5>
                </div>
                <div className="col-auto">
                  <div className="list-btn">
                    <ul className="filter-list mb-0">
                      <li className="">
                        <p
                          className="btn-filters mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Refresh"
                          onClick={handleRefresh}
                        >
                          <span>
                            <i className="fe fe-refresh-ccw" />
                          </span>
                        </p>
                      </li>
                      <li className="serach-li">
                        <div className="input-group input-block">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search"
                            aria-describedby="search-addon"
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
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
                          <ExportToExcel
                            className="btn btn-primary "
                            // apiData={ForGetCSV}
                            fileName={"Payment Details"}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="super-admin-list-head">
                <div className="row">
                  {[
                    { name: "Total Balance", icon: "fe fe-package", value: companyData && companyData.data[0].Balance },
                    { name: "Used Balance", icon: "fe fe-list", value: stg_total },
                    { name: "Remaining Balance", icon: "fe fe-pause-circle", value: Number(companyData && companyData.data[0].Balance || 0) - stg_total },
                    { name: "Wallet", icon: "fe fe-wallet" }
                  ].map((item, index) => (
                    <div className="col-xl-3 col-md-6 d-flex" key={index}>
                      <div className="card w-100" style={index === 3 ? { boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' } : {}}>
                        <div className="">
                          <div className={`grid-info-item ${index === 3 ? "total-type" : index === 0 ? "total-plane" : index === 1 ? "active-plane" : "inactive-plane"}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div className="grid-info">
                              <span>{item.name}</span>
                              {index === 3 ? (
                                <>
                                  <h4 style={{ marginBottom: '0', fontSize: '1.25rem', color: '#333' }}>{item.name}</h4>
                                  <span style={{ color: '#777', fontSize: '0.875rem' }}>Manage your funds</span>
                                </>
                              ) : (
                                <h4>{item.value}</h4>

                              )}
                            </div>
                            <div className="grid-head-icon">
                              <i className={item.icon} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <FullDataTable
                styles={styles}
                columns={columns}
                rows={companyData && companyData.data}
                checkboxSelection={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {isModalOpen && selectedRow && (
        <CompanyChange
          rowData={selectedRow}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default TradeCharges
