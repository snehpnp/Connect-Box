"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const User_model = db.user;
const strategy_Order_modal = db.strategy_Order
const company_information = db.company_information
const strategy_model = db.Strategies;
const researcher_strategy = db.researcher_strategy;




const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const user_logs = db.user_logs;

const Razorpay = require('razorpay');




// Product CLASS
class Ordercreate {

    // CREATE ORDER
    async CreateOder(req, res) {


        const companyInformation = await company_information.aggregate([
            {
                $project: {
                    razor_payment_key: 1,
                    panel_name:1,
                    razor_payment_secretKey:1,
                    _id: 0
                }
            },
            {
                $limit: 1
            }
        ]);
        let razorpay = new Razorpay({
            key_id: companyInformation[0].razor_payment_key,
            key_secret: companyInformation[0].razor_payment_secretKey,
        });


        const { strategy_name, user_id, admin_id, strategy_id, type, amount, currency, receipt } = req.body;

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
                amount: parseInt(amount) / 100, // in paise
                receipt: receipt,
                razorpay_order_id: "",
                razorpay_payment_id: ""
            })

            var order_data = await strategy_Order.save()
            var data1 = {

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
    async UpdateOrder(req, res) {
        try {

            // Find the strategy by ID
            const findStg = await researcher_strategy.findOne({ _id: req.body.strategy_id });


            // Create a new strategy document based on the found strategy
            const strategy_Data = new strategy_model({
                stgname_adminid: findStg.strategy_name + "_" + req.body.user_id,
                strategy_name: findStg.strategy_name,
                strategy_description: findStg.strategy_description,
                strategy_demo_days: findStg.strategy_demo_days,
                strategy_category: findStg.strategy_category,
                strategy_segment: findStg.strategy_segment,
                strategy_indicator: findStg.strategy_indicator,
                strategy_tester: findStg.strategy_tester,
                strategy_image: findStg.strategy_image,
                maker_id: req.body.user_id,
                max_trade: findStg.max_trade || null,
                strategy_percentage: findStg.strategy_percentage || null,
                researcher_id: findStg.maker_id
            });


            // Save the new strategy document
            await strategy_Data.save();

            // Update researcher_strategy collection to add collaboration_id
            const filter1 = { _id: findStg._id };
            const update1 = {
                $push: { collaboration_id: req.body.user_id }
            };
            const update_token1 = await researcher_strategy.updateOne(filter1, update1);


            // Update strategy_Order_modal collection
            const filter = { _id: req.body.id };
            const update = { $set: req.body };
            const update_token = await strategy_Order_modal.updateOne(filter, update, { upsert: true });


            res.send({ status: true, data: update_token, msg: "Update successful" });
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).send({ status: false, data: error, msg: "Update failed" });
        }
    }



    // GET ORDER DATA
    async GetResearcheOrder(req, res) {
        try {

            const { id } = req.body;

            const GetResearcherData = await strategy_Order_modal.aggregate([
                {
                    $match: { admin_id: new ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "admin_id",
                        foreignField: "_id",
                        as: "userData"
                    }
                },
                {
                    $unwind: "$userData"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "userData1"
                    }
                },
                {
                    $unwind: "$userData1"
                },

                {
                    $project: {
                        _id: 0,
                        Admin_name: "$userData.UserName",
                        User_name: "$userData1.UserName",
                        plan_name: 1,
                        strategy_name: 1,
                        order_id: 1,
                        amount: 1,
                        receipt: 1,
                        razorpay_order_id: 1,
                        razorpay_payment_id: 1,
                        razorpay_signature: 1,
                        order_status: 1,
                        createdAt: 1,
                        updatedAt: 1

                    }
                }
            ]);



            if (!GetResearcherData) {
                return res.send({ status: false, data: [], msg: "Empty Data" });

            }

            return res.send({ status: true, data: GetResearcherData, msg: "Reacher Data" });
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).send({ status: false, data: error, msg: "Update failed" });
        }
    }












}

module.exports = new Ordercreate();
