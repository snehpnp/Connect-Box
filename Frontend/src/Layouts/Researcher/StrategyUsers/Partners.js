import React, { useState, useEffect } from 'react';
import FullDataTable from '../../../Components/ExtraComponents/Tables/DataTable';
import { COLLA_NAME_DATA } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice';
import { useDispatch } from 'react-redux';
import { fDateTime } from '../../../Utils/Date_formet';
import { Eye } from "lucide-react";
import Loader from '../../../Utils/Loader';
import { IndianRupee } from 'lucide-react';



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
            const response = await dispatch(COLLA_NAME_DATA(data)).unwrap();
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
            dataField: "UserName",
            text: "UserName",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? cell : "-"}</span>
            ),
        },
        {
            dataField: "total_amount",
            text: "Total Amount",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? cell : "-"}</span>

            ),
        },
        {
            dataField: "total_amount",
            text: "Add Balance",
            formatter: (cell, row, rowIndex) => (
                <div
                    style={{
                        backgroundColor: '#E1FFED', 
                        border: 'none',
                        color: '#33B469',
                        padding: '6px 10px', 
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '13px',
                        cursor: 'pointer',
                        borderRadius: '10px', 
                        transition: 'background-color 0.3s ease',
                    }}
                    // onClick={() => { setmodal(true); setInitialRowData(params.row); }}
                >
                    <span style={{ fontWeight: 'bold', verticalAlign: 'middle' }}> +
                        <IndianRupee style={{ height: "16px", marginBottom: '-4px', marginRight: '0px', padding: "0" }} />
                        {cell || '-'}
                    </span>
                </div>

            ),
        },
        {
            dataField: "UsedBalance",
            text: "Used Amount",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? 500 : "-"}</span>

            ),
        },

        {
            dataField: "",
            text: "Strategy View",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <Eye
                        className="mx-2"

                    />
                </div>
            ),
        },
        {
            dataField: "",
            text: "Transection View",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <Eye
                        className="mx-2"

                    />
                </div>
            ),
        },
        {
            dataField: "createdAt",
            text: "Created Date",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? fDateTime(cell) : "-"}</span>

            ),
        },
    ];



    const [isOn, setIsOn] = useState(true);

    // Handle the toggle action
    const handleToggle = () => {
        console.log("fdfd")
        setIsOn(!isOn);
    };







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
                                        Collaborators
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
                            {/* <div>
                                <Modal isOpen={showModal} size="xl" title="Subadmins" hideBtn={true}
                                    handleClose={() => setshowModal(false)}
                                >
                                    <div className="card-body table-responsive">

                                        <BasicDataTable TableColumns={columns2} tableData={rowData} />
                                    </div>
                                </Modal >
                            </div> */}
                        </div>

                    </div>
                </div>
            ) : <Loader />}

        </>
    );
}

export default StrategyUsers;
