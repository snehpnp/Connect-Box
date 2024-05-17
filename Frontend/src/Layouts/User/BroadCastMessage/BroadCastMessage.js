import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { admin_Msg_Get, } from "../../../ReduxStore/Slice/Admin/MessageData";

import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { fDateTime } from "../../../Utils/Date_formet";
import Swal from 'sweetalert2';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Loader from "../../../Utils/Loader";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import * as Config from "../../../Utils/Config";
import io from 'socket.io-client';


const BroadCastMessage = () => {
  const [pipelineData, setPipelineData] = useState([]);
  const [getAllUsers, setAllUsers] = useState({
    loading: true,
    data: [],
    data1: [],
  });
   



  const label = { inputProps: { "aria-label": "Switch demo" } };
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    card: {
      width: "auto",
    },
    boldHeader: {
      fontWeight: "bold",
    },
    headerButton: {
      marginRight: 8,
    },
  };




   // RECIVED DATA
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
      field: "Role",
      headerName: "From",
      width: 200,
      headerClassName: styles.boldHeader,
    },

    {
      field: "messageTitle",
      headerName: "Message",
      width: 350,
      headerClassName: styles.boldHeader,
    },


    {
      field: "createdAt",
      headerName: "created BY",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value)}</div>,
    },

  ];

  return (
    <>
      {!getAllUsers.loading ? (
        <>
          <div className="content container-fluid" data-aos="fade-left">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="card-title mb-0">
                      <i className="pe-2 fa-solid fa-users"></i>
                      Message</h5>
                  </div>
                  <div className="col-auto">
                    <div className="list-btn">
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">





              <FullDataTable
              styles={styles}
              label={label}
              columns={columns}
              rows={pipelineData}
            />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}

    </>
  )
}

export default BroadCastMessage
