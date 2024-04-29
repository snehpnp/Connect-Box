"use strict";
const bcrypt = require("bcrypt");
const db = require('../../../Models');
var dateTime = require('node-datetime');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const serviceGroupName = db.serviceGroupName;
const services = db.services;
const serviceGroup_services_id = db.serviceGroup_services_id;
const categorie = db.categorie;
const group_services = db.group_services;
const client_services = db.client_services;
const strategy_client = db.strategy_client;
const User = db.user;



class GroupService {

  // ADD GROUP SERVICES
  async Addgroupservice(req, res) {
    try {
      const { maker_id, groupdetails, services_id } = req.body




      if (!maker_id || maker_id == "" || maker_id == null) {
        return res.send({ status: false, msg: 'Please Enter Maker Id', data: [] });
      }


      const maker_id_find = await User.findOne({ _id: maker_id, Role: "SUBADMIN" });
      if (!maker_id_find) {
        return res.send({ status: false, msg: 'Maker Id Is Wrong', data: [] });
      }

      function checkStringValidity(grpService) {
        // Check if the length of the string is at least 5 characters (to have 4th index)
        if (grpService.length < 5) {
          return res.send({ status: false, msg: 'Please Enter Group name long', data: [] });
        }

        // Check if the first three letters are capitalized
        if (grpService.substring(0, 3) !== grpService.substring(0, 3).toUpperCase()) {
          return res.send({ status: false, msg: 'Please Enter Group Name starting 3 letter Capital', data: [] });

        }

        // Check if there is an underscore (_) at the fourth index
        if (grpService.charAt(3) != '_') {
          return res.send({ status: false, msg: 'Please Enter Group  name _ is mandatory Emaple AAA_', data: [] });
        }
        if (maker_id_find.prifix_key != grpService.substring(0, 3).toUpperCase()) {
          return res.send({ status: false, msg: 'Please Enter Group starting 3 leter is your Prefix Key letter', data: [] });

        }
        return true;
      }

      if (!checkStringValidity(groupdetails.name)) {
        return res.send({ status: false, msg: 'Some Issue in Group Service', data: [] });
      }


      var groupServices = await serviceGroupName.find({ name: groupdetails.name })

      if (groupServices.length > 0) {
        return res.send({ status: false, msg: "Group Name Is already Exist", data: groupServices })
      }

      if (services_id.length > 50) {
        return res.send({ status: false, msg: "You are Select Only 50 Services", data: groupServices })
      }



      serviceGroupName.create({
        name: groupdetails.name,
        description: groupdetails.description,
        maker_id: maker_id
      })
        .then((createdServicesGroupName) => {
          const groupName_id = createdServicesGroupName._id;

          services_id.forEach(item => {

            serviceGroup_services_id.create({
              Servicegroup_id: groupName_id,
              Service_id: item.service_id,
              group_qty: item.group_qty,
              unique_column: groupName_id + '_' + item.service_id,
            })
              .then((createdGroupServiceId) => {

              })
              .catch((err) => {
                console.log('Error creating double service:', err.keyValue);

              });


          });

          return res.send({ status: true, msg: "successfully Add!", data: createdServicesGroupName })

        })
        .catch((err) => {
          return res.send({ status: false, msg: "Duplicate Value", data: err.keyValue.name })

        });
    }
    catch (error) {
      res.send({ msg: "Error=>", error })
    }

  }

