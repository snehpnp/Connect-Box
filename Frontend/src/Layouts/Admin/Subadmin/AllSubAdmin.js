import * as React from 'react';
import { useEffect, useState } from 'react';
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Content from '../../../Components/Dashboard/Content/Content';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import Switch from '@mui/material/Switch';
import axios from 'axios'; 

export default function Help() {
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
    { field: 'FullName', headerName: 'FullName', width: 130, headerClassName: styles.boldHeader },
    { field: 'UserName', headerName: 'UserName', width: 130, headerClassName: styles.boldHeader },
    { field: 'PhoneNo', headerName: 'Phone Number', width: 150, headerClassName: styles.boldHeader },
    { field: 'Start_Date', headerName: 'Start Date', width: 120, headerClassName: styles.boldHeader },
    { field: 'End_Date', headerName: 'End Date', width: 120, headerClassName: styles.boldHeader },
    { field: 'Create_Date', headerName: 'Create Date', width: 150, headerClassName: styles.boldHeader },
    { field: 'broker', headerName: 'Broker', width: 120, headerClassName: styles.boldHeader },
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
  ];

  const handleEdit = (row) => {
    // Handle edit action
    console.log('Edit row:', row);
  };

  const handleDelete = (row) => {
    // Handle delete action
    console.log('Delete row:', row);
  };

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
            rows={rows}
          />
        }
      />
    </>
  );
}
