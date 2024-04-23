"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../../../Models");
const User_model = db.user;

const Role_model = db.role;
const Strategie_modal = db.Strategies;
const strategy_client = db.strategy_client;
const strategy_transaction = db.strategy_transaction;
const Activity_logs = db.Activity_logs;




const Company_info = db.company_information;
const groupService_User = db.group_services;
const client_services = db.client_service;
const serviceGroup_services_id = db.serviceGroup_services_id;
const count_licenses = db.count_licenses;
const user_activity_logs = db.user_activity_logs;
const strategy = db.strategy;
const serviceGroupName = db.serviceGroupName;
const Client_group_Service = db.group_services;



var dateTime = require("node-datetime");
var dt = dateTime.create();

class Users {

  // USER ADD
  async AddUser(req, res) {
    try {
      const { FullName, UserName, Email, PhoneNo, license_type, licence, fromdate, Strategies, broker, parent_id, api_secret, app_id, client_code, api_key, app_key, api_type, demat_userid, group_service, Service_Type, per_trade_value, Balance } = req.body;

      var Role = "USER";
      var StartDate1 = "";
      var EndDate1 = "";
      let Strategies_id_array = [];




      if (!parent_id || parent_id == '' || parent_id == null) {
        return res.send({
          status: false,
          msg: "Please Enter parent || Maker Id.",
          data: [],
        });
      }


      const SubadminCheck = await User_model.find({ _id: parent_id });

      if (SubadminCheck.length == 0) {
        return res.send({ status: false, msg: "Please Enter Correct Maker Id", data: [] });
      }




      // IF ROLE NOT EXIST TO CHECK
      const roleCheck = await Role_model.find({ name: Role.toUpperCase() });

      if (!roleCheck) {
        return res.send({ status: false, msg: "Role Not exists", data: [] });
      }

      // IF USER ALEARDY EXIST
      const existingUser = await User_model.findOne({
        $or: [
          { UserName: UserName },
          { Email: Email },
          { PhoneNo: PhoneNo },
        ],
      });


      if (existingUser) {
        // let errors = [];

        if (existingUser.UserName === UserName) {
          // errors.push("Username already exists");

          return res.send({
            status: false,
            msg: "Username already exists",
            data: [],
          });
        }

        if (existingUser.Email === Email) {
          // errors.push("Email already exists");
          return res.send({
            status: false,
            msg: "Email already exists",
            data: [],
          });
        }

        if (existingUser.PhoneNo === PhoneNo) {
          // errors.push("Phone Number already exists");
          return res.send({
            status: false,
            msg: "Phone Number already exists",
            data: [],
          });
        }

      }




      // IF CHECK STRATEGY NULL
      if (Strategies.length == 0) {
        return res.send({
          status: false,
          msg: "Please Select a one Strategy",
          data: [],
        });
      }

      // IF CHECK GROUP SERVICES NULL
      if (group_service == "") {
        return res.send({
          status: false,
          msg: "Please Select a one Group",
          data: [],
        });
      }



      const { ObjectId } = require('mongodb');

      try {
        // Map each strategy ID to its corresponding ObjectId
        const stgIds = Strategies.map(stg => new ObjectId(stg.id));



        var matchedStrategies = await Strategie_modal.find({ _id: { $in: stgIds } }).select('strategy strategy_demo_days strategy_amount_month strategy_amount_quarterly strategy_amount_half_early strategy_amount_early');

        // Create an array of matched strategy IDs
        var matchedStrategyIds = matchedStrategies.map(strategy => strategy._id.toString());

        // Find IDs that didn't match
        var unmatchedIds = Strategies.filter(stg => !matchedStrategyIds.includes(stg.id));





      } catch (error) {
        console.error('Error fetching strategies:', error);
        throw error;
      }

      if (unmatchedIds.length > 0) {
        return res.send({
          status: false,
          msg: "Strategy id wrong.",
          data: [],
        });
      }



      const min = 1;
      const max = 1000000;
      const rand = min + Math.random() * (max - min);
      var rand_password = Math.round(rand);
      // var rand_password = Math.round(123456);

      const salt = await bcrypt.genSalt(10);
      var ByCryptrand_password = await bcrypt.hash(
        rand_password.toString(),
        salt
      );



      if (!SubadminCheck[0].prifix_key || SubadminCheck[0].prifix_key == "" || SubadminCheck[0].prifix_key == null) {
        return res.send({
          status: false,
          msg: "prifix Key not exist.",
          data: [],
        });
      }

      const mins = 1;
      const maxs = 1000000;
      const rands = mins + Math.random() * (maxs - mins);
      var cli_key = Math.round(rands);


      var ccd = dt.format("ymd");
      var client_key = SubadminCheck[0].prifix_key + cli_key + ccd;


      User_model.insertMany([
        {
          FullName: FullName,
          UserName: UserName,
          Email: Email,
          PhoneNo: PhoneNo,
          Password: ByCryptrand_password,
          Otp: rand_password,
          Role: Role.toUpperCase(),
          license_type: license_type,
          licence: licence,
          prifix_key: SubadminCheck[0].prifix_key,
          client_key: client_key,
          parent_id: parent_id,
          parent_role: SubadminCheck[0].parent_role,
          api_secret: api_secret,
          app_id: app_id,
          client_code: client_code,
          api_key: api_key,
          app_key: app_key,
          broker: broker == null ? 0 : broker,
          api_type: api_type,
          demat_userid: demat_userid,
          Service_Type: Service_Type,
          per_trade_value: per_trade_value,
          Balance: Balance || 0
        },

      ])
        .then(async (data) => {
          var User_id = data[0]._id;



          // GROUP SERVICE ADD
          const User_group_service = new groupService_User({
            groupService_id: group_service,
            user_id: User_id,
          });
          User_group_service.save();



          // USER 2 DAYS LICENSE USE
          if (license_type == "0") {
            var currentDate = new Date();
            var start_date_2days = dateTime.create(currentDate);
            start_date_2days = start_date_2days.format("Y-m-d H:M:S");
            var start_date = start_date_2days;


            StartDate1 = start_date;

            var UpdateDate = "";
            var StartDate = new Date(start_date);
            var GetDay = StartDate.getDay();
            if (GetDay == 4) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay == 5) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay == 6) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay == 0) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay > 0 && GetDay < 4) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 7);
            }

            var end_date_2days = dateTime.create(UpdateDate);
            var end_date_2days = end_date_2days.format("Y-m-d H:M:S");

            EndDate1 = end_date_2days;


            if (matchedStrategies.length > 0) {
              matchedStrategies.forEach((data) => {
                const matchedStrategy = Strategies.find(strat => strat.id === data._id.toString());
                const User_strategy_client = new strategy_client({
                  strategy_id: data.id,
                  plan_id: 0,
                  user_id: User_id,
                  admin_id: SubadminCheck[0]._id,

                  Start_Date: StartDate1,
                  End_Date: EndDate1
                });
                User_strategy_client.save();
              });
            }




          } else if (license_type == "1") {


            if (matchedStrategies.length > 0) {
              matchedStrategies.forEach((data) => {

                var currentDate = new Date();
                var start_date_2days = dateTime.create(currentDate);
                start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                var start_date = start_date_2days;


                StartDate1 = start_date;

                var UpdateDate = "";
                var StartDate = new Date(start_date);
                var GetDay = StartDate.getDay();

                UpdateDate = StartDate.setDate(StartDate.getDate() + Number(data.strategy_demo_days));


                var end_date_2days = dateTime.create(UpdateDate);
                var end_date_2days = end_date_2days.format("Y-m-d H:M:S");

                EndDate1 = end_date_2days;


                // STRATEGY ADD
                const User_strategy_client = new strategy_client({

                  strategy_id: data.id,
                  plan_id: 0,
                  user_id: User_id,
                  admin_id: SubadminCheck[0]._id,
                  Start_Date: StartDate1,
                  End_Date: EndDate1
                });
                User_strategy_client.save();
              });
            }




          } else if (license_type == "2") {

            if (matchedStrategies.length > 0) {
              matchedStrategies.forEach((data) => {
                const matchedStrategy = Strategies.find(strat => strat.id === data._id.toString());

                var price_stg = 0
                var daysforstg = 0
                if (matchedStrategy.plan_id == 1) {
                  price_stg = data.strategy_amount_month
                  daysforstg = 1
                } else if (matchedStrategy.plan_id == 2) {
                  price_stg = data.strategy_amount_quarterly
                  daysforstg = 3
                } else if (matchedStrategy.plan_id == 3) {
                  price_stg = data.strategy_amount_half_early
                  daysforstg = 6
                }
                else if (matchedStrategy.plan_id == 4) {
                  price_stg = data.strategy_amount_early
                  daysforstg = 12
                } else {
                  daysforstg = 0
                  price_stg = 0
                }





                var currentDate = new Date();
                var start_date_2days = dateTime.create(currentDate);
                start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                var start_date = start_date_2days;


                StartDate1 = start_date;

                var UpdateDate = "";
                var StartDate = new Date(start_date);

                UpdateDate = StartDate.setMonth(
                  StartDate.getMonth() + parseInt(daysforstg)
                );

                var end_date_2days = dateTime.create(UpdateDate);
                var end_date_2days = end_date_2days.format("Y-m-d H:M:S");


                EndDate1 = end_date_2days;


                // STRATEGY ADD
                const User_strategy_client = new strategy_client({
                  strategy_id: data.id,
                  plan_id: matchedStrategy.plan_id,
                  user_id: User_id,
                  admin_id: SubadminCheck[0]._id,
                  Start_Date: StartDate1,
                  End_Date: EndDate1

                });
                User_strategy_client.save();


                const Admin_charge_percentage = Number(SubadminCheck[0].strategy_Percentage) / 100;
                const Admin_charge1 = Admin_charge_percentage * Number(price_stg);

                const strategy_transactionData = new strategy_transaction({
                  strategy_id: data.id,
                  user_id: User_id,
                  admin_id: SubadminCheck[0]._id,
                  plan_id: matchedStrategy.plan_id,
                  Start_Date: StartDate1,
                  End_Date: EndDate1,
                  stg_charge: price_stg,
                  Admin_charge: Admin_charge1
                });
                strategy_transactionData.save();
              });
            }
          }



          const GroupServiceId = new ObjectId(group_service);


          const group_service_find = await serviceGroup_services_id.aggregate([
            {
              $match: {
                Servicegroup_id: GroupServiceId
              }
            },
            {
              $lookup: {
                from: "services",
                localField: "Service_id",
                foreignField: "_id",
                as: "serviceInfo"
              }
            },
            {
              $unwind: "$serviceInfo"
            },
            {
              $project: {
                _id: 0, // Exclude the _id field if you don't need it
                Service_id: "$Service_id",
                lotsize: "$serviceInfo.lotsize"
              }
            }
          ]);


          const clientServicesData = [];

          // Build the array with client_services documents
          if (group_service_find.length !== 0) {

            // CLIENT SERVICES ADD API
            if (group_service_find.length != 0) {
              group_service_find.forEach((data) => {
                const clientService = {
                  user_id: User_id,
                  group_id: group_service,
                  service_id: data.Service_id,
                  strategy_id: Strategies[0].id,

                  uniqueUserService: User_id + "_" + data.Service_id,
                  quantity: data.lotsize,
                  lot_size: 1
                };

                clientServicesData.push(clientService);
              });
            }

            // Use insertMany to insert the documents in a single database call
            client_services.insertMany(clientServicesData)
              .then((result) => {
              })





            // LICENSE TABLE ADD USE LICENSE OUR CLIENT
            // if (license_type == "2") {
            //   const count_licenses_add = new count_licenses({
            //     user_id: User_id,
            //     Balance: Balance,
            //     admin_id: parent_id,
            //     Role: "USER"

            //   });
            //   count_licenses_add.save();
            // }

            var toEmail = Email;
            var subjectEmail = "User ID and Password";
            var email_data = {
              FullName: FullName,
              Email: Email,
              Password: rand_password,
              user_type: license_type == 2 ? "Live Account" : license_type == 0 ? "2 Days Free Live Account" : "Free Demo Account"
            };





            if (existingUser) {
              existingUser.ActiveStatus = '1';
              await existingUser.save();

            }


            res.send({ status: true, msg: "successfully Add!", data: data[0]._id });

            // var EmailData = await firstOptPass(email_data);
            // CommonEmail(toEmail, subjectEmail, EmailData);



          }

        })
        .catch((err) => {
          console.log("Error  Add Time Error-", err);
          if (err.keyValue) {
            return res.send({
              status: false,
              msg: "Key duplicate",
              data: err.keyValue,
            });
          }
        });




    } catch (error) {
      res.send({ msg: "Error=>", error });
    }
  }

  // UPDATE USER
  async UpdateUser(req, res) {
    try {

      var req = req.body;
      var StartDate1 = "";
      var EndDate1 = "";

      var PID = new ObjectId(req.parent_id);
      const ParentData = await User_model.findOne({ _id: PID }).select('Balance subadmin_service_type strategy_Percentage')

      const existingUsername = await User_model.findOne({ _id: req._id })

      const ExistStrategy = await strategy_client.aggregate([
        {
          $match: {
            user_id: existingUsername._id,
            ActiveStatus: "1"
          }
        },
        {
          $lookup: {
            from: 'strategies',
            localField: 'strategy_id',
            foreignField: '_id',
            as: 'strategyData'
          }
        },
        {
          $addFields: {
            strategy_name: { $arrayElemAt: ['$strategyData.strategy_name', 0] }
          }
        },
        {
          $project: {
            _id: 1,
            admin_id: 1,
            strategy_id: 1,
            user_id: 1,
            ActiveStatus: 1,
            plan_id: 1,
            Start_Date: 1,
            End_Date: 1,
            createdAt: 1,
            strategy_name: 1 // Include strategy_name in the projection
          }
        }
      ]);



      // IF CHECK STRATEGY NULL
      if (req.Strategies.length == 0) {
        return res.send({
          status: false,
          msg: "Please Select a one Strategy",
          data: [],
        });
      }

      // IF CHECK GROUP SERVICES NULL
      if (req.group_service == "") {
        return res.send({
          status: false,
          msg: "Please Select a one Group",
          data: [],
        });
      }

      // IF CHECK GROUP SERVICES NULL
      if (req.parent_id == "") {
        return res.send({
          status: false,
          msg: "Please Select parent id",
          data: [],
        });
      }

      var TotalMonth = "0";


      var totalLicense = ''
      if (ParentData.subadmin_service_type == 1) {
        const result = await User_model.aggregate([
          {
            $match: {
              license_type: "2",
            },
          },
          {
            $group: {
              _id: null,
              totalLicense: {
                $sum: { $toInt: "$Balance" },
              },
            },
          },
        ]);

        totalLicense = result[0].totalLicense;

      } else {
        const stg_count = await strategy_transaction.aggregate([
          { $match: { admin_id: PID } },
          {
            $group: {
              _id: null, // Group all documents together
              totalAdminCharge: { $sum: { $toDouble: "$Admin_charge" } }
            }
          },
          {
            $project: {
              _id: 0,
              totalAdminCharge: 1
            }
          }
        ]);
        // console.log("stg_count", stg_count)
        totalLicense = stg_count[0].totalAdminCharge;
      }


      // console.log("totalLicense", totalLicense)
      // console.log("ExistStrategy", ExistStrategy)
      // console.log("Req Strategy", req.Strategies)




      // ADD STRATEGY ARRAY
      var add_startegy = [];
      await Promise.all(req.Strategies.map(async (strategy) => {
        if (!ExistStrategy.some((existingStrategy) => existingStrategy.strategy_id == strategy.id)) {
          if (req.license_type == "2") {
            add_startegy.push(strategy);

          } else {

            const Strategy_Details = await Strategie_modal.findOne({ _id: strategy.id }).select('strategy_name strategy_demo_days');
            add_startegy.push(Strategy_Details);
          }

        }
      }));



      // console.log("add_startegy", add_startegy)


      var delete_startegy = [];
      ExistStrategy.forEach(function (strategy, index) {

        if (!req.Strategies.some(existingStrategy => existingStrategy.id === strategy.strategy_id.toString())) {
          delete_startegy.push(strategy);
        }
      });

      // console.log("delete_startegy", delete_startegy);



      if (req.license_type != "2") {
        if (delete_startegy.length > 0) {
          delete_startegy.forEach(async (data) => {

            
            var deleteStrategy = await strategy_client.deleteOne({
              _id: data._id,
            });

            // console.log("deleteStrategy",deleteStrategy.acknowledged)

            const Activity_logsData = new Activity_logs({
              user_Id: existingUsername._id,
              admin_Id: ParentData._id,
              category: "EDIT-USER",
              message: data.strategy_name + " Strategy Remove",
              maker_role: "SUBADMIN",
              device: "web",
              system_ip: ""
            });
            Activity_logsData.save();

          })
        }

      }







      var new_licence = 0;
      if (
        req.licence1 === "" ||
        req.licence1 === undefined ||
        req.licence1 === null ||
        req.licence1 === "null"
      ) {
        new_licence = 0;
      } else {
        new_licence = req.licence1;
      }



      if (
        Number(ParentData.Balance) >=
        Number(totalLicense) + Number(req.Balance)
      ) {

        // PREVIOS CLIENT IS LIVE
        if (existingUsername.license_type != "2") {


          // USER 2 DAYS LICENSE USEcd cd   
          if (req.license_type == "0") {

            // console.log("ssss 2")
            // if (existingUsername.license_type != "0") {
            var currentDate = new Date();
            var start_date_2days = dateTime.create(currentDate);
            start_date_2days = start_date_2days.format("Y-m-d H:M:S");
            var start_date = start_date_2days;

            StartDate1 = start_date;

            var UpdateDate = "";
            var StartDate = new Date(start_date);
            var GetDay = StartDate.getDay();
            if (GetDay == 4) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay == 5) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay == 6) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay == 0) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 8);
            } else if (GetDay > 0 && GetDay < 4) {
              UpdateDate = StartDate.setDate(StartDate.getDate() + 7);
            }

            var end_date_2days = dateTime.create(UpdateDate);
            var end_date_2days = end_date_2days.format("Y-m-d H:M:S");
            EndDate1 = end_date_2days;

            if (add_startegy.length > 0) {
              add_startegy.forEach((data) => {
                const User_strategy_client = new strategy_client({
                  strategy_id: data._id,
                  plan_id: 0,
                  user_id: existingUsername._id,
                  admin_id: PID,
                  Start_Date: StartDate1,
                  End_Date: EndDate1
                });
                User_strategy_client.save();


                const Activity_logsData = new Activity_logs({
                  user_Id: existingUsername._id,
                  admin_Id: ParentData._id,
                  category: "EDIT-USER",
                  message: data.strategy_name + " Strategy Add",
                  maker_role: "SUBADMIN",
                  device: "web",
                  system_ip: ""
                });
                Activity_logsData.save();

              });
            }



            // }


          } else if (req.license_type == "1") {


            if (add_startegy.length > 0) {
              add_startegy.forEach((data) => {

                var currentDate = new Date();
                var start_date_2days = dateTime.create(currentDate);
                start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                var start_date = start_date_2days;


                StartDate1 = start_date;

                var UpdateDate = "";
                var StartDate = new Date(start_date);
                var GetDay = StartDate.getDay();

                UpdateDate = StartDate.setDate(StartDate.getDate() + Number(data.strategy_demo_days));


                var end_date_2days = dateTime.create(UpdateDate);
                var end_date_2days = end_date_2days.format("Y-m-d H:M:S");

                EndDate1 = end_date_2days;


                // STRATEGY ADD
                const User_strategy_client = new strategy_client({
                  strategy_id: data._id,
                  plan_id: 0,
                  user_id: existingUsername._id,
                  admin_id: PID,
                  Start_Date: StartDate1,
                  End_Date: EndDate1
                });
                // console.log("User_strategy_client", User_strategy_client)
                User_strategy_client.save();

                const Activity_logsData = new Activity_logs({
                  user_Id: existingUsername._id,
                  admin_Id: ParentData._id,
                  category: "EDIT-USER",
                  message: data.strategy_name + " Strategy Add",
                  maker_role: "SUBADMIN",
                  device: "web",
                  system_ip: ""
                });
                Activity_logsData.save();
              });
            }




          } else if (req.license_type == "2") {

            if (add_startegy.length > 0) {
              add_startegy.forEach(async (data) => {
                const matchedStrategy = await Strategie_modal.findOne({ _id: data.id }).select('strategy_amount_month strategy_amount_quarterly strategy_amount_half_early strategy_amount_early');

                var price_stg = 0
                var daysforstg = 0
                if (data.plan_id == 1) {
                  price_stg = matchedStrategy.strategy_amount_month
                  daysforstg = 1
                } else if (data.plan_id == 2) {
                  price_stg = matchedStrategy.strategy_amount_quarterly
                  daysforstg = 3
                } else if (data.plan_id == 3) {
                  price_stg = matchedStrategy.strategy_amount_half_early
                  daysforstg = 6
                }
                else if (data.plan_id == 4) {
                  price_stg = matchedStrategy.strategy_amount_early
                  daysforstg = 12
                } else {
                  daysforstg = 0
                  price_stg = 0
                }





                var currentDate = new Date();
                var start_date_2days = dateTime.create(currentDate);
                start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                var start_date = start_date_2days;


                StartDate1 = start_date;

                var UpdateDate = "";
                var StartDate = new Date(start_date);

                UpdateDate = StartDate.setMonth(
                  StartDate.getMonth() + parseInt(daysforstg)
                );

                var end_date_2days = dateTime.create(UpdateDate);
                var end_date_2days = end_date_2days.format("Y-m-d H:M:S");


                EndDate1 = end_date_2days;


                // STRATEGY ADD
                const User_strategy_client = new strategy_client({
                  strategy_id: matchedStrategy._id,
                  plan_id: data.plan_id,
                  user_id: existingUsername._id,
                  admin_id: PID,
                  Start_Date: StartDate1,
                  End_Date: EndDate1

                });
                User_strategy_client.save();

                const Activity_logsData = new Activity_logs({
                  user_Id: existingUsername._id,
                  admin_Id: ParentData._id,
                  category: "EDIT-USER",
                  message: data.strategy_name + " Strategy Add",
                  maker_role: "SUBADMIN",
                  device: "web",
                  system_ip: ""
                });
                Activity_logsData.save();

                const Admin_charge_percentage = Number(ParentData.strategy_Percentage) / 100;
                const Admin_charge1 = Admin_charge_percentage * Number(price_stg);

                const strategy_transactionData = new strategy_transaction({
                  strategy_id: matchedStrategy._id,
                  user_id: existingUsername._id,
                  admin_id: ParentData._id,
                  plan_id: matchedStrategy.plan_id,
                  Start_Date: StartDate1,
                  End_Date: EndDate1,
                  stg_charge: price_stg,
                  Admin_charge: Admin_charge1
                });
                strategy_transactionData.save();
              });
            }


          }



        } else {
          if (req.license_type == "2") {

            if (add_startegy.length > 0) {
              add_startegy.forEach(async (data) => {
                const matchedStrategy = await Strategie_modal.findOne({ _id: data.id }).select('strategy_amount_month strategy_amount_quarterly strategy_amount_half_early strategy_amount_early');

                var price_stg = 0
                var daysforstg = 0
                if (data.plan_id == 1) {
                  price_stg = matchedStrategy.strategy_amount_month
                  daysforstg = 1
                } else if (data.plan_id == 2) {
                  price_stg = matchedStrategy.strategy_amount_quarterly
                  daysforstg = 3
                } else if (data.plan_id == 3) {
                  price_stg = matchedStrategy.strategy_amount_half_early
                  daysforstg = 6
                }
                else if (data.plan_id == 4) {
                  price_stg = matchedStrategy.strategy_amount_early
                  daysforstg = 12
                } else {
                  daysforstg = 0
                  price_stg = 0
                }





                var currentDate = new Date();
                var start_date_2days = dateTime.create(currentDate);
                start_date_2days = start_date_2days.format("Y-m-d H:M:S");
                var start_date = start_date_2days;


                StartDate1 = start_date;

                var UpdateDate = "";
                var StartDate = new Date(start_date);

                UpdateDate = StartDate.setMonth(
                  StartDate.getMonth() + parseInt(daysforstg)
                );

                var end_date_2days = dateTime.create(UpdateDate);
                var end_date_2days = end_date_2days.format("Y-m-d H:M:S");


                EndDate1 = end_date_2days;


                // STRATEGY ADD
                const User_strategy_client = new strategy_client({
                  strategy_id: matchedStrategy._id,
                  plan_id: data.plan_id,
                  user_id: existingUsername._id,
                  admin_id: PID,
                  Start_Date: StartDate1,
                  End_Date: EndDate1

                });
                User_strategy_client.save();


                const Activity_logsData = new Activity_logs({
                  user_Id: existingUsername._id,
                  admin_Id: ParentData._id,
                  category: "EDIT-USER",
                  message: data.strategy_name + " Strategy Add",
                  maker_role: "SUBADMIN",
                  device: "web",
                  system_ip: ""
                });
                Activity_logsData.save();



                const Admin_charge_percentage = Number(ParentData.strategy_Percentage) / 100;
                const Admin_charge1 = Admin_charge_percentage * Number(price_stg);

                const strategy_transactionData = new strategy_transaction({
                  strategy_id: matchedStrategy._id,
                  user_id: existingUsername._id,
                  admin_id: ParentData._id,
                  plan_id: matchedStrategy.plan_id,
                  Start_Date: StartDate1,
                  End_Date: EndDate1,
                  stg_charge: price_stg,
                  Admin_charge: Admin_charge1
                });
                strategy_transactionData.save();
              });
            }

          } else {
            return res.send({
              status: false,
              msg: "This is Live User",
              data: [],
            });
          }
        }










        try {
          // GROUP SERVICES ADD EDIT
          const GroupServiceId = new ObjectId(req.group_service);

          // CHECK IF GROUP SERVICES ALEAREDY EXIST NO UPDATE
          var user_group_service = await groupService_User.find({
            user_id: existingUsername._id,
            groupService_id: GroupServiceId,
          });

          if (user_group_service.length == 0) {

            const result = await groupService_User.updateOne(
              { user_id: existingUsername._id },
              { $set: { groupService_id: new ObjectId(req.group_service) } }
            );

            var GrpId = new ObjectId(req.group_service);

            const GroupclientNAme = await serviceGroupName.find({ _id: GrpId });


            const Activity_logsData = new Activity_logs({
              user_Id: existingUsername._id,
              admin_Id: ParentData._id,
              category: "EDIT-USER",
              message: GroupclientNAme[0].name + " Strategy Remove",
              maker_role: "SUBADMIN",
              device: "web",
              system_ip: ""
            });
            Activity_logsData.save();


            const GroupServices = await serviceGroup_services_id.aggregate([
              {
                $match: {
                  Servicegroup_id: GroupServiceId
                }
              },
              {
                $lookup: {
                  from: "services",
                  localField: "Service_id",
                  foreignField: "_id",
                  as: "serviceInfo"
                }
              },
              {
                $unwind: "$serviceInfo"
              },
              {
                $project: {
                  _id: 0, // Exclude the _id field if you don't need it
                  Service_id: "$Service_id",
                  lotsize: "$serviceInfo.lotsize"
                }
              }
            ]);


            if (GroupServices.length == "0") {
              return res.send({
                status: false,
                msg: "Your selected Group is not exist ",
                data: GroupServices,
              });
            }

            var strategFind = await strategy_client.find({
              user_id: existingUsername._id,
            });
            var client_servicesDelete = await client_services.deleteMany({
              user_id: existingUsername._id,
            });

            GroupServices.forEach((data) => {

              const User_client_services = new client_services({
                user_id: existingUsername._id,
                group_id: GroupServiceId,
                service_id: data.Service_id,
                strategy_id: strategFind[0].strategy_id,
                uniqueUserService: existingUsername._id + "_" + data.Service_id,
                quantity: data.lotsize,
                lot_size: 1
              });
              User_client_services.save();
            });



          } else {

          }
        } catch (error) {
          console.log("Error Group Services Error-", error);
        }








        var User_update = {
          FullName: req.FullName,
          license_type: req.license_type,
          licence: TotalMonth,
          broker: req.broker,
          parent_id: req.parent_id,
          parent_role: existingUsername.Role,
          api_secret: req.api_secret,
          app_id: req.app_id,
          client_code: req.client_code,
          api_key: req.api_key,
          app_key: req.app_key,
          api_type: req.api_type,
          demat_userid: req.demat_userid,
          service_given_month: req.service_given_month,
          multiple_strategy_select: req.multiple_strategy_select,
        };


        





        const User_Update = await User_model.updateOne(
          { _id: existingUsername._id },
          { $set: User_update }
        );



        if (req.license_type == "2" || req.license_type == 2) {

          if (Number(new_licence) > 0) {
            const count_licenses_add = new count_licenses({
              user_id: existingUsername._id,
              license: new_licence,
            });
            count_licenses_add.save();
          }
        }

        if (req.multiple_strategy_select == 0) {
          var multy_stgfind = await client_services.find({
            user_id: existingUsername._id,
          }).select('strategy_id')


          if (multy_stgfind.length > 0) {
            multy_stgfind.forEach(async (data) => {

              if (data.strategy_id.length > 1) {

                const filter = { _id: data._id };
                const updateOperation = { $set: { strategy_id: [data.strategy_id[0]] } }


                const result = await client_services.updateOne(filter, updateOperation);
              }

            })
          }



        }



        // USER GET ALL TYPE OF DATA
        return res.send({
          status: true,
          msg: "User Update successfully",
          data: [],
        });



      } else {
        return res.send({
          status: false,
          msg: "You Dont Have Balance",
          data: [],
        });
      }
    } catch (error) {
      console.log("Error In User Update-", error);
    }
  }



  // GET ALL GetAllClients
  async GetAllUser(req, res) {
    try {
      const { page, limit, Find_Role, user_ID } = req.body; //LIMIT & PAGE

      if (!user_ID || user_ID == '' || user_ID == null) {
        return res.send({
          status: false,
          msg: "Please Enter Sub Admin Id",
          data: [],
        });
      }

      // GET ALL CLIENTS
      const AdminMatch = { Role: "USER", parent_id: user_ID };
      const getAllClients = await User_model.find(AdminMatch).sort({ Create_Date: -1 });
      const totalCount = getAllClients.length;


      const totalActiveUser = getAllClients.filter((item) => {
        return item.ActiveStatus == 1
      }).length;

      const liveUser = getAllClients.filter((item) => {
        return item.license_type == 2;
      }).length;



      // IF NO DATA EXIST
      if (getAllClients.length === 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }

      // DATA RETRIEVED SUCCESSFULLY
      return res.send({
        status: true,
        msg: "Get All Clients",
        data: getAllClients,
        liveUser: liveUser,
        activeClientsCount: totalActiveUser,
        totalCount: totalCount,
        inActiveCount: totalCount - totalActiveUser,
      });
    } catch (error) {
      console.log("Error fetching clients:", error);
      return res.send({
        status: false,
        msg: "Error fetching clients",
        data: [],
        liveUser: 0,
        activeClientsCount: 0,
        totalCount: 0,
        inActiveCount: 0,
      });
    }
  }


  async GetUser(req, res) {
    try {
      const { user_ID } = req.body;


      if (!user_ID || user_ID == '' || user_ID == null) {
        return res.send({
          status: false,
          msg: "Please Enter Sub Admin Id",
          data: [],
        });
      }



      const getClients = await User_model.find({ _id: user_ID, Role: "USER" })
      const ClinetServices = await client_services.find({ user_id: user_ID })
      const ClientStrategy = await strategy_client.find({ user_id: user_ID })
      const ClientGroupName = await groupService_User.find({ user_id: user_ID })



      var Userdata = {
        getClients: getClients,
        ClinetServices: ClinetServices,
        ClientStrategy: ClientStrategy,
        ClientGroupName: ClientGroupName
      }

      // IF DATA NOT EXIST
      if (getClients.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }

      // DATA GET SUCCESSFULLY
      return res.send({
        status: true,
        msg: "Get Client Data",
        data: Userdata,
      });

    } catch (error) {
      console.log("Error loginClients Error-", error);
      return res.send({
        status: false,
        msg: "Empty data",
        data: [],
      });
    }
  }

  async UpdateUserStatus(req, res) {
    try {
      const { id, user_active_status } = req.body;
      // UPDATE ACTTIVE STATUS CLIENT
      const get_user = await User_model.find({ _id: id });
      if (get_user.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
        });
      }

      const filter = { _id: id };
      const updateOperation = { $set: { ActiveStatus: user_active_status } };
      const result = await User_model.updateOne(filter, updateOperation);

      if (result) {
        // STATUS UPDATE SUCCESSFULLY
        var status_msg = user_active_status == "0" ? "DeActivate" : "Activate";

        res.send({
          status: true,
          msg: "Update Successfully",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error trading status Error-", error);
    }
  }


  // GET ALL GetAllClients
  async GetAllUserStrategyTransaction(req, res) {
    try {
      const { page, limit, user_ID } = req.body; //LIMIT & PAGE
      // const skip = (page - 1) * limit;

      if (!user_ID || user_ID == '' || user_ID == null) {
        return res.send({
          status: false,
          msg: "Please Enter Sub Admin Id",
          data: [],
        });
      }



      // GET ALL CLIENTS
      var AdminMatch;
      AdminMatch = { admin_id: new ObjectId(user_ID) };



      const getAllClients = await strategy_transaction.aggregate([
        {
          $match: AdminMatch
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'userData'
          }
        },
        {
          $lookup: {
            from: 'strategies',
            localField: 'strategy_id',
            foreignField: '_id',
            as: 'strategyData'
          }
        },
        {
          $addFields: {
            user_id: { $arrayElemAt: ['$userData.UserName', 0] },
            strategy_id: { $arrayElemAt: ['$strategyData.strategy_name', 0] }
          }
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            strategy_id: 1,
            stg_charge: 1,
            Admin_charge: 1,
            plan_id: 1,
            Start_Date: 1,
            End_Date: 1,
            createdAt: 1,
          }
        },
        {
          $sort: {
            createdAt: -1 // Sort by createdAt field in descending order
          }
        }
      ]);







      // IF DATA NOT EXIST
      if (getAllClients.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
          // totalCount: totalCount,
        });
      }

      // DATA GET SUCCESSFULLY
      return res.send({
        status: true,
        msg: "Get All Strategy Charges",
        data: getAllClients,

      });
    } catch (error) {
      console.log("Error loginClients Error-", error);
      return res.send({
        status: false,
        msg: "Empty data",
        data: [],
        // totalCount: totalCount,
      });
    }
  }



  async GetAllUserStrategyhistory(req, res) {
    try {
      const { page, limit, user_ID } = req.body; //LIMIT & PAGE
      // const skip = (page - 1) * limit;

      if (!user_ID || user_ID == '' || user_ID == null) {
        return res.send({
          status: false,
          msg: "Please Enter Sub Admin Id",
          data: [],
        });
      }



      // GET ALL CLIENTS
      var AdminMatch;
      AdminMatch = { admin_id: new ObjectId(user_ID) };



      const getAllClients = await strategy_client.aggregate([
        {
          $match: AdminMatch
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'userData'
          }
        },
        {
          $lookup: {
            from: 'strategies',
            localField: 'strategy_id',
            foreignField: '_id',
            as: 'strategyData'
          }
        },
        {
          $addFields: {
            user_id: { $arrayElemAt: ['$userData.UserName', 0] },
            strategy_id: { $arrayElemAt: ['$strategyData.strategy_name', 0] }
          }
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            strategy_id: 1,
            ActiveStatus: 1,
            plan_id: 1,
            Start_Date: 1,
            End_Date: 1,
            createdAt: 1,
          }
        },
        {
          $sort: {
            createdAt: -1 // Sort by createdAt field in descending order
          }
        }
      ]);






      // IF DATA NOT EXIST
      if (getAllClients.length == 0) {
        return res.send({
          status: false,
          msg: "Empty data",
          data: [],
          // totalCount: totalCount,
        });
      }

      // DATA GET SUCCESSFULLY
      return res.send({
        status: true,
        msg: "Get All Strategy Charges",
        data: getAllClients,

      });
    } catch (error) {
      console.log("Error loginClients Error-", error);
      return res.send({
        status: false,
        msg: "Empty data",
        data: [],
        // totalCount: totalCount,
      });
    }
  }



  // DELETE USER
  async DeleteUser(req, res) {
    try {
      const { id } = req.body

      // CHECK IF USER EXIT IN USER MODAL
      const user_Model_ckeck = await User_model.findOne({ _id: id, Role: "USER" });
      if (!user_Model_ckeck) {
        return res.send({
          status: false,
          msg: "User does not exist",
          data: [],
        });
      }

      // CHECK IF USER EXIT IN CLIENT SERVICE

      // Delete the strategy

      const deleteResult = await User_model.deleteOne({ _id: id });
      const deleteResult1 = await client_services.deleteOne({ user_id: id });
      const deleteResult2 = await Client_group_Service.deleteOne({ user_id: id });
      const deleteResult3 = await strategy_client.deleteOne({ user_id: id });
      const deleteResult4 = await strategy_transaction.deleteOne({ user_id: id });
      const deleteResult5 = await count_licenses.deleteOne({ user_id: id });


      if (deleteResult.deletedCount === 1) {
        return res
          .status(200)
          .send({
            status: true,
            msg: "Strategy deleted successfully!",
            data: [],
          });
      } else {
        return res
          .status(500)
          .send({ status: false, msg: "Error deleting strategy", data: [] });
      }
    }
    catch (error) {
      return res.send({
        status: false,
        msg: "Id id Not Found",
        data: []
      })
    }
  }


}

module.exports = new Users();



