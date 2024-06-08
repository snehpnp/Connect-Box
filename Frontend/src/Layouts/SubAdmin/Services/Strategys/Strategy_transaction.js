import React, { useState, useEffect } from "react";
import { FindStgTranscData } from "../../../../ReduxStore/Slice/Subadmin/System";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../../Components/Dashboard/Content/Content';
import Loader from '../../../../Utils/Loader';
import { fDateTime } from '../../../../Utils/Date_formet';
import CompanyChange from '../../../../Components/ExtraComponents/Models/CompanyChange';
import { IndianRupee } from 'lucide-react';
import ExportToExcel from '../../../../Utils/ExportCSV'



function Payment() {
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
  const subadmin_service_type = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type

  const [inputSearch, setInputSearch] = useState('');
  const [ForGetCSV, setForGetCSV] = useState([])
  const [refresh, setrefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedRow, setSelectedRow] = useState(null);


  const [companyData, setCompanyData] = useState({
    loading: false,
    data: [],
  });

  const handleOpenModal = (rowData) => {
    setSelectedRow(rowData)
    setIsModalOpen(true);
  };

  let stg_total = 0;
  let Admin_charge_total = 0;


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


  let columns = [
    {
      field: "id",
      headerName: "ID",
      width:60,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div> <b>{params.value + 1}</b></div>
      ),
    },

    {
      field: 'user_id',
      headerName: 'UserName',
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div title={params.value}>{params.value || '-'}</div>

      )
    },

    {
      field: 'strategy_id',
      headerName: 'Strategy Name',
      width: 200,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}

        </div>
      )
    },
    {
      field: 'plan_id',
      headerName: 'Plan',
      width: 200,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value == 1 ? "MONTHLY" : params.value == 2 ? "QUATERLY" : params.value == 3 ? "HALF-YEARLY" : params.value == 4 ? "YEARLY" : "-"}
        </div>
      )
    },


    {
      field: 'stg_charge',
      headerName: 'Strategy Price',
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span className="text-success-light">  <IndianRupee style={{ height: "19px" }} />{params.value || '-'}</span>
        </div>
      )
    },
    {
      field: 'Admin_charge',
      headerName: 'Admin Charges',
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span className="text-success-light">  <IndianRupee style={{ height: "19px" }} />{params.value || '-'}</span>
        </div>
      )
    },
    {
      field: 'Research_charge',
      headerName: 'Researcher Charges',
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
         {params.value? <span className="text-success-light">  <IndianRupee style={{ height: "19px" }} />{params.value || '-'}</span> : "-"}
        </div>
      )
    },
    
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 220,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {fDateTime(params.value)}
        </div>
      )
    },
    {
      field: 'Start_Date',
      headerName: 'Start Date',
      width: 220,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {fDateTime(params.value)}
        </div>
      )
    },
    {
      field: 'End_Date',
      headerName: 'End Date',
      width: 220,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {fDateTime(params.value)}
        </div>
      )
    },
  ];

  if (subadmin_service_type == 1) {
    columns = columns.filter(column => column.field !== 'Admin_charge');
    columns = columns.filter(column => column.field !== 'Research_charge');

    
  }

  const getCompanyData = async () => {

    var data = { user_ID: user_id }

    await dispatch(FindStgTranscData(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const filterdata = response.data && response.data.filter((item)=>{
            const inputSearchMatch =
                inputSearch == "" ||
                item.user_id.toLowerCase().includes(
                  inputSearch.toLowerCase()
                ) ||
                item.strategy_id.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.createdAt
                  .toLowerCase()
                  .includes(inputSearch.toLowerCase());

              return inputSearchMatch ;
          })
          const formattedData = response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }))


          const filterData = formattedData.filter((item)=>{

            const searchMatch = 
            inputSearch=='' || 
            item.user_id ?.toLowerCase().includes(inputSearch.toLowerCase()) ||
            item.strategy_id ?.toLowerCase().includes(inputSearch.toLowerCase()) ||
            
            item.user_id ?.toLowerCase().includes(inputSearch.toLowerCase()) 

            return searchMatch
            
          })

          setCompanyData({
            loading: true,
            data: inputSearch ? filterdata : formattedData,
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


  }

  companyData.data && companyData.data.forEach((item) => {

    if (!isNaN(item.stg_charge) && item.stg_charge !== null && item.stg_charge !== "") {
      stg_total += parseInt(item.stg_charge);
    }

    if (!isNaN(item.Admin_charge) && item.Admin_charge !== null && item.Admin_charge !== "") {
      Admin_charge_total += parseInt(item.Admin_charge);
    }
  });


  useEffect(() => {
    getCompanyData();
  }, [refresh,inputSearch]);

  const handleRefresh = () => {
    setInputSearch('')
    setrefresh(!refresh)
  }


  return (
    <>
      {companyData && companyData.loading ? (
        <div className="content container-fluid" data-aos="fade-left">
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="card-title mb-0">
                    <i className="fe fe-users pe-2" ></i>
                    Strategy Transaction</h5>
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
                        <div
                          className="dropdown dropdown-action"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Download"
                        >
                          <ExportToExcel
                            className="btn btn-primary "
                            // apiData={ForGetCSV}
                            fileName={'Payment Details'} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">

              {companyData.data.length > 0 ?


                <div className="d-flex gap-5">
                  <h4 >Total Strategy Profit : <span style={{ color: "green" }}> {stg_total || 0 .toFixed(2)}</span> </h4>
                 {subadmin_service_type == 2 ? <h4 >Total Admin Charges : <span style={{ color: "green" }}> {Admin_charge_total || 0 .toFixed(2)}</span> </h4>:""}
                </div>
                : ""

              }

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
  );
};


export default Payment;
