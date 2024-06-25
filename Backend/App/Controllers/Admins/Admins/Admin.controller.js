"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../../../Models");
const User_model = db.user;
const Company_info = db.company_information;

const ApiCreateInfo = db.api_create_info;

const { firstOptPass } = require("../../../Helpers/Email_formate/first_login");

var dateTime = require("node-datetime");
var dt = dateTime.create();

class Admin {
  // USER ADD
  async AddAdmin(req, res) {
    try {
      const {
        FullName,
        UserName,
        Email,
        PhoneNo,
        license_type,
        licence,
        broker,
        parent_id,
        parent_role,
        api_secret,
        app_id,
        client_code,
        api_key,
        app_key,
        api_type,
        demat_userid,
        password,
      } = req.body;

      var Role = "ADMIN";
      var StartDate1 = "";
      var EndDate1 = "";

      if (!FullName) {
        return res.send({
          status: false,
          msg: "FullName is requires!",
          data: [],
        });
      }

      if (!UserName) {
        return res.send({
          status: false,
          msg: "UserName is requires!",
          data: [],
        });
      }

      if (!Email) {
        return res.send({
          status: false,
          msg: "FullName is requires!",
          data: [],
        });
      }

      if (!PhoneNo) {
        return res.send({
          status: false,
          msg: "FullName is requires!",
          data: [],
        });
      }

      // IF USER ALEARDY EXIST
      const existingUser = await User_model.findOne({
        $or: [{ UserName: UserName }, { Email: Email }, { PhoneNo: PhoneNo }],
      });

      if (existingUser) {
        if (existingUser.UserName === UserName) {
          return res.send({
            status: false,
            msg: "Username already exists",
            data: [],
          });
        }

        if (existingUser.Email === Email) {
          return res.send({
            status: false,
            msg: "Email already exists",
            data: [],
          });
        }

        if (existingUser.PhoneNo === PhoneNo) {
          return res.send({
            status: false,
            msg: "Phone Number already exists",
            data: [],
          });
        }
      }

      // const min = 1;
      // const max = 1000000;
      // const rand = min + Math.random() * (max - min);
      // var rand_password = Math.round(rand);
      var rand_password = Math.round(password);

      const salt = await bcrypt.genSalt(10);
      var ByCryptrand_password = await bcrypt.hash(
        rand_password.toString(),
        salt
      );

      // Panel Prifix key Find
      var Panel_key = await Company_info.find(
        {},
        { prefix: 1, licenses: 1, _id: 0 }
      ).limit(1);
      if (Panel_key.length == 0) {
        return res.send({
          status: false,
          msg: "client Prefix Key not exist.",
          data: [],
        });
      }

      const mins = 1;
      const maxs = 1000000;
      const rands = mins + Math.random() * (maxs - mins);
      var cli_key = Math.round(rands);

      var ccd = dt.format("ymd");
      var client_key = Panel_key[0].prefix + cli_key + ccd;

      User_model.insertMany([
        {
          FullName: FullName,
          UserName: UserName,
          Email: Email,
          PhoneNo: PhoneNo,
          Password: ByCryptrand_password,
          Otp: rand_password,
          StartDate: StartDate1,
          EndDate: EndDate1,
          Role: Role.toUpperCase(),
          license_type: license_type,
          licence: licence,
          client_key: client_key,
          prifix_key: Panel_key[0].prefix,
          parent_id: parent_id,
          parent_role: parent_role,
          api_secret: api_secret,
          app_id: app_id,
          client_code: client_code,
          api_key: api_key,
          app_key: app_key,
          broker: broker == null || "" || undefined ? 0 : broker,
          api_type: api_type,
          demat_userid: demat_userid,
        },
        // Add more documents if needed
      ])
        .then(async (data) => {
          var User_id = data[0]._id;

          var toEmail = Email;
          var subjectEmail = "User ID and Password";
          var email_data = {
            FullName: FullName,
            Email: Email,
            Password: rand_password,
            user_type:
              license_type == 2
                ? "Live Account"
                : license_type == 0
                ? "2 Days Free Live Account"
                : "Free Demo Account",
          };

          res.send({
            status: true,
            msg: "successfully Add!",
            data: { _id: User_id },
          });
          var EmailData = await firstOptPass(email_data);
          CommonEmail(toEmail, subjectEmail, EmailData);
        })
        .catch((err) => {
          console.log("Error  Add Time Error-", err);
          if (err.keyValue) {
            return res.send({
              status: false,
              msg: "Key duplicate",
              data: err.keyValue,
            });
          }
        });
    } catch (error) {
      res.send({ msg: "Error=>", error });
    }
  }

  async GetAll_Broker_details(req, res) {
    try {
      // THEME LIST DATA
      const getAllpanel = await ApiCreateInfo.find({
        active_status: "1",
      }).select("title  broker_id _id ");

      // IF DATA NOT EXIST
      if (getAllpanel.length == 0) {
        res.send({ status: false, msg: "Empty data", data: getAllpanel });
      }

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get All Api Info",
        data: getAllpanel,
      });
    } catch (error) {
      console.log("Error Get all Info error-", error);
    }
  }

  async GetAll_Broker(req, res) {
    try {
      // THEME LIST DATA
      const getAllpanel = await ApiCreateInfo.find({});

      // IF DATA NOT EXIST
      if (getAllpanel.length == 0) {
        res.send({ status: false, msg: "Empty data", data: getAllpanel });
      }

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get All Api Info",
        data: getAllpanel,
      });
    } catch (error) {
      console.log("Error Get all Info error-", error);
    }
  }


  

  async GetApi_key(req, res) {
    try {
      const { parent_id } = req.body;

      const parent = await User_model.findOne({
        _id: new ObjectId(parent_id),
      }).select("api_key");

      res.send({
        status: true,
        msg: "Get Api Info",
        data: parent,
      });
    } catch (error) {
      console.log("Error Get all Info error-", error);
      res
        .status(500)
        .send({
          status: false,
          msg: "Internal Server Error",
          error: error.message,
        });
    }
  }
}

module.exports = new Admin();
