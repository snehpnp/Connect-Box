import React, { useState, useEffect } from 'react';
import FullDataTable from '../../../Components/ExtraComponents/Tables/DataTable';
import { COLLA_NAME_DATA ,COLLA_ADD_BALANCE_DATA} from '../../../ReduxStore/Slice/Researcher/ResearcherSlice';
import { useDispatch } from 'react-redux';
import { fDateTime } from '../../../Utils/Date_formet';
import { Eye } from "lucide-react";
import Loader from '../../../Utils/Loader';
import { IndianRupee } from 'lucide-react';


const StrategyUsers = () => {
    const dispatch = useDispatch();
    const [getUsers, setAllUsers] = useState({ loading: false, data: [] });
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
    const [rowData, setRowData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modal, setmodal] = useState(false);
    const [balanceValue, setBalanceValue] = useState("");


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
            dataField: "UsedBalance",
            text: "Used Amount",
            formatter: (cell, row, rowIndex) => {
                const totalResearchCharges = row.strategies && row.strategies.length > 0
                    ? row.strategies.reduce((acc, strategy) => acc + (parseInt(strategy.Research_charges) || 0), 0)
                    : 0;

                return (
                    <span className="text">{totalResearchCharges}</span>
                );
            },
        },
        {
            dataField: "total_amount",
            text: "Remaing Amount",
            formatter: (cell, row, rowIndex) => {
                const totalResearchCharges = row.strategies && row.strategies.length > 0
                    ? row.strategies.reduce((acc, strategy) => acc + (parseInt(strategy.Research_charges) || 0), 0)
                    : 0;

                return (
                    <span className="text">{parseInt(cell) - totalResearchCharges}</span>
                );
            },
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
                    onClick={() => { setmodal(true);setRowData(row); }}
                >
                    <span style={{ fontWeight: 'bold', verticalAlign: 'middle' }}> +
                        <IndianRupee style={{ height: "16px", marginBottom: '-4px', marginRight: '0px', padding: "0" }} />
                        {cell || '-'}
                    </span>
                </div>

            ),
        },
        {
            dataField: "",
            text: "Strategy View",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <Eye
                        className="mx-2"
                        onClick={() => { openModal(row); setRowData(row.strategies); }}
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


    const openModal = (row) => {
        setShowModal(true);
    };


    const closeModal = () => {
        setRowData("")
        setShowModal(false);
    };






    const handleSubmit = async () => {

   
        var data = { id: rowData._id, Balance: balanceValue }
        await dispatch(COLLA_ADD_BALANCE_DATA(data))
          .unwrap()
          .then(async (response) => {
    
            // if (response.status) {
            //   toast.success(response.msg);
            //   setrefresh(!refresh)
    
            // } else {
            //   toast.error(response.msg);
    
            // }
          })
          .catch((error) => {
            console.log("Error", error);
    
          });
    
        setBalanceValue("")
        setmodal(false);
    
      };





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

                        </div>

                    </div>
                </div>
            ) : <Loader />}



            {showModal && (
                <div className="modal custom-modal d-block" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Information</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => closeModal()}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12">
                                        <table className="table">
                                            <tbody>

                                                <tr>
                                                    <td><strong>#</strong></td>
                                                    <td><strong>Strategy Name</strong></td>
                                                    <td>Amount</td>
                                                </tr>
                                                {rowData && rowData.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td><strong>{data.strategy_name}</strong></td>
                                                        <td>{data.Research_charges ? data.Research_charges : "-"}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {modal && (
                <div className="modal custom-modal d-block" id="add_vendor" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content" style={{ width: "350px" }}>
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add Fund</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setmodal(false)}
                                ></button>
                            </div>
                            <div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12">
                                            <div className="input-block mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Fund"
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const newValue = value.replace(/\D/g, '');
                                                        e.target.value = newValue;
                                                        setBalanceValue(e.target.value)
                                                    }}
                                                value={balanceValue}

                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        data-bs-dismiss="modal"
                                        className="btn btn-back cancel-btn me-2"
                                        onClick={() => setmodal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary paid-continue-btn"
                                    onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}




        </>
    );
}

export default StrategyUsers;
