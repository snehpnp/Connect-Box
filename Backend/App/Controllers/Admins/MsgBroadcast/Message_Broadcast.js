const db = require("../../../Models");
const User = db.user;
const Strategies = db.Strategies;
const msgdata = db.msgdata;
const api_create_info = db.api_create_info;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class MessageController {
  async createMessage(req, res) {
    try {
      const { Role, ownerId, subAdminId, messageTitle, status } = req.body;
      if (!ownerId || !messageTitle) {
        return res.status(400).send("ownerId and messageTitle are required");
      }
      if (Array.isArray(subAdminId)) {
        for (const item of subAdminId) {
          const subAdminId = item;

          const msg = new msgdata({
            ownerId,
            subAdminId,
            messageTitle,
            Role,
            status,
          });
          const userData = await User.findOne({ _id: ownerId });
          const result = await msg.save();
        }
      } else {
        const msg = new msgdata({
          ownerId,
          subAdminId: [subAdminId],
          messageTitle,
          Role,
          status,
        });
        const userData = await User.findOne({ _id: ownerId });
        const result = await msg.save();
      }
      return res.status(201).send("Successfully Created!");
    } catch (error) {
      console.error("Error saving message:", error);
      return res.status(500).send("Internal Server Error");
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

      const getMessages = await msgdata.find({ ownerId });

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
            "messageDatasResult.messageTitle": 1,
            "messageDatasResult.createdAt": 1,
            "subadminDetails.UserName": 1,
            UserName: 1,
          },
        },
      ];

      const dataFromMongo = await User.aggregate(pipeline);

      // console.log("dataFromMongo",dataFromMongo)

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
  
}

module.exports = new MessageController();
