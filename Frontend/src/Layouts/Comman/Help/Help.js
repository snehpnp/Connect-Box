import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  getsubadmintable,
  userdataforhelp,
} from "../../../ReduxStore/Slice/Admin/System";
import Content from "../../../Components/Dashboard/Content/Content";
import { useDispatch } from "react-redux";


import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Loader from "../../../Utils/Loader";
import { fDateTime } from "../../../Utils/Date_formet";




function System() {
  const dispatch = useDispatch();
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [getuserdata, setGetuserdata] = useState([]);



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
      renderCell: (params) => <div>{fDateTime(params.value || '')}</div>,
    },
  ];

  //get subadmin table
  const gettable = async () => {
    await dispatch(getsubadmintable({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setGetsubadmin(response.data);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // // get user help data
  const getusertable = async () => {
    await dispatch(userdataforhelp({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setGetuserdata(response.data);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // fetch data by using local storage
  useEffect(() => {
    gettable()
    getusertable()
  }, [value]);




  return (
    <>
      <div data-aos="fade-left">
        <Content

          Card_title="Help"
          Card_title_icon="fas fa-message pe-3"
          Content={
            <>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Sub Admin" {...a11yProps(0)} />
                    <Tab label="User" {...a11yProps(1)} />

                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <>


                    {loading ? (
                      <Loader />
                    ) : (


                      <div className="mt-5">
                        <FullDataTable
                          styles={styles}
                          columns={columns1}
                          rows={getsubadmin}
                        />

                      </div>


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
                        columns={columns1}
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
}

export default System;
