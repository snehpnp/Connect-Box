"use strict"

const router = require("express").Router()

const { BrokerResponse } = require('../../Controllers/Users/Broker_Response.controller')



// STRATEGY RELETED ROUTES
router.post('/broker/response', BrokerResponse);




module.exports = router;
