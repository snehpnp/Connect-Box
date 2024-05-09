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
            const { id } = req.body;
    
            // Fetch parent_id of the user
            const user = await user_modal.findById(id).select('parent_id');
            if (!user) {
                return res.status(404).json({ status: false, msg: "User not found" });
            }
            const parent_id = user.parent_id;
    
            // Get total strategy count for the parent user
            const TotalStrategyCount = await Strategies.countDocuments({ maker_id: parent_id });
    
            // Get counts for the logged-in user's strategies
            const YourStrategies = await strategy_client.countDocuments({ user_id: id });
            const YourActiveStrategies = await strategy_client.countDocuments({ user_id: id, ActiveStatus: "1" });
            const YourInActiveStrategies = await strategy_client.countDocuments({ user_id: id, ActiveStatus: "0" });
    
            // Get latest strategies for the parent user
            const Latest_Strategies = await Strategies.find({ maker_id: parent_id })
                .sort({ createdAt: -1 })
                .select('strategy_name strategy_segment createdAt strategy_image')
                .limit(5);
    
            // Get the most ordered strategy
            const mostOrderedStrategyResult = await strategy_client.aggregate([
                {
                    $group: {
                        _id: "$strategy_id",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 1
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
                        plan: "$strategy.security_fund_early",

                        count: 1
                    }
                }
            ]);
    
            const mostOrderedStrategy = mostOrderedStrategyResult.length > 0 ? mostOrderedStrategyResult[0] : null;
    
            // Combine all data into a single object
            const data = {
                StrategyCount: {
                    TotalStrategyCount,
                    YourStrategies,
                    YourActiveStrategies,
                    YourInActiveStrategies
                },
                Latest_Strategies,
                mostOrderedStrategy
            };
    
            return res.json({ status: true, data, msg: "Done" });
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).json({ status: false, msg: "Internal server error" });
        }
    }
    


}


module.exports = new Dashboard();