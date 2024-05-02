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

      if (!resultUser) {
        return res.status(404).send({
          status: false,
          msg: "User not found",
        });
      }

      // const pipeline = [
      //   {
      //     $match: { client_persnal_key: resultUser.client_key },
      //   },

      // ];
      // const results = await Mainsignals.aggregate(pipeline);
      var today = new Date();
      var formattedDate = today.getFullYear() + '/' + (today.getMonth() + 1).toString()+ '/' + today.getDate().toString();



      var results = await Mainsignals.aggregate([
        {
          $match: { client_persnal_key: resultUser.client_key },
        },
        {
            $addFields: {
                entry_qty_percent_int: { $toInt: "$entry_qty_percent" },
                exit_qty_percent_int: {
                    $cond: {
                        if: {
                            $or: [
                                { $eq: ["$exit_qty_percent", ""] },
                                { $eq: ["$exit_qty_percent", null] },
                            ],
                        },
                        then: 0,
                        else: { $toInt: "$exit_qty_percent" },
                    },
                },
            },
        },
        {
            $match: {
                $expr: {
                    $and: [
                        { $gt: ["$entry_qty_percent_int", "$exit_qty_percent_int"] },
                        { $eq: ["$dt_date", formattedDate] }
                    ]
                }
            }
        },

        {
            $lookup: {
              from: 'strategies',
              localField: 'strategy',
              foreignField: 'strategy_name', // Assuming this is the field in collection2 which corresponds to the _id of collection1
              as: 'StrategyData'
            }
          },
          {
            $unwind: '$StrategyData',
          },

    ]);


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



  async Tradehistory_data(req, res) {
    try {

      const { subadminId,startDate, endDate, strategy, service, type } = req.body;

      const ObjSubAdminId = new ObjectId(subadminId);

      const resultUser = await Strategies.find({
        maker_id: ObjSubAdminId,
      }).select('strategy_name')  

      if (!resultUser) {
        return res.status(404).send({
          status: false,
          msg: "User not found",
        });
      }




  // Extracting strategy names from resultUser array
  const strategyNames = resultUser.map(user => user.strategy_name);



      let startDateObj = new Date(startDate)
      let endDateObj = new Date(endDate)
      let stg1
      let ser1
      //  For Strategy
      if (strategy === "null") {
          stg1 = { $exists: true }

      } else {
          stg1 = strategy
      }

      //  For Service
      if (service === "null") {
          ser1 = { $exists: true }
      } else {
          ser1 = service
      }


      const filteredSignals = await Mainsignals.aggregate([
          {
            $match: {
              dt_date: {
                $gte: startDate,
                $lte: endDate,
              },
              strategy: stg1,
              trade_symbol: ser1,
               strategy: { $in: strategyNames } 
            },
          },
          {
            $lookup: {
              from: "signals",
              localField: "signals_id",
              foreignField: "_id",
              as: "result",
            },
          },
          {
            $lookup: {
              from: "services",
              localField: "symbol",
              foreignField: "name",
              as: "result1",
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $match: {
              $expr: {
                $gt: [
                  { $size: "$result" },
                  0
                ],
              },
            },
          },
          {
            $match: {
              $expr: {
                $gt: [
                  { $size: "$result1" },
                  0
                ],
              },
            },
          },


          {
            $lookup: {
              from: 'strategies',
              localField: 'strategy',
              foreignField: 'strategy_name', // Assuming this is the field in collection2 which corresponds to the _id of collection1
              as: 'StrategyData'
            }
          },
          {
            $unwind: '$StrategyData',
          },


         
          {
            $project : {
                
              symbol:1,
              entry_type:1,
              exit_type:1,
              entry_price:1,
              exit_price:1,
              entry_qty_percent:1,
              exit_qty_percent:1,
              entry_qty:1,
              exit_qty:1,
              entry_dt_date:1,
              exit_dt_date:1,
              exchange:1,
              strategy:1,
              option_type:1,
              dt:1,
              dt_date:1,
              strike:1,
              expiry:1,
              segment:1,
              trade_symbol:1,
              client_persnal_key:1,
              TradeType:1,
              token:1,
              lot_size:1,
              MakeStartegyName:1,
              target:1,
              stop_loss:1,
              exit_time:1,
              exit_time1:1,
              sl_status:1,
              complete_trade:1,
              signals_id:1,
              createdAt:1,
              updatedAt:1,
              "StrategyData._id":1,
              "StrategyData.strategy_name":1,
              "StrategyData.strategy_segment":1,
              "StrategyData.strategy_category":1,

              "result._id":1,
              "result.symbol":1,
              "result.type":1,
              "result.price":1,
              "result.qty_percent":1,
              "result.exchange":1,
              "result.sq_value":1,
              "result.sl_value":1,
              "result.tsl":1,
              "result.tr_price":1,
              "result.dt":1,
              "result.dt_date":1,
              "result.strategy":1,
              "result.option_type":1,
              "result.strike":1,
              "result.expiry":1,
              "result.segment":1,
              "result.trade_symbol":1,
              "result.client_persnal_key":1,
              "result.TradeType":1,
              "result.token":1,
              "result.lot_size":1,
              "result.MakeStartegyName":1,
              "result.createdAt":1,
              "result.updatedAt":1,

              "result1._id":1,
              "result1.name":1,
              "result1.instrument_token":1,
              "result1.zebu_token":1,
              "result1.kotak_token":1,
              "result1.instrumenttype":1,
              "result1.exch_seg":1,
              "result1.lotsize":1,
              "result1.unique_column":1,
              "result1.categorie_id":1,
              "result1.createdAt":1,
              "result1.updatedAt":1



               
            }
          }


        ]);


        


      if (filteredSignals.length > 0) {

          filteredSignals.filter(function (item) {

              item.entry_qty_percent = Number(item.result1[0].lotsize) * (Math.ceil(Number(item.entry_qty_percent) / 100)),
                  item.exit_qty_percent = Number(item.result1[0].lotsize) * (Math.ceil(Number(item.exit_qty_percent) / 100))

          });

      }


      if (filteredSignals.length === 0) {
          return res.send({ status: false, msg: 'No signals founddate range.', data: [] });
      }
      return res.send({ status: true, msg: 'Filtered Tradehistory', data: filteredSignals });








    } catch (error) {
      console.log("Error retrieving data:", error);
      res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

























}

module.exports = new SignalController();
