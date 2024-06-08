import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  SubadminHelpmessage,
  getResearch,
} from "../../../ReduxStore/Slice/Admin/System";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Content from "../../../Components/Dashboard/Content/Content";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Loader from "../../../Utils/Loader";
import { fDateTime } from "../../../Utils/Date_formet";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Swal from "sweetalert2";

const HelpResearcher = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user_details"));
  const userdataprifix_key = JSON.parse(
    localStorage.getItem("user_details")
  ).prifix_key;

  const [refresh, setRefresh] = useState(false);
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [help, setHelp] = useState({
    UserName: "",
    Email: "",
    mobile: "",
    Message: "",
  });
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("0");

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
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value || "")}</div>,
    },
  ];



  // post for researcher 
  const postResearcher = async (e) => {
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
        Role: "RESEARCH",
        admin_id: user.user_id,
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setHelp({ Message: "" });
          let timerInterval;
          Swal.fire({
            title: "Messgage Send!",
            html: "I will close in <b></b> milliseconds.",
            timer: 1200,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };



  // get table for researcher 
  const gettable = async () => {
    await dispatch(getResearch({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          if (response.data.length > 0) {
            var filterData = response.data.filter(
              (data) => data.admin_id === user.user_id
            );

            setGetsubadmin(filterData);
          } else {
            setGetsubadmin([]);
          }

          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    setHelp(user);
    gettable();
  }, [value]);



  
  return (
    <>
      <div data-aos="fade-left">
        <Content
          Card_title="Help  "
          Card_title_icon="fas fa-message pe-3"
          Content={
            <>
              <Box sx={{ width: "100%" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Send" value="0" />
                      <Tab label="Sent Messages" value="1" />
                    </TabList>
                  </Box>

                  <TabPanel value="0">
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
                          <div className="invoice-total-box ">
                            <div className="invoice-total-inner">
                              <form action="#" className="mt-3">
                                <div className="card">
                                  <div
                                    className="row"
                                    style={{ gap: "0.1rem" }}
                                  >
                                    <div
                                      className="row"
                                      style={{ width: "24rem" }}
                                    >
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

                                    <div className="col-lg-12  d-flex">
                                      <div className="col-lg-6 col-md-6">
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
                                        </div>
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
                                        onClick={postResearcher}
                                        style={{marginTop:"20px"}}
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
                    </>
                  </TabPanel>
                  <TabPanel value="1">
                    {loading ? (
                      <Loader />
                    ) : (
                      <div className="mt-5">
                        <FullDataTable
                          styles={styles}
                          columns={columns}
                          rows={getsubadmin}
                        />
                      </div>
                    )}
                  </TabPanel>
                  {/* <TabPanel value="2" >
                  {loading ? (
                    <Loader />
                  ) : (


                    <div className="mt-5">
                      <FullDataTable
                        styles={styles}
                        columns={columns}
                        rows={getuserdata}
                      />

                    </div>


                  )}

                </TabPanel> */}
                </TabContext>
              </Box>
            </>
          }
        />
      </div>
    </>
  );
};

export default HelpResearcher;
