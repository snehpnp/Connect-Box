const signals = require("../../../Models/Signals.model");
const db = require("../../../Models");
const Mainsignals = db.MainSignals;
const User_model = db.user;
const Strategies = db.Strategies;


const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class SignalController {

  async Signal_data(req, res) {
    try {
      const { subadminId } = req.body;
      const ObjSubAdminId = new ObjectId(subadminId);

      const resultUser = await Strategies.find({
        maker_id: ObjSubAdminId,
      }).select('strategy_name')




      console.log("resultUser", resultUser)


      if (!resultUser) {
        return res.status(404).send({
          status: false,
          msg: "User not found",
        });
      }

      // Extracting strategy names from resultUser array
      const strategyNames = resultUser.map(user => user.strategy_name);

      const pipeline = [
        {
          $match: { strategy: { $in: strategyNames } }
        },
        {
          $project: {
            _id: 0,
            trade_symbol: 1,
            qty_percent: 1,
            strategy: 1,
            symbol: 1,
            TradeType: 1,
            tr_price: 1,
            createdAt: 1,
            type: 1,
            price: 1,
            option_type: 1,
            strike: 1,
            expiry: 1,
            segment: 1,
            client_persnal_key: 1,
            token: 1,
            lot_size: 1
          }
        }
      ];

      const results = await signals.aggregate(pipeline);
      res.send({
        status: true,
        msg: "Data Retrieved Successfully",
        data: results,
      });
    } catch (error) {
      console.log("Error retrieving data:", error);
      res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

  async getAllSignalByPrefix(req, res) {
    try {
      const { subadminId } = req.body;
      const ObjSubAdminId = new ObjectId(subadminId);
      const resultUser = await User_model.findOne({ _id: ObjSubAdminId, }).select("client_key prifix_key");
      const clientKey = resultUser.client_key;
      const prefixKey = resultUser.prifix_key;

      if (!resultUser) {
        return res.status(404).send({
          status: false,
          msg: "User not found",
        });
      }
      const pipeline = [
        {
          $match: {
            client_persnal_key: {
              $regex: prefixKey,
              $ne: clientKey,
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "client_persnal_key",
            foreignField: "client_key",
            as: "lookupData",
          },
        },
        {
          $unwind: "$lookupData",
        },
        {
          $project: {
            _id: 1,
            fullName: "$lookupData.FullName",
            trade_symbol: 1,
            qty_percent: 1,
            strategy: 1,
            symbol: 1,
            TradeType: 1,
            segment: 1,
            tr_price: 1,
            type: 1,
            client_persnal_key: 1,
          },
        },
      ];
      const results = await signals.aggregate(pipeline);
      res.send({
        status: true,
        msg: "Data Retrieved Successfully",
        data: results,
      });
    } catch (error) {
      console.log("Error retrieving data:", error);
      res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

  async MainSignal_data(req, res) {
    try {
      const { subadminId } = req.body;
      const ObjSubAdminId = new ObjectId(subadminId);
      const resultUser = await User_model.findOne({
        _id: ObjSubAdminId,
      }).select("client_key");

      console.log("resultUser", resultUser)
      if (!resultUser) {
        return res.status(404).send({
          status: false,
          msg: "User not found",
        });
      }

      const pipeline = [
        {
          $match: { client_persnal_key: resultUser.client_key },
        },

      ];
      const results = await Mainsignals.aggregate(pipeline);
      res.send({
        status: true,
        msg: "Data Retrieved Successfully",
        data: results,
      });
    } catch (error) {
      console.log("Error retrieving data:", error);
      res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

  // UPDATE STOPLOASS
  async update_stop_loss(req, res) {
    try {

      const { data } = req.body;

      data.forEach(async (signal) => {

        const filter = { _id: signal._id };
        const updateOperation = { $set: signal };
        const result = await Mainsignals.updateOne(filter, updateOperation);

      })

      return res.send({ status: true, msg: 'Update SuccessFully', data: [] });

    } catch (error) {
      return res.send({ status: false, msg: 'error ', data: error });

    }
  }




























}

module.exports = new SignalController();
