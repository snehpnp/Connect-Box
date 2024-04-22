import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import CryptoJS from "crypto-js";
import $ from "jquery";
import {
    getAllServices,
    getCatogries,
    getexpirymanualtrade,
    getAllStrikePriceApi,
    getStrategyData,
    gettokenbysocket,
    GetBrokerLiveDatas,

} from "../../../ReduxStore/Slice/Comman/Makecall/make";

import { GetBrokerDatas} from "../../../ReduxStore/Slice/Comman/Userinfo";
import { CreateSocketSession, ConnctSocket, GetAccessToken, ConnctSocket_user } from "../../../Utils/Alice_Socket";



const Makecall = () => {
    const dispatch = useDispatch();
    const [ForDisabledSubmit, SetForDisabledSubmit] = useState(false)
    const [UserDetails, seUserDetails] = useState('')
    const [AllServices, setAllServices] = useState({ loading: true, data: [] });
    const [CatagoryData, setCatagoryData] = useState({ loading: true, data: [] });
    const [expirydateSelect, setExpirydateSelect] = useState({ loading: true, data: [] });
    const [strikePriceAll, setStrikePriceAll] = useState({ loading: true, data: [] });
    const [strategyDataAll, setStrategyDataAll] = useState({ loading: true, data: [] });
    const [selectStrategy, setSelectStrategy] = useState("");
    const [strikePrice, setStrikePrice] = useState('')
    const [strikePriceErr, setStrikePriceErr] = useState('')
    const [optionType, setOptionType] = useState('CALL')
    const [optionTypeErr, setOptionTypeErr] = useState('')
    const [expiryOnChange, setExpiryOnChange] = useState('');
    const [showstrikePrice, setShowstrikePrice] = useState(0)
    const [selectCatagoryid, SetSelectCatagoryId] = useState('')
    const [scriptSegment, SetScriptSegment] = useState('')
    const [selectCatagoryidSegment, SetSelectCatagorySegment] = useState('')
    const [scriptname, SetScriptname] = useState('')
    const [scriptnameErr, SetScriptnameErr] = useState('')
    const [tradeType, setTradeType] = useState('LE')
    const [tradeTypeErr, setTradeTypeErr] = useState('')
    const [changeDropdown, setChangeDropdown] = useState(0)
    const [markettime, setMarkettime] = useState("1")
    const [EntryPriceBA, SetEntryPriceBA] = useState('at')
    const [showmarkettime, setShowMarkettime] = useState(1)
    const [showhideAtBelow, setShowhideAtBelow] = useState(0)
    const [EntryPrice, SetEntryPrice] = useState('')
    const [EntryPriceErr, SetEntryPriceErr] = useState('')
    const [EntryPriceBAErr, SetEntryPriceBAErr] = useState('')
    const [EntryPriceRange_one, SetEntryPriceRange_one] = useState('')
    const [EntryPriceRange_oneErr, SetEntryPriceRange_oneErr] = useState('')
    const [EntryPriceRange_two, SetEntryPriceRange_two] = useState('')
    const [EntryPriceRange_twoErr, SetEntryPriceRange_twoErr] = useState('')
    const [IntradayDelivery, setIntradayDelivery] = useState("1")
    const [selectedTimeExit, setselectedTimeExit] = useState('');
    const [selectedTimeNoTrade, setselectedTimeNoTrade] = useState('');
    const [showhideTargetStoploss, setShowhideTargetStoploss] = useState(0)
    const [WiseTypeDropdown, setWiseTypeDropdown] = useState("")
    const [target1, setTarget1] = useState(0)
    const [stoploss, setStopLoss] = useState(0)
    const [targetStoplossDropdown, setTargetStoplossDropdown] = useState('')
    const [target1Err, setTarget1Err] = useState('')
    const [stoplossErr, setStopLossErr] = useState('')


    const handleTimeChangeExit = (event) => {
        setselectedTimeExit(event.target.value);
    };

    const handleTimeChangeNoTrade = (event) => {
        setselectedTimeNoTrade(event.target.value);
    };

    console.log(

        " scriptSegment ", scriptSegment, "\n",
        " scriptname ", scriptname, "\n",
        " expiryOnChange ", expiryOnChange, "\n",
        " strikePrice ", strikePrice, "\n",
        " optionType ", optionType, "\n",
        " selectStrategy ", selectStrategy, "\n",
        " tradeType ", tradeType, "\n",
        " markettime ", markettime, "\n",
        " EntryPrice ", EntryPrice, "\n",
        " EntryPriceRange_one ", EntryPriceRange_one, "\n",
        " EntryPriceRange_two ", EntryPriceRange_two, "\n",
        " EntryPriceBA ", EntryPriceBA, "\n",
        " IntradayDelivery ", IntradayDelivery, "\n",
        " selectedTimeExit ", selectedTimeExit, "\n",
        " selectedTimeNoTrade ", selectedTimeNoTrade, "\n",
        " WiseTypeDropdown ", WiseTypeDropdown, "\n",
        " target1 ", target1, "\n",
        " stoploss ", stoploss, "\n",
        " targetStoplossDropdown ", targetStoplossDropdown, "\n",
    )


    //console.log("UserDetails ",UserDetails[0].client_key)


    const UserLocalDetails = JSON.parse(localStorage.getItem("user_details"));

    //  console.log("get user details ",UserLocalDetails.token)
    // console.log("CatagoryData ",CatagoryData.data)
    const [sockets, setSockets] = useState(null);
    const previousToken = useRef("")
    const liveToken = useRef("");
    const [liveprice, setLiveprice] = useState("");
    const [stockBuyPrice, setStockBuyPrice] = useState("");
    const [stockSellPrice, setStockSellPrice] = useState("");
    
    const [userIdSocketRun, setUserIdSocketRun] = useState("none");

    let socket;



    useEffect(() => {
        GetBrokerLiveData(userIdSocketRun)
     }, [userIdSocketRun]);


    const GetBrokerLiveData = async (userIdSocketRun) => {

        alert(userIdSocketRun)
        var data = { id: UserLocalDetails.user_id , exist_user : userIdSocketRun }
        await dispatch(GetBrokerLiveDatas(data))
            .unwrap()
            .then(async (response) => {
                console.log("GetBrokerData ",response.data)

                return
                if (response.status) {
                    seUserDetails(response.data)
                    if (response.data && response.data[0].demat_userid !== undefined && response.data && response.data[0].access_token !== undefined && response.data[0].TradingStatus == "on") {
                        let type = { loginType: "API" };
                        const res = await CreateSocketSession(type, response.data[0].demat_userid, response.data[0].access_token);
                        //console.log("res ", res.data.stat)
                        if (res.data.stat) {
                            const url = "wss://ws1.aliceblueonline.com/NorenWS/"
                            socket = new WebSocket(url)
                            socket.onopen = function () {
                                // var encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession21).toString()).toString();
                                let userSession1 = response.data[0].access_token;
                                let userId1 = response.data[0].demat_userid;
                                var encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession1).toString()).toString();
                                var initCon = {
                                    susertoken: encrcptToken,
                                    t: "c",
                                    // actid: userId + "_" + "API",
                                    // uid: userId + "_" + "API",
                                    actid: userId1 + "_" + "API",
                                    uid: userId1 + "_" + "API",
                                    source: "API"
                                }
                                setSockets(socket)
                                // console.log("initCon",initCon)
                                socket.send(JSON.stringify(initCon))
                                // console.log("inside ",socket)
                                socket.onmessage = async function (msg) {
                                    var response = JSON.parse(msg.data)
                                  //  console.log("response ", response)
                                    if (response.tk) {
                                        if (response.lp != undefined) {
                                            //console.log('response token', response.lp)
                                            //   console.log("response -soket ", response);
                                            // setLiveprice(response.lp);
                                            if (response.tk == liveToken.current) {
                                                setLiveprice(response.lp);
                                                if (response.pc != undefined) {
                                                    //console.log('response.pc inside', response.pc)
                                                    if (parseFloat(response.pc) > 0) {
                                                        $('.liveprice' + response.tk).css({ "color": "green" });

                                                    }
                                                    else if (parseFloat(response.pc) < 0) {

                                                        $('.liveprice' + response.tk).css({ "color": "red" });

                                                    }
                                                    else if (parseFloat(response.pc) == 0) {

                                                        $('.liveprice' + response.tk).css({ "color": "black" });

                                                    }
                                                }

                                                setLiveprice(response.lp);
                                                $(".liveprice" + response.tk).html(response.lp);

                                                //  SetEntryPrice

                                                if (response.sp1 != undefined) {
                                                    setStockSellPrice(response.sp1)
                                                } if (response.bp1 != undefined) {
                                                    setStockBuyPrice(response.bp1);
                                                }
                                            } else {
                                                // setLiveprice("")
                                            }
                                            $(".liveprice" + response.tk).html(response.lp);
                                        }
                                    }
                                    if (response.s === 'OK') {
                                        console.log("response.s ", response.s)
                                        // var channel = await channelList;
                                        // let json = {
                                        //     k: channelList,
                                        //     t: 't'
                                        // };
                                        // await socket.send(JSON.stringify(json))


                                    }
                                }
                            }
                        }
                    }
                }
            });
    };


    // const GetBrokerData = async () => {
    //     var data = { id: UserLocalDetails.user_id }
    //     await dispatch(GetBrokerDatas(data))
    //         .unwrap()
    //         .then(async (response) => {
    //             //console.log("GetBrokerData ",response.data)
    //             if (response.status) {
    //                 seUserDetails(response.data)
    //                 if (response.data && response.data[0].demat_userid !== undefined && response.data && response.data[0].access_token !== undefined && response.data[0].TradingStatus == "on") {
    //                     let type = { loginType: "API" };
    //                     const res = await CreateSocketSession(type, response.data[0].demat_userid, response.data[0].access_token);
    //                     //console.log("res ", res.data.stat)
    //                     if (res.data.stat) {
    //                         const url = "wss://ws1.aliceblueonline.com/NorenWS/"
    //                         socket = new WebSocket(url)
    //                         socket.onopen = function () {
    //                             // var encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession21).toString()).toString();
    //                             let userSession1 = response.data[0].access_token;
    //                             let userId1 = response.data[0].demat_userid;
    //                             var encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession1).toString()).toString();
    //                             var initCon = {
    //                                 susertoken: encrcptToken,
    //                                 t: "c",
    //                                 // actid: userId + "_" + "API",
    //                                 // uid: userId + "_" + "API",
    //                                 actid: userId1 + "_" + "API",
    //                                 uid: userId1 + "_" + "API",
    //                                 source: "API"
    //                             }
    //                             setSockets(socket)
    //                             // console.log("initCon",initCon)
    //                             socket.send(JSON.stringify(initCon))
    //                             // console.log("inside ",socket)
    //                             socket.onmessage = async function (msg) {
    //                                 var response = JSON.parse(msg.data)
    //                               //  console.log("response ", response)
    //                                 if (response.tk) {
    //                                     if (response.lp != undefined) {
    //                                         //console.log('response token', response.lp)
    //                                         //   console.log("response -soket ", response);
    //                                         // setLiveprice(response.lp);
    //                                         if (response.tk == liveToken.current) {
    //                                             setLiveprice(response.lp);
    //                                             if (response.pc != undefined) {
    //                                                 //console.log('response.pc inside', response.pc)
    //                                                 if (parseFloat(response.pc) > 0) {
    //                                                     $('.liveprice' + response.tk).css({ "color": "green" });

    //                                                 }
    //                                                 else if (parseFloat(response.pc) < 0) {

    //                                                     $('.liveprice' + response.tk).css({ "color": "red" });

    //                                                 }
    //                                                 else if (parseFloat(response.pc) == 0) {

    //                                                     $('.liveprice' + response.tk).css({ "color": "black" });

    //                                                 }
    //                                             }

    //                                             setLiveprice(response.lp);
    //                                             $(".liveprice" + response.tk).html(response.lp);

    //                                             //  SetEntryPrice

    //                                             if (response.sp1 != undefined) {
    //                                                 setStockSellPrice(response.sp1)
    //                                             } if (response.bp1 != undefined) {
    //                                                 setStockBuyPrice(response.bp1);
    //                                             }
    //                                         } else {
    //                                             // setLiveprice("")
    //                                         }
    //                                         $(".liveprice" + response.tk).html(response.lp);
    //                                     }
    //                                 }
    //                                 if (response.s === 'OK') {
    //                                     console.log("response.s ", response.s)
    //                                     // var channel = await channelList;
    //                                     // let json = {
    //                                     //     k: channelList,
    //                                     //     t: 't'
    //                                     // };
    //                                     // await socket.send(JSON.stringify(json))


    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         });
    // };

    const getAllSteategyApiFun = async () => {
        await dispatch(getStrategyData(
            {
                req: {

                    user_id: UserLocalDetails.user_id
                },

                token: UserLocalDetails.token
            }
        ))
            .unwrap()
            .then((response) => {

                // console.log("response ",response.data)
                if (response.status) {
                    setStrategyDataAll({
                        loading: false,
                        data: response.data,
                    });
                } else {
                    setStrategyDataAll({
                        loading: false,
                        data: [],
                    });

                }
            });
    };

    const getCatogriesFun = async () => {
        await dispatch(getCatogries(
            {
                req: {

                    id: "1"
                },

                token: UserLocalDetails.token
            }
        ))
            .unwrap()
            .then((response) => {

                console.log("response ", response.data)
                if (response.status) {
                    setCatagoryData({
                        loading: false,
                        data: response.data,
                    });
                }
            });
    };


    useEffect(() => {
        getCatogriesFun();
        getAllSteategyApiFun();
        //GetBrokerData();
    }, []);


    const getAllServicesFun = async () => {



        await dispatch(getAllServices(
            {
                req:
                {
                    category_id: selectCatagoryid
                },

                token: UserLocalDetails.token
            }
        ))
            .unwrap()
            .then((response) => {

                if (response.status) {
                    setAllServices({
                        loading: false,
                        data: response.data,
                    });
                } else {
                    setAllServices({
                        loading: false,
                        data: [],
                    });
                }
            });
    };



    useEffect(() => {


        setAllServices({ loading: false, data: [] });
        getAllServicesFun()
        // console.log("CatagoryData.data ",CatagoryData.data)
        // console.log("selectCatagoryid ",selectCatagoryid)

        let datra = CatagoryData.data && CatagoryData.data.filter((x) => {
            if ((selectCatagoryid) == x._id) {
                return x
            }
        })

        //  console.log("datra ---- ",datra)
        // let datra = scriptdata && scriptdata.filter((x) => {
        //   if ((selectCatagoryid) == parseInt(x.id)) {
        //     return x
        //   }
        // })


        // let stExhange = scriptdata && scriptdata.filter((x) => {
        //   if (onChangeScriptname.includes(x.name)) {
        //     return x
        //   }
        // })

        if (datra.length > 0) {
            console.log("SSSS", datra && datra[0].segment)
            SetScriptSegment(datra && datra[0].segment)

            switch (datra && datra[0].segment) {
                case "C":
                case "O":
                case "F":
                    setselectedTimeExit('15:25')
                    setselectedTimeNoTrade('15:25')
                    break;
                case "CF":
                case "CO":
                    setselectedTimeExit('16:55')
                    setselectedTimeNoTrade('16:55')
                    break;
                case "MF":
                case "MO":
                    setselectedTimeExit('23:25')
                    setselectedTimeNoTrade('23:25')
                    break;
                default:
                    // Handle the case where datra or datra[0].segment is undefined or doesn't match any of the cases
                    break;
            }

        }
       


    }, [selectCatagoryid])


    const selectCatagoryId = (e) => {

        setStrikePrice('');
        setOptionType('');
        setExpiryOnChange('')
        setShowstrikePrice(0);
        previousToken.current = "";
        liveToken.current = "";
        setLiveprice("");
        setExpirydateSelect({ loading: false, data: [] });
        setStrikePriceAll({ loading: false, data: [] });
        SetSelectCatagoryId(e.target.value);

    }

    const selectscriptname = (e) => {
        setStrikePrice('');
        setOptionType('');
        setExpiryOnChange('')
        setShowstrikePrice(0);
        previousToken.current = "";
        liveToken.current = "";
        setLiveprice("");
        setExpirydateSelect({ loading: false, data: [] });
        setStrikePriceAll({ loading: false, data: [] });
        SetScriptname(e.target.value);

        if (scriptSegment == 'C') {
            gettoken(selectCatagoryid, e.target.value, scriptSegment);
        }

    }

    const getExpirybackend = async (selectCatagoryid, symbol) => {

        if (selectCatagoryid != '' && symbol != '') {
            // console.log("selectCatagoryid ", selectCatagoryid)
            // console.log("symbol ", symbol)
            await dispatch(getexpirymanualtrade(
                {
                    req:
                    {
                        category_id: selectCatagoryid,
                        symbol: symbol
                    },

                    token: UserLocalDetails.token
                }
            ))
                .unwrap()
                .then((response) => {
                    if (response.status) {
                        setExpirydateSelect({
                            loading: false,
                            data: response.data,
                        });
                    } else {
                        setExpirydateSelect({
                            loading: false,
                            data: [],
                        });
                    }
                });






        }



        // const data = { categorie_id: selectCatagoryid , symbol : symbol }
        // const response = await getexpirymanualtrade(data);
        // setExpirydateSelect(response.data.data);

    }

    useEffect(() => {
        getExpirybackend(selectCatagoryid, scriptname)
    }, [scriptname]);

    const selectExpiryFun = (e) => {
        setStrikePrice('');
        setOptionType('');
        setStrikePriceAll([]);
        setShowstrikePrice(0);
        setExpiryOnChange(e.target.value)

        if (scriptSegment == 'F' || scriptSegment == 'MF' || scriptSegment == 'CF') {
            gettoken(selectCatagoryid, scriptname, scriptSegment, e.target.value, scriptSegment);
        }

        else if (scriptSegment == 'O' || scriptSegment == 'MO' || scriptSegment == 'CO') {

            previousToken.current = "";
            liveToken.current = "";
            setLiveprice("");
            setShowstrikePrice(1);
            getAllStrikePrice(selectCatagoryid, scriptname, e.target.value, scriptSegment)
        }


    }

    const getAllStrikePrice = async (selectCatagoryid, symbol, expiry, segment) => {
        await dispatch(getAllStrikePriceApi(
            {
                req:
                {
                    category_id: selectCatagoryid,
                    symbol: symbol,
                    expiry: expiry,
                    segment: segment
                },

                token: UserLocalDetails.token
            }
        ))
            .unwrap()
            .then((response) => {

                if (response.status) {
                    setStrikePriceAll({
                        loading: false,
                        data: response.data,
                    });
                } else {
                    setStrikePriceAll({
                        loading: false,
                        data: [],
                    });
                }
            });
    }


    const selectStrikePrice = (e) => {
        if (e.target.value != "") {
            setStrikePrice(e.target.value)
            if (optionType != '') {
                if (scriptSegment == 'O' || scriptSegment == 'CO' || scriptSegment == 'MO') {
                    gettoken(selectCatagoryid, scriptname, scriptSegment, expiryOnChange, scriptSegment, e.target.value, optionType);
                }
            }

        } else {
            setStrikePrice('')
            setOptionType('')
        }
    }

    const selectOptionType = (e) => {
        if (e.target.value != '') {
            if (strikePrice == '') {
                alert('please alert select strike price');
                return
            }
            setOptionType(e.target.value);
            if (scriptSegment == 'O' || scriptSegment == 'MO' || scriptSegment == 'CO') {
                gettoken(selectCatagoryid, scriptname, scriptSegment, expiryOnChange, scriptSegment, strikePrice, e.target.value);
            }

        } else {
            previousToken.current = "";
            liveToken.current = "";
            setLiveprice("");
            setOptionType("");
        }

    }

    const dropdownSelect = (num) => {
        if (num == "1") {
            return setChangeDropdown(1)
        } else if (num == "0") {
            return setChangeDropdown(0)
        }
    }

    const selectMarkettime = (e) => {
        if (e.target.value == "2") {
            if (EntryPriceBA == 'at') {
                SetEntryPriceBA('above')
                setShowhideAtBelow(0)
            } else {
                SetEntryPriceBA('above')
                setShowhideAtBelow(0)
            }
            setShowMarkettime(0)
        } else {
            setShowMarkettime(1)
            SetEntryPriceBA('at')
            setShowhideAtBelow(0)
        }
        setMarkettime(e.target.value)
    }

    const selectAtAboveBelow = (e) => {

        if (e.target.value == 'range') {
            setShowhideAtBelow(1)
            SetEntryPriceBA(e.target.value);
        } else {
            setShowhideAtBelow(0)
            SetEntryPriceBA(e.target.value);
        }

    }

    const selectWiseTypeDropdown = (e) => {
        if (e.target.value == '') {
            setTarget1(0)
            setStopLoss(0)
            setShowhideTargetStoploss(0)
            setWiseTypeDropdown(e.target.value)
        } else {
            setShowhideTargetStoploss(1)
            setWiseTypeDropdown(e.target.value)
        }

    }


    const selectTargetStoplossDropdown = (e) => {
        setTargetStoplossDropdown(e.target.value)
    }

    const gettoken = async (selectCatagoryid = "", symbol = "", scriptSegment = "", expiry = "", segment = "", strike_price = "", option_type = "") => {

        if (scriptSegment != "") {
            if (scriptSegment == "C") {
        
            const data = { symbol: symbol, categorie_id: selectCatagoryid, segment: scriptSegment }
             await dispatch(gettokenbysocket(
                    {
                        req: data,
                        token: UserLocalDetails.token
                    }
                ))
                    .unwrap()
                    .then((response) => {
                        //console.log("cash token", response);
                        if (response.status) {

                            if (sockets != null) {
                                //console.log("previousToken.current", previousToken.current);
                                let json1 = {
                                    k: previousToken.current,
                                    t: "u",
                                };
                                sockets.send(JSON.stringify(json1));
                                previousToken.current = response.exchange + "|" + response.token;

                                liveToken.current = response.token;
                                let json = {
                                    k: response.exchange + "|" + response.token,
                                    t: "t",
                                };
                                sockets.send(JSON.stringify(json));

                            } else {
                                console.log("sockets closeeee");
                            }

                        } else {

                        }
                    });

            }
            else if (scriptSegment == "F" || scriptSegment == "MF" || scriptSegment == "CF") {

                const data = { symbol: symbol, categorie_id: selectCatagoryid, expiry: expiry, segment: segment }

                await dispatch(gettokenbysocket(
                    {
                        req: data,
                        token: UserLocalDetails.token
                    }
                ))
                 .unwrap()
                 .then((response) => {
                 // console.log("FUTURE token", response);
                        if (response.status) {
                            if (sockets != null) {
                               // console.log("previousToken.current", previousToken.current);
                                let json1 = {
                                    k: previousToken.current,
                                    t: "u",
                                };
                                sockets.send(JSON.stringify(json1));
                                previousToken.current = response.exchange + "|" + response.token;

                                liveToken.current = response.token;
                                let json = {
                                    k: response.exchange + "|" + response.token,
                                    t: "t",
                                };
                                sockets.send(JSON.stringify(json));

                            } else {
                                console.log("sockets closeeee");
                            }

                        } else {

                        }
                    });

            }
            else if (scriptSegment == "O" || scriptSegment == "MO" || scriptSegment == "CO") {
                const data = { symbol: symbol, categorie_id: selectCatagoryid, expiry: expiry, segment: segment, strike_price: strike_price, option_type: option_type }
                await dispatch(gettokenbysocket(
                    {
                        req: data,
                        token: UserLocalDetails.token
                    }
                ))
                    .unwrap()
                    .then((response) => {
                       // console.log("Option token", response);
                        if (response.status) {

                            if (sockets != null) {
                              //  console.log("previousToken.current", previousToken.current);
                                let json1 = {
                                    k: previousToken.current,
                                    t: "u",
                                };
                                sockets.send(JSON.stringify(json1));
                                previousToken.current = response.exchange + "|" + response.token;

                                liveToken.current = response.token;
                                let json = {
                                    k: response.exchange + "|" + response.token,
                                    t: "t",
                                };
                                sockets.send(JSON.stringify(json));

                            } else {
                                console.log("sockets closeeee");
                            }

                        } else {

                        }
                    });

            }


        }
    }


    const GenerateMakeCall = async (e) => {

        e.preventDefault();

        if (selectCatagoryid == "") {
            alert("Please Select a Script  Type")
            return
        }
        if (scriptname == "") {
            alert("Please Select a Script Name")
            return
        }
        if (scriptSegment != 'C') {
            if (expiryOnChange == "") {
                alert("Please Select a Expiry")
                return
            }
        }
        if (scriptSegment == 'O' || scriptSegment == 'MO' || scriptSegment == 'CO') {
            if (strikePrice == "") {
                alert("Please Select a strike price")
                return
            }
            if (optionType == "") {
                alert("Please Select a Option Type")
                return
            }
        }
        if (selectStrategy == "") {
            alert("Please Select a Strategy")
            return
        }
        if (tradeType == '') {
            alert("Please Select a Trade Type")
            return
        }
        if (EntryPriceBA == '') {
            alert("Please Select a  Above/Below/Range")
            return
        }


        let price = "0";
        // set price
        if (EntryPriceBA == 'at') {
            const get_price_live = $(".liveprice" + liveToken.current).html();

            if (get_price_live == '' || get_price_live == undefined) {
                if (EntryPrice == '') {
                    alert("Please Enter a Entry Price")
                    return
                } else {
                    price = EntryPrice
                }
            } else {
                price = get_price_live
            }
        }
        else if (EntryPriceBA == 'range') {
            if (EntryPriceRange_one == '') {
                alert("Please Enter a price from")
                return
            }
            if (EntryPriceRange_two == '') {
                alert("Please Enter a price to")
                return
            }
        } else if (EntryPriceBA == 'above' || EntryPriceBA == 'below') {
            if (EntryPrice == '') {
                alert("Please Enter a Entry Price")
                return
            } else {
                price = EntryPrice
            }
        }


        if (IntradayDelivery == '1') {
            if (EntryPriceBA == "at") {
                if (selectedTimeExit == '') {
                    alert("Please Select a Intraday Time Exit")
                    return
                }
            } else {
                if (selectedTimeExit == '') {
                    alert("Please Select a Intraday Time Exit")
                    return
                }

                if (selectedTimeNoTrade == '') {
                    alert("Please Select a Intraday No Trade Time")
                    return
                }
            }
        }

        if (IntradayDelivery == '2') {
            if (selectedTimeNoTrade == '') {
                alert("Please Select a Delivery No Trade Time")
                return
            }
        }

        let sl_status = 0
        let Target = 0
        let StopLoss = 0

        if (WiseTypeDropdown != '') {
            if (parseFloat(target1) == 0 && parseFloat(stoploss) == 0) {
                alert("Please Select Any target/Stoploss")
                return
            }

            if (parseFloat(target1) < 0) {
                alert("Not Set Negative value in Target")
                return
            }
            if (parseFloat(stoploss) < 0) {
                alert("Not Set Negative value in Stoploss")
                return
            }



            if (WiseTypeDropdown == '1') {
                if (parseFloat(target1) != 0 && target1 != '') {

                    let percent_value = parseFloat(price) * (target1 / 100)
                    Target = parseFloat(price) + parseFloat(percent_value)
                    sl_status = 1
                }
                if (parseFloat(stoploss) != 0 && stoploss != '') {
                    let percent_value = parseFloat(price) * (stoploss / 100)
                    StopLoss = parseFloat(price) - parseFloat(percent_value)
                    sl_status = 1
                }
            }

            else if (WiseTypeDropdown == '2') {
                // Points
                if (parseFloat(target1) != 0 && target1 != '') {
                    Target = parseFloat(price) + parseFloat(target1)
                    sl_status = 1
                }
                if (parseFloat(stoploss) != 0 && stoploss != '') {
                    StopLoss = parseFloat(price) - parseFloat(stoploss)
                    sl_status = 1
                }


            }

        }

       
        alert("Done")

        // const currentTimestamp = Math.floor(Date.now() / 1000);
        //     let req = `DTime:${currentTimestamp}|Symbol:${scriptname}|TType:${tradeType}|Tr_Price:0.00|Price:${price}|Sq_Value:0.00|Sl_Value:0.00|TSL:0.00|Segment:${scriptSegment}|Strike:${strikePrice==''?'100':strikePrice}|OType:${optionType}|Expiry:${expiryOnChange}|Strategy:${selectStrategy}|Quntity:100|Key:SNE132023|TradeType:MAKECALL|Target:${target1}|StopLoss:${stoploss}|ExitTime:${selectedTimeExit}|sl_status:1|Demo:demo`

        const currentTimestamp = Math.floor(Date.now() / 1000);
        let req = `DTime:${currentTimestamp}|Symbol:${scriptname}|TType:${tradeType}|Tr_Price:0.00|Price:${price}|Sq_Value:0.00|Sl_Value:0.00|TSL:0.00|Segment:${scriptSegment}|Strike:${strikePrice == '' ? '100' : strikePrice}|OType:${optionType}|Expiry:${expiryOnChange}|Strategy:${selectStrategy}|Quntity:100|Key:${UserDetails && UserDetails[0].client_key}|TradeType:MAKECALL|Target:${Target == 0 ? 0 : Target.toFixed(2)}|StopLoss:${StopLoss == 0 ? 0 : StopLoss.toFixed(2)}|ExitTime:0|sl_status:${sl_status}|Demo:demo`
        console.log("req ", req)
        // console.log("process.env.BROKER_URL ",process.env.BROKER_URL)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8800/broker-signals',
            //url: 'https://trade.pandpinfotech.com/signal/broker-signals',
            // url: `${process.env.BROKER_URL}`,
            headers: {
                'Content-Type': 'text/plain'
            },
            data: req
        };
        axios.request(config)
            .then(async (response) => {
                //console.log("response ", response);
            })
            .catch((error) => {
                // console.log(error.response.data);
            });

       }




    return (
        <div>
            <div className="content container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                            <h5 className="card-title mb-0 w-auto">

                                <i className="fas fa-money-bill-wave pe-2" />
                                Make Call
                            </h5>
                            <div className="pay-btn text-end w-auto" />
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="edit-card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Script Type * </label>


                                                        <select className="form-select" onChange={(e) => {

                                                            selectCatagoryId(e);
                                                            SetScriptname("")
                                                            // SetForDisabledSubmit(false)
                                                        }}>
                                                            <option name="none" disabled="">Select Script Type</option>

                                                            {CatagoryData.data && CatagoryData.data?.map((x, index) => {

                                                                if (x.segment !== "FO") {
                                                                    return <option key={x._id} name={x.segment} value={x._id}>{x.name}</option>
                                                                }
                                                            })}

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Script Name</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <select className="form-select" onChange={(e) => {
                                                                    selectscriptname(e);
                                                                    SetScriptnameErr('');
                                                                    // selecttype(''); 
                                                                    dropdownSelect("1")

                                                                }}
                                                                >
                                                                    <option name="none" disabled="">Select Script Name</option>
                                                                    {
                                                                    AllServices.data && AllServices.data.map((x) => {
                                                                            return <option value={x.name}>{x.name}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </li>
                                                            <li>

                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Expiry Date</label>
                                                        <select className="form-select" name="expiry_date" onChange={(e) => { selectExpiryFun(e) }} selected>
                                                            <option value="">Select Expiry Date</option>
                                                            {expirydateSelect.data && expirydateSelect.data?.map((sm, i) =>
                                                                <option value={sm.uniqueExpiryValues}>{sm.uniqueExpiryValues}</option>)}
                                                        </select>
                                                    </div>
                                                </div>



                                                {
                                                    showstrikePrice == 1 ?
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <div className="input-block mb-3">
                                                                <label>Strike Price - -</label>
                                                                <select className="form-select" onChange={(e) => { selectStrikePrice(e); setStrikePriceErr('') }}>
                                                                    <option selected value="">--Select strike price--</option>
                                                                    {
                                                                        strikePriceAll.data && strikePriceAll.data.map((x) => {
                                                                            return <option value={x.strike}>{x.strike}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                }



                                                {
                                                    strikePrice && showstrikePrice == 1 ?
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <div className="input-block mb-3">
                                                                <label>Option-Type Call/Put -</label>
                                                                <select className="form-select" onChange={(e) => { selectOptionType(e); setOptionTypeErr(''); }}>
                                                                    <option selected value="" >--Select--</option>
                                                                    <option value="CALL">CALL</option>
                                                                    <option value="PUT">PUT</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                }




                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Select Strategy -</label>
                                                        <select className="form-select" onChange={(e) => setSelectStrategy(e.target.value)} name="strategyname">

                                                            <option value="">-- Select Strategy Tag--</option>
                                                            {strategyDataAll.data && strategyDataAll.data.map((sm, i) =>
                                                                <option value={sm.strategy_name}>{sm.strategy_name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="edit-card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Type -</label>
                                                        <select className="form-select" onChange={(e) => { setTradeType(e.target.value); setTradeTypeErr(''); dropdownSelect("0") }}>
                                                            <option selected={tradeType == "LE"} value="LE">Buy</option>
                                                            <option selected={tradeType == "SE"} value="SE">Sell</option>
                                                        </select>

                                                    </div>
                                                </div>

                                                {/* <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Market Time -</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <select className="form-select" onChange={(e) => { selectMarkettime(e) }}>
                                                 <option value="1" selected={markettime == "1"}>DAY</option>
                                                 <option value="2" selected={markettime == "2"}>AMO</option>
                                                                </select>
                                                            </li>
                                                            <li>
                                                               
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> */}


                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Entry Price :</label>
                                                        <span className={'liveprice' + liveToken.current}>{
                                                            liveprice
                                                        }</span>


                                                        {
                                                            showhideAtBelow == 0 ?

                                                                <input type="number" name="exampleFormControlInput1" className="form-control show_entry_price" onChange={(e) => {
                                                                    SetEntryPrice(e.target.value);
                                                                    SetEntryPriceErr('')
                                                                }} value={EntryPrice} />

                                                                :

                                                                <>

                                                                    <div className="row mt-2">
                                                                        <div class="col-sm-6 col-lg-6">
                                                                            <input type="number" name="exampleFormControlInput1" className="form-control" onChange={(e) => {
                                                                                SetEntryPriceRange_one(e.target.value);
                                                                                SetEntryPriceRange_oneErr('')
                                                                            }} value={EntryPriceRange_one} />
                                                                        </div>

                                                                        <div class="col-sm-6 col-lg-6">
                                                                            <input type="number" name="exampleFormControlInput1" className="form-control" onChange={(e) => {
                                                                                SetEntryPriceRange_two(e.target.value);
                                                                                SetEntryPriceRange_twoErr('')
                                                                            }} value={EntryPriceRange_two} />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                        }

                                                    </div>

                                                    <div className="row mt-2">
                                                        {
                                                           showmarkettime == 1 ?
                                                                <div className="col-sm-4 col-lg-3">
                                                                    <div className="radio">
                                                                        <label htmlFor="at_check">
                                                                            <input
                                                                                id="at_check"
                                                                                type="radio"
                                                                                name="at_check"
                                                                                value="at"
                                                                                checked={EntryPriceBA == 'at' ? true : false}
                                                                                onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                            />
                                                                            At
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                :
                                                                ""
                                                        }

                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_above">
                                                                    <input
                                                                        id="at_above"
                                                                        type="radio"
                                                                        name="at_above"
                                                                        value="above"
                                                                        checked={EntryPriceBA == 'above' ? true : false}
                                                                        onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                    />
                                                                    Above
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_below">
                                                                    <input
                                                                        id="at_below"
                                                                        type="radio"
                                                                        name="at_below"
                                                                        value="below"
                                                                        checked={EntryPriceBA == 'below' ? true : false}
                                                                        onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                    />
                                                                    Below
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_range">
                                                                    <input
                                                                        id="at_range"
                                                                        type="radio"
                                                                        name="at_range"
                                                                        value="range"
                                                                        checked={EntryPriceBA == 'range' ? true : false}
                                                                        onChange={(e) => { selectAtAboveBelow(e); SetEntryPriceBAErr('') }}
                                                                    />
                                                                    Range
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                </div>

                                                <div className="col-lg-4">
                                                    <div className="input-block mb-3">
                                                        <label>Intraday / Delivery -</label>
                                                        <select className="form-select" onChange={(e) => { setIntradayDelivery(e.target.value) }}>
                                                            <option selected={IntradayDelivery == "1"} value="1">Intraday</option>
                                                            <option selected={IntradayDelivery == "2"} value="2">Delivery</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {IntradayDelivery == "1" ?
                                                    EntryPriceBA == "at" ? <>
                                                        <div className="col-lg-4">
                                                            <label for="exampleFormControlSelect1" > Exit Time  :  &nbsp; </label>
                                                            <input type="time" id="appt" className="form-control" name="appt"
                                                                min="09:15"
                                                                max="15:15"
                                                                value={selectedTimeExit}
                                                                onChange={handleTimeChangeExit} />
                                                        </div>

                                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                                        </div>
                                                    </> :
                                                        <>
                                                            <div className="col-lg-4">
                                                                <label for="exampleFormControlSelect1" > Exit Time  :  &nbsp; </label>
                                                                <input type="time" id="appt" className="form-control" name="appt"
                                                                    min="09:15"
                                                                    max="15:15"
                                                                    value={selectedTimeExit}
                                                                    onChange={handleTimeChangeExit} />
                                                            </div>

                                                            <div className="col-lg-4 col-md-4 col-sm-12">
                                                                <label for="exampleFormControlSelect1" > No Trade Time : &nbsp; </label>
                                                                
                                                                <input type="time" id="appt" className="form-control" name="appt"
                                                                    min="09:15"
                                                                    max="15:15"
                                                                    value={selectedTimeNoTrade}
                                                                    onChange={handleTimeChangeNoTrade} />

                                                            </div>
                                                        </>

                                                    : IntradayDelivery == "2" ? <>
                                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                                            <label for="exampleFormControlSelect1" > No Trade Time : &nbsp; </label>
                                                            <input type="time" id="appt" className="form-control" name="appt"
                                                                min="09:15"
                                                                max="15:15"
                                                                value={selectedTimeNoTrade}
                                                                onChange={handleTimeChangeNoTrade} />
                                                        </div>

                                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                                        </div>
                                                    </> :
                                                        ""

                                                }

                                                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                    <div className="input-block mb-3 ">
                                                        <label>Wise Type -</label>
                                                        <select className="form-select" onChange={(e) => { selectWiseTypeDropdown(e) }}>
                                                            <option selected value="">Select Wise Type</option>
                                                            <option selected={WiseTypeDropdown == "1"} value="1">Percentage(%)</option>
                                                            <option selected={WiseTypeDropdown == "2"} value="2">Points</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {
                                                    showhideTargetStoploss == 1 ?
                                                        <>
                                                            <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                                <div className="input-block mb-3">
                                                                    <label>Target -</label>
                                                                    <input type="number" className="form-control" onChange={(e) => { setTarget1(e.target.value); setTarget1Err("") }} />
                                                                    {target1Err ? <p style={{ color: "#ff8888", fontSize: '10px' }}> *{target1Err}</p> : ''}
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                                <div className="input-block mb-3">
                                                                    <label>Stop Loss  -</label>
                                                                    <input type="number" className="form-control" onChange={(e) => { setStopLoss(e.target.value); setStopLossErr('') }} />

                                                                </div>
                                                            </div>

                                                            <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                                                                <div className="input-block mb-3">
                                                                    <label>Taget/StopLoss Status - -</label>
                                                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { selectTargetStoplossDropdown(e); }}>
                                                                        <option selected value=""> --select-- </option>
                                                                        {target1 == 'not' || target1 == '' ? ""
                                                                            :
                                                                            <>
                                                                                <option value="1">Target</option>
                                                                            </>
                                                                        }

                                                                        {stoploss == 'not' || stoploss == '' ? ""
                                                                            :
                                                                            <>
                                                                                <option value="2">stoploss</option>
                                                                            </>
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        ""
                                                }


                                                <div className="preview-boxs mt-3">
                                                    <button type="submit" onClick={(e) => GenerateMakeCall(e)} disabled={ForDisabledSubmit} className="btn btn-primary">
                                                        Gnenerate
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <div className="col-lg-12 col-md-12" data-aos="fade-right">
                            <ul className="nav nav-tabs nav-tabs-solid d-flex justify-content-center">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="#solid-tab1"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-solid fa-landmark pe-2"></i>
                                        Below
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#solid-tab2"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-solid fa-envelope pe-2"></i>
                                        Above
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#solid-tab3"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-regular fa-image pe-2"></i>
                                        Range
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <div className="col-lg-12 col-md-12" data-aos="fade-left">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane show active" id="solid-tab1">

                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto"> <i className="fa-solid fa-landmark pe-2"></i>Below</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    {/* <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#company">
                                                        Edit Customer Information
                                                    </button> */}
                                                </div>
                                            </div>


                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th className="no-sort">Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane" id="solid-tab2">
                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto"> <i className="fa-solid fa-envelope pe-2"></i>Above</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#email">
                                                        Edit Email Information
                                                    </button>
                                                </div>
                                            </div>


                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th className="no-sort">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane" id="solid-tab3">
                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto">  <i className="fa-regular fa-image pe-2"></i>Range</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    {/* <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#back">
                                                        Update Images
                                                    </button> */}
                                                </div>
                                            </div>

                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th>Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Makecall
