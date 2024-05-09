import React, { useState, useEffect } from 'react'
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable'
import { Strategy_Users } from '../../../ReduxStore/Slice/Researcher/ResearcherSlice'
import { useDispatch } from 'react-redux'

const StrategyUsers = () => {


    const dispatch = useDispatch()
    const [getUsers, setAllUsers] = useState([]);

    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id



    console.log("getUsers :", getUsers)

    const AllUsers = async () => {
        const data = { id: user_id }
        await dispatch(Strategy_Users(data)).unwrap()
            .then((response) => {
                if (response.status) {
                    setAllUsers(response.data);
                }
                else {
                    setAllUsers([]);
                }
            })
            .catch((error) => {
                console.log("Error Broker find Error :", error)
            })

    }


    useState(() => {
        AllUsers();
    }, [])


    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
        },
        card: {
            width: "auto",
        },
        boldHeader: {
            fontWeight: "bold",
        },
        headerButton: {
            marginRight: 8,
        },
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div> <b>{params.value + 1}</b></div>
            ),
        },
        {
            field: "FullName",
            headerName: "Full Name",
            width: 160,
            headerClassName: styles.boldHeader,
        },
        {
            field: "UserName",
            headerName: "User name",
            width: 160,
            headerClassName: styles.boldHeader,
        },
        {
            field: "Email",
            headerName: "Email ID",
            width: 220,
            headerClassName: styles.boldHeader,
        },

        {
            field: "PhoneNo",
            headerName: "Phone Number",
            width: 180,
            headerClassName: styles.boldHeader,
        },
        {
            field: "client_key",
            headerName: "Client Key",
            width: 200,
            headerClassName: styles.boldHeader,
        },



    ];




    return (
        <>
            <div className="content container-fluid" data-aos="fade-left">
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h5 className="card-title mb-0">
                                    <i className="pe-2 fa-solid fa-users"></i>
                                    Strategy Users</h5>
                            </div>

                        </div>
                    </div>

                    <div className='d-flex align-items-center justify-content-between mx-4' style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem', maxWidth: '100%' }}>
                        <h6><b>SR. No.</b></h6>
                        <h6><b>Strategy Name</b></h6>
                        <h6><b>Client using</b></h6>
                        <h6><b>Plan Name</b></h6>
                        <h6></h6>
                    </div>

                    <div className='mx-3 mb-5'>

                        <div class="accordion" id="accordionExample">
                            {getUsers.map((item, index) => (
                                <div class="accordion-item" key={`accordion-item-${index}`}>
                                    <h2 class="accordion-header" id={`heading${index}`}>
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                            <div className='d-flex align-items-center justify-content-between' style={{ width: '100%' }}>
                                                <h6>{index + 1}</h6>
                                                <h6>{item.strategy_name}</h6>
                                                <h6>User</h6>
                                                <h6>Monthly</h6>
                                                <h6></h6>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id={`collapse-${index}`} class="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                        <div className="accordion-body">


                                            {item.collaboration_names.map((data, subIndex) => (
                                                <div className='d-flex align-items-center justify-content-between' style={{ width: '100%' }} key={`accordion-body-${subIndex}`}>
                                                    <h6>{subIndex + 1}</h6>
                                                    <h6>{item.strategy_name}</h6>
                                                    <h6>{data}</h6>
                                                    <h6>plan name</h6>
                                                    <h6></h6>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}

export default StrategyUsers