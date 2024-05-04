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
          // io.emit("message_updated", msg);
        }
      } else if (Role === "SUBADMIN") {
        msg = new msgdata({
          ownerId,
          strategyId: strategyId ? strategyId : null,
          brokerId: brokerId ? brokerId : null,
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

      // KEY 1 = ADMIN 
      // KEY 2 = SUBADMIN SEND
      // KEY 3 = SUBADMIN SENT
      // KEY 4 = USER RECIVED MESSAGE


      if (key == 1) {
        matchCondition = {
          $or: [
            { Role: "ADMIN" },

          ]
        };



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
            $lookup: {
              from: "users",
              localField: "subAdminId",
              foreignField: "_id",
              as: "makerInfo",
            },
          },
          { $unwind: "$makerInfo" },
          {
            $addFields: {
              FullName: "$makerInfo.UserName",
            },
          },
          {
            $project: {
              makerInfo: 0,
            },
          },
          { $sort: { createdAt: -1 } }
        ];

        const getMessages = await msgdata.aggregate(pipeline);

        return res.send({
          status: true,
          msg: "Messages retrieved successfully",
          data: getMessages,
        });


      } else if (key == 2) {
        matchCondition = {
          $or: [
            { Role: "SUBADMIN", ownerId: new ObjectId(ownerId) }
          ]
        };


        // console.log("HIII")

        const pipeline = [
          { $match: matchCondition },
          {
            $lookup: {
              from: "strategies",
              localField: "strategyId",
              foreignField: "_id",
              as: "makerInfo",
            },
          },
          { $unwind: { path: "$makerInfo", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "api_create_infos",
              localField: "brokerId",
              foreignField: "_id",
              as: "brokerinfo",
            },
          },
          { $unwind: { path: "$brokerinfo", preserveNullAndEmptyArrays: true } },
          {
            $addFields: {
              StrategyName: "$makerInfo.strategy_name",
              BrokerName: "$brokerinfo.title",
            },
          },
          {
            $project: {
              _id: 1,
              Balance: 1,
              Role: 1,
              Mode: 1,
              messageTitle:1,
              createdAt: 1,
              StrategyName: 1,
              BrokerName: 1
            }
          },
          { $sort: { createdAt: -1 } }
        ];
        
        const getMessages = await msgdata.aggregate(pipeline);
        



        return res.send({
          status: true,
          msg: "Messages retrieved successfully",
          data: getMessages,
        });


















      } else if (key == 3) {
        matchCondition = {
          $or: [
            { Role: "ADMIN", subAdminId: new ObjectId(ownerId) }

          ]
        };



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
            $lookup: {
              from: "users",
              localField: "subAdminId",
              foreignField: "_id",
              as: "makerInfo",
            },
          },
          { $unwind: "$makerInfo" },
          {
            $addFields: {
              FullName: "$makerInfo.UserName",
            },
          },
          {
            $project: {
              makerInfo: 0,
            },
          },
          { $sort: { createdAt: -1 } }
        ];

        const getMessages = await msgdata.aggregate(pipeline);

        return res.send({
          status: true,
          msg: "Messages retrieved successfully",
          data: getMessages,
        });


      } else if (key == 4) {
        // matchCondition = {
        //   $or: [
        //     { Role: "ADMIN", subAdminId: new ObjectId(ownerId) }

        //   ]
        // };



        // const pipeline = [
        //   { $match: matchCondition },
        //   {
        //     $lookup: {
        //       from: "users",
        //       localField: "ownerId",
        //       foreignField: "_id",
        //       as: "makerInfo",
        //     },
        //   },
        //   { $unwind: "$makerInfo" },
        //   {
        //     $addFields: {
        //       UserName: "$makerInfo.UserName",
        //     },
        //   },

        //   {
        //     $lookup: {
        //       from: "users",
        //       localField: "subAdminId",
        //       foreignField: "_id",
        //       as: "makerInfo",
        //     },
        //   },
        //   { $unwind: "$makerInfo" },
        //   {
        //     $addFields: {
        //       FullName: "$makerInfo.UserName",
        //     },
        //   },
        //   {
        //     $project: {
        //       makerInfo: 0,
        //     },
        //   },
        //   { $sort: { createdAt: -1 } }
        // ];

        // const getMessages = await msgdata.aggregate(pipeline);

        // return res.send({
        //   status: true,
        //   msg: "Messages retrieved successfully",
        //   data: getMessages,
        // });


      } 



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
        return res.send({ message: "Message ID is required in the request body" });
      }
      const result = await msgdata.findByIdAndDelete(id);
      if (!result) {
        return res.send({ status: false, message: "Message not found" });
      }
      res.send({ status: true, message: "Message deleted successfully" });
    } catch (error) {
      res.send({
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
        return res.json({ status: false, msg: "Message not found", data: null });
      }
      existingMsg.messageTitle = messageTitle;
      const updatedMsg = await existingMsg.save();
      return res.json({ status: true, msg: "Message updated successfully", data: updatedMsg });
    } catch (error) {
      console.error("Error updating message:", error);
      return res.json({
        status: false,
        msg: "Error updating message",
        error: error.message,
      });
    }
  }
}

module.exports = new MessageController();
