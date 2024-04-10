const db = require("../../../Models");
const User = db.user;
const Strategies = db.Strategies;
const msgdata = db.msgdata;
const api_create_info = db.api_create_info;
const { Types } = require("mongoose");

class MessageController {
  async createMessage(req, res) {
    try {
      const { Role, ownerId, subAdminId, messageTitle, strategyId, brokerId } =
        req.body;

      if (!Role || !messageTitle) {
        return res.status(400).send("Role and messageTitle are required");
      }
      let msg;
      if (Role === "ADMIN") {
        if (Array.isArray(subAdminId) && subAdminId.length > 0) {
          const messageData = subAdminId.map((item) => ({
            ownerId,
            subAdminId: item,
            messageTitle,
            Role,
          }));
          await msgdata.insertMany(messageData);
        } else {
          msg = new msgdata({
            ownerId,
            subAdminId,
            messageTitle,
            Role,
          });
          await msg.save();
        }
      } else if (Role === "SUBADMIN") {
        msg = new msgdata({
          ownerId,
          strategyId,
          brokerId,
          // subAdminId,
          messageTitle,
          Role,
        });
        await msg.save();
      }

      return res
        .status(201)
        .send({ status: true, message: "Successfully Created!", data: msg });
    } catch (error) {
      console.error("Error saving message:", error);
      return res.status(500).send({
        status: false,
        message: "Error saving message",
        error: error.message,
      });
    }
  }

  async getMsgData(req, res) {
    try {
      const { ownerId } = req.body;
      if (!ownerId) {
        return res.status(400).json({
          status: false,
          msg: "Please provide ownerId ",
          data: [],
        });
      }

      const getMessages = await msgdata.find({ownerId});

      if (getMessages.length === 0) {
        return res.status(404).json({
          status: false,
          msg: "No messages found for the specified ownerId",
          data: [],
        });
      }
      const pipeline = [
        {
          $lookup: {
            from: "messagedatas",
            localField: "_id",
            foreignField: "ownerId",
            as: "messageDatasResult",
          },
        },
        {
          $unwind: "$messageDatasResult",
        },

        {
          $lookup: {
            from: "users",
            localField: "messageDatasResult.subAdminId",
            foreignField: "_id",
            as: "subadminDetails",
          },
        },
        {
          $unwind: "$subadminDetails",
        },

        {
          $project: {
            "messageDatasResult._id": 1,
            "strategiesDetails.strategy_name": 1,
            "brokerDetails.title": 1,
            "messageDatasResult.messageTitle": 1,
            "messageDatasResult.createdAt": 1,
            "subadminDetails.UserName": 1,
            "subadminDetails._id": 1,
            UserName: 1,
          },
        },
      ];
      const dataFromMongo = await User.aggregate(pipeline);
      res.status(200).json({
        status: true,
        msg: "Messages retrieved successfully",
        data: getMessages,
        data1: dataFromMongo,
      });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({
        status: false,
        msg: "Internal Server Error",
        data: [],
      });
    }
  }

  async deleteMsgData(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res
          .status(400)
          .send({ message: "Message ID is required in the request body" });
      }
      const result = await msgdata.findByIdAndDelete(id);
      if (!result) {
        return res
          .status(404)
          .send({ status: false, message: "Message not found" });
      }
      res.send({ status: true, message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Error deleting message",
        error: error.message,
      });
    }
  }

  async editMsgData(req, res) {
    try {
      const { id, messageTitle } = req.body;
      const existingMsg = await msgdata.findById(id);
      if (!existingMsg) {
        return res
          .status(404)
          .json({ status: false, msg: "Message not found", data: null });
      }
      existingMsg.messageTitle = messageTitle;
      const updatedMsg = await existingMsg.save();
      return res.status(200).json({
        status: true,
        msg: "Message updated successfully",
        data: updatedMsg,
      });
    } catch (error) {
      console.error("Error updating message:", error);
      return res.status(500).json({
        status: false,
        msg: "Error updating message",
        error: error.message,
      });
    }
  }
}
module.exports = new MessageController(); 
