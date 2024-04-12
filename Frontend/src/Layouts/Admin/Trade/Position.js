import React, { useState, useEffect } from "react";

import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';

import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';

import { useDispatch } from "react-redux";
import { GetAllSubAdmin } from "../../../ReduxStore/Slice/Admin/Subadmins";

import { fDateTime } from '../../../Utils/Date_formet';

import Loader from '../../../Utils/Loader';



export default function Help() {

  const dispatch = useDispatch();

  const [getAllSubadmins, setAllSubadmins] = useState({
    loading: false,
    data: [],
    data1: [],

  });


  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
    },
    card: {
      width: 'auto',
    },
    boldHeader: {
      fontWeight: 'bold',
    },
    headerButton: {
      marginRight: 8,
    },
  };



  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: styles.boldHeader },
    { field: 'FullName', headerName: 'First name', width: 160, headerClassName: styles.boldHeader },
    { field: 'UserName', headerName: 'User name', width: 160, headerClassName: styles.boldHeader },
    { field: 'PhoneNo', headerName: 'Phone Number', width: 180, headerClassName: styles.boldHeader },
    { field: 'prifix_key', headerName: 'prifixkey', width: 120, headerClassName: styles.boldHeader },

    {
      field: 'subadmin_service_type', headerName: 'Service-Type', width: 200, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value == 1 ? "PER STRATEGY" : "PER TRADE"}
        </div>
      )
    },
    {
      field: 'Balance', headerName: 'Balance', width: 120, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value }
        </div>
      )
    },
    {
      field: 'ActiveStatus', 
      headerName: 'Active State', 
      width: 120, 
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <Switch
            defaultChecked={params.value == 1} 
            onChange={(event) => handleChange(event, params.row.id)} 
            {...label}
          />
        </div>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      headerClassName: styles.boldHeader,
    },
    {
      field: 'Create_Date', headerName: 'createdAt', width: 250, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {fDateTime(params.value)}
        </div>
      )
    },

  ];


  const handleEdit = (row) => {
    // Handle edit action
  };

  const handleDelete = (row) => {
    // Handle delete action
  };


  const handleChange = (event,id) => {
    // Handle delete action
  };



  const getSubadminData = async () => {


    await dispatch(GetAllSubAdmin())
      .unwrap()
      .then(async (response) => {

        if (response.status) {
          const formattedData = response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setAllSubadmins({
            loading: true,
            data: formattedData,
            data1: [{ name:"Total Trade",count: response.totalCount || 0 }, { name:"Open Positions",count: response.ActiveCount|| 0 }, { name:"Close Positions",count: response.InActiveCount || 0 }, {name:"Total Used Balance", count: response.ActiveUseBalance || 0 }]

          });
        } else {
          setAllSubadmins({
            loading: false,
            data: [],
            data1: [],

          });
        }

      })
      .catch((error) => {
        console.log("Error", error);
        setAllSubadmins({
          loading: false,
          data: [],
        });
      });
  };

  useEffect(() => {
    getSubadminData()
  }, [])




  return (
    <>
      {getAllSubadmins.loading ? (
        <>
          <div className="content container-fluid">
         
            <div className="page-header">
              <div className="content-page-header">
                <h5>Positions</h5>
                <div className="page-content">
                  <div className="list-btn">
                    <ul className="filter-list">
                      <li>
                        <a
                          className="btn-filters"
                           // href="javascript:void(0);"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Refresh"
                        >
                          <span>
                            <i className="fe fe-refresh-ccw" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <div className="input-group">
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
                        <a
                          className="btn btn-filters w-auto popup-toggle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Filter"
                        >
                          <span className="me-2">
                            <img src="assets/img/icons/filter-icon.svg" alt="filter" />
                          </span>
                          Filter
                        </a>
                      </li>

                      <li>
                        <div
                          className="dropdown dropdown-action"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Download"
                        >
                          <a
                            href="/"
                            className="btn btn-filters"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="me-2">
                              <i className="fe fe-download" />
                            </span>
                            Export
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <ul className="d-block">
                              <li>
                                <a
                                  className="d-flex align-items-center download-item"
                                   // href="javascript:void(0);"
                                  download=""
                                >
                                  <i className="far fa-file-pdf me-2" />
                                  Export as PDF
                                </a>
                              </li>
                              <li>
                                <a
                                  className="d-flex align-items-center download-item"
                                   // href="javascript:void(0);"
                                  download=""
                                >
                                  <i className="far fa-file-text me-2" />
                                  Export as Excel
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a
                          className="btn btn-filters"
                           // href="javascript:void(0);"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Print"
                        >
                          <span className="me-2">
                            <i className="fe fe-printer" />
                          </span>{" "}
                          Print
                        </a>
                      </li>
                
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-list-head">
              <div className="row">
                {getAllSubadmins && getAllSubadmins.data1.map((data, index) => (
                  <div className="col-xl-3 col-md-6 d-flex" key={index}>
                    <div className="card w-100">
                      <div className="card-body">
                        <div className="grid-info-item total-items">
                          <div className="grid-info">
                            <span>{data.name}</span>
                            <h4>{data.count}</h4>
                          </div>
                          <div className="grid-head-icon">
                            <i className="fe fe-life-buoy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>






            <FullDataTable
              styles={styles}
              label={label}
              columns={columns}
              rows={getAllSubadmins.data}
            />

          </div>

        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
