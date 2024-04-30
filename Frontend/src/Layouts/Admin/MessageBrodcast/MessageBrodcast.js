import React, { useState, useEffect } from "react";
import Content from "../../../Components/Dashboard/Content/Content";
import { admin_Msg_Get, admin_Msg_Delete, admin_Msg_Edit, add_message } from "../../../ReduxStore/Slice/Admin/MessageData";
import { GetAllSubAdmin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import * as Config from "../../../Utils/Config";
import io from "socket.io-client";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Loader from "../../../Utils/Loader";
import { fDateTime } from "../../../Utils/Date_formet";

function MessageBroadcast() {
  const dispatch = useDispatch();

  const [subadmin, setsubadmin] = useState([]);
  const [selectedSubadmin, setSelectedSubadmin] = useState("");
  const [messageText, setMessageText] = useState("");
  const [pipelineData, setPipelineData] = useState([]);
  const [msgData, setMsgData] = useState('');
  const [modalId, setmodalId] = useState('');
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [openModalId, setopenModalId] = useState("");
  const [refresh, setrefresh] = useState(false);
  const datas = JSON.parse(localStorage.getItem("user_details"));
  // const [socket, setSocket] = useState(null);


  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);






  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



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
      field: "FullName",
      headerName: "Full Name",
      width: 160,
      headerClassName: styles.boldHeader,
    },
    {
      field: "UserName",
      headerName: "User name",
      width: 210,
      headerClassName: styles.boldHeader,
    },
    {
      field: "messageTitle",
      headerName: "Message Title",
      width: 300,
      headerClassName: styles.boldHeader,
    },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value || '')}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => { setModal(true); setopenModalId(params.row._id); setMsgData(params.row.messageTitle) }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleDelete(params.row._id)
              // setShowDeleteModal(true);
              setmodalId(params.row._id);
            }}

          >

            <DeleteIcon />
          </IconButton>
        </div>
      ),
      headerClassName: styles.boldHeader,
    },

  ];


  // useEffect(() => {
  //   const newSocket = io.connect(`${Config.base_url}`);
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);



  // GET ALL SUBADMIN NAMES
  const fetchSubadminName = async () => {
    await dispatch(GetAllSubAdmin())
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setsubadmin(response.data);

          const allSubadminUsernames = response.data.map((sub) => sub._id);
          setSelectedSubadmin(allSubadminUsernames);

        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // SEND MESSEAGE
  const sendMessage = async () => {
    try {
      const newMessage = {
        Role: datas.Role,
        ownerId: datas.user_id,
        subAdminId: [selectedSubadmin],
        messageTitle: messageText,
      };

      await dispatch(add_message(newMessage))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            // await socket.emit("send_message", newMessage);
            toast.success(response.msg);
            setSelectedSubadmin("");
            setMessageText("");
            setrefresh(!refresh);
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

  const handleSubadmins = (e) => {
    const value = e.target.value;
    if (value === "all") {
      const allSubadminUsernames = subadmin.map((sub) => sub._id);

      setSelectedSubadmin(allSubadminUsernames);
    } else {
      setSelectedSubadmin(value);
    }
  };



  const getAdminTableData = async () => {

    const ownerId = datas.user_id

    await dispatch(admin_Msg_Get({ ownerId, key: 2 }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {

          toast.success(response.msg);
          setPipelineData(response.data);
          setLoading(false)
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleDelete = async (id) => {
    const data = { id: modalId }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        await dispatch(admin_Msg_Delete(data))
          .unwrap()
          .then(async (response) => {
            if (response.status) {
              setmodalId('')
              setrefresh(!refresh);
            } else {
              toast.error(response.msg);
            }
          })
          .catch((error) => {
            console.log("Error", error);
          });

      }
    });

  };

  const handleUpdate = async () => {
    var data = { id: openModalId, messageTitle: msgData };

    await dispatch(admin_Msg_Edit(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setModal(false)
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



  useEffect(() => {
    fetchSubadminName();
    getAdminTableData();

    const allSubadminUsernames = subadmin.map((sub) => sub._id);
    setSelectedSubadmin(allSubadminUsernames);
  }, [refresh]);

  return (
    <div data-aos="fade-left">
      <Content

        Card_title="Message Broadcast"
        Card_title_icon="fas fa-message pe-3"
        Content={
          <>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Send" {...a11yProps(0)} />
                  <Tab label="Sent Messages" {...a11yProps(1)} />

                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <>

                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <img
                        src="/assets/img/gif/Email-campaign.png"
                        alt="Investment data"
                        className="w-75"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="input-block mt-3">
                        <label className="form-label" htmlFor="broker-select">
                          To Sub-Admin
                        </label>
                        <div className="input-group">
                          <select
                            id="broker-select"
                            className="form-control"
                            value={selectedSubadmin}
                            onChange={handleSubadmins}
                          >
                            <option value="all">All</option>
                            {subadmin &&
                              subadmin.map((val) => (
                                <option key={val._id} value={val._id}>
                                  {val.UserName}
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
                          onChange={(e) => setMessageText(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={sendMessage}
                      >
                        Send
                      </ button>
                    </div >
                  </div>


                </>

              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {loading ? (
                  <Loader />
                ) : (


                  <div className="mt-5">
                    <FullDataTable
                      styles={styles}
                      columns={columns}
                      rows={pipelineData}
                    />

                  </div>


                )}

              </CustomTabPanel>

            </Box>






            {modal && (
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
                          onClick={() => { setModal(false); setMsgData('') }}
                        ></button>
                      </div>
                      {modal && (
                        <div>
                          <div className="modal-body">
                            <div className="row">
                              <div className="input-block mb-3">
                                <label>Message Title*</label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setMsgData(e.target.value)}
                                  value={msgData}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer border-0 pt-0">
                            <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
                              Update
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
            }



          </>
        }
      />
    </div>
  );
}

export default MessageBroadcast;