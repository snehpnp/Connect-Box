import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  getsubadmintable,
  userdataforhelp,
  getResearch,
} from "../../../ReduxStore/Slice/Admin/System";
import Content from "../../../Components/Dashboard/Content/Content";
import { useDispatch } from "react-redux";
import ExportToExcel from "../../../Utils/ExportCSV";

import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Loader from "../../../Utils/Loader";
import { fDateTime } from "../../../Utils/Date_formet";

function System() {
  const dispatch = useDispatch();
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [getuserdata, setGetuserdata] = useState([]);
  const [getResearchdata, setGetResearchdata] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [category, setCategory] = useState("All");

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
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRefresh = () => {
    setInputSearch("");
    setCategory("")
    gettable();
    getusertable();
    getResearcher();
    setrefresh(!refresh);
  };

  const categorydata = [
    "All", 
    "Panel",
    "Api Create",
    "Trade Exceute",
    "Client Panel",
    "Employee Panel",
    "Broker Response",
    "Login with api",
  ];



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
      width: 100,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "UserName",
      headerName: "User Name",
      width: 220,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 220,
      headerClassName: styles.boldHeader,
    },

    {
      field: "mobile",
      headerName: "Phone No",
      width: 220,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Message",
      headerName: "Message",
      width: 350,
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






  const columns1 = [
    {
      field: "index",
      headerName: "SR. No.",
      width: 100,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "UserName",
      headerName: "User Name",
      width: 220,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 220,
      headerClassName: styles.boldHeader,
    },

    {
      field: "mobile",
      headerName: "Phone No",
      width: 220,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Category",
      headerName: "Category",
      width: 230,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Message",
      headerName: "Message",
      width: 320,
      headerClassName: styles.boldHeader,
    },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value || "")}</div>,
    },
  ];





  //get subadmin table
  const gettable = async () => {
    await dispatch(getsubadmintable({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const filterData =
            response.data &&
            response.data.filter((item) => {
              const inputSearchMatch =
                inputSearch == "" ||
                item.UserName.toLowerCase().includes(
                  inputSearch.toLowerCase()
                ) ||
                item.Email.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.Message.toLowerCase().includes(
                  inputSearch.toLowerCase()
                ) ||
                (item.mobile &&
                  item.mobile
                    .toString()
                    .toLowerCase()
                    .includes(inputSearch.toLowerCase())) ||
                item.createdAt
                  .toLowerCase()
                  .includes(inputSearch.toLowerCase());

              return inputSearchMatch ;
            });

          const categoryMatch =
            response.data &&
            response.data.filter((item) => {
              const categorydata =
                category === "All" || item.Category === category;
              return categorydata;
            });
           
               
            setGetsubadmin(inputSearch ? filterData : response.data && category ? categoryMatch : response.data);
            

          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };



  // // get user help data
  const getusertable = async () => {
    await dispatch(userdataforhelp({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const filterData =
            response.data &&
            response.data.filter((item) => {
              const inputSearchMatch =
                inputSearch == "" ||
                item.UserName.toLowerCase().includes(
                  inputSearch.toLowerCase()
                ) ||
                item.Email.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.Message.toLowerCase().includes(
                  inputSearch.toLowerCase()
                ) ||
                (item.mobile &&
                  item.mobile
                    .toString()
                    .toLowerCase()
                    .includes(inputSearch.toLowerCase())) ||
                item.createdAt
                  .toLowerCase()
                  .includes(inputSearch.toLowerCase());

              return inputSearchMatch;
            });

          setGetuserdata(inputSearch ? filterData : response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };





  // get Research
  const getResearcher = async () => {
    await dispatch(getResearch({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const filterData = response.data.filter((item) => {
            // Search filter
            const inputSearchMatch =
              inputSearch === "" ||
              item.UserName.toLowerCase().includes(inputSearch.toLowerCase()) ||
              item.Email.toLowerCase().includes(inputSearch.toLowerCase()) ||
              item.Message.toLowerCase().includes(inputSearch.toLowerCase()) ||
              item.mobile
                .toString()
                .toLowerCase()
                .includes(inputSearch.toLowerCase()) ||
              item.createdAt.toLowerCase().includes(inputSearch.toLowerCase());

            // Category filter

            return inputSearchMatch;
          });

          setGetResearchdata(inputSearch ? filterData : response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };




  // fetch data by using local storage
  useEffect(() => {
    gettable();
  }, [value == 0, category,inputSearch]);



  useEffect(() => {
    getusertable();
  }, [value == 1,inputSearch]);



  useEffect(() => {
    getResearcher();
  }, [value == 2,inputSearch]);



  

  return (
    <>
      <div className="content container-fluid" data-aos="fade-left">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-title mb-0">
                  <i className="fe fe-users pe-2"></i>
                  Help
                </h5>
              </div>
              <div className="col-auto">
                <div className="list-btn">
                  <ul className="filter-list mb-0">
                    <li className="">
                      <p
                        className="btn-filters mb-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Refresh"
                        onClick={handleRefresh}
                      >
                        <span>
                          <i className="fe fe-refresh-ccw" />
                        </span>
                      </p>
                    </li>
                    <li className="serach-li">
                      <div className="input-group input-block">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          aria-label="Search"
                          aria-describedby="search-addon"
                          onChange={(e) => setInputSearch(e.target.value)}
                          value={inputSearch}
                        />
                      </div>
                    </li>

                    <li>
                      <div className="d-flex">
                        <div className="col-lg-12">
                          <div className="">
                            <div className="col-lg-12">
                              <select
                               className="form-control large-select" 
                               style={{ height: '40px'}}    
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                {categorydata.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div
                        className="dropdown dropdown-action"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Download"
                      >
                        <ExportToExcel
                          className="btn btn-primary "
                          fileName={"Payment Details"}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Sub Admin" {...a11yProps(0)} />
                  <Tab label="User" {...a11yProps(1)} />
                  <Tab label="Research" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <>
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="mt-5">
                        <FullDataTable
                          styles={styles}
                          columns={columns1}
                          rows={getsubadmin}
                        />
                      </div>
                    </>
                  )}
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
                      rows={getuserdata}
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
                      rows={getResearchdata}
                    />
                  </div>
                )}
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default System;
