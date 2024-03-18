"use strict";
const bcrypt = require("bcrypt");
const db = require('../../Models');
const User_model = db.user;
const Role_model = db.role;
const Company_info = db.company_information;
const user_logs = db.user_logs;
const client_services = db.client_services;
const strategy_client = db.strategy_client;
const services = db.services;
const strategy = db.strategy;
const serviceGroup_services_id = db.serviceGroup_services_id;
const user_activity_logs = db.user_activity_logs;
const Subadmin_Permission = db.Subadmin_Permission;
const live_price = db.live_price;
const live_data_banknifty = db.LiveDataBankNifty;
const live_data_nifty = db.LiveDataNifty;




var axios = require('axios');

var dateTime = require('node-datetime');
var dt = dateTime.create();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { getIPAddress } = require('../../Helper/logger.helper')


class Dashboard {

    // ONE USER GET ALL TRADING STATUS
    async getClientServices(req, res) {
        try {
            const { user_Id } = req.body;
            // GET LOGIN CLIENTS
            const objectId = new ObjectId(user_Id);
            const pipeline = [
                {
                    $match: {
                        user_id: objectId
                    }
                },

                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "userInfo",
                    },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "service_id",
                        foreignField: "_id",
                        as: "service",
                    },
                },
                {
                    $unwind: '$service',
                },
                // {
                //     $lookup: {
                //         from: "strategies",
                //         localField: "strategy_id",
                //         foreignField: "_id",
                //         as: "strategys",
                //     },
                // },
                // {
                //     $unwind: '$strategys',
                // },
                {
                    $lookup: {
                        from: "categories",
                        localField: "service.categorie_id",
                        foreignField: "_id",
                        as: "categories",
                    },
                },
                {
                    $unwind: '$categories',
                },
                {
                    $lookup: {
                        from: "servicegroup_services_ids",
                        localField: "group_id",
                        foreignField: "Servicegroup_id",
                        as: "servicegroup_services_ids",
                    },
                },
                {
                    $unwind: '$servicegroup_services_ids',
                },
                {
                    $match: {
                        $expr: {
                            $eq: ['$servicegroup_services_ids.Service_id', '$service_id']
                        }
                    }
                }
                ,

