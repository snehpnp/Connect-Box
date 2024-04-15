"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const User_model = db.user;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Product CLASS
class Userinfo {


  async getDematCredential(req, res) {
    try {
      const { id } = req.body;
      var subid = new ObjectId(id);

      if (id == "" || id == null) {
        return res.send({ status: false, msg: "Please Enter Id", data: [] });
      }

      const UserInfo = await User_model.find({ _id: subid }).select('broker api_secret TradingStatus app_id api_key app_key api_type demat_userid ')

      // IF DATA NOT EXIST
      if (UserInfo.length == 0) {
        return res.send({ status: false, msg: "Empty data", data: [] });
      }

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get User",
        data: UserInfo,
      });
    } catch (error) {
      console.log("Error get UserInfo error -", error);
    }
  }


}

module.exports = new Userinfo();
