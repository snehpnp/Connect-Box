const {createMessage,getMsgData}=require("../../Controllers/Admins/MsgBroadcast/Message_Broadcast");
const router = require("express").Router()

router.post("/messageData",createMessage)
router.post("/getMessageData",getMsgData);
module.exports=router;
