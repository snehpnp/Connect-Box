import React, { useState, useEffect } from "react";
import { fetchSubadminCompanyInfo } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import Content from '../../../Components/Dashboard/Content/Content';
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';


function Payment() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedRow, setSelectedRow] = useState(null);
  const [refresh, setrefresh] = useState(false); 


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
      field: 'profile',
      headerName: 'Profile',
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <a href="profile.html" className="company-avatar avatar-md me-2 companies company-icon">
            <img className="avatar-img rounded-circle company" src="assets/img/companies/company-05.svg" alt="Company Image" />
          </a>
        </div>
      )
    },
    {
      field: 'makerInfo',
      headerName: 'Subadmin Name',
      width: 200,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.row.makerInfo.FullName}
        </div>
      )
    },
    {
      field: 'email',
      headerName: 'email',
      width: 290,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },
    {
      field: 'smtpport',
      headerName: 'PORT',
      width: 110,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },
    {
      field: 'razorpay_key',
      headerName: 'Razorpay key',
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          *****
        </div>
      )
    },
   
    {
      field: "change",
      headerName: "Change",
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div onClick={() => handleOpenModal(params.row)}>
          <span className="badge bg-purple">Change</span>
        </div>
      ),
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => {
        if (params.row.razorpay_key !== '') {
          return (
            <div>
              <span className={`badge bg-success-light d-inline-flex align-items-center`}>
                <i className={'fe fe-check me-1'} />Active
              </span>
            </div>
          );
        } else {
          return (
            <div>
              <span className={`badge bg-danger-light d-inline-flex align-items-center`}>
                <i className={`fe fe-x me-1`}></i>InActive</span>
            </div>
          );
        }
      }
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
      const response = await dispatch(fetchSubadminCompanyInfo()).unwrap();

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
      setCompanyData({
        loading: false,
        data: [],
      });
    }
  };


  useEffect(() => {
    getCompanyData();
  }, [refresh]);



  return (
    <>
    {companyData.loading ? (
      <Content
        Card_title="Subadmin Details"
        Card_title_icon="fa-solid fa-users-gear pe-2"
        Content={
          <FullDataTable
            styles={styles}
            columns={columns}
            rows={companyData.data}
            checkboxSelection={false}
            
          />
        }
      />
    ) : (
      <Loader />
    )}
    {isModalOpen && selectedRow && (
      <CompanyChange
        rowData={selectedRow}
        onClose={() => (setIsModalOpen(false),setrefresh(!refresh))}
        
      />
    )}
  </>
  );
}

export default Payment;
