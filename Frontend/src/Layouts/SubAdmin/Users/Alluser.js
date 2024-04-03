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
import ExportToExcel from '../../../Utils/ExportCSV'



export default function Help() {

  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('')
  const [refresh, setrefresh] = useState(false);
  const [ForGetCSV, setForGetCSV] = useState([])


  const [getAllSubadmins, setAllSubadmins] = useState({
    loading: false,
    data: [],
    data1: [],

  });


  console.log("getAllSubadmins :", getAllSubadmins.data)


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
          {params.value}
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
    console.log('Edit row:', row);
  };

  const handleDelete = (row) => {
    // Handle delete action
    console.log('Delete row:', row);
  };


  const handleChange = (event, id) => {
    // Handle delete action
    console.log('Delete row:', event, id);
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
          console.log("formattedData :", formattedData)

          const filteredData = formattedData.filter((item) => {



            const searchTermMatch =
              searchInput === '' ||
              item.FullName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.UserName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.PhoneNo.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.prifix_key.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.Balance.toLowerCase().includes(searchInput.toLowerCase())

            return searchTermMatch;

          });


          setAllSubadmins({
            loading: true,
            data: searchInput ? filteredData : formattedData,
            data1: [{ name: "Total Subadmins", count: response.totalCount || 0 }, { name: "Active Subadmins", count: response.ActiveCount || 0 }, { name: "InActive Subadmins", count: response.InActiveCount || 0 }, { name: "Total Used Balance", count: response.ActiveUseBalance || 0 }]

          });

        }

        else {
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
  }, [refresh, searchInput])



  const RefreshHandle = () => {
    console.log("cp")
    setrefresh(!refresh)
    setSearchInput('')
  }


  const forCSVdata = () => {
    let csvArr = []
    if (getAllSubadmins.data.length > 0) {
      getAllSubadmins.data.map((item) => {
        return csvArr.push({
          "FullName": item.FullName,
          "UserName": item.UserName,
          "Balance": item.Balance,
          "Email": item.Email,
          "Per Trade": item.Per_trade,
          "PhoneNo": item.PhoneNo,
          "Prifix key": item.prifix_key,
          "Strategy Percentage": item.strategy_Percentage,
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
          <div className="content container-fluid">

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
                          onClick={RefreshHandle}
                        >
                          <span>
                            <i className="fe fe-refresh-ccw" />
                          </span>
                        </p>
                      </li>
                      <li>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search"
                            aria-describedby="search-addon"
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                          />

                        </div>
                      </li>

                      <li>
                        <p
                          className="btn btn-filters w-auto popup-toggle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Filter"
                          href='/'
                        >
                          <span className="me-2">
                            <img src="assets/img/icons/filter-icon.svg" alt="filter" />
                          </span>
                          Filter
                        </p>
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
                                apiData={ForGetCSV}
                                fileName={'All User'} />
                            </div>
                           
                        </div>
                      </li>
                      
                      <li>
                        <Link to={'/admin/subadmin/add'}
                          className="btn btn-primary"


                        >
                          <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                          Add Subadmins
                        </Link>
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
