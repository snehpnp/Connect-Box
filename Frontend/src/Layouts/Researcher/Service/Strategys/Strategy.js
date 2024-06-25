import React, { useState, useEffect } from 'react'
import AddForm from '../../../../Components/ExtraComponents/forms/AddForm'
import { useFormik } from 'formik';
import { GetStretgyWithImg, AddStrategy,  } from "../../../../ReduxStore/Slice/Subadmin/Strategy";
import { Get_All_Catagory } from '../../../../ReduxStore/Slice/Subadmin/GroupServicesSlice';
import { AddResearcherStrategy, GetAllResearcherStrategys , DELETE_STRATEGY } from '../../../../ReduxStore/Slice/Researcher/ResearcherSlice'

import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IndianRupee } from 'lucide-react';
import Loader from '../../../../Utils/Loader'


const Strategy = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [showCreateStrategyModal, setShowCreateStrategyModal] = useState(false)
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id


    const [getStgDescription, setStgDescription] = useState('');
    const [searchInput, setSearchInput] = useState("");
    const [deleteModal, setdeleteModal] = useState(false);
    const [refresh, setrefresh] = useState(false)
    const [showError, setShowError] = useState(false);
    const [allStategy, setAllStategy] = useState({
        loading: true,
        data: [],
    });
    const [GetAllSgments, setGetAllSgments] = useState({
        loading: true,
        data: [],
    });




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


    const fields = [
        {
            name: "strategy_name",
            label: "Strategy Name",
            type: "text1",
            label_size: 6,
            col_size: 6,
            disable: false,
        },

        {
            name: "strategy_category",
            label: "Category",
            type: "select",
            options: [
                { label: "Low Risk", value: "Low Risk" },
                { label: "Medium Risk", value: "Medium Risk" },
                { label: "High Risk", value: "High Risk" },
            ],
            label_size: 12,
            col_size: 6,
            disable: false,

        },
        {
            name: "strategy_demo_days",
            label: "Strategy demo days",
            type: "text3",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_segment",
            label: "Strategy Segment",
            type: "select",
            options: GetAllSgments.data.map((item) => ({
                label: item.name,
                value: item.name,
            })),
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_indicator",
            label: "Indicator",
            type: "file1",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_tester",
            label: "Strategy Tester",
            type: "file1",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_image",
            label: "Strategy Logo",
            type: "file1",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "max_trade",
            label: "Maximum Trades",
            type: "text3",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "strategy_percentage",
            label: "Strategy Percentage",
            type: "text3",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "monthly_charges",
            label: "Monthly Charges",
            type: "text3",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "security_fund",
            label: "Security Fund",
            type: "text3",
            label_size: 12,
            col_size: 6,
            disable: false,
        },

    ];

    const formik = useFormik({
        initialValues: {
            strategy_name: '',
            strategy_category: '',
            strategy_segment: '',
            strategy_demo_days: '',
            strategy_indicator: '',
            strategy_image: '',
            strategy_tester: '',
            max_trade: '',
            strategy_percentage: '',
            maker_id: user_id,
            security_fund: '',
            monthly_charges: ''
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
            if (!values.max_trade) {
                errors.max_trade = "Please enter maximum trade";
            }

            if (!values.strategy_percentage) {
                errors.strategy_percentage = "Please enter strategy percentage";
            }
            // if (!values.monthly_charges) {
            //     errors.monthly_charges = "Please enter monthly charges";
            // }
            if (!values.security_fund) {
                errors.security_fund = "Please enter security fund";
            }
            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            const data = {
                strategy_name: values.strategy_name,
                strategy_category: values.strategy_category,
                strategy_segment: values.strategy_segment,
                strategy_tester: values.strategy_tester,
                strategy_demo_days: values.strategy_demo_days,
                strategy_indicator: values.strategy_indicator,
                strategy_image: values.strategy_image,
                strategy_description: getStgDescription,
                strategy_percentage: values.strategy_percentage,
                max_trade: values.max_trade,
                maker_id: user_id,
                Role: "RESEARCH",
                security_fund: values.security_fund,
                monthly_charges: values.monthly_charges,
            };

            if (!getStgDescription.length) {
                Swal.fire({
                    title: "Error !",
                    text: 'enter strategy description',
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                });
                return
            }
            else {
                await dispatch(AddResearcherStrategy(data))
                    .unwrap()
                    .then(async (response) => {
                        if (response.status) {
                            Swal.fire({
                                title: "Create Successful!",
                                text: response.msg,
                                icon: "success",
                                timer: 1500,
                                timerProgressBar: true
                            });
                            setShowCreateStrategyModal(false)
                            setrefresh(!refresh)
                            resetForm();
                            setStgDescription('')

                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: response.msg,
                                timer: 1500,
                                timerProgressBar: true
                            });
                            setStgDescription('')
                        }

                    })
                    .catch((error) => {
                        console.log("Error", error);
                        setStgDescription('')
                    });
            }
        },
    });





    const getAllStrategy = async () => {
        try {
            var data = { id: user_id }
            const response = await dispatch(GetAllResearcherStrategys(data)).unwrap();

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
                    loading: false,
                    data: searchInput ? filteredData : formattedData,
                });
            } else {
                setAllStategy({
                    loading: false,
                    data: [],
                });
            }
        } catch (error) {
            console.log("Error", error);
            setAllStategy({
                loading: true,
                data: [],
            });
        }
    };

    useEffect(() => {
        getAllStrategy();
        setStgDescription('')
    }, [refresh, searchInput]);

    const handleEditPackage = (id) => {
        navigate(`/research/edit/strategies/${id.id}`, { state: { allStategy } });
    };




    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                var req = {
                    _id: id,
                };
                await dispatch(DELETE_STRATEGY(req))
                    .unwrap()
                    .then((response) => {
                        if (response.status) {
                            setrefresh(!refresh)
                            setdeleteModal(false)
                            Swal.fire({
                                title: "Deleted!",
                                text: response.msg,
                                icon: "success",
                                timer: 1500,
                                timerProgressBar: true
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: response.msg,
                            });
                        }
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {

            }
        });

        return


    };


    const RefreshHandle = () => {
        setrefresh(!refresh)

    }

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
                                        <p
                                            className="btn btn-primary"
                                            onClick={(e) => setShowCreateStrategyModal(true)}
                                        >
                                            <i
                                                className="fa fa-plus-circle me-2"
                                                aria-hidden="true"
                                            />
                                            Create Strategy
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                {!allStategy.loading ? (
                    <div className="content container-fluid pb-0">
                        <div className="row d-flex align-items-center justify-content-center">
                            {allStategy.data.map((stg) => {
                                return <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="packages card" data-aos="fade-down">
                                        <div className="package-header d-flex justify-content-between">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="">
                                                <h2 className="my-2">{stg.strategy_name}</h2>
                                                    <h6>Segment: {stg.strategy_segment}</h6>
                                                   
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
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                <span >Demo</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>Free {stg.strategy_demo_days} days</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                <span >Category</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.strategy_category}</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                <span >Monthly Charges</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.monthly_charges}</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                <span >Maximum Trades</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.max_trade}</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                <span >Strategy Percentage</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.strategy_percentage}</span>
                                            </li>
                                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                <span >Security Fund</span>
                                                <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.security_fund}</span>
                                            </li>
                                             
                                        </ul>
                                        <div className="d-flex justify-content-center package-edit">
                                            <a className="btn-action-icon me-2"  >
                                                <i className="fe fe-edit"
                                                    onClick={() => handleEditPackage({ id: stg._id })}
                                                />
                                            </a>
                                            <a className="btn-action-icon"
                                                onClick={() => { handleDelete(stg._id); }}
                                            >
                                                <i className="fe fe-trash-2" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>

                ) : (<Loader />)}
                <nav aria-label="Page navigation example">
                    <ul className="pagination d-flex justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>

                {
                    showCreateStrategyModal &&
                    <div className="modal custom-modal custom-lg-modal d-block">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 mb-0 pb-0  ">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Add Strategy</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={(e) => { setShowCreateStrategyModal(false); setrefresh(!refresh); setShowError(false); formik.resetForm(); }}
                                    ></button>
                                </div>
                                <div className="modal-body m-0 p-0">
                                    <AddForm
                                        ProfileShow={formik.values.strategy_image}
                                        fields={fields}
                                        formik={formik}
                                        btn_name="Add Strategy"
                                        additional_field={
                                            <>
                                                <label>Strategy Description</label>
                                                <textarea className="rounded" name="strategy" rows="4" cols="50" placeholder="Enter Strategy Description"
                                                    onChange={(e) => setStgDescription(e.target.value)} value={getStgDescription}
                                                    onClick={(e) => { setShowError(true) }}
                                                >
                                                </textarea>
                                                {showError && !getStgDescription.length ?
                                                    (
                                                        <div style={{ color: "red" }}>
                                                            {"Please enter strategy description"}
                                                        </div>
                                                    ) : null
                                                }
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Strategy