                {
                    $sort: {
                        'service.name': 1, // 1 for ascending order, -1 for descending order
                    },
                },
                {
                    $project: {
                        'service.name': 1,
                        'service.instrument_token': 1,
                        'service.exch_seg': 1,
                        'service._id': 1,
                        'service.lotsize': 1,
                        'servicegroup_services_ids.group_qty': 1,
                        //  'strategys.strategy_name': 1,
                        //  'strategys._id': 1,
                        'categories.segment': 1,
                        'userInfo.multiple_strategy_select': 1,
                        'userInfo.count_strategy_select': 1,

                        _id: 1,
                        user_id: 1,
                        active_status: 1,
                        quantity: 1,
                        lot_size: 1,
                        product_type: 1,
                        order_type: 1,
                        createdAt: 1,
                        strategy_id: 1
                    },
                },
            ];

            const GetAllClientServices = await client_services.aggregate(pipeline)


            const pipeline1 = [
                {
                    $match: {
                        user_id: objectId
                    }
                },
                {
                    $lookup: {
                        from: "strategies",
                        localField: "strategy_id",
                        foreignField: "_id",
                        as: "result"
                    },
                },

                {
                    $unwind: '$result',
                },
                {
                    $project: {
                        'result._id': 1,
                        'result.strategy_name': 1,

                    },
                },

            ];
            const GetAllClientStrategy = await strategy_client.aggregate(pipeline1);

            const totalCount = GetAllClientServices.length;

            // IF DATA NOT EXIST
            if (GetAllClientServices.length == 0) {
                return res.send({ status: false, msg: "Empty data", data: [], totalCount: totalCount, })
            }





            const GetServiceStrategy = GetAllClientServices.map(item => ({
                _id: item.service._id,
                strategy_id: item.strategy_id,
                service_name: item.service.name + " [ " + item.categories.segment + " ]",
            }));


            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Client Services ",
                services: GetAllClientServices,
                strategy: GetAllClientStrategy,
                GetServiceStrategy: GetServiceStrategy,
                status_startegy: GetAllClientServices[0].userInfo.multiple_strategy_select,
                count_strategy_select: GetAllClientServices[0].userInfo.count_strategy_select,


                totalCount: totalCount
            })
        } catch (error) {
            console.log("Error get user trading Status error -", error);
        }
    }

    // UPDATE CLIENT SERVICES
    async updateClientServices(req, res) {
        try {
            const { user_id, servicesData, data, statusStartegyUser, GetServiceStrategy } = req.body;


            if (statusStartegyUser == "1") {
                const isEmpty = Object.keys(servicesData).length === 0;
                if (isEmpty == false) {
                    // Filter objects with empty strategy_id
                    const result = Object.keys(servicesData)
                        .filter((key) => Array.isArray(servicesData[key].strategy_id) && servicesData[key].strategy_id.length === 0)
                        .reduce((obj, key) => {
                            obj[key] = servicesData[key];
                            return obj;
                        }, {});


                    // Extracting the key (id) from the inputObject
                    const inputId = Object.keys(result)[0];
                    // Finding the matching object in dataArray based on _id
                    const matchingObject = GetServiceStrategy.find(obj => obj._id === inputId);
                    // Getting the service_name if a match is found
                    const serviceName = matchingObject ? matchingObject.service_name : null;

                    const isEmptyStartegyArray = Object.keys(result).length === 0;

                    if (isEmptyStartegyArray == false) {
                        return res.send({ status: false, msg: 'Please Select one Strategy a script ' + serviceName, data: [] });
                    }

                }
            }

            const UserData = await User_model.findOne({ _id: user_id });


            if (!UserData) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            if (Object.keys(servicesData).length == 0) {
                return res.send({ status: false, msg: 'No Data For Update', data: [] });
            }





            for (const key in servicesData) {
                if (servicesData[key]) {
                    const matchedObject = servicesData[key];



                    if (matchedObject.strategy_id != undefined) {

                        matchedObject.strategy_id.forEach((sid) => {
                            matchedObject.strategy_id.push(new ObjectId(sid))
                        })

                        matchedObject.strategy_id = matchedObject.strategy_id.filter(item => item instanceof ObjectId);

                    }



                    if (matchedObject.active_status) {
                        matchedObject.active_status = matchedObject.active_status == true ? '1' : '0'
                    }

                    const filter = { user_id: UserData._id, service_id: key };
                    const updateOperation = { $set: matchedObject };


                    const result = await client_services.updateOne(filter, updateOperation);

                    const Service_name = await services.find({ _id: key });

                    if (matchedObject.quantity) {

                        const user_activity = new user_activity_logs(
                            {
                                user_id: UserData._id,
                                message: Service_name[0].name + " quantity Update",
                                quantity: matchedObject.quantity,
                                role: data.Editor_role,
                                system_ip: getIPAddress(),
                                device: data.device
                            })
                        await user_activity.save()
                    }

                    if (matchedObject.strategy_id != undefined) {
                        matchedObject.strategy_id.forEach(async (stg_id) => {

                            const Strategieclient = await strategy.find({ _id: stg_id });

                            const user_activity = new user_activity_logs(
                                {
                                    user_id: UserData._id,
                                    message: Service_name[0].name + " Update Strategy ",
                                    Strategy: Strategieclient[0].strategy_name,
                                    role: data.Editor_role,
                                    system_ip: getIPAddress(),
                                    device: data.device
                                })
                            await user_activity.save()
                        })


                    }

                    if (matchedObject.active_status || matchedObject.active_status == false) {

                        var msg = matchedObject.active_status == true ? "ON" : "OFF"

                        const user_activity = new user_activity_logs(
                            {
                                user_id: UserData._id,
                                message: Service_name[0].name + " Service " + msg,
                                quantity: matchedObject.quantity,
                                role: data.Editor_role,
                                system_ip: getIPAddress(),
                                device: data.device
                            })
                        await user_activity.save()
                    }

                    if (matchedObject.order_type) {


                        var msg = matchedObject.order_type == '1' ? "MARKET" : matchedObject.order_type == '2' ? "LIMIT" : matchedObject.order_type == '3' ? "STOPLOSS LIMIT" : "STOPLOSS MARKET"

                        const user_activity = new user_activity_logs(
                            {
                                user_id: UserData._id,
                                message: Service_name[0].name + "  order_type " + msg + " Update",

                                role: data.Editor_role,
                                system_ip: getIPAddress(),
                                device: data.device
                            })
                        await user_activity.save()
                    }

                    if (matchedObject.product_type) {


                        var msg = matchedObject.product_type == '1' ? "CNC" : matchedObject.product_type == '2' ? "MIS" : matchedObject.product_type == '3' ? "BO" : "CO"

                        const user_activity = new user_activity_logs(
                            {
                                user_id: UserData._id,
                                message: Service_name[0].name + "  product_type " + msg + " Update",

                                role: data.Editor_role,
                                system_ip: getIPAddress(),
                                device: data.device
                            })
                        await user_activity.save()
                    }

                } else {
                }
            }

            return res.send({ status: true, msg: 'Update Successfully', data: [] });


        } catch (error) {
            console.log("Error ClientServices Update-", error);
            return res.send({ status: false, msg: 'User Not exists', data: error });

        }
    }

    // Trading OFF USER
    async TradingOff(req, res) {
        try {
            const { user_id, device } = req.body

            var User_information = await User_model.find({ _id: user_id });

            if (User_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            if (User_information[0].Role == "ADMIN") {

                var live_price1 = await live_price.find({ Role: "ADMIN" });

                if (live_price1[0].trading_status != "on") {
                    return res.send({ status: false, msg: 'Already Trading Off', data: [] });
                }


                const admin_Update = await live_price.updateOne({ _id: live_price1[0]._id }, { $set: { trading_status: "off" } });


                const user_login = new user_logs({
                    user_Id: User_information[0]._id,
                    login_status: "Trading off",
                    role: User_information[0].Role,
                    device: device
                })
                await user_login.save();

                return res.send({ status: true, msg: 'Trading Off successfully', data: [] });

            }


            if (User_information[0].TradingStatus == "off") {
                return res.send({ status: false, msg: 'Already Trading Off', data: [] });

            }

            const User_Update = await User_model.updateOne({ _id: User_information[0]._id }, { $set: { TradingStatus: "off" } });

            const user_login = new user_logs({
                user_Id: User_information[0]._id,
                login_status: "Trading off",
                role: User_information[0].Role,
                // system_ip: getIPAddress()
                device: device
            })
            await user_login.save();

            return res.send({ status: true, msg: 'Trading Off successfully', data: [] });


        } catch (error) {
            console.log("Error error", error);
        }
    }

    // Update User Modifyed
    async ModifyUpdates(req, res) {
        try {
            const { user_id, obj } = req.body

            var User_information = await User_model.find({ _id: user_id }).
                select('web_url signals_execution_type');


            if (User_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }
            let abc = {};

            if (User_information[0].web_url !== obj.web_url) {
                abc['web_url'] = obj.web_url;
            }
            // if (User_information[0].qty_type !== obj.qty_type) {
            //     abc['qty_type'] = obj.qty_type;
            //     if (obj.qty_type == "1") {
            //         update_qty(user_id)
            //     }
            // }
            if (User_information[0].signals_execution_type !== obj.signals_execution_type) {
                abc['signals_execution_type'] = obj.signals_execution_type;
            }

            if (Object.keys(abc).length != 0) {

                const User_Update = await User_model.updateMany({ _id: User_information[0]._id },
                    { $set: abc });


                for (const key in abc) {
                    if (abc.hasOwnProperty(key)) {
                        const value = abc[key];

                        var msg = ""
                        if (key == "signals_execution_type") {
                            msg = `Update Signal Execution ${value == "1" ? "Web" : "App"}`
                        } else if (key == "web_url") {
                            msg = `Update Web Url ${value == "1" ? "Admin" : "Individual"}`
                        }
                        //  else if (key == "qty_type") {
                        //     msg = `Update Quantity Type ${value == "1" ? "Admin" : "Individual"}`
                        // }

                        const user_activity = new user_activity_logs(
                            {
                                user_id: User_information[0]._id,
                                message: msg,
                                role: User_information[0].Role,
                                system_ip: getIPAddress(),
                                // device: data.device
                            })


                        await user_activity.save()
                    }
                }

            }

            return res.send({ status: true, msg: 'User Profile update', data: [] });


        } catch (error) {
            console.log("Error error", error);
        }
    }

    async GetUserApiCreate(req, res) {

        try {
            const { user_id } = req.body

            var User_information = await User_model.find({ _id: user_id }).
                select('license_type Role broker');


            if (User_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            } else {
                return res.send({ status: true, msg: 'User Info', data: User_information });
            }

        } catch (error) {
            console.log("Error ", error)
        }

    }

    // GET Live Accounts Information
    async GetLiveAccountmarginInformation(req, res) {

        try {
            const { user_id } = req.body

            var User_information = await User_model.find({ _id: user_id, TradingStatus: "on" })




            if (User_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            } else {

                if (User_information[0].broker == 2) {
                    // ALICE

                    var config = {
                        method: 'get',
                        url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/limits/getRmsLimits',
                        headers: {
                            'Authorization': 'Bearer ' + User_information[0].demat_userid + ' ' + User_information[0].access_token,
                            'Content-Type': 'application/json'
                        }

                    };

                    axios(config)
                        .then(async (response) => {
                            try {
                                if (response.data.stat == "not_ok") {
                                    return res.send({ status: false, msg: response.data.emsg, data: [] });
                                } else {
                                    // console.log("Angel -", response.data[0])

                                    var data = {
                                        total_cash: response.data[0].cashmarginavailable,
                                        available_cash: response.data[0].net,
                                        segment: response.data[0].segment,
                                        cncMarginUsed: response.data[0].cncMarginUsed,
                                        unrealizedMtomPrsnt: response.data[0].unrealizedMtomPrsnt,
                                        realizedMtomPrsnt: response.data[0].realizedMtomPrsnt,
                                        turnover: response.data[0].turnover

                                    }
                                    return res.send({ status: true, msg: "SUCCESS", data: data });

                                }
                            } catch (error) {
                                return res.send({ status: false, msg: error, data: [] });

                            }


                        })


                } else if (User_information[0].broker == 12) {
                    // Angel

                    var config = {
                        method: 'get',
                        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getRMS',

                        headers: {
                            'Authorization': 'Bearer ' + User_information[0].access_token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-UserType': 'USER',
                            'X-SourceID': 'WEB',
                            'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                            'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                            'X-MACAddress': 'MAC_ADDRESS',
                            'X-PrivateKey': User_information[0].api_key
                        }
                    };
                    // console.log("User_information", config)

                    axios(config)
                        .then(function (response) {
                            // console.log("response.data", response.data)
                            try {
                                if (response.data.status != true) {
                                    return res.send({ status: false, msg: response.data.emsg, data: [] });
                                } else {

                                    var data = {
                                        total_cash: response.data.data.net,
                                        available_cash: response.data.data.availablecash,
                                        segment: "",
                                        m2munrealized: response.data.data.m2munrealized,
                                        m2mrealized: response.data.data.m2munrealized
                                    }
                                    return res.send({ status: true, msg: response.data.message, data: data });

                                }
                            } catch (error) {
                                return res.send({ status: false, msg: error, data: [] });

                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            return res.send({ status: false, msg: error, data: [] });

                        });

                } else {

                }



            }

        } catch (error) {
            console.log("Error ", error)
        }

    }


    // GET Live Accounts ORDER Information
    async GetLiveAccountOrderInformation(req, res) {

        try {
            const { user_id } = req.body

            var User_information = await User_model.find({ _id: user_id, TradingStatus: "on" })

            if (User_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            } else {

                if (User_information[0].broker == 2) {
                    // ALICE

                    var config = {
                        method: 'get',
                        url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/fetchOrderBook',
                        headers: {
                            'Authorization': 'Bearer ' + User_information[0].demat_userid + ' ' + User_information[0].access_token,
                            'Content-Type': 'application/json'
                        }

                    };

                    axios(config)
                        .then(async (response) => {
                            try {
                                if (response.data.stat == "Not_Ok") {
                                    return res.send({ status: false, msg: response.data.emsg, data: [] });
                                } else {
                                    // console.log("Alice -", response.data)
                                    if (response.data.length > 0) {




                                        var orderBook = response.data.map((data) => {
                                            return {
                                                tradingsymbol: data.Trsym,
                                                variety: "",
                                                ordertype: data.Prctype,
                                                producttype: data.Pcode,
                                                duration: data.Validity,
                                                price: data.Prc,
                                                quantity: data.Qty,
                                                transactiontype: data.Trantype,
                                                exchange: data.Exchange,
                                                symboltoken: data.token,
                                                instrumenttype: "",
                                                strikeprice: data.strikePrice,
                                                optiontype: data.optionType,
                                                expirydate: data.ExpDate,
                                                lotsize: "",
                                                orderid: data.Nstordno,
                                                status: data.stat,
                                                orderstatus: data.RejReason,
                                                updatetime: data.OrderedTime,
                                                uniqueorderid: "",


                                            }
                                        })

                                        return res.send({ status: true, msg: response.data.message, data: orderBook });


                                    } else {
                                        return res.send({ status: false, msg: "Order Book Is Empty", data: [] });
                                    }
                                }
                            } catch (error) {
                                return res.send({ status: false, msg: error, data: [] });

                            }


                        })


                } else if (User_information[0].broker == 12) {
                    // Angel
                    var config = {
                        method: 'get',
                        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/getOrderBook',

                        headers: {
                            'Authorization': 'Bearer ' + User_information[0].access_token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-UserType': 'USER',
                            'X-SourceID': 'WEB',
                            'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                            'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                            'X-MACAddress': 'MAC_ADDRESS',
                            'X-PrivateKey': User_information[0].api_key
                        }
                    };




                    axios(config)
                        .then(function (response) {
                            try {
                                if (response.data.status != true) {
                                    return res.send({ status: false, msg: response.data.emsg, data: [] });
                                } else {




                                    if (response.data.data.length > 0) {

                                        var orderBook = response.data.data.map((data) => {
                                            return {
                                                tradingsymbol: data.tradingsymbol,
                                                variety: data.variety,
                                                ordertype: data.ordertype,
                                                producttype: data.producttype,
                                                duration: data.duration,
                                                price: data.price,
                                                quantity: data.quantity,
                                                transactiontype: data.transactiontype,
                                                exchange: data.exchange,
                                                symboltoken: data.symboltoken,
                                                instrumenttype: data.instrumenttype,
                                                strikeprice: data.strikeprice,
                                                optiontype: data.optiontype,
                                                expirydate: data.expirydate,
                                                lotsize: data.lotsize,
                                                orderid: data.orderid,
                                                status: data.status,
                                                orderstatus: data.orderstatus,
                                                updatetime: data.updatetime,
                                                uniqueorderid: data.uniqueorderid

                                            }
                                        })

                                        return res.send({ status: true, msg: response.data.message, data: orderBook });


                                    } else {

                                        return res.send({ status: false, msg: "Empty Orders", data: [] });

                                    }







                                }
                            } catch (error) {
                                return res.send({ status: false, msg: error, data: [] });

                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {

                }



            }

        } catch (error) {
            console.log("Error ", error)
        }

    }


    // GET Live Accounts POSITION Information
    async GetLiveAccountPositionInformation(req, res) {

        try {
            const { user_id } = req.body

            var User_information = await User_model.find({ _id: user_id, TradingStatus: "on" })



            if (User_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            } else {

                if (User_information[0].broker == 2) {
                    // ALICE

                    var config = {
                        method: 'post',
                        url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/positionAndHoldings/positionBook',
                        headers: {
                            'Authorization': 'Bearer ' + User_information[0].demat_userid + ' ' + User_information[0].access_token,
                            'Content-Type': 'application/json'
                        }

                    };

                    axios(config)
                        .then(async (response) => {
                            try {
                                if (response.data.stat == "Not_Ok") {
                                    return res.send({ status: false, msg: response.data.emsg, data: [] });
                                } else {
                                    // console.log("Alice -", response.data)

                                    // var data = {
                                    //     total_cash: response.data[0].net,
                                    //     available_cash: "",
                                    //     segment: response.data[0].segment
                                    // }
                                    return res.send({ status: true, msg: "SUCCESS", data: response.data });

                                }
                            } catch (error) {
                                return res.send({ status: false, msg: error, data: [] });

                            }


                        })


                } else if (User_information[0].broker == 12) {
                    // Angel
                    var config = {
                        method: 'get',
                        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getRMS',

                        headers: {
                            'Authorization': 'Bearer ' + User_information[0].access_token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-UserType': 'USER',
                            'X-SourceID': 'WEB',
                            'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                            'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                            'X-MACAddress': 'MAC_ADDRESS',
                            'X-PrivateKey': User_information[0].api_key
                        }
                    };

                    axios(config)
                        .then(function (response) {
                            try {
                                if (response.data.status != true) {
                                    return res.send({ status: false, msg: response.data.emsg, data: [] });
                                } else {

                                    var data = {
                                        total_cash: response.data.data.net,
                                        available_cash: response.data.data.availablecash,
                                        segment: ""
                                    }
                                    // console.log("Angel -", response.data.data)
                                    return res.send({ status: true, msg: response.data.message, data: data });

                                }
                            } catch (error) {
                                return res.send({ status: false, msg: error, data: [] });

                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {

                }



            }

        } catch (error) {
            console.log("Error ", error)
        }

    }




    async GetLiveChartData(req, res) {

        try {
            const { symbol } = req.body
            // if (symbol == "BankNifty") {
            //     var BankNiftyLiveData = await live_data_banknifty.find({ name: symbol }).sort({ _id: -1 }).limit(150)

            //     if (BankNiftyLiveData.length == 0) {
            //         return res.send({ status: false, msg: "Empty", data: [] });
            //     } else {

            //         const transformedData = BankNiftyLiveData.map(item => ({
            //             time: new Date(item.time),
            //             open: parseInt(item.open), high:parseInt(item.high), low:parseInt(item.low),close: parseInt(item.close),
            //         }));

            //         return res.send({ status: true, msg: "SUCCESS", data: transformedData });

            //     }
            // }else if (symbol == "Nifty") {
            //     var NiftyLiveData = await live_data_nifty.find({ name: symbol }).sort({ _id: -1 }).limit(150)

            //     if (NiftyLiveData.length == 0) {
            //         return res.send({ status: false, msg: "Empty", data: [] });
            //     } else {

            //         const transformedData = NiftyLiveData.map(item => ({
            //             time: new Date(new Date(item.time).getTime() / 1000),
            //             open: item.open, high:item.high, low:item.low,close: item.close,
            //         }));

            //         return res.send({ status: true, msg: "SUCCESS", data: transformedData });

            //     }
            // }else   {
            //     return res.send({ status: false, msg: "Symbol Not Match", data: [] });

            // }
          
            return res.send({ status: false, msg: "Empty", data: [] });

        } catch (error) {
            console.log("Error ", error)
        }

    }











    async chartHistory(req, res) {

        try {
            const { user_id } = req.body

            var User_information = await User_model.find({ _id: user_id, TradingStatus: "on" })

            if (User_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            } else {

                if (User_information[0].broker == 2) {
                    // ALICE


                    function formatDateAndMilliseconds(date) {
                        return {
                            formattedDate: date.toISOString().slice(0, 10),
                            millisecondsSinceEpoch: date.getTime()
                        };
                    }

                    function getCurrentDateAndSixMonthsAgo() {
                        const currentDate = new Date();
                        const sixMonthsAgo = new Date(currentDate);
                        sixMonthsAgo.setMonth(currentDate.getMonth() - 1);

                        return {
                            current: formatDateAndMilliseconds(currentDate),
                            sixMonthsAgo: formatDateAndMilliseconds(sixMonthsAgo)
                        };
                    }

                    const { current, sixMonthsAgo } = getCurrentDateAndSixMonthsAgo();


                    if (req.body.symbol == "BankNifty") {
                        const requestData = {
                            token: req.body.token,
                            resolution: req.body.resolution,
                            from: sixMonthsAgo.millisecondsSinceEpoch,
                            to: current.millisecondsSinceEpoch,
                            exchange: req.body.exchange
                        };

                        const config = {
                            method: 'post',
                            url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/chart/history',
                            headers: {
                                'Authorization': `Bearer ${User_information[0].demat_userid} ${User_information[0].access_token}`,
                                'Content-Type': 'application/json'
                            },
                            data: requestData
                        };

                        axios(config)
                            .then(response => {
                                if (response.data.result) {
                                    // console.log(response.data.result);

                                    response.data.result.map(async (data) => {

                                        const filter = { _id: new Date(data.time) };
                                        const update = {
                                            $set: {
                                                _id: new Date(data.time),
                                                date: new Date(data.time),
                                                time: data.time,
                                                volume: data.volume,
                                                low: data.low,
                                                high: data.high,
                                                close: data.close,
                                                open: data.open,
                                                name: "BankNifty"
                                            }
                                        };


                                        // Using updateOne with upsert: true
                                        await live_data_banknifty.updateOne(filter, update, { upsert: true });

                                    })

                                    return res.send({ status: true, msg: response.data.stat, data: response.data.result });
                                } else {
                                    return res.send({ status: false, msg: response.data.stat, data: response.data.result });

                                }

                            })
                            .catch(error => {
                                console.error(error);
                            });

                    } else if (req.body.symbol == "Nifty") {

                        const requestData = {
                            token: req.body.token,
                            resolution: req.body.resolution,
                            from: sixMonthsAgo.millisecondsSinceEpoch,
                            to: current.millisecondsSinceEpoch,
                            exchange: req.body.exchange
                        };

                        const config = {
                            method: 'post',
                            url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/chart/history',
                            headers: {
                                'Authorization': `Bearer ${User_information[0].demat_userid} ${User_information[0].access_token}`,
                                'Content-Type': 'application/json'
                            },
                            data: requestData
                        };

                        axios(config)
                            .then(response => {
                                if (response.data.result) {
                                    // console.log(response.data.result);

                                    response.data.result.forEach(async (data) => {

                                        const filter = { _id: new Date(data.time) };
                                        const update = {
                                            $set: {
                                                _id: new Date(data.time),
                                                date: new Date(data.time),
                                                time: data.time,
                                                volume: data.volume,
                                                low: data.low,
                                                high: data.high,
                                                close: data.close,
                                                open: data.open,
                                                name: "Nifty"
                                            }
                                        };

                                        // Using updateOne with upsert: true
                                        await live_data_nifty.updateOne(filter, update, { upsert: true });

                                    })

                                    return res.send({ status: true, msg: response.data.stat, data: response.data.result });
                                } else {
                                    return res.send({ status: false, msg: response.data.stat, data: response.data.result });

                                }

                            })
                            .catch(error => {
                                console.error(error);
                            });
                    } else {


                    }





                }



            }

        } catch (error) {
            console.log("Error ", error)
        }

    }




}



const update_qty = async (user_id) => {
    var UserId = new ObjectId(user_id);


    const filter = { user_id: UserId };

    // Define an aggregation pipeline with the $lookup stage
    const pipeline = [
        {
            $match: filter, // Match documents that match the filter
        },
        {
            $lookup: {
                from: 'servicegroup_services_ids', // The target collection
                let: { group_id: '$group_id', service_id: '$service_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$Servicegroup_id', '$$group_id'] }, // Match Servicegroup_id
                                    { $eq: ['$Service_id', '$$service_id'] }, // Match Service_id
                                ],
                            },
                        },
                    },
                ],
                as: 'serviceGroup', // The alias for the joined documents
            },
        },
        {
            $unwind: '$serviceGroup', // Unwind the joined array to access individual documents
        },
        {
            $set: {
                quantity: {
                    $cond: {
                        if: { $ne: ['$serviceGroup', null] }, // Check if there's a match
                        then: '$serviceGroup.group_qty', // Replace 'quantity' with 'group_qty'
                        else: '$quantity', // Keep the original 'quantity'
                    },
                },
            },
        },
        {
            $merge: {
                into: 'client_services', // Update the 'client_services' collection
                whenMatched: 'merge', // Specify how to handle matching documents
                whenNotMatched: 'insert', // Specify how to handle non-matching documents
            },
        },
    ];

    // Execute the aggregation pipeline
    await client_services.aggregate(pipeline)


}



module.exports = new Dashboard();