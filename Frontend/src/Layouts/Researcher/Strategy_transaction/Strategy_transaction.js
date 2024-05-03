import React, { useState, useEffect } from "react";
import { Strategy_Transaction_Details } from "../../../ReduxStore/Slice/Researcher/ResearcherSlice";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../Components/Dashboard/Content/Content';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';
import { IndianRupee } from 'lucide-react';
import { json } from "react-router-dom";

function Strategy_transaction() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedRow, setSelectedRow] = useState(null);
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id


  const [companyData, setCompanyData] = useState({
    loading: true,
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
      field: 'strategy_name',
      headerName: 'Strategy Name',
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value}
        </div>
      )
    },
    {
      field: 'User_name',
      headerName: 'User Name',
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value || '-'}
        </div>
      )
    },
    {
      field: 'plan_name',
      headerName: 'Plan Name',
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
        {params.value || '-'}
      </div>
      )
    },
    {
      field: 'order_id',
      headerName: 'Order Id',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
        {params.value || '-'}
      </div>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span className="text-success-light">  <IndianRupee style={{ height: "19px" }} />{params.value || '-'}</span>

        </div>
      )
    },
    {
      field: 'order_status',
      headerName: 'Order Status',
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value == 'Success' ?  
          <span className="text-success-light">{params.value }</span> : 
          <span className="text-danger">{"Pending"}</span> }
         

       
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
      var data = { id: user_id }
      const response = await dispatch(Strategy_Transaction_Details(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setCompanyData({
          loading: false,
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
      {!companyData.loading ? (
        <div data-aos="fade-left">
        <Content
          Card_title="Strategy transaction"
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

export default Strategy_transaction;
