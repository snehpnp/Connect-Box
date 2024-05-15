const db = require("../../Models");
const user = db.user;


const Role_model = db.role;
const Strategie_modal = db.Strategies;
const strategy_client = db.strategy_client;
const strategy_transaction = db.strategy_transaction;
const Activity_logs = db.Activity_logs;
const Company_info = db.company_information;
const groupService_User = db.group_services;
const client_services = db.client_service;
const serviceGroup_services_id = db.serviceGroup_services_id;
const count_licenses = db.count_licenses;
const strategy = db.strategy;
const serviceGroupName = db.serviceGroupName;
const Client_group_Service = db.group_services;


const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class superadmin {
  // getting admin data in superadmin data
  async superadminPanel(req, res) {
    try {
      let messagedata = await user.find({ Role: "ADMIN" });
      if (!messagedata) {
        return res.send({
          status: false,
          msg: "message not getting",
          data: [],
        });
      }

      return res.send({
        status: true,
        msg: "getting message  Successfully.",
        data: messagedata,
      });
    } catch (error) {
      console.error("internal error:", error);
    }
  }

  // add admin data or update

  async addAdminandupdate(req, res) {
    try {
      const { _id, Balance, parent_id } = req.body;

      const get_user = await user.find({ _id: _id, Role: "ADMIN" });

      if (get_user.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }
      const filter = { _id: _id };
      const updatedBalance =
        isNaN(get_user[0].Balance) || get_user[0].Balance === ""
          ? Number(Balance)
          : Number(Balance) + Number(get_user[0].Balance);

      const updateOperation = {
        $set: { Balance: updatedBalance },
      };

      const result = await user.updateOne(filter, updateOperation);

      const count_licenses_add = new count_licenses({
        user_id: _id,
        Role: "ADMIN",
        admin_id: parent_id,
        Balance: Balance,
        Mode: "CASH",
      });
      await count_licenses_add.save();

      if (!result) {
        return res.send({ status: false, msg: "Data not updated", data: [] });
      }

      return res.send({
        status: true,
        msg: "Data updated",
        data: result,
      });
    } catch (error) {
      console.error("Internal error:", error);
      return res
        .status(500)
        .send({ status: false, msg: "Internal server error" });
    }
  }




  // get history of admin AdminHistory
  async AdminHistory(req, res) {
    try {
      const { _id } = req.body;
      let messagedata = await count_licenses.find({
        admin_id: _id,
        Role: "ADMIN",
      });
      if (!messagedata || messagedata.length === 0) {
        return res.send({ status: false, msg: "Message not found", data: [] });
      }

      return res.send({
        status: true,
        msg: "Successfully retrieved messages.",
        data: messagedata,
      });
    } catch (error) {
      console.error("Internal error:", error);
      return res
        .status(500)
        .send({ status: false, msg: "Internal server error" });
    }
  }



  /// getting subadmin detail
  async subadmindetail(req, res) {
    try {
      let messagedata = await user.find({ Role: "SUBADMIN" });
      if (!messagedata) {
        return res.send({
          status: false,
          msg: "message not getting",
          data: [],
        });
      }

      return res.send({
        status: true,
        msg: "getting message  Successfully.",
        data: messagedata,
      });
    } catch (error) {
      console.error("internal error:", error);
    }
  }


  // update a user  data

async updateUserdetail(req, res) {
  try {
    const data = req.body;
    const _id = req.body._id;

   
    const uniqueFields = ['Email','username', 'phoneNo'];
    for (let field of uniqueFields) {
      if (data[field]) {
        const exists = await user.findOne({
          [field]: data[field],
          _id: { $ne: _id } 
        });
        if (exists) {
          return res.send({
            status: false,
            msg: `'${data[field]}'already exists in data`,
            field: field,
            value: data[field]
          });
        }
      }
    }

    const filter = { _id: _id };
    const updateOperation = { $set: data };
    const result = await user.updateOne(filter, updateOperation);

    if (result.matchedCount === 0) {
      return res.send({
        status: false,
        msg: "No user found with the provided ID.",
        data: []
      });
    }

    if (result.modifiedCount === 0) {
      return res.send({
        status: true,
        msg: " data already up-to-date.",
        data: result
      });
    }

    return res.send({
      status: true,
      msg: "User updated successfully.",
      data: result
    });
  } catch (error) {
    console.error("Internal error:", error);
    return res.send({
      status: false,
      msg: "Internal server error",
      error: error.message
    });
  }
}












  ///  delete user by id

  async deleteUser(req, res) {
    const { _id } = req.body;
    try {
      let useId = new ObjectId(_id)
      const messagedata = await user.deleteOne({ _id: useId });
      const deleteResult1 = await client_services.deleteMany({ user_id: useId });
      const deleteResult2 = await Client_group_Service.deleteMany({
        user_id: useId,
      });
      const deleteResult3 = await strategy_client.deleteMany({ user_id: useId });
      const deleteResult4 = await strategy_transaction.deleteMany({
        user_id: useId,
      });
      const deleteResult5 = await count_licenses.deleteMany({ user_id: useId });

      if (!messagedata) {
        return res.send({ status: false, msg: "message not deletd", data: [] });
      }

      return res.send({
        status: true,
        msg: " message  deleted.",
        data: messagedata,
      });
    } catch (error) {
      console.error("internal error:", error);
    }
  }
}

module.exports = new superadmin();
