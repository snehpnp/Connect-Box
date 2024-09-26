"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const User_model = db.user;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const user_logs = db.user_activity_logs;
const strategy_transaction = db.strategy_transaction;
const user_wallet = db.User_Wallet;
const count_licenses = db.count_licenses;

// Product CLASS
class Userinfo {
  async getDematCredential(req, res) {
    try {
      const { id } = req.body;
      var subid = new ObjectId(id);

      if (id == "" || id == null) {
        return res.send({ status: false, msg: "Please Enter Id", data: [] });
      }

      let UserInfo = await User_model.find({ _id: subid }).select(
        "Role parent_id broker api_secret TradingStatus app_id api_key app_key api_type demat_userid access_token stock_fund"
      );

      // IF DATA NOT EXIST
      if (UserInfo.length == 0) {
        return res.send({ status: false, msg: "Empty data", data: [] });
      }

      if (UserInfo[0].Role == "USER" && UserInfo[0].broker == "2") {
        const ParentInfo = await User_model.findOne({
          _id: UserInfo[0].parent_id,
        }).select(
          "Role parent_id broker api_secret TradingStatus app_id api_key app_key api_type demat_userid access_token stock_fund"
        );

        UserInfo[0].api_key = ParentInfo.api_key;

        // DATA GET SUCCESSFULLY
        return res.send({
          status: true,
          msg: "Get User",
          data: UserInfo,
        });
      } else {
        // DATA GET SUCCESSFULLY
        return res.send({
          status: true,
          msg: "Get User",
          data: UserInfo,
        });
      }
    } catch (error) {
      console.log("Error get UserInfo error -", error);
    }
  }

  async TradingOff(req, res) {
    try {
      const { id, system_ip } = req.body;

      var Get_User = await User_model.find({ _id: id }).select(
        "TradingStatus parent_id  Role"
      );
      if (Get_User.length == 0) {
        return res.send({ status: false, msg: "Id Wrong" });
      }

      if (Get_User[0].TradingStatus != "off") {
        if (Get_User[0].Role == "USER") {
          let result = await User_model.findByIdAndUpdate(Get_User[0]._id, {
            access_token: "",
            TradingStatus: "off",
          });
          const user_login = new user_logs({
            user_Id: Get_User[0]._id,
            admin_Id: Get_User[0].parent_id,
            trading_status: "Trading Off",
            role: Get_User[0].Role,
            device: "WEB",
            system_ip: system_ip,
          });
          await user_login.save();
          return res.send({ status: true, msg: "Trading Off Successfuly" });
        } else {
          {
            let result = await User_model.findByIdAndUpdate(Get_User[0]._id, {
              access_token: "",
              TradingStatus: "off",
            });

            if (result != "") {
              const Subadmin_login = new user_logs({
                user_Id: Get_User[0]._id,
                trading_status: "Trading Off",
                role: Get_User[0].Role,
                device: "WEB",
                system_ip: system_ip,
              });
              await Subadmin_login.save();
              if (Subadmin_login) {
                return res.send({
                  status: true,
                  msg: "Trading Off Successfuly",
                });
              }
            }
          }
        }
      } else {
        return res.send({ status: false, msg: "Already Trading Off" });
      }
    } catch (error) {
      console.log("Error Alice Login error-", error);
    }
  }

  async Update_User_Broker_Keys(req, res) {
    try {
      var userdata = req.body.req.data;
      var _id = req.body.req.id;

      var findUser = await User_model.find({ _id: new ObjectId(_id) });

      if (!findUser) {
        return res.send({ status: false, msg: "Id not match", data: [] });
      }

      const filter = { _id: _id };
      const updateOperation = { $set: userdata };
      const result = await User_model.updateOne(filter, updateOperation);
      if (!result) {
        return res.send({ status: false, msg: "Key not update", data: [] });
      }

      return res.send({
        status: true,
        msg: "Update Keys  Successfully.",
        data: [],
      });
    } catch (error) {
      console.log("Error Theme error-", error);
    }
  }

  async Get_User_Wallet(req, res) {
    try {
      const data = req.body.req;

      const { id } = data;

      var subid = new ObjectId(id);

      if (id == "" || id == null) {
        return res.send({ status: false, msg: "Please Enter Id", data: [] });
      }

      let UserInfo = await User_model.find({ _id: subid }).select("Balance");
      let UserTransection = await strategy_transaction.find({ user_id: subid });
      let User_Wallet_data = await count_licenses.find({ user_id: subid });

      let combinedData = [...UserTransection, ...User_Wallet_data];
      combinedData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      combinedData = combinedData.map((item) => {
        return {
          createdAt: item.createdAt,
          balance: item.stg_charge || item.Balance,
          user_id: item.user_id,
          typeT: item.stg_charge ? "Debit" : "Credit",
        };
      });

      let UsedBalance = 0;
      UserTransection.map((item) => {
        UsedBalance += parseFloat(item.stg_charge);
      });

      if (UserInfo.length == 0) {
        return res.send({ status: false, msg: "Empty data", data: [] });
      }

      return res.send({
        status: true,
        msg: "Get User",
        TotalBalance: UserInfo[0].Balance,
        UsedBalance: UsedBalance,
        RemaingBalance: UserInfo[0].Balance - UsedBalance,
        UserTransection: combinedData,
      });
    } catch (error) {
      console.log("Error get UserInfo error -", error);
    }
  }
  async Update_Stock_Fund(req, res) {
    try {
      const { userId, stock_fund } = req.body;
      const cache = {};
      const subid = new ObjectId(userId);
  
      if (!userId) {
        return res.send({ status: false, msg: "Please Enter Id", data: [] });
      }
  
      // Check cache first
      if (cache[subid]) {
        console.log("Cache hit for userId:", userId);
        cache[subid].stock_fund = stock_fund; // Update the cached value
        return res.send({
          status: true,
          msg: "Stock Fund Updated in Cache",
          data: cache[subid],
        });
      }
  
      // Fetch user info from the database
      const UserInfo = await User_model.findOne({ _id: subid }).select("stock_fund");
  
      if (!UserInfo) {
        return res.send({ status: false, msg: "Empty data", data: [] });
      }
  
      // Update stock fund
      UserInfo.stock_fund = stock_fund;
  
      // Save to the database
      const result = await User_model.updateOne(
        { _id: subid },
        { stock_fund: stock_fund }
      );
  
      // Update cache with the new stock fund
      cache[subid] = UserInfo;
  
      if (result) {
        return res.send({
          status: true,
          msg: "Stock Fund Updated Successfully",
          data: UserInfo,
        });
      } else {
        return res.send({
          status: false,
          msg: "Stock Fund Not Updated",
          data: [],
        });
      }
    } catch (error) {
      console.log("Error in updating stock fund -", error);
      return res.send({ status: false, msg: "Internal Server Error", data: [] });
    }
  }
}

module.exports = new Userinfo();
