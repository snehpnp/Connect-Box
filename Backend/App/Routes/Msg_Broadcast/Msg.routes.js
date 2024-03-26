const {StrategyPost,getStrategyData}=require("../../Controllers/Msg_Broadcast/Message-Broadcast")
const router = require("express").Router()


router.post("/strategy",StrategyPost);
router.get("/getStrategy",getStrategyData)

module.exports=router
