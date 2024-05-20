const jwt = require("jsonwebtoken");
const db = require("../Models");
const User_model = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {


        var UserToken = await User_model.find({ _id: decoded.id }).select('web_login_token app_login_token')

        if (UserToken[0].web_login_token != token) {
            return res.send({
                status: false,
                msg: "Unauthorized!",
                data: [],
            });
        }

        if (err) {
            return res.send({
                status: false,
                msg: "Unauthorized!",
                data: [],
            });
        }
        req.userId = decoded._id;
        next();
    });
};

module.exports = { verifyToken }