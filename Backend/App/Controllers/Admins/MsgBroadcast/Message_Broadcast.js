const db = require('../../../Models');
const User = db.user;
const Strategies = db.Strategies;
const api_create_info = db.api_create_info;



class MessageController {
    async createMessage(req, res) {
        try {
            const { ownerId, strategyId, brokerId, messageTitle } = req.body;

            if (!strategyId || !brokerId) {
                return res.status(400).send("strategyId and brokerId are required");
            }

            if (!ownerId) {
                return res.status(400).send("strategyId and brokerId are required");
            }

            const msg = new MessageData({
                ownerId, strategyId, brokerId, messageTitle
            });

            const userData = await User.findOne({ _id: ownerId });
            
            console.log("userData", userData)
            
            const strategyObj = await Strategies.findOne({ name: strategyId });
            const brokerObj = await api_create_info.findOne({ name: brokerId });
            console.log("strategyObj", strategyObj);

            const details = new detailsOfMsgSender({
                userId: ownerObj._id,
                strategyId: strategyObj._id,
                brokerId: brokerObj._id,
            });

            const result0 = await details.save();

            const result = await msg.save();

            return res.status(201).send("Successfully Created!");
        } catch (error) {
            console.error("Error saving message:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new MessageController();
