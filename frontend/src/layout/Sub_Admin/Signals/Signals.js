import React, { useEffect, useState } from 'react'
import Content from "../../../Components/Dashboard/Content/Content"
import BasicDataTable from '../../../Components/ExtraComponents/Datatable/BasicDataTable'
import FullDataTable from "../../../Components/ExtraComponents/Datatable/FullDataTable"
import Loader from '../../../Utils/Loader'
import { fa_time, fDateTimeSuffix } from '../../../Utils/Date_formet'
import { Pencil, Trash2 } from 'lucide-react';
import { Get_All_Signals } from '../../../ReduxStore/Slice/Admin/SignalsSlice'
import { useDispatch, useSelector } from "react-redux";

import { Get_Sub_Admin_Permissions } from '../../../ReduxStore/Slice/Subadmin/Subadminslice';
import { All_Api_Info_List } from '../../../ReduxStore/Slice/Superadmin/ApiCreateInfoSlice';

import * as Config from "../../../Utils/Config";



const Signals = () => {

    const dispatch = useDispatch()

    const token = JSON.parse(localStorage.getItem("user_details")).token;
    const user_Id = JSON.parse(localStorage.getItem("user_details")).user_id;
    const user_role = JSON.parse(localStorage.getItem("user_role"));

    const [getPermissions, setGetPermissions] = useState([])
    const [GetBrokerInfo, setGetBrokerInfo] = useState([]);

  

    const [DateFilter, setDateFilter] = useState();
    const [DateArray, setDateArray] = useState([]);

     //  SUBADMIN PERMISSION
 const data2 = async () => {
    await dispatch(Get_Sub_Admin_Permissions({ id: user_Id })).unwrap()
      .then((response) => {
        if (response.status) {
  
          console.log("response.data[0] ",response.data)
          setGetPermissions(response.data[0])
  
        }
      })
  
  
    await dispatch(All_Api_Info_List({ token: token, url: Config.react_domain, brokerId: -1 })).unwrap()
      .then((response) => {
        if (response.status) {
          setGetBrokerInfo(
            response.data
          );
        }
      })
  }
  
  
  useEffect(() => {
    data2()
  }, []);
  


    const columns = [
        {
            dataField: 'index',
            text: 'S.No.',
            formatter: (cell, row, rowIndex) => rowIndex + 1,

        },
        {
            dataField: 'createdAt',
            text: 'Signals Time',
            formatter: (cell, row, rowIndex) => <div>{fDateTimeSuffix(cell)}</div>
        },
        {
            dataField: 'type',
            text: 'Type'
        },
        {
            dataField: 'trade_symbol',
            text: 'Symbol'
        },
        {
            dataField: 'price',
            text: 'Price'
        },
        // {
        //     dataField: 'prefix',
        //     text: 'Message'
        // },
        {
            dataField: 'strategy',
            text: 'Strategy',
        },

    ];



    const [SignalsData, getSignalsData] = useState({
        loading: true,
        data: []
    });



    const getsignals = async () => {
        await dispatch(Get_All_Signals({ startDate: DateFilter, token: token })).unwrap()
            .then((response) => {
                if (response.status) {

                   console.log("response.data siganl",response.data)
                    if(user_role == "ADMIN"){
                        getSignalsData({
                            loading: false,
                            data: response.data
                        });
                      }
                      else if(user_role == "SUBADMIN"){
                    //    alert("okkkk")
                        if (getPermissions && getPermissions.strategy !== undefined) {

                          let abc = response.data && response.data.filter(item => getPermissions.strategy.includes(item.StrategyData._id))
                          if (abc.length > 0) {
                           
                            getSignalsData({
                              loading: false,
                              data: abc
                            });
                          }
                          else{
                            getSignalsData({
                                loading: false,
                                data: []
                              });
                          }
                          return
                        }
                        getSignalsData({
                            loading: false,
                            data: []
                        });
          
                      }else{
                        // getSignalsData({
                        //     loading: false,
                        //     data: response.data
                        // });
          
                      }


                   


                } else {
                    getSignalsData({
                        loading: false,
                        data: response.data
                    });

                }
            })







    }
    useEffect(() => {
        getsignals()
    }, [DateFilter ,getPermissions])

    var dateArray = [];
    const dateArr = () => {
        for (let i = 0; i < 3; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
            const year = currentDate.getFullYear();
            const formattedDate = `${year}/${month}/${day}`;
            dateArray.push(formattedDate);

        }
        setDateArray(dateArray)
        setDateFilter(dateArray[0])
    }
    useEffect(() => {
        dateArr()
    }, [])



    console.log("SignalsData :", SignalsData)

    return (
        <>
            {
                SignalsData.loading ? <Loader /> :
                    <>
                        <Content Page_title="All Services" button_status={false}>
                            {/* <div className='d-flex'>

                                <div className="col-lg-6">
                                    <div className="mb-3 row">
                                        <div className="col-lg-7">
                                            <select
                                                className="default-select wide form-control"
                                                id="validationCustom05"
                                                onChange={(e) => setDateFilter(e.target.value)}
                                            >
                                                <option disabled> Please Select Date </option>

                                                {DateArray && DateArray.map((item) => {
                                                    return <>
                                                        <option value={item.toString()}>{item.toString()}</option>
                                                    </>
                                                })}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div> */}

                            {
                                SignalsData.data && SignalsData.data.length === 0 ? (
                                    // 'No data found'
                                    <FullDataTable TableColumns={columns} tableData={SignalsData.data} />
                                )
                                    :
                                    <>
                                        <FullDataTable TableColumns={columns} tableData={SignalsData.data} />
                                    </>


                            }
                        </Content>
                    </>
            }



        </ >
    );


}


export default Signals
