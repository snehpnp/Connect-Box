import React, { useEffect, useState } from 'react'
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable'
import { Get_All_Researcher , Update_Balance, Delete_Researcher } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Trash2, IndianRupee } from 'lucide-react'
import ExportToExcel from '../../../Utils/ExportCSV'
import { Show_Status } from "../../../ReduxStore/Slice/Admin/Subadmins";
import Swal from 'sweetalert2'



const AllResearcher = () => {
  const dispatch = useDispatch();

  const [allResearcher, setAllResearcher] = useState({
    loading: false,
    data: [],
    data1: []
  })
  const [ForGetCSV, setForGetCSV] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const [refresh, setrefresh] = useState(false)
  const [showBalanceModal, setShowBalanceModal] = useState(false)
  const [updateBalance, setUpdateBalance] = useState([])
  const [inputBalance, setInputBalance] = useState('0')

 
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
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "FullName",
      headerName: "Full name",
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
      width: 200,
      headerClassName: styles.boldHeader,
    },
    {
      field: "prifix_key",
      headerName: "Prefix Key",
      width: 120,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Balance",
      headerName: "Balance",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span className="text-success-light" onClick={(e) => handleOnClick(params.row)}>
            <IndianRupee style={{ height: "19px" }} />
            {params.value || '-'}
          </span>
        </div>
      ),
    },

    {
      field: "ActiveStatus",
      headerName: "Status",
      width: 150,
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
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            <Trash2 />
          </IconButton>
        </div>
      ),
      headerClassName: styles.boldHeader,
    },
    {
      field: "createdAt",
      headerName: "Create Date",
      width: 220,
      headerClassName: styles.boldHeader
    }
  ]


  const handleEdit = () => {

  }

  
  const handleDelete = async (row) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (result.isConfirmed) {
      let data = { id: row._id }; // Assuming `row._id` holds the ID of the record to delete
      try {
        const response = await dispatch(Delete_Researcher(data)).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          });
          
          setrefresh(!refresh);
        }
      } catch (error) {
        console.error('There was a problem with the API request:', error);
        Swal.fire({
          title: "Error!",
          text: "There was an error processing your request.",
          icon: "error"
        });
      }
    }
  };
  

  const handleOnClick = (row) => {
    
    setShowBalanceModal(true) 
    setUpdateBalance({_id:row._id, parent_id:row.parent_id})                   
  }

  const handleSwitchChange = async (event, id) => {
    const user_active_status = event.target.checked ? 1 : 0; // 1 for active, 0 for inactive


    await dispatch(Show_Status({ id, user_active_status }))
      .unwrap()
      .then(async (response) => {

        if (response.status) {
          Swal.fire({
            title: "Status Updated !",
            text: "status updated successfully",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          });
          setrefresh(!refresh)

        } else {
          Swal.fire({
            title: "Error !",
            icon: "error",
            timer: 1000,
            timerProgressBar: true,
          });


        }
      })
      .catch((error) => {
        console.log("Error", error);

      });

  };

  const GetAllResearcher = async () => {
    let data = { id: user_id };
    try {
      const response = await dispatch(Get_All_Researcher(data)).unwrap();
      if (response.status) {

        const filterData = response.data.filter((items) => {

          const searchMatch =
            inputSearch == '' ||
            items.UserName.toLowerCase().includes(inputSearch.toLowerCase()) ||
            items.FullName.toLowerCase().includes(inputSearch.toLowerCase()) ||
            items.Email.toLowerCase().includes(inputSearch.toLowerCase()) ||
            items.PhoneNo.toLowerCase().includes(inputSearch.toLowerCase())

          return searchMatch;
        })
        setAllResearcher({
          loading: true,
          data: inputSearch ? filterData : response.data,
          data1: [
            { name: "Total Researcher", count: response.count.totalCount || 0, Icon: "fe fe-life-buoy", color: "#ec8000" },
            { name: "Total Active", count: response.count.activeCount || 0, Icon: "fe fe-check-square", color: "#087526" },
            { name: "Total Inactive", count: response.count.totalCount - response.count.activeCount || 0, Icon: "fe fe-x-circle", color: "#b51705" },
            { name: "Total Balance", count: response.count.totalBalance || 0, Icon: "fas fa-dollar-sign", color: "#087526" }
          ]
        });
      } else {
        setAllResearcher({
          loading: false,
          data: []
        });
      }
    } catch (error) {

      console.error("Error occurred:", error);
    }
  }


  useEffect(() => {
    GetAllResearcher();
  }, [inputSearch, refresh])

  const forCSVdata = () => {
    let csvArr = []
    if (allResearcher.data.length > 0) {
      allResearcher.data.map((item) => {
        return csvArr.push({
          "FullName": item.FullName,
          "UserName": item.UserName,
          "PhoneNo": item.PhoneNo,
          "Prifix Key": item.prifix_key,
          "Balance": item.Balance
        })
      })

      setForGetCSV(csvArr)
    }

  }

  useEffect(() => {
    forCSVdata()
  }, [allResearcher.data])


  const handleRefresh = () => {
    setrefresh(!refresh)
    setInputSearch("")
  }

  

  const handlesubmit=async()=>{

     
    let data={
      _id: updateBalance._id,
      parent_id : updateBalance.parent_id,
      Balance: inputBalance
    }
    await dispatch(Update_Balance(data))
    .unwrap()
    .then((response) => {
      if (response.status) {
        setShowBalanceModal(false)
        setInputBalance('0')
        Swal.fire({
          title: "Status Updated!",
          text: "Status updated successfully",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
        });
        setrefresh(!refresh);
      }
    })
    .catch((error) => {
      setShowBalanceModal(false)
      setInputBalance('0')
      console.error("Error updating balance:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update status",
        icon: "error",
      });
    });
  }
  

  return (
    <>

      <div className="content container-fluid" data-aos="fade-left">
        <div className="page-header">
          <div className="content-page-header">
            <h5>Researcher</h5>
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
                        onChange={(e) => setInputSearch(e.target.value)}
                        value={inputSearch}
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
                          apiData={ForGetCSV}
                          fileName={'All Strategy'} />
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

        <div className="super-admin-list-head">
          <div className="row">
            {allResearcher &&
              allResearcher.data1.map((data, index) => (
                <div className="col-xl-3 col-md-6 d-flex" key={index}>
                  <div className="card w-100">
                    <div className="card-body">
                      <div className="grid-info-item total-items">
                        <div className="grid-info">
                          <span>{data.name}</span>
                          <h4 style={{ color: data.color }} >{data.count}</h4>
                        </div>
                        <div className="grid-head-icon">
                          <i className={data.Icon} style={{ color: data.color }} />
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
          columns={columns}
          rows={allResearcher.data}
        />
      </div>


      {showBalanceModal && (
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
                  onClick={(e) => {setShowBalanceModal(false)  ;  setInputBalance('0')}}
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
                            setInputBalance(e.target.value)
                          }}
                          value={inputBalance}
                         
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
                    onClick={(e) => setShowBalanceModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary paid-continue-btn"
                    onClick={handlesubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )

      }


    </>


  )
}

export default AllResearcher