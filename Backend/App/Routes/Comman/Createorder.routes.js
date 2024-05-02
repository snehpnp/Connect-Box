"use strict"

const router = require("express").Router()

const { CreateOder,UpdateOrder,GetResearcheOrder} = require('../../Controllers/Comman/Ordercreate')




router.post('/strategy/order/create', CreateOder);
router.post('/strategy/order/update', UpdateOrder);
router.post('/strategy/order/get', GetResearcheOrder);







module.exports = router;
