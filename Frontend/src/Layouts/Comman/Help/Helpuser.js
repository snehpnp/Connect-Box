import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { postuserhelp, userdataforhelp, deleteuserdata } from "../../../ReduxStore/Slice/Admin/System";
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

const Helpuser = () => {
  const dispatch = useDispatch();
  const [getuserdata, setGetuserdata] = useState([]);
  const [help, setHelp] = useState({
    UserName: "",
    Email: "",
    mobile: "",
    Message: "",
    prifix_key: "",
  });

  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const columns2 = [
    {
      field: "index",
      headerName: "SR. No.",
      width: 120,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "UserName",
      headerName: "Name",
      width: 190,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 290,
    },
    {
      field: "mobile",
      headerName: "Phone No",
      width: 210,
    },
    {
      field: "Message",
      headerName: "Message",
      width: 220,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value || '')}</div>,
    }

  ];

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


  const getusertable = async () => {

    await dispatch(userdataforhelp({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setGetuserdata(response.data);
          setLoading(false);

        }
      })
      .catch((error) => {
        console.log("error", error);
      });

  };


  const userhelp = async (e) => {
    e.preventDefault();
    if (!help.UserName || !help.Email || !help.mobile || !help.Message) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await dispatch(postuserhelp({
        UserName: help.UserName,
        Email: help.Email,
        mobile: help.mobile,
        Message: help.Message,
        prifix_key: help.prifix_key,
        Role: "USER",
      }));
      if (response.status) {
        toast.success("Message sent");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user_details");
    setHelp(JSON.parse(user));
  }, []);







  useEffect(() => {
    getusertable();
  }, [value]);


  return (
    <div>
      <Content
        Card_title="Help"
        Card_title_icon="fas fa-message pe-3"
        Content={
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Send" {...a11yProps(0)} />
                <Tab label="Sent Messages" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="invoice-total-box">
                <div className="invoice-total-inner">
                  <form action="#" className="mt-3" onSubmit={(e) => e.preventDefault()}>
                    <div className="row" >
                      <div className="col-md-7 order-2 order-md-1">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="input-block mb-2">
                              <label>Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your Name"
                                disabled
                                value={help.UserName}
                                onChange={(e) => setHelp({ ...help, UserName: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-block mb-2">
                              <label>Email ID</label>
                              <input
                                type="email"
                                className="bg-white-smoke form-control"
                                placeholder="Enter your email id"
                                disabled
                                value={help.Email}
                                onChange={(e) => setHelp({ ...help, Email: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-block mb-0">
                              <label>Phone No</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter your Number"
                                disabled
                                value={help.mobile}
                                onChange={(e) => setHelp({ ...help, mobile: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="input-block mb-0 mt-2">
                              <label>Message</label>
                              <textarea
                                id="message"
                                className="form-control"
                                placeholder="Please Enter Message"
                                rows="4"
                                value={help.Message}
                                onInput={(e) => setHelp({ ...help, Message: e.target.value })}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          data-bs-dismiss="modal"
                          className="btn btn-primary paid-continue-btn"
                          onClick={userhelp}
                        >
                          Send
                        </button>
                      </div>
                      <div className="col-md-5 order-1  order-md-2">
                        <img className="mx-auto text-center" src="/assets/img/category/Call-center.png" style={{ width: '350px', display: 'block' }} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {loading ? (
                <Loader />
              ) : (
                <div className="mt-5">
                  <FullDataTable
                    // styles={styles}
                    columns={columns2}
                    rows={getuserdata}
                  />
                </div>
              )}
            </CustomTabPanel>
          </Box>
        }
      />
      <ToastButton />
    </div>
  );
};

export default Helpuser;
