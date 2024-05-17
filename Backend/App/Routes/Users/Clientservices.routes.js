"use strict"

const router = require("express").Router()

const { getClientServices,updateClientServices , GetAllStrategy,FindAllStrategy,statusUpadate} = require('../../Controllers/Users/Clientservices')

const { GetUserTradeSignals } = require('../../Controllers/Users/Signals')
const { UserDashboardData } = require('../../Controllers/Users/Dashboard')




// STRATEGY RELETED ROUTES
router.post('/getall/user/clientServices', getClientServices);
router.post('/getall/user/signals', GetUserTradeSignals);
router.post('/update/clientServices', updateClientServices);
router.post('/user/dashboard', UserDashboardData);
router.post('/getall/strategy', GetAllStrategy);
router.post('/get/allStrategy', FindAllStrategy);
router.post('/statusUpadate',statusUpadate);








module.exports = router;
