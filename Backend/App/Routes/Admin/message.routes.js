const {createMessage,getMsgData,deleteMsgData,editMsgData}=require("../../Controllers/Admins/MsgBroadcast/Message_Broadcast");
const router = require("express").Router()
const {subadminhelpmessage,getsubadminhelpmessage,userhelpmessage,getuserhelpdata,getuserdelete,getsubadmindelete,userdataByPrefix} =require("../../Controllers/Admins/Help/Helpmessage")
const {ProfileImagedata}=require("../../Controllers//Admins/Profile/ProfileImage")


router.post("/messageData",createMessage)
router.post("/getMessageData",getMsgData);
router.post("/messageData/delete",deleteMsgData)
router.post("/messagedata/edit",editMsgData)

// helpmessage
router.post("/subadminhelpmessage",subadminhelpmessage)
router.get("/getsubadminhelpmessage",getsubadminhelpmessage)
router.post("/userhelpmessage",userhelpmessage)
router.get("/getuserhelpdata",getuserhelpdata)
router.post("/getuserdelete",getuserdelete)
router.post("/getsubadmindelete",getsubadmindelete)
router.post("/userdataByPrefix",userdataByPrefix)


//profile image

router.post("/ProfileImagedata",ProfileImagedata)

module.exports=router;
