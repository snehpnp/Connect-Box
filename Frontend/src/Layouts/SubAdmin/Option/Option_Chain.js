import React, { useState, useEffect } from "react";
import { fetchSubadminCompanyInfo } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import Content from '../../../Components/Dashboard/Content/Content';
import FullDataTable from '../../../Components/ExtraComponents/Tables/DataTable';
import Loader from '../../../Utils/Loader';
import { get_three_digit_month } from '../../../Utils/Date_formet'

import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';


import { Get_Option_All_Round_token, Get_Option_Symbols, Get_Symbol_Expiry, Get_Company_Infos, Get_All_Strategy_for_Client } from '../../../ReduxStore/Slice/Subadmin/OptionChainSlice'


function Option_Chain() {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem('user_details')).token
    const user_id = JSON.parse(localStorage.getItem('user_details')).user_id;


    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
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
    const [PanelKey, setPanelKey] = useState('');




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



    const columns = [
        {
            dataField: 'CALL',
            text: 'BUY/SELL',
            // style: (cell, row) => parseInt(row.strike_price) < parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: 'beige' } :
            //     parseInt(row.strike_price) === parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } : { backgroundColor: '' },
            formatter: (cell, row, rowIndex) => (
                <div key={rowIndex}

                >
                    <button
                        value="LE"
                        className={`button_BUY  button_call_buy_${row.call_token}`}
                    // onClick={(e) => {
                    //     CreateRequest('CALL', row, 'LE', rowIndex, e);
                    // }}
                    // onDoubleClick={(e) => { RemoveClases('CALL', row, 'LE', rowIndex, e) }}
                    >
                        B
                    </button >
                    <button
                        value="SE"
                        className={`button_sell button_call_sell_${row.call_token}`}
                    // onClick={(e) => {
                    //     CreateRequest('CALL', row, 'SE', rowIndex, e);
                    // }}
                    // onDoubleClick={(e) => { RemoveClases('CALL', row, 'SE', rowIndex, e) }}

                    >
                        S
                    </button >
                </div >
            ),
        },
        {
            dataField: 'CALL/LP',
            text: 'CALL/LP',
            // style: (cell, row) => parseInt(row.strike_price) < parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: 'beige' } :
            //     parseInt(row.strike_price) === parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } : { backgroundColor: '' },
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
            // style: (cell, row) => parseInt(row.strike_price) == parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } : { backgroundColor: '' },
            formatter: (cell, row, rowIndex) => (

                <div >
                    <span className={`fw-bold`}>{cell}</span>
                </div>
            ),
        },
        {
            dataField: 'PUT/LP',
            text: 'PUT/LP',
            // style: (cell, row) => parseInt(row.strike_price) > parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: 'beige' } :
            //     parseInt(row.strike_price) === parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } : { backgroundColor: '' },

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
            // style: (cell, row) => parseInt(row.strike_price) > parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: 'beige' } :
            //     parseInt(row.strike_price) === parseInt(OptionChainData.data[11].strike_price) ? { backgroundColor: '#4c584c6b' } :
            //       { backgroundColor: '' },
            formatter: (cell, row, rowIndex) => (
                <div key={rowIndex}

                >
                    <button
                        value="LE"
                        className={`button_BUY  button_put_buy_${row.put_token}`}
                    // onClick={(e) => { CreateRequest("PUT", row, "LE", rowIndex, e) }}
                    // onDoubleClick={(e) => { RemoveClases("PUT", row, "LE", rowIndex, e) }}
                    >
                        B
                    </button>
                    <button
                        value="SE"
                        className={`button_sell button_put_sell_${row.put_token}`}
                    // onClick={(e) => { CreateRequest("PUT", row, "SE", rowIndex, e) }}
                    // onDoubleClick={(e) => { RemoveClases("PUT", row, "SE", rowIndex, e) }}

                    >
                        S
                    </button >
                </div >
            ),
        },
    ];


    const getPanelDetails = async () => {
        await dispatch(Get_Company_Infos())

            .unwrap()
            .then((response) => {
                console.log("response :", response)
                let res = response.data[0]
                setBrokerUrl(res.broker_url)
            });
    };


    // --------------- FOR GET PANEL KEY-----------------------

    // const getPanelKey = async (e) => {
    //     var data={id: user_id}
    //     await dispatch(Get_Panel_key(data)).unwrap()
    //         .then((response) => {
    //             if (response.status) {
    //                 setPanelKey(response.data)
    //             }

    //         });
    // };

    // --------------- FOR GET ALL STRATEGY NAME-----------------------


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
        // getPanelKey()
        GetAllStrategyName();

        // const currentDateIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

        // Set the cutoff time to 3:30 PM in IST timezone
        // const cutoffTimeIST = new Date();
        // cutoffTimeIST.setHours(15, 30, 0, 0);

        // Check if the current time is after 3:30 PM in IST timezone
        // const isAfterCutoffTime = new Date(currentDateIST).getTime() > cutoffTimeIST.getTime();



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
                                        {console.log("expiry :", expiry)}
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
                                        // onClick={(e) => ExcuteTradeButton()}
                                        // disabled={CreateSignalRequest.length === 0}

                                        >
                                            Execute Trade
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <FullDataTable TableColumns={columns} tableData={OptionChainData.data} pagination1={true}></FullDataTable>


                        </>


                    }
                />
            ) : (
                <Loader />
            )}
            {isModalOpen && selectedRow && (
                <CompanyChange
                    rowData={selectedRow}
                    onClose={() => setIsModalOpen(false)}

                />
            )}
        </>
    );
}

export default Option_Chain;
