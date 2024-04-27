import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Get_All_Subadmin_Strategy } from '../../../ReduxStore/Slice/Users/ClientServiceSlice'

const Strategies = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const prefix_key = JSON.parse(localStorage.getItem('user_details')).prifix_key

    const [getAllStrategy, setAllStrategy] = useState({
        loading: true,
        data: []
    })

    const GetAllStrategy = async () => {
        let data = { prefix_key: prefix_key }
        await dispatch(Get_All_Subadmin_Strategy(data)).unwrap()
            .then((response) => {
                if (response.status) {
                    setAllStrategy({
                        loading: false,
                        data: response.data
                    })
                }
                else {
                    setAllStrategy({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error fetching the strategy", err);
            });
    }
    useEffect(() => {
        GetAllStrategy()
    }, [])


    console.log("getAllStrategy:", getAllStrategy)

    return (
        <div>
            <div className="content container-fluid pb-0">

                <div className="page-header">
                    <div className="content-page-header">
                        <h5>Plans List</h5>
                        <div className="page-content">
                            <div className="list-btn">
                                <ul className="filter-list">

                                    <li>
                                        <p
                                            className="btn btn-primary"

                                            data-bs-toggle="modal"
                                            data-bs-target="#add_newpackage"
                                        >
                                            <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                                            Add Plan
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex align-items-center justify-content-center">


                    {getAllStrategy.data.map((item) =>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                            <div className="packages card">
                                <div className="package-header">
                                    <div className="d-flex justify-content-between w-100">
                                        <div className="">
                                            <h4>{item.strategy_name}</h4>  
                                        </div>
                                        <span className="icon-frame d-flex align-items-center justify-content-center">
                                            <img src="assets/img/icons/price-01.svg" alt="img" />
                                        </span>
                                    </div>
                                    <p>{item.strategy_description}</p>
                                </div>
                                
                                <h2>Price : 5000 only</h2>
                                <h6>What’s included</h6>
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />Maximum Trade :{item.max_trade}
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />strategy categories :{item.strategy_segment}
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />
                                        10 Products
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />1 Invoice
                                    </li>
                                </ul>
                                <div className="d-flex justify-content-center package-edit">
                                    <a
                                        className="btn btn-primary"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_package"
                                    >
                                        BUY
                                    </a>

                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>


        </div>
    )
}

export default Strategies
