import React, { useState, useEffect } from 'react';
import FullDataTable from '../../../Components/ExtraComponents/Tables/DataTable';
import { Strategy_Users } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice';
import { useDispatch } from 'react-redux';
import { fDateTime } from '../../../Utils/Date_formet';

const StrategyUsers = () => {
    const dispatch = useDispatch();
    const [getUsers, setAllUsers] = useState([]);
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;

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

                <div className="d-flex align-items-center mx-3" style={{ height: "40px", backgroundColor: "#f5f2f2", marginTop: '1rem', maxWidth: '100%' }}>
                    <h6 style={{ marginLeft: '1.5rem', marginRight: '2rem' }}><b>#</b></h6>
                    <h6 style={{ marginRight: '15rem' }}><b>Strategy Name</b></h6>
                    <h6 style={{ marginRight: '15rem' }}><b>Segment</b></h6>
                    <h6 style={{ marginRight: '15rem' }}><b>Category</b></h6>
                    <h6 style={{ marginRight: '10rem' }}><b>Created Date</b></h6>
                </div>

                <div className="mx-3 mb-5">
                    <div className="accordion" id="accordionExample">
                        {getUsers.map((item, index) => (
                            < div className="accordion-item" key={`accordion-item-${index}`}>                             
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                        <div className="d-flex align-items-center" style={{ width: '100%' }}>
                                            <h6 style={{ marginRight: '2rem' }}><b>{index + 1}</b></h6>
                                            <h6 style={{ marginRight: '15rem' }}><b>{item.strategy_name}</b></h6>
                                            <h6 style={{ marginRight: '15rem' }}><b>{item.strategy_segment}</b></h6>
                                            <h6 style={{ marginRight: '15rem' }}><b>{item.strategy_category}</b></h6>
                                            <h6 style={{ marginRight: '10rem' }}><b>{fDateTime(item.createdAt)}</b></h6>
                                        </div>
                                    </button>
                                </h2>
                                <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                    <div className="accordion-body">


                                        <FullDataTable
                                            TableColumns={[
                                                {
                                                    dataField: "index",
                                                    text: "#",
                                                    formatter: (cell, row, rowIndex) => rowIndex + 1,
                                                },
                                                {
                                                    dataField: "strategy_name",
                                                    text: "Strategy Name",
                                                    formatter: (cell, row, rowIndex) => (
                                                        <div>
                                                            {row.strategy_name}
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    dataField: "Username",
                                                    text: "Username",
                                                    formatter: (cell, row, rowIndex) => (
                                                        <div>
                                                            {row.Username}
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    dataField: "ServiceType",
                                                    text: "Service Type",
                                                    formatter: (cell, row, rowIndex) => (
                                                        <div>
                                                            Monthly
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    dataField: "stg_count",
                                                    text: "Used Count",
                                                    formatter: (cell, row, rowIndex) => (
                                                        <div>
                                                            {row.stg_count}
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    dataField: "createdAt",
                                                    text: "createdAt",
                                                    formatter: (cell, row, rowIndex) => (
                                                        <div>
                                                            {fDateTime(row.createdAt)}
                                                        </div>
                                                    ),
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
                </div>
            </div>
        </div >
    );
}

export default StrategyUsers;
