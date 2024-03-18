"use strict";
const db = require('../../Models');
const strategy_client_modal = db.strategy_client
const strategy_modal = db.strategy
const strategy_Order_modal = db.strategy_Order
const Plan_Order = db.Plan_Order

const plan_amount_details = db.plan_amount_details
const User = db.user
const count_licenses = db.count_licenses

const company_information = db.company_information

const { formattedDateTime } = require('../../Helper/time.helper')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Razorpay = require('razorpay');


const razorpay = new Razorpay({
    key_id: 'rzp_test_QGXT06GA89GCnR',
    key_secret: '7WrsXBrtl0T1Py7VfiFkOCRP',
});

class StrategyDesc {

    // GET ADMIN SIGNALS
    async GetUserStrategy(req, res) {
        try {

            const { user_id } = req.body;
            var objectId = new ObjectId(user_id);

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
                        'result': 1,
                    },
                },

            ];




            const GetAllClientStrategy = await strategy_client_modal.aggregate(pipeline1);


            // GetAllClientStrategy.forEach(element => {

            //     console.log("element",element.result._id)

            // });

            const strategy_id_array = GetAllClientStrategy.map(function (x) {
                return x.result._id;
            });


            // console.log("strategy_id_array",strategy_id_array)




            if (GetAllClientStrategy.length === 0) {
                return res.json({ status: false, msg: 'No Strategy Found', data: [] });
            }
            return res.status(200).json({ status: true, msg: ' Client All Strategy Response', data: GetAllClientStrategy, strategy_id_array: strategy_id_array });
        } catch (error) {
            return res.status(500).json({ status: false, msg: 'Error fetching Strategy Response.', error: error.message });
        }

    }


    // CREATE STRATEGY ORDER 
    async CreateOder(req, res) {

        console.log(" CREATE ORDER ", req.body)

        const companyInformation = await company_information.aggregate([
            {
             $project :{
             razor_payment_key : 1,
             _id:0
            }
            },
            {
                $limit: 1
            }
          ]);

         console.log("companyInformation ",companyInformation[0].razor_payment_key) 


        const { strategy_name, user_id, strategy_id, type, amount, currency, receipt } = req.body;

        console.log(receipt)
        const options = {
            amount: amount, // in paise
            currency: currency,
            receipt: receipt,
        };

        try {
            const response = await razorpay.orders.create(options);

            var strategy_Order = new strategy_Order_modal({
                strategy_name: strategy_name,
                plan_name: type,
                user_id: user_id,
                strategy_id: strategy_id,
                order_id: response.id,
                User_data: "",
                amount: amount, // in paise
                receipt: receipt,
                razorpay_order_id: "",
                razorpay_payment_id: ""
            })

            var order_data = await strategy_Order.save()
            var data1 = {

               // key: "rzp_test_QGXT06GA89GCnR",
                key: companyInformation[0].razor_payment_key,
                name: 'TRUST ALGO',
            }

            res.send({ status: true, data: order_data, data1: data1, msg: "Msg Done" });

        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).send({ status: false, data: error, msg: "Request not good" });
        }

    }


    // UPDATE ORDER 
    async UpdateOrder(req, res) {

        try {
            console.log("req.body", req.body)


            // STRATEGY ADD
            const User_strategy_client = new strategy_client_modal({
                strategy_id: req.body.strategy_id,
                user_id: req.body.user_id,
            });
            User_strategy_client.save();
            /////////////////



            const filter_client = { _id: req.body.user_id };
            let user = await User.findOne(filter_client);

            // "count_strategy_select" को नंबर में परिवर्तित करें
            let count = parseInt(user.count_strategy_select);

            // इंक्रीमेंट करें
            count += 1;

            // अपडेटेड मान को डेटाबेस में अपडेट करें
            let Res = await User.updateOne(filter_client, { $set: { count_strategy_select: count.toString() } });













            ////////////////////////





            const filter = { _id: req.body.id };
            const update = {
                $set: req.body
            };
            const update_token = await strategy_Order_modal.updateOne(filter, update, { upsert: true });
            res.send({ status: true, data: update_token, msg: "Msg Done" });


        } catch (error) {
            console.error('Error creating order:', error);
            res.send({ status: false, data: error, msg: "Request not good" });
        }
    }


    // GET User Payment Details
    async GetUserPaymentDetails(req, res) {
    
       

       

      
        
        try {

            const pipeline1 = [
                {
                    $match: {
                        order_status: { $ne: null }
                    }
                },

                {
                    $lookup: {
                        from: "users",
                        localField: 'user_id',
                        foreignField: "_id",
                        as: "userDetails",
                    },
                },

                {
                    $unwind: '$userDetails',
                },

                {
                    $project: {
                        // strategy_name: 1,
                        plan_name: 1,
                        user_id: 1,
                        // strategy_id: 1,
                        order_id: 1,
                        amount: 1,
                        receipt: 1,
                        User_data: 1,
                        razorpay_order_id: 1,
                        razorpay_payment_id: 1,
                        razorpay_signature: 1,
                        order_status: 1,
                        createdAt: 1,
                        updatedAt: 1,

                        // Add more fields from strategy_Order_modal if needed
                        'userDetails.UserName': 1, // Include the specific fields you need from 
                        'userDetails.FullName': 1,
                        'userDetails.PhoneNo': 1,
                        'userDetails.Email': 1,
                        // Add more fields from userDetails if needed
                    }
                }

            ];




            const GetAllUserPaymentDetails = await Plan_Order.aggregate(pipeline1);

            if (GetAllUserPaymentDetails.length > 0) {
                return res.status(200).json({ status: true, msg: ' User All Payment Details', data: GetAllUserPaymentDetails });
            } else {
                return res.json({ status: false, msg: 'No User All Payment Details Found', data: [] });
            }


        } catch (error) {
            return res.status(500).json({ status: false, msg: 'Error fetching Strategy Response.', error: error.message });
        }

    }


    // UPDATE  Razorpayment key
    async UpdatePaymentGatewayKeyApi(req, res) {

        console.log("req.body req", req.body)


        if (req.body.payment_key != undefined) {

            // console.log("req.body",req.body.payment_key)
            const filter = {};
            const update = {
                $set: {
                    razor_payment_key: req.body.payment_key
                }
            };
            const updateKey = await company_information.updateOne(filter, update, { upsert: true });
            res.send({ status: true, data: updateKey, msg: "Payment key Update Successfully .." });


        } else {

            const pipeline = [

                {
                    $limit: 1
                },
                {
                    $project: {
                        razor_payment_key: 1,
                        _id: 0
                    }
                }

            ]
            const data = await company_information.aggregate(pipeline)
            res.send({ status: true, payment_key: data[0].razor_payment_key, msg: "Get payment gatwaye key" });

        }


    }

    // UPDATE  UpdatePaymentAmountApi
    async UpdatePaymentAmountApi(req, res) {

        console.log("req.body req", req.body.monthly)

        if (req.body.monthly != undefined) {
            console.log("IFFFFFFFF")
            const update = {
                $set: req.body
            };
            const UpdateStatus = await plan_amount_details.updateOne({}, update, { upsert: true });
            res.send({ status: true, data: UpdateStatus, msg: "Amount Update Successfully .." });
        } else {
            console.log("ELSEEEE")

            const pipeline = [

                {
                    $limit: 1
                },

            ]
            const data = await plan_amount_details.aggregate(pipeline)
            res.send({ status: true, data: data[0], msg: "Get payment amount details" });

        }




    }








    // CREATE PLAN ORDER 
    async CreatePlanOder(req, res) {

        const companyInformation = await company_information.aggregate([
            {
             $project :{
             razor_payment_key : 1,
            
             panel_name : 1,
             _id:0

            }
            },
            {
                $limit: 1
            }
          ]);

       //  console.log("companyInformation ",companyInformation[0].razor_payment_key) 

        const { plan_name, user_id, amount, currency, receipt } = req.body;

        if (!plan_name) {
            return res.send({ status: false, data: [], msg: "Please Enter plan_name" });
        }

        if (!amount) {
            return res.send({ status: false, data: [], msg: "Please Enter amount" });
        }


        if (!receipt) {
            return res.send({ status: false, data: [], msg: "Please Enter receipt" });
        }


        console.log(receipt)
        const options = {
            amount: amount, // in paise
            currency: currency,
            receipt: receipt,
        };

        try {
            const response = await razorpay.orders.create(options);

            var Orders_plan = new Plan_Order({

                plan_name: plan_name,
                user_id: user_id,
                order_id: response.id,
                User_data: "",
                amount: amount, // in paise
                receipt: receipt,
                razorpay_order_id: "",
                razorpay_payment_id: ""
            })

            var order_data = await Orders_plan.save()
            var data1 = {

                // key: "rzp_test_QGXT06GA89GCnR",
                key: companyInformation[0].razor_payment_key,
                name: companyInformation[0].panel_name,
            }

            res.send({ status: true, data: order_data, data1: data1, msg: "Msg Done" });

        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).send({ status: false, data: error, msg: "Request not good" });
        }

    }


    // UPDATE ORDER 
    async UpdatePlanOrder(req, res) {
        var dateTime = require("node-datetime");
        var dt = dateTime.create();

        console.log("req.body.Email", req.body.Email)
        const filter_client = { Email: req.body.Email };
        let user = await User.findOne(filter_client);
        console.log("user", req.body.Broker_value)
        var broker_Id
        try {

            if (req.body.order_status == "Success") {


                var StartDate1
                var EndDate1
                var TotalMonth
                var plan_month


                if (req.body.plan_name == "monthly") {
                    plan_month = 1
                } else if (req.body.plan_name == "quarterly") {
                    plan_month = 3
                } else if (req.body.plan_name == "halfyearly") {
                    plan_month = 6
                } else if (req.body.plan_name == "yearly") {
                    plan_month = 12
                } else {
                    plan_month = 0

                }


                console.log("plan_month", plan_month)







                if (user.license_type != "2") {

                    broker_Id = req.body.Broker_value
                    var currentDate = new Date();
                    var start_date_2days = dateTime.create(currentDate);
                    start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                    var start_date = start_date_2days;
                    StartDate1 = start_date;

                    var UpdateDate = "";
                    var StartDate = new Date(start_date);

                    UpdateDate = StartDate.setMonth(
                        StartDate.getMonth() + parseInt(plan_month)
                    );

                    var end_date_2days = dateTime.create(UpdateDate);
                    var end_date_2days = end_date_2days.format("Y-m-d H:M:S");

                    EndDate1 = end_date_2days;
                    TotalMonth = plan_month;

                } else {
                    if (user.license_type == "2") {
                        var UserEndDate = new Date(user.EndDate);
                        var TodaysDate = new Date();
                        broker_Id = user.broker

                        if (Number(plan_month) > 0) {

                            if (UserEndDate > TodaysDate) {
                                var currentDate = new Date(user.EndDate);

                                var start_date_2days = dateTime.create(currentDate);
                                start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                                var start_date = start_date_2days;

                                StartDate1 = user.StartDate;

                                var UpdateDate = "";
                                var StartDate = new Date(start_date);

                                UpdateDate = StartDate.setMonth(
                                    StartDate.getMonth() + parseInt(plan_month)
                                );

                                var end_date_2days = dateTime.create(UpdateDate);
                                var end_date_2days = end_date_2days.format("Y-m-d H:M:S");

                                EndDate1 = end_date_2days;
                                TotalMonth =
                                    parseInt(plan_month) + parseInt(user.licence);
                            } else {
                                var currentDate = new Date();

                                var start_date_2days = dateTime.create(currentDate);
                                start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                                var start_date = start_date_2days;

                                StartDate1 = start_date;

                                var UpdateDate = "";
                                var StartDate = new Date(start_date);

                                UpdateDate = StartDate.setMonth(
                                    StartDate.getMonth() + parseInt(plan_month)
                                );

                                var end_date_2days = dateTime.create(UpdateDate);
                                var end_date_2days = end_date_2days.format("Y-m-d H:M:S");

                                EndDate1 = end_date_2days;
                                TotalMonth =
                                    parseInt(plan_month) + parseInt(user.licence);
                            }

                        } else {
                            StartDate1 = user.StartDate;
                            EndDate1 = user.EndDate;
                            TotalMonth = req.licence;
                        }



                    }
                }





            }

            console.log({
                _id:user._id,
                StartDate: StartDate1 == null ? user.StartDate : StartDate1,
                EndDate: EndDate1 == null ? user.EndDate : EndDate1,
                licence: TotalMonth,
                license_type: "2",
                broker: broker_Id ? broker_Id : "2"
            })

            let Res = await User.updateOne({ _id: user._id }, {
                $set: {
                    StartDate: StartDate1 == null ? user.StartDate : StartDate1,
                    EndDate: EndDate1 == null ? user.EndDate : EndDate1,
                    licence: TotalMonth,
                    license_type: "2",
                    broker: broker_Id ? broker_Id : "2"
                }
            });
            console.log("Res", Res)

            // if (user.license_type == "2") {
            const count_licenses_add = new count_licenses({
                user_id: user._id,
                license: plan_month,
            });
            count_licenses_add.save();
            // }




            const filter = { _id: req.body.id };
            const update = {
                $set: req.body
            };
            const update_token = await Plan_Order.updateOne(filter, update, { upsert: true });
            res.send({ status: true, data: update_token, msg: "Msg Done" });


        } catch (error) {
            console.error('Error creating order:', error);
            res.send({ status: false, data: error, msg: "Request not good" });
        }
    }


}



module.exports = new StrategyDesc();