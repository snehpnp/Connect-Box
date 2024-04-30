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
    origin: "https://connectbox.tradestreet.in/",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {


  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
  });
});

// Requiring utility files
require('./App/Utils/Cron.utils');

// Importing routes
require("./App/Routes")(app);

app.get('/tokenget', (req, res) => {
  TokenSymbolUpdate();
});

// Starting the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});
