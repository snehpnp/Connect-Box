import React, { useState, useEffect } from "react";
import { GetAll_Group_Servics, Get_All_Catagory } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../Utils/Loader';
import { useFormik } from 'formik';
import AddForm from '../../../Components/ExtraComponents/forms/AddForm'
// import toast from "react-hot-toast";





function Strategy() {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [GetAllSgments, setGetAllSgments] = useState({
        loading: true,
        data: [],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [selectedRow, setSelectedRow] = useState(null);
    const [refresh, setrefresh] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);




    // Function to open the modal
    const openModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };





    const [companyData, setCompanyData] = useState({
        loading: false,
        data: [],
    });

    // const handleOpenModal = (rowData) => {
    //     setSelectedRow(rowData)
    //     setIsModalOpen(true);
    // };


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



    const handleEdit = (row) => {
        // Handle edit action
        console.log('Edit row:', row);
    };

    const handleDelete = (row) => {
        // Handle delete action
        console.log('Delete row:', row);
    };


    const columns = [
        { field: 'id', headerName: '#', width: 70, headerClassName: styles.boldHeader },
        {
            field: 'name',
            headerName: 'name',
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
            headerName: 'Result Count',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value || '-'}
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
                    <IconButton aria-label="delete" size="small" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
            headerClassName: styles.boldHeader,
        },

    ];

    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id

    const getCompanyData = async () => {
        try {
            var data = { id: user_id }
            const response = await dispatch(GetAll_Group_Servics(data)).unwrap();

            if (response.status) {
                const formattedData = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                console.log("formattedData :", formattedData)

                setCompanyData({
                    loading: true,
                    data: formattedData,
                });
            } else {
                setCompanyData({
                    loading: true,
                    data: [],
                });
            }
        } catch (error) {
            console.log("Error", error);
            setCompanyData({
                loading: false,
                data: [],
            });
        }
    };


    useEffect(() => {
        getCompanyData();
    }, []);




    const formik = useFormik({
        initialValues: {
            groupname: '',
            segment: false
        },
        validate: (values) => {
            const errors = {};
            if (!values.groupname) {
                errors.groupname = "valid_err.EMPTY_GROUP_NAME_ERR";
            }
            if (!values.segment) {
                errors.segment = "valid_err.SEGEMENTSELECT_ERROR";
            }
             
    
            return errors;
        },
        onSubmit: async (values) => {
            let checkValid = true
            selectedServices && selectedServices.map((item) => {
                if (item.lotsize !== 1) {
                    if ((item.group_qty) % (item.lotsize) !== 0) {
                        alert(`Please Enter Valid Lot Size Inside ${item.name}`)
                        checkValid = false
                        return
                    }
                    return
                }
                return
            })
    
    
            // if (checkValid) {
            //     await dispatch(Add_Group({
            //         groupdetails: { name: values.groupname },
            //         services_id: selectedServices
            //     })).then((response) => {
    
            //         if (response.payload.status) {
            //             toast.success(response.payload.msg);
            //             setTimeout(() => {
            //                 navigate("/admin/groupservices")
            //             }, 1000);
            //         } else {
            //             toast.error(response.payload.msg);
    
            //         }
            //     })
    
            // }
        }
    });
    
    
    
    const fields = [
        { name: 'groupname', label: 'Group Name', type: 'text', label_size: 12, col_size: 6, disable: false },
        {
            name: 'segment',
            label: 'Segment',
            type: 'select',
            options: GetAllSgments.data && GetAllSgments.data.map((item) => ({ label: item.name, value: item.segment })),
            label_size: 12, col_size: 6, disable: false,
        },
    ];



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
                                    <li>
                                        <a
                                            className="btn-filters"
                                            href="/"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Refresh"
                                        >
                                            <span>
                                                <i className="fe fe-refresh-ccw" />
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                aria-describedby="search-addon"
                                            />

                                        </div>
                                    </li>

                                    <li>
                                        <a
                                            className="btn btn-filters w-auto popup-toggle"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Filter"
                                            href="/"
                                        >
                                            <span className="me-2">
                                                <img src="assets/img/icons/filter-icon.svg" alt="filter" />
                                            </span>
                                            Filter
                                        </a>
                                    </li>
                                    <li>
                                        <div
                                            className="dropdown dropdown-action"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Download"
                                        >
                                            <a
                                                href="/"
                                                className="btn btn-filters"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <span className="me-2">
                                                    <i className="fe fe-download" />
                                                </span>
                                                Export
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <ul className="d-block">
                                                    <li>
                                                        <a
                                                            className="d-flex align-items-center download-item"
                                                            href="/"
                                                            download=""
                                                        >
                                                            <i className="far fa-file-pdf me-2" />
                                                            Export as PDF
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="d-flex align-items-center download-item"
                                                            href="/"
                                                            download=""
                                                        >
                                                            <i className="far fa-file-text me-2" />
                                                            Export as Excel
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <p
                                            className="btn btn-primary"
                                            onClick={openModal} 
                                        >
                                            <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                                            Create Strategy
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    companyData.loading ? (
                        <FullDataTable
                            styles={styles}
                            columns={columns}
                            rows={companyData.data}
                            checkboxSelection={false}

                        />) : <Loader />
                }

                {/* CARD MODAL */}
                {showModal && (
                    <div className="modal custom-modal custom-lg-modal d-block">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 mb-0 pb-0 pt-5 mx-3">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Add Group Services</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body m-0 p-0">
                                    <AddForm
                                        fields={fields}
                                        formik={formik}
                                        btn_name="Add Group Services"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                )}


            </div>





        </>


    )
}

export default Strategy
