"use strict"

const router = require("express").Router()

const { CreateOder,UpdateOrder,GetResearcheOrder,CreateOderStg,UpdateOrderstg,Createorderfreepal} = require('../../Controllers/Comman/Ordercreate')




router.post('/strategy/order/create', CreateOder);
router.post('/strategy/order/update', UpdateOrder);
router.post('/strategy/order/get', GetResearcheOrder);
router.post('/strategy/order/freePlan', Createorderfreepal);



router.post('/user/strategy/order/create', CreateOderStg);
router.post('/user/strategy/order/update', UpdateOrderstg);





module.exports = router;
