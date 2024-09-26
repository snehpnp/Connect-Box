"use strict"

const router = require("express").Router()

const { getDematCredential,TradingOff,Update_User_Broker_Keys,Get_User_Wallet,Update_Stock_Fund} = require('../../Controllers/Comman/Userinfo')




router.post('/get/userinfo', getDematCredential);
router.post('/update/stockfund', Update_Stock_Fund);

router.post('/tradingoff', TradingOff);
router.post('/user/update/brokerinfo', Update_User_Broker_Keys);

router.post('/user/wallet', Get_User_Wallet);




module.exports = router;
