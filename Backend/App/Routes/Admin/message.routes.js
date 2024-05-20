const router = require("express").Router()
const {createMessage,getMsgData,deleteMsgData,editMsgData,getadminandresearchername,getbroadcastMsg}=require("../../Controllers/Admins/MsgBroadcast/Message_Broadcast");
const {subadminhelpmessage,getsubadminhelpmessage,userhelpmessage,getuserhelpdata,getuserdelete,getsubadmindelete,userdataByPrefix,getResearcher,getEmployee,getEmployeebyid} =require("../../Controllers/Admins/Help/Helpmessage")

const {ProfileImagedata} =require("../../Controllers/Admins/Profile/ProfileImage")

router.post("/messageData",createMessage)
router.post("/getMessageData",getMsgData);
router.post("/messageData/delete",deleteMsgData)
router.post("/messagedata/edit",editMsgData)
router.post("/messagedata/name/get",getadminandresearchername)
router.post("/getbroadcastMsg",getbroadcastMsg)


// helpmessage
router.post("/subadminhelpmessage",subadminhelpmessage)
router.get("/getsubadminhelpmessage",getsubadminhelpmessage)
router.post("/userhelpmessage",userhelpmessage)
router.get("/getuserhelpdata",getuserhelpdata)
router.post("/getuserdelete",getuserdelete)
router.post("/getsubadmindelete",getsubadmindelete)
router.post("/userdataByPrefix",userdataByPrefix)
router.post("/getResearcher",getResearcher)
router.post("/getEmployee",getEmployee)
router.post("/getEmployeebyid",getEmployeebyid)



//profile image

router.post("/ProfileImagedata",ProfileImagedata)

module.exports=router;
