import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  SubadminHelpmessage,
  getsubadmintable,
  deletesubadminhelpdata,
  userdataforhelp,
  userprifix_key,
} from "../../../ReduxStore/Slice/Admin/System";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Helpsubadmin = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user_details"));
  const userdataprifix_key = JSON.parse(
    localStorage.getItem("user_details")
  ).prifix_key;


  const [refresh, setRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [getuserdata, setGetuserdata] = useState([]);
  const [help, setHelp] = useState({ UserName: "", Email: "", mobile: "", Message: "" });


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
      field: "index",
      headerName: "SR. No.",
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "UserName",
      headerName: "Name",
      width: 190,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 290,
      headerClassName: styles.boldHeader,
    },

    {
      field: "mobile",
      headerName: "Phone No",
      width: 210,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Message",
      headerName: "Message",
      width: 210,
      headerClassName: styles.boldHeader,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              deletesubadmindata(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const columns1 = [
    {
      field: "index",
      headerName: "SR. No.",
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "UserName",
      headerName: "Name",
      width: 230,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 330,
      headerClassName: styles.boldHeader,
    },

    {
      field: "mobile",
      headerName: "Phone No",
      width: 230,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Message",
      headerName: "Message",
      width: 260,
      headerClassName: styles.boldHeader,
    },
  ];

  //post data by subadmin
  const postSubadminhelp = async (e) => {
    e.preventDefault();
    if (!help.UserName || !help.Email || !help.mobile || !help.Message) {
      toast.error("Please field the box");
      return;
    }

    await dispatch(
      SubadminHelpmessage({
        UserName: help.UserName,
        Email: help.Email,
        mobile: help.mobile,
        Message: help.Message,

        Role: "SUBADMIN",
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success("Message send successfull");
          setRefresh(!refresh);
          gettable();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //get subadmin table
  const gettable = async () => {
    await dispatch(getsubadmintable({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setGetuserdata(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const deletesubadmindata = async (userId) => {
    var data = { id: userId };
    await dispatch(deletesubadminhelpdata(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success("Message is deleted");
          setRefresh(!refresh);
          gettable();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };



  const userprefixBydata = async () => {
    var data = { prifix_key: userdataprifix_key };
    console.log("userprifix_key", data)
    await dispatch(userprifix_key(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success("Message is deleted");
          setRefresh(!refresh);
          gettable();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };




  const handleDropdownSelect = async (eventKey) => {
    setSelectedItem(eventKey);
    switch (eventKey) {
      case "Subadmin":
        await gettable(); // Call a function to fetch subadmin data
        break;
      case "User":
        await userprefixBydata();
        break;
      default:
        // Handle other cases if necessary
        break;
    }
  };

  useEffect(() => {
    setHelp(user);
  }, []);

  return (
    <div>
      {help.Role === "SUBADMIN" ? (
        <div className="content container-fluid ">
          <div className="row mb-2">
            <div className="col-lg-4 col-md-4" data-aos="fade-left">
              <div className="page-header">
                <div className="content-page-header">
                  <h5>Help Center</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-8" data-aos="fade-left">
              <div className="card h-100" style={{ width: "77rem" }}>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="solid-tab1">
                      <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                        <h5 className="card-title mb-0 w-auto">
                          {" "}
                          <i className="fa-solid fa-landmark pe-2"></i>How Can I
                          Help You
                        </h5>
                        <div className="pay-btn text-end w-auto"></div>
                      </div>

                      <div className="invoice-total-box px-3 border">
                        <div className="invoice-total-inner">
                          <form action="#" className="mt-3">
                            <div className="card">
                              <div className="row" style={{ gap: "0.1rem" }}>
                                <div style={{ width: "24rem" }}>
                                  <div className="input-block mb-2">
                                    <label>Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter your Name"
                                      disabled
                                      value={help.UserName}
                                      onChange={(e) => {
                                        setHelp({
                                          ...help,
                                          UserName: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div style={{ width: "23rem" }}>
                                  <div className="input-block mb-2">
                                    <label>Email ID</label>
                                    <input
                                      type="email"
                                      className="bg-white-smoke form-control"
                                      placeholder="Enter your email id"
                                      disabled
                                      value={help.Email}
                                      onChange={(e) => {
                                        setHelp({
                                          ...help,
                                          Email: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>

                                <div style={{ width: "23rem" }}>
                                  <div className="input-block mb-0">
                                    <label>Phone No</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="Enter your Number"
                                      disabled
                                      value={help.mobile}
                                      onChange={(e) => {
                                        setHelp({
                                          ...help,
                                          mobile: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                  <div className="input-block mb-0 mt-2">
                                    <label>Message</label>
                                    <textarea
                                      id="message"
                                      className="form-control"
                                      rows="4"
                                      value={help.Message}
                                      onChange={(e) => {
                                        setHelp({
                                          ...help,
                                          Message: e.target.value,
                                        });
                                      }}
                                    ></textarea>
                                    {!help.Message ? <div><p style={{ color: "red" }}>Please Enter Message</p></div> : ""}

                                  </div>
                                </div>
                                <div
                                  className="modal-footer mt-2"
                                  style={{
                                    justifyContent: "center !important",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary paid-continue-btn"
                                    onClick={postSubadminhelp}
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Select user"
                        onSelect={handleDropdownSelect}
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "end",
                          marginTop: "1rem",
                          marginRight: "1rem",
                        }}
                      >
                        <Dropdown.Item eventKey="Subadmin">
                          Subadmin
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="User">User</Dropdown.Item>
                      </DropdownButton>
                    </div>
                    {selectedItem === "Subadmin" ? (
                      <div className="mt-3">
                        <h1
                          className="col-lg-4 col-md-4"
                          data-aos="fade-left"
                          style={{ color: "black", marginTop: "3rem" }}
                        >
                          <div className="content-page-header">
                            <h1 style={{ fontSize: "2rem" }}>
                              Subadmin Detail
                            </h1>
                          </div>
                        </h1>

                        {
                          <FullDataTable
                            styles={styles}
                            columns={columns}
                            rows={getuserdata}
                          />
                        }
                      </div>
                    ) : (
                      ""
                    )}

                    {selectedItem === "User" ? (
                      <div className="mt-3">
                        <h1
                          className="col-lg-4 col-md-4"
                          data-aos="fade-left"
                          style={{ color: "black", marginTop: "3rem" }}
                        >
                          <div className="content-page-header">
                            <h1 style={{ fontSize: "2rem" }}>User Detail</h1>
                          </div>
                        </h1>

                        {
                          <FullDataTable
                            styles={styles}
                            columns={columns1}
                            rows={getuserdata}
                          />
                        }
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastButton />
    </div>
  );
};

export default Helpsubadmin;
