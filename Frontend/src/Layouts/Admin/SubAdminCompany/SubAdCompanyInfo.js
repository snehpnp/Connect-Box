import React, { useState, useEffect } from "react";
import { fetchSubadminCompanyInfo } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import Content from '../../../Components/Dashboard/Content/Content';
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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
    { field: 'pid', headerName: '#', width: 70, headerClassName: styles.boldHeader },
    {
      field: 'logo',
      headerName: 'Subadmin Name',
      width: 220,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
  
          <div>
            <a href="#"  style={{ color: '#333' }}>{params.row.makerInfo.FullName}</a>
          </div>
        </div>
      )
    },

    {
      field: 'panel_name',
      headerName: 'Company Name',
      width: 200,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 290,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },
   

    {
      field: "change",
      headerName: "Action",
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div onClick={() => handleOpenModal(params.row)}>
          {/* <span className="badge bg-purple" style={{ width: "6rem", fontSize: "1rem" }}>Change</span> */}

          <IconButton
            aria-label="edit"
            size="small"
            // onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>

        </div>
      ),
    },
    // {
    //   field: 'Status',
    //   headerName: 'Status',
    //   width: 200,
    //   headerClassName: styles.boldHeader,
    //   renderCell: (params) => {
    //     if (params.row.razorpay_key !== '') {
    //       return (
    //         <div>
    //           <span className="badge bg-success-light d-inline-flex align-items-center" style={{ fontSize: "1rem" }}><i className="fe fe-check me-1"></i>Approved</span>
    //         </div>
    //       );
    //     } else {
    //       return (

    //         <span className="badge bg-orange-light d-inline-flex align-items-center" style={{ width: "7rem", fontSize: "1rem" }}><i className="fe fe-clock me-1"></i>Pending</span>

    //       );
    //     }
    //   }
    // },
    {
      field: 'createdAt', headerName: 'Created At', width: 250, headerClassName: styles.boldHeader,
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
          pid: index + 1,
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
        <div data-aos="fade-left">
          <Content
            Card_title="Sub-Admin Details"
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
        </div>
      ) : (
        <Loader />
      )}
      {isModalOpen && selectedRow && (
        <CompanyChange
          rowData={selectedRow}
          onClose={() => (setIsModalOpen(false), setrefresh(!refresh))}

        />
      )}
    </>
  );
}

export default Payment;
