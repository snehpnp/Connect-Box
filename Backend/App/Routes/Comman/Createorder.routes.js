"use strict"

const router = require("express").Router()

const { CreateOder,UpdateOrder} = require('../../Controllers/Comman/Ordercreate')




router.post('/strategy/order/create', CreateOder);
router.post('/strategy/order/update', UpdateOrder);






module.exports = router;
