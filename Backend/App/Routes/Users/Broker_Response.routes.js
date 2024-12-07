"use strict"
const db = require("../../Models");
const User = db.user;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const router = require("express").Router()

const { BrokerResponse } = require('../../Controllers/Users/Broker_Response.controller')


// ALICE BLUE CONTROLLER FILE
const {
    SingleOrderFullInformationAlice,
  } = require("../../Controllers/Brokeraccesstoken/Aliceblue");


  // ANGEL CONTROLLER FILE
const {
    SingleOrderFullInformationAngel,
  } = require("../../Controllers/Brokeraccesstoken/Angel");


  const {
    SingleOrderFullInformationmandotsecurities,
  } = require("../../Controllers/Brokeraccesstoken/Mandotsecurites");



// STRATEGY RELETED ROUTES
router.post('/broker/response', BrokerResponse);


// BROKER REDIRECT
const GetOrderFullInformationAll_broker = async (req, res) => {

    let user_id = req.body.user_id;
     console.log("user_id",user_id)
    
    const objectId = new ObjectId(user_id);
  
    const pipeline = [
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $limit: 1,
      },
    ];
    const result = await User.aggregate(pipeline);
     
    if (result.length > 0) {
      if (result[0].TradingStatus == "off") {
        return res.send({ status: false, msg: "User Trading Off" });
      }
  
      const broker = parseInt(result[0].broker);

  
      // ALICE BLUE   -  2
        if (broker == 2) {
        let broker_response_id = req.body.broker_response_id;
        let order_id = req.body.order_id;
  
        if (order_id != "" && order_id != undefined) {
          SingleOrderFullInformationAlice(
            req,
            res,
            result,
            broker_response_id,
            order_id
          );
        } else {
          return res.send({
            status: false,
            msg: "Please Fill All Feild",
            data: [],
          });
        }
      }
  
      // ANGEL   -  12
      else if (broker == 12) {
        let broker_response_id = req.body.broker_response_id;
        let order_id = req.body.order_id;
        if (order_id != "" && order_id != undefined) {
          SingleOrderFullInformationAngel(
            req,
            res,
            result,
            broker_response_id,
            order_id
          );
        } else {
          return res.send({
            status: false,
            msg: "Please Fill All Feild",
            data: [],
          });
        }
      }

      // Mandotsecurities   -  8
      else if (broker == 8) {
        let broker_response_id = req.body.broker_response_id;
        let order_id = req.body.order_id;
        if (order_id != "" && order_id != undefined) {
            SingleOrderFullInformationmandotsecurities(
            req,
            res,
            result,
            broker_response_id,
            order_id
          );
        } else {
          return res.send({
            status: false,
            msg: "Please Fill All Feild",
            data: [],
          });
        }
      }

    } else {
   
      return res.send({ status: false, msg: "User Not found" });
    }
};


router.post('/getall/order/single', GetOrderFullInformationAll_broker);




module.exports = router;
