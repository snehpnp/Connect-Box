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

            console.log("GetServiceStrategy", GetServiceStrategy)

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

                        recharge/get


                    // Extracting the key (id) from the inputObject
                    const inputId = Object.keys(result)[0];
                    // Finding the matching object in dataArray based on _id
                    const matchingObject = GetServiceStrategy.find(obj => obj._id === inputId);
                    // Getting the service_name if a match is found
                    const serviceName = matchingObject ? matchingObject.service_name : null;
                    //console.log("serviceName",serviceName);


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
                    // console.log("No match found for Service ID:", key);
                }
            }

            return res.send({ status: true, msg: 'Update Successfully', data: [] });


        } catch (error) {
            console.log("Error ClientServices Update-", error);
            return res.send({ status: false, msg: 'User Not exists', data: error });

        }
    }
    

  

}





module.exports = new Clientservice();