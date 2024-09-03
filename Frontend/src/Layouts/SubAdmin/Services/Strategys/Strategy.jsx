import React, { useState, useEffect } from "react";
import { GetStretgyWithImg, AddStrategy, DELETE_STRATEGY } from "../../../../ReduxStore/Slice/Subadmin/Strategy";
import { useDispatch } from "react-redux";
import { Get_All_Catagory } from '../../../../ReduxStore/Slice/Subadmin/GroupServicesSlice'


import AddForm from '../../../../Components/ExtraComponents/forms/AddForm'
import { useFormik } from 'formik';
import toast from "react-hot-toast";
import ExportToExcel from '../../../../Utils/ExportCSV'
import ToastButton from '../../../../Components/ExtraComponents/Alert_Toast'
import { Link, useNavigate } from "react-router-dom";
import Loader from '../../../../Utils/Loader'
import { IndianRupee } from 'lucide-react';
import Swal from 'sweetalert2';


function Strategy() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
    var subadmin_service_type = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type

    const [searchInput, setSearchInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [opneModal, setopneModal] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);
    const [getStgDescription, setStgDescription] = useState('');
    const [showError, setShowError] = useState(false);
    const [GetAllSgments, setGetAllSgments] = useState({ loading: true, data: [] });
    const [ForGetCSV, setForGetCSV] = useState([])
    const [allStategy, setAllStategy] = useState({ loading: false, data: [] });
    const [refresh, setrefresh] = useState(false);
    const [StrategyId, setStrategyId] = useState('')






    // Function to open the modal
    const openModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

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
            type: "text5",
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
            name: "Service_Type",
            label: "Service Type",
            type: "test",
            label_size: 12,
            col_size: 12,
            disable: false,
        },
        {
            name: "security_fund",
            label: "Strategy Plan",
            type: 'security',
            showWhen: (values) => formik.values.Service_Type == 1 || subadmin_service_type == 2,
        },
        {
            name: "security_plan",
            label: "Security fund",
            type: 'security',
            showWhen: (values) => formik.values.Service_Type == 2,
        },
        {
            name: "security_fund_month",
            label: "Monthly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

        },
        {
            name: "security_fund_quarterly",
            label: "Quaterly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

        },
        {
            name: "security_fund_half_early",
            label: "Half Yearly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

        },
        {
            name: "security_fund_early",
            label: "Yearly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

        },
        {
            name: "security_fund_fixed",
            label: "Per trade fixed amount",
            type: 'security',
            showWhen: (values) => formik.values.Service_Type == 2,

        },
        {
            name: "fixed_amount_per_trade_month",
            label: "Monthly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 2,

        },
        {
            name: "fixed_amount_per_trade_quarterly",
            label: "Quaterly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 2,

        },
        {
            name: "fixed_amount_per_trade_half_early",
            label: "Half Yearly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 2,

        },
        {
            name: "fixed_amount_per_trade_early",
            label: "Yearly",
            type: "text3",
            label_size: 3,
            col_size: 3,
            disable: false,
            showWhen: (values) => formik.values.Service_Type == 2,

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
            security_fund_month: '',
            security_fund_quarterly: '',
            security_fund_half_early: '',
            security_fund_early: '',
            fixed_amount_per_trade_month: '',
            fixed_amount_per_trade_quarterly: '',
            fixed_amount_per_trade_half_early: '',
            fixed_amount_per_trade_early: '',
            strategy_demo_days: '',
            Service_Type: "",
            max_trade: '',
        },
        validate: (values) => {
            let errors = {};
            if (!values.strategy_name) {
                errors.strategy_name = "Please Enter Strategy Name";
            }
            if (!values.strategy_demo_days) {
                errors.strategy_demo_days = "Please Enter Strategy Demo Days";
            }
            if (!values.strategy_category) {
                errors.strategy_category = "Please Select Strategy Catagory";
            }
            if (!values.strategy_segment) {
                errors.strategy_segment = "Please Select Strategy Segment";
            }
            if (!values.max_trade) {
                errors.max_trade = "Please enter maximum trade";
            }

            if (!values.security_fund_month) {
                errors.security_fund_month = "Please Enter Amount";
            }
            if (!values.security_fund_quarterly) {
                errors.security_fund_quarterly = "Please Enter Amount";
            }
            if (!values.security_fund_half_early) {
                errors.security_fund_half_early = "Please Enter Amount";
            }

            if (!values.security_fund_early) {
                errors.security_fund_early = "Please Enter Amount";
            }

            if (!values.security_fund_early) {
                errors.security_fund_early = "Please Enter Amount";
            }



            if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_month) {
                errors.fixed_amount_per_trade_month = "Please Enter Amount";
            }
            if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_quarterly) {
                errors.fixed_amount_per_trade_quarterly = "Please Enter Amount";
            }
            if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_early) {
                errors.fixed_amount_per_trade_early = "Please Enter Amount";
            }
            if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_half_early) {
                errors.fixed_amount_per_trade_half_early = "Please Enter Amount";
            }
            if (subadmin_service_type == 1 && !values.Service_Type) {
                errors.Service_Type = "Please Select Service Type";
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
                security_fund_month: values.security_fund_month,
                security_fund_quarterly: values.security_fund_quarterly,
                security_fund_half_early: values.security_fund_half_early,
                security_fund_early: values.security_fund_early,
                fixed_amount_per_trade_month: values.fixed_amount_per_trade_month,
                fixed_amount_per_trade_quarterly: values.fixed_amount_per_trade_quarterly,
                fixed_amount_per_trade_half_early: values.fixed_amount_per_trade_half_early,
                fixed_amount_per_trade_early: values.fixed_amount_per_trade_early,
                maker_id: user_id,
                max_trade: values.max_trade,
                Role: "SUBADMIN",
                Service_Type: values.Service_Type != '' ? values.Service_Type : subadmin_service_type == 1 ? 1 : 0
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

                await dispatch(AddStrategy(data))
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
                            setShowModal(false)
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





    const RefreshHandle = () => {
        setrefresh(!refresh)
        setSearchInput('')
    }



    const getAllStrategy = async () => {
        try {
            var data = { id: user_id }
            const response = await dispatch(GetStretgyWithImg(data)).unwrap();

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
        setStgDescription('')
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



    const handleEditPackage = (id) => {
        navigate(`/subadmin/edit/strategies/${id.id}`, { state: { allStategy } });
    };





    return (

        <>
            <div className="content container-fluid">

                {/* PAGE HEADER */}
                <div className="card">
                    <div className="card-header ">
                        <div className="row align-items-center">
                            <div className="col">
                                <h5 className="card-title mb-0"><i className=" pe-2 fas fa-chart-line"></i>Strategies</h5>

                            </div>
                            <div className="col-auto">
                                <div className="list-btn">
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
                                        <li className="serach-li">
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
                    <div className="card-body">
                        <div className="page-content">

                        </div>


                        {/* Cards */}
                        {allStategy.loading ? (
                            <div className="content container-fluid pb-0">
                                <div className="row d-flex align-items-center justify-content-center">

                                    {allStategy.data.map((stg) => {
                                        return <div key={stg._id} className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                                            <div className="packages card" data-aos="fade-down">
                                                <div className="package-header d-flex justify-content-between">
                                                    <div className="d-flex justify-content-between w-100">
                                                        <div>
                                                            <h2 className="my-2">{stg.strategy_name}</h2>
                                                            <h6>Segment: {stg.strategy_segment}</h6>
                                                        </div>
                                                        <span className="icon-frame d-flex align-items-center justify-content-center">
                                                            <img src={stg.strategy_image ? stg.strategy_image : "assets/img/icons/price-01.svg"} alt="img" />
                                                        </span>
                                                    </div>
                                                </div>
                                                {stg.researcher_id != null && (
                                                    <span><i>Researcher :</i> {stg.researcher_id && stg.researcher_id.UserName}</span>
                                                )}
                                                <div>
                                                    {stg.Service_Type == 1 ? "Service_type: PER TRADE" : stg.Service_Type == 2 ? "Service_type: PER TRADE FIXED" : ""}
                                                </div>
                                                <div className="text-dark"><b>{stg.strategy_description}</b></div>
                                                <h6 style={{ marginBottom: '10px' }}>Strategy Plan</h6>

                                                {subadmin_service_type == 1 && stg.Service_Type == 1 ? (
                                                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Max Trade</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}> {stg.max_trade} days</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Strategy Category</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.strategy_category}</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Demo</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}>Free {stg.strategy_demo_days} days</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Month</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_month}/month</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Quarterly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_quarterly}/Quarterly</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Half Yearly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_half_early}/half year</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Yearly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_early}/year</span>
                                                        </li>
                                                    </ul>
                                                ) : subadmin_service_type == 1 && stg.Service_Type == 2 ? (
                                                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Max Trade</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}> {stg.max_trade} days</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Strategy Category</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.strategy_category}</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Demo</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}>Free {stg.strategy_demo_days} days</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Month</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_month}/month , {stg.fixed_amount_per_trade_month}/per trade</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Quarterly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_quarterly}/Quarterly , {stg.fixed_amount_per_trade_quarterly}/per trade</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Half Yearly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_half_early}/half year , {stg.fixed_amount_per_trade_half_early}/per trade</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Yearly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_early}/year , {stg.fixed_amount_per_trade_early}/per trade</span>
                                                        </li>
                                                    </ul>
                                                ) : subadmin_service_type == 2 ? (
                                                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Max Trade</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}> {stg.max_trade} days</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Strategy Category</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}>{stg.strategy_category}</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Demo</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}>Free {stg.strategy_demo_days} days</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Month</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_month}/month</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Quarterly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_quarterly}/Quarterly</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Half Yearly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_half_early}/half year</span>
                                                        </li>
                                                        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                            <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>
                                                            <span>Yearly</span>
                                                            <span style={{ marginLeft: 'auto', color: '#999' }}><IndianRupee style={{ height: '1rem' }} />{stg.security_fund_early}/year</span>
                                                        </li>
                                                    </ul>
                                                ) : (
                                                    ""
                                                )}

                                                <div className="d-flex justify-content-center package-edit">
                                                    <a className="btn-action-icon me-2">
                                                        <i className="fe fe-edit" onClick={() => handleEditPackage({ id: stg._id })} />
                                                    </a>
                                                    {stg.researcher_id == null && (
                                                        <a className="btn-action-icon" onClick={() => handleDelete(stg._id)}>
                                                            <i className="fe fe-trash-2" />
                                                        </a>
                                                    )}
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
                                    <a className="page-link">
                                        Previous
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>





                        {/* ADD STRATEGY */}
                        {showModal && (
                            <div className="modal custom-modal custom-lg-modal d-block">
                                <div className="modal-dialog modal-dialog-centered modal-md">
                                    <div className="modal-content">
                                        <div className="modal-header border-0 mb-0 pb-0 ">
                                            <div className="form-header modal-header-title text-start mb-0">
                                                <h4 className="mb-0">Create New Strategy</h4>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                // onClick={closeModal, formik.resetForm()}
                                                onClick={(e) => { setShowModal(false); setrefresh(!refresh); setShowError(false); formik.resetForm(); }}
                                            ></button>
                                        </div>


                                        <div className="modal-body m-0 p-0">
                                            <AddForm
                                                ProfileShow={formik.values.strategy_image}
                                                fields={fields.filter(
                                                    (field) => !field.showWhen || field.showWhen(formik.values)
                                                )}
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
                                        <div className="modal-header border-0 d-flex justify-content-between">
                                            <div className="form-header modal-header-title text-start mb-0">
                                                <h4 className="mb-0">Hello Company Details</h4>
                                            </div>
                                            <div className="d-flex ">

                                                <Link className="modal-edit-link d-flex align-items-center border p-2" to={`/subadmin/edit/strategies/` + StrategyId}>
                                                    <i className="fe fe-edit me-2" />
                                                    Edit Strategy
                                                </Link>
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


                        <ToastButton />

                    </div >
                    < ToastButton />
                </div>
            </div>
        </>


    )
}

export default Strategy