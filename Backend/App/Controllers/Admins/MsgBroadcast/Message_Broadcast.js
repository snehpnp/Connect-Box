const db = require("../../../Models");
const User = db.user;
const Strategies = db.Strategies;
const msgdata = db.msgdata;
const api_create_info = db.api_create_info;
const { Types } = require("mongoose");
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const io = socketIo(server);

class MessageController {

  async createMessage(req, res) {
    try {
      const { Role, ownerId, subAdminId, messageTitle, strategyId, brokerId } = req.body;

      if (!Role || !messageTitle) {
        return res.status(400).json({ error: "Role and messageTitle are required" });
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
          io.emit("message_updated", msg);
        }
      } else if (Role === "SUBADMIN") {
        msg = new msgdata({
          ownerId,
          strategyId :strategyId ? strategyId :null,
          brokerId :brokerId ? brokerId :null,
          messageTitle,
          Role,
        });
        await msg.save();
      }

      return res.status(201).json({ status: true, message: "Successfully Created!", data: msg });
    } catch (error) {
      console.error("Error saving message:", error);
      return res.status(500).json({ status: false, message: "Error saving message", error: error.message });
    }
  }


  async getMsgData(req, res) {
    try {
      const { ownerId, key } = req.body;

      if (!ownerId) {
        return res.status(400).json({
          status: false,
          msg: "Owner ID is required",
          data: [],
        });
      }

      let matchCondition = {};

      if (key === 1) {
        matchCondition = {
          $or: [
            { Role: "SUBADMIN", ownerId: new ObjectId(ownerId) },
            { Role: "ADMIN", subAdminId: { $in: [new ObjectId(ownerId)] } }
          ]
        };
      } else if (key === 2) {
        matchCondition = {
          $or: [
            { Role: "SUBADMIN" },
            { Role: "ADMIN" }
          ]
        };
      } else {
        return res.status(400).json({
          status: false,
          msg: "Invalid role key",
          data: []
        });
      }

      const pipeline = [
        { $match: matchCondition },
        {
          $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "makerInfo",
          },
        },
        { $unwind: "$makerInfo" },
        {
          $addFields: {
            UserName: "$makerInfo.UserName",
          },
        },
        {
          $project: {
            makerInfo: 0,
          },
        },
      ];

      const getMessages = await msgdata.aggregate(pipeline);

      res.send({
        status: true,
        msg: "Messages retrieved successfully",
        data: getMessages,
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
      return res.status(200).json({ status: true, msg: "Message updated successfully", data: updatedMsg });
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
