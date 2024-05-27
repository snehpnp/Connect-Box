import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import Loader from "../../../Utils/Loader";
import { fDateTime } from "../../../Utils/Date_formet";
import CompanyChange from "../../../Components/ExtraComponents/Models/CompanyChange";
import ExportToExcel from "../../../Utils/ExportCSV";
import { UserTrade } from "../../../ReduxStore/Slice/Users/ClientServiceSlice";

const TradeCharges = () => {
  const dispatch = useDispatch();
  const user_details = JSON.parse(localStorage.getItem("user_details"));
  const user_id = user_details.user_id;
  const subadmin_service_type = user_details.subadmin_service_type;

  const [searchInput, setSearchInput] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  const [companyData, setCompanyData] = useState({
    loading: false,
    data: [],
  });

  const handleOpenModal = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const columns = useMemo(() => {
    const baseColumns = [
      { field: "id", headerName: "ID", width: 130, headerClassName: "bold-header", renderCell: (params) => <b>{params.value}</b> },
      { field: "UserName", headerName: "UserName", width: 230, headerClassName: "bold-header" },
      { field: "order_id", headerName: "Order Id", width: 240, headerClassName: "bold-header" },
      { field: "user_charge", headerName: "Trade Charge", width: 210, headerClassName: "bold-header" },
      { field: "createdAt", headerName: "Created At", width: 220, headerClassName: "bold-header", renderCell: (params) =>fDateTime(params.value) },
    ];

    return subadmin_service_type === 1 ? baseColumns.filter(col => col.field !== "user_charge") : baseColumns;
  }, [subadmin_service_type]);

  const getCompanyData = useCallback(async () => {
    try {
      const data = { id: user_id };
      const response = await dispatch(UserTrade(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        const filteredData = searchInput
          ? formattedData.filter(item => item.UserName && item.UserName.toLowerCase().includes(searchInput.toLowerCase()))
          : formattedData;

        setTotalBalance(response.data1);

        setCompanyData({
          loading: true,
          data: filteredData,
        });
      } else {
        setCompanyData({
          loading: true,
          data: [],
        });
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      setCompanyData({
        loading: true,
        data: [],
      });
    }
  }, [dispatch, user_id, searchInput]);

  useEffect(() => {
    getCompanyData();
  }, [refresh, getCompanyData]);

  const handleRefresh = () => {
    setSearchInput("");
    setRefresh(!refresh);
  };

  const totalUsedBalance = companyData.data.reduce((acc, item) => acc + (parseInt(item.user_charge) || 0), 0);

  return (
    <>
      {companyData.loading ? (
        <div className="content container-fluid" data-aos="fade-left">
          <div className="card">
            <Header handleRefresh={handleRefresh} searchInput={searchInput} setSearchInput={setSearchInput} />
            <Stats totalBalance={totalBalance} totalUsedBalance={totalUsedBalance} />
            <div className="card-body">
              <FullDataTable columns={columns} rows={companyData.data} checkboxSelection={false} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {isModalOpen && selectedRow && <CompanyChange rowData={selectedRow} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

const Header = ({ handleRefresh, searchInput, setSearchInput }) => (
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
            <li>
              <button className="btn-filters mb-0" title="Refresh" onClick={handleRefresh}>
                <i className="fe fe-refresh-ccw" />
              </button>
            </li>
            <li className="search-li">
              <div className="input-group input-block">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </li>
            <li>
              <ExportToExcel className="btn btn-primary" fileName={"Payment Details"} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Stats = ({ totalBalance, totalUsedBalance }) => (
  <div className="super-admin-list-head">
    <div className="row">
      {[
        { name: "Total Balance", icon: "fe fe-package", value: totalBalance },
        { name: "Used Balance", icon: "fe fe-list", value: totalUsedBalance },
        { name: "Remaining Balance", icon: "fe fe-pause-circle", value: totalBalance - totalUsedBalance },
        { name: "Wallet", icon: "fe fe-wallet" },
      ].map((item, index) => (
        <div className="col-xl-3 col-md-6 d-flex" key={index}>
          <div className="card w-100">
            <div className={`grid-info-item ${index === 3 ? "total-type" : index === 0 ? "total-plane" : index === 1 ? "active-plane" : "inactive-plane"}`}>
              <div className="grid-info">
                <span>{item.name}</span>
                <h4>{item.value}</h4>
              </div>
              <div className="grid-head-icon">
                <i className={item.icon} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TradeCharges;
