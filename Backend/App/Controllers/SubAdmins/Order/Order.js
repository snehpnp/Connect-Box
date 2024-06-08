const signals = require("../../../Models/Signals.model");
const db = require("../../../Models");
const Mainsignals = db.MainSignals;
const User_model = db.user;
const Strategies = db.Strategies;
const researcher_strategy = db.researcher_strategy;
const client_service = db.client_service;
const Subadmin_Permission = db.Subadmin_Permission;
const Activity_logs = db.Activity_logs;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class SignalController {


  // ORDER DATA
  async Signal_data(req, res) {
    try {
      const { subadminId, Role } = req.body;
      const ObjSubAdminId = new ObjectId(subadminId);

      const today = new Date();
      today.setHours(0, 0, 0, 0);


      if (Role == "SUBADMIN") {
        const resultUser = await Strategies.find({
          maker_id: ObjSubAdminId,
        }).select("strategy_name");

        if (!resultUser) {
          return res.status(404).send({
            status: false,
            msg: "User not found",
          });
        }

        // Extracting strategy names from resultUser array
        const strategyNames = resultUser.map((user) => user.strategy_name);

        const pipeline = [
          {
            $match: {
              strategy: { $in: strategyNames },
              createdAt: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
              }
            },
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
              lot_size: 1,
              exit_status: 1,
              ft_time: 1,
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ];

        const results = await signals.aggregate(pipeline);
        return res.send({
          status: true,
          msg: "Data Retrieved Successfully",
          data: results,
        });
      } else if (Role == "RESEARCH") {
        const resultUser = await researcher_strategy
          .find({
            maker_id: ObjSubAdminId,
          })
          .select("strategy_name");

        if (!resultUser) {
          return res.status(404).send({
            status: false,
            msg: "User not found",
          });
        }

        // Extracting strategy names from resultUser array
        const strategyNames = resultUser.map((user) => user.strategy_name);

        const pipeline = [
          {
            $match: {
              strategy: { $in: strategyNames },
              createdAt: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
              }
            },
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
              lot_size: 1,
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ];

        const results = await signals.aggregate(pipeline);
        res.send({
          status: true,
          msg: "Data Retrieved Successfully",
          data: results,
        });
      } else if (Role == "USER") {
        var currentDate = new Date();

        currentDate.setHours(0, 0, 0, 0);
        var endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 999);

        const pipeline = [
          {
            $match: {
              user_id: ObjSubAdminId,
            },
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
            $unwind: "$service",
          },
          {
            $lookup: {
              from: "strategies",
              localField: "strategy_id",
              foreignField: "_id",
              as: "strategys",
            },
          },
          {
            $unwind: "$strategys",
          },
          {
            $lookup: {
              from: "signals",
              let: {
                service_name: "$service.name",
                strategy_name: "$strategys.strategy_name",

              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$symbol", "$$service_name"] },
                        { $eq: ["$strategy", "$$strategy_name"] },
                        { $gte: ['$createdAt', today] },
                        { $lte: ['$createdAt', new Date(today.getTime() + 24 * 60 * 60 * 1000)] },
                      ],
                    },
                  },
                },
                {
                  $sort: {
                    createdAt: -1, // 1 for ascending order, -1 for descending
                  },
                },
              ],
              as: "signals",
            },
          },
          {
            $group: {
              _id: null,
              allSignals: { $push: "$signals" },
            },
          },
          {
            $project: {
              _id: 0,
              allSignals: 1,
            },
          },
        ];

        const GetAllClientServices = await client_service.aggregate(pipeline);

        if (GetAllClientServices[0].allSignals.flat().length > 0) {
          const sortedAndFilteredArray = GetAllClientServices[0].allSignals
            .flat()
            .sort((a, b) => b.createdAt - a.createdAt);

          return res.send({
            status: true,
            data: sortedAndFilteredArray,
            msg: "Get Signals",
          });
        } else {
          return res.send({ status: false, data: [], msg: "Data Empty" });
        }
      } else if (Role == "EMPLOYEE") {
        let subadminStgFind = await Subadmin_Permission.aggregate([
          {
            $match: { user_id: ObjSubAdminId },
          },
          {
            $unwind: "$strategy",
          },
          {
            $lookup: {
              from: "strategies",
              localField: "strategy",
              foreignField: "_id",
              as: "strategyInfo",
            },
          },
          {
            $unwind: "$strategyInfo",
          },
          {
            $group: {
              _id: "$_id",
              strategyInfo: { $push: "$strategyInfo.strategy_name" },
            },
          },
          {
            $project: {
              _id: 0,
              strategyInfo: 1,
            },
          },
        ]);



        if (!subadminStgFind[0].strategyInfo) {
          return res.status(404).send({
            status: false,
            msg: "User not found",
          });
        }


        const pipeline = [
          {
            $match: {
              strategy: { $in: subadminStgFind[0].strategyInfo },
              createdAt: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
              }
            },
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
              lot_size: 1,
              exit_status: 1,
              ft_time: 1,
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ];

        const results = await signals.aggregate(pipeline);
        return res.send({
          status: true,
          msg: "Data Retrieved Successfully",
          data: results,
        });
      }

    } catch (error) {
      console.log("Error retrieving data:", error);
      res.send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }











  // GET ALL TRADE HOSTORY DATA
  async MainSignal_data(req, res) {
    try {
      const { subadminId } = req.body;
      const ObjSubAdminId = new ObjectId(subadminId);

      const resultUser = await User_model.findOne({
        _id: ObjSubAdminId,
      }).select("client_key Role");

      if (!resultUser) {
        return res.status(404).send({
          status: false,
          msg: "User not found",
        });
      }

      // console.log("resultUser",resultUser)
      var today = new Date();
      var formattedDate =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1).toString() +
        "/" +
        today.getDate().toString();

      if (resultUser.Role == "SUBADMIN") {
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
                  { $eq: ["$dt_date", formattedDate] },
                ],
              },
            },
          },

          {
            $lookup: {
              from: "strategies",
              localField: "strategy",
              foreignField: "strategy_name",
              as: "StrategyData",
            },
          },
          {
            $unwind: "$StrategyData",
          },
        ]);

        return res.send({
          status: true,
          msg: "Data Retrieved Successfully",
          data: results,
        });
      } else if (resultUser.Role == "RESEARCH") {

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
                  { $eq: ["$dt_date", formattedDate] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "researcher_strategies",
              localField: "strategy",
              foreignField: "strategy_name",
              as: "StrategyData",
            },
          },
          {
            $unwind: "$StrategyData",
          },
        ]);

        return res.send({
          status: true,
          msg: "Data Retrieved Successfully",
          data: results,
        });
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
      res.send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }



  // UPDATE STOPLOASS
  async update_stop_loss(req, res) {
    try {
      const { data } = req.body;

      for (const signal of data) {
        const ExistfindSignal = await Mainsignals.findOne({ _id: signal._id }).select('target stop_loss exit_time');

        if (!ExistfindSignal) {
          return res.status(404).send({ status: false, msg: "Signal not found", data: null });
        }

        let updateFields = {};
        let activityMessages = [];

        if (ExistfindSignal.target !== signal.target) {
          updateFields.target = signal.target;
          activityMessages.push(`${signal.trade_symbol} Update Target price to ${signal.target}`);
        }

        if (ExistfindSignal.stop_loss !== signal.stop_loss) {
          updateFields.stop_loss = signal.stop_loss;
          activityMessages.push(`${signal.trade_symbol} Update Stop Loss price to ${signal.stop_loss}`);
        }

        if (ExistfindSignal.exit_time !== signal.exit_time) {
          updateFields.exit_time = signal.exit_time;
          activityMessages.push(`${signal.trade_symbol} Update Exit Time to ${signal.exit_time}`);
        }


        if (activityMessages.length > 0) {
          for (const message of activityMessages) {
            const Activity_logsData = new Activity_logs({
              admin_Id: signal.StrategyData.researcher_id ? signal.StrategyData.researcher_id : signal.StrategyData.maker_id,
              category: "TARGET-STOPLOSS-TIME",
              message: message,
              maker_role: "SUBADMIN",
              device: "web",
              system_ip: ""
            });
            await Activity_logsData.save();
          }
        }

        if (Object.keys(updateFields).length > 0) {
          const filter = { _id: signal._id };
          const updateOperation = { $set: updateFields };
          await Mainsignals.updateOne(filter, updateOperation);
        }
      }

      return res.send({ status: true, msg: "Update Successful", data: null });
    } catch (error) {
      console.error("Error in update_stop_loss:", error);
      return res.send({ status: false, msg: "Internal server error", data: error.message });
    }
  }




  // SUBADMIN TRADE HISTORY DATA
  async Tradehistory_data(req, res) {
    try {

      const { Role, subadminId, startDate, endDate, strategy, service, type } =
        req.body;

      const ObjSubAdminId = new ObjectId(subadminId);
      let resultUser;
      let strategyNames
      let Stg_col_name


      if (Role == "SUBADMIN") {
        Stg_col_name = "strategies"

        resultUser = await Strategies.find({
          maker_id: ObjSubAdminId,
        }).select("strategy_name");


        if (!resultUser) {
          return res.status(404).send({
            status: false,
            msg: "User not found",
          });
        }

        // Extracting strategy names from resultUser array
        strategyNames = resultUser.map((user) => user.strategy_name);

      } if (Role == "RESEARCH") {
        Stg_col_name = "researcher_strategies"
        resultUser = await researcher_strategy.find({
          maker_id: ObjSubAdminId,
        }).select("strategy_name");


        if (!resultUser) {
          return res.status(404).send({
            status: false,
            msg: "User not found",
          });
        }

        // Extracting strategy names from resultUser array
        strategyNames = resultUser.map((user) => user.strategy_name);


      } else if (Role === "EMPLOYEE") {
        Stg_col_name = "strategies"

        let subadminStgFind = await Subadmin_Permission.aggregate([
          {
            $match: { user_id: ObjSubAdminId }, // İlgili kullanıcıya göre eşleşmeyi bulun
          },
          {
            $unwind: "$strategy", // Diziyi açarak her bir strateji için ayrı bir belge oluşturun
          },
          {
            $lookup: {
              from: "strategies", // Diğer koleksiyonun adı
              localField: "strategy", // Subadmin_Permission koleksiyonundaki alan
              foreignField: "_id", // Strategies koleksiyonundaki alan
              as: "strategyInfo", // Eşleşen belgeleri buraya yerleştirin
            },
          },
          {
            $unwind: "$strategyInfo", // İç içe dizileri açarak her bir strateji bilgisini ayrı bir belge haline getirin
          },
          {
            $group: {
              _id: "$_id", // Gruplama için bir alan seçin, burada _id kullanıyorum
              strategyInfo: { $push: "$strategyInfo.strategy_name" }, // Her bir strateji bilgisini bir dizi içinde toplayın
            },
          },
          {
            $project: {
              _id: 0, // İstediğiniz alanları seçin, burada _id'yi hariç tutuyorum
              strategyInfo: 1, // İstediğiniz ek bilgi
            },
          },
        ]);

        resultUser = subadminStgFind[0].strategyInfo;


        if (!resultUser) {
          return res.status(404).send({
            status: false,
            msg: "User not found",
          });
        }

        // Extracting strategy names from resultUser array
        strategyNames = resultUser


      } else {
        Stg_col_name = "strategies"

        resultUser = await Strategies.find({
          maker_id: ObjSubAdminId,
        }).select("strategy_name");




        if (!resultUser) {
          return res.status(404).send({
            status: false,
            msg: "User not found",
          });
        }

        // Extracting strategy names from resultUser array
        strategyNames = resultUser.map((user) => user.strategy_name);
      }


      let startDateObj = new Date(startDate);

      let endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);


      let stg1;
      let ser1;
      //  For Strategy
      if (strategy === "null" || strategy === "") {
        stg1 = { $in: strategyNames }
      } else {
        stg1 = strategy;
      }


      //  For Service
      if (service === "null") {
        ser1 = { $exists: true };
      } else {
        ser1 = service;
      }

      const filteredSignals = await Mainsignals.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDateObj,
              $lte: endDateObj,
            },
            trade_symbol: ser1,
            strategy: stg1
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
              $gt: [{ $size: "$result" }, 0],
            },
          },
        },
        {
          $match: {
            $expr: {
              $gt: [{ $size: "$result1" }, 0],
            },
          },
        },

        {
          $lookup: {
            from: Stg_col_name,
            localField: "strategy",
            foreignField: "strategy_name",
            as: "StrategyData",
          },
        },
        {
          $unwind: "$StrategyData",
        },

        {
          $project: {
            symbol: 1,
            entry_type: 1,
            exit_type: 1,
            entry_price: 1,
            exit_price: 1,
            entry_qty_percent: 1,
            exit_qty_percent: 1,
            entry_qty: 1,
            exit_qty: 1,
            entry_dt_date: 1,
            exit_dt_date: 1,
            exchange: 1,
            strategy: 1,
            option_type: 1,
            dt: 1,
            dt_date: 1,
            strike: 1,
            expiry: 1,
            segment: 1,
            trade_symbol: 1,
            client_persnal_key: 1,
            TradeType: 1,
            token: 1,
            lot_size: 1,
            MakeStartegyName: 1,
            target: 1,
            stop_loss: 1,
            exit_time: 1,
            exit_time1: 1,
            exit_status: 1,
            sl_status: 1,
            complete_trade: 1,
            signals_id: 1,
            createdAt: 1,
            updatedAt: 1,
            "StrategyData._id": 1,
            "StrategyData.strategy_name": 1,
            "StrategyData.strategy_segment": 1,
            "StrategyData.strategy_category": 1,

            "result._id": 1,
            "result.symbol": 1,
            "result.type": 1,
            "result.price": 1,
            "result.qty_percent": 1,
            "result.exchange": 1,
            "result.sq_value": 1,
            "result.sl_value": 1,
            "result.tsl": 1,
            "result.tr_price": 1,
            "result.dt": 1,
            "result.dt_date": 1,
            "result.strategy": 1,
            "result.option_type": 1,
            "result.strike": 1,
            "result.expiry": 1,
            "result.segment": 1,
            "result.trade_symbol": 1,
            "result.client_persnal_key": 1,
            "result.TradeType": 1,
            "result.token": 1,
            "result.lot_size": 1,
            "result.MakeStartegyName": 1,
            "result.exit_status": 1,
            "result.ft_time": 1,
            "result.createdAt": 1,
            "result.updatedAt": 1,

            "result1._id": 1,
            "result1.name": 1,
            "result1.instrument_token": 1,
            "result1.zebu_token": 1,
            "result1.kotak_token": 1,
            "result1.instrumenttype": 1,
            "result1.exch_seg": 1,
            "result1.lotsize": 1,
            "result1.unique_column": 1,
            "result1.categorie_id": 1,
            "result1.createdAt": 1,
            "result1.updatedAt": 1,
          },
        },
      ]);

      if (filteredSignals.length > 0) {
        filteredSignals.filter(function (item) {
          (item.entry_qty_percent =
            Number(item.result1[0].lotsize) *
            Math.ceil(Number(item.entry_qty_percent) / 100)),
            (item.exit_qty_percent =
              Number(item.result1[0].lotsize) *
              Math.ceil(Number(item.exit_qty_percent) / 100));
        });
      }

      if (filteredSignals.length === 0) {
        return res.send({
          status: false,
          msg: "No signals founddate range.",
          data: [],
        });
      }
      return res.send({
        status: true,
        msg: "Filtered Tradehistory",
        data: filteredSignals,
      });
    } catch (error) {
      console.log("Error retrieving data:", error);
      res.send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }



  async UserTradehistory_data(req, res) {
    try {
      const { subadminId, startDate, endDate, strategy, service, type } =
        req.body;

      const objectId = new ObjectId(subadminId);



      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let startDateObj = new Date(startDate);
      let endDateObj = new Date(endDate);
      let stg1;
      let ser1;

      let stgArr = []


      //  For Service
      if (service === "null") {
        ser1 = { $exists: true };
      } else {
        ser1 = service;
      }

      const pipeline = [
        {
          $match: {
            user_id: objectId,
          },
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
          $unwind: "$service",
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
          $lookup: {
            from: "strategies",
            localField: "strategy_id",
            foreignField: "_id",
            as: "strategys",
          },
        },
        {
          $unwind: "$strategys",
        },

        {
          $project: {
            "service.name": 1,
            "strategys.strategy_name": 1,
            "users.web_url": 1,
            "users.client_key": 1,
            quantity: 1,
          },
        },
      ];

      let GetAllClientServices = await client_service.aggregate(pipeline);


      GetAllClientServices.map((data) => {
        stgArr.push(data.strategys.strategy_name)
      })


      var abc = [];

      if (GetAllClientServices.length > 0) {
        for (const item of GetAllClientServices) {

          //  For Strategy
          if (strategy === "null" || strategy === "" || strategy.length == 0) {
            stg1 = { $in: stgArr }
          } else {
            stg1 = strategy
          }



          try {

            var data = await Mainsignals.aggregate([
              {
                $match: {
                  symbol: item.service.name,
                  strategy: stg1,
                  createdAt: {
                    $gte: today,
                    $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                  }
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
                $sort: {
                  _id: -1, // Sort in ascending order. Use -1 for descending.
                },
              },
            ]);


            if (data.length > 0) {
              data.forEach(function (item) {
                var findstg = GetAllClientServices.find((data1) => data1.service.name == item.symbol &&
                  data1.strategys.strategy_name == item.strategy
                );

                item.result.forEach(function (signal) {
                  signal.qty_percent = findstg.quantity * (Math.ceil(Number(signal.qty_percent || 100) / 100) * 100) * 0.01;
                });

                (item.entry_qty_percent = findstg.quantity * (Math.ceil(Number(item.entry_qty_percent || 100) / 100) * 100) * 0.01),
                  (item.exit_qty_percent = findstg.quantity * (Math.ceil(Number(item.exit_qty_percent || 100) / 100) * 100) * 0.01);
              });

              abc.push(data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }




      } else {
        res.send({
          status: false,
          data: GetAllClientServices,
          msg: "Data Empty",
        });
      }

      if (abc.length > 0) {
        res.send({ status: true, data: abc.flat(), msg: "Get Signals" });
      } else {
        res.send({ status: false, data: [], msg: "Data Empty" });
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
      res.send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }







  // GETALL USER SIGNAL ON TRADING VIEW
  async getAllSignalByPrefix(req, res) {
    try {
      const { subadminId } = req.body;
      const ObjSubAdminId = new ObjectId(subadminId);
      const resultUser = await User_model.findOne({
        _id: ObjSubAdminId,
      }).select("client_key prifix_key");
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
      res.send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }




}

module.exports = new SignalController();
