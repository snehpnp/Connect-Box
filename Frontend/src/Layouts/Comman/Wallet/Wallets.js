import React, { useState, useEffect } from "react";
import { RechargeDetailsGets, BalanceGetbyId } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../Components/Dashboard/Content/Content';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';
import { IndianRupee } from 'lucide-react';

function Payment() {
  
  const dispatch = useDispatch();


  var subadmin_service_type = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type
  const admin_id = JSON.parse(localStorage.getItem("user_details")).user_id

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [cardData, setcardData] = useState({});
  const [companyData, setCompanyData] = useState({ loading: false, data: [] });

  let UsedBalance = 0


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
      field: 'id',
      headerName: '#',
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
          {params.row.username ? params.row.username : params.row.UserName}
        </div>
      )
    },
    {
      field: 'strategy_id',
      headerName: 'strategy Name',
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
          <span className="badge bg-success-light">{params.value || 'CASH'}</span>

        </div>
      )
    },

    {
      field: 'Balance',
      headerName: 'Balance',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>{params.row.Mode ? <span className="text-success-light"> +<IndianRupee style={{ height: "15px" }} />{params.row.Balance ? params.row.Balance : params.row.admin_charge || '-'}</span> : <span className="text-danger-light"> -<IndianRupee style={{ height: "15px" }} />{params.row.Balance ? params.row.Balance : params.row.admin_charge || '-'}</span>}


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
      var data = { id: admin_id, subadmin_service_type: subadmin_service_type || 0 }
      const response = await dispatch(BalanceGetbyId(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,

        }));

        setCompanyData({
          loading: true,
          data: formattedData,
        });
        setcardData(response.Count)



      } else {
        setCompanyData({
          loading: true,
          data: [],
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



  if (subadmin_service_type == 1) {
    columns = columns.filter(column => column.field !== 'strategy_id');
  }


  companyData.data && companyData.data.map((data) => {
    if (!isNaN(data.Balance) && data.Balance !== null && data.Balance !== "" && data.Role == "USER") {
      UsedBalance += parseInt(data.Balance);
    }
  })


  useEffect(() => {
    getCompanyData();
  }, []);


  return (
    <>
      {companyData.loading ? (
        <div data-aos="fade-left">
          <Content
            Card_title="Wallet"
            Card_title_icon="fas fa-money-bill-wave pe-2"
            Content={
              <>
                <div className="super-admin-list-head">
                  <div className="row">
                    <div className="col-xl-3 col-md-6 d-flex">
                      <div className="card w-100">
                        <div className="">
                          <div className="grid-info-item total-plane">
                            <div className="grid-info">
                              <span>Total Balance</span>
                              <h4>{cardData && cardData.TotalBalance}</h4>
                            </div>
                            <div className="grid-head-icon">
                              <i className="fe fe-package" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6 d-flex">
                      <div className="card w-100">
                        <div className="">
                          <div className="grid-info-item active-plane">
                            <div className="grid-info">
                              <span>Used Balance</span>
                              <h4>{cardData && cardData.UsedBalance || UsedBalance}</h4>
                            </div>
                            <div className="grid-head-icon">
                              <i className="fe fe-list" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6 d-flex">
                      <div className="card w-100">
                        <div className="">
                          <div className="grid-info-item inactive-plane">
                            <div className="grid-info">
                              <span>Remaining Balance</span>
                              <h4>{cardData && cardData.RemainingBalance}</h4>
                            </div>
                            <div className="grid-head-icon">
                              <i className="fe fe-pause-circle" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6 d-flex">


                      <div className="card w-100" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                        <div className="">
                          <div className="grid-info-item total-type" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div className="grid-info">
                              <h4 style={{ marginBottom: '0', fontSize: '1.25rem', color: '#333' }}>Wallet</h4>
                              <span style={{ color: '#777', fontSize: '0.875rem' }}>Manage your funds</span>
                            </div>
                            {/* <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '1rem', backgroundColor: '#007bff', border: 'none', borderRadius: '5px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                              <i className="fe fe-plus-circle" style={{ marginRight: '5px' }} /> Add Funds
                            </button> */}
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
                <FullDataTable
                  styles={styles}
                  columns={columns}
                  rows={companyData.data}
                  checkboxSelection={false}

                />

              </>

            }
          />
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
