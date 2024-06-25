import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { IndianRupee } from 'lucide-react';
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import ExportToExcel from '../../../Utils/ExportCSV'
import { useNavigate, useLocation } from "react-router-dom";
import {
  GetAllSubAdmin,
  update_Balance, Show_Status
} from "../../../ReduxStore/Slice/Admin/Subadmins";
import { fDateTime } from "../../../Utils/Date_formet";
import Loader from "../../../Utils/Loader";
import Swal from 'sweetalert2';




export default function Help() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [initialRowData, setInitialRowData] = useState({});
  const [getAllSubadmins, setAllSubadmins] = useState({
    loading: false,
    data: [],
    data1: [],
  });
  const [balanceValue, setBalanceValue] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [modal, setmodal] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [ForGetCSV, setForGetCSV] = useState([])
  const [selectServiceType , setSelectServiceType] = useState('')
 

  const admin_id = JSON.parse(localStorage.getItem("user_details")).user_id


  const location = useLocation();
  var dashboard_filter = location.search.split("=")[1];




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
      fontWeight: 800,


    },
    headerButton: {
      marginRight: 8,

    },

  };



  const label = { inputProps: { "aria-label": "Switch demo" } };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div> <b>{params.value + 1}</b></div>
      ),
    },

    {
      field: "UserName",
      headerName: "User Name",
      width: 200,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 220,
      headerClassName: styles.boldHeader,
    },
    {
      field: "PhoneNo",
      headerName: "Phone Number",
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "client_key",
      headerName: "Client Key",
      width: 185,
      headerClassName: styles.boldHeader,
    },

    {
      field: "subadmin_service_type",
      headerName: "Service-Type",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div> <b>{params.value == 2 ? "PER STRATEGY" : "PER TRADE"}</b></div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
      headerClassName: styles.boldHeader,
    },
    {
      field: "Balance",
      headerName: "Add Balance",
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: '#E1FFED', // Green
            border: 'none',
            color: '#33B469',
            // width: "150px",
            padding: '6px 10px', // Adjusted padding
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '13px',
            // margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '10px', // Rounded border radius
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => { setmodal(true); setInitialRowData(params.row); }}
        >
          <span style={{ fontWeight: 'bold', verticalAlign: 'middle' }}> +
            <IndianRupee style={{ height: "16px", marginBottom: '-4px', marginRight: '0px', padding: "0" }} />
            {params.value || '-'}
          </span>
        </div>


      ),
    },

    {
      field: "ActiveStatus",
      headerName: "Status",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div className="status-toggle">
          <input
            id={`rating_${params.row.id}`}
            className="check"
            type="checkbox"
            onChange={(event) => handleSwitchChange(event, params.row._id)}
            defaultChecked={params.value == 1}
          />
          <label htmlFor={`rating_${params.row.id}`} className="checktoggle checkbox-bg"></label>
        </div>
      ),
    },

    {
      field: "Create_Date",
      headerName: "Account Created At",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value)}</div>,
    },
  ];



  const handleEdit = (row) => {
    setInitialRowData(row);
    navigate('/admin/subadmin/edit/' + row._id)
  };




  const handleSwitchChange = async (event, id) => {
    const user_active_status = event.target.checked ? 1 : 0;

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      allowOutsideClick: false, // Prevents closing modal by clicking outside or pressing Esc key
    });

    if (result.isConfirmed) {
      try {
        const response = await dispatch(Show_Status({ id, user_active_status })).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Saved!",
            icon: "success",
            timer: 1000,
            timerProgressBar: true
          });
          setTimeout(() => {
            Swal.close(); // Close the modal
            setrefresh(!refresh);
          }, 1000);
        } else {
          setrefresh(!refresh);
        }
      } catch (error) {
        console.error("Error", error);
        Swal.fire("Error", "There was an error processing your request.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.reload();
    }
  };




  const handleSubmit = async () => {
    var data = { id: initialRowData._id, Balance: balanceValue, admin_id: admin_id }
    await dispatch(update_Balance(data))
      .unwrap()
      .then(async (response) => {

        if (response.status) {
          toast.success(response.msg);
          setrefresh(!refresh)

        } else {
          toast.error(response.msg);

        }
      })
      .catch((error) => {
        console.log("Error", error);

      });

    setBalanceValue("")
    setmodal(false);

  };



  const getSubadminData = async () => {
    await dispatch(GetAllSubAdmin())
      .unwrap()
      .then(async (response) => {

        if (response.status) {
            let formattedData = response.data && response.data.map((row, index) => ({
              ...row,
              id: index + 1,
            }));
         
            var formattedData1
            if (dashboard_filter == 2) {
              formattedData1 = formattedData.filter(data => data.ActiveStatus == 1);
            } else if (dashboard_filter == 3) {
              formattedData1 = formattedData.filter(data => data.ActiveStatus == 0);
            } else if (dashboard_filter == 1 || dashboard_filter==undefined ) {
              formattedData1 = formattedData
            } 


         
            let formattedData2
            if(selectServiceType==0){
              formattedData2 = formattedData1
            }
            else if(selectServiceType==1){
              formattedData2 = formattedData1.filter(data => data.subadmin_service_type == 1);
            }
            else if(selectServiceType==2){
              formattedData2 = formattedData1.filter(data => data.subadmin_service_type == 2);

            }


            const filterData = formattedData2.filter(item => {
              const inputSearchMatch =
                inputSearch === ''||
                item.UserName.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.FullName.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.PhoneNo.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.prifix_key.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.Email.toLowerCase().includes(inputSearch.toLowerCase()) ||
                item.Balance.toLowerCase().includes(inputSearch.toLowerCase());

              return inputSearchMatch;
            });

            setAllSubadmins({
              loading: true,
              data: inputSearch ? filterData : formattedData2,
              data1: [],
            });
        } else {
          setAllSubadmins({
            loading: true,
            data: [],
            data1: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setAllSubadmins({
          loading: true,
          data: [],
        });
      });
  };




  useEffect(() => {
    getSubadminData();
  }, [refresh, inputSearch , selectServiceType]);

  const handleRefresh = () => {
    setInputSearch('')
    setSelectServiceType('')
    setrefresh(!refresh)

  }

  const forCSVdata = () => {
    let csvArr = []
    if (getAllSubadmins.data.length > 0) {
      getAllSubadmins.data.map((item) => {
        return csvArr.push({
          "FullName": item.FullName,
          "UserName": item.UserName,
          "PhoneNo": item.PhoneNo,
          "Prifix Key": item.prifix_key,
          "Service Type": item.subadmin_service_type == 1 ? "Per Trade" : "Per Strategy",
          "Balance": item.Balance
        })
      })

      setForGetCSV(csvArr)
    }

  }

  useEffect(() => {
    forCSVdata()
  }, [getAllSubadmins.data])


  return (
    <>
      {getAllSubadmins.loading ? (
        <>
          <div className="content container-fluid" data-aos="fade-left">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="card-title mb-0">
                      <i className="fe fe-users pe-2" ></i>
                      All Sub-Admins</h5>
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
                        <li className="serach-li">
                          <div className="input-group input-block">
                             <select className="rounded form-control border-0 px-4"
                              style={{height:"2.5rem"}}
                              onChange={(e) => setSelectServiceType(e.target.value)}
                              value={selectServiceType}
                              >
                              <option value="0" >Service Type</option>
                              <option value="1">Per Trade</option>
                              <option value="2">Per Strategy</option>
                             </select>
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
                              apiData={ForGetCSV}
                              fileName={'All Subadmin'} />


                          </div>
                        </li>

                        <li>
                          <Link
                            to={"/admin/subadmin/add"}
                            className="btn btn-primary"
                          >
                            <i
                              className="fa fa-plus-circle me-2"
                              aria-hidden="true"
                            />
                            Add Subadmins
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>


              </div>
              <div className="card-body">

                <FullDataTable
                  styles={styles}
                  label={label}
                  columns={columns}
                  rows={getAllSubadmins.data}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}


      {modal && (
        <div className="modal custom-modal d-block" id="add_vendor" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Fund</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setmodal(false)}
                ></button>
              </div>
              <div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="input-block mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Fund"
                          onChange={(e) => {
                            const value = e.target.value;
                            const newValue = value.replace(/\D/g, '');
                            e.target.value = newValue;
                            setBalanceValue(e.target.value)
                          }}
                          value={balanceValue}

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
                    onClick={() => setmodal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary paid-continue-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  );
}
