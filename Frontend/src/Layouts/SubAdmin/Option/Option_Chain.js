import React, { useState, useEffect, useRef } from "react";
import { fetchSubadminCompanyInfo } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import Content from '../../../Components/Dashboard/Content/Content';
import FullDataTable from '../../../Components/ExtraComponents/Tables/DataTable';
import Loader from '../../../Utils/Loader';
import { get_three_digit_month } from '../../../Utils/Date_formet'
import { get_thre_digit_month, convert_string_to_month } from "../../../Utils/Date_formet";

import { CreateSocketSession, ConnctSocket, GetAccessToken, } from "../../../Utils/Alice_Socket";
import Modal from "../../../Components/ExtraComponents/Modal";
import { Trash2 } from 'lucide-react';
import { GetBrokerDatas } from "../../../ReduxStore/Slice/Comman/Userinfo";

import { GetBrokerLiveDatas } from "../../../ReduxStore/Slice/Comman/Makecall/make";

import $ from "jquery";
import Holidays from "date-holidays"
import { useNavigate } from 'react-router-dom';
import { Get_Option_All_Round_token, Get_Option_Symbols, Get_Symbol_Expiry, Get_Company_Infos, Get_All_Strategy_for_Client } from '../../../ReduxStore/Slice/Subadmin/OptionChainSlice'

import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";

