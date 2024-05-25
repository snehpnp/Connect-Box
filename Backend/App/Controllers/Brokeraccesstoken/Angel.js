const sha256 = require('sha256');
var axios = require('axios');
var dateTime = require('node-datetime');

"use strict";
const db = require('../../Models');
const panel_model = db.panel_model;
const User = db.user;
const user_logs = db.user_activity_logs;
const BrokerResponse = db.BrokerResponse;
const Broker_information = db.Broker_information;
const live_price = db.live_price;


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class Angel {

    // Get GetAccessToken ANGEL
    async GetAccessTokenAngel(req, res) {

        try {
            const { id } = req.body
            var userData = await User.findOne({ _id: new ObjectId(id) }).select('TradingStatus client_code app_id api_key')

            if (!userData) {
                return res.send({ status: false, data: [], msg: "User Not Exist" })
            }

            if (userData.TradingStatus == "on") {
                return res.send({ status: false, data: [], msg: "Already Trading is On" })
            }
            if (userData.client_code == "") {
                return res.send({ status: false, data: [], msg: "client Code Is Empty" })
            }
            if (userData.app_id == "") {
                return res.send({ status: false, data: [], msg: "Mpin Is Empty" })
            }
            if (userData.api_key == "") {
                return res.send({ status: false, data: [], msg: "ApI Key Is Empty" })
            }

            return res.send({ status: true, data: [], msg: "GET" })
        } catch (error) {
            console.log("Error Theme error-", error);
        }
    }

    async UpdateTotp(req, res) {
        try {
            const { id, totp, system_ip } = req.body;
     
            const userData = await User.findOne({ _id: new ObjectId(id) }).select('TradingStatus client_code app_id api_key');

            if (!userData) {
                return res.send({ status: false, data: [], msg: "User Not Exist" });
            }

            if (userData.TradingStatus === "on") {
                return res.send({ status: false, data: [], msg: "Already Trading is On" });
            }
            if (!userData.client_code) {
                return res.send({ status: false, data: [], msg: "client Code Is Empty" });
            }
            if (!userData.app_id) {
                return res.send({ status: false, data: [], msg: "Mpin Is Empty" });
            }
            if (!userData.api_key) {
                return res.send({ status: false, data: [], msg: "ApI Key Is Empty" });
            }
            if (!totp) {
                return res.send({ status: false, data: [], msg: "Totp Is Empty" });
            }

            const data = { clientcode: userData.client_code, password: userData.app_id, totp };

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserType': 'USER',
                    'X-SourceID': 'WEB',
                    'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                    'X-MACAddress': 'MAC_ADDRESS',
                    'X-PrivateKey': userData.api_key
                },
                data: JSON.stringify(data)
            };

            const response = await axios.request(config);

            if (response.data.status) {
                const refreshToken = response.data.data.refreshToken;
                const jwtToken = response.data.data.jwtToken;

                const data = { refreshToken };

                const config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/jwt/v1/generateTokens',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-UserType': 'USER',
                        'X-SourceID': 'WEB',
                        'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                        'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                        'X-MACAddress': 'MAC_ADDRESS',
                        'X-PrivateKey': userData.api_key,
                        'Authorization': 'Bearer ' + jwtToken
                    },
                    data: JSON.stringify(data)
                };

                const response1 = await axios.request(config);

                if (response1.data.status) {
                    const result = await User.findByIdAndUpdate(
                        { _id: new ObjectId(id) },
                        {
                            access_token: response1.data.data.jwtToken,
                            TradingStatus: "on"
                        },
                        { new: true }
                    );

                    const user_logs1 = new user_logs({
                        user_Id: userData._id,
                        trading_status: "Trading On",
                        role: "USER",
                        device: "WEB",
                        system_ip: system_ip
                    });
                    await user_logs1.save();

                    return res.send({ status: true, data: [], msg: "Trading On Successfully" });
                } else {
                    const user_logs1 = new user_logs({
                        user_Id: userData._id,
                        trading_status: response.data.message,
                        role: "USER",
                        device: "WEB",
                        system_ip: system_ip
                    });
                    await user_logs1.save();

                    return res.send({ status: true, data: [], msg: response.data.message });
                }
            } else {
                const user_logs_data = new user_logs({
                    user_Id: userData._id,
                    trading_status: response.data.message,
                    role: "USER",
                    device: "WEB",
                    system_ip: system_ip
                });
                await user_logs_data.save();
                return res.send({ status: false, data: response.data.message, msg: "Error in Totp" });
            }
        } catch (error) {
            console.log("Error Totp Catch-", error);
            return res.send({ status: false, data: error, msg: "Error Catch" });
        }
    }



    // UPDATE ALL CLIENT BROKER RESPONSE
      async GetOrderFullInformationAngel(req, res , user_info) {

        try {
            const { user_id } = req.body

            if (!user_id) {
                return res.send({ status: false, msg: 'Please Fill All Feild', data: [] });
            }

            GetAllBrokerResponse(user_info,res)


        } catch (error) {
            console.log("Error Some Error In Order information get -", error);
            return res.send({ status: false, msg: 'error in Server side', data: error });

        }


    }

}

const GetAllBrokerResponse = async (user_info,res) => {
    try {
        const objectId = new ObjectId(user_info[0]._id);
       // var FindUserAccessToken = await User.find({ _id: objectId }).limit(1);
        var FindUserBrokerResponse = await BrokerResponse.find({ user_id: objectId , order_view_status : "0" })

        if (FindUserBrokerResponse.length > 0) {

            FindUserBrokerResponse.forEach((data1) => {    
                var config = {
                    method: 'get',
                    url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/getOrderBook',
                    headers: {
                        'Authorization': 'Bearer ' + user_info[0].access_token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-UserType': 'USER',
                        'X-SourceID': 'WEB',
                        'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                        'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                        'X-MACAddress': 'MAC_ADDRESS',
                        'X-PrivateKey': user_info[0].api_key
                    },
                };
                axios(config)
                    .then(async (response) => {

                        if(response.data.data.length > 0){

                            const result_order = response.data.data.find(item2 => item2.orderid === data1.order_id);
                            if(result_order != undefined){

                                    var reject_reason;
                                    if (result_order.text) {
                                        reject_reason = result_order.text;
                                    } else {
                                        reject_reason = '';
                                    }

                                const message = (JSON.stringify(result_order));

                                let result = await BrokerResponse.findByIdAndUpdate(
                                    { _id: data1._id },
                                    {
                                        order_view_date: message,
                                        order_view_status: '1',
                                        order_view_response: result_order.status,
                                        reject_reason: reject_reason

                                    },
                                    { new: true }
                                )

                              }else{


                                 const message = (JSON.stringify(result_order));

                                let result = await BrokerResponse.findByIdAndUpdate(
                                    { _id: data1._id },
                                    {
                                        order_view_date: message,
                                        order_view_status: '1',

                                    },
                                    { new: true }
                                )

                              }


                        }else{
                        }


                    })
                    .catch(async (error) => {

                    });



            })
           res.send({status:true,msg:"broker response updated successfully"})

        } else {
            res.send({status:false,msg:"no user found"})
         }

    } catch (error) {
        console.log("Error in broker response in order Id".error);
    }


}

module.exports = new Angel();



