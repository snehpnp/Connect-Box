const sha256 = require('sha256');
var axios = require('axios');
var dateTime = require('node-datetime');

"use strict";
const db = require('../../Models');
const User = db.user;
const user_logs = db.user_activity_logs;
const live_price_token = db.live_price_token;
const BrokerResponse = db.BrokerResponse;


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class AliceBlue {

    // Get GetAccessToken ALICE BLUE
    async GetAccessToken(req, res) {
        try {
            const authCode = req.query.authCode;
            var userId = req.query.userId;

            var Get_User = await User.find({ demat_userid: userId }).select('TradingStatus parent_id api_secret Role broker');

            if (Get_User[0].TradingStatus != "on") {

                var apiSecret = ''

                if (Get_User[0].Role == "USER") {
                    var subadmin = await User.find({ _id: Get_User[0].parent_id }).select('TradingStatus parent_id api_secret Role');
             
                    apiSecret = subadmin[0].api_secret
                } else {
                    apiSecret = Get_User[0].api_secret
                }

                var hosts = req.headers.host;

                // var redirect = hosts.split(':')[0];
                // var redirect_uri = '';
                // redirect_uri = `https://${redirect}/#/subadmin/position`


                if (hosts) {

                    var redirect;

                    var redirect_uri = '';
            
                    if (hosts.startsWith('http://') || hosts.startsWith('https://')) {
                        redirect = hosts.split('://')[1].split('/')[0];

                    } else {

                        redirect = hosts.split(':')[0];
                    }
                
                    redirect_uri = `https://${redirect}/#/subadmin/position`;
                   
                }


                if (Get_User.length > 0) {

                    if (redirect == "localhost") {
                        redirect_uri = "http://localhost:3000"

                        if (Get_User[0].Role == "SUBADMIN") {
                            redirect_uri = "http://localhost:3000/#/subadmin/position"

                        } else {
                            redirect_uri = "http://localhost:3000"

                        }
                    } else {
                        if (Get_User[0].Role == "SUBADMIN") {
                            redirect_uri = `https://${redirect}/#/subadmin/position`

                        } else if (Get_User[0].Role == "USER") {
                            redirect_uri = `https://${redirect}/#/user/stock`

                        } else if (Get_User[0].Role == "RESEARCH") {
                            redirect_uri = `https://${redirect}/#/research/position`

                        }  else {
                            redirect_uri = `https://${redirect}/#/`

                        }
                    }

                    var Encrypted_data = sha256(userId + authCode + apiSecret);
                    var data = { "checkSum": Encrypted_data }

                    var config = {
                        method: 'post',
                        url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/sso/getUserDetails',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    axios(config)
                        .then(async function (response) {
                            if (response.data.userSession) {


                                if (Get_User[0].Role === "USER") {
                                    await User.findByIdAndUpdate(Get_User[0]._id, {
                                        access_token: response.data.userSession,
                                        TradingStatus: "on"
                                    });
                                    const user_login = new user_logs({
                                        user_Id: Get_User[0]._id,
                                        trading_status: "Trading On",
                                        role: Get_User[0].Role,
                                        device: "WEB"
                                    });
                                    await user_login.save();

                                    return res.redirect(redirect_uri);

                                } else {

                                    await User.findByIdAndUpdate(Get_User[0]._id, {
                                        access_token: response.data.userSession,
                                        TradingStatus: "on"
                                    });

                                    const user_logs1 = new user_logs({
                                        user_Id: Get_User[0]._id,
                                        trading_status: "Trading On",
                                        role: Get_User[0].Role,
                                        device: "WEB"
                                    });
                                    await user_logs1.save();


                                    const exist_user = await live_price_token.findOne({ demate_user_id: userId }).select('access_token');
                                    if (!exist_user) {
                                        const live_price_token_data = new live_price_token({
                                            user_id: Get_User[0]._id,
                                            broker_id: Get_User[0].broker,
                                            demate_user_id: userId,
                                            demate_user_id_second: userId,
                                            access_token: response.data.userSession,
                                            trading_status: "on",
                                            Role: Get_User[0].Role
                                        });
                                        await live_price_token_data.save();
                                    } else {
                                        await live_price_token.findOneAndUpdate(
                                            { demate_user_id: userId },
                                            { $set: { access_token: response.data.userSession } },
                                            { new: true }
                                        );
                                    }

                                    return res.redirect(redirect_uri);

                                }

                            } else {
                                const user_logs1 = new user_logs({
                                    user_Id: Get_User[0]._id,
                                    trading_status: JSON.stringify(response.data),
                                    role: Get_User[0].Role,
                                    device: "WEB"
                                });
                                await user_logs1.save();
                                return res.redirect(redirect_uri);
                            }
                        })
                        .catch(function (error) {
                            console.error("Error occurred:", error);
                            return res.status(500).send("Internal Server Error");
                        });


                }


            } else {
                return res.redirect(redirect_uri);

            }

        } catch (error) {
            console.log("Error Alice Login error-", error)
        }
    }















    // GET ORDER ID TO ORDER FULL DATA
    async GetOrderFullInformation(req, res) {

        try {
            const { OrderId, user_id } = req.body


            if (!OrderId || !user_id) {
                return res.send({ status: false, msg: 'Please Fill All Feild', data: [] });

            }

            const objectId = new ObjectId(user_id);

            var FindUserAccessToken = await User.find({ _id: objectId })
            var FindUserBrokerResponse = await BrokerResponse.find({ user_id: objectId, order_id: OrderId })


            if (FindUserBrokerResponse[0].order_view_status == "0") {

                let data = JSON.stringify({
                    "nestOrderNumber": OrderId
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/orderHistory',
                    headers: {
                        'Authorization': "Bearer " + FindUserAccessToken[0].demat_userid + " " + FindUserAccessToken[0].access_token,
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
                axios(config)
                    .then(async (response) => {
                        if (response.data[0]) {

                            const message = (JSON.stringify(response.data[0]));

                            let result = await BrokerResponse.findByIdAndUpdate(
                                { _id: FindUserBrokerResponse[0]._id },
                                {
                                    order_view_date: message,
                                    order_view_status: '1',
                                    order_view_response: response.data[0].Status
                                },
                                { new: true }
                            )
                            if (result) {

                                return res.send({ status: true, msg: 'SuccessFully Update', data: [] });
                            }



                        } else {
                        }
                    })
                    .catch(async (error) => {

                        if (error.response.data) {
                            const message = (JSON.stringify(error.response.data));

                            let result = await BrokerResponse.findByIdAndUpdate(
                                { _id: FindUserBrokerResponse[0]._id },
                                {
                                    order_view_date: message,
                                    order_view_status: '1',
                                    order_view_response: "Error"
                                },
                                { new: true }
                            )
                            return res.send({ status: false, msg: 'Error', data: message });

                        } else {
                            const message = (JSON.stringify(error));

                            let result = await BrokerResponse.findByIdAndUpdate(
                                { _id: FindUserBrokerResponse[0]._id },
                                {
                                    order_view_date: message,
                                    order_view_status: '1',
                                    order_view_response: "Error"
                                },
                                { new: true }
                            )
                            return res.send({ status: false, msg: 'Error', data: message });

                        }
                    });
            } else {
                return res.send({ status: false, msg: 'Already Update', data: FindUserBrokerResponse });

            }


        } catch (error) {
            console.log("Error Some Error In Order information get -", error);
            return res.send({ status: false, msg: 'error in Server side', data: error });

        }


    }

    // GET LIVE PRICE TOKEN
    async GetLivePrice(req, res) {
        try {
            const Get_live_price = await live_price.find({ broker_name: "ALICE_BLUE" })
            if (Get_live_price) {
                return res.send({ status: true, data: Get_live_price, msg: "Get Data" })
            }

            return res.send({ status: false, data: [], msg: "Empty" })

        } catch (error) {
            console.log("Error In Get Token Live Price", error);
            return res.send({ status: false, data: error, msg: "Error In get live price data" })

        }
    }


    
    // CANCEL ORDER API  
    async Cancel_order(req, res) {

        try {
            // var OrderId = "23091800155929"
            const { OrderId, user_id } = req.body


            if (!OrderId || !user_id) {
                return res.send({ status: false, msg: 'Please Fill All Feild', data: [] });

            }

            const objectId = new ObjectId(user_id);

            var FindUserAccessToken = await User.find({ _id: objectId })
            var FindUserBrokerResponse = await BrokerResponse.find({ user_id: objectId, order_id: OrderId })


            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api//placeOrder/cancelOrder',
                headers: {
                    'Authorization': "Bearer " + FindUserAccessToken[0].demat_userid + " " + FindUserAccessToken[0].access_token,
                    'Content-Type': 'application/json',
                },
                data: {
                    "exch": "NSE",
                    "nestOrderNumber": OrderId,
                    "trading_symbol": FindUserBrokerResponse[0].trading_symbol
                }
            };

            axios(config)
                .then(async (response) => {
                    if (response.data) {
                        if (response.data.stat == "Ok") {

                            GetAllBrokerResponse(user_id, res)
                            return res.send({ status: true, msg: "Order Cancel Successfully", data: response.data });

                        } else {
                            return res.send({ status: false, msg: "Order Cancel Error", data: [] });
                        }
                    } else {
                        return res.send({ status: false, msg: "Order Cancel Error", data: error });
                    }

                })
                .catch(async (error) => {

                    return res.send({ status: false, msg: "Order Cancel Error", data: error });
                })



        } catch (error) {
            console.log("Error Some Error In Order information get -", error);
            return res.send({ status: false, msg: 'error in Server side', data: error });

        }


    }

    // UPDATE ALL CLIENT BROKER RESPONSE
    async GetOrderFullInformationAll(req, res) {

        try {
            const { user_id } = req.body

            if (!user_id) {
                return res.send({ status: false, msg: 'Please Fill All Feild', data: [] });
            }

            GetAllBrokerResponse(user_id, res)


        } catch (error) {
            console.log("Error Some Error In Order information get -", error);
            return res.send({ status: false, msg: 'error in Server side', data: error });

        }


    }


    async backendRunSocket(req, res) {

        // Alice_Socket();
        return res.send({ status: true, msg: 'backend run socket' });
    }


}

const GetAllBrokerResponse = async (user_id, res) => {
 
    try {
        const objectId = new ObjectId(user_id);
        var FindUserAccessToken = await User.find({ _id: objectId,TradingStatus: "on"})
      
        if (FindUserAccessToken[0].length == 0) {
            return res.send({ status: false, msg: "Trading is Off" })
        }
        
        var FindUserBrokerResponse = await BrokerResponse.find({ user_id: objectId, order_id: { $ne: "" } });


        if (FindUserBrokerResponse.length > 0) {

            FindUserBrokerResponse.forEach((data1) => {

                let data = JSON.stringify({
                    "nestOrderNumber": data1.order_id
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/orderHistory',
                    headers: {
                        'Authorization': "Bearer " + FindUserAccessToken[0].demat_userid + " " + FindUserAccessToken[0].access_token,
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
                axios(config)
                    .then(async (response) => {

                        if (response.data[0]) {

                            const message = (JSON.stringify(response.data[0]));
                 
                            let result = await BrokerResponse.findByIdAndUpdate(
                                { _id: data1._id },
                                {
                                    order_view_date: message,
                                    order_view_status: '1',
                                    order_view_response: response.data[0].Status,
                                    reject_reason: response.data[0].rejectionreason

                                },
                                { new: true }
                            )


                        } else {
                        }
                    })
                    .catch(async (error) => {
                        console.log("error", error.response)
                    });



            })
            res.send({ status: true, msg: "broker response updated successfully" })

        } else {
            res.send({ status: false, msg: "no user found" })
        }

    } catch (error) {
        console.log("Error in broker response in order Id".error);
    }


}


module.exports = new AliceBlue();