import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Get_UserBroadcast } from "../../../ReduxStore/Slice/Admin/MessageData";

import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { fDateTime } from "../../../Utils/Date_formet";

import Loader from "../../../Utils/Loader";



const BroadCastMessage = () => {
  const dispatch = useDispatch();
  const [pipelineData, setPipelineData] = useState([]);
  const [getAllUsers, setAllUsers] = useState({
    loading: true,
    data: [],
    data1: [],
  });

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const broker = JSON.parse(localStorage.getItem("user_details")).broker;




  /// get user broadcast message
  const getbroadcastmsg = async () => {
    const data = { id: user_id, broker: broker };

    await dispatch(Get_UserBroadcast(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setPipelineData(response.data);
          setAllUsers(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getbroadcastmsg();
  }, []);




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
      width: 140,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.value + 1}</b>
        </div>
      ),
    },

    {
      field: "Role",
      headerName: "From",
      width: 280,
      headerClassName: styles.boldHeader,
    },

    {
      field: "messageTitle",
      headerName: "Message",
      width: 370,
      headerClassName: styles.boldHeader,
    },

    {
      field: "createdAt",
      headerName: "created At",
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
                      Message
                    </h5>
                  </div>
                  <div className="col-auto">
                    <div className="list-btn"></div>
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
  );
};

export default BroadCastMessage;
