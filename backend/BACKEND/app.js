"use strict";
require('dotenv').config();
const mongoConnection = require('./App/Connection/mongo_connection')
const express = require("express");
const app = express();

// HELLO SNEH
const http = require("http");
const https = require('https');
const socketIo = require("socket.io");
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


app.use(bodyparser.urlencoded({
  limit: '10mb', extended: true
}));


app.use(bodyparser.json({ limit: '10mb', extended: true }));




app.use(bodyparser.json());
const server = http.createServer(app);
app.use(express.json());

// Routes all
require("./App/Routes")(app)


// REQUIRE File
require('./App/Cron/cron')



// Testing Api #Shakir
require("./shakirTeting")(app)


// EMERGANCY
require("./App/Emergency Apis/service")(app)
require("./App/Emergency Apis/getOptionSymbols")(app)
require("./request")(app)

 const { setIO ,getIO} = require('./App/Helper/BackendSocketIo');


 
// const { initializeSocket } = require('./App/Helper/Backend_Socket');

// const io = initializeSocket(server);



//  ----------------------------   for help center ------------------
const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: true
  }
}
);

io.on("connection", (socket) => {
  console.log(`a user connected with id ${socket.id}`);

  
  socket.on("help_from_client", (data) => {
    socket.broadcast.emit("test_msg_Response", data);
  });

  socket.on("logout_user_from_other_device_req", (data111) => {
    socket.broadcast.emit("logout_user_from_other_device_res", data111);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected with id ${socket.id}`);
  });



})



setIO(io).then(() => {
 // console.log("io set successfully");
  
  // After io is set, you can call getIO
  getIO().then(ioObject => {
     // console.log("ioObject from getIO: ", ioObject);
  }).catch(error => {
      //console.error("Error getting io:", error);
  });

}).catch((error) => {
  console.error("Error setting io:", error);
});









app.get("/pp",(req,res)=>{
  io.emit("EXIT_TRADE_GET_NOTIFICATION", { data: "okkkk" });
  res.send("Trustalgo")
 });




const { Alice_Socket } = require('./App/Helper/Alice_Socket')


// Server start
server.listen(process.env.PORT, () =>{

  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`)
  // Alice_Socket()
});