import React, { useState, useEffect } from "react";
import { GetSubStrategys, AddStrategy, DELETE_STRATEGY } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../Utils/Loader';
// import Model1 from "../../../Components/ExtraComponents/Models/Model1";
import AddForm from '../../../Components/ExtraComponents/forms/AddForm'
import { useFormik } from 'formik';
import toast from "react-hot-toast";



function Strategy() {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
 
    const [refresh,setrefresh] = useState(false);
    

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



    const handleDelete = async (row) => {
        var req = {
            _id: row._id,
        };
        if (window.confirm("Do you want to delete this User ?")) {
            await dispatch(DELETE_STRATEGY(req))
                .unwrap()
                .then((response) => {
                    if (response.status) {
                        toast.success(response.msg);
                        setrefresh(!refresh)
                    } else {
                        toast.error(response.msg);

                    }
                });
        } else {
            return
        }
    };





    const handleEdit = (row) => {
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
    }, [refresh]);



    const fields = [
        {
            name: "strategy_name",
            label: "Strategy Name",
            type: "text",
            label_size: 6,
            col_size: 6,
            disable: false,
        },

        {
            name: "strategy_category",
            label: "Catagory",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_demo_days",
            label: "Strategy demo days",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_segment",
            label: "Strategy Segment",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_indicator",
            label: "Indicator",
            type: "file",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_tester",
            label: "Strategy Tester",
            type: "file",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_image",
            label: "Strategy Logo",
            type: "file",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_description",
            label: "Strategy description",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_amount_month",
            label: "Monthly",
            type: "number",
            label_size: 3,
            col_size: 3,
            disable: false,
        },
        {
            name: "strategy_amount_quarterly",
            label: "Quaterly",
            type: "number",
            label_size: 3,
            col_size: 3,
            disable: false,
        },
        {
            name: "strategy_amount_half_early",
            label: "Half Yearly",
            type: "number",
            label_size: 3,
            col_size: 3,
            disable: false,
        },
        {
            name: "strategy_amount_early",
            label: "Yearly",
            type: "number",
            label_size: 3,
            col_size: 3,
            disable: false,
        },
    ];


    const formik = useFormik({
        initialValues: {
            strategy_name: '',
            strategy_category: '',
            strategy_segment: '',
            strategy_tester: '',
            strategy_indicator: '',
            strategy_image: '',
            strategy_description: '',
            strategy_amount_month: '',
            strategy_amount_quarterly: '',
            strategy_amount_half_early: '',
            strategy_amount_early: '',
            strategy_demo_days: ''
        },
        validate: (values) => {
            let errors = {};
            if (!values.strategy_name) {
                errors.strategy_name = "strategy name is required";
            }
            if (!values.strategy_demo_days) {
                errors.strategy_demo_days = "strategy demo day is required";
            }
            if (!values.strategy_category) {
                errors.strategy_category = "strategy category is required";
            }
            if (!values.strategy_segment) {
                errors.strategy_segment = "strategy segment is required";
            }
            if (!values.strategy_tester) {
                errors.strategy_tester = "strategy tester is required";
            }
            if (!values.strategy_indicator) {
                errors.strategy_indicator = "strategy indicator is required";
            }

            if (!values.strategy_image) {
                errors.strategy_image = "strategy image is required";
            }
            if (!values.strategy_description) {
                errors.strategy_description = "strategy description is required";
            }
            if (!values.strategy_amount_month) {
                errors.strategy_amount_month = "amount is required";
            }
            if (!values.strategy_amount_quarterly) {
                errors.strategy_amount_quarterly = "amount is required";
            }
            if (!values.strategy_amount_half_early) {
                errors.strategy_amount_half_early = "amount is required";
            }

            if (!values.strategy_amount_early) {
                errors.strategy_amount_early = "amount is required";
            }

            return errors;


        },
        onSubmit: async (values) => {

            const data = {
                strategy_name: values.strategy_name,
                strategy_category: values.strategy_category,
                strategy_segment: values.strategy_segment,
                strategy_tester: values.strategy_tester,
                strategy_demo_days: values.strategy_demo_days,
                strategy_indicator: values.strategy_indicator,
                strategy_image: values.strategy_image,
                strategy_description: values.strategy_description,
                strategy_amount_month: values.strategy_amount_month,
                strategy_amount_quarterly: values.strategy_amount_quarterly,
                strategy_amount_half_early: values.strategy_amount_half_early,
                strategy_amount_early: values.strategy_amount_early,
                maker_id: user_id
            };
            console.log("req :", data)

            await dispatch(AddStrategy(data))
                .unwrap()
                .then(async (response) => {
                     if (response.status) {
                        toast.success(response.msg);
                        setTimeout(() => {
                            setShowModal(false)
                        }, 100);
                        setrefresh(!refresh)

                    } else {
                        toast.error(response.msg);
                    }

                })
                .catch((error) => {
                    console.log("Error", error);
                });
            },
    });


 
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
                    <div className="modal custom-modal custom-lg-modal d-block">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 mb-0 pb-0 pt-5 mx-3">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Add Strategy</h4>
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
                                        btn_name="Add Strategy"
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
