"use strict";
const db = require("../../../Models");
const strategy_model = db.Strategies;
const researcher_strategy = db.researcher_strategy;

const User = db.user;
const strategy_client_model = db.strategy_client;
const tradeCharge_Modal = db.tradeCharge;
const Activity_logs = db.Activity_logs;

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

class strategy {
  // ADD STRATEGY IN A COLLECTION
  async AddStragegy(req, res) {
    try {
      const {
        strategy_name,
        strategy_description,
        strategy_demo_days,
        strategy_category,
        strategy_segment,
        strategy_indicator,
        strategy_tester,
        strategy_amount,
        strategy_image,
        security_fund_month,
        security_fund_quarterly,
        security_fund_half_early,
        security_fund_early,
        fixed_amount_per_trade_early,
        fixed_amount_per_trade_month,
        fixed_amount_per_trade_quarterly,
        fixed_amount_per_trade_half_early,
        maker_id,
        Service_Type,
        max_trade,
        strategy_percentage,
        Role,
      } = req.body;

      if (!maker_id || maker_id == "" || maker_id == null) {
        return res.send({
          status: false,
          msg: "Please Enter Maker Id",
          data: [],
        });
      }


      const maker_id_find = await User.findOne({
        _id: maker_id,
        Role: Role
      });
      if (!maker_id_find) {
        return res.send({ status: false, msg: "Maker Id Is Wrong", data: [] });
      }

      const exist_strategy = await strategy_model.findOne({
        strategy_name: strategy_name,
      });
      if (exist_strategy) {
        return res.send({
          status: false,
          msg: "Strategy already exists",
          data: [],
        });
      }

      // Check if the length of the string is at least 5 characters (to have 4th index)
      if (strategy_name.length < 5) {
        return res.send({
          status: false,
          msg: "Please Enter Strategy name long",
          data: [],
        });
      }

      // Check if the first three letters are capitalized
      if (
        strategy_name.substring(0, 3) !==
        strategy_name.substring(0, 3).toUpperCase()
      ) {
        return res.send({
          status: false,
          msg: "Please Enter Strategy starting 3 letter Capital",
          data: [],
        });
      }

      // Check if there is an underscore (_) at the fourth index
      if (strategy_name.charAt(3) != "_") {
        return res.send({
          status: false,
          msg: "Please Enter Strategy name _ is mandatory",
          data: [],
        });
      }
      if (
        maker_id_find.prifix_key != strategy_name.substring(0, 3).toUpperCase()
      ) {
        return res.send({
          status: false,
          msg: "Please Enter Strategy starting 3 leter is your Prefix Key letter",
          data: [],
        });
      }

      // if (!checkStringValidity(strategy_name)) {
      //     return res.send({ status: false, msg: 'Some Issue in strategy', data: [] });
      // }

      var strategy_Data = new strategy_model({
        stgname_adminid: strategy_name + "_" + maker_id_find._id,
        strategy_name: strategy_name,
        strategy_description: strategy_description,
        strategy_demo_days: strategy_demo_days,
        strategy_category: strategy_category,
        strategy_segment: strategy_segment,
        strategy_indicator: strategy_indicator,
        strategy_tester: strategy_tester,
        strategy_amount: strategy_amount,
        strategy_image: strategy_image,
        security_fund_month: security_fund_month,
        security_fund_quarterly: security_fund_quarterly,
        security_fund_half_early: security_fund_half_early,
        security_fund_early: security_fund_early,
        fixed_amount_per_trade_month: fixed_amount_per_trade_month,
        fixed_amount_per_trade_quarterly: fixed_amount_per_trade_quarterly,
        fixed_amount_per_trade_half_early: fixed_amount_per_trade_half_early,
        fixed_amount_per_trade_early: fixed_amount_per_trade_early,
        maker_id: maker_id_find._id,
        Service_Type: Service_Type,
        max_trade: max_trade || null,
        strategy_percentage: strategy_percentage || null
      });

      strategy_Data
        .save()
        .then(async (data) => {
          return res
            .status(200)
            .json({
              status: true,
              msg: "Strategy Add successfully!",
              data: strategy_Data._id,
            });
        })
        .catch((err) => {
          console.log("Error Add Time Error-", err);
          if (err.keyValue) {
            return res.send({
              status: false,
              msg: "Key duplicate",
              data: err.keyValue,
            });
          }
        });
    } catch (error) {
      console.log("Error Strategy add error -", error.keyValue);
    }
  }

