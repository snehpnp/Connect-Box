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
import ExportToExcel from '../../../Utils/ExportCSV'



function Strategy() {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const [refresh, setrefresh] = useState(false);
    const [ForGetCSV, setForGetCSV] = useState([])



    // Function to open the modal
    const openModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };





    const [allStategy, setAllStategy] = useState({
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


    const RefreshHandle = () => {
        setrefresh(!refresh)
        setSearchInput('')
    }



    const getAllStrategy = async () => {
        try {
            var data = { id: user_id }
            const response = await dispatch(GetSubStrategys(data)).unwrap();

            if (response.status) {
                const formattedData = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));


                // MANAGE MULTIFILTER

                const filteredData = formattedData.filter((item) => {
                    const searchTermMatch =
                        searchInput === '' ||
                        item.strategy_name.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.strategy_description.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.strategy_category.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.strategy_segment.toLowerCase().includes(searchInput.toLowerCase())

                    // Return true if all conditions are met
                    return searchTermMatch;
                });


                setAllStategy({
                    loading: true,
                    data: searchInput ? filteredData : formattedData,
                });
            } else {
                setAllStategy({
                    loading: true,
                    data: [],
                });
            }
        } catch (error) {
            console.log("Error", error);
            setAllStategy({
                loading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        getAllStrategy();
    }, [refresh, searchInput]);






    const forCSVdata = () => {
        let csvArr = []
        if (allStategy.data.length > 0) {
            allStategy.data.map((item) => {
                return csvArr.push({
                    "Strategy Name": item.strategy_name,
                    "Strategy Description": item.strategy_description,
                    "Strategy Category": item.strategy_category,
                    "Strategy Segment": item.strategy_segment,
                })
            })

            setForGetCSV(csvArr)
        }

    }

    useEffect(() => {
        forCSVdata()
    }, [allStategy.data])







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
                                                className="form-control "
                                                placeholder="Search..."
                                                aria-label="Search"
                                                aria-describedby="search-addon"
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                value={searchInput}

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
                {/* {
                    allStategy.loading ? (
                        <FullDataTable
                            styles={styles}
                            columns={columns}
                            rows={allStategy.data}
                            checkboxSelection={false}

                        />) : <Loader />
                } */}

                <div>
                    <div className="content container-fluid pb-0">



                        <div className="row d-flex align-items-center justify-content-center">

                            {allStategy.data.map((stg) => {
                                return <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="packages card">
                                        <div className="package-header d-flex justify-content-between">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="">
                                                    <h4>{stg.strategy_name}</h4>
                                                    <p>Segment: {stg.strategy_segment}</p>
                                                    <p>Category: {stg.strategy_category}</p>
                                                </div>
                                                <span className="icon-frame d-flex align-items-center justify-content-center">
                                                    <img src={stg.strategy_image ? stg.strategy_image : "assets/img/icons/price-01.svg"} alt="img" />
                                                </span>
                                            </div>
                                        </div>
                                        <p>{stg.strategy_description}</p>

                                        <h6 style={{ marginBottom: '10px' }}>Strategy Plan</h6>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px', color: '#5cb85c' }}></i>
                                                <span style={{ color: '#333' }}>Demo</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>Free</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px', color: '#5cb85c' }}></i>
                                                <span style={{ color: '#333' }}>Month</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>$10/month</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px', color: '#5cb85c' }}></i>
                                                <span style={{ color: '#333' }}>Quarterly</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>$25/quarter</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px', color: '#5cb85c' }}></i>
                                                <span style={{ color: '#333' }}>Half Yearly</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>$45/half year</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px', color: '#5cb85c' }}></i>
                                                <span style={{ color: '#333' }}>Yearly</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>$80/year</span>
                                            </li>
                                        </ul>

                                        <div className="d-flex justify-content-center package-edit">
                                            <a
                                                className="btn-action-icon me-2"
                                                href="javascript:void(0);"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_package"
                                            >
                                                <i className="fe fe-eye" />
                                            </a>
                                            <a
                                                className="btn-action-icon me-2"
                                                href="javascript:void(0);"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_package"
                                            >
                                                <i className="fe fe-edit" />
                                            </a>
                                            <a
                                                className="btn-action-icon"
                                                href="javascript:void(0);"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="fe fe-trash-2" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            })}



                        </div>
                    </div>


                </div>

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
                                        ProfileShow={formik.values.strategy_image}

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
