const express = require("express");
const db = require("../../../Models");
const User_model = db.user;
const strategy_model = db.Strategies;
const serviceGroupName = db.serviceGroupName;
const Subadmin_Permission = db.Subadmin_Permission;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");

var dateTime = require("node-datetime");
var dt = dateTime.create();

class Employee {

  // ALL EMPLOYEE GET 
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

      const pipeline = [
        {
          $match: {
            parent_id: userId,
            Role: "EMPLOYEE",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "employee_id",
            as: "Users",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
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
            Users: 1,
          },
        },
      ];

      const results = await User_model.aggregate(pipeline);

      if (results.length > 0) {
        await Promise.all(
          results.map(async (data) => {
            var usernameGet = await User_model.find({
              employee_id: data._id.toString(),
            }).select("UserName");
            data.Users = usernameGet;
          })
        );
      }

      return res.send({
        status: true,
        msg: "Data retrieved successfully.",
        data: results,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).send({
        status: false,
        msg: "Error fetching data. Please try again later.",
        data: [],
      });
    }
  }


  // ADD EMPLOYEE
  async addEmployee(req, res) {
    try {
      const {
        FullName,
        UserName,
        Email,
        PhoneNo,
        password,
        parent_id,
        parent_role,
        Subadmin_permision_data,
        prifix_key,
      } = req.body;
      const Role = "EMPLOYEE";

      const existingEmail = await User_model.findOne({ Email });
      if (existingEmail) {
        return res.send({ status: false, msg: "Email already exists" });
      }

      const existingPhone = await User_model.findOne({ PhoneNo });
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const cli_key = Math.round(1 + Math.random() * (1000000 - 1));
      const ccd = dt.format("ymd");
      const client_key = existingPrefix.prifix_key + cli_key + ccd;

      // Create new user
      const newUser = new User_model({
        FullName: FullName,
        UserName: UserName,
        Email,
        PhoneNo,
        Password: hashedPassword,
        Otp: password,
        Role: Role.toUpperCase(),
        prifix_key: client_key,
        client_key,
        parent_role,
        parent_id,
        Is_First_login: "1",
        subadmin_service_type: existingPrefix.subadmin_service_type,
        employee_id: parent_id,
      });

      // Save the new user
      const savedUser = await newUser.save();

      // Create subadmin permission
      const SubadminPermision = new Subadmin_Permission({
        employee_add: Subadmin_permision_data.employee_add,
        Update_Api_Key: Subadmin_permision_data.Update_Api_Key,
        employee_edit: Subadmin_permision_data.employee_edit,
        detailsinfo: Subadmin_permision_data.detailsinfo,
        license_permision: Subadmin_permision_data.license_permision,
        go_To_Dashboard: Subadmin_permision_data.go_To_Dashboard,
        trade_history_old: Subadmin_permision_data.trade_history_old,
        strategy: Subadmin_permision_data.strategy,
        group_services: Subadmin_permision_data.group_services,
        show_all_users : Subadmin_permision_data.show_all_users,
        show_employee_users : Subadmin_permision_data.show_employee_users,
        user_id: savedUser._id,
      });

      // Save subadmin permission
      await SubadminPermision.save();

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
      const {
        id,
        FullName,
        Email,
        PhoneNo,
        Password,
        Subadmin_permision_data,
        Role,
        parent_id,
        parent_role,
      } = req.body;
      const userId = new ObjectId(id);

      // IF USER ALEARDY EXIST
      const existingUsername = await User_model.findOne({ _id: userId });
      if (!existingUsername) {
        return res.send({
          status: false,
          msg: "Employee Not exists",
          data: [],
        });
      }
      const ByCryptrand_password = await bcrypt.hash(Password, 10);
     
      // Company Information
      const User = {
        FullName: FullName,
        Email: Email,
        PhoneNo: PhoneNo,
        Password: ByCryptrand_password,
        Otp: Password,
        Role: Role.toUpperCase(),
      };

      let subadminUpdate = await User_model.findByIdAndUpdate(
        existingUsername._id,
        User
      );
      var SubadminPermision = {
        employee_add: Subadmin_permision_data.employee_add,
        detailsinfo: Subadmin_permision_data.detailsinfo,
        Update_Api_Key: Subadmin_permision_data.Update_Api_Key,
        employee_edit: Subadmin_permision_data.employee_edit,
        license_permision: Subadmin_permision_data.license_permision,
        go_To_Dashboard: Subadmin_permision_data.go_To_Dashboard,
        trade_history_old: Subadmin_permision_data.trade_history_old,
        strategy: Subadmin_permision_data.strategy,
        group_services: Subadmin_permision_data.group_services,
        show_all_users : Subadmin_permision_data.show_all_users,
        show_employee_users : Subadmin_permision_data.show_employee_users,
      };

      const filter = { user_id: existingUsername._id };

      const updateOperation = { $set: SubadminPermision };

      const result = await Subadmin_Permission.updateOne(
        filter,
        updateOperation
      );

      if (result) {
        return res.send({ status: true, msg: "successfully Edit!", data: [] });
      }
    } catch (error) {
      res.send({ msg: "Error=>", error });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const { id } = req.body;
      var empId = new ObjectId(id);

      if (!empId) {
        return res.status(400).send({
          status: false,
          msg: "Please provide a valid employee ID.",
          data: [],
        });
      }
      const employee = await User_model.aggregate([
        {
          $match: {
            _id: empId,
            Role: "EMPLOYEE",
          },
        },
        {
          $lookup: {
            from: "subadmin_permissions",
            localField: "_id",
            foreignField: "user_id",
            as: "subadmin_permissions",
          },
        },
        {
          $project: {
            subadmin_permissions: 1,
            FullName: 1,
            UserName: 1,
            Email: 1,
            PhoneNo: 1,
            Otp: 1,
            Role: 1,
          },
        },
      ]);
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

  async GetAllStrategyForEmployee(req, res) {
    try {
      const { id } = req.body;

      const getAllstrategy = await strategy_model.find({
        maker_id: id,
      });

      if (getAllstrategy.length == 0) {
        res.send({ status: false, msg: "Empty data", data: getAllstrategy });
      }

      res.send({
        status: true,
        msg: "Get All Startegy",
        data: getAllstrategy,
      });
    } catch (error) {
    }
  }

  // async getAllgroupServices(req, res) {
  //   try {
  //     const pipeline = [
  //       {
  //         $lookup: {
  //           from: "servicegroup_services_ids",
  //           localField: "_id",
  //           foreignField: "Servicegroup_id",
  //           as: "result",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           resultCount: { $size: "$result" },
  //         },
  //       },
  //     ];

  //     const result = await serviceGroupName.aggregate(pipeline);

  //     if (result.length > 0) {
  //       res.send({ status: true, data: result, msg: "Get All successfully" });
  //     } else {
  //       res.send({ status: false, data: [], msg: "false" });
  //     }
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .send({ status: false, data: [], msg: "An error occurred" });
  //   }
  // }

    async getAllgroupServices(req, res) {
      try {
          // Assuming id is in the req.body
          const { id } = req.body;
          // Check if id is provided
          if (!id) {
              return res.status(400).send({ status: false, data: [], msg: "ID is missing in the request body" });
          }

          const pipeline = [
              {
                  $match: {
                    maker_id: new ObjectId(id)
                  }
              },
              {
                  $lookup: {
                      from: "servicegroup_services_ids",
                      localField: "_id",
                      foreignField: "Servicegroup_id",
                      as: "result",
                  },
              },
              {
                  $addFields: {
                      resultCount: { $size: "$result" },
                  },
              },
          ];


          const result = await serviceGroupName.aggregate(pipeline);

          if (result.length > 0) {
              res.send({ status: true, data: result, msg: "Get All successfully" });
          } else {
              res.send({ status: false, data: [], msg: "No data found" });
          }
      } catch (error) {
          console.error("Error in getAllgroupServices:", error);
          res.status(500).send({ status: false, data: [], msg: "An error occurred" });
      }
  }

}

module.exports = new Employee();
