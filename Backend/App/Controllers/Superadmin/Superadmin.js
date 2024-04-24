const db = require("../../Models");
const user = db.user;
const count_licenses = db.count_licenses;

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
}

module.exports = new superadmin();
