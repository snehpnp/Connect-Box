"use strict";
const db = require('../../../Models');
const strategy_model = db.Strategies;
const User = db.user;
const strategy_client_model = db.strategy_client
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

class strategy {

    // ADD STRATEGY IN A COLLECTION
    async AddStragegy(req, res) {
        try {
            const { strategy_name, strategy_description, strategy_category, strategy_segment, strategy_indicator, strategy_tester, strategy_amount, strategy_image, strategy_amount_month, strategy_amount_quarterly, strategy_amount_half_early, strategy_amount_early, maker_id } = req.body;


            if (!maker_id || maker_id == "" || maker_id == null) {
                return res.send({ status: false, msg: 'Please Enter Maker Id', data: [] });
            }


            const maker_id_find = await User.findOne({ _id: maker_id });
            if (!maker_id_find) {
                return res.send({ status: false, msg: 'Maker Id Is Wrong', data: [] });
            }



            const exist_strategy = await strategy_model.findOne({ strategy_name: strategy_name });
            if (exist_strategy) {
                return res.send({ status: false, msg: 'Strategy already exists', data: [] });
            }

            function checkStringValidity(strategy_name) {
                // Check if the length of the string is at least 5 characters (to have 4th index)
                if (strategy_name.length < 5) {
                    return res.send({ status: false, msg: 'Please Enter Strategy name long', data: [] });
                }

                // Check if the first three letters are capitalized
                if (strategy_name.substring(0, 3) !== strategy_name.substring(0, 3).toUpperCase()) {
                    return res.send({ status: false, msg: 'Please Enter Strategy starting 3 letter Capital', data: [] });

                }

                // Check if there is an underscore (_) at the fourth index
                if (strategy_name.charAt(3) !== '_') {
                    return res.send({ status: false, msg: 'Please Enter Strategy name _ is mandatory', data: [] });
                }
                if (maker_id_find.prifix_key != strategy_name.substring(0, 3).toUpperCase()) {
                    return res.send({ status: false, msg: 'Please Enter Strategy starting 3 leter is your prifix letter', data: [] });

                }
                return true;
            }

            if (!checkStringValidity(strategy_name)) {
                return res.send({ status: false, msg: 'Some Issue in strategy', data: [] });
            }


            var strategy_Data = new strategy_model({
                strategy_name: strategy_name,
                strategy_description: strategy_description,
                strategy_category: strategy_category,
                strategy_segment: strategy_segment,
                strategy_indicator: strategy_indicator,
                strategy_tester: strategy_tester,
                strategy_amount: strategy_amount,
                strategy_image: strategy_image,
                strategy_amount_month: strategy_amount_month,
                strategy_amount_quarterly: strategy_amount_quarterly,
                strategy_amount_half_early: strategy_amount_half_early,
                strategy_amount_early: strategy_amount_early,
                maker_id: maker_id_find._id

            })

            strategy_Data.save()
                .then(async (data) => {
                    return res.status(200).json({ status: true, msg: 'Strategy Add successfully!', data: strategy_Data._id });

                })
                .catch((err) => {
                    console.log(" Error Add Time Error-", err);
                    if (err.keyValue) {
                        return res.send({ status: false, msg: 'Key duplicate', data: err.keyValue });

                    }
                })


        } catch (error) {
            console.log("Error Strategy add error -", error.keyValue);
        }
    }

