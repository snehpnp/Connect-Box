"use strict";
require('dotenv').config();
const mongoConnection = require('./App/Connections/mongo_connection');
const express = require("express");
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyparser = require('body-parser');
const { Server } = require("socket.io");
const socketIo = require("socket.io");
const { createViewMandotsecurities } = require("./View/mandotsecurities");
const { setIO, getIO } = require('./App/Helpers/BackendSocketIo');

const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept", "authorization",
  ],
};
app.use(cors(corsOpts));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb', extended: true }));

// LIVE CODE --------
// var privateKey = fs.readFileSync('../crt/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('../crt/fullchain.pem', 'utf8');
// var credentials = { key: privateKey, cert: certificate };
// const httpsserver = https.createServer(credentials, app);

// LOCAL CODE --------
const server = http.createServer(app);



// LOCAL CODE --------
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// LIVE CODE --------
// const io = socketIo(httpsserver, {
//   cors: {
//       origin: "*",
//       credentials: true
//   }
// });


io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });


  socket.on("login", (data) => {
    io.emit("logout", data);
  });

  socket.on("disconnect", () => {
  });
});



setIO(io).then(() => {

  getIO().then(ioObject => {
  }).catch(error => {
  });

}).catch((error) => {
  console.error("Error setting io:", error);
});


// Requiring utility files
require('./App/Utils/Cron.utils');

// Importing routes
require("./App/Routes")(app);




app.get('/aliceblue/view', (req, res) => {
  createViewMandotsecurities()
  res.send("done")
})


// httpsserver.listen(1001)
server.listen(process.env.PORT, () => {
  const { Alice_Socket } = require("./App/Helpers/Alice_Socket");
  Alice_Socket()
  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});
