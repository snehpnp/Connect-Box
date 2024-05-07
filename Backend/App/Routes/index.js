
module.exports = function (app) {
    // Auth Route
    app.use(require("./Auth/Auth.routes"));
    app.use(require("./Admin/Subadmin.routes"));
    app.use(require("./Admin/Admin.routes"));
    app.use(require("./Admin/message.routes"))
    app.use(require("./SubAdmins/Strategy.routes"));
    app.use(require("./SubAdmins/GroupServices.routes"));
    app.use(require("./SubAdmins/User.routes"))
    app.use(require("./SubAdmins/Order.routes"))


    app.use(require("./Users/Clientservices.routes"))
    app.use(require("./SubAdmins/OptionChain.routes"))
   
   
   
    // Comman Route
    app.use(require("./Comman/Userinfo.routes"))
    app.use(require("./Comman/Makecall.routes"))
    app.use(require("./Comman/Brokeraccesstoken.routes"))
    app.use(require("./Comman/Optionchain.routes"))
    app.use(require("./Comman/Activity.routes"))
    app.use(require("./Comman/Createorder.routes"))




    //employee 
    app.use(require("./Employee/Employee.routes"))
    app.use(require("./SuperAdmin/SuperAdmin.routes"))
    app.use(require("./Researcher/Researcher.routes"))


    //user
    app.use(require('./Users/Broker_Response.routes'))
    //faq
    // app.use(require("./Comman/FAQ.routes"))

};