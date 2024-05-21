"use strict";
const bcrypt = require("bcrypt");
const db = require('../../Models');
const User_model = db.user;
const client_services = db.client_service;
const strategy_client = db.strategy_client;
const user_activity_logs = db.user_activity_logs;

var dateTime = require('node-datetime');
var dt = dateTime.create();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class Clientservice {

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

                totalCount: totalCount
            })
        } catch (error) {
            console.log("Error get user trading Status error -", error);
        }
    }


    async updateClientServices(req, res) {
        try {
            const { strategyId, maxQty, orderType, productType, userId, id, seriveId } = req.body;


            const UserData = await User_model.findOne({ _id: userId });


            if (!UserData) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            const clientService = {

                strategy_id: strategyId,
                lot_size: maxQty,
                order_type: orderType,
                product_type: productType
            };


            const filter = { _id: id, user_id: userId, service_id: seriveId };
            const update = {
                $set: clientService
            };
            const update_token = await client_services.updateOne(filter, update);


            // const user_activity = new user_activity_logs(
            //     {
            //         user_id: UserData._id,
            //         message: Service_name[0].name + " Update Strategy ",
            //         Strategy: Strategieclient[0].strategy_name,
            //         role: data.Editor_role,
            //         system_ip: getIPAddress(),
            //         device: data.device
            //     })
            // await user_activity.save()

            if (update_token.acknowledged) {

                return res.send({ status: true, msg: 'Update Successfully', data: [] });
            }



        } catch (error) {
            console.log("Error ClientServices Update-", error);
            return res.send({ status: false, msg: 'User Not exists', data: error });

        }
    }



    // GET AAL USER STRATEGY
    async GetAllStrategy(req, res) {
        const { id } = req.body;

        try {
            if (!id) {
                return res.send({
                    status: false,
                    msg: "id is required",
                    data: []
                });
            }

            const UserData = await User_model.findOne({ _id: new ObjectId(id) }).select("parent_id");
            const UserStgData = await strategy_client.find({ user_id: new ObjectId(id), ActiveStatus: "1" }).select("strategy_id");
            const UserStgIds = UserStgData.map(data => data.strategy_id);
        
            const subadminStrategies = await User_model.aggregate([
                {
                    $match: {
                        Role: "SUBADMIN",
                        _id: new ObjectId(UserData.parent_id)
                    }
                },
                {
                    $lookup: {
                        from: "strategies",
                        localField: "_id",
                        foreignField: "maker_id",
                        as: "strategies"
                    }
                },
                {
                    $unwind: "$strategies"
                },
                {
                    $project: {
                        _id: "$strategies._id",
                        strategy_name: "$strategies.strategy_name",
                        UserName: "$UserName",
                        strategy_description: "$strategies.strategy_description",
                        strategy_category: "$strategies.strategy_category",
                        strategy_segment: "$strategies.strategy_segment",
                        strategy_image: "$strategies.strategy_image",
                        strategy_indicator: "$strategies.strategy_indicator",
                        maker_id: "$strategies.maker_id",
                        createdAt: "$strategies.createdAt",
                        max_trade: "$strategies.max_trade",
                        strategy_percentage: "$strategies.strategy_percentage",
                        month: "$strategies.security_fund_month",
                        quarterly: "$strategies.security_fund_quarterly",
                        half_early: "$strategies.security_fund_half_early",
                        yearly: "$strategies.security_fund_early",

                        stg_status: {
                            $cond: { if: { $in: ["$strategies._id", UserStgIds] }, then: 1, else: 0 }
                        }
                    }
                }
            ]);


            if (!subadminStrategies || subadminStrategies.length === 0) {
                return res.send({ status: false, msg: "No strategies found", data: [] });
            }


            return res.send({ status: true, msg: "Fetched all strategies successfully!", data: subadminStrategies });
        } catch (err) {
            console.log("Error fetching the strategy: ", err);
            return res.send({ status: false, msg: "Error fetching strategies", data: [] });
        }
    }
    

    /// update active status 

    //GET ALL USER 
    async FindAllStrategy(req, res) {
        const { id } = req.body;

        try {
            if (!id) {
                return res.send({
                    status: false,
                    msg: "id is required",
                    data: []
                });
            }

            const UserData = await User_model.findOne({ _id: new ObjectId(id) }).select("parent_id");
            const UserStgData = await strategy_client.find({ user_id: new ObjectId(id), ActiveStatus: "1" }).select("strategy_id");
            const UserStgIds = UserStgData.map(data => data.strategy_id);
        
            const subadminStrategies = await User_model.aggregate([
                {
                    $match: {
                        Role: "SUBADMIN",
                        _id: new ObjectId(UserData.parent_id)
                    }
                },
                {
                    $lookup: {
                        from: "strategies",
                        localField: "_id",
                        foreignField: "maker_id",
                        as: "strategies"
                    }
                },
                {
                    $unwind: "$strategies"
                },
                {
                    $project: {
                        _id: "$strategies._id",
                        strategy_name: "$strategies.strategy_name",
                        UserName: "$UserName",
                        stg_status: {
                            $cond: { if: { $in: ["$strategies._id", UserStgIds] }, then: 1, else: 0 }
                        }
                    }
                }
            ]);


            if (!subadminStrategies || subadminStrategies.length === 0) {
                return res.send({ status: false, msg: "No strategies found", data: [] });
            }


            return res.send({ status: true, msg: "Fetched all strategies successfully!", data: subadminStrategies });
        } catch (err) {
            console.log("Error fetching the strategy: ", err);
            return res.send({ status: false, msg: "Error fetching strategies", data: [] });
        }
    }



    async statusUpadate(req, res) {
        try {
            const { user_id, active_status,service_id } = req.body;
      
            if (active_status !== '0' && active_status !== '1') {
                return res.status(400).send({ status: false, msg: "Invalid active_status value" });
            }
      
            const filter = { user_id: user_id,service_id:service_id }; 
            const updateOperation = { $set: {active_status: active_status, service_id:service_id } }; 
      
            const result = await client_services.updateMany(filter, updateOperation);
      
            if (result.nModified === 0) {
                return res.send({ status: false, msg: "status is Deactivated", data: [] });
            }
      
            return res.send({
                status: true,
                msg: "Status is Activated",
                data: result
            });
        } catch (error) {
            console.error("Internal error:", error);
            return res.status(500).send("Internal server error");
        }
    }
        
}





module.exports = new Clientservice();