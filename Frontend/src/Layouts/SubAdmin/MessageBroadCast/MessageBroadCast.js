import React, { useState, useEffect } from "react";
import Content from "../../../Components/Dashboard/Content/Content";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { allStrategy_subAd, get_allBroker } from "../../../ReduxStore/Slice/Admin/Subadmins";
import { admin_Msg_Delete, add_message, admin_Msg_Get, admin_Msg_Edit } from "../../../ReduxStore/Slice/Admin/MessageData";
import EditIcon from "@mui/icons-material/Edit";
import io from "socket.io-client";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import IconButton from "@mui/material/IconButton";
import { fDateTime } from "../../../Utils/Date_formet";

import DeleteIcon from '@mui/icons-material/Delete';
import * as Config from "../../../Utils/Config";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Loader from "../../../Utils/Loader";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function MessageBroadcast() {
  const dispatch = useDispatch();
  const [deleteModal, setdeleteModal] = useState(false);
  const [getModalId, setModalId] = useState(false);
  const [messages, setMessages] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState("");
  // const [messageText, setMessageText] = useState("");
  const [modal, setModal] = useState(0);
  const [msgData, setMsgData] = useState([]);
  const [openModalId, setopenModalId] = useState("");
  const [refresh, setrefresh] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("1");

  const ownerId = JSON.parse(localStorage.getItem("user_details")).user_id
  const ownerRole = JSON.parse(localStorage.getItem("user_details")).Role


  const [messageText, setMessageText] = useState("");


  // CONNECT SOCKET
  // useEffect(() => {
  //   const newSocket = io.connect(Config.base_url);
  //   setSocket(newSocket);
  //   newSocket.on("receive_message", (data) => {
  //     setrefresh(!refresh)
  //   });

  //   return () => {
  //     newSocket.off("receive_message");
  //     newSocket.close();
  //   };
  // }, []);


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

  const label = { inputProps: { "aria-label": "Switch demo" } };
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
      headerName: "createdAt",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value)}</div>,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => {
              // setopenModalId(message._id);
              setModal(1);
            }}
          >
            <EditIcon />
          </IconButton>
          {value == 1 ? <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              setdeleteModal(true); setModalId(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton> : ""

          }
        </div>
      ),
      headerClassName: styles.boldHeader,
    }
  ];


  const handleUpdate = async () => {
    var data = { id: openModalId, messageTitle: msgData };

    await dispatch(admin_Msg_Edit(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setModal(0)
          setopenModalId("");
          setrefresh(!refresh);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const fetchStrategies = async () => {
    try {
      await dispatch(allStrategy_subAd())
        .unwrap()
        .then((response) => {
          if (response.status) {
            toast.success(response.msg);
            setStrategies(response.data);
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.error("Error in API response:", error);
          toast.error("Failed to fetch strategies");
        });
    } catch (error) {
      console.error("Error in dispatching action:", error);
      toast.error("Failed to dispatch action for fetching strategies");
    }
  };

  const fetchBrokers = async () => {
    try {
      await dispatch(get_allBroker())
        .unwrap()
        .then((response) => {
          if (response.status) {
            toast.success(response.msg);
            setBrokers(response.data);
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.error("Error in API response:", error);
          toast.error("Failed to fetch strategies");
        });
    } catch (error) {
      console.error("Error in dispatching action:", error);
      toast.error("Failed to dispatch action for fetching strategies");
    }
  };

  const sendMessage = async () => {
    try {

      if (!selectedStrategy && !selectedBroker) {
        alert("Please Select any Strategy Or Broker")
        return
      }

      const newMessage = {
        Role: ownerRole,
        ownerId: ownerId,
        strategyId: selectedStrategy,
        brokerId: selectedBroker,
        messageTitle: messageText,
      };
      await dispatch(add_message(newMessage))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.message);
            setrefresh(!refresh)

          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };



  const getSubadminTableData = async () => {
    try {
      // Show loader
      setLoading(true);

      const response = await dispatch(admin_Msg_Get({ ownerId, key: 1 })).unwrap();

      if (response.status) {

        console.log("response.data",response.data)
        console.log("value",value)

        let filteredData = [];
        if (value == 2) {
          filteredData = response.data.filter(item => item.ownerId == ownerId);
        } else if (value == 3) {
          filteredData = response.data.filter(item =>
            (Array.isArray(item.subAdminId) && item.subAdminId.includes(ownerId)) ||
            (Array.isArray(item.strategyId) && item.strategyId.includes(ownerId))
          );
        }
        console.log("filteredData",filteredData)
        setPipelineData(filteredData);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      // Hide loader
      setLoading(false);
    }
  };



  const handleDlt = async () => {

    await dispatch(admin_Msg_Delete({ id: getModalId }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setrefresh(!refresh);
          setdeleteModal(false)
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });

  };


  useEffect(() => {
    fetchStrategies();
    fetchBrokers();
    getSubadminTableData();
  }, [refresh, value]);


  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
};


  return (
    <>
      <div className="content container-fluid" >

        <div className="card" data-aos="fade-left">
          <div className="card-header">
            <h5 className=" card-title mb-0 w-auto">Message Broadcast</h5>
          </div>


          <div className="card-body">
            <div className="mt-3 ">
              <Box sx={{ width: "100%" }}>
                <TabContext value={value}>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Send" value="1" />
                      <Tab label="Sent Messages" value="2" />
                      <Tab label="Received Messages" value="3" />
                    </TabList>
                  </Box>

                  <TabPanel value="1" >
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <img
                          src="/assets/img/gif/Email-campaign.png"
                          alt="Investment data"
                          className="w-75"
                        />
                      </div>
                      <div className="col-md-7">
                   
                      <div>
                      <div className="input-block mt-3">
                        <label className="form-label" htmlFor="strategy-select">
                          Strategy
                        </label>
                        <div className="input-group">
                          <select
                            id="strategy-select"
                            className="form-control"
                            value={selectedStrategy}
                            onChange={(e) => setSelectedStrategy(e.target.value)}
                          >
                            <option value="">Select Strategy</option>
                            {strategies &&
                              strategies.map((strategy) => (
                                <option key={strategy._id} value={strategy._id}>
                                  {strategy.strategy_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className=" input-block mt-3">
                        <label className="form-label" htmlFor="broker-select">
                          Broker
                        </label>
                        <div className="input-group">
                          <select
                            id="broker-select"
                            className="form-control"
                            value={selectedBroker}
                            onChange={(e) => setSelectedBroker(e.target.value)}
                          >
                            <option value="">Select Broker</option>
                            {brokers &&
                              brokers.map((broker) => (
                                <option key={broker._id} value={broker._id}>
                                  {broker.title}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>


                        <div className="input-block mt-3">
                          <label className="form-label" htmlFor="message">
                            Message
                          </label>
                          <textarea
                            id="message"
                            className="form-control"
                            rows="4"
                            value={messageText}
                            onChange={handleMessageChange}
                          ></textarea>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary mt-3"
                          onClick={sendMessage}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                    </div>

                  </TabPanel>

                  <TabPanel value="2" >
                    {loading ? (
                      <Loader /> // Show loader while loading
                    ) : (<FullDataTable
                      styles={styles}
                      label={label}
                      columns={columns}
                      rows={pipelineData}
                    />)}

                  </TabPanel>

                  <TabPanel value="3" >
                    {loading ? (
                      <Loader /> // Show loader while loading
                    ) : (<FullDataTable
                      styles={styles}
                      label={label}
                      columns={columns}
                      rows={pipelineData}
                    />)}


                  </TabPanel>

                </TabContext>
              </Box>
            </div>
          </div>


        </div>





        {modal !== 0 && (
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal custom-modal d-block">
              <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                  <div className="modal-header border-0 pb-0">
                    <div className="form-header modal-header-title text-start mb-0">
                      <h4 className="mb-0">Update Message</h4>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setModal(0)}
                    ></button>
                  </div>
                  {modal === 1 && (
                    <form onSubmit={handleUpdate}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="input-block mb-3">
                            <label>Message Title*</label>
                            <textarea
                              type="text"
                              className="form-control"
                              onChange={(e) => setMsgData(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer border-0 pt-0">
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {deleteModal && (
          <div className="modal custom-modal modal-delete d-block" >
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <div className="delete-modal-icon">
                      <span>
                        <i className="fe fe-check-circle" />
                      </span>
                    </div>
                    <h3>Are You Sure?</h3>
                    <p>You want delete Message</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="modal-footer justify-content-center p-0">
                      <button type="submit" onClick={() => handleDlt()} className="btn btn-primary paid-continue-btn me-2">Yes, Delete</button>
                      <button type="button" onClick={() => setdeleteModal(false)} className="btn btn-back cancel-btn">No, Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </>

  );
}

export default MessageBroadcast;
