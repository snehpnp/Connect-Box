import React, { useEffect, useState } from 'react'
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable'
import { Get_All_Researcher } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";


const AllResearcher = () => {
  const dispatch = useDispatch();

  const [allResearcher, setAllResearcher] = useState({
    loading: false,
    data: []
  })

  const user_id = JSON.parse(localStorage.getItem('user_details')).user_id



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
      headerName: "User name",
      width: 160,
      headerClassName: styles.boldHeader,
    },
    {
      field: "FullName",
      headerName: "Full name",
      width: 160,
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
      field: "prifix_key",
      headerName: "Prefix Key",
      width: 120,
      headerClassName: styles.boldHeader,
    },

    // {
    //   field: "subadmin_service_type",
    //   headerName: "Service-Type",
    //   width: 200,
    //   headerClassName: styles.boldHeader,
    //   renderCell: (params) => (
    //     <div> <b>{params.value == 2 ? "PER STRATEGY" : "PER TRADE"}</b></div>
    //   ),
    // },
    {
      field: "Balance",
      headerName: "Balance",
      width: 120,
      headerClassName: styles.boldHeader,
      // renderCell: (params) => (
        // <div onClick={() => { setmodal(true); setInitialRowData(params.row); }}>
        //   <span className="text-success-light">
        //     <IndianRupee style={{ height: "19px" }} />
        //     {params.value || '-'}
        //   </span>
        // </div>
      // ),
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
            // onChange={(event) => handleSwitchChange(event, params.row._id)}
            defaultChecked={params.value == 1}
          />
          <label htmlFor={`rating_${params.row.id}`} className="checktoggle checkbox-bg"></label>
        </div>
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
            // onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            // onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
      headerClassName: styles.boldHeader,
    },


  ]

  const GetAllResearcher = async () => {
    let data = { id: user_id };
    try {
      const response = await dispatch(Get_All_Researcher(data)).unwrap();
      if (response.status) {
        setAllResearcher({
          loading: true,
          data: response.data
        });
      } else {
        setAllResearcher({
          loading: false,
          data: []
        });
      }
    } catch (err) {
      console.log("Error in fetching data", err);
    }
  };

  useEffect(() => {
    GetAllResearcher();
  }, [])

  return (
    <>

      <div className="content container-fluid" data-aos="fade-left">
        <div className="page-header">
          <div className="content-page-header">
            <h5>Researchers</h5>
            <div className="page-content">
              <div className="list-btn">
                <ul className="filter-list">
                  <li className="mt-3">
                    <p
                      className="btn-filters"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Refresh"
                      // onClick={handleRefresh}
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
                        // onChange={(e) => setInputSearch(e.target.value)}
                        // value={inputSearch}
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
                        {/* <ExportToExcel
                          className="btn btn-primary "
                          apiData={ForGetCSV}
                          fileName={'All Strategy'} /> */}
                      </div>

                    </div>
                  </li>

                  <li>
                    <Link
                      to={"/admin/research/add"}
                      className="btn btn-primary"
                    >
                      <i
                        className="fa fa-plus-circle me-2"
                        aria-hidden="true"
                      />
                      Add Researcher
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <FullDataTable
          styles={styles}
          columns={columns}
          rows={allResearcher.data}
        />
      </div>
    </>


  )
}

export default AllResearcher