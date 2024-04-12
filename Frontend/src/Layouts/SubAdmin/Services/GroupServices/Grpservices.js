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

    console.log("allGroupService :", allGroupService)

    const [showModal, setShowModal] = useState(false)
    const [showModal1, setShowModal1] = useState(false)
    const [ForGetCSV, setForGetCSV] = useState([])
    const [inputSearch, SetInputSearch] = useState('');
    const [refresh, setrefresh] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [modalId, setModalId] = useState('')


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

    const handleDelete = async (row) => {
        var req = {
            id: modalId,
        }


        await dispatch(Delete_GroupServices(req)).unwrap()
            .then((response) => {
                if (response.status) {
                    toast.success(response.msg);
                    setrefresh(!refresh)
                    setModalId('');
                    setShowDeleteModal(false)

                }
                else {
                    toast.error(response.msg)
                }
            })
            .catch((error) => {
                console.log(error)
            })




    };


    const columns = [
        { field: 'id', headerName: '#', width: 70, headerClassName: styles.boldHeader },
        {
            field: 'name',
            headerName: 'Group Service Name',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },
        {
            field: 'description',
            headerName: 'Group Description',
            width: 400,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },


        {
            field: 'resultCount',
            headerName: 'Service Count',
            width: 200,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value || '-'}
                </div>
            )
        },
        {
            field: 'descripto',
            headerName: 'Service',
            width: 200,
            headerClassName: styles.boldHeader,
            renderCell: (row) => (
                <div>
                    <GanttChartSquare size={20} onClick={(e) => GetAllServicesName(row)} color="#198754" strokeWidth={2} className="mx-1" />
                </div>
            )
        },
        {
            field: 'descriptio',
            headerName: 'Client Using',
            width: 200,
            headerClassName: styles.boldHeader,
            renderCell: (row) => (
                <div>
                    <GanttChartSquare size={20} onClick={(e) => GetAllServicesUserName(row)} color="#198754" strokeWidth={2} className="mx-1" />
                </div>
            )
        },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="edit" size="small" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => { setShowDeleteModal(true); setModalId(params.row._id) }}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
            headerClassName: styles.boldHeader,
        },

    ];


    const GetAllServicesUserName = (row) => {

    }



    const GetAllServicesName = async (row) => {
        setShowModal(true);

        await dispatch(GET_ALL_SERVICES_NAMES({
            data: row.row.result

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

    const RefreshHandle = () => {
        setrefresh(!refresh)
        SetInputSearch('')
    }

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
            headerName: 'group qty',
            renderCell: (params) => (
                <div>
                    {params.row.data1.group_qty}
                </div>
            )
        },
    ]





    return (

        <>
            <div className="content container-fluid">

                {/* PAGE HEADER */}
                <div className="page-header">
                    <div className="content-page-header">
                        <h5>Group Services</h5>
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
                                        <div className="input-group input-block">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                aria-describedby="search-addon"
                                                onChange={(e) => SetInputSearch(e.target.value || '')}
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
                                                <div className="card-body">
                                                    <ExportToExcel
                                                        className="btn btn-primary "
                                                        apiData={ForGetCSV}
                                                        fileName={'All Strategy'} />
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
                                            Add GroupService
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    allGroupService.loading ? (
                        <FullDataTable
                            styles={styles}
                            columns={columns}
                            rows={allGroupService.data}
                            checkboxSelection={false}

                        />) : <Loader />
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

                {showDeleteModal && (


                    <div className="modal custom-modal modal-delete d-block" >
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="form-header">
                                        <div className="delete-modal-icon">
                                            <span>
                                                <i className="fe fe-check-circle" />
                                            </span>
                                        </div>
                                        <h3>Are You Sure?</h3>
                                        <p>You want delete company</p>
                                    </div>
                                    <div className="modal-btn delete-action">
                                        <div className="modal-footer justify-content-center p-0">
                                            <button type="submit" onClick={() => handleDelete()} className="btn btn-primary paid-continue-btn me-2">Yes, Delete</button>
                                            <button type="button" onClick={() => setShowDeleteModal(false)} className="btn btn-back cancel-btn">No, Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}




            </div>
            < ToastButton />
        </>
    )
}

export default GroupStrategy
