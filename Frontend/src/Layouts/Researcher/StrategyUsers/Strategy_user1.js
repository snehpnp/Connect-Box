import React, { useState, useEffect } from 'react';
import FullDataTable from '../../../Components/ExtraComponents/Tables/DataTable';
import { Strategy_Users } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice';
import { useDispatch } from 'react-redux';
import { fDateTime } from '../../../Utils/Date_formet';
import { Eye } from "lucide-react";



import Modal from '../../../Components/ExtraComponents/Modal';
import BasicDataTable from "../../../Components/ExtraComponents/Tables/DataTable";

const StrategyUsers = () => {
    const dispatch = useDispatch();
    const [getUsers, setAllUsers] = useState([]);
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
    const [showModal, setshowModal] = useState(false);
    const [rowData, setRowData] = useState([]);


    const AllUsers = async () => {
        const data = { id: user_id };
        try {
            const response = await dispatch(Strategy_Users(data)).unwrap();
            if (response.status) {
                setAllUsers(response.data);
            } else {
                setAllUsers([]);
            }
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    useEffect(() => {
        AllUsers();
    }, []);

    const headerStyles = {
        height: '40px',
        backgroundColor: '#f5f2f2',
        marginTop: '1rem',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center'
    };

    const headerItemStyles = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginRight: '15rem'
    };

    const colStyles = {
        padding: '0.75rem 1.25rem'
    };

    const accordionItemStyles = {
        marginBottom: '1rem'
    };

    const accordionButtonStyles = {
        padding: '0.75rem 1.25rem'
    };

    const accordionBodyStyles = {
        padding: '1rem 1.25rem'
    };

    const columns1 = [
        {
            dataField: "index",
            text: "S.No.",
            // hidden: true,
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },


        {
            dataField: "strategy_name",
            text: "Strategy Name",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? cell : "-"}</span>
            ),
        },
        {
            dataField: "strategy_segment",
            text: "Segment",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? cell : "-"}</span>

            ),
        },
        {
            dataField: "strategy_category",
            text: "Category",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? cell : "-"}</span>

            ),
        },
        {
            dataField: "createdAt",
            text: "Created Date",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? fDateTime(cell) : "-"}</span>

            ),
        },

        {
            dataField: "",
            text: "Details View",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <Eye
                        className="mx-2"
                        onClick={() => {
                            setRowData(row.strategy);
                            setshowModal(true);
                        }}
                    />
                </div>
            ),
        },
    ];




    const [isOn, setIsOn] = useState(false);

    // Handle the toggle action
    const handleToggle = () => {
        
        setIsOn(!isOn);
    };

    const columns2 = [
        {
            dataField: 'index',
            text: 'S.No.',
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },
        {
            dataField: 'Username',
            text: 'SubAdmin'
        },
        {
            dataField: 'purchase_type',
            text: 'Service Type'
        },
        {
            dataField: 'stg_count',
            text: 'Used Count'
        },
        {
            dataField: 'Amount',
            text: 'Amount',

        },
        {
            dataField: 'ActiveStatus',
            text: 'Status',
            formatter: (cell, row, rowIndex) => (
                <button
                    onClick={() => handleToggle(rowIndex)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: isOn? "green" : "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}>
                    {isOn ? "On" : "Off"}
                </button>
            ),
        },
        {
            dataField: 'createdAt',
            text: 'createdAt',
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? fDateTime(cell) : "-"}</span>
            ),

        },
        {
            dataField: 'End_Date',
            text: 'End Date',
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? fDateTime(cell) : "-"}</span>
            ),
        },
    ];
    return (
        <div className="content container-fluid" data-aos="fade-left">
            <div className="card">
                <div className="card-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h5 className="card-title mb-0">
                                <i className="pe-2 fa-solid fa-users"></i>
                                Strategy Users
                            </h5>
                        </div>
                    </div>
                </div>

                {/* <div style={headerStyles} className="mx-3">
                    <h6 style={{ marginLeft: '1.5rem', marginRight: '2rem', ...headerItemStyles }}><b>#</b></h6>
                    <h6 style={headerItemStyles}><b>Strategy Name</b></h6>
                    <h6 style={headerItemStyles}><b>Segment</b></h6>
                    <h6 style={headerItemStyles}><b>Category</b></h6>
                    <h6 style={{ marginRight: '10rem', ...headerItemStyles }}><b>Created Date</b></h6>
                </div>

                <div className="mx-3 mb-5">
                    <div className="accordion" id="accordionExample">
                        {getUsers.map((item, index) => (
                            <div className="accordion-item" style={accordionItemStyles} key={`accordion-item-${index}`}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse-${index}`}
                                        style={accordionButtonStyles}
                                    >
                                        <div className="row w-100">
                                            <div className="col-1" style={colStyles}><b>{index + 1}</b></div>
                                            <div className="col-3" style={colStyles}><b>{item.strategy_name}</b></div>
                                            <div className="col-2" style={colStyles}><b>{item.strategy_segment}</b></div>
                                            <div className="col-3" style={colStyles}><b>{item.strategy_category}</b></div>
                                            <div className="col-3" style={colStyles}><b>{fDateTime(item.createdAt)}</b></div>
                                        </div>
                                    </button>
                                </h2>
                                <div
                                    id={`collapse-${index}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body" style={accordionBodyStyles}>
                                        <FullDataTable
                                            TableColumns={[
                                                {
                                                    dataField: "index",
                                                    text: "#",
                                                    formatter: (cell, row, rowIndex) => rowIndex + 1,
                                                },
                                                {
                                                    dataField: "Username",
                                                    text: "SubAdmin",
                                                    formatter: (cell, row) => <div>{row.Username}</div>,
                                                },
                                                {
                                                    dataField: "purchase_type",
                                                    text: "Service Type",
                                                    formatter: (cell, row) => <div>{row.purchase_type === "monthlyPlan" ? "Monthly" : row.purchase_type}</div>,
                                                },
                                                {
                                                    dataField: "stg_count",
                                                    text: "Used Count",
                                                    formatter: (cell, row) => <div>{row.stg_count}</div>,
                                                },
                                                {
                                                    dataField: "Amount",
                                                    text: "Amount",
                                                    formatter: (cell, row) => <div>{row.Amount}</div>,
                                                },
                                                {
                                                    dataField: "createdAt",
                                                    text: "Created At",
                                                    formatter: (cell, row) => <div>{fDateTime(row.createdAt)}</div>,
                                                },
                                                {
                                                    dataField: "End_Date",
                                                    text: "End Date",
                                                    formatter: (cell, row) => <div>{row.End_Date ? fDateTime(row.End_Date) : "-"}</div>,
                                                },
                                            ]}
                                            tableData={item.strategy}
                                            pagination1={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}



                <div className='Main table'>

                    <FullDataTable
                        TableColumns={columns1}
                        tableData={getUsers}
                        pagination1={true}
                    />
                    <div>
                        <Modal isOpen={showModal} size="xl" title="Subadmins" hideBtn={true}
                            handleClose={() => setshowModal(false)}
                        >
                            <div className="card-body table-responsive">

                                <BasicDataTable TableColumns={columns2} tableData={rowData} />
                            </div>
                        </Modal >
                    </div>
                </div>


            </div>
        </div>
    );
}

export default StrategyUsers;
