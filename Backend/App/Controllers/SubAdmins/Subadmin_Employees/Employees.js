const express = require("express");
const db = require("../../../Models");
const User_model = db.user;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");

var dateTime = require("node-datetime");
var dt = dateTime.create();

class Employee {
  async allEmployeeData(req, res) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).send({
          status: false,
          msg: "Please enter a valid user ID.",
          data: [],
        });
      }

      const matchStage = {
        $match: {
          parent_id: userId,
          Role: "EMPLOYEE",
        },
      };
      const projectionStage = {
        $project: {
          _id: 1,
          userName: "$UserName",
          email: "$Email",
          fullName: "$FullName",
          clientKey: "$client_key",
          phoneNo: "$PhoneNo",
          broker: "$broker",
          tradingStatus: "$TradingStatus",
          activeStatus: "$ActiveStatus",
          createDate: {
            $dateToString: { format: "%m-%d-%Y", date: "$Create_Date" },
          },
          Role: "$Role",
        },
      };

      const pipeline = [matchStage, projectionStage];
      const results = await User_model.aggregate(pipeline);

      res.send({
        status: true,
        msg: "Data retrieved successfully.",
        data: results,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send({
        status: false,
        msg: "Error fetching data. Please try again later.",
        data: [],
      });
    }
  }

  async addEmployee(req, res) {
    try {
      const {
        FullName,
        Email,
        UserName,
        PhoneNo,
        password,
        parent_id,
        parent_role,
        prifix_key,
      } = req.body;
      const Role = "EMPLOYEE";
     
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
        _id: parent_id,
      });
      if (!existingPrefix) {
        return res.send({ status: false, msg: "Parent Does Not Exist" });
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
      const client_key = existingPrefix.prifix_key + cli_key + ccd;

      const newUser = new User_model({
        // profile_img: profile_img || "",
        FullName:
          FullName + (PhoneNo && PhoneNo.length >= 4 ? PhoneNo.slice(-4) : ""),
        UserName: FullName,
        Email,
        PhoneNo,
        Password: hashedPassword,
        Otp: password,
        Role: Role && Role.toUpperCase(),
        prifix_key:
          existingPrefix.prifix_key && existingPrefix.prifix_key.toUpperCase(),
        client_key,
        parent_role,
        parent_id,
        Is_First_login: "1",
        subadmin_service_type: existingPrefix.subadmin_service_type,
      });

      const savedUser = await newUser.save();

      return res.send({
        status: true,
        msg: "Employee successfully added!",
        data: savedUser,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.send({ status: false, msg: "Internal server error", error });
    }
  }

  async DeleteEmployee(req, res) {
    try {
      const { id } = req.body;
      const objid = new ObjectId(id);

      const user = await User_model.findOne({ _id: objid, Role: "EMPLOYEE" });
      if (!user) {
        return res.status(404).send({
          status: false,
          msg: "User does not exist or is not an employee",
          data: [],
        });
      }

      const deleteResult = await User_model.deleteOne({ _id: objid });

      if (deleteResult.deletedCount === 0) {
        return res.status(500).send({
          status: false,
          msg: "Error deleting user",
          data: [],
        });
      }

      return res.send({
        status: true,
        msg: "User successfully deleted",
        data: [],
      });
    } catch (error) {
      console.error("DeleteEmployee Error:", error);
      return res.status(500).send({
        status: false,
        msg: "Server error during deletion",
        data: [],
      });
    }
  }

  async UpdateEmployee(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).send({
          status: false,
          msg: "Please provide a valid employee ID.",
          data: [],
        });
      }

      const employeeId = new ObjectId(id);
      const existingEmployee = await User_model.findOne({ _id: employeeId });

      if (!existingEmployee) {
        return res.status(404).send({
          status: false,
          msg: "Employee not found",
          data: [],
        });
      }

      const updateObj = {
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        Email: req.body.Email,
        PhoneNo: req.body.PhoneNo,
      };
      if (req.body.Password) {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        updateObj.Password = hashedPassword;
      }

      const updatedEmployee = await User_model.updateOne(
        { _id: employeeId },
        updateObj
      );

      if (updatedEmployee.nModified === 0) {
        return res.status(500).send({
          status: false,
          msg: "Error updating employee",
          data: [],
        });
      }

      return res.send({
        status: true,
        msg: "Employee updated successfully",
        data: [],
      });
    } catch (error) {
      console.error("UpdateUser Error:", error);
      return res.status(500).send({
        status: false,
        msg: "Server error during update",
        data: [],
      });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).send({
          status: false,
          msg: "Please provide a valid employee ID.",
          data: [],
        });
      }
      const employee = await User_model.findOne({ _id: id, Role: "EMPLOYEE" });
      if (!employee) {
        return res.status(404).send({
          status: false,
          msg: "Employee not found.",
          data: [],
        });
      }

      return res.status(200).send({
        status: true,
        msg: "Employee found.",
        data: employee,
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
      return res.status(500).send({
        status: false,
        msg: "Error fetching employee data. Please try again later.",
        data: [],
      });
    }
  }

  async UpdateEmployeeStatus(req, res) {
    try {
      const { id, activeStatus } = req.body;
      const get_user = await User_model.find({ _id: id });
      if (get_user.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }

      const filter = { _id: id };
      const updateOperation = { $set: { ActiveStatus: activeStatus } };
      const result = await User_model.updateOne(filter, updateOperation);

      if (result) {
        // STATUS UPDATE SUCCESSFULLY
        var status_msg = activeStatus == "0" ? "DeActivate" : "Activate";

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
}

module.exports = new Employee();