function Option_Chain() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const strategyRef = useRef("");
    const token = JSON.parse(localStorage.getItem('user_details')).token
    const user_id = JSON.parse(localStorage.getItem('user_details')).user_id;

    const [showModal, setshowModal] = useState(false);
    const [CreateSignalRequest, setCreateSignalRequest] = useState([]);
    const [ExecuteTradeData, setExecuteTradeData] = useState({
        loading: true,
        data: [],
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [symbolStrike, setSymbolStrike] = useState('')

    const [expiry, setExpiry] = useState('')
    const [strategy, setStrategy] = useState('')
    const [ButtonDisabled, setButtonDisabled] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [TokenSymbolChain, setTokenSymbolChain] = useState('')

    // State ForShow Selected Service After Filter And Show Into Table
    const [selectedServices, setSelectedServices] = useState([]);
    const [tags1, setTags] = useState([]);


    const [symbol, setSymbol] = useState([])
    const [getBrokerUrl, setBrokerUrl] = useState('')





    const [companyData, setCompanyData] = useState({
        loading: false,
        data: [],
    });
    const [getAllStrategyName, setAllStrategyName] = useState({
        loading: true,
        data: [],
    });


    const [OptionChainData, setOptionChainData] = useState({
        loading: true,
        data: [],
    });
    const [All_Symbols, set_All_Symbols] = useState({
        loading: false,
        data: []
    });
    const [All_Symbols_Expiry, set_All_Symbols_Expiry] = useState({
        loading: false,
        data: []
    });

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



    const [UserDetails, seUserDetails] = useState('')
    const [livePriceDataDetails, setLivePriceDataDetails] = useState('');
    const [userIdSocketRun, setUserIdSocketRun] = useState("none");

    useEffect(() => {
        GetBrokerLiveData(userIdSocketRun)
    }, [userIdSocketRun]);

    const GetBrokerLiveData = async (userIdSocketRun) => {

        //alert(userIdSocketRun)
        await dispatch(GetBrokerLiveDatas(

            {
                req:
                {
                    id: user_id,
                    exist_user: userIdSocketRun,
                    exist_user_details: livePriceDataDetails
                },

                token: token
            }
        ))
            .unwrap()
            .then(async (response) => {
                if (response.status) {
                    console.log("Data --- ", response.data)
                    setLivePriceDataDetails(response.data)
                }
            });
    };


    const CreateRequest = (option_type, row_data, call_type, index) => {

        // console.log("SNEH JAISWAL 1")
        if (strategyRef.current === "") {
            alert("Please Select Strategy First")
        } else {


            OptionChainData.data && OptionChainData.data.filter((item) => {
                if (item.call_token === row_data.call_token && call_type === "LE" && option_type === "CALL") {
                    const element = $('.button_call_buy_' + item.call_token);
                    element.addClass('active');
                    const element1 = $('.button_call_sell_' + item.call_token);
                    element1.removeClass('active');
                } else if (item.call_token === row_data.call_token && call_type === "SE" && option_type === "CALL") {
                    const element = $('.button_call_sell_' + item.call_token);
                    element.addClass('active');
                    const element1 = $('.button_call_buy_' + item.call_token);
                    element1.removeClass('active');

                }
                if (item.put_token === row_data.put_token && call_type === "LE" && option_type === "PUT") {
                    const element = $('.button_put_buy_' + item.put_token);
                    element.addClass('active');
                    const element1 = $('.button_put_sell_' + item.put_token);
                    element1.removeClass('active');

                } else if (item.put_token === row_data.put_token && call_type === "SE" && option_type === "PUT") {
                    const element = $('.button_put_sell_' + item.put_token);
                    element.addClass('active');
                    const element1 = $('.button_put_buy_' + item.put_token);
                    element1.removeClass('active');
                }
            })



            var pre_tag = {
                entry_qty: '100',
                option_type: option_type,
                type: call_type,
                token: option_type === "CALL" ? row_data.call_token : row_data.put_token,
                indexcallput: option_type === "CALL" ? `${option_type}_${row_data.call_token}` : `${option_type}_${row_data.put_token}`,
                indexing: index,
                segment: row_data.segment,
                strike: row_data.strike_price,
            };

            if (call_type === "") {

                setCreateSignalRequest(oldValues => {
                    return oldValues.filter(item => item.token !== (option_type === "CALL" ? row_data.call_token : row_data.put_token))
                })
            }
            else {

                setCreateSignalRequest(oldValues => {
                    return oldValues.filter(item => item.indexcallput !== (option_type === "CALL" ? `${option_type}_${row_data.call_token}` : `${option_type}_${row_data.put_token}`))
                })

                setCreateSignalRequest((oldArray) => [pre_tag, ...oldArray]);
            }
        }

    }

    const columns = [
        {
            dataField: 'CALL',
            text: 'BUY/SELL',
            formatter: (cell, row, rowIndex) => (
                <div key={rowIndex}>
                    <button
                        value="LE"
                        className={`button_BUY  button_call_buy_${row.call_token}`}
                        onClick={(e) => {

                            CreateRequest('CALL', row, 'LE', rowIndex, e);
                        }}
                        onDoubleClick={(e) => {

                            RemoveClases('CALL', row, 'LE', rowIndex, e);
                        }}
                    >
                        Buy   <i class="fa-solid fa-arrow-up"></i>
                    </button>
                    <button
                        value="SE"
                        className={`button_sell button_call_sell_${row.call_token}`}
                        onClick={(e) => {

                            CreateRequest('CALL', row, 'SE', rowIndex, e);
                        }}
                        onDoubleClick={(e) => {

                            RemoveClases('CALL', row, 'SE', rowIndex, e);
                        }}
                    >
                        Sell   <i class="fa-solid fa-arrow-down"></i>
                    </button>
                </div>
            ),
        },
        {
            dataField: 'CALL/LP',
            text: 'CALL/LP',
            style: (cell, row) => parseInt(row.strike_price) < parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: 'beige' } :
                parseInt(row.strike_price) === parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } : { backgroundColor: '' },
            formatter: (cell, row, rowIndex) => (
                <div >
                    <span className={`Call_Price_${row.call_token} `}></span>
                    <span className={`SP1_Call_Price_${row.call_token} d-none`}></span>
                </div>
            ),
        },
        {
            dataField: 'strike_price',
            text: 'STRIKE PRICE',
            style: (cell, row) => parseInt(row.strike_price) == parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } : { backgroundColor: '' },
            formatter: (cell, row, rowIndex) => (

                <div >
                    <span className={`fw-bold`}>{cell}</span>
                </div>
            ),
        },
        {
            dataField: 'PUT/LP',
            text: 'PUT/LP',
            style: (cell, row) => parseInt(row.strike_price) > parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: 'beige' } :
                parseInt(row.strike_price) === parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } : { backgroundColor: '' },

            formatter: (cell, row, rowIndex) => (
                <div

                >
                    <span className={`Put_Price_${row.put_token} `}></span>
                    <span className={`BP1_Put_Price_${row.put_token} d-none`}></span>
                </div>
            ),
        },
        {
            dataField: 'PUT',
            text: 'BUY/SELL',
            style: (cell, row) => parseInt(row.strike_price) > parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: 'beige' } :
                parseInt(row.strike_price) === parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } :
                    { backgroundColor: '' },
            formatter: (cell, row, rowIndex) => (
                <div key={rowIndex}

                >
                    <button
                        value="LE"
                        className={`button_BUY  button_put_buy_${row.put_token}`}
                        onClick={(e) => { CreateRequest("PUT", row, "LE", rowIndex, e) }}
                        onDoubleClick={(e) => { RemoveClases("PUT", row, "LE", rowIndex, e) }}
                    >
                        Buy <i class="fa-solid fa-arrow-up"></i>
                    </button>
                    <button
                        value="SE"
                        className={`button_sell button_put_sell_${row.put_token}`}
                        onClick={(e) => { CreateRequest("PUT", row, "SE", rowIndex, e) }}
                        onDoubleClick={(e) => { RemoveClases("PUT", row, "SE", rowIndex, e) }}

                    >
                        Sell <i class="fa-solid fa-arrow-down"></i>
                    </button >
                </div >
            ),
        },
    ];

    const GetBrokerData = async () => {
        var data = { id: user_id }
        await dispatch(GetBrokerDatas(data))

            .unwrap()
            .then((response) => {

                if (response.status) {
                    seUserDetails(response.data)
                }
            });
    };



    useEffect(() => {
        GetBrokerData()
    }, []);

    const getPanelDetails = async () => {
        await dispatch(Get_Company_Infos())

            .unwrap()
            .then((response) => {
                let res = response.data[0]
                setBrokerUrl(res.broker_url)
            });
    };





    const GetAllStrategyName = async (e) => {
        var data = { id: user_id }
        await dispatch(Get_All_Strategy_for_Client(data))
            .unwrap()
            .then((response) => {
                if (response.status) {
                    setAllStrategyName({
                        loading: false,
                        data: response.data,
                    });
                }
            });
    };


    const symbols = async () => {
        var data = {
            req: '',
            token: token
        }

        await dispatch(Get_Option_Symbols(data)).unwrap()

            .then((response) => {

                if (response.status) {
                    set_All_Symbols({
                        loading: false,
                        data: response.data
                    });
                    const filteredSelectedData = response.data.filter((item) => item.token === "1").map((item) => item.symbol);

                    setSelectedServices(filteredSelectedData)
                    setTags(filteredSelectedData)
                }
            })
            .catch((err) => {
                console.log("Error in find symbole :", err)
            })
    }

    useEffect(() => {
        getPanelDetails()
        symbols()
        GetAllStrategyName();

    }, [])

    const getSymbolsExpriy = async () => {
        if (symbol) {
            var data = {
                symbol: symbol
            }
        }
        await dispatch(Get_Symbol_Expiry(data)).unwrap()
            .then((response) => {
                if (response.status) {
                    set_All_Symbols_Expiry({
                        loading: false,
                        data: response.data
                    })
                }
                else {
                    set_All_Symbols_Expiry({
                        loading: false,
                        data: []
                    })
                }
            }).catch((err) => {
                console.log("Error in finding in Symbol expriy", err)
            })


    }

    useEffect(() => {
        getSymbolsExpriy()
    }, [symbol])


    // --------------- FOR GET OPTIONS SYMBOLS -----------------------

    const getAllRoundToken = async () => {
        if (expiry) {
            const data = {
                expiry: expiry,
                symbol: symbol
            };
            await dispatch(Get_Option_All_Round_token(data, token))
                .unwrap()
                .then((response) => {
                    if (response.status) {
                        setOptionChainData({
                            loading: false,
                            data: response.data,
                        });
                        setTokenSymbolChain(response.channellist)
                    }
                });
        }
    }


    useEffect(() => {
        getAllRoundToken()
    }, [expiry, refresh])

    const getCompanyData = async () => {
        try {
            const response = await dispatch(fetchSubadminCompanyInfo()).unwrap();

            if (response.status) {
                const formattedData = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setCompanyData({
                    loading: true,
                    data: formattedData,
                });
            }
        } catch (error) {
            setCompanyData({
                loading: false,
                data: [],
            });
        }
    };


    useEffect(() => {
        getCompanyData();
    }, []);

    const test = (e) => {
        if (e.target.value !== "") {
            strategyRef.current = e.target.value
        } else {
            strategyRef.current = ""
        }
    }


    const ShowLivePrice = async () => {
        let type = { loginType: "API" };
        let channelList = TokenSymbolChain && TokenSymbolChain

        console.log("UserDetails ", UserDetails)
        console.log("livePriceDataDetails ", livePriceDataDetails.demate_user_id)
        console.log("access_token ", livePriceDataDetails.access_token)
        console.log("trading_status ", livePriceDataDetails.trading_status)

        // if (UserDetails && UserDetails[0].demat_userid !== undefined && UserDetails && UserDetails[0].access_token !== undefined && UserDetails && UserDetails[0].TradingStatus == "on") {

        //     const res = await CreateSocketSession(type, UserDetails[0].demat_userid, UserDetails[0].access_token);

        if (livePriceDataDetails && livePriceDataDetails.demate_user_id !== undefined && livePriceDataDetails.access_token !== undefined && livePriceDataDetails.trading_status == "on") {

            const res = await CreateSocketSession(type, livePriceDataDetails.demate_user_id, livePriceDataDetails.access_token);


            if (res.data.stat) {
                const handleResponse = async (response, socket) => {
                    console.log("response.tk ", response.tk, " socket ", socket)
                    socket.onclose = async function (event) {
                        if (event.wasClean) {
                            // alert("IFFF CLOSE")
                            setUserIdSocketRun('DONE')

                        } else {
                            // alert("IFFF ELSE")
                            setUserIdSocketRun('DONE')

                        }
                    };

                    socket.onerror = function (error) {
                        //   alert("ERRROR")
                        setUserIdSocketRun('DONE')
                    };


                    const old_val_call = $('.Call_Price_' + response.tk).html();
                    const old_val_put = $('.Put_Price_' + response.tk).html();

                    $('.SP1_Call_Price_' + response.tk).html(response.sp1 ? response.sp1 : response.lp);
                    $('.BP1_Put_Price_' + response.tk).html(response.bp1 ? response.bp1 : response.lp);

                    if (response.tk) {
                        if (response.lp !== undefined) {

                            $(".Call_Price_" + response.tk).html(response.lp);
                            $(".Put_Price_" + response.tk).html(response.lp);

                            const new_val_call = $('.Call_Price_' + response.tk).html();
                            const new_val_put = $('.Put_Price_' + response.tk).html();

                            if (new_val_call > old_val_call || new_val_put > old_val_put) {
                                $('.Call_Price_' + response.tk).css({ "color": "green" });
                                $('.Put_Price_' + response.tk).css({ "color": "green" });
                                $('.Call_Price_' + response.tk).append('&#8593;')
                                $('.Put_Price_' + response.tk).append('&#8593;')
                                $('.Put_Price_' + response.tk).css({ "font-weight": "900" });
                                $('.Call_Price_' + response.tk).css({ "font-weight": "900" });
                            } else if (new_val_call < old_val_call || new_val_put < old_val_put) {
                                $('.Call_Price_' + response.tk).css({ "color": "red" });
                                $('.Put_Price_' + response.tk).css({ "color": "red" });
                                $('.Call_Price_' + response.tk).append('&#8595;')
                                $('.Put_Price_' + response.tk).append('&#8595;')
                                $('.Put_Price_' + response.tk).css({ "font-weight": "900" });
                                $('.Call_Price_' + response.tk).css({ "font-weight": "900" });
                            } else if (new_val_call === old_val_call || new_val_put === old_val_put) {
                                $('.Call_Price_' + response.tk).css({ "color": "black" });
                                $('.Put_Price_' + response.tk).css({ "color": "black" });

                            }
                        };
                    };
                }

                await ConnctSocket(handleResponse, channelList, UserDetails[0].demat_userid, UserDetails[0].access_token).then((res) => { });
            } else {
                setUserIdSocketRun('DONE')
            }

        }


    };



    useEffect(() => {
        ShowLivePrice();
    }, [TokenSymbolChain, userIdSocketRun]);



    const [disabled, setDisabled] = useState(false);

    const handleClickDisabled = () => {
        setDisabled(true);
    }

    const remoeveService = (id) => {


        let test = ExecuteTradeData && ExecuteTradeData.data.filter((item) => {

            const element1 = $('.button_call_sell_' + id);
            element1.removeClass('active');
            const element2 = $('.button_call_buy_' + id);
            element2.removeClass('active');
            const element4 = $('.button_put_sell_' + id);
            element4.removeClass('active');
            const element3 = $('.button_put_buy_' + id);
            element3.removeClass('active');

            return item.token !== id
        })



        setExecuteTradeData({
            loading: false,
            data: test
        })
    }

    const Done_For_Trade = (id) => {
        handleClickDisabled();

        const currentTimestamp = Math.floor(Date.now() / 1000);

        ExecuteTradeData.data && ExecuteTradeData.data.map((item) => {
            let req = `DTime:${currentTimestamp}|Symbol:${symbol && symbol}|TType:${item.trading_type}|Tr_Price:131|Price:${item.price}|Sq_Value:0.00|Sl_Value:0.00|TSL:0.00|Segment:${item.segment}|Strike:${item.strike}|OType:${item.call_type}|Expiry:${expiry && expiry}|Strategy:${strategy && strategy}|Quntity:${item.entry_qty}|Key:${UserDetails && UserDetails[0].client_key}|TradeType:OPTION_CHAIN|Demo:demo`

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8800/broker-signals',
                // url: `${getBrokerUrl && getBrokerUrl}`,
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: req
            };

            console.log("config", config)
            // axios.request(config)
            //     .then((response) => {



            //        // console.log("cpppp", response.data.status)

            //         if (response.data.status) {

            //             toast.success("Order Place Sucessfully");
            //             setRefresh(!refresh)
            //             setButtonDisabled(!ButtonDisabled)
            //             setshowModal(false)
            //             // setButtonDisabled(false)

            //             setCreateSignalRequest([])


            //             OptionChainData.data && OptionChainData.data.filter((item) => {
            //                 const element1 = $('.button_call_sell_' + item.call_token);
            //                 element1.removeClass('active');
            //                 const element2 = $('.button_call_buy_' + item.call_token);
            //                 element2.removeClass('active');
            //                 const element4 = $('.button_put_sell_' + item.put_token);
            //                 element4.removeClass('active');
            //                 const element3 = $('.button_put_buy_' + item.put_token);
            //                 element3.removeClass('active');
            //             })

            //             navigate("/admin/openposition")
            //         }
            //         else {

            //             toast.danger(response.data.msg);

            //         }

            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });

        })




    }











    const RemoveClases = (option_type, row_data, call_type, index,) => {


        CreateSignalRequest && CreateSignalRequest.filter((item) => {
            const element1 = $('.button_call_sell_' + item.call_token._id);
            element1.removeClass('active');
            const element2 = $('.button_call_buy_' + item.call_token);
            element2.removeClass('active');
            const element4 = $('.button_put_sell_' + item.put_token);
            element4.removeClass('active');
            const element3 = $('.button_put_buy_' + item.put_token);
            element3.removeClass('active');

        })



    }


    const ExcuteTradeButton = () => {

        const currentDate = new Date();
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekday = weekdays[currentDate.getDay()];
        const holidays = new Holidays();
        const currentDateIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const cutoffTimeIST = new Date();
        cutoffTimeIST.setHours(15, 30, 0, 0);
        // Check if the current time is after 3:30 PM in IST timezone
        const isAfterCutoffTime = new Date(currentDateIST).getTime() > cutoffTimeIST.getTime();


        // if (!holidays.isHoliday(currentDate) && weekday !== 'Sunday' && weekday !== 'Saturday' && isAfterCutoffTime) {
        //     alert("Market Time Is Off")
        // } else {
        if (UserDetails !== undefined && UserDetails[0].TradingStatus === "on") {
            let Arr = []


            const expiry_i = convert_string_to_month(expiry && expiry)

            CreateSignalRequest && CreateSignalRequest.map((item) => {
                // const expiry_i = get_thre_digit_month()
                const buy = $('.BP1_Put_Price_' + item.token).html();
                const sell = $('.SP1_Call_Price_' + item.token).html();

                const Symbol = `${symbol && symbol}${expiry_i}${item.strike}${item.option_type === "CALL" ? "CE" : item.option_type === "PUT" ? "PE" : ""}`

                Arr.push({
                    "entry_qty": item.entry_qty,
                    "price": buy ? buy : sell,
                    "Symbol": Symbol,
                    'option_type': `${item.option_type === "CALL" ? "CE" : item.option_type === "PUT" ? "PE" : ""}`,
                    "type": item.type === "SE" ? "SELL" : item.type === "LE" ? "BUY" : "",
                    "token": item.token,
                    "strategy": strategy && strategy,
                    "call_type": item.option_type,
                    "trading_type": item.type,
                    "segment": item.segment,
                    "strike": item.strike,
                })
            })


            setExecuteTradeData({
                loading: false,
                data: Arr
            })

            setshowModal(true)
            // } else {
            //     alert("Please Login With Broker Account")
            // }


        }
    }



    const Set_Entry_Exit_Qty = (row, event, symbol) => {
        let newValue = parseInt(event); // Convert input value to an integer

        if (isNaN(newValue) || newValue < 0) {
            alert('Please enter a valid positive number.');
            return;
        }

        setExecuteTradeData((prev) => ({
            ...prev,
            loading: false,
            data: prev.data.map((item) => {
                if (item.Symbol === symbol) { // Assuming 'symbol' is the unique identifier
                    return {
                        ...item,
                        entry_qty: newValue.toString() || '100',
                    };
                }
                return item;
            }),
        })
        )
    }

    const Cancel_Request = () => {
        setExecuteTradeData({
            loading: false,
            data: []
        })

        setCreateSignalRequest([])
        OptionChainData.data && OptionChainData.data.filter((item) => {
            const element1 = $('.button_call_sell_' + item.call_token);
            element1.removeClass('active');
            const element2 = $('.button_call_buy_' + item.call_token);
            element2.removeClass('active');
            const element4 = $('.button_put_sell_' + item.put_token);
            element4.removeClass('active');
            const element3 = $('.button_put_buy_' + item.put_token);
            element3.removeClass('active');
        })

        setshowModal(false)



    }




    return (
        <>
            {companyData.loading ? (
                <Content
                    Card_title="Option Chain"

                    Content={
                        <>
                            <div className="row d-flex mb-3">
                                <div className="col-md-2 text-secondary input-block">
                                    <label className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    >SYMBOLS</label>
                                    <select
                                        name="symbols_filter"
                                        className="default-select wide form-control spacing  "
                                        onChange={(e) => {
                                            setSymbol(e.target.value)
                                            // setSymbolStrike(e.target.options[e.target.selectedIndex].getAttribute("name"))
                                            setStrategy("")
                                            setExpiry("")
                                            setOptionChainData({
                                                loading: false,
                                                data: [],
                                            });
                                        }}
                                    >
                                        <option value="" >Select Stock Name</option>


                                        {All_Symbols.data && All_Symbols.data.map((item) => {
                                            return <option key={item._id} value={item.symbol} name={item.symbol}>{item.symbol}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2 text-secondary input-block">
                                    <label
                                        className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    >
                                        EXPIRY DATE
                                    </label>
                                    <select className="default-select wide form-control" name="expiry_date"
                                        onChange={(e) => {
                                            setExpiry(e.target.value)
                                        }}
                                        value={expiry}
                                    >
                                        <option value="" >Select Expiry</option>
                                        {All_Symbols_Expiry.data && All_Symbols_Expiry.data.map((item) => {
                                            return <option value={item.uniqueExpiryValues}>{get_three_digit_month(item.expiryDate)}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2 input-block ">
                                    <label
                                        className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    >
                                        STRATEGY
                                    </label>
                                    <select className="default-select wide form-control" name="strategyname"
                                        onChange={(e) => {
                                            setStrategy(e.target.value);
                                            test(e);

                                        }} value={strategy}

                                    // disabled={CreateSignalRequest.length === 0}
                                    >
                                        <option value="">Select Strategy</option>
                                        {expiry && getAllStrategyName.data &&
                                            getAllStrategyName.data.map((item) => {
                                                return (
                                                    <option value={item.strategy_name}>
                                                        {item.strategy_name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-md-2 input-block  text-secondary ">
                                    <label
                                        className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    > Price
                                    </label>
                                    <input type="number" className="new-input-control form-control" />
                                </div>

                                <div className="col-md-4 d-flex justify-content-end align-items-center">
                                    <div className=" ">
                                        <button
                                            className="btn btn-primary me-2"
                                        // onClick={(e) => SelectOptionStock()}
                                        >
                                            Select Option Stock
                                        </button>
                                    </div>
                                    <div className="   ">
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={(e) => ExcuteTradeButton()}
                                            disabled={CreateSignalRequest.length === 0}

                                        >
                                            Execute Trade
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <FullDataTable
                                styles={styles}
                                TableColumns={columns}
                                tableData={OptionChainData.data}
                                pagination1={true}>
                            </FullDataTable>


                        </>


                    }
                />
            ) : (
                <Loader />
            )}
            {showModal ? (
                <>
                    <Modal
                        isOpen={showModal}
                        size="xl"
                        title="Request Confirmation"
                        cancel_btn={true}
                        // hideBtn={false}
                        // disabled_submit={disabled}
                        hideCloseButton={true}
                        btn_name="Confirm"
                        Submit_Function={Done_For_Trade}
                        Submit_Cancel_Function={Cancel_Request}
                        handleClose={() => setshowModal(false)}
                    >
                        <FullDataTable
                            TableColumns={[
                                {
                                    dataField: "index",
                                    text: "SR. No.",
                                    formatter: (cell, row, rowIndex) => rowIndex + 1,
                                },
                                {
                                    dataField: "Symbol",
                                    text: "Symbol",
                                },
                                // {
                                //     dataField: "",
                                //     text: "Enter Qty (%)",
                                //     formatter: (cell, row, rowIndex) => (
                                //         <div>
                                //             <input
                                //                 // key={index}
                                //                 type="text"
                                //                 name="quantity"
                                //                 className=""
                                //                 id="quantity"
                                //                 placeholder="Enter Qty (%)"

                                //                 onChange={
                                //                     (e) =>
                                //                         Set_Entry_Exit_Qty(
                                //                             row,
                                //                             e.target.value,
                                //                             row.Symbol
                                //                         )

                                //                     //  setEnterQty(e.target.value)
                                //                 }
                                //             // value={inputValue ? inputValue : row.old_qty_persent}
                                //             // max={row.old_qty_persent}
                                //             // disabled={data.users.qty_type == "1" || data.users.qty_type == 1}

                                //             />
                                //         </div>
                                //     ),



                                // },
                                {
                                    dataField: "price",
                                    text: "Price",
                                    formatter: (cell, row, rowIndex) => (
                                        <div>
                                            {row.type === "BUY" ?
                                                <span className={`BP1_Put_Price_${row.token} `}></span>
                                                : <span className={`SP1_Call_Price_${row.token}`}></span>
                                            }
                                        </div>
                                    ),

                                },
                                {
                                    dataField: "type",
                                    text: "Trade Type",
                                },
                                {
                                    dataField: "call_type",
                                    text: "Call Type",
                                },
                                {
                                    dataField: "strategy",
                                    text: "Strategy",
                                },
                                {
                                    dataField: "Remove",
                                    text: "Remove",
                                    formatter: (cell, row, rowIndex) => <Trash2 className='text-danger' onClick={() => {
                                        remoeveService(row.token)
                                    }} />,

                                },
                            ]}
                            tableData={ExecuteTradeData.data && ExecuteTradeData.data}

                        />
                    </Modal>
                </>
            ) : (
                ""
            )}

        </>
    );
}

export default Option_Chain;
