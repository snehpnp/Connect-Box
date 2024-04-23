const db = require("../../../Models");
const user = db.user;



class superadmin{
 
    // getting admin data in superadmin data 
    async superadminPanel(req, res) {
        try {
          
          let messagedata = await user.find({Role:"ADMIN"});
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

     
   

      // add admin data or update 


      async addAdminandupdate(req, res) {
        try {
          const data = req.body;
          const _id  = req.body._id;
    
          const filter = { Role:"ADMIN",_id: _id};
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





}

module.exports = new superadmin()