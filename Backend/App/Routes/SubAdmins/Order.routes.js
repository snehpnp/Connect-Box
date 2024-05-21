"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const {Signal_data,MainSignal_data,getAllSignalByPrefix,update_stop_loss,Tradehistory_data,UserTradehistory_data}=require("../../Controllers/SubAdmins/Order/Order")



//Order Releated Routes
router.post('/orders/data',verifyToken, Signal_data);
router.post('/trade/data', MainSignal_data);

router.post('/update/trade', update_stop_loss);


router.post('/tradehistory/data', Tradehistory_data);

router.post('/client/Order', getAllSignalByPrefix);

router.post('/user/tradehistory', UserTradehistory_data)







module.exports = router;
