"use strict";
require('dotenv').config();
const mongoConnection = require('./App/Connections/mongo_connection')
const express = require("express");
const app = express();

// HELLO SNEH
const http = require("http");
const https = require('https');
const cors = require('cors');
const bodyparser = require('body-parser')


const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept", "authorization",
  ],
};
app.use(cors(corsOpts));


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb', extended: true }));

app.use(bodyparser.json());
const server = http.createServer(app);
app.use(express.json());



// REQUIRE File
require('./App/Utils/Cron.utils')

// Routes all
require("./App/Routes")(app)






// Server start
server.listen(process.env.PORT, () =>{
  console.log(`Server is running on  http://0.0.0.0:${process.env.PORT}`)

});