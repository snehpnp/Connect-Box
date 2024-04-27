"use strict"

const router = require("express").Router()

const { verifyToken } = require('../../Middlewares/autt.middleware')

const { GetallCatagory , GetServiceByCatagory ,Getgetexpirymanualtrade ,GetgetAllStrikePriceApi ,GetgetStrategyData , Getgettokenbysocket ,GetLiveDataSession ,AddDataAboveBelowRange } = require('../../Controllers/Comman/Makecall')




router.post('/make/allCatagory', verifyToken ,GetallCatagory);

router.post('/make/ServiceByCatagory', verifyToken ,GetServiceByCatagory);

router.post('/make/getexpirymanualtrade', verifyToken ,Getgetexpirymanualtrade);

router.post('/make/getAllStrikePriceApi', verifyToken ,GetgetAllStrikePriceApi);

router.post('/make/getStrategyData', verifyToken ,GetgetStrategyData);

router.post('/make/gettokenbysocket', verifyToken ,Getgettokenbysocket);

router.post('/make/LiveDataSession', verifyToken ,GetLiveDataSession);

router.post('/make/AddDataAboveBelowRange', verifyToken ,AddDataAboveBelowRange);





module.exports = router;
