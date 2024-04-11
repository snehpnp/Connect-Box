"use strict";
const db = require('../../Models');
const Signals_modal = db.Signals
const client_services = db.client_service
const Strategies = db.Strategies
const user_modal = db.user


const strategy_client = db.strategy_client



const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class Dashboard {

    // GET ADMIN SIGNALS
    async UserDashboardData(req, res) {
        try {
            const { id } = req.body

            var User = await user_modal.find({ _id: id }).select('parent_id')

            const TotalStrategyCount = await Strategies.countDocuments({ maker_id: User[0].parent_id });
            const YourStrategies = await strategy_client.countDocuments({ user_id: User[0]._id });
            const YourActiveStrategies = await strategy_client.countDocuments({ user_id: User[0]._id, ActiveStatus: "1" });
            const YourInActiveStrategies = await strategy_client.countDocuments({ user_id: User[0]._id, ActiveStatus: "0" });

            const Latest_Strategies = await Strategies.find({ maker_id: User[0].parent_id })
            .sort({ createdAt: -1 }) 
            .select('strategy_name strategy_segment createdAt strategy_image'); 
        
  
            const mostOrderedStrategy = await strategy_client.aggregate([
                {
                    $group: {
                        _id: "$strategy_id", // Group by strategy_id
                        count: { $sum: 1 } // Count occurrences of each strategy_id
                    }
                },
                {
                    $sort: { count: -1 } // Sort by count in descending order
                },
                {
                    $limit: 1 // Limit to the first document
                },
                {
                    $lookup: {
                        from: "strategies",
                        localField: "_id",
                        foreignField: "_id",
                        as: "strategy"
                    }
                },
                {
                    $unwind: "$strategy"
                },
                {
                    $project: {
                        _id: 0,
                        strategy_name: "$strategy.strategy_name",
                        count: 1
                    }
                }
            ]);
            
           
            


        
            var StrategyCount = {
                TotalStrategyCount: TotalStrategyCount,
                YourStrategies: YourStrategies,
                YourActiveStrategies: YourActiveStrategies,
                YourInActiveStrategies: YourInActiveStrategies
            }

            var data = [{ StrategyCount: StrategyCount, Latest_Strategies: Latest_Strategies ,mostOrderedStrategy:mostOrderedStrategy,MostProfitabelStrategies:mostOrderedStrategy
            }]

            console.log(data);

            return res.send({ status: true, data:data , msg: "Done" })

        } catch (error) {
            console.log("Error Signals  error -", error);
        }
    }


}


module.exports = new Dashboard();