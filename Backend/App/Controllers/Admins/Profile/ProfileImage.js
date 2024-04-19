const db = require("../../../Models");
const user = db.user;
//ProfileImagedata

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
}

module.exports = new profile();
