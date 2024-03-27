import React, { useState, useEffect } from "react";
import { fetchSubadminCompanyInfo } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import Content from '../../../Components/Dashboard/Content/Content';
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Loader from '../../../Utils/Loader';



function Payment() {
  const dispatch = useDispatch();
  const [companyData, setCompanyData] = useState({
    loading: false,
    data: [],
  });

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
      field: 'profile', headerName: 'Profile', width: 120, headerClassName: styles.boldHeader,
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
      width: 210,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.row.makerInfo.FullName}
        </div>
      )
    },


    {
      field: 'razorpay_key',
      headerName: 'razorpay_key',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },

    {
      field: 'email', headerName: 'email', width: 250, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },
    {
      field: 'change', headerName: 'change', width: 150, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <a href="/"><span className="badge bg-purple">Change</span></a>
        </div>
      )
    },
    {
      field: 'Status', headerName: 'Status', width: 120, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span className={`badge bg-success-light d-inline-flex align-items-center`}>
            <i className={'fe fe-check me-1'} />Active
          </span>
        </div>
      )
    },
    { field: 'createdAt', headerName: 'createdAt', width: 250, headerClassName: styles.boldHeader },

  ];

  const handleEdit = (row) => {
    console.log('Edit row:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

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
          Card_title="Payment Details"

          Card_title_icon='fas fa-image pe-2'
          Content={
            <FullDataTable
              styles={styles}
              columns={columns}
              rows={companyData.data}
            />
          }
        />
      ) : (
        <Loader />
      )}

    </>
  );
}

export default Payment;
