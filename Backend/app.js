"use strict";
require('dotenv').config();
const mongoConnection = require('./App/Connections/mongo_connection');
const express = require("express");
const app = express();
const http = require('http'); 
const socketIo = require('socket.io');
const cors = require('cors');
const bodyparser = require('body-parser');

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

// Requiring utility files
require('./App/Utils/Cron.utils');

// Importing routes
require("./App/Routes")(app);

app.get('/tokenget', (req, res) => {
  console.log("RUNNNNNN");
  TokenSymbolUpdate();
});

// Starting the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});
