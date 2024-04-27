"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const axios = require('axios');
const User_model = db.user;

const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;


const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db_GET_VIEW = client.db(process.env.DB_NAME);
const makecallabrView_excute_view = db_GET_VIEW.collection('makecallabrView_excute');

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
const live_price_token = db.live_price_token;
const makecallABR = db.makecallABR;


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

    //  console.log("result expiry", result)

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


    //  console.log("result ", result)


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
    //  console.log("req body",req.body)
      //console.log("req body",req.body)

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

   //get token by socket Data
   async GetLiveDataSession(req, res) {

   // console.log("req - ",req.body)
    try {


             let result = null

            if(req.body.exist_user == "none"){
              result = await live_price_token.findOne().limit(1).select('demate_user_id access_token trading_status');
            }else{
              // result = await live_price_token.findOne({demate_user_id:req.body.exist_user}).limit(1).select('demate_user_id access_token');

             result = await live_price_token.findOne({ _id: { $gt: req.body.exist_user_details._id } // Assuming result is the previously found document
             }).select('demate_user_id access_token trading_status').limit(1);
             
       
             }
             
             // console.log("result - ",result)

         
            if (result != null) {
              return res.send({ status: true, msg: "Data Get", data: result });
            }else{
              return res.send({ status: false, msg: "Id Wrong" });
            }



    } catch (error) {
      console.log("Error Get token by socket Error-", error);
    }


  }



  //Add data above beleow range
  async AddDataAboveBelowRange(req, res) {

     console.log("req  ABR",req.body)
     try {


      const {
        user_id,
        Symbol,
        TType,
        Tr_Price,
        Price,
        EntryPrice,
        Sq_Value,
        Sl_Value,
        TSL,
        Segment,
        Strike,
        OType,
        Expiry,
        Strategy,
        Quntity,
        Key,
        TradeType,
        Target,
        StopLoss,
        ExitTime,
        ExitTime_dt,
        sl_status,
        token,
        EntryPriceRange_one,
        EntryPriceRange_two,
        ABR_TYPE,
        marketTimeAmo,
      } = req.body;
         
           //crete data
         const makecallABR_insert = new makecallABR({
          user_id:user_id,
          Symbol:Symbol,
          TType:TType,
          Tr_Price:Tr_Price,
          Price:Price,
          EntryPrice:EntryPrice,
          Sq_Value:Sq_Value,
          Sl_Value:Sl_Value,
          TSL:TSL,
          Segment:Segment,
          Strike:Strike,
          OType:OType,
          Expiry:Expiry,
          Strategy:Strategy,
          Quntity:Quntity,
          Key:Key,
          TradeType:TradeType,
          Target:Target,
          StopLoss:StopLoss,
          ExitTime:ExitTime,
          ExitTime_dt:ExitTime_dt,
          sl_status:sl_status,
          token:token,
          EntryPriceRange_one:EntryPriceRange_one,
          EntryPriceRange_two:EntryPriceRange_two,
          ABR_TYPE:ABR_TYPE,
          marketTimeAmo:marketTimeAmo,
        });
  
        // Save new user and count licenses
        const result = await makecallABR_insert.save();
        // console.log("result",result)
        if (result != null) {
              return res.send({ status: true, msg: "Data Add Successfully....", data: result });
            }else{
              return res.send({ status: false, msg: "Id Wrong" });
            }
 

 
     } catch (error) {
       console.log("Data Insert MakeAbovebeloveRange-", error);
     }
 
 
   }




}







//////////////////----- makecallabrView_excute_run --//////////////////////////////
const currentDateNow = new Date();
const options = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false, // Set to true for 12-hour format
  timeZone: 'Asia/Kolkata', // Adjust the time zone as needed
};

const currentTimeNow = currentDateNow.toLocaleString('en-IN', options);

const [hours, minutes] = currentTimeNow.split(':').map(Number);

const marketStartTime = { hour: 9, minute: 15 };

const marketEndTimeEquity = { hour: 15, minute: 30 };

const marketEndTimeCurrency = { hour: 4, minute: 59 };

const marketEndTimeMCX = { hour: 11, minute: 29 };

  const isMarketOpen =
  hours > marketStartTime.hour ||
  (hours === marketStartTime.hour && minutes >= marketStartTime.minute);

  const isMarketClosedEquity =
  hours > marketEndTimeEquity.hour ||
  (hours === marketEndTimeEquity.hour && minutes > marketEndTimeEquity.minute);

  const isMarketClosedCurrency =
  hours > marketEndTimeCurrency.hour ||
  (hours === marketEndTimeCurrency.hour && minutes > marketEndTimeCurrency.minute);

  const isMarketClosedMCX =
  hours > marketEndTimeMCX.hour ||
  (hours === marketEndTimeMCX.hour && minutes > marketEndTimeMCX.minute);

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekday = weekdays[currentDateNow.getDay()];

const Holidays = require('date-holidays');
const holidays = new Holidays();
const currentDate = new Date();