  // EDIT STRATEGY IN A COLLECTION
  async EditStragegy(req, res) {
    try {
      const {
        _id,
        strategy_name,
        strategy_description,
        strategy_demo_days,
        strategy_category,
        strategy_segment,
        strategy_indicator,
        strategy_tester,
        strategy_amount,
        strategy_image,
        security_fund_month,
        security_fund_quarterly,
        security_fund_half_early,
        security_fund_early,
        fixed_amount_per_trade_early,
        fixed_amount_per_trade_month,
        fixed_amount_per_trade_quarterly,
        fixed_amount_per_trade_half_early,
        maker_id,
        Service_Type,
        max_trade,
        strategy_percentage,
        Role,
      } = req.body;




      if (!_id || _id == "" || _id == null) {
        return res.send({ status: false, msg: "Please Enter Id", data: [] });
      }

      const strategy_check = await strategy_model.findOne({ _id: _id });
      if (!strategy_check) {
        return res.send({ status: false, msg: "Strategy Not exist", data: [] });
      }

      if (!maker_id || maker_id == "" || maker_id == null) {
        return res.send({
          status: false,
          msg: "Please Enter Maker Id",
          data: [],
        });
      }

      const maker_id_find = await User.findOne({
        _id: maker_id,
        Role: Role,
      });
      if (!maker_id_find) {
        return res.send({ status: false, msg: "Maker Id Is Wrong", data: [] });
      }

      function checkStringValidity(strategy_name) {
        // Check if the length of the string is at least 5 characters (to have 4th index)
        if (strategy_name.length < 5) {
          return res.send({
            status: false,
            msg: "Please Enter Strategy name long",
            data: [],
          });
        }

        // Check if the first three letters are capitalized
        if (
          strategy_name.substring(0, 3) !==
          strategy_name.substring(0, 3).toUpperCase()
        ) {
          return res.send({
            status: false,
            msg: "Please Enter Strategy starting 3 letter Capital",
            data: [],
          });
        }

        // Check if there is an underscore (_) at the fourth index
        if (strategy_name.charAt(3) != "_") {
          return res.send({
            status: false,
            msg: "Please Enter Strategy name _ is mandatory",
            data: [],
          });
        }

        return true;
      }

      if (!checkStringValidity(strategy_name)) {
        return res.send({
          status: false,
          msg: "Some Issue in strategy",
          data: [],
        });
      }

      function compareObjects(oldObj, newObj) {

        if (oldObj.strategy_category != newObj.strategy_category) {
          const Activity_logsData = new Activity_logs({
            user_Id: maker_id,
            admin_Id: maker_id,
            category: "EDIT_STRATEGY",
            message: "Strategy Category Update " + oldObj.strategy_category + " " + newObj.strategy_category,
            maker_role: "SUBADMIN",
            device: "web",
            system_ip: ""
          });
          Activity_logsData.save();
        }

      }


      const changes = compareObjects(strategy_check, req.body);




      const filter = { _id: _id };
      const update_strategy = {
        $set: {
          strategy_name: strategy_name,
          strategy_description: strategy_description,
          strategy_demo_days: strategy_demo_days,
          strategy_category: strategy_category,
          strategy_segment: strategy_segment,
          strategy_indicator: strategy_indicator,
          strategy_tester: strategy_tester,
          strategy_amount: strategy_amount,
          strategy_image: strategy_image,
          security_fund_month: security_fund_month,
          security_fund_quarterly: security_fund_quarterly,
          security_fund_half_early: security_fund_half_early,
          security_fund_early: security_fund_early,
          fixed_amount_per_trade_month: fixed_amount_per_trade_month,
          fixed_amount_per_trade_quarterly: fixed_amount_per_trade_quarterly,
          fixed_amount_per_trade_half_early: fixed_amount_per_trade_half_early,
          fixed_amount_per_trade_early: fixed_amount_per_trade_early,
          maker_id: maker_id_find._id,
          Service_Type: Service_Type,
          max_trade: max_trade || null,
          strategy_percentage: strategy_percentage || null
        },
      };

      // UPDATE STRATEGY INFORMATION
      const result = await strategy_model.updateOne(filter, update_strategy);

      if (!result) {
        return res.send({ status: false, msg: "Strategy not Edit", data: [] });
      }

      return res.send({
        status: true,
        msg: "Strategy Edit successfully!",
        data: result,
      });
    } catch (error) {
      console.log("Error Strategy Edit error -", error);
    }
  }

