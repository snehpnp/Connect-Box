"use strict"

const router = require("express").Router()

const { getDematCredential,TradingOff} = require('../../Controllers/Comman/Userinfo')




router.post('/get/userinfo', getDematCredential);
router.post('/tradingoff', TradingOff);




module.exports = router;
