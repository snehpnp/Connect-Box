import React, { useState, useEffect } from "react";
import Content from "../../../Components/Dashboard/Content/Content";
import {
  admin_Msg_Get,
  admin_Msg_Delete,
  admin_Msg_Edit,
  add_message,
} from "../../../ReduxStore/Slice/Admin/MessageData";
import { GetAllSubAdmin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import io from "socket.io-client";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";




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
  const [socket, setSocket] = useState(null);

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
      field: "UserName",
      headerName: "Full Name",
      width: 160,
      headerClassName: styles.boldHeader,
    },
    {
      field: "UserName",
      headerName: "User name",
      width: 160,
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
      headerName: "createdAt",
      width: 250,
      headerClassName: styles.boldHeader,
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
            onClick={() => { setModal(true);  setopenModalId(params.row._id); setMsgData(params.row.messageTitle)}}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              setShowDeleteModal(true);
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

 
 


  useEffect(() => {
    const newSocket = io.connect("http://localhost:7000");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

 


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
            await socket.emit("send_message", newMessage);
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
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleDelete = async () => {
    const data = { id: modalId }
    await dispatch(admin_Msg_Delete(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg)
          setShowDeleteModal(false)
          setmodalId('')
          setrefresh(!refresh);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
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

        Card_title=" Message Boardcast"
        Card_title_icon="fas fa-message pe-3"
        Content={
          <>
            <div className="mt-3">

              <div className="col-md-7">
                <div className="mt-3">
                  <label className="form-label" htmlFor="broker-select">
                    SubAdmins
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

                <div className="mt-3">
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
            </div >


            <div className="mt-5">
              <FullDataTable
                styles={styles}
                columns={columns}
                rows={pipelineData}
              />

            </div>




            {
              modal  && (
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
                            onClick={()=>{setModal(false); setMsgData('')}}
                          ></button>
                        </div>
                        {modal  && (
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


            {ShowDeleteModal &&
              (
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
                          <p>You want delete company</p>
                        </div>
                        <div className="modal-btn delete-action">
                          <div className="modal-footer justify-content-center p-0">
                            <button type="submit" onClick={() => handleDelete()} className="btn btn-primary paid-continue-btn me-2">Yes, Delete</button>
                            <button type="button" onClick={() => setShowDeleteModal(false)} className="btn btn-back cancel-btn">No, Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

          </>
        }
      />
    </div>
  );
}

export default MessageBroadcast;