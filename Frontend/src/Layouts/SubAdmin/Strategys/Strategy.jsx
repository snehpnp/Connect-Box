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

    const dispatch = useDispatch();

    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id

    const [searchInput, setSearchInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [opneModal, setopneModal] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);
    const [editeModal, seteditModal] = useState(false);



    const [refresh, setrefresh] = useState(false);
    const [modalId, setModalId] = useState(null);
    const [modaldata, setmodaldata] = useState(null);



    const [ForGetCSV, setForGetCSV] = useState([])

    const [allStategy, setAllStategy] = useState({
        loading: false,
        data: [],
    });



    // Function to open the modal
    const openModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };



    const handleDelete = async (row) => {
        var req = {
            _id: row._id,
        };
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
    };



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

                {/* Cards */}
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
                                        <a className="btn-action-icon me-2" onClick={() => setopneModal(true)} >
                                            <i className="fe fe-eye" />
                                        </a>

                                        <a className="btn-action-icon me-2"  >
                                            <i className="fe fe-edit" onClick={() => { seteditModal(true); setmodaldata(stg); }} />
                                        </a>

                                        <a className="btn-action-icon" onClick={() => { setdeleteModal(true); setModalId(stg._id); }}  >
                                            <i className="fe fe-trash-2" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        })}



                    </div>
                </div>



                {/* ADD STRATEGY */}
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


                {/* EDIT STRATEGY */}
                {editeModal && (
                    <div className="modal custom-modal custom-lg-modal d-block">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 mb-0 pb-0 pt-5 mx-3">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Edit Strategy</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={seteditModal(false)}
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



                {/* CONFIRM BOX */}
                {deleteModal && (
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
                                            <button type="submit" onClick={handleDelete} className="btn btn-primary paid-continue-btn me-2">Yes, Delete</button>
                                            <button type="button" onClick={() => setdeleteModal(false)} className="btn btn-back cancel-btn">No, Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* STRATEGY VIEW */}
                {opneModal && (
                    <div
                        className="modal custom-modal custom-lg-modal d-block"
                        id="view_companies"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Hello Company Details</h4>
                                    </div>
                                    <div className="d-flex details-edit-link">
                                        <a
                                            href="#"
                                            className="modal-edit-link d-flex align-items-center"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit_companies"
                                        >
                                            <i className="fe fe-edit me-2" />
                                            Edit Company
                                        </a>
                                        <button
                                            type="button"
                                            className="btn-close ms-2"
                                            onClick={() => setopneModal(false)}
                                        ></button>
                                    </div>
                                </div>
                                <div className="modal-body pb-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-field-item">
                                                <div className="profile-picture company-detail-head">
                                                    <div className="upload-profile">
                                                        <div className="profile-img company-profile-img">
                                                            <img
                                                                id="view-company-img"
                                                                className="img-fluid me-0"
                                                                src="assets/img/companies/company-01.svg"
                                                                alt="profile-img"
                                                            />
                                                        </div>
                                                        <div className="add-profile">
                                                            <h5>Hermann Groups</h5>
                                                            <span>
                                                                <a
                                                                    href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                                    className="__cf_email__"
                                                                    data-cfemail="2a624f58474646584349426a4f524b475a464f04494547"
                                                                >
                                                                    [email&nbsp;protected]
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-success-light d-inline-flex align-items-center">
                                                        <i className="fe fe-check me-1" />
                                                        Active
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="plane-basic-info">
                                                <h5>Basic Info</h5>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Account URL</h6>
                                                            <p>hru.example.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Phone Number</h6>
                                                            <p>+1 15541 54544</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Website</h6>
                                                            <p>www.example.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Company Address</h6>
                                                            <p>
                                                                22 Junior Avenue <br />
                                                                Duluth, GA 30097
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Currency</h6>
                                                            <p>United Stated Dollar (USD)</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Language</h6>
                                                            <p>English</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="plane-basic-info plane-detail">
                                                <h5>Plan Details</h5>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Plan Name</h6>
                                                            <p>Enterprise</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Plan Type</h6>
                                                            <p>Yearly</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Price</h6>
                                                            <p>$200</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Register Date</h6>
                                                            <p>15 Jan 2024</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="basic-info-detail">
                                                            <h6>Expiring On</h6>
                                                            <p>15 Jan 2025</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
