"use strict";
require('dotenv').config();
const mongoConnection = require('./App/Connections/mongo_connection');
const express = require("express");
const app = express();
const http = require('http'); 
const cors = require('cors');
const bodyparser = require('body-parser');
const { Server } = require("socket.io");
const server = http.createServer(app);


const { createViewAlice } = require("./View/Alice_blue");

// Setting up CORS options
const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept", "authorization",
  ],
};
app.use(cors(corsOpts));

// Body-parser middleware setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb', extended: true }));

//socket.io
const io = new Server(server, {
  cors: {
    // origin: "https://connectbox.tradestreet.in/",
    origin: "http://localhost:3000",

    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {


  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });
  socket.on('register', (data) => {
    console.log('User registered: ', data);
});
  
  socket.on("disconnect", () => {
  });
});



// Requiring utility files
require('./App/Utils/Cron.utils');

// Importing routes
require("./App/Routes")(app);
require("./test")(app);

app.get('/aliceblue/view',(req,res)=>{
  createViewAlice()
  res.send("done")
})



// Starting the server
server.listen(process.env.PORT, () => {
const { Alice_Socket } = require("./App/Helpers/Alice_Socket");
  Alice_Socket()
  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});


global.io = io; // To make io instance accessible globally