  // EDIT GROUP SERVICES
  async Editgroupservice(req, res) {
    try {

      const { maker_id, groupdetails, services_id } = req.body




      if (!groupdetails.id || groupdetails.id == "" || groupdetails.id == null) {
        return res.send({ status: false, msg: 'Please Enter Id', data: [] });
      }

      const GroupServices_Id = new ObjectId(groupdetails.id);

      const strategy_check = await serviceGroupName.findOne({ _id: GroupServices_Id });
      if (!strategy_check) {
        return res.send({ status: false, msg: 'Group  Not exist', data: [] });
      }



      if (!maker_id || maker_id == "" || maker_id == null) {
        return res.send({ status: false, msg: 'Please Enter Maker Id', data: [] });
      }


      const maker_id_find = await User.findOne({ _id: maker_id, Role: "SUBADMIN" });
      if (!maker_id_find) {
        return res.send({ status: false, msg: 'Maker Id Is Wrong', data: [] });
      }



      if (groupdetails.name.length < 5) {
        return res.send({ status: false, msg: 'Please Enter Group name long', data: [] });
      }

      // Check if the first three letters are capitalized
      if (groupdetails.name.substring(0, 3) !== groupdetails.name.substring(0, 3).toUpperCase()) {
        return res.send({ status: false, msg: 'Please Enter Group Name starting 3 letter Capital', data: [] });

      }

      // Check if there is an underscore (_) at the fourth index
      if (groupdetails.name.charAt(3) != '_') {
        return res.send({ status: false, msg: 'Please Enter Group name _ is mandatory', data: [] });
      }
      if (maker_id_find.prifix_key != groupdetails.name.substring(0, 3).toUpperCase()) {
        return res.send({ status: false, msg: 'Please Enter Group starting 3 leter is your Prefix Key letter', data: [] });

      }



      var groupServices = await serviceGroupName.find({ _id: { $ne: GroupServices_Id }, name: groupdetails.name })

      if (groupServices.length > 0) {
        return res.send({ status: false, msg: "Name is already Exist", data: groupServices })
      }

      if (services_id.length > 50) {
        return res.send({ status: false, msg: "You are Select Only 50 Services", data: groupServices })
      }

      let result = await serviceGroupName.findByIdAndUpdate(
        GroupServices_Id,
        {
          name: groupdetails.name,
        },
        { new: true }
      )

      var GroupServicesIds = await serviceGroup_services_id.find({ Servicegroup_id: GroupServices_Id })

      // EXIST STRATEGY RO CONVERT IN STRING AND ID
      var db_exist_group_services = [];
      GroupServicesIds.forEach(function (item, index) {
        db_exist_group_services.push(item.Service_id.toString());
      });

      // NEW INSERT STRATEGY TO CONVERT IN STRING AND ID
      var insert_Group_services = [];
      services_id.forEach(function (item, index) {
        insert_Group_services.push(item.service_id);
      });

      // ADD STRATEGY ARRAY
      var add_Group_services = [];
      insert_Group_services.forEach(function (item, index) {
        if (!db_exist_group_services.includes(item)) {
          add_Group_services.push(item);
        }
      });

      // DELETE STRATEGY ARRAY
      var delete_GroupServices = [];
      db_exist_group_services.forEach(function (item, index) {
        if (!insert_Group_services.includes(item)) {
          delete_GroupServices.push(item);
        }
      });

      var mergedArray = GroupServicesIds.reduce((result, obj1) => {
        const matchingObj = services_id.find((obj2) => {
          if (obj2.service_id.toString() == obj1.Service_id.toString() && obj2.group_qty !== obj1.group_qty) {
            result.push(obj2);
          }
        });

        return result;
      }, []);



      // DELETE SERVICE
      try {
        // STEP FIRST TO DELTE IN STRATEGY CLIENT TABLE
        if (delete_GroupServices.length > 0) {

          delete_GroupServices.forEach(async (data) => {
            var stgId = new ObjectId(data)
            var deleteGroupServices = await serviceGroup_services_id.deleteOne({ Servicegroup_id: GroupServices_Id, Service_id: stgId })
          })
        }

      } catch (error) {
        console.log("Error Delete Group Service In -", error);
      }

      // ADD SERVICE
      try {
        if (add_Group_services.length > 0) {
          add_Group_services.forEach(async (data) => {
            var stgId = new ObjectId(data)
            var Qty_find = services_id.filter((data1) => data1.service_id == data)

            const User_strategy_client = new serviceGroup_services_id({
              Servicegroup_id: GroupServices_Id,
              Service_id: stgId,
              unique_column: groupdetails.id + '_' + stgId,
              group_qty: Qty_find[0].group_qty
            })

            await User_strategy_client.save()
          })
        }
      } catch (error) {
        console.log("Error Add Group Service In -", error);
      }


      //QUANTIY UPDATE
      if (mergedArray.length > 0) {
        mergedArray.forEach(async (data) => {

          const filter = { Servicegroup_id: GroupServices_Id, Service_id: data.service_id };
          const updateOperation = { $set: { group_qty: data.group_qty } };
          var deleteGroupServices = await serviceGroup_services_id.updateOne(filter, updateOperation)



        })
      }




      // Client Services Update
      // if (delete_GroupServices.length > 0) {
      //   delete_GroupServices.forEach(async (data) => {
      //     var stgId = new ObjectId(data)
      //     var find_user_service = await client_services.deleteMany({ group_id: GroupServices_Id, service_id: stgId })
      //   })
      // }


      // ADD GROUP  SERVICES IN CLIENT SERVICES
      // if (add_Group_services.length > 0) {
      //   add_Group_services.forEach(async (data) => {
      //     var stgId = new ObjectId(data)
      //     var Qty_find = services_id.filter((data1) => data1.service_id == data)

      //     var find_user_service = await group_services.find({ groupService_id: GroupServices_Id })


      //     if (find_user_service.length > 0) {
      //       find_user_service.map(async (user) => {

      //         var deleteStrategy = await strategy_client.find({ user_id: user.user_id });

      //         // const User_client_services = new client_services({
      //         //   user_id: user.user_id,
      //         //   group_id: GroupServices_Id,
      //         //   service_id: stgId,
      //         //   strategy_id: deleteStrategy[0].strategy_id,
      //         //   uniqueUserService: user.user_id + "_" + data,
      //         //   quantity: Qty_find[0].lotsize,
      //         //   lot_size: 1

      //         // })


      //         // User_client_services.save()

      //       })
      //     } else {
      //     }





      //   })
      // }






      return res.send({ status: true, msg: "Group Service Edit Succefully", data: [] })

    }
    catch (error) {
      res.send({ msg: "Error=>", error })
    }
  }

  // SErvices Work
  async GetAllServices(req, res) {
    const pipeline = [

      {
        $lookup: {
          from: 'categories',
          localField: 'categorie_id',
          foreignField: '_id',
          as: 'categoryResult'
        }
      },
      {
        $unwind: '$categoryResult', // Unwind the 'categoryResult' array
      },
      {
        $sort: {
          'name': 1, // 1 for ascending order, -1 for descending order
        }
      },
      {
        $project: {
          'categoryResult.segment': 1,
          'categoryResult.name': 1,
          name: 1,
          fullname: {
            $concat: ['$name', '[', '$categoryResult.segment', ']']
          }

        },



      },
    ];

    const result = await services.aggregate(pipeline);

    if (result.length > 0) {

      return res.json({ status: true, msg: 'Get all', data: result });

    } else {

      return res.json({ status: false, msg: 'An error occurred', data: [] });
    }



  }

  //  GetAllCatagory
  async GetAllCatagory(req, res) {
    const pipeline = [
      {
        $project: {
          name: 1,
          segment: 1,
        },
      },
    ];

    const result = await categorie.aggregate(pipeline);

    if (result.length > 0) {
      res.send({ status: true, data: result });

    } else {
      res.send({ status: false, data: [] });

    }



    //
  }

  //  GetAllCatagory
  async allServicesSymboll(req, res) {
    const pipeline = [
      {
        $project: {
          name: 1,
          segment: 1,
        },
      },
    ];

    const result = await categorie.aggregate(pipeline);

    if (result.length > 0) {
      res.send({ status: true, data: result });

    } else {
      res.send({ status: false, data: [] });

    }



    //
  }

  async getServiceByCatagory(req, res) {
    
    let pipeline;
    if (req.body.segment == '' || req.body.segment == null) {

      return res.send({ status: false, msg: "Please Enter Segment", data: [] })

    }

    if (req.body.segment === 'all') {
      pipeline = [
        {
          $lookup: {
            from: 'categories',
            localField: 'categorie_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category', // Unwind the 'categoryResult' array
        },
        {
          $sort: {
            name: 1, // 1 for ascending order, -1 for descending order
          },
        },
        {
          $project: {
            'category.segment': 1,
            'category.name': 1,
            name: 1,
            lotsize: 1,

          },
        },
      ];
    } else {
      pipeline = [
        {
          $lookup: {
            from: 'categories',
            localField: 'categorie_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category', // Unwind the 'categoryResult' array
        },
        {
          $match: {
            $or: [
              { 'category.segment': req.body.segment },
              { 'category.segment': 'all' },
            ],
          },
        },
        {
          $sort: {
            name: 1, // 1 for ascending order, -1 for descending order
          },
        },
        {
          $project: {
            'category.segment': 1,
            'category.name': 1,
            name: 1,
            lotsize: 1

          },
        },
      ];
    }


    const result = await services.aggregate(pipeline);

    if (result.length > 0) {

      return res.send({ status: true, msg: "Get Succefully", data: result })


    } else {

      return res.send({ status: false, msg: "Some Error in get", data: result })



    }



  }

  // GET ALL GROUP BY SERVICES
  async getAllgroupServices(req, res) {
    try {
      const { id } = req.body

      const pipeline = [
        {
          '$match': {
            'maker_id': new ObjectId(id)
          }
        },

        {
          '$lookup': {
            'from': 'servicegroup_services_ids',
            'localField': '_id',
            'foreignField': 'Servicegroup_id',
            'as': 'result'
          }
        },
        {
          '$addFields': {
            'resultCount': { '$size': '$result' } // Add a field to store the count of 'result' array
          }
        }
      ];

      const result = await serviceGroupName.aggregate(pipeline);

      if (result.length > 0) {
        res.send({ status: true, data: result, msg: 'Get All successfully' });
      } else {
        res.send({ status: false, data: [], msg: 'Empty data' });
      }

    } catch (error) {
      console.log("Error Get All Group Services Error - ", error);
      res.status(500).send({ status: false, data: [], msg: 'An error occurred' });
    }
  }


  async getAllSubgroupServices(req, res) {

    try {
      var { id } = req.body
      const pipeline = [
        {
          '$match': {
            'maker_id': new ObjectId(id) // Assuming id is a string and needs to be converted to ObjectId
          }
        },
        {
          '$lookup': {
            'from': 'servicegroup_services_ids',
            'localField': '_id',
            'foreignField': 'Servicegroup_id',
            'as': 'result'
          }
        },
        {
          '$addFields': {
            'resultCount': { '$size': '$result' } // Add a field to store the count of 'result' array
          }
        }
      ];

      const result = await serviceGroupName.aggregate(pipeline);

      if (result.length > 0) {
        res.send({ status: true, data: result, msg: 'Get All successfully' });
      } else {
        res.send({ status: false, data: [], msg: 'Empty data' });
      }

    } catch (error) {
      console.log("Error Get All Group Services Error - ", error);
      res.status(500).send({ status: false, data: [], msg: 'An error occurred' });
    }
  }


  // DELETE GROUP SERVICES
  async DELETEGROUPSERVICES(req, res) {
    try {
      const { id } = req.body; // Assuming your ID is passed as 'id' in the request body


      if (id == null || id=='') {
        return res.send({ status: false, msg: 'Enter Valid Id', data: [] });
      }

      // Convert the string ID to an ObjectId
      const objectId = new ObjectId(id);

      const groupServices_user = await group_services.find({ groupService_id: objectId })



      if (groupServices_user.length != 0) {
        return res.send({ status: false, msg: 'This group already assign', data: groupServices_user });
      }

      const result = await serviceGroupName.deleteOne({ _id: objectId });
      const result1 = await serviceGroup_services_id.deleteMany({ Servicegroup_id: objectId });




      // Handle the results here, e.g., send them in the response
      if (result.acknowledged == true) {
        return res.send({ status: true, msg: 'Delete successfully ', data: result.acknowledged });

      }
    } catch (error) {

      return res.send({ status: false, msg: 'server error delete group service', data: error });
    }
  }

  // GET SERVICES NAME
  async GetAllServicesName(req, res) {

    try {
      const { data } = req.body

      var ServicesArr = []
      if (!data || data.length == 0 || data == '') {
        return res.send({ status: false, msg: 'Please Insert Coreect Data ', data: ServicesArr });
      }



      data.forEach(async (info) => {

        const Service_name_get = await services.findOne({ _id: info.Service_id });

        if (Service_name_get) {
          ServicesArr.push({ data: Service_name_get, data1: info })

          if (data.length == ServicesArr.length) {
            return res.send({ status: true, msg: 'Get All successfully ', data: ServicesArr });
          }
        }

      })

    } catch (error) {
      console.log("Error GET SERVICES NAME -", error);
    }

  }

  async GetAllServicesGiven(req, res) {

    try {
      const { data } = req.body


      var ServicesArr = []
      if (!data || data.length == 0 || data == '') {
        return res.send({ status: false, msg: 'Please Insert Coreect Data ', data: ServicesArr });
      }

      data.forEach(async (info) => {


        const pipeline = [
          {
            $match: {
              _id: new ObjectId(info.Service_id)
            }
          },
          {
            $lookup: {
              from: "categories",
              localField: "categorie_id",
              foreignField: "_id",
              as: "category"
            }
          },
          {
            $unwind: "$category"
          },
          {
            $project: {
              "_id": 1, // include any other fields you want
              "name": 1,
              "category.segment": 1 // include specific fields from categories
            }
          }
        ];

        const Service_name_get = await services.aggregate(pipeline)



        if (Service_name_get) {
          ServicesArr.push({ data: Service_name_get })

          if (data.length == ServicesArr.length) {
            return res.send({ status: true, msg: 'Get All successfully ', data: ServicesArr });
          }
        }

      })

    } catch (error) {
      console.log("Error GET SERVICES NAME -", error);
    }

  }

  async GetAllServicesGivengroupId(req, res) {

    try {
      const { id } = req.body

     
      var ServicesArr = []
      if (!id ||id == '') {
        return res.send({ status: false, msg: 'Please Insert Coreect id ', data: [] });
      }



      const GroupName = await serviceGroupName.aggregate([
        {
          $match: { _id: new ObjectId(id) }
        },
        {
          $lookup: {
            from: "servicegroup_services_ids", 
            localField: "_id", 
            foreignField: "Servicegroup_id", 
            as: "services" 
          }
        },
        {
          $unwind: "$services" 
        },
        {
          $lookup: {
            from: "services", 
            localField: "services.Service_id", 
            foreignField: "_id", 
            as: "serviceDetails" 
          }
        },
        {
          $lookup: {
            from: "categories", 
            localField: "serviceDetails.categorie_id", 
            foreignField: "_id", 
            as: "categoryDetails" 
          }
        },
        {
          $project: {
            _id: 1, // Keep the original _id from the document
            serviceId: "$services._id", // Include the _id from the services array
            serviceName: { $arrayElemAt: ["$serviceDetails.name", 0] },
            categoryName: { $arrayElemAt: ["$categoryDetails.segment", 0] }
          }
        }
        
      ]);
      
      
      
      

      return res.send({ status: true, msg: 'Get All successfully ', data: GroupName });

    } catch (error) {
      console.log("Error GET SERVICES NAME -", error);
    }

  }


  // GET SERVICES BY GROUP ID -- for edit update
  async GetServicesByGroupId(req, res) {
    try {

      const { _id } = req.body
      if (_id != "yyyyyyyYYYYYY") {
        const objectId = new ObjectId(_id);

        const pipeline = [
          {
            $match: {
              Servicegroup_id: objectId,
            }
          },
          {
            '$lookup': {
              'from': 'services',
              'localField': 'Service_id',
              'foreignField': '_id',
              'as': 'ServiceResult'
            }
          },
          {
            $unwind: '$ServiceResult', // Unwind the 'categoryResult' array
          },
          {
            '$lookup': {
              'from': 'categories',
              'localField': 'ServiceResult.categorie_id',
              'foreignField': '_id',
              'as': 'categories'
            }
          },
          {
            $unwind: '$categories', // Unwind the 'categoryResult' array
          },
          {
            $project: {
              'ServiceResult.name': 1,
              'categories.segment': 1,

            },
          },


        ];

        const Service_name_get = await serviceGroup_services_id.aggregate(pipeline);
        return res.send({ status: true, msg: 'Get All successfully ', data: Service_name_get });


      } else {
        return res.send({ status: false, msg: 'Empty DAta', data: [] });

      }


    }
    catch (error) {
      console.log("Error GET SERVICES NAME -", error);
    }
  }

  async GetServicesByGroupId1(req, res) {

    try {

      const { _id } = req.body

      if (_id != "yyyyyyyYYYYYY") {
        const objectId = new ObjectId(_id);

        const pipeline = [
          {
            '$lookup': {
              'from': 'services',
              'localField': 'Service_id',
              'foreignField': '_id',
              'as': 'ServiceResult'
            }
          },
          {
            $match: {
              Servicegroup_id: objectId,
            }
          },
          {
            '$lookup': {
              'from': 'categories',
              'localField': 'ServiceResult.categorie_id',
              'foreignField': '_id',
              'as': 'catagory'
            }
          },
          {
            $unwind: '$ServiceResult' // Unwind the 'ServiceResult' array
          },
          {
            $unwind: '$catagory' // Unwind the 'catagory' array
          },
          {
            $project: {
              'ServiceResult.name': 1,
              'ServiceResult.lotsize': 1,
              'ServiceResult._id': 1,
              'catagory.segment': 1,
              'catagory.name': 1,
              'catagory._id': 1,
              group_qty: 1
            }
          },
          {
            $group: {
              _id: '$_id',
              ServiceResult: { $push: '$ServiceResult' },
              catagory: { $push: '$catagory' },
              group_qty: { $first: '$group_qty' }
            }
          },
          {
            $project: {
              'ServiceResult': { $arrayElemAt: ['$ServiceResult', 0] },
              'catagory': { $arrayElemAt: ['$catagory', 0] },
              group_qty: 1
            }
          }
        ];



        const Service_name_get = await serviceGroup_services_id.aggregate(pipeline);


        if (Service_name_get.length == 0) {
          return res.send({ status: false, msg: 'No Data Found ', data: Service_name_get });
        }



        const Service_name_get1 = await serviceGroupName.find({ _id: objectId });





        return res.send({
          status: true, msg: 'Get All successfully ', data: {
            Service_name_get: Service_name_get,
            group_name: Service_name_get1
          }
        });


      } else {
        return res.send({ status: false, msg: 'Empty DAta', data: [] });

      }


    }
    catch (error) {
      console.log("Error GET SERVICES NAME -", error);
    }

  }

  // GET SERVICES NAME
  async GetAllServicesUserNAme(req, res) {

    try {
      const { _id } = req.body
      var ServicesArr = []
      const objectId = new ObjectId(_id);

      // Define the aggregation pipeline
      const pipeline = [
        {
          $match: {
            groupService_id: objectId, // Replace 'objectId' with your actual ObjectId
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            'user.Email': 1, // Replace 'username' with the actual field name in 'users' collection
            'user.FullName': 1,
            'user.license_type': 1,
            'user.UserName': 1,
            'user.TradingStatus': 1,
            'user.AppLoginStatus': 1,
            'user.WebLoginStatus': 1,

          },
        },
      ];

      // Execute the aggregation pipeline
      const result = await group_services.aggregate(pipeline)

      const groupServices_user = await group_services.find({ groupService_id: objectId })

      if (groupServices_user.length == 0) {
        return res.send({ status: false, msg: 'NO DATA', data: result });
      }

      return res.send({ status: true, data: result, msg: 'Get All successfully' });



    } catch (error) {
      return res.send({ status: false, msg: 'Internal Server Error' });
    }

  }







}


module.exports = new GroupService();
