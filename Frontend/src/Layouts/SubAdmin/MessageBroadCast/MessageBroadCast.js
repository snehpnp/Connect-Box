import React, { useState, useEffect } from "react";
import Content from "../../../Components/Dashboard/Content/Content";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  allStrategy_subAd,
  get_allBroker,
} from "../../../ReduxStore/Slice/Admin/Subadmins";
import {
  admin_Msg_Delete,
  add_message,
  admin_Msg_Get,
  admin_Msg_Edit
} from "../../../ReduxStore/Slice/Admin/MessageData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function MessageBroadcast() {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState("");
  const [messageText, setMessageText] = useState("");
  const datas = JSON.parse(localStorage.getItem("user_details"));
  const [modal, setModal] = useState(0);
  const [msgData, setMsgData] = useState([]);

  const [openModalId, setopenModalId] = useState("");
  const [refresh, setrefresh] = useState(false);

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
    const ownerId = datas.user_id;
    try {
      const newMessage = {
        Role: datas.Role,
        ownerId: ownerId,
        strategyId: selectedStrategy,
        brokerId: selectedBroker,
        // subAdminId: ownerId,
        messageTitle: messageText,
      };
      await dispatch(add_message(newMessage))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.msg);
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

  const handleStrategyChange = (e) => {
    setSelectedStrategy(e.target.value);
  };

  const handleBrokerChange = (e) => {
    setSelectedBroker(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  const getSubadminTableData = async () => {
    const ownerId = datas.user_id;
    await dispatch(admin_Msg_Get({ ownerId: ownerId }))
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

  useEffect(() => {
    fetchStrategies();
    fetchBrokers();
    getSubadminTableData();
  }, []);

  const handleDlt= async (id)=>{
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
  }
  const handleIdCheck = (id) => {
    console.log("id from check",id)
    setopenModalId(id);
    OpenModal(1);
  };

  return (
    <Content
      Page_title="Message Boardcast"
      Card_title="Message"
      Card_title_icon="fas fa-message pe-3"
      Content={
        <>
          <div>
            <div className="mt-3">
              <label className="form-label" htmlFor="strategy-select">
                Strategy
              </label>
              <div className="input-group">
                <select
                  id="strategy-select"
                  className="form-control"
                  value={selectedStrategy}
                  onChange={handleStrategyChange}
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
            <div className="mt-3">
              <label className="form-label" htmlFor="broker-select">
                Broker
              </label>
              <div className="input-group">
                <select
                  id="broker-select"
                  className="form-control"
                  value={selectedBroker}
                  onChange={handleBrokerChange}
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
          </button>

          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">from</th>
                  <th scope="col">Message</th>
                  <th scope="col">Date & Time Sent</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pipelineData &&
                  pipelineData.map((message, index) => (
                    <tr key={message.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{message.ownerId}</td>
                      <td>{message.messageTitle}</td>
                      <td>{message.createdAt}</td>
                      <td>
                      <button
                          onClick={() =>
                            handleIdCheck(message._id)
                          }
                          style={{ backgroundColor: "greenyellow" }}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={()=>handleDlt(message._id)}
                          style={{ backgroundColor: "firebrick" }}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
          )}
        </>
      }
    />
  );
}

export default MessageBroadcast;
