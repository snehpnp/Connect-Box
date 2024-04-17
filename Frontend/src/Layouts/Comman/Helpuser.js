import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FullDataTable from "../../Components/ExtraComponents/Tables/FullDataTable";

import {
  postuserhelp,
  userdataforhelp,
  deleteuserdata,
} from "../../ReduxStore/Slice/Admin/System";

import ToastButton from "../../Components/ExtraComponents/Alert_Toast";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Helpuser = () => {
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);
  const [getuserdata, setGetuserdata] = useState([]);
  const [help, setHelp] = useState({
    UserName: "",
    Email: "",
    mobile: "",
    Message: "",
    prifix_key: "",
  });

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

  const columns2 = [
    {
      field: "index",
      headerName: "SR. No.",
      width: 120,
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
      width: 220,
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
              delteuserdata(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  //post data by user help

  const userhelp = async (e) => {
    e.preventDefault();
    if (!help.UserName || !help.Email || !help.mobile || !help.Message) {
      toast.error("Please field the box");
      return;
    }
    await dispatch(
      postuserhelp({
        UserName: help.UserName,
        Email: help.Email,
        mobile: help.mobile,
        Message: help.Message,
        prifix_key: help.prifix_key,
        Role: "USER",
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          // setHelp(response.data);
          toast.success("Message send");
          setRefresh(!refresh);
          getusertable();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // get user help data

  const getusertable = async () => {
    await dispatch(userdataforhelp({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          // console.log("response", response.data);
          setGetuserdata(response.data);
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getusertable();
  }, []);

  //delete user help data

  const delteuserdata = async (userId) => {
    var data = { id: userId };
    await dispatch(deleteuserdata(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success("Message is deleted");
          getusertable();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // fetch data by using local storage

  useEffect(() => {
    const user = localStorage.getItem("user_details");

    setHelp(JSON.parse(user));
  }, []);

  return (
    <div>
      {help.Role === "USER" ? (
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
                                      onChange={(e) => {
                                        setHelp({
                                          ...help,
                                          Message: e.target.value,
                                        });
                                      }}
                                    ></textarea>
                                     { !help.Message ?<div><p style={{color:"red"}}>Please Enter Message</p></div>:""}
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
                                    onClick={userhelp}
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
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h1
                className="col-lg-4 col-md-4"
                data-aos="fade-left"
                style={{ color: "black",width:"76rem" }}
                
              >
                <div className="content-page-header">
                  <h1 style={{ fontSize: "2rem", marginTop: "1rem"}}>
                    User Detail
                  </h1>
                </div>
                {
                <FullDataTable
                  styles={styles}
                  columns={columns2}
                  rows={getuserdata}
                />
              }
              </h1> 
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

export default Helpuser;
