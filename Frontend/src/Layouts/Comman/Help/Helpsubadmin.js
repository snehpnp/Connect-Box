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

import Content from "../../../Components/Dashboard/Content/Content";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Loader from "../../../Utils/Loader";
import { fDateTime } from "../../../Utils/Date_formet";



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
      renderCell: (params) => <div>{fDateTime(params.value || '')}</div>,
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
        admin_id: user.user_id
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
          if (response.data.length > 0) {
            var filterData = response.data.filter((data) => data.admin_id === user.user_id);

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

  const getusertable = async () => {
    await dispatch(userdataforhelp({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          // setGetuserdata(response.data);
   

          if (response.data.length > 0) {
            var filterData = response.data.filter((data) => data.prifix_key === user.prifix_key);

            setGetuserdata(filterData);
          } else {
            setGetuserdata([]);
          }

          setLoading(false);


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






  useEffect(() => {
    setHelp(user);
    gettable()
    getusertable()
  }, [value]);

  return (
    <>

      <div data-aos="fade-left">
        <Content

          Card_title="Help  "
          Card_title_icon="fas fa-message pe-3"
          Content={
            <>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Send" {...a11yProps(0)} />
                    <Tab label="Sent Messages" {...a11yProps(1)} />
                    <Tab label="Received Messages" {...a11yProps(2)} />


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


                        <div className="invoice-total-box px-3 border">
                          <div className="invoice-total-inner">
                            <form action="#" className="mt-3">
                              <div className="card">
                                <div className="row" style={{ gap: "0.1rem" }}>
                                  <div className="row" style={{ width: "24rem" }}>
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
                                        {!help.Message ? <div><p style={{ color: "red" }}>Please Enter Message</p></div> : ""}

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
                        rows={getsubadmin}
                      />

                    </div>


                  )}

                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
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

                </CustomTabPanel>
              </Box>









            </>
          }
        />
      </div>





    </>
  );
};

export default Helpsubadmin;
