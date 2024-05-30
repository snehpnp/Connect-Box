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


    const AllUsers = async () => {
        const data = { id: user_id };
        try {
            const response = await dispatch(Strategy_Users(data)).unwrap();
            if (response.status) {
                setAllUsers({ loading: true, data: response.data });
            } else {
                setAllUsers({ loading: true, data: [] });
            }
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    useEffect(() => {
        AllUsers();
    }, []);



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



    const [isOn, setIsOn] = useState(true);

    // Handle the toggle action
    const handleToggle = () => {
        console.log("fdfd")
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
                <>
                    <label className="switch">

                        <input type="checkbox"

                            checked={row.status === "1" ? true : false}

                            onChange={(e) => {

                                // activeUser(e, row);

                                // setSwitchButton(e.target.checked)

                            }}

                        />

                        <span className="slider round"></span>

                    </label>
                </>
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


    useEffect(() => {


    }, [isOn]);

    console.log("isOn", isOn)
    return (
        <>
            {
                getUsers.loading ? (
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
                                    </Modal >
                                </div>
                            </div>


                        </div>
                    </div>
                ) :
                    <Loader />
            }
        </>
    );
}

export default StrategyUsers;
