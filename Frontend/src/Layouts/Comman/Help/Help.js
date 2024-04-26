import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  getsubadmintable,
  userdataforhelp,
} from "../../../ReduxStore/Slice/Admin/System";

import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Helpsubadmin from "./Helpsubadmin";
import Helpuser from "./Helpuser";

function System() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [getuserdata, setGetuserdata] = useState([]);
  const [help, setHelp] = useState({
    UserName: "",
    Email: "",
    mobile: "",
    Message: "",
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
      width: 250,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 350,
      headerClassName: styles.boldHeader,
    },

    {
      field: "mobile",
      headerName: "Phone No",
      width: 250,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Message",
      headerName: "Message",
      width: 290,
      headerClassName: styles.boldHeader,
    },
  ];

  //get subadmin table
  const gettable = async () => {
    await dispatch(getsubadmintable({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setGetsubadmin(response.data);
          setRefresh(!refresh);
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
          setRefresh(!refresh);
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

  // handler for dropdown button

  const handleDropdownSelect = async (eventKey) => {
    setSelectedItem(eventKey);
    switch (eventKey) {
      case "Subadmin":
        await gettable(); // Call a function to fetch subadmin data
        break;
      case "User":
        await getusertable();
        break;
      default:
        // Handle other cases if necessary
        break;
    }
  };

  return (
    <>
      <div>
        {help.Role === "ADMIN" ? (
          <div>
            <div>
              <div>
                <div className="content container-fluid ">
                  <div className="card flex-fill bg-white">
                    <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                      <h5 className="card-title mb-0 w-auto">
                        {" "}
                        <i className="fas fa-money-bill-wave pe-2" />
                        Help
                      </h5>
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
                        <Dropdown.Item eventKey="Subadmin">Subadmin</Dropdown.Item>
                        <Dropdown.Item eventKey="User">User</Dropdown.Item>
                      </DropdownButton>

                      <div className="pay-btn text-end w-auto" />

                    </div>


                  </div>
                </div>

                {/* <div
                  className="content-page-header"
                  style={{
                    padding: "0.7rem",
                    borderBottom: "0.1rem solid black",
                  }}
                >
                  <h5>Help Center</h5>

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
                    <Dropdown.Item eventKey="Subadmin">Subadmin</Dropdown.Item>
                    <Dropdown.Item eventKey="User">User</Dropdown.Item>
                  </DropdownButton>
                </div> */}
              </div>

            </div>
          </div>
        ) : null}
        <div>
          <Helpsubadmin />
        </div>
      </div>

      <div>
        <Helpuser />
      </div>
    </>
  );
}

export default System;
