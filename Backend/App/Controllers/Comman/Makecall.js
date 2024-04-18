"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const User_model = db.user;

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const user_logs = db.user_logs;
const subadmin_logs = db.subadmin_activity_logs;
const serviceGroupName = db.serviceGroupName;
const services = db.services;
const serviceGroup_services_id = db.serviceGroup_services_id;
const categorie = db.categorie;
const group_services = db.group_services;
const Alice_token = db.Alice_token;
const strategy_model = db.Strategies;


const User = db.user;


// Product CLASS
class Makecall {

  //  GetAllCatagory
  async GetallCatagory(req, res) {

    //console.log("Ok",req.body)



    const pipeline = [
      {
        $project: {
          name: 1,
          segment: 1,
        },
      },
    ];

    const result = await categorie.aggregate(pipeline);

    // console.log( "result ",result)

    if (result.length > 0) {
      res.send({ status: true, data: result });

    } else {
      res.send({ status: false, data: [] });

    }



    //
  }


  // get service by category
  async GetServiceByCatagory(req, res) {


    //console.log("id",req.body.category_id)

    if (req.body.category_id == '' || req.body.category_id == null) {
      return res.send({ status: false, msg: "Category not fount service", data: [] })
    }

    const CategoryObjectId = new ObjectId(req.body.category_id);

    const pipeline = [
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
          categorie_id: CategoryObjectId
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



    const result = await services.aggregate(pipeline);

    //console.log("result services",result)

    if (result.length > 0) {
      return res.send({ status: true, msg: "Get Succefully", data: result })
    } else {
      return res.send({ status: false, msg: "Some Error in get", data: [] })
    }



  }


  //get expiry
  async Getgetexpirymanualtrade(req, res) {


    //console.log("req",req.body)

    try {

      if (req.body.category_id == '' || req.body.symbol == '') {
        return res.send({ status: false, msg: "script not fount service", data: [] })
      }

      const CategoryObjectId = new ObjectId(req.body.category_id);
      const symbol = req.body.symbol;

      if (!symbol) {
        return res.status(400).json({ status: false, msg: 'Symbol is required.', data: [] });
      }

      const date = new Date(); // Month is 0-based, so 10 represents November

      const currentDate = new Date();
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - 1);
      //  const date = new Date(); // Month is 0-based, so 10 represents November
      const formattedDate = previousDate.toISOString();



      const pipeline_category = [
        {
          $match: {
            _id: CategoryObjectId
          },
        },
        {
          $project: {
            segment: 1,
            _id: 0,
          },
        },
      ];

      const category_details = await categorie.aggregate(pipeline_category);

      //console.log("category_details",category_details[0].segment)


      const pipeline = [
        {
          $match: {
            symbol: symbol,
            segment: category_details[0].segment
          }
        },
        {
          $group: {
            _id: "$symbol",
            uniqueExpiryValues: { $addToSet: "$expiry" }
          }
        },
        {
          $unwind: "$uniqueExpiryValues"
        },
        {
          $addFields: {
            expiryDate: {
              $dateFromString: {
                dateString: "$uniqueExpiryValues",
                format: "%d%m%Y"
              }
            }
          }
        },

        {
          $addFields: {
            formattedExpiryDate: {
              $dateToString: {
                date: "$expiryDate",
                format: "%d%m%Y"
              }
            }
          }
        },
        {
          $sort: { expiryDate: 1 }
        },
        {
          $limit: 4
        }


      ]

      const result = await Alice_token.aggregate(pipeline);

      console.log("result expiry", result)

      if (result.length > 0) {
        return res.send({ status: true, msg: "Get Succefully", data: result })
      } else {
        return res.send({ status: false, msg: "Some Error in get", data: [] })
      }

    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ status: false, msg: 'Server error', data: [] });
    }








  }



  //get expiry
  async GetgetAllStrikePriceApi(req, res) {


    //console.log("req",req.body)

    try {

      if (req.body.category_id == '' || req.body.symbol == '') {
        return res.send({ status: false, msg: "script not fount service", data: [] })
      }

      const symbol = req.body.symbol;

      if (!symbol) {
        return res.status(400).json({ status: false, msg: 'Symbol is required.', data: [] });
      }

      const date = new Date();
      const currentDate = new Date();
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - 1);
      const formattedDate = previousDate.toISOString();


      const CategoryObjectId = new ObjectId(req.body.category_id);

      const expiry = req.body.expiry;
      const segment = req.body.segment;



      const pipeline = [
        {
          $match: {
            $and: [
              { option_type: { $in: ["CE", "PE"] } },
              { segment: segment },
              { symbol: symbol },
              { expiry: expiry }
            ]
          }
        },
        {
          $group: {
            _id: "$strike",
            strike: { $first: "$strike" }
          }
        },
        {
          $sort: { strike: -1 }
        }
      ];


      const result = await Alice_token.aggregate(pipeline);


      console.log("result ", result)


      if (result.length > 0) {
        return res.send({ status: true, msg: "Get Succefully", data: result })
      } else {
        return res.send({ status: false, msg: "Some Error in get", data: [] })
      }

    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ status: false, msg: 'Server error', data: [] });
    }


  }



  //get Strategy Data
  async GetgetStrategyData(req, res) {


    try {
      const { user_id } = req.body;

      // var getAllTheme = await strategy_model.find()
      const result = await strategy_model.find({ maker_id: user_id }).sort({ createdAt: -1 }).select('_id strategy_name');

      if (result.length > 0) {
        return res.send({ status: true, msg: "Get strategy data Succefully", data: result })
      } else {
        return res.send({ status: false, msg: "Data not found", data: [] })
      }

    } catch (error) {
      console.log("Error Get All Strategy Error-", error);
    }


  }

  
   //get token by socket Data
   async Getgettokenbysocket(req, res) {


    try {
      console.log("req body",req.body)
      console.log("req body",req.body)

      let segment = req.body.segment
      let symbol = req.body.symbol

      //Cash Token get
      if(req.body.segment == "C"){

        const result = await services.findOne({ name: symbol }).select('instrument_token exch_seg');
       // console.log("result",result)
        if (result != null) {
        return res.send({ status: true, token: result.instrument_token, exchange: result.exch_seg})
        } else {
        return res.send({ status: false, msg: "Data not found", token: "" })
        }

      }

     
      //Futer Token get
      else if(req.body.segment == "F" || req.body.segment == "MF" || req.body.segment == "CF"){
        
        let expiry = req.body.expiry;

        const result = await Alice_token.findOne({ symbol : symbol , segment : segment , expiry : expiry }).select('instrument_token exch_seg');
       // console.log("result",result)
        if (result != null) {
        return res.send({ status: true, token: result.instrument_token, exchange: result.exch_seg})
        } else {
        return res.send({ status: false, msg: "Data not found", token: "" })
        }
 
      }
      
      
      //Option Token get
      else if(req.body.segment == "O" || req.body.segment == "MO" || req.body.segment == "CO"){

      let expiry = req.body.expiry;
      let strike_price = req.body.strike_price;
      let option_type = "CE";
      
      if(req.body.option_type.toUpperCase() == "PUT"){
        option_type = "PE"
      }
        
        const result = await Alice_token.findOne({ symbol : symbol , segment : segment , expiry : expiry , strike : strike_price , option_type : option_type }).select('instrument_token exch_seg');
       // console.log("result",result)
        if (result != null) {
        return res.send({ status: true, token: result.instrument_token, exchange: result.exch_seg})
        } else {
        return res.send({ status: false, msg: "Data not found", token: "" })
        }

      }



    } catch (error) {
      console.log("Error Get token by socket Error-", error);
    }


  }




}

module.exports = new Makecall();
