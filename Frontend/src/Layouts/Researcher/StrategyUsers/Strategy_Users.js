import React, { useState, useEffect } from 'react';
import FullDataTable from '../../../Components/ExtraComponents/Tables/DataTable';
import { Strategy_Users } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice';
import { useDispatch } from 'react-redux';
import { fDateTime } from '../../../Utils/Date_formet';
import { Eye } from "lucide-react";
import Loader from '../../../Utils/Loader';
import Modal from '../../../Components/ExtraComponents/Modal';
import BasicDataTable from "../../../Components/ExtraComponents/Tables/DataTable";

const StrategyUsers = () => {
    const dispatch = useDispatch();
    const [getUsers, setAllUsers] = useState({ loading: false, data: [] });
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
    const [showModal, setshowModal] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [switchStates, setSwitchStates] = useState({});

    const AllUsers = async () => {
        const data = { id: user_id };
        try {
            const response = await dispatch(Strategy_Users(data)).unwrap();
            if (response.status) {
                setAllUsers({ loading: true, data: response.data });
                const initialSwitchStates = {};
                response.data.forEach(user => {
                    user.strategy.forEach(strategy => {
                        initialSwitchStates[strategy.stg_id] = strategy.ActiveStatus === 1;
                    });
                });
                setSwitchStates(initialSwitchStates);
            } else {
                setAllUsers({ loading: true, data: [] });
            }
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    const handleToggle = (e, row) => {
        const { checked } = e.target;
        setSwitchStates((prevState) => ({
            ...prevState,
            [row.stg_id]: checked,
        }));

    };

    const columns1 = [
        {
            dataField: "index",
            text: "S.No.",
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
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitchCheckDefault-${row.stg_id}`}
                        defaultChecked={switchStates[row.stg_id] !== undefined ? switchStates[row.stg_id] : (cell === 1)}
                        onChange={(e) => handleToggle(e, row)}
                    />
                </div>
            ),
        },
        {
            dataField: 'createdAt',
            text: 'Created At',
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

    useEffect(() => {
        AllUsers();
    }, []);

    return (
        <>
            {getUsers.loading ? (
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

                        <div className='Main table'>
                            <FullDataTable
                                TableColumns={columns1}
                                tableData={getUsers.data}
                                pagination1={true}
                            />
                            <div>
                                <Modal isOpen={showModal} size="xl" title="Subadmins" hideBtn={true}
                                    handleClose={() => setshowModal(false)}
                                >
                                    <div className="card-body table-responsive">
                                        <BasicDataTable TableColumns={columns2} tableData={rowData} />
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default StrategyUsers;
