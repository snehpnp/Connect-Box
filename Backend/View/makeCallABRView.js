const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.DB_NAME;


// OPEN POSITION
async function makecallabrView() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(dbName);
        const collectionName = 'makecallabrs';
        const viewName = 'makecall_a_b_r';

        const pipeline = [
     
            {
              $match : {
                 status :0
              }
         
            },
         
             {
                 $addFields: {
                     above_price: {
                         $cond: {
                             if: {
                                 $and: [
         
                                     { $eq: ['$ABR_TYPE', "above"] },
                                 ],
                             },
                             then: { $toDouble: '$Price' },
                             else: {
                               
                                 $add: null
           
                             },
                         },
                     },
                     below_price: {
                         $cond: {
                             if: {
                                 $and: [
         
                                     { $eq: ['$ABR_TYPE', "below"] },
                                 ],
                             },
                             then: { $toDouble: '$Price' },
                             else: {
                               
                                 $add: null
           
                             },
                         },
                     },
                     
                 },
             },
         
             {
                 $lookup: {
                     from: 'stock_live_price',
                     localField: 'token',
                     foreignField: '_id',
                     as: 'stockInfo',
                 },
             },

             {
                $match: {
                  stockInfo: { $ne: [] } // Filter documents where 'stockInfo' array is not empty
                }
              },
         
             {
                 $addFields: {
                     stockInfo: {
                         $ifNull: [
                             { $arrayElemAt: ['$stockInfo', 0] },
                             { curtime: 0, lp: 0, bp1: 0, sp1: 0 }
                         ]
                     },
                     stockInfo_lp: {
                         $ifNull: [
                             { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                             0
                         ]
                     },
                     stockInfo_bp1: {
                         $ifNull: [
                             { $toDouble: { $arrayElemAt: ['$stockInfo.bp1', 0] } },
                             0
                         ]
                     },
                     stockInfo_sp1: {
                         $ifNull: [
                             { $toDouble: { $arrayElemAt: ['$stockInfo.sp1', 0] } },
                             0
                         ]
                     },
                     stockInfo_curtime: {
                         $ifNull: [
                             { $arrayElemAt: ['$stockInfo.curtime', 0] },
                             0
                         ]
                     },
                  
                    
                     isAbove: {
                         $cond: {
                             if: {
                                $and: [
         
                                     { $eq: ['$ABR_TYPE', "above"] },
                                     {
                                         $gte: [
                                             {
                                                 $ifNull: [
                                                     { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                                     0
                                                 ]
                                             },
                                             { $toDouble: '$Price' },
                                         ],
                                     },
                                   
                                 ],
           
                             },
                             then: true,
                             else: false
         
                         },
                     },
                      
                     isBelow: {
                         $cond: {
                             if: {
                                $and: [
         
                                     { $eq: ['$ABR_TYPE', "below"] },
                                     {
                                         $lte: [
                                             {
                                                 $ifNull: [
                                                     { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                                     0
                                                 ]
                                             },
                                             { $toDouble: '$Price' },
                                         ],
                                     },
                                   
                                 ],
           
                             },
                             then: true,
                             else: false
         
                         },
                     },
         
                     isRange: {
                         $cond: {
                             if: {
                                $and: [
         
                                     { $eq: ['$ABR_TYPE', "range"] },
                                     {
                                         $gt: [
                                             {
                                                 $ifNull: [
                                                     { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                                     0
                                                 ]
                                             },
                                             { $toDouble: '$EntryPriceRange_one' },
                                         ],
                                     },
                                     {
                                         $lt: [
                                             {
                                                 $ifNull: [
                                                     { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                                     0
                                                 ]
                                             },
                                             { $toDouble: '$EntryPriceRange_two' },
                                         ],
                                     },
                                   
                                 ],
           
                             },
                             then: true,
                             else: false
         
                         },
                     },
                     
                 },
             },
            
             {
                 $project: {
                     
                     user_id:1,
                     Symbol:1,
                     TType:1,
                     Tr_Price:1,
                     Price:1,
                     EntryPrice:1,
                     Sq_Value:1,
                     Sl_Value:1,
                     TSL:1,
                     Segment:1,
                     Strike:1,
                     OType:1,
                     Expiry:1,
                     Strategy:1,
                     Quntity:1,
                     Key:1,
                     TradeType:1,
                     Target:1,
                     StopLoss:1,
                     ExitTime:1,
                     ExitTime_dt:1,
                     sl_status:1,
                     token:1,
                     EntryPriceRange_one:1,
                     EntryPriceRange_two:1,
                     ABR_TYPE:1,
                     status:1,     
                     marketTimeAmo:1,     
                     above_price:1,
                     below_price:1,
                     stockInfo_curtime: 1,
                     stockInfo_lp: 1,
                     isAbove:1,
                     isBelow:1,
                     isRange:1
         
                 },
             }
         
         
         ]

       

        await database.createCollection(viewName, {
            viewOn: collectionName,
            pipeline: pipeline
        });

        console.log(`View "${viewName}" created successfully.`);
    } finally {
        await client.close();
        console.log('Connection closed.');
    }
}
 


async function makecallabrView_excute(req, res) {
 
    try {
        const sourceViewName = 'makecall_a_b_r';
        const destinationViewName = 'makecallabrView_excute';
    
        const pipeline = [
            {
                $match: {
                    $or: [
                        { isAbove: true },
                        { isBelow: true },
                        { isRange: true }
                    ]
                }
            }
        ];
    
        // Create the destination view with the specified pipeline
        await client.db(dbName).createCollection(destinationViewName, {
            viewOn: sourceViewName,
            pipeline: pipeline,
        });
    
        console.log('Destination view created successfully');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Ensure the client is closed even if an error occurs
        await client.close();
    }
    
    
}


db.createView("makecallabrView_excute", "makecall_a_b_r",
[
    {
        $match: {
            $or: [
                { isAbove: true },
                { isBelow: true },
                { isRange: true }
            ]
        }
    }
]
)



db.createView("makecall_a_b_r", "makecallabrs",
[
     
    {
      $match : {
         status :0
      }
 
    },
 
     {
         $addFields: {
             above_price: {
                 $cond: {
                     if: {
                         $and: [
 
                             { $eq: ['$ABR_TYPE', "above"] },
                         ],
                     },
                     then: { $toDouble: '$Price' },
                     else: {
                       
                         $add: null
   
                     },
                 },
             },
             below_price: {
                 $cond: {
                     if: {
                         $and: [
 
                             { $eq: ['$ABR_TYPE', "below"] },
                         ],
                     },
                     then: { $toDouble: '$Price' },
                     else: {
                       
                         $add: null
   
                     },
                 },
             },
             
         },
     },
 
     {
         $lookup: {
             from: 'stock_live_price',
             localField: 'token',
             foreignField: '_id',
             as: 'stockInfo',
         },
     },

     {
        $match: {
          stockInfo: { $ne: [] } // Filter documents where 'stockInfo' array is not empty
        }
      },
 
     {
         $addFields: {
             stockInfo: {
                 $ifNull: [
                     { $arrayElemAt: ['$stockInfo', 0] },
                     { curtime: 0, lp: 0, bp1: 0, sp1: 0 }
                 ]
             },
             stockInfo_lp: {
                 $ifNull: [
                     { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                     0
                 ]
             },
             stockInfo_bp1: {
                 $ifNull: [
                     { $toDouble: { $arrayElemAt: ['$stockInfo.bp1', 0] } },
                     0
                 ]
             },
             stockInfo_sp1: {
                 $ifNull: [
                     { $toDouble: { $arrayElemAt: ['$stockInfo.sp1', 0] } },
                     0
                 ]
             },
             stockInfo_curtime: {
                 $ifNull: [
                     { $arrayElemAt: ['$stockInfo.curtime', 0] },
                     0
                 ]
             },
          
 
             isAbove: {
                 $cond: {
                     if: {
                        $and: [
 
                             { $eq: ['$ABR_TYPE', "above"] },
                             {
                                 $gte: [
                                     {
                                         $ifNull: [
                                             { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                             0
                                         ]
                                     },
                                     { $toDouble: '$Price' },
                                 ],
                             },
                           
                         ],
   
                     },
                     then: true,
                     else: false
 
                 },
             },
              
             isBelow: {
                 $cond: {
                     if: {
                        $and: [
 
                             { $eq: ['$ABR_TYPE', "below"] },
                             {
                                 $lte: [
                                     {
                                         $ifNull: [
                                             { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                             0
                                         ]
                                     },
                                     { $toDouble: '$Price' },
                                 ],
                             },
                           
                         ],
   
                     },
                     then: true,
                     else: false
 
                 },
             },
 
             isRange: {
                 $cond: {
                     if: {
                        $and: [
 
                             { $eq: ['$ABR_TYPE', "range"] },
                             {
                                 $gt: [
                                     {
                                         $ifNull: [
                                             { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                             0
                                         ]
                                     },
                                     { $toDouble: '$EntryPriceRange_one' },
                                 ],
                             },
                             {
                                 $lt: [
                                     {
                                         $ifNull: [
                                             { $toDouble: { $arrayElemAt: ['$stockInfo.lp', 0] } },
                                             0
                                         ]
                                     },
                                     { $toDouble: '$EntryPriceRange_two' },
                                 ],
                             },
                           
                         ],
   
                     },
                     then: true,
                     else: false
 
                 },
             },
             
         },
     },
    
     {
         $project: {
             
             user_id:1,
             Symbol:1,
             TType:1,
             Tr_Price:1,
             Price:1,
             EntryPrice:1,
             Sq_Value:1,
             Sl_Value:1,
             TSL:1,
             Segment:1,
             Strike:1,
             OType:1,
             Expiry:1,
             Strategy:1,
             Quntity:1,
             Key:1,
             TradeType:1,
             Target:1,
             StopLoss:1,
             ExitTime:1,
             ExitTime_dt:1,
             sl_status:1,
             token:1,
             EntryPriceRange_one:1,
             EntryPriceRange_two:1,
             ABR_TYPE:1,
             status:1,     
             marketTimeAmo:1,     
             above_price:1,
             below_price:1,
             stockInfo_curtime: 1,
             stockInfo_lp: 1,
             isAbove:1,
             isBelow:1,
             isRange:1
 
         },
     }
 
 
 ]
)




module.exports = { makecallabrView_excute,makecallabrView}

