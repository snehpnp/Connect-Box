import React, { useState, useEffect } from "react";
import { FindStgTranscData } from "../../../ReduxStore/Slice/Subadmin/System";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../Components/Dashboard/Content/Content';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';
import { IndianRupee } from 'lucide-react';

function Payment() {
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id

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
          {params.row.user_id.UserName || '-'}
        </div>
      )
    },
    {
      field: 'strategy',
      headerName: 'Strategy Name',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.row.strategy_id.strategy_name || '-'}

        </div>
      )
    },
    {
      field: 'plan_id',
      headerName: 'Plan',
      width: 210,
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
      width: 250,
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
      width: 210,
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
      var data = { user_ID: user_id }
      const response = await dispatch(FindStgTranscData(data)).unwrap();

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
          Card_title="Strategy Transaction"
          Card_title_icon="fas fa-money-bill-wave pe-2"
          Content={
            <>
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
