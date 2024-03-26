const MessageData = require("../../../Models/message_broadcast");



class MessageController {
    async createMessage(req, res) {
        try {
            const { ownerId, strategyId, brokerId, messageTitle } = req.body;

            if (!strategyId || !brokerId) {
                return res.status(400).send("strategyId and brokerId are required");
            }

            const msg = new MessageData({
                ownerId, strategyId, brokerId, messageTitle
            });

            // const ownerObj=await USER.findOne({ name: USER });
            // const strategyObj=await Strategy.findOne({ name: stratigey._id });
            // const brokerObj=await Broker.findOne({ name: broker._id });


            // const details = new detailsOfMsgSender({
            //     userId: ownerObj._id,
            //     brokerId: strategyObj._id,
            //     strategyId: strategyObj._id,
            //   });

            //   const result0=await details.save();

            const result = await msg.save();

            return res.status(201).send("Successfully Created!");
        } catch (error) {
            console.error("Error saving message:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new MessageController();
