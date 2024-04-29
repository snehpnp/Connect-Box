"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const User_model = db.user;
const strategy_Order_modal = db.strategy_Order
const company_information = db.company_information


const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const user_logs = db.user_logs;

const Razorpay = require('razorpay');


const razorpay = new Razorpay({
    key_id: 'rzp_test_QGXT06GA89GCnR',
    key_secret: '7WrsXBrtl0T1Py7VfiFkOCRP',
});

// Product CLASS
class Ordercreate {


    async CreateOder(req, res) {

        console.log(" CREATE ORDER ", req.body)

        const companyInformation = await company_information.aggregate([
            {
                $project: {
                    razor_payment_key: 1,
                    _id: 0
                }
            },
            {
                $limit: 1
            }
        ]);

        console.log("companyInformation ", companyInformation[0].razor_payment_key)


        const { strategy_name, user_id, admin_id, strategy_id, type, amount, currency, receipt } = req.body;

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
                admin_id: admin_id,
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



    async UpdateOrder(req, res) {

        try {
            console.log("req.body", req.body)


            // const User_strategy_client = new strategy_client_modal({
            //     strategy_id: req.body.strategy_id,
            //     user_id: req.body.user_id,
            // });
            // User_strategy_client.save();
     

            // let Res = await User.updateOne(filter_client, { $set: { count_strategy_select: count.toString() } });



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















}

module.exports = new Ordercreate();
