"use strict";
const db = require('../../Models');
const Signals_modal = db.Signals
const Alice_token = db.Alice_token;
const Get_Option_Chain_modal = db.option_chain_symbols;


const { formattedDateTime } = require('../../Helper/time.helper')


// Hello Ganpat
var fs = require('fs');
var axios = require('axios');
var Promise = require('polyfill-promise');
var Sheets = require('google-sheets-api').Sheets;
const Papa = require('papaparse')



class Signals {

    // GET ADMIN SIGNALS
    async GetAdminSignals(req, res) {

        //console.log(" req.body ",req.body)
        try {
            const { startDate } = req.body;
            if (!startDate) {
                return res.status(200).json({ status: true, msg: 'Can Not Find Date Specific Signals', data: [] });
            }
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                // const filteredSignals = await Signals_modal.find({
                //     createdAt: {
                //         $gte: today,
                //         $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                //     },
                // }).sort({ createdAt: -1 })


                const filteredSignals = await Signals_modal.aggregate([
                    {
                      $match: {
                        createdAt: {
                          $gte: today,
                          $lt:  new Date(today.getTime() + 24 * 60 * 60 * 1000),
                        }
                      }
                    },
                    {
                      $sort: {
                        createdAt: -1
                      }
                    },

                     {
                        $lookup: {
                          from: 'strategies',
                          localField: 'strategy',
                          foreignField: 'strategy_name', // Assuming this is the field in collection2 which corresponds to the _id of collection1
                          as: 'StrategyData'
                        }
                      },
                      {
                        $unwind: '$StrategyData',
                      },

                      {
                        $project : {
                            
                            symbol:1,
                            type:1,
                            price:1,
                            qty_percent:1,
                            exchange:1,
                            sq_value:1,
                            sl_value:1,
                            tsl:1,
                            tr_price:1,
                            dt:1,
                            dt_date:1,
                            strategy:1,
                            option_type:1,
                            strike:1,
                            expiry:1,
                            segment:1,
                            trade_symbol:1,
                            client_persnal_key:1,
                            TradeType:1,
                            token:1,
                            lot_size:1,
                            MakeStartegyName:1,
                            createdAt:1,
                            updatedAt:1,
                            "StrategyData._id":1,
                            "StrategyData.strategy_name":1,
                            "StrategyData.strategy_segment":1,
                            "StrategyData.strategy_category":1
  
                           
                        }
                      }
                  ])


                  //console.log("filteredSignals ",filteredSignals)

                if (filteredSignals.length === 0) {
                    return res.send({ status: false, msg: 'No signals founddate range.', data: [] });
                }
                return res.status(200).json({ status: true, msg: 'Filtered Signals', data: filteredSignals });
            } catch (error) {
                return res.status(500).json({ status: false, msg: 'Error fetching filtered signals.', error: error.message });
            }
        } catch (error) {
            console.log("Error Theme error-", error);
        }
    }



    async GetStrickPriceFromSheet() {
        try {
            const csvFilePath = 'https://docs.google.com/spreadsheets/d/1wwSMDmZuxrDXJsmxSIELk1O01F0x1-0LEpY03iY1tWU/export?format=csv';

            try {
                const { data } = await axios.get(csvFilePath);

                Papa.parse(data, {
                    complete: async (result) => {
                        let sheet_Data = result.data;

                        // Remove duplicates based on SYMBOL
                        const uniqueSymbols = [...new Set(sheet_Data.map(item => item.SYMBOL))];
                        sheet_Data = sheet_Data.filter((item, index, self) =>
                            index === self.findIndex(t => t.SYMBOL === item.SYMBOL)
                        );

                        // Map and update specific SYMBOL values
                        sheet_Data.forEach(data => {
                            switch (data.SYMBOL) {
                                case "NIFTY_BANK":
                                    data.SYMBOL = "BANKNIFTY";
                                    break;
                                case "NIFTY_50":
                                    data.SYMBOL = "NIFTY";
                                    break;
                                case "NIFTY_FIN_SERVICE":
                                    data.SYMBOL = "FINNIFTY";
                                    break;
                                // Add more cases if needed
                            }
                        });

                        // Sort the array based on SYMBOL
                        sheet_Data.sort((a, b) => a.SYMBOL.localeCompare(b.SYMBOL));

                        // Use Promise.all to wait for all updates to complete
                        await Promise.all(sheet_Data.map(async (data) => {
                            const result = await Get_Option_Chain_modal.updateOne(
                                { symbol: data.SYMBOL },
                                { $set: { price: data.CPrice } }
                            );
                        }));

                        // return res.json({ status: true, msg: 'Data found', data: sheet_Data });
                    },
                    header: true,
                });
            } catch (error) {
                console.error('Error fetching or parsing CSV:', error.message);
                // res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            console.log("Error Theme error-", error);
        }
    }



}


module.exports = new Signals();