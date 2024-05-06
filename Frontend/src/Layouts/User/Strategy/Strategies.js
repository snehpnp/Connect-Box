import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Get_All_Subadmin_Strategy } from '../../../ReduxStore/Slice/Users/ClientServiceSlice'

import Loader from '../../../Utils/Loader'


const Strategies = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user_id = JSON.parse(localStorage.getItem('user_details')).user_id

    const [getAllStrategy, setAllStrategy] = useState({
        loading: true,
        data: []
    })

    const GetAllStrategy = async () => {
        let data = { id: user_id }
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


    // console.log("getAllStrategy:", getAllStrategy)

    return (
        <div>
            <div className="content container-fluid pb-0">

                <div className="card">
                    <div className="card-header">
                        <div className='row align-center'>
                            <div className="col">

                                <h5 className='card-title mb-0'><i className="pe-2 fas fa-list"></i>Strategies</h5>
                            </div>
                        </div>
                    </div>

                    {!getAllStrategy.loading ? <div className="card-body">


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
                                            {item.stg_status == 0 ? <a
                                                className="btn btn-primary"
                                            >
                                                BUY
                                            </a> : <a
                                                className="btn btn-primary"
                                            >
                                                BUYED
                                            </a>}

                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div> : <Loader />}

                </div>

            </div>

        </div>
    )
}

export default Strategies
