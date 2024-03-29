import React, { useState, useEffect } from "react";
import { GetSubStrategys } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../Utils/Loader';


function Strategy() {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [selectedRow, setSelectedRow] = useState(null);


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

    const handleOpenModal = (rowData) => {
        setSelectedRow(rowData)
        setIsModalOpen(true);
    };


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
            field: 'strategy_name',
            headerName: 'Strategy Name',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },
        {
            field: 'strategy_description',
            headerName: 'Strategy Description',
            width: 400,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },
        {
            field: 'strategy_category',
            headerName: 'Strategy Category',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value || '-'}
                </div>
            )
        },
        {
            field: 'strategy_segment',
            headerName: 'Strategy Segment',
            width: 150,
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
            const response = await dispatch(GetSubStrategys(data)).unwrap();

            if (response.status) {
                const formattedData = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setCompanyData({
                    loading: true,
                    data: formattedData,
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


    return (

        <>
            <div className="content container-fluid">

                {/* PAGE HEADER */}
                <div className="page-header">
                    <div className="content-page-header">
                        <h5>Strategies</h5>
                        <div className="page-content">
                            <div className="list-btn">
                                <ul className="filter-list">
                                    <li>
                                        <a
                                            className="btn-filters"
                                            href="javascript:void(0);"
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
                                                            href="javascript:void(0);"
                                                            download=""
                                                        >
                                                            <i className="far fa-file-pdf me-2" />
                                                            Export as PDF
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="d-flex align-items-center download-item"
                                                            href="javascript:void(0);"
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
                                        <a
                                            className="btn btn-primary"
                                            onClick={openModal}
                                        >
                                            <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                                            Create Strategy
                                        </a>
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
                    <div className="modal custom-modal custom-lg-modal p-20 d-block"

                    >
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Add Strategy</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}

                                    ></button>
                                </div>
                                <form action="https://kanakku.dreamstechnologies.com/html/template/companies.html">
                                    <div className="modal-body">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Strategy Name*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Strategy Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Per Lot Amount*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Per Lot Amount"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">catagory*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter catagory*" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Select Segment*</label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Please Select Segment"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="mb-2">Indicator*</label>
                                                    <input
                                                        className="form-control"

                                                        type="file"
                                                        placeholder="No file Choosen    "
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Strategy Tester*</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="No file Choosen"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="form-control-label">Strategy Logo*</label>
                                                    <div className="pass-group modal-password-field">
                                                        <input
                                                            type="file"
                                                            className="form-control pass-input"
                                                            placeholder="No file Choosen"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-block mb-3">
                                                    <label className="form-control-label">Strategy description</label>
                                                    <div className="pass-group modal-password-field">
                                                        <input
                                                            type="text"
                                                            className="form-control pass-input-two"
                                                            placeholder="Strategy description"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Monthly</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='Enter Monthly'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Quaterly</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='Enter Quaterly'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Half Yearly</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='Enter Half Yearly'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">Yearly</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='Enter Yearly'
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">

                                        <button
                                            type="submit"
                                            data-bs-dismiss="modal"
                                            className="btn btn-primary paid-continue-btn mt-2"
                                        >
                                            Add Strategy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}


            </div>





        </>


    )
}

export default Strategy