    // EDIT STRATEGY IN A COLLECTION
    async EditStragegy(req, res) {
        try {
            const { _id, strategy_name, strategy_description, strategy_category, strategy_segment, strategy_indicator, strategy_tester, strategy_amount, strategy_image, strategy_amount_month, strategy_amount_quarterly, strategy_amount_half_early, strategy_amount_early ,maker_id} = req.body;

            const strategy_check = await strategy_model.findOne({ _id: _id });
            if (!strategy_check) {
                return res.send({ status: false, msg: 'Strategy Not exist', data: [] });
            }



            if (!maker_id || maker_id == "" || maker_id == null) {
                return res.send({ status: false, msg: 'Please Enter Maker Id', data: [] });
            }


            const maker_id_find = await User.findOne({ _id: maker_id });
            if (!maker_id_find) {
                return res.send({ status: false, msg: 'Maker Id Is Wrong', data: [] });
            }




            function checkStringValidity(strategy_name) {
                // Check if the length of the string is at least 5 characters (to have 4th index)
                if (strategy_name.length < 5) {
                    return res.send({ status: false, msg: 'Please Enter Strategy name long', data: [] });
                }

                // Check if the first three letters are capitalized
                if (strategy_name.substring(0, 3) !== strategy_name.substring(0, 3).toUpperCase()) {
                    return res.send({ status: false, msg: 'Please Enter Strategy starting 3 letter Capital', data: [] });

                }

                // Check if there is an underscore (_) at the fourth index
                if (strategy_name.charAt(3) !== '_') {
                    return res.send({ status: false, msg: 'Please Enter Strategy name _ is mandatory', data: [] });
                }
                if (maker_id_find.prifix_key != strategy_name.substring(0, 3).toUpperCase()) {
                    return res.send({ status: false, msg: 'Please Enter Strategy starting 3 leter is your prifix letter', data: [] });

                }
                return true;
            }

            if (!checkStringValidity(strategy_name)) {
                return res.send({ status: false, msg: 'Some Issue in strategy', data: [] });
            }




            try {
                // CHECK IF SAME STRATEGY AONOTHER STRATEG NAME TO SIMLER MATCH
                const strateg_data = await strategy_model.find({
                    $and: [
                        { strategy_name: strategy_name },
                        { _id: { $ne: _id } }
                    ]
                })


                if (strateg_data.length > 0) {
                    return res.send({ status: false, msg: 'Strategy Name Already Exist', data: [] });
                }

            } catch (error) {
                console.log("Error error", error);
            }



            const filter = { _id: _id };
            const update_strategy = {
                $set: {
                    "strategy_name": strategy_name,
                    "strategy_description": strategy_description,
                    "strategy_category": strategy_category,
                    "strategy_segment": strategy_segment,
                    "strategy_indicator": strategy_indicator,
                    "strategy_tester": strategy_tester,
                    "strategy_amount": strategy_amount,
                    "strategy_image": strategy_image,
                    "strategy_amount_month": strategy_amount_month,
                    "strategy_amount_quarterly": strategy_amount_quarterly,
                    "strategy_amount_half_early": strategy_amount_half_early,
                    "strategy_amount_early": strategy_amount_early,
                    maker_id: maker_id_find._id



                }
            };

            // UPDATE STRATEGY INFORMATION
            const result = await strategy_model.updateOne(filter, update_strategy);

            if (!result) {
                return res.send({ status: false, msg: 'Strategy not Edit', data: [] });
            }

            return res.status(200).json({ status: true, msg: 'Strategy Edit successfully!', data: result });


        } catch (error) {
            console.log("Error Strategy Edit error -", error);
        }
    }

    // GET ONE STRATEGY IN A COLLECTION
    async GetOneStragegy(req, res) {
        try {
            const { _id } = req.body;

            const exist_strategy = await strategy_model.findOne({ _id: _id });
            if (!exist_strategy) {
                return res.send({ status: false, msg: 'Strategy Not exists', data: [] });
            }

            return res.status(200).json({ status: true, msg: 'Strategy Get successfully!', data: exist_strategy });


        } catch (error) {
            console.log("Error Strategy Get One error -", error.keyValue);
        }
    }

