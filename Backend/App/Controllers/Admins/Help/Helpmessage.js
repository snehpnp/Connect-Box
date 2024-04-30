const messageHelpData = require("../../../Models/HelpService.model");
const usermessage = require("../../../Models/HelpServiceUser.model")
const db = require('../../../Models');
const help = db.help


class Helpmessage {
  async subadminhelpmessage(req, res) {
    try {
      let helpmessage = help(req.body);
      let messagedata = await helpmessage.save();
      if (!messagedata) {
        return res.send({ status: false, msg: "message not send ", data: [] });
      }

      return res.send({
        status: true,
        msg: "message send  Successfully.",
        data: messagedata,
      });
    } catch (error) {
      console.error("internal error:", error);
    }
  }

  // getting subadmin help  data
  async getsubadminhelpmessage(req, res) {
    try {

      let messagedata = await help.find({ Role: "SUBADMIN" });
      if (!messagedata) {
        return res.send({ status: false, msg: "message not getting", data: [] });
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


  /// delete subadmin help data
  async getsubadmindelete(req, res) {
    const { id } = req.body;


    try {
      // Assuming the message ID is passed as a route parameter
      const messagedata = await help.findByIdAndDelete(id)
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


  // post user help data
  async userhelpmessage(req, res) {
    try {
      let helpmessage = help(req.body);
      let messagedata = await helpmessage.save();
      if (!messagedata) {
        return res.send({ status: false, msg: "message not send ", data: [] });
      }

      return res.send({
        status: true,
        msg: "message send  Successfully.",
        data: messagedata,
      });
    } catch (error) {
      console.error("internal error:", error);
    }
  }



  /// getting user help data
  async getuserhelpdata(req, res) {
    try {

      let messagedata = await help.find({ Role: "USER" });
      if (!messagedata) {
        return res.send({ status: false, msg: "message not getting", data: [] });
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


  // for comapre to prefic compare   userdataByPrefix
  async userdataByPrefix(req, res) {
    try {
      const { prifix_key } = req.body;

      if (!prifix_key) {
        return res.status(400).send({ status: false, msg: "Prefix key not provided" });
      }

      let messagedata = await help.find({ Role: "USER", prifix_key: prifix_key });

      if (!messagedata || messagedata.length === 0) {
        return res.send({ status: false, msg: "No messages found", data: [] });
      }

      return res.send({
        status: true,
        msg: "Messages retrieved successfully.",
        data: messagedata,
      });
    } catch (error) {
      console.error("Internal error:", error);
      return res.status(500).send({ status: false, msg: "Internal server error" });
    }
  }




  // delete id by user data 
  async getuserdelete(req, res) {
    const { id } = req.body;

    // console.log("hello")
    try {
      // Assuming the message ID is passed as a route parameter
      const messagedata = await help.findByIdAndDelete(id)
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



  // getting subadmin help  data
  async getsubadminhelpmessage(req, res) {
    try {

      let messagedata = await help.find({ Role: "SUBADMIN" });
      if (!messagedata) {
        return res.send({ status: false, msg: "message not getting", data: [] });
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

}




module.exports = new Helpmessage();
