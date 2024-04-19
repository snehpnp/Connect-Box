"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const User_model = db.user;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const user_logs = db.user_logs;
const subadmin_logs = db.subadmin_activity_logs;


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

  async TradingOff(req, res) {
    try {
      const { id } = req.body




      var Get_User = await User_model.find({ _id: id }).select('TradingStatus parent_id  Role');
      if (Get_User.length == 0) {
        return res.send({ status: false, msg: "Id Wrong" });
      }


      if (Get_User[0].TradingStatus != "off") {



        if (Get_User[0].Role == "USER") {

          let result = await User_model.findByIdAndUpdate(
            Get_User[0]._id,
            {
              access_token: "",
              TradingStatus: "off"
            })
          const user_login = new user_logs({
            user_Id: Get_User[0]._id,
            trading_status: "Trading Off",
            role: Get_User[0].Role,
            device: "WEB",

          })
          await user_login.save();
          return res.send({ status: true, msg: "Trading Off Successfuly" });




        } else {

          {

            let result = await User_model.findByIdAndUpdate(
              Get_User[0]._id,
              {
                access_token: '',
                TradingStatus: "off"
              })

            if (result != "") {

              const Subadmin_login = new subadmin_logs({
                user_Id: Get_User[0]._id,
                trading_status: "Trading Off",
                role: Get_User[0].Role,
                device: "WEB",

              })
              await Subadmin_login.save();
              if (Subadmin_login) {
                return res.send({ status: true, msg: "Trading Off Successfuly" });


              }
            }

          }

        }







      } else {
        return res.send({ status: false, msg: "Already Trading Off" });

      }

    } catch (error) {
      console.log("Error Alice Login error-", error)
    }
  }


}

module.exports = new Userinfo();