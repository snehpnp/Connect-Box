"use strict";
const bcrypt = require("bcrypt");
const db = require('../../Models');


const BrokerResponse = db.BrokerResponse;
const User = db.user;
var axios = require('axios');

var dateTime = require('node-datetime');


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class BrokerResponses {

    async BrokerResponse(req, res) {
        const { id } = req.body;

        try {

            if (!id) {
                return res.send({ status: false, msg: "User Id not found", data: [] })
            }
            const findResponse = await BrokerResponse.find({ user_id: id }).sort({ createdAt: -1 })



            GetAllBrokerResponse1(id, res)

            if (!findResponse) {
                return res.send({ status: false, msg: "Empty Broker Response ", data: [] })
            }

            return res.send({ status: true, msg: "all broker response fatched successfully", data: findResponse })

        }
        catch (err) {
            return res.send({ status: false, msg: "server side error", data: [] })
        }

    }

}





const GetAllBrokerResponse1 = async (user_id, res) => {
    try {
        const objectId = new ObjectId(user_id);
        const FindUserAccessToken = await User.findOne({ _id: objectId, TradingStatus: "on" });

        const FindUserBrokerResponse = await BrokerResponse.find({ user_id: objectId, order_id: { $ne: "" } });


        if (FindUserAccessToken.broker == 2) {
            if (FindUserBrokerResponse.length > 0) {
                for (const data1 of FindUserBrokerResponse) {
                    try {
                        const data = JSON.stringify({
                            "nestOrderNumber": data1.order_id
                        });

                        const config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/orderHistory',
                            headers: {
                                'Authorization': "Bearer " + FindUserAccessToken.demat_userid + " " + FindUserAccessToken.access_token,
                                'Content-Type': 'application/json',
                            },
                            data: data
                        };

                        const response = await axios(config);

                        if (response.data[0]) {
                            const message = JSON.stringify(response.data[0]);
                            const result = await BrokerResponse.findByIdAndUpdate(
                                { _id: data1._id },
                                {
                                    order_view_date: message,
                                    order_view_status: '1',
                                    order_view_response: response.data[0].Status,
                                    reject_reason: response.data[0].rejectionreason
                                },
                                { new: true }
                            );
                        }
                    } catch (error) {
                        // console.log("Error processing broker response:", error);
                    }
                }
            } 
        } else if (FindUserAccessToken.broker == 12) {

            if (FindUserBrokerResponse.length > 0) {

                FindUserBrokerResponse.forEach((data1) => {
                    var config = {
                        method: 'get',
                        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/getOrderBook',
                        headers: {
                            'Authorization': 'Bearer ' + FindUserAccessToken.access_token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-UserType': 'USER',
                            'X-SourceID': 'WEB',
                            'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                            'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                            'X-MACAddress': 'MAC_ADDRESS',
                            'X-PrivateKey': FindUserAccessToken.api_key
                        },
                    };
                    axios(config)
                        .then(async (response) => {

                            if (response.data.data.length > 0) {

                                const result_order = response.data.data.find(item2 => item2.orderid === data1.order_id);
                                if (result_order != undefined) {

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

                                } else {


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


                            } else {
                            }


                        })
                        .catch(async (error) => {

                        });



                })
                res.send({ status: true, msg: "broker response updated successfully" })

            } 
        }


    } catch (error) {
    }
};






module.exports = new BrokerResponses();