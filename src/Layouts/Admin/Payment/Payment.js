import React from 'react'
import Content from '../../../Components/Dashboard/Content/Content'
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';

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
import { FileText } from 'lucide-react';

function Payment() {


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
      marginRight: 12,

    },
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: styles.boldHeader },

    {
      field: 'profile', headerName: 'Profile', width: 120, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>

          <a href="profile.html" class="company-avatar avatar-md me-2 companies company-icon">
            <img class="avatar-img rounded-circle company" src="assets/img/companies/company-05.svg" alt="Company Image" /></a>


        </div>

      )
    },
    { field: 'firstName', headerName: 'First name', width: 170, headerClassName: styles.boldHeader },

    { field: 'phoneNumber', headerName: 'Phone Number', width: 150, headerClassName: styles.boldHeader },
    { field: 'Plan', headerName: 'Plan', width: 150, headerClassName: styles.boldHeader },

    { field: 'Payment', headerName: 'Payment', width: 150, headerClassName: styles.boldHeader },



    {
      field: 'Status', headerName: 'Status', width: 120, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div >
          <span className="badge bg-success-light">Paid</span>
        </div>
      )
    },


    {
      field: 'invoice', headerName: 'invoice', width: 120, headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <FileText style={{ color: "#febd62" }} />
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
    { field: 'createDate', headerName: 'Create Date', width: 150, headerClassName: styles.boldHeader },

    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   width: 130,
    //   renderCell: (params) => (
    //     <div>
    //       <IconButton aria-label="edit" size="small" onClick={() => handleEdit(params.row)}>
    //         <EditIcon />
    //       </IconButton>
    //       <IconButton aria-label="delete" size="small" onClick={() => handleDelete(params.row)}>
    //         <DeleteIcon />
    //       </IconButton>
    //     </div>
    //   ),
    //   headerClassName: styles.boldHeader,
    // },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, phoneNumber: '123-456-7890', Plan: '2023-01-01', Payment: '2024-01-01', createDate: '2022-12-31', Status: 'Active', broker: 'Broker A' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, phoneNumber: '234-567-8901', Plan: '2023-02-01', Payment: '2024-02-01', createDate: '2022-12-30', Status: 'Inactive', broker: 'Broker B' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, phoneNumber: '345-678-9012', Plan: '2023-03-01', Payment: '2024-03-01', createDate: '2022-12-29', Status: 'Active', broker: 'Broker C' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, phoneNumber: '456-789-0123', Plan: '2023-04-01', Payment: '2024-04-01', createDate: '2022-12-28', Status: 'Inactive', broker: 'Broker D' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, phoneNumber: '567-890-1234', Plan: '2023-05-01', Payment: '2024-05-01', createDate: '2022-12-27', Status: 'Active', broker: 'Broker E' },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, phoneNumber: '678-901-2345', Plan: '2023-06-01', Payment: '2024-06-01', createDate: '2022-12-26', Status: 'Inactive', broker: 'Broker F' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, phoneNumber: '789-012-3456', Plan: '2023-07-01', Payment: '2024-07-01', createDate: '2022-12-25', Status: 'Active', broker: 'Broker G' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, phoneNumber: '890-123-4567', Plan: '2023-08-01', Payment: '2024-08-01', createDate: '2022-12-24', Status: 'Inactive', broker: 'Broker H' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, phoneNumber: '901-234-5678', Plan: '2023-09-01', Payment: '2024-09-01', createDate: '2022-12-23', Status: 'Active', broker: 'Broker I' },

  ];


  const handleEdit = (row) => {
    // Handle edit action
    console.log('Edit row SNEH:', row);
  };

  const handleDelete = (row) => {
    // Handle delete action
    console.log('Delete row SNEH:', row);
  };


  return (

    <>

      <Content
        // Page_title="Payment Information"
        Card_title="Payment Details"
        button_title="Add"
        Card_title_icon='fas fa-image pe-2'
        Content={
          <FullDataTable
            styles={styles}
            label={label}
            columns={columns}
            rows={rows}

          />}
      />
    </>

  )
}

export default Payment