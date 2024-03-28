const {createMessage}=require("../../Controllers/Admins/MsgBroadcast/Message_Broadcast");
const router = require("express").Router()

router.post("/messageData",createMessage)

module.exports=router;
