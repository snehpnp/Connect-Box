import React, { useEffect, useState } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { getadmindata } from "../../../ReduxStore/Slice/SuperAdmin/SuperAdmin";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { Plus } from 'lucide-react';

const Panel = () => {
  const dispatch = useDispatch();

  const [Panel, setPanel] = useState([]);
  const [open,setOpen] = useState(false)
  
 
  const getadmintable = async () => {
    await dispatch(getadmindata({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          console.log("response", response.data);
          setPanel(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getadmintable();
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
      headerName: "Add Admin",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="Add"
            size="small"
            //   onClick={() => {
            //     deletesubadmindata(params.row._id);
            //   }}
          >
            {" "}
            <Plus />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{maxWidth:"78rem",marginLeft:"1rem"}}>
      {<FullDataTable styles={styles} columns={columns} rows={Panel} />}
         
    </div>
     
  );
};

export default Panel;
