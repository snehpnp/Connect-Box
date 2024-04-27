import React, { useState, useEffect } from "react";
import { FindStgHistoryData } from "../../../../ReduxStore/Slice/Subadmin/System";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../../Components/Dashboard/Content/Content';
import Loader from '../../../../Utils/Loader';
import { fDateTime } from '../../../../Utils/Date_formet';
import CompanyChange from '../../../../Components/ExtraComponents/Models/CompanyChange';
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


  let columns = [
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
      field: 'user_id',
      headerName: 'User Name',
      width: 210,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },

    {
      field: 'strategy_id',
      headerName: 'Strategy Name',
      width: 250,
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
      width: 210,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value == 1 ? "MONTHLY" : params.value == 2 ? "QUATERLY" : params.value == 3 ? "HALF-YEARLY" : params.value == 4 ? "YEARLY" : params.value == 0 ? "DEMO" : params.value == 10 ? "2 Days" : "-"}
        </div>
      )
    },
    {
      field: 'Start_Date', headerName: 'Start Date', width: 250, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {fDateTime(params.value)}
        </div>
      )
    },
    {
      field: 'End_Date', headerName: 'End Date', width: 250, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.row.license_type == 0 ? "-":fDateTime(params.value) }
        </div>
      )
    },



  ];



  const getCompanyData = async () => {

    var data = { user_ID: user_id }

    await dispatch(FindStgHistoryData(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const formattedData = response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          setCompanyData({
            loading: true,
            data: formattedData,
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

 


  useEffect(() => {
    getCompanyData();
  }, []);

  return (
    <>
      {companyData && companyData.loading ? (
        <Content
          Card_title="Strategy History"
          Card_title_icon="pe-2 fa-solid fa-clock-rotate-left"
          Content={
            <>
              <FullDataTable
                styles={styles}
                columns={columns}
                rows={companyData && companyData.data}
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
};


export default Payment;
