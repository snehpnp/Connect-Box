"use strict";
const bcrypt = require("bcrypt");
const db = require("../../../Models");
const User_model = db.user;
const Role_model = db.role;
const SubAdminCompanyInfo = db.SubAdminCompanyInfo;


var dateTime = require("node-datetime");
var dt = dateTime.create();

const count_licenses = db.count_licenses;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Product CLASS
class Subadmin {
  // ADD SUBAMDIN
  async AddSubadmin(req, res) {
    try {
      const {
        profile_img,
        FullName,
        Email,
        PhoneNo,
        password,
        prifix_key,
        subadmin_service_type,
        strategy_Percentage,
        Per_trade,
        parent_id,
        parent_role,
        Balance,
      } = req.body;

      const Role = "SUBADMIN";

      if (prifix_key.length > 3) {
        return res.send({ status: false, msg: "prifix_key Omly 3 Digits" });
      }

      // Check if role exists
      const roleCheck = await Role_model.findOne({ name: Role.toUpperCase() });
      if (!roleCheck) {
        return res.send({ status: false, msg: "Role does not exist" });
      }

      // Check if username, email, phone number, and prefix key already exist
      const existingUsername = await User_model.findOne({
        UserName:
          FullName + (PhoneNo && PhoneNo.length >= 4 ? PhoneNo.slice(-4) : ""),
        prifix_key,
      });
      if (existingUsername) {
        return res.send({ status: false, msg: "Username already exists" });
      }

      const existingEmail = await User_model.findOne({ Email, prifix_key });
      if (existingEmail) {
        return res.send({ status: false, msg: "Email already exists" });
      }

      const existingPhone = await User_model.findOne({ PhoneNo, prifix_key });
      if (existingPhone) {
        return res.send({ status: false, msg: "Phone number already exists" });
      }

      const existingPrefix = await User_model.findOne({
        Role: "SUBADMIN",
        prifix_key,
      });
      if (existingPrefix) {
        return res.send({ status: false, msg: "Prefix key already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      let hashedPassword;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password.toString(), salt);
      }

      // Generate client key
      const mins = 1;
      const maxs = 1000000;
      const randNum = mins + Math.random() * (maxs - mins);
      const cli_key = Math.round(randNum);
      const ccd = dt.format("ymd");
      const client_key = prifix_key + cli_key + ccd;

      // Create new user instance
      const newUser = new User_model({
        profile_img: profile_img || "",
        FullName:
          FullName + (PhoneNo && PhoneNo.length >= 4 ? PhoneNo.slice(-4) : ""),
        UserName: FullName,
        Email,
        PhoneNo,
        Password: hashedPassword,
        Otp: password,
        Role: Role && Role.toUpperCase(),
        prifix_key: prifix_key && prifix_key.toUpperCase(),
        client_key,
        parent_role,
        parent_id,
        Is_First_login: "1",
        subadmin_service_type,
        strategy_Percentage,
        Per_trade,
        Balance,
      });

      // Save new user and count licenses
      const savedUser = await newUser.save();
      const count_licenses_add = new count_licenses({
        user_id: savedUser._id,
        Role: "SUBADMIN",
        admin_id: parent_id,
        Balance,
        Mode:"CASH"
      });
      await count_licenses_add.save();

      const Subadmin_company = new SubAdminCompanyInfo({
        maker_id: savedUser._id,
      });

      await Subadmin_company.save();

      return res.status(200).send({
        status: true,
        msg: "Successfully added!",
        data: { UserId: savedUser.user_id },
      });
    } catch (error) {
      console.error("Error:", error);
      return res.send({ msg: "Internal server error", error });
    }
  }

  // EDIT SUBADMIN
  async EditSubadmin(req, res) {
    try {
      const {
        id,
        profile_img,
        FullName,
        Email,
        PhoneNo,
        password,
        subadmin_service_type,
        strategy_Percentage,
        Per_trade,
        parent_id,
        parent_role,
        Balance,
      } = req.body;



      const existingUsername = await User_model.findOne({ _id: id });
      if (!existingUsername) {
        return res.send({ status: false, msg: "User Not exists", data: [] });
      }

      // Company Information
      const User = {
        FullName: FullName,
        subadmin_service_type: subadmin_service_type,
        strategy_Percentage: strategy_Percentage,
        Per_trade: Per_trade,
      };
      let subadminUpdate = await User_model.findByIdAndUpdate(
        existingUsername._id,
        User
      );
      return res.send({ status: true, msg: "successfully Edit!", data: [] });
    } catch (error) {
      res.send({ msg: "Error=>", error });
    }
  }

  async getallSubadmin(req, res) {
    try {
      // GET LOGIN CLIENTS
      const getAllSubAdmins = await User_model.find({
        Role: "SUBADMIN",
      }).select(
        "profile_img FullName UserName Email PhoneNo ActiveStatus Balance prifix_key subadmin_service_type strategy_Percentage Per_trade Create_Date"
      ).sort({ Create_Date: -1 });

      const totalCount = getAllSubAdmins.length;
      const ActiveCount = getAllSubAdmins.filter(
        (subadmin) => subadmin.ActiveStatus === "1"
      ).length;

      const ActiveUseBalance = getAllSubAdmins.reduce(
        (totalBalance, subadmin) => {
          return totalBalance + parseFloat(subadmin.Balance || 0);
        },
        0
      );

      // IF DATA NOT EXIST
      if (getAllSubAdmins.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
          totalCount: totalCount,
        });
      }

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get All Subadmins",
        data: getAllSubAdmins,
        totalCount: totalCount,
        ActiveCount: ActiveCount,
        InActiveCount: Number(totalCount) - Number(ActiveCount),
        ActiveUseBalance: ActiveUseBalance,
      });
    } catch (error) {
      console.log("Error getallSubadmin error -", error);
    }
  }

  async getOneSubadmin(req, res) {
    try {
      const { id } = req.body;
      var subid = new ObjectId(id);

      if (id == "" || id == null) {
        return res.send({ status: false, msg: "Please Enter Id", data: [] });
      }

      const getAllSubAdmins = await User_model.find({ _id: subid });

      // IF DATA NOT EXIST
      if (getAllSubAdmins.length == 0) {
        return res.send({ status: false, msg: "Empty data", data: [] });
      }

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get User",
        data: getAllSubAdmins,
      });
    } catch (error) {
      console.log("Error get Subadmin error -", error);
    }
  }

  async getallSubadminClients(req, res) {
    try {
      // GET LOGIN CLIENTS
      const getAllSubAdmins = await User_model.find({
        parent_role: "SUBADMIN",
        license_type: "2",
        Is_Active: "0",
      });
      const totalCount = getAllSubAdmins.length;

      // IF DATA NOT EXIST
      if (getAllSubAdmins.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
          totalCount: totalCount,
        });
      }

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get All Subadmins",
        data: getAllSubAdmins,
        totalCount: totalCount,
      });
    } catch (error) {
      console.log("Error getallSubadmin error -", error);
    }
  }

  async GetAllRechargeDetails(req, res) {
    try {
      const { Role } = req.body;

      if (!Role) {
        return res.send({
          status: false,
          msg: "Role is required in the request body",
        });
      }

      const rechargeDetails = await count_licenses.aggregate([
        {
          $match: { Role },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 1,
            Balance: 1,
            Role: 1,
            Mode:1,
            createdAt: 1,

            username: "$user.UserName",
          },
        },
      ]);

      res.send({
        status: true,
        msg: "Recharge details fetched successfully",
        data: rechargeDetails,
      });
    } catch (error) {
      console.error("Error while fetching recharge details:", error);
      res.send({ status: false, msg: "Internal Server Error" });
    }
  }

  async UpdateActiveStatusSubadmin(req, res) {
    try {
      const { id, user_active_status } = req.body;
      // UPDATE ACTTIVE STATUS CLIENT
      const get_user = await User_model.find({ _id: id });
      if (get_user.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }

      const filter = { _id: id };
      const updateOperation = { $set: { ActiveStatus: user_active_status } };
      const result = await User_model.updateOne(filter, updateOperation);

      if (result) {
        // STATUS UPDATE SUCCESSFULLY
        var status_msg = user_active_status == "0" ? "DeActivate" : "Activate";

        res.send({
          status: true,
          msg: "Update Successfully",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error trading status Error-", error);
    }
  }

  async AddBalanceSubadmin(req, res) {
    try {
      const { id, Balance, parent_id } = req.body;
      // UPDATE ACTTIVE STATUS CLIENT

      const get_user = await User_model.find({ _id: id, Role: "SUBADMIN" });

      if (get_user.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }
      const filter = { _id: id };
      const updatedBalance =
        isNaN(get_user[0].Balance) || get_user[0].Balance === ""
          ? Number(Balance)
          : Number(Balance) + Number(get_user[0].Balance);

      const updateOperation = {
        $set: { Balance: updatedBalance },
      };

     
      const result = await User_model.updateOne(filter, updateOperation);

      if (result) {
        const count_licenses_add = new count_licenses({
          user_id: get_user[0],
          Role: "SUBADMIN",
          admin_id: parent_id,
          Balance:Balance,
          Mode:"CASH"
        });
        await count_licenses_add.save();

        res.send({
          status: true,
          msg: "Update Successfully",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error trading status Error-", error);
    }
  }


  async getallSubadminName(req, res) {
    try {
      // GET LOGIN CLIENTS
      const getAllSubAdmins = await User_model.find({
        Role: "SUBADMIN",
      }).select(
        "UserName"
      );


      // IF DATA NOT EXIST
      if (getAllSubAdmins.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get All Subadmins",
        data: getAllSubAdmins,
    
      });
    } catch (error) {
      console.log("Error getallSubadmin error -", error);
    }
  }



}

module.exports = new Subadmin();
