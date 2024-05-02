"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const {Signal_data,MainSignal_data,getAllSignalByPrefix,update_stop_loss}=require("../../Controllers/SubAdmins/Order/Order")



//Order Releated Routes
router.post('/orders/data', Signal_data);
router.post('/trade/data', MainSignal_data);

router.post('/update/trade', update_stop_loss);



router.post('/client/Order', getAllSignalByPrefix);






module.exports = router;
