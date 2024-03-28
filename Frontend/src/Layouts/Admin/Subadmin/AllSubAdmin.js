import React, { useState, useEffect } from "react";

import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../Components/Dashboard/Content/Content';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';

import { useDispatch } from "react-redux";
import { GetAllSubAdmin } from "../../../ReduxStore/Slice/Admin/Subadmins";

import { fDateTime } from '../../../Utils/Date_formet';

import axios from 'axios'; 

export default function Help() {



  const dispatch = useDispatch();

  const [getAllSubadmins, setAllSubadmins] = useState({
    loading: false,
    data: [],
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

  const [rows, setRows] = useState([]); 

   

  useEffect(() => {
    axios.post('http://localhost:7000/subadmin/getall')
      .then(response => {
        const formattedRows =response.data.data && response.data.data.map((row, index) => ({
          ...row,
          id: index + 1 
        }));
        console.log("Data From Set Row",formattedRows)
        setRows(formattedRows);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: styles.boldHeader },
    { field: 'FullName', headerName: 'First name', width: 160, headerClassName: styles.boldHeader },
    { field: 'UserName', headerName: 'User name', width: 160, headerClassName: styles.boldHeader },
    { field: 'PhoneNo', headerName: 'Phone Number', width: 180, headerClassName: styles.boldHeader },
    { field: 'prifix_key', headerName: 'prifixkey', width: 120, headerClassName: styles.boldHeader },

    {
      field: 'subadmin_service_type', headerName: 'Service-Type', width: 250, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {params.value == 1? "PER STRATEGY" : "PER TRADE"}
        </div>
      )
    },
    {
      field: 'activeState', headerName: 'Active State', width: 120, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <Switch {...label} defaultChecked />
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





  const getSubadminData = async () => {


    await dispatch(GetAllSubAdmin())
      .unwrap()
      .then(async (response) => {
        console.log("response", response.data)

        if (response.status) {

          const formattedData = response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setAllSubadmins({
            loading: false,
            data: formattedData,
          });
        } else {
          setAllSubadmins({
            loading: false,
            data: [],
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
      <Content
        Card_title="All Subadmins"
        button_title="Add"
        Card_title_icon='fas fa-user pe-3'
        route={"/admin/subadmin/add"}
        Content={
          <FullDataTable
            styles={styles}
            label={label}
            columns={columns}
            rows={getAllSubadmins.data}
          />}


      />
    </>
  );
}
