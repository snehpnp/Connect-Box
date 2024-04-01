
module.exports = function (app) {
    // Auth Route
    app.use(require("./Auth/Auth.routes"));
    app.use(require("./Admin/Subadmin.routes"));
    app.use(require("./Admin/Admin.routes"));
    app.use(require("./Admin/message.routes"))

    app.use(require("./SubAdmins/Strategy.routes"));
    app.use(require("./SubAdmins/GroupServices.routes"));
    app.use(require("./SubAdmins/User.routes"))
    



};