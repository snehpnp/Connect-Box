"use strict"

const router = require("express").Router()

const { getClientServices} = require('../../Controllers/Users/Clientservices')

const { GetUserTradeSignals } = require('../../Controllers/Users/Signals')



// STRATEGY RELETED ROUTES
router.post('/getall/user/clientServices', getClientServices);

router.post('/getall/user/signals', GetUserTradeSignals);





module.exports = router;
