
module.exports = function (app) {
    // Auth Route
    app.use(require("./Auth/Auth.routes"));
    app.use(require("./Admin/Subadmin.routes"));
    app.use(require("./Admin/Admin.routes"));


    // app.use(require("./SubAdmins/Strategy.routes"));
    //msg broadcast 

    app.use(require("./Msg_Broadcast/Msg.routes"));



};