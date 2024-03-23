import * as React from 'react';
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
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: styles.boldHeader },
    { field: 'firstName', headerName: 'First name', width: 130, headerClassName: styles.boldHeader },
    { field: 'lastName', headerName: 'Last name', width: 130, headerClassName: styles.boldHeader },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150, headerClassName: styles.boldHeader },
    { field: 'startDate', headerName: 'Start Date', width: 120, headerClassName: styles.boldHeader },
    { field: 'endDate', headerName: 'End Date', width: 120, headerClassName: styles.boldHeader },
    { field: 'createDate', headerName: 'Create Date', width: 150, headerClassName: styles.boldHeader },
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

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, phoneNumber: '123-456-7890', startDate: '2023-01-01', endDate: '2024-01-01', createDate: '2022-12-31', activeState: 'Active', broker: 'Broker A' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, phoneNumber: '234-567-8901', startDate: '2023-02-01', endDate: '2024-02-01', createDate: '2022-12-30', activeState: 'Inactive', broker: 'Broker B' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, phoneNumber: '345-678-9012', startDate: '2023-03-01', endDate: '2024-03-01', createDate: '2022-12-29', activeState: 'Active', broker: 'Broker C' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, phoneNumber: '456-789-0123', startDate: '2023-04-01', endDate: '2024-04-01', createDate: '2022-12-28', activeState: 'Inactive', broker: 'Broker D' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, phoneNumber: '567-890-1234', startDate: '2023-05-01', endDate: '2024-05-01', createDate: '2022-12-27', activeState: 'Active', broker: 'Broker E' },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, phoneNumber: '678-901-2345', startDate: '2023-06-01', endDate: '2024-06-01', createDate: '2022-12-26', activeState: 'Inactive', broker: 'Broker F' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, phoneNumber: '789-012-3456', startDate: '2023-07-01', endDate: '2024-07-01', createDate: '2022-12-25', activeState: 'Active', broker: 'Broker G' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, phoneNumber: '890-123-4567', startDate: '2023-08-01', endDate: '2024-08-01', createDate: '2022-12-24', activeState: 'Inactive', broker: 'Broker H' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, phoneNumber: '901-234-5678', startDate: '2023-09-01', endDate: '2024-09-01', createDate: '2022-12-23', activeState: 'Active', broker: 'Broker I' },

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

        // Page_title="All Subadmins"
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
          />}


      />

    </>
  );
}
