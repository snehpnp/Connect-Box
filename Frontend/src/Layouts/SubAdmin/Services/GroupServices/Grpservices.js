import React, { useState, useEffect } from "react";
import { GetAll_Group_Servics, Get_All_Catagory, GET_ALL_SERVICES_NAMES, Delete_GroupServices, Get_All_Services_User_Name } from "../../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../../Components/ExtraComponents/Tables/FullDataTable1';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../../Utils/Loader';
import { Link, useNavigate } from "react-router-dom";
import { GanttChartSquare } from 'lucide-react';
import toast from "react-hot-toast";
import ToastButton from '../../../../Components/ExtraComponents/Alert_Toast'
import ExportToExcel from '../../../../Utils/ExportCSV'
import Modal from '../../../../Components/Dashboard/Models/Model'
import { IndianRupee } from 'lucide-react';
import Swal from 'sweetalert2';







function GroupStrategy() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [GetAllSgments, setGetAllSgments] = useState({
        loading: true,
        data: [],
    });
    const [serviceName, setServiceName] = useState({
        loading: true,
        data: [],
    });
    const [allGroupService, setAllGroupService] = useState({
        loading: false,
        data: [],
    });


    const [showModal, setShowModal] = useState(false)
    const [showModal1, setShowModal1] = useState(false)
    const [ForGetCSV, setForGetCSV] = useState([])
    const [inputSearch, SetInputSearch] = useState('');
    const [refresh, setrefresh] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [modalId, setModalId] = useState('')
    const [searchInput, setSearchInput] = useState("");



    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id

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



    const handleEdit = async (row) => {
        navigate('/subadmin/group-service/edit/' + row._id)
    };




    // DELETE SWEET ALERT 2
    const handleDelete = async (id) => {
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
            var data = { id: id };
            try {
                const response = await dispatch(Delete_GroupServices(data)).unwrap();
                if (response.status) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        timer: 1000,
                        timerProgressBar: true,

                    });
                    setrefresh(!refresh)
                     

                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.msg,
                        icon: "error",
                        timer: 1000,
                        timerProgressBar: true,
                    });

                }
            } catch (error) {
                console.error('There was a problem with the API request:', error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error processing your request.",
                    icon: "error"
                });
            }
        };
    }


    const GetAllServicesUserName = (row) => {

    }



    const GetAllServicesName = async (row) => {


        setShowModal(true);

        await dispatch(GET_ALL_SERVICES_NAMES({
            data: row.result

        })).unwrap()
            .then((response) => {


                const formattedData = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));

                if (response.status) {
                    setServiceName({
                        loading: false,
                        data: formattedData
                    })
                }
                else {
                    setServiceName({
                        loading: false,
                        data: []
                    })
                }
            })

    }

    const getAllGroupService = async () => {
        try {
            var data = { id: user_id }
            const response = await dispatch(GetAll_Group_Servics(data)).unwrap();

            if (response.status) {
                const formattedData = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));


                const filteredData = formattedData.filter((item) => {
                    const searchTermMatch =
                        inputSearch === '' ||
                        item.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
                        item.description.toLowerCase().includes(inputSearch.toLowerCase())

                    return searchTermMatch;
                });
                setAllGroupService({
                    loading: true,
                    data: inputSearch ? filteredData : formattedData,
                });
            } else {
                setAllGroupService({
                    loading: true,
                    data: [],
                });
            }
        } catch (error) {
            console.log("Error", error);
            setAllGroupService({
                loading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        getAllGroupService();
    }, [refresh, inputSearch]);




    //  -------------------For Show Segment List-----------------


    const getservice = async () => {
        await dispatch(Get_All_Catagory())
            .unwrap()
            .then((response) => {

                if (response.status) {
                    setGetAllSgments({
                        loading: false,
                        data: response.data,
                    });
                }
            });
    };
    useEffect(() => {
        getservice();
    }, []);



    const forCSVdata = () => {
        let csvArr = []
        if (allGroupService.data.length > 0) {
            allGroupService.data.map((item) => {
                return csvArr.push({
                    "Group Name": item.name,
                    "Group Description": item.description,
                    "Group Count Category": item.resultCount,

                })
            })

            setForGetCSV(csvArr)
        }

    }

    useEffect(() => {
        forCSVdata()
    }, [allGroupService.data])

    const column1 = [
        {
            field: 'id',
            headerName: '#',
            width: 70,
            headerClassName: styles.boldHeader
        },
        {
            field: 'data',
            width: 200,
            headerClassName: styles.boldHeader,
            headerName: 'Services Name',
            renderCell: (params) => (
                <div>

                    {params.row.data.name}
                </div>
            )
        },
        {
            field: 'data1',
            width: 190,
            headerClassName: styles.boldHeader,
            headerName: 'Group Quantity',
            renderCell: (params) => (
                <div>
                    {params.row.data1.group_qty}
                </div>
            )
        },
    ]

    const RefreshHandle = () => {
        setrefresh(!refresh)
        setSearchInput('')
    }





    return (

        <>
            <div className="content container-fluid">
                <div className="card">
                    <div className="card-header">
                   
                    <div className="row align-items-center">
                        <div className="col">
                        <h5 className="card-title mb-0"><i className="pe-2 fa-solid fa-gears" ></i>Group Services</h5>
                        </div>
                        <div className="col-auto"> <div className="list-btn">
                                <ul className="mb-0 filter-list justify-content-lg-end">
                                    <li className="">
                                        <p
                                            className="mb-0 btn-filters"
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
                                        <div className="input-group input-block">
                                            <input
                                                type="text"
                                                className="form-control "
                                                placeholder="Search..."
                                                aria-label="Search"
                                                aria-describedby="search-addon"
                                                onChange={(e) => SetInputSearch(e.target.value)}
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
                                            <li>
                                                <div className="">
                                                    <ExportToExcel
                                                        className="btn btn-primary "
                                                        apiData={ForGetCSV}
                                                        fileName={'Group services'} />
                                                </div>
                                            </li>
                                        </div>
                                    </li>

                                    <li>
                                        <Link
                                            className="btn btn-primary"
                                            to={'/subadmin/group_service/add'}
                                        >
                                            <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                                            Add Group
                                        </Link>
                                    </li>
                                </ul>
                            </div></div>
                    </div>
                    </div>
                    <div className="card-body">
                        <div className="page-content">
                           
                        </div>


                        {/* PAGE HEADER */}

                        {
                            allGroupService.loading ? (
                                <>
                                    <div className="content container-fluid pb-0">
                                        <div className="row d-flex align-items-center justify-content-center">

                                            {allGroupService.data.map((stg) => {
                                                return <div key={stg._id} className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                                                    <div className="packages card" data-aos="fade-down">
                                                        <div className="package-header  ">
                                                            <div className="d-flex w-100">

                                                                <span className="icon-frame d-flex align-items-center justify-content-center">

                                                                    <img src={stg.strategy_image ? stg.strategy_image : `assets/img/icons/price-0${Math.floor(Math.random() * 4) + 1}.svg`} alt="img" />

                                                                </span>

                                                            </div>
                                                            <div className="">

                                                                <h2 className="my-2">{stg.name}</h2>
                                                                <p>{stg.description}</p>

                                                            </div>
                                                        </div>


                                                        {/* <h6 style={{ marginBottom: '10px' }}>Strategy Plan</h6> */}
                                                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>

                                                                <i className=" " style={{ marginRight: '10px' }}></i>
                                                                <span >Serivce Count</span>
                                                                <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.resultCount}</span>
                                                            </li>
                                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                                <i className="" style={{ marginRight: '10px' }}></i>
                                                                <span >Serivce</span>
                                                                <span style={{ marginLeft: 'auto', color: '#999' }}><GanttChartSquare size={20} onClick={(e) => GetAllServicesName(stg)} color="#198754" strokeWidth={2} className="mx-1" /></span>
                                                            </li>
                                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                                <i className="" style={{ marginRight: '10px' }}></i>
                                                                <span >Client Using</span>
                                                                <span style={{ marginLeft: 'auto', color: '#999' }}><GanttChartSquare size={20} onClick={(e) => GetAllServicesUserName(stg)} color="#198754" strokeWidth={2} className="mx-1" /></span>
                                                            </li>

                                                        </ul>

                                                        <div className="d-flex justify-content-center package-edit">


                                                            <a className="btn-action-icon me-2"  >
                                                                <i className="fe fe-edit"
                                                                    onClick={() => handleEdit(stg)}

                                                                />
                                                            </a>

                                                            <a className="btn-action-icon"
                                                                onClick={() => {  handleDelete(stg._id) }}
                                                            >
                                                                <i className="fe fe-trash-2" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}



                                        </div>
                                    </div>
                                </>

                            ) : <Loader />
                        }

                        {showModal ?
                            <>
                                <Modal
                                    isOpen={showModal}
                                    backdrop="static"
                                    size="ms-6"
                                    title="Services"
                                    hideBtn={true}
                                    handleClose={() => setShowModal(false)

                                    }
                                >
                                    <FullDataTable
                                        styles={styles}
                                        columns={column1}
                                        rows={serviceName && serviceName.data}


                                    />

                                </Modal >
                            </>
                            : ""}


                    </div>
                </div>
            </div>
            < ToastButton />
        </>
    )
}

export default GroupStrategy