    // GET ALL STRATEGYS
    async GetAllStrategy(req, res) {
        try {

            const { page, limit } = req.body;
            const skip = (page - 1) * limit;

            // var getAllTheme = await strategy_model.find()
            const getAllstrategy = await strategy_model.find({}).sort({ createdAt: -1 })

            // IF DATA NOT EXIST
            if (getAllstrategy.length == 0) {
                res.send({ status: false, msg: "Empty data", data: getAllstrategy })
                return
            }

            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Startegy",
                data: getAllstrategy,

            })


        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
        }
    }

    // GET ALL STRATEGYS FOR CLIENT
    async GetAllStrategyForClient(req, res) {
        try {


            const totalCount = await strategy_model.countDocuments();


            // THEME LIST DATA
            // var getAllTheme = await strategy_model.find()
            const getAllstrategy = await strategy_model
                .find({}, '_id strategy_name')



            // IF DATA NOT EXIST
            if (getAllstrategy.length == 0) {
                res.send({ status: false, msg: "Empty data", data: getAllstrategy })
            }

            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Startegy",
                data: getAllstrategy,
            })


        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
        }
    }

    // DELETE STRATEGY IN A COLLECTION
    async DeleteStragegy(req, res) {
        try {
            const { _id } = req.body;

            // CHECK IF STRATEGY EXISTS
            const strategy_check = await strategy_model.findOne({ _id: _id });
            if (!strategy_check) {
                return res.send({ status: false, msg: 'Strategy does not exist', data: [] });
            }

            // CHECK IF STRATEGY EXISTS IN STRATEGY CLIENT
            const strategy_client_check = await strategy_client_model.findOne({ strategy_id: _id });
            if (strategy_client_check) {
                return res.send({ status: false, msg: 'It cannot be deleted because it is assigned to a client.', data: [] });
            }

            // Delete the strategy
            const deleteResult = await strategy_model.deleteOne({ _id: _id });
            if (deleteResult.deletedCount === 1) {
                return res.status(200).send({ status: true, msg: 'Strategy deleted successfully!', data: [] });
            } else {
                return res.status(500).send({ status: false, msg: 'Error deleting strategy', data: [] });
            }

        } catch (error) {
            console.log("Error Delete Strategy Error:", error);
            return res.status(500).send({ status: false, msg: 'An error occurred', data: [] });
        }
    }

    // GET ALL STRATEGYS FOR CLIENT
    async ClientsAccordingToStrategy(req, res) {

        try {


            const { _id } = req.body;
            // GET LOGIN CLIENTS
            const objectId = new ObjectId(_id);
            const pipeline = [
                {
                    $match: {
                        strategy_id: objectId
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "users",
                    },
                },
                {
                    $unwind: '$users',
                },

                {
                    $project: {
                        'users.FullName': 1,
                        'users.UserName': 1,
                        'users.license_type': 1,

                    },
                },
            ];

            const GetAllClientServices = await strategy_client_model.aggregate(pipeline)


            // // IF DATA NOT EXIST
            if (GetAllClientServices.length == 0) {
                return res.send({ status: false, msg: "Empty data", data: [] })
            }

            return res.send({
                status: true,
                msg: "Get All Startegy",
                data: GetAllClientServices,
            })


        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
        }
    }

    // Get Add Remove Strategy
    async GetAddRemoveStrategy(req, res) {
        //console.log("req",req.body)
        try {
            const { _id } = req.body;
            // GET LOGIN CLIENTS
            const objectId = new ObjectId(_id);

            const pipeline2 = [
                {
                    $lookup: {
                        from: "strategy_clients", // Replace "collection2" with the name of the second collection
                        localField: "_id", // Field in the first collection
                        foreignField: "user_id", // Field in the second collection
                        as: "matched_docs"
                    }
                },
                {
                    $unwind: "$matched_docs"
                },
                {
                    $group: {
                        _id: "$_id",
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 1, // include or exclude fields as needed
                        count: 1,
                        // Add other fields you want to include
                    }
                }
            ];

            const duplicateids = await User.aggregate(pipeline2)




            const pipeline = [
                {
                    $match: {
                        strategy_id: objectId
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "users",
                    },
                },
                {
                    $unwind: '$users',
                },


                {
                    $project: {
                        strategy_id: 1,
                        'users._id': 1,
                        'users.FullName': 1,
                        'users.UserName': 1,
                        'users.license_type': 1,
                        'users.Email': 1,




                    },
                },
            ];

            const GetAllClientStrategy = await strategy_client_model.aggregate(pipeline)


            const pipeline1 = [
                {
                    $project: {

                        _id: 1,
                        FullName: 1,
                        UserName: 1,
                        license_type: 1,
                        Email: 1

                    },
                },

            ];

            const AllClients = await User.aggregate(pipeline1)

            if (AllClients.length > 0) {
                return res.send({ status: true, msg: "Get All data", StrategyClient: GetAllClientStrategy, AllClients: AllClients, duplicateids: duplicateids })
            } else {

                return res.send({ status: false, msg: "Get All data", data: [] })
            }


        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
        }
    }


    // Update Add Remove Strategy
    async UpdateAddRemoveStrategy(req, res) {
        //  console.log("req",req.body)

        try {



            if (req.body.clientId.length > 0) {

                req.body.clientId.forEach(async (element) => {
                    console.log("element add", element);

                    //  ADD  STRATEGY CLIENT
                    const strategy_client = new strategy_client_model({
                        strategy_id: req.body.strategyId,
                        user_id: element,
                    });
                    strategy_client.save();

                });

            }

            if (req.body.clientIdDelete.length > 0) {

                req.body.clientIdDelete.forEach(async (element) => {


                    const deleteResult = await strategy_client_model.deleteOne({ strategy_id: req.body.strategyId, user_id: element });
                    // console.log("element delete",element);  

                });
            }


            return res.send({ status: true, msg: "Startegy Update Successfully...." })


        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
            return res.send({ status: false, msg: "Catch Error" })
        }
    }


}


module.exports = new strategy();