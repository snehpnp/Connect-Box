import React, { useEffect, useState } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  getadmindata,
  updateBalance,
  Adminhistory,
  Subadmindetail,
  getuserdata,
} from "../../../ReduxStore/Slice/SuperAdmin/SuperAdmin";

import { GetAllUsers } from "../../../ReduxStore/Slice/Subadmin/UsersSlice";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { Plus } from "lucide-react";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import toast from "react-hot-toast";
import ExportToExcel from "../../../Utils/ExportCSV";
import { Link } from "react-router-dom";

const Panel = () => {
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;

  const [Panel, setPanel] = useState([]);
  const [open, setOpen] = useState(false);
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [subSearch, setSubSearch] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [update, setUpdate] = useState({
    _id: "",
    Balance: "",
  });
  const [getid,setGetid] = useState([])
  const [getAllUsers, setAllUsers] = useState({
    loading: true,
    data: [],
    data1: [],
  });


  const handleRefresh = () => {
    getadmintable();
    setRefresh(!refresh);
  };

  /// get admin table

  const getadmintable = async () => {
    await dispatch(getadmindata({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setPanel(response.data);
          setUpdate({ ...update, _id: response.data[0]._id });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getadmintable();
  }, []);

  // update balance

  const BalanceBtn = async () => {
    await dispatch(
      updateBalance({
        _id: update._id,
        Balance: update.Balance,
        parent_id: user_id,
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setUpdate({ ...update, Balance: "" });
          setOpen(!open);
          toast.success("Balance added successfully");
          getadmintable();
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // get subadmin data

  const getsubadminDetail = async () => {
    await dispatch(Subadmindetail({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
        
          setGetsubadmin(response.data);
          setGetid(response.data[0]._id)
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


 
   const getUsersData = async () => {
    var data = { user_ID:getid }
    await dispatch(GetAllUsers(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          const formattedData = response.data && response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          setAllUsers({
            loading: false,
            data: formattedData,

          });

        } else {

          setAllUsers({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((error) => {

        setAllUsers({
          loading: true,
          data: [],
          data1: [],
        });
      });
  };


  


  useEffect(() => {
    getsubadminDetail();
    getUsersData()
  
  }, []);

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
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "FullName",
      headerName: "Name",
      width: 160,
      headerClassName: styles.boldHeader,
    },
    {
      field: "UserName",
      headerName: "UserName",
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 260,
      headerClassName: styles.boldHeader,
    },

    {
      field: "PhoneNo",
      headerName: "Phone No",
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Balance",
      headerName: "Balance",
      width: 190,
      headerClassName: styles.boldHeader,
    },
    {
      field: "actions",
      headerName: "Add Balance",
      width: 130,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="Add"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {" "}
            <Plus />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="content container-fluid" data-aos="fade-left">
        <div className="page-header">
          <div className="content-page-header">
            <h5>All Users</h5>
            <div className="page-content">
              <div className="list-btn">
                <ul className="filter-list">
                  <li className="mt-3">
                    <p
                      className="btn-filters"
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
                  <li>
                    <div className="input-group input-block">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="search-addon"
                      />
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown dropdown-action"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Download"
                    >
                      <div className="card-body">
                        <ExportToExcel
                          className="btn btn-primary "
                          fileName={"All Strategy"}
                        />
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="d-flex">
                      <div className="col-lg-12">
                        <div className="">
                          <div className="col-lg-12">
                            <select
                              className="form-control large-select"
                              style={{ height: "40px" }}
                              value={subSearch}
                              onChange={(e) => setSubSearch(e.target.value)}
                            >
                              {getsubadmin &&
                                getsubadmin.map((data, index) => (
                                  <option key={index}>{data.FullName}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {<FullDataTable styles={styles} columns={columns} rows={Panel} />}
        {open && (
          <div className="modal custom-modal d-block kk" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <div className="form-header modal-header-title text-start mb-0">
                    <h4 className="mb-0">Add Balance</h4>
                  </div>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setOpen(!open)}
                  ></button>
                </div>

                <form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-lg-12 col-sm-12">
                        <div className="input-block mb-3">
                          <label>Balance</label>

                          <input
                            type="Number"
                            className="form-control"
                            placeholder="Enter Balance"
                            value={update.Balance}
                            onChange={(e) =>
                              setUpdate({ ...update, Balance: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-back cancel-btn me-2"
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      // data-bs-dismiss="modal"
                      className="btn btn-primary paid-continue-btn"
                      onClick={BalanceBtn}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <ToastButton />
      </div>
    </>
  );
};

export default Panel;
