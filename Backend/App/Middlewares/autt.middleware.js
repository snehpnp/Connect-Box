const jwt = require("jsonwebtoken");
const db = require("../Models");
const User_model = db.user;

verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      message: "No token provided!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User_model.findById(decoded.id).select("web_login_token app_login_token");

    if (!user || user.web_login_token !== token) {
      return res.send({
        status: false,
        msg: "Unauthorized!",
        data: [],
      });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.send({
      status: false,
      msg: "Unauthorized!",
      data: [],
    });
  }
};

module.exports = { verifyToken };
