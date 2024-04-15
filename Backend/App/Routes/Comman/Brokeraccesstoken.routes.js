
"use strict"

const router = require("express").Router()
const db = require('../../Models');
const User = db.user;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



// ALICE BLUE CONTROLLER FILE
const { GetAccessToken } = require('../../Controllers/Brokeraccesstoken/Aliceblue')




// AliCE BLUE
router.get('/AliceBlue', GetAccessToken);




module.exports = router;


