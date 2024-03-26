const strategy = require("../../Models/msg.Schema_broadcast");

const StrategyPost = async (req, res) => {
    try {
        const {
            name,
            strategyname,
            description
        } = req.body;

        if (!name || !description) {
            return res
                .status(400)
                .send("Name and description are required");
        }

        let userData = {
            name,
            strategyname,
            description
        };

        const newUser = new strategy(userData);
        await newUser.save();

        const successMessage = "Person Name and Strategy added successfully!!";
        return res.status(201).send(successMessage);
    } catch (error) {
        console.log("Error saving user:", error);
        return res
            .status(500)
            .send("Internal Server Error");
    }
};

const getStrategyData = async (req, res) => {
    try {
        const strategyData = await strategy.find();
        res.status(200).send(strategyData);
    } catch (error) {
        console.error("Error retrieving strategy data:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = { StrategyPost, getStrategyData };
