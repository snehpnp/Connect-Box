"use strict"

const router = require("express").Router()

const { verifyToken } = require('../../Middlewares/autt.middleware')

const { GetallCatagory , GetServiceByCatagory ,Getgetexpirymanualtrade ,GetgetAllStrikePriceApi} = require('../../Controllers/Comman/Makecall')




router.post('/make/allCatagory', verifyToken ,GetallCatagory);

router.post('/make/ServiceByCatagory', verifyToken ,GetServiceByCatagory);

router.post('/make/getexpirymanualtrade', verifyToken ,Getgetexpirymanualtrade);

router.post('/make/getAllStrikePriceApi', verifyToken ,GetgetAllStrikePriceApi);





module.exports = router;
