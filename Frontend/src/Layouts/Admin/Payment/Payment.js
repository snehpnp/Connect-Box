import React, { useState, useEffect } from "react";
import { RechargeDetailsGets } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../Components/Dashboard/Content/Content';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';
import { IndianRupee } from 'lucide-react';
import ExportToExcel from '../../../Utils/ExportCSV'

function Payment() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputSearch, setInputSearch] = useState('');
  const [ForGetCSV, setForGetCSV] = useState([])
  const [refresh, setrefresh] = useState(false);
  const [first, setfirst] = useState("all");


  const [companyData, setCompanyData] = useState({
    loading: false,
    data: [],
  });

  const handleOpenModal = (rowData) => {
    setSelectedRow(rowData)
    setIsModalOpen(true);
  };


  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
    },
    card: {
      width: 'auto',
    },
    boldHeader: {
      fontWeight: 'bold',
    },
    headerButton: {
      marginRight: 12,
    },
  };


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div> <b>{params.value + 1}</b></div>
      ),
    },
    {
      field: 'username',
      headerName: 'User Name',
      width: 210,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value}
        </div>
      )
    },
    {
      field: 'Role',
      headerName: 'Role',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },
    {
      field: 'Mode',
      headerName: 'Mode',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span className="badge bg-success-light">{params.value || '-'}</span>

        </div>
      )
    },
    {
      field: 'Balance',
      headerName: 'Balance',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span className="text-success-light">  <IndianRupee style={{ height: "19px" }} />{params.value || '-'}</span>

        </div>
      )
    },
    {
      field: 'createdAt', headerName: 'createdAt', width: 250, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {fDateTime(params.value)}
        </div>
      )
    },
  ];


  const getCompanyData = async () => {
    try {
      var data = { Role: "SUBADMIN" }
      const response = await dispatch(RechargeDetailsGets(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
          matched: row.Role === first
        }));

        console.log("first", formattedData)

        setCompanyData({
          loading: true,
          data: formattedData,
        });
      }
    } catch (error) {
      console.log("Error", error);
      setCompanyData({
        loading: false,
        data: [],
      });
    }
  };


  useEffect(() => {
    getCompanyData();
  }, [first]);

  const handleRefresh = () => {
    setInputSearch('')
    setrefresh(!refresh)
  }

  const forCSVdata = () => {
    let csvArr = []
    if (companyData.data.length > 0) {
      companyData.data.map((item) => {
        return csvArr.push({
          "FullName": item.FullName,
          "UserName": item.UserName,
          "PhoneNo": item.PhoneNo,
          "Prifix Key": item.prifix_key,
          "Service Type": item.subadmin_service_type == 1 ? "Per Trade" : "Per Strategy",
          "Balance": item.Balance
        })
      })

      setForGetCSV(csvArr)
    }

  }

  useEffect(() => {
    forCSVdata()
  }, [companyData.data])

  var Rols = ['RESEARCHER', "SUBADMIN"]
  return (
    <>
      {companyData.loading ? (
        <div className="content container-fluid" data-aos="fade-left">
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="card-title mb-0">
                    <i class="fe fe-users pe-2" ></i>
                    Payment History</h5>
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
                            onChange={(e) => setInputSearch(e.target.value)}
                            value={inputSearch}
                          />
                        </div>
                      </li>

                      <li>
                        <div className="d-flex">
                          <div className="col-lg-12">
                            <div className="">
                              <div className="col-lg-12 ">
                                <select
                                  className="default-select wide form-control p-2"
                                  id="validationCustom05"
                                  onChange={(e) => setfirst(e.target.value)}
                                  value={first}
                                >
                                  <option disabled>Select Role</option>
                                  <option selected value="all">
                                    All
                                  </option>
                                  {Rols &&
                                    Rols.map((item) => {
                                      return (
                                        <>
                                          <option value={item}>{item}</option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
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
                            apiData={ForGetCSV}
                            fileName={'All Strategy'} />


                        </div>
                      </li>


                    </ul>
                  </div>
                </div>
              </div>


            </div>
            <div className="card-body">






              <FullDataTable
                styles={styles}
                columns={columns}
                rows={companyData.data}
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
  );
}

export default Payment;
