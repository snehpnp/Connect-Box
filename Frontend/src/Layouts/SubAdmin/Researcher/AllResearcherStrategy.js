import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';
import Loader from '../../../Utils/Loader'


import { Get_All_Researcher_Strategy } from '../../../ReduxStore/Slice/Subadmin/AllResearcherStrategySlice'

const AllResearcherStrategy = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [refresh, setrefresh] = useState(false)
    const [allStrategy, setAllStrategy] = useState({
        loading: true,
        data: []
    })
    

    const getAllStrategy = async () => {
        await dispatch(Get_All_Researcher_Strategy()).unwrap()
            .then((response) => {
                if (response.status) {
                    setrefresh(!refresh)
                    setAllStrategy({
                        loading: false,
                        data: response.data
                    })
                }
                else {
                    setrefresh(!refresh)
                    setAllStrategy({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in fatching all strastegy :", err)
            })

    }

    useEffect(() => {
        getAllStrategy();
    }, [])



 

    return (
        <>
            <div className="content container-fluid">
                {/* PAGE HEADER */}
                <div className="page-header">
                    <div className="content-page-header mb-0">
                        <h5>Researcher Strategy</h5>  
                    </div>
                </div>

                {/* Cards */}
                {!allStrategy.loading ? (
                    <div className="content container-fluid pb-0">
                        <div className="row d-flex align-items-center justify-content-center">

                            {allStrategy.data && allStrategy.data.data.map((stg) => {
                                return <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="packages card" data-aos="fade-down">
                                        <div className="package-header d-flex justify-content-between">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="">
                                                    <h2 className="my-2">{stg.strategy_name}</h2>
                                                    <h6>create by : {stg.UserName}</h6>
                                                    <h6>strategy description : {stg.strategy_description}</h6>
                                            

                                                </div>
                                                <span className="icon-frame d-flex align-items-center justify-content-center">
                                                    <img src={stg.strategy_image ? stg.strategy_image : "assets/img/icons/price-01.svg"} alt="img" />
                                                </span>

                                            </div>

                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <h6>Segment:</h6>
                                            <h6>{stg.strategy_segment}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <h6>Strategy category :</h6>
                                            <h6>{stg.strategy_category}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <h6>Max Trade:</h6>
                                            <h6>{stg.max_trade}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <h6>Strategy percentage:</h6>
                                            <h6>{stg.strategy_percentage}</h6>
                                        </div>
                                         

                                        <div className='d-flex justify-content-between'>
                                            <h6>Monthly Charges:</h6>
                                            <h6>{stg.monthly_charges}</h6>
                                        </div>
                                         
                                        <div className='d-flex justify-content-between'>
                                            <h6>Security Fund:</h6>
                                            <h6>{stg.security_fund}</h6>
                                        </div>
                                         





                                        <div className="d-flex justify-content-center package-edit">
                                            <button type='submit' className='btn btn-primary'>BUY</button>
  
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
                            <a className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>


            </div>



        </>
    )
}

export default AllResearcherStrategy