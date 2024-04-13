import React, { useState, useEffect } from "react";
import Content from "../../../Components/Dashboard/Content/Content";
import {
  admin_Msg_Get,
  admin_Msg_Delete,
  admin_Msg_Edit,
  add_message
} from "../../../ReduxStore/Slice/Admin/MessageData";
import { GetAllSubAdmin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import io from "socket.io-client";
// const socket = io("http://localhost:3000");

function MessageBroadcast() {
  const dispatch = useDispatch();

  const [subadmin, setsubadmin] = useState([]);
  const [selectedSubadmin, setSelectedSubadmin] = useState("");
  const [messageText, setMessageText] = useState("");
  const [pipelineData, setPipelineData] = useState([]);
  const [msgData, setMsgData] = useState([]);
  const [modal, setModal] = useState(0);

  const [openModalId, setopenModalId] = useState("");
  const [refresh, setrefresh] = useState(false);

  const datas = JSON.parse(localStorage.getItem("user_details"));
  // useEffect(() => {
  //   socket.on("messagesUpdated", (data) => {
  //     console.log("Received updated messages:", data);
  //     setPipelineData(data); 
  //   });
  //   return () => {
  //     socket.off("messagesUpdated");
  //   };
  // }, []);

  const OpenModal = (value) => {
    setModal(value);
  };

  const CloseModal = () => {
    setModal(0);
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setMsgData(value);
  };

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
            //  socket.emit('newMessage', newMessage);
            toast.success(response.msg);
            setSelectedSubadmin("")
            setMessageText("")
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

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
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



  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (confirmed) {
      await dispatch(admin_Msg_Delete({ id }))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.msg);
            setrefresh(!refresh);
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  const handleUpdate = async () => {
    var data = { id: openModalId, messageTitle: msgData };

    await dispatch(admin_Msg_Edit(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          OpenModal(0);
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

  const handleIdCheck = (id) => {
    setopenModalId(id);
    OpenModal(1);
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
      // Page_title="Message Boardcast"
      Card_title=" Message Boardcast"
      Card_title_icon="fas fa-message pe-3"
      Content={
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
                  onChange={handleMessageChange}
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


          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Message Owner</th>
                  <th scope="col">Sub-Admin Name</th>
                  <th scope="col">Message</th>
                  <th scope="col">Date & Time Sent</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pipelineData &&
                  pipelineData.map((message, index) => (
                    <tr key={message.id}>
                      <td scope="row">{index + 1}</td>
                      <td>{message.UserName}</td>
                      <td>{message.UserName}</td>
                      <td>{message.messageTitle}</td>
                      <td>{message.createdAt}</td>
                      <td>
                        <button className=" btn-action-icon"
                          onClick={() =>
                            handleIdCheck(message._id)
                          }

                        >
                          <i className="fe fe-edit"></i>
                        </button>
                        <button className=" btn-action-icon"
                          onClick={() =>
                            handleDelete(message._id)
                          }

                        >
                          <i className="fe fe-trash-2"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {
            modal !== 0 && (
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
                          onClick={CloseModal}
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
                                  onChange={handleInputChange}
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
            )
          }
        </>
      }
    />
    </div>
  );
}

export default MessageBroadcast;