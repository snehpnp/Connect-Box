var axios = require('axios');
const WebSocket = require('ws');
var CryptoJS = require("crypto-js");

const db = require('../Models');

// const { ALice_View_data } = require('./ALice_View_data');

const live_price = db.live_price;
const live_price_token = db.live_price_token;
const UserMakeStrategy = db.UserMakeStrategy;
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;


const uri = process.env.MONGO_URI
const client = new MongoClient(uri);
client.connect();

const db_main = client.db(process.env.DB_NAME);
const dbTradeTools = client.db(process.env.DB_TRADETOOLS);
 

let socketObject = null;

const Alice_Socket = async () => {
 console.log("ddddddddddddddddddd")
  var rr = 0;
    const url = "wss://ws1.aliceblueonline.com/NorenWS/"
    var socket = null
    var broker_infor = await live_price_token.find({ broker_id: "2" , trading_status :"on" });


  console.log("broker_infor",broker_infor) 
  const stock_live_price = db_main.collection('token_chain');
    const updateToken = await stock_live_price.find({}).toArray();

    var channelstr = ""
    if (updateToken.length > 0) {
        updateToken.forEach((data) => {
            if (data.exch != null && data._id != null) {

                channelstr += data.exch + "|" + data._id + "#"
            }
        })
    }
    // Display fetched documents

    var alltokenchannellist = channelstr.substring(0, channelstr.length - 1);

    var aliceBaseUrl = "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/"
    var userid = broker_infor[0].demate_user_id
    var userSession1 = broker_infor[0].access_token
    var trading_status = broker_infor[0].trading_status
    var channelList = alltokenchannellist
    console.log("channelList - ",channelList)

    // var channelList = "NSE|14366#NFO|43227"
    var type = { "loginType": "API" }

    //  Step -1

  if(broker_infor[0].user_id !== undefined && broker_infor[0].access_token !== undefined && broker_infor[0].trading_status == "on"){
    try {

        await axios.post(`${aliceBaseUrl}ws/createSocketSess`, type, {
            headers: {
                'Authorization': `Bearer ${userid} ${userSession1}`,
                'Content-Type': 'application/json'
            },

        }).then(res => {

            //console.log("res - ",res)

            if (res.data.stat == "Ok") {

                try {
                    socket = new WebSocket(url)

                    socket.onopen = function () {
                        var encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession1).toString()).toString();
                        var initCon = {
                            susertoken: encrcptToken,
                            t: "c",
                            actid: userid + "_" + "API",
                            uid: userid + "_" + "API",
                            source: "API"
                        }
                        socket.send(JSON.stringify(initCon))
                    }
                    socket.onmessage = async function (msg) {

                        var response = JSON.parse(msg.data)

                       // console.log("response - ",response)



                        if (response.tk) {

                            // const Make_startegy_token = await UserMakeStrategy.findOne({ tokensymbol: response.tk }, { _id: 1 });
                          
                            // if (Make_startegy_token) {
                            //     ALice_View_data(response.tk, response,dbTradeTools);
                            // }

                            const currentDate = new Date();
                            const hours = currentDate.getHours().toString().padStart(2, '0');
                            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
                            const stock_live_price = db_main.collection('stock_live_price');
                            const filter = { _id: response.tk }; 


                            if (response.lp != undefined) {
                                let bp1 = response.lp
                                let sp1 = response.lp

                                if (response.bp1 != undefined) {
                                    bp1 = response.bp1;
                                }

                                if (response.sp1 != undefined) {
                                    sp1 = response.sp1;
                                }

                                const update = {
                                    $set: {
                                        lp: response.lp,
                                        exc: response.e,
                                        sp1: sp1,
                                        bp1: bp1,
                                        curtime: `${hours}${minutes}`
                                    },
                                };
                                const result = await stock_live_price.updateOne(filter, update, { upsert: true });
                            }







                        } else {
                            // console.log("else", response)
                        }

                        if (response.s === 'OK') {
                            // var channel = await channelList;
                            let json = {
                                k: channelList,
                                t: 't'
                            };
                            await socket.send(JSON.stringify(json))

                            socketObject = socket

                        }
                    }

                    socket.onclose = async function (event) {
                        if (event.wasClean) {
                       // console.log("Socket -- event.wasClean IF")
                        
                        await socketRestart()
                          



                        } else {
                        // console.log("Socket -- event.wasClean ELSE")
                        // await socketRestart()
                          // connect
                          // alert('[close] Connection died');
                        }
                      };
  
                     socket.onerror = function (error) {
                        console.log("Socket -- onerror")
                       
                      };

                } catch (error) {
                    console.log("Error Shocket", error);

                }
            }
        })
            .catch((error) => {
            

                return "error"
            })


    } catch (error) {
        console.log("Error createSocketSess", error);
    }

    }




}

const getSocket = () => {
    return socketObject;
};


const socketRestart = async () => {
    //console.log("socketRestart")
   await Alice_Socket()
};



module.exports = { Alice_Socket, getSocket }