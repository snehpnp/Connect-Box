import React, { useState, useEffect } from "react";
import { RechargeDetailsGets } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../Components/Dashboard/Content/Content';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';
import { IndianRupee } from 'lucide-react';

function Payment() {
  const dispatch = useDispatch();

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
    { field: 'id', headerName: '#', width: 70, headerClassName: styles.boldHeader },

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
        }));
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
  }, []);


  return (
    <>
      {companyData.loading ? (
        <Content
          Card_title="Wallet"
          Card_title_icon="fas fa-money-bill-wave pe-2"
          Content={
            <>
              <div className="super-admin-list-head">
                <div className="row">
                  <div className="col-xl-3 col-md-6 d-flex">
                    <div className="card w-100">
                      <div className="card-body">
                        <div className="grid-info-item total-plane">
                          <div className="grid-info">
                            <span>Total Balance</span>
                            <h4>10000</h4>
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
                      <div className="card-body">
                        <div className="grid-info-item active-plane">
                          <div className="grid-info">
                            <span>Used Balance</span>
                            <h4>7000</h4>
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
                      <div className="card-body">
                        <div className="grid-info-item inactive-plane">
                          <div className="grid-info">
                            <span>Remaining Balance</span>
                            <h4>3000</h4>
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
                      <div className="card-body">
                        <div className="grid-info-item total-type" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div className="grid-info">
                            <h4 style={{ marginBottom: '0', fontSize: '1.25rem', color: '#333' }}>Wallet</h4>
                            <span style={{ color: '#777', fontSize: '0.875rem' }}>Manage your funds</span>
                          </div>
                          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '1rem', backgroundColor: '#007bff', border: 'none', borderRadius: '5px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                            <i className="fe fe-plus-circle" style={{ marginRight: '5px' }} /> Add Funds
                          </button>
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
