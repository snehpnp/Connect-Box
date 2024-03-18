"use strict";
const db = require('../../Models');
const MainSignals_modal = db.MainSignals
const live_price = db.live_price
const user_logs = db.user_logs


const { formattedDateTime } = require('../../Helper/time.helper')

class Tradehistory {

    // GET ADMIN SIGNALS
    async GetAdminTradeHistory(req, res) {
        try {

            const { startDate, endDate, strategy, service, type } = req.body;

            var client_persnal_key1 = ""
            if (type != undefined || type != 'undefined') {
                if (type.toUpperCase() == "ADMIN") {
                    client_persnal_key1 = ""
                } else {
                    client_persnal_key1 = { $ne: "" }
                }
            }


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


            const filteredSignals = await MainSignals_modal.aggregate([
                {
                  $match: {
                    dt_date: {
                      $gte: startDate,
                      $lte: endDate,
                    },
                    strategy: stg1,
                    trade_symbol: ser1,
                    client_persnal_key: client_persnal_key1,
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


             // console.log("filteredSignals   -- ",filteredSignals[0])
              
             // console.log("result1   -- ",filteredSignals[0],result1[0])
             
             // console.log("result   -- ",filteredSignals[0],result[0])
              


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
            console.log("Error Trade History Error-", error);
        }
    }

    // GET ADMIN SIGNALS
    async GetAdminsevenTradeHistory(req, res) {
        try {
            const today = new Date(); // Aaj ki date
            const sevenDaysAgo = new Date(today); // Aaj ki date se 7 din pehle ki date
            sevenDaysAgo.setDate(today.getDate() - 7);

            // const filteredSignals = await MainSignals_modal.find({
            //     createdAt: {
            //         $gte: sevenDaysAgo, // Aaj se pichle 7 din se greater than or equal
            //         $lte: today, // Aaj se less than or equal
            //     },
            // }).sort({ createdAt: -1 })

            const filteredSignals = await MainSignals_modal.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: sevenDaysAgo, // Aaj se pichle 7 din se greater than or equal
                            $lte: today, // Aaj se less than or equal
                        },

                    }
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
                        _id: -1 // Sort in ascending order. Use -1 for descending.
                    }
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
                  }
            ]);



            if (filteredSignals.length > 0) {

                filteredSignals.filter(function (item) {

                    item.entry_qty_percent = Number(item.result1[0].lotsize) * (Math.ceil(Number(item.entry_qty_percent) / 100)),
                        item.exit_qty_percent = Number(item.result1[0].lotsize) * (Math.ceil(Number(item.exit_qty_percent) / 100))

                });

            }


            var tradeArr = []
            filteredSignals.forEach((data) => {
                var entry_qty_percent1 = data.entry_qty_percent ? Number(data.entry_qty_percent) : 0
                var exit_qty_percent1 = data.exit_qty_percent ? Number(data.exit_qty_percent) : 0

                // console.log( entry_qty_percent1 ,"-", exit_qty_percent1);

                if (entry_qty_percent1 > exit_qty_percent1) {
                    data.entry_qty_percent = entry_qty_percent1 - exit_qty_percent1
                    tradeArr.push(data)
                }

            })


            if (tradeArr.length == 0) {
                res.send({ status: false, data: tradeArr, msg: "Empty Data" })
            }

            res.send({ status: true, data: tradeArr, msg: "Get All Data" })


        } catch (error) {
            console.log("Error Get All Trade History Data-", error);
        }
    }

    // ADMIN TRADING STATUS GET
    async AdminTradingStatus(req, res) {
        try {
            const { broker_name } = req.body

            var Admin_information = await live_price.find({ broker_name: "ALICE_BLUE" });

            if (Admin_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            if (Admin_information[0].trading_status == "off") {
                return res.send({ status: false, msg: 'Already Trading Off', data: false });
            }


            return res.send({ status: true, msg: "Trading status get", data: true });


        } catch (error) {
            console.log("Error error", error);
        }
    }


    // ADMIN TRADING OFF
    async AdminTradingOff(req, res) {
        try {
            const { broker_name, device } = req.body

            var Admin_information = await live_price.find({ broker_name: broker_name });

            if (Admin_information.length == 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            if (Admin_information[0].trading_status == "off") {
                return res.send({ status: false, msg: 'Already Trading Off', data: [] });

            }

            const User_Update = await live_price.updateOne({ broker_name: broker_name }, { $set: { trading_status: "off", access_token: "" } });

            const user_login = new user_logs({
                user_Id: Admin_information[0].user_id,
                login_status: "Trading off",
                role: "ADMIN",
                // system_ip: getIPAddress()
                device: device
            })
            await user_login.save();

            return res.send({ status: true, msg: 'Trading Off successfully', data: [] });


        } catch (error) {
            console.log("Error error", error);
        }
    }

}


module.exports = new Tradehistory();