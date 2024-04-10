const {createMessage,getMsgData,deleteMsgData,editMsgData}=require("../../Controllers/Admins/MsgBroadcast/Message_Broadcast");
const router = require("express").Router()

router.post("/messageData",createMessage)
router.post("/getMessageData",getMsgData);
router.post("/messageData/delete",deleteMsgData)
router.post("/messagedata/edit",editMsgData)

module.exports=router;