async function run() {
  //
  console.log("RUN -----")
  try {

     const makecallabrView_excute_run = async () => {
       try {
        
        
      let rr=true
      if (rr) {
        console.log("DONEEEEEEE ")
     // if (holidays.isHoliday(currentDate) && weekday != 'Sunday' && weekday != 'Saturday') {

        // const viewName = 'open_position_excute';
        var makecallabrView_excute_result = await makecallabrView_excute_view.find().toArray();
      
         if(makecallabrView_excute_result.length > 0){

          // [
          //   {
          //     _id: new ObjectId('662cb8600f527d7cdc19d919'),
          //     user_id: new ObjectId('662b6ec4e8a32c05bc0ae639'),
          //     Symbol: 'AXISBANK',
          //     TType: 'LE',
          //     Tr_Price: '0.00',
          //     Price: '15',
          //     EntryPrice: '15',
          //     Sq_Value: '0.00',
          //     Sl_Value: '0.00',
          //     TSL: '0.00',
          //     Segment: 'F',
          //     Strike: '100',
          //     OType: '',
          //     Expiry: '30052024',
          //     Strategy: 'SHK_DEMO',
          //     Quntity: '100',
          //     Key: 'SHK796872240426',
          //     TradeType: 'MAKECALL',
          //     Target: '0',
          //     StopLoss: '0',
          //     ExitTime: '15:25',
          //     sl_status: '0',
          //     token: '50928',
          //     EntryPriceRange_one: '',
          //     EntryPriceRange_two: '',
          //     ABR_TYPE: 'below',
          //     marketTimeAmo: '1',
          //     status: 0,
          //     above_price: null,
          //     below_price: 15,
          //     stockInfo_lp: 14,
          //     stockInfo_curtime: '1841',
          //     isAbove: false,
          //     isBelow: true,
          //     isRange: false
          //   }
          // ]
          
          
          console.log("DONEEEEEEE ",makecallabrView_excute_result)
          makecallabrView_excute_result && makecallabrView_excute_result.map(async(item) => {

            const currentTimestamp = Math.floor(Date.now() / 1000);
            let req = `DTime:${currentTimestamp}|Symbol:${item.Symbol}|TType:${item.TType}|Tr_Price:${item.Tr_Price}|Price:${item.stockInfo_lp}|Sq_Value:${item.Sq_Value}|Sl_Value:${item.Sl_Value}|TSL:${item.TSL}|Segment:${item.Segment}|Strike:${item.Strike}|OType:${item.OType}|Expiry:${item.Expiry}|Strategy:${item.Strategy}|Quntity:${item.Quntity}|Key:${item.Key}|TradeType:${item.TradeType}|Target:${item.Target}|StopLoss:${item.StopLoss}|ExitTime:${item.ExitTime}|sl_status:${item.sl_status}|Demo:demo`
               
            const resultUpdateId = await makecallABR.updateMany(
              { _id: item._id }, // Condition: IDs from the view
              { $set: { status: 1 } } // Update operation
            );
            
    
             console.log("req ",req)
           
             console.log("process.env.BROKER_URL ",process.env.BROKER_URL)
          
              let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'http://localhost:8800/broker-signals',
              // url: 'https://trade.pandpinfotech.com/signal/broker-signals',
              // url: `${process.env.BROKER_URL}`,
              headers: {
                'Content-Type': 'text/plain'
              },
              data: req
              };
      
               axios.request(config)
              .then(async(response) => {
    
                 let tradeSymbol;
                 if(item.segment.toLowerCase() == 'o' || item.segment.toLowerCase() == 'co' || item.segment.toLowerCase() == 'fo' || item.segment.toLowerCase() == 'mo')
                 {
                  tradeSymbol = item.symbol+"  "+item.expiry+"  "+item.strike+"  "+item.option_type+"  "+" [ "+item.segment+" ] ";
                 }
                 else if(item.segment.toLowerCase() == 'f' || item.segment.toLowerCase() == 'cf' || item.segment.toLowerCase() == 'mf')
                 {
                  tradeSymbol = item.symbol+"  "+item.expiry+"  "+" [ "+item.segment+" ] ";
                 }
                 else{
                  tradeSymbol = item.symbol+"  "+" [ "+item.segment+" ] ";
                 }
                // const io = await getIO();
                // io.emit("EXIT_TRADE_GET_NOTIFICATION", { data: tradeSymbol });
      
                 console.log("response Trade Excuted - ", response.data)
      
              })
              .catch((error) => {
                // console.log(error.response.data);
              });
      
      
          })



           
        }else{
          //console.log("ELSEEEE ",makecallabrView_excute_result)
        }


      } else {
       // console.log('The stock market is Closed!');
      }

      } catch (error) {
        console.log("Error in makecallabrView_excute_run loop",error);
      }
       
      
      
      }

    
    // Run the function initially
    await makecallabrView_excute_run();

    // Use a while loop with setTimeout for a delay
    while (true) {
      // Delay for 1000 milliseconds (1 second)
      await new Promise(resolve => setTimeout(resolve, 1000));
      await makecallabrView_excute_run();
    }
  } finally {
    // Close the client when you're done

  }

}

//run().catch(console.error);


//////////////////----- makecallabrView_excute_run --//////////////////////////////




module.exports = new Makecall();
