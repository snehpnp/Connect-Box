

var dateTime = require('node-datetime');
    var moment = require('moment');
    const db = require('./App/Models')
    const Alice_token = db.Alice_token;
    const User = db.user;
    const user_logs = db.user_logs;
    const live_price = db.live_price;
    const UserMakeStrategy = db.UserMakeStrategy;
    const Get_Option_Chain_modal = db.get_option_chain_symbols;
    const MainSignals_modal = db.MainSignals
    const makecallABR = db.makecallABR
    
    
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Types.ObjectId;
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect();
    const db_main = client.db(process.env.DB_NAME);
    const token_chain_collection = db_main.collection('token_chain');




module.exports = function (app) {
    
    app.get('/str', async (req, res) => {

      //  await MainSignalsRemainToken();
      //  await MakecallABR()
        res.send("Okkkkkkkkkkkk Test File...")

       
    });   
}



const MainSignalsRemainToken = async () => {


    const pipeline = [
        {
            $match: {
                // segment: "O",
                $expr: {
                    $gt: ["$entry_qty", "$exit_qty"]
                }
            }
        },
        {
            $addFields: {
                expiry_date: {
                    $dateFromString: {
                        dateString: "$expiry",
                        format: "%d%m%Y"
                    }
                },
                

                exch_seg: {
                    $cond: {
                      if: { $eq: ['$segment', 'C'] }, // Your condition here
                      then: 'NSE',
                      else: {
                        $cond: {
                          if: {
                            $or: [
                              { $eq: ['$segment', 'F'] },
                              { $eq: ['$segment', 'O'] },
                              { $eq: ['$segment', 'FO'] }
                            ]
                          },
                          then: 'NFO',
                          else: {
        
                            $cond: {
                              if: {
                                $or: [
                                  { $eq: ['$segment', 'MF'] },
                                  { $eq: ['$segment', 'MO'] }
                                ]
                              },
                              then: 'MCX',
                              else: {
        
                                $cond: {
                                  if: {
                                    $or: [
                                      { $eq: ['$segment', 'CF'] },
                                      { $eq: ['$segment', 'CO'] }
                                    ]
                                  },
                                  then: 'CDS',
        
                                  // all not exist condition 
                                  else: "NFO"
        
                                }
        
                              }
        
                            }
        
        
                          }
        
                        }
        
                      }
        
                    }
                  },
        
            }
        },
        {
            $match: {
                expiry_date: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)) // Get the current date with time set to midnight
                }
            }
        },

        {
            $sort: {
                _id: -1 // Sort in ascending order. Use -1 for descending.
            }
        },
        {
            $project: {
                _id: 0,
                exch_seg: 1,
                token: 1
            }
        }


    ]


    const result = await MainSignals_modal.aggregate(pipeline)
    console.log("result ",result)
    result.forEach(async (element) => {


        const filter = { _id: element.token };
        const update = {
            $set: { _id: element.token, exch: element.exch_seg },
        };
        const update_token = await token_chain_collection.updateOne(filter, update, { upsert: true });

    });




}

const MakecallABR = async () => {


    const pipeline = [
        {
            $match: {
              $and: [
                { status: 0 },
                { ABR_TYPE: { $ne: "at" } }  
              ]
            }
        },
        {
            $addFields: {
                expiry_date: {
                    $dateFromString: {
                        dateString: "$Expiry",
                        format: "%d%m%Y"
                    }
                },
                

                exch_seg: {
                    $cond: {
                      if: { $eq: ['$Segment', 'C'] }, // Your condition here
                      then: 'NSE',
                      else: {
                        $cond: {
                          if: {
                            $or: [
                              { $eq: ['$Segment', 'F'] },
                              { $eq: ['$Segment', 'O'] },
                              { $eq: ['$Segment', 'FO'] }
                            ]
                          },
                          then: 'NFO',
                          else: {
        
                            $cond: {
                              if: {
                                $or: [
                                  { $eq: ['$Segment', 'MF'] },
                                  { $eq: ['$Segment', 'MO'] }
                                ]
                              },
                              then: 'MCX',
                              else: {
        
                                $cond: {
                                  if: {
                                    $or: [
                                      { $eq: ['$Segment', 'CF'] },
                                      { $eq: ['$Segment', 'CO'] }
                                    ]
                                  },
                                  then: 'CDS',
        
                                  // all not exist condition 
                                  else: "NFO"
        
                                }
        
                              }
        
                            }
        
        
                          }
        
                        }
        
                      }
        
                    }
                  },
        
            }
        },
        {
            $match: {
                expiry_date: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)) // Get the current date with time set to midnight
                }
            }
        },

        {
            $sort: {
                _id: -1 // Sort in ascending order. Use -1 for descending.
            }
        },
        {
            $project: {
                _id: 0,
                exch_seg: 1,
                token: 1
            }
        }


    ]


    const result = await makecallABR.aggregate(pipeline)
   // console.log("result ",result)
    result.forEach(async (element) => {


        const filter = { _id: element.token };
        const update = {
            $set: { _id: element.token, exch: element.exch_seg },
        };
        const update_token = await token_chain_collection.updateOne(filter, update, { upsert: true });

       // console.log("update_token ",update_token)

    });




}