  // GET ONE STRATEGY IN A COLLECTION
  async GetOneStragegy(req, res) {
    try {
      const { id } = req.body;

      const exist_strategy = await strategy_model.findOne({ _id: id });
      if (!exist_strategy) {
        return res.send({
          status: false,
          msg: "Strategy Not exists",
          data: [],
        });
      }

      return res
        .status(200)
        .json({
          status: true,
          msg: "Strategy Get successfully!",
          data: exist_strategy,
        });
    } catch (error) {
      console.log("Error Strategy Get One error -", error.keyValue);
    }
  }

  // GET ALL STRATEGYS
  async GetAllStrategy(req, res) {
    try {
      const { page, id } = req.body;


      // var getAllTheme = await strategy_model.find()
      const getAllstrategy = await strategy_model
        .find({ maker_id: id })
        .sort({ createdAt: -1 })
        .populate({
          path: 'researcher_id',
          select: 'UserName',
        })
        .select(
          '_id strategy_name strategy_description strategy_demo_days max_trade security_fund_month security_fund_quarterly security_fund_half_early security_fund_early fixed_amount_per_trade_early fixed_amount_per_trade_month fixed_amount_per_trade_quarterly fixed_amount_per_trade_half_early strategy_category strategy_segment strategy_image Service_Type maker_id createdAt updatedAt __v researcher_id');


      // IF DATA NOT EXIST
      if (getAllstrategy.length == 0) {
        res.send({ status: false, msg: "Empty data", data: getAllstrategy });
        return;
      }
      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get All Startegy",
        data: getAllstrategy,
      });
    } catch (error) {
      console.log("Error Get All Strategy Error-", error);
    }
  }


  // GET ALL STRATEGYS
  async GetAllSubadminStrategy(req, res) {
    try {
      const { page, limit, id, key, Role } = req.body;

      const skip = (page - 1) * limit;

      if (!id) {
        res.send({ status: false, msg: "Enter Please Id", data: [] });
      }

      if (key == 1) {
        const getAllstrategy = await strategy_model.find({
          maker_id: id,
          $or: [
            { security_fund_month: { $nin: [null, "", undefined] } },
            { security_fund_quarterly: { $nin: [null, "", undefined] } },
            { security_fund_half_early: { $nin: [null, "", undefined] } },
            { security_fund_early: { $nin: [null, "", undefined] } }
          ]
        }).sort({ createdAt: -1 }).select('_id strategy_name Service_Type');


        // IF DATA NOT EXIST
        if (getAllstrategy.length == 0) {
          res.send({ status: false, msg: "Empty data", data: getAllstrategy });
          return;
        }

        // DATA GET SUCCESSFULLY
        return res.send({
          status: true,
          msg: "Get All Startegy",
          data: getAllstrategy,
        });

      } else if (key == 2) {

        const findUser = await User.find({ _id: id }).select('prifix_key Role')
        const prefix = findUser[0].prifix_key.substring(0, 3); // Extracting first 3 characters from prefix_key

        if (findUser[0].Role == "SUBADMIN") {
          const getAllstrategy = await strategy_model.find(
            { strategy_name: { $regex: '^' + prefix } } // Using regex to match the starting 3 letters
          )
            .sort({ createdAt: -1 })
            .select('_id strategy_name Service_Type');



          // IF DATA NOT EXIST
          if (getAllstrategy.length == 0) {
            res.send({ status: false, msg: "Empty data", data: getAllstrategy });
            return;
          }

          // DATA GET SUCCESSFULLY
          return res.send({
            status: true,
            msg: "Get All Startegy",
            data: getAllstrategy,
          });
        } else if (findUser[0].Role == "RESEARCH") {
          const getAllstrategy = await researcher_strategy.find(
            { maker_id: findUser[0]._id }
          )
            .sort({ createdAt: -1 })
            .select('_id strategy_name');



          // IF DATA NOT EXIST
          if (getAllstrategy.length == 0) {
            res.send({ status: false, msg: "Empty data", data: getAllstrategy });
            return;
          }

          // DATA GET SUCCESSFULLY
          return res.send({
            status: true,
            msg: "Get All Startegy",
            data: getAllstrategy,
          });
        }




      } else {

        const findUser = await User.find({ Role: "SUBADMIN", _id: id }).select('prifix_key')

        const prefix = findUser[0].prifix_key.substring(0, 3); // Extracting first 3 characters from prefix_key


        const getAllstrategy = await strategy_model.find(
          { strategy_name: { $regex: '^' + prefix } } // Using regex to match the starting 3 letters
        )
          .sort({ createdAt: -1 })
          .select('_id strategy_name Service_Type');



        // IF DATA NOT EXIST
        if (getAllstrategy.length == 0) {
          res.send({ status: false, msg: "Empty data", data: getAllstrategy });
          return;
        }

        // DATA GET SUCCESSFULLY
        return res.send({
          status: true,
          msg: "Get All Startegy",
          data: getAllstrategy,
        });
      }



    } catch (error) {
      console.log("Error Get All Strategy Error-", error);
    }
  }



  async GetAllStrategyForClient(req, res) {
    try {
      const { id } = req.body;

      // Retrieve strategies based on maker_id
      const getAllStrategies = await strategy_model.find({ maker_id: id }, "_id strategy_name");

      // Check if data exists
      if (getAllStrategies.length === 0) {
        return res.send({ status: false, msg: "Empty data", data: getAllStrategies });
      }

      // Data retrieval successful
      res.send({
        status: true,
        msg: "Get All Strategy",
        data: getAllStrategies,
      });
    } catch (error) {
      console.log("Error getting all strategies:", error);
      res.status(500).send({ status: false, msg: "Internal Server Error" });
    }
  }


  // DELETE STRATEGY IN A COLLECTION
  async DeleteStragegy(req, res) {
    try {
      const { _id } = req.body;

      // CHECK IF STRATEGY EXISTS
      const strategy_check = await strategy_model.findOne({ _id: _id });
      if (!strategy_check) {
        return res.send({
          status: false,
          msg: "Strategy does not exist",
          data: [],
        });
      }

      // CHECK IF STRATEGY EXISTS IN STRATEGY CLIENT
      const strategy_client_check = await strategy_client_model.findOne({
        strategy_id: _id,
      });
      if (strategy_client_check) {
        return res.send({
          status: false,
          msg: "It cannot be deleted because it is assigned to a client.",
          data: [],
        });
      }

      // Delete the strategy
      const deleteResult = await strategy_model.deleteOne({ _id: _id });
      if (deleteResult.deletedCount === 1) {
        return res
          .status(200)
          .send({
            status: true,
            msg: "Strategy deleted successfully!",
            data: [],
          });
      } else {
        return res
          .status(500)
          .send({ status: false, msg: "Error deleting strategy", data: [] });
      }
    }
    catch (error) {
      console.log("Error Delete Strategy Error:", error);
      return res
        .status(500)
        .send({ status: false, msg: "An error occurred", data: [] });
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
            strategy_id: objectId,
          },
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
          $unwind: "$users",
        },

        {
          $project: {
            "users.FullName": 1,
            "users.UserName": 1,
            "users.license_type": 1,
          },
        },
      ];

      const GetAllClientServices = await strategy_client_model.aggregate(
        pipeline
      );

      // // IF DATA NOT EXIST
      if (GetAllClientServices.length == 0) {
        return res.send({ status: false, msg: "Empty data", data: [] });
      }

      return res.send({
        status: true,
        msg: "Get All Startegy",
        data: GetAllClientServices,
      });
    } catch (error) {
      console.log("Error Get All Strategy Error-", error);
    }
  }

  // Get Add Remove Strategy
  async GetAddRemoveStrategy(req, res) {
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
            as: "matched_docs",
          },
        },
        {
          $unwind: "$matched_docs",
        },
        {
          $group: {
            _id: "$_id",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 1, // include or exclude fields as needed
            count: 1,
            // Add other fields you want to include
          },
        },
      ];

      const duplicateids = await User.aggregate(pipeline2);

      const pipeline = [
        {
          $match: {
            strategy_id: objectId,
          },
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
          $unwind: "$users",
        },

        {
          $project: {
            strategy_id: 1,
            "users._id": 1,
            "users.FullName": 1,
            "users.UserName": 1,
            "users.license_type": 1,
            "users.Email": 1,
          },
        },
      ];

      const GetAllClientStrategy = await strategy_client_model.aggregate(
        pipeline
      );

      const pipeline1 = [
        {
          $project: {
            _id: 1,
            FullName: 1,
            UserName: 1,
            license_type: 1,
            Email: 1,
          },
        },
      ];

      const AllClients = await User.aggregate(pipeline1);

      if (AllClients.length > 0) {
        return res.send({
          status: true,
          msg: "Get All data",
          StrategyClient: GetAllClientStrategy,
          AllClients: AllClients,
          duplicateids: duplicateids,
        });
      } else {
        return res.send({ status: false, msg: "Get All data", data: [] });
      }
    } catch (error) {
      console.log("Error Get All Strategy Error-", error);
    }
  }

  // Update Add Remove Strategy
  async UpdateAddRemoveStrategy(req, res) {


    try {
      if (req.body.clientId.length > 0) {
        req.body.clientId.forEach(async (element) => {

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
          const deleteResult = await strategy_client_model.deleteOne({
            strategy_id: req.body.strategyId,
            user_id: element,
          });

        });
      }

      return res.send({
        status: true,
        msg: "Startegy Update Successfully....",
      });
    } catch (error) {
      return res.send({ status: false, msg: "Catch Error" });
    }
  }





  // GET ALL RESEARCHER STRATEGYS
  async getAllResearcherStrategy(req, res) {

    const { id } = req.body

    const researchUsersWithStrategies = await User.aggregate([
      {
        $match: {
          Role: "RESEARCH"
        }
      },
      {
        $lookup: {
          from: "researcher_strategies",
          localField: "_id",
          foreignField: "maker_id",
          as: "strategies"
        }
      },
      {
        $unwind: "$strategies"
      },
      {
        $addFields: {
          stg_active: {
            $cond: {
              if: { $in: [new ObjectId(id), "$strategies.collaboration_id"] },
              then: 1,
              else: 0
            }
          }
        }
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
          security_fund: "$strategies.security_fund",
          monthly_charges: "$strategies.monthly_charges",
          stg_active: "$stg_active"
        }
      }
    ]);



    if (!researchUsersWithStrategies) {
      return res.send({
        status: false,
        msg: "NO Researcher Found",
        data: []
      })
    }

    return res.send({ status: true, msg: "All strategy fetche successfully ", data: researchUsersWithStrategies })



  }




  async subadminTradeCharges(req, res) {

    const { id } = req.body
    var TradechargesWithUserDetails = await tradeCharge_Modal.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_details"
        }
      },
      {
        $unwind: "$user_details"
      },
      {
        $match: {
          "user_details.parent_id": id
        }
      },
      {
        $project: {
          "UserName": "$user_details.UserName",
          "parent_id": "$user_details.parent_id",
          order_id: 1,
          user_charge: 1,
          admin_charge: 1,
          createdAt: 1,
          user_id: 1
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }

    ]);

    return res.send({ status: true, msg: "All strategy fetche successfully ", data: TradechargesWithUserDetails })

  }




  async userTradeCharges(req, res) {

    const { id } = req.body

    var TradechargesWithUserDetails = await tradeCharge_Modal.aggregate([
      {
        $match: {
          user_id: new ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_details"
        }
      },
      {
        $unwind: "$user_details"
      },

      {
        $project: {
          "UserName": "$user_details.UserName",
          "parent_id": "$user_details.parent_id",
          "Balance": "$user_details.Balance",
          order_id: 1,
          user_charge: 1,
          admin_charge: 1,
          createdAt: 1,
          user_id: 1
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ]);


    const UserBalance = await User.findOne({
      _id: new ObjectId(id)
   
    }).select("Balance")

    return res.send({ status: true, msg: "All strategy fetche successfully ", data: TradechargesWithUserDetails, data1: UserBalance.Balance})

  }


}

module.exports = new strategy();
