const router = require("express").Router()
const {initMsg}=require("../../Controllers/Msg_Broadcast/Message-Broadcast")

router.post("/msg/post",initMsg)


module.exports=router
