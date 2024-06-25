const db = require("../../../Models");
const user = db.user;
const ProfileInfo = db.ProfileInfo;
// const subadmin_logs = db.subadmin_activity_logs;
const user_logs = db.user_activity_logs;

class profile {
  async ProfileImagedata(req, res) {
    try {
      const { user_id, profile_img } = req.body;

      if (!profile_img) {
        return res
          .status(400)
          .send({ status: false, msg: "Profile not Match" });
      }
      let messagedata = await user.findByIdAndUpdate(
        user_id,
        {
          profile_img: profile_img,
        },
        { new: true }
      );

      if (!messagedata || messagedata.length === 0) {
        return res.send({ status: false, msg: "No Profile found", data: [] });
      }

      return res.send({
        status: true,
        msg: "Profil Match",
        data: messagedata,
      });
    } catch (error) {
      console.error("Internal error:", error);
      return res
        .status(500)
        .send({ status: false, msg: "Internal server error" });
    }
  }

  /// aadition information

  async updateProfile(req, res) {
    try {
      const data = req.body;
      const user_Id = req.body.user_Id;

      const filter = { user_Id: user_Id };
      const updateOperation = { $set: data };
      const result = await ProfileInfo.updateOne(filter, updateOperation, {
        upsert: true,
      });

      if (!result) {
        return res.send({ status: false, msg: "data not Updated", data: [] });
      }

      return res.send({
        status: true,
        msg: " data Updated",
        data: result,
      });
    } catch (error) {
      console.error("internal error:", error);
    }
  }

  ///  match profile id for additional info

  async profileId(req, res) {
    try {
      const { user_id } = req.body;

      if (!user_id) {
        return res
          .status(400)
          .send({ status: false, msg: "user_id is not found " });
      }

      let messagedata = await ProfileInfo.find({ user_Id: user_id });

      if (!messagedata || messagedata.length === 0) {
        return res.send({ status: false, msg: "getting info", data: [] });
      }

      return res.send({
        status: true,
        msg: "get info",
        data: messagedata,
      });
    } catch (error) {
      console.error("Internal error:", error);
      return res
        .status(500)
        .send({ status: false, msg: "Internal server error" });
    }
  }

  // active status

  async Profilestatus(req, res) {
    try {
      const { _id, role, createdAt } = req.body;

      if (!_id && !role && !createdAt) {
        return res.status(400).send({ status: false, msg: "ID NOT FOUND" });
      }

      let messagedata = await user_logs.find({ user_Id: _id }).sort({createdAt:-1})

      if (!messagedata || messagedata.length === 0) {
        return res.send({
          status: false,
          msg: "No messages found",
          data: [],
        });
      }

      return res.send({
        status: true,
        msg: " DATA FOUND .",
        data: messagedata,
      }); cd

    } catch (error) {
      console.error("Internal error:", error);
      return res
        .status(500)
        .send({ status: false, msg: "Internal server error" });
    }
  }



  
  async GetParentType(req , res){
    try{
      const {id , Role} = req.body;
      
      if(!id){
        return res.send({status :false , msg:"Empty user Id", data :[]})
      }
      const findData = await user.find({_id :id})
      if(!findData){
        return res.send({status : false , msg: "Invalid user Id" , data: []})
      }

      if(findData[0].Role=='ADMIN'){
      return res.send({status :false , msg:"This is admin" , data :[]})
      }

      const findData1 = await user.find({_id :findData[0].parent_id})
      return res.send({status :true , msg:"get Parent Name Successfully" , data :findData1[0].UserName})

    }
    catch(error){
      console.log("Eror to fatching the Parent Name", error)
      return res.send({status:false, msg:"Internal server error" , data: []})
    }

  }
}

module.exports = new profile();
