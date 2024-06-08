
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddSubadmin,EditSubadmin,getallSubadmin,getallSubadminClients,getOneSubadmin,GetAllRechargeDetails,UpdateActiveStatusSubadmin,AddBalanceSubadmin,getallSubadminName,GetAllRechargeDetailsById,UpdateBrokerInfo,GetBrokerInfo} = require('../../Controllers/Admins/Subadmins/subadmin.controller')

const {DashboardChartData,DashboardBalanceData} =require('../../Controllers/SubAdmins/DashBoardData/DashboardData')
const {ProfileImagedata,updateProfile,profileId,Profilestatus, GetParentType }=require("../../Controllers//Admins/Profile/ProfileImage")




router.post('/subadmin/add', AddSubadmin);
router.post('/subadmin/edit', EditSubadmin);

router.post('/get/Brokerinfo', GetBrokerInfo);
router.post('/update/Brokerinfo', UpdateBrokerInfo);


router.post('/subadmin/getall', getallSubadmin);
router.post('/subadmin/name/getall', getallSubadminName);

router.post('/subadmin/clients/getall', getallSubadminClients);
router.post('/subadmin/get', getOneSubadmin);

router.post('/recharge/get', GetAllRechargeDetails);
router.post('/recharge/id/get', GetAllRechargeDetailsById);


router.post('/activestatus/update', UpdateActiveStatusSubadmin);
router.post('/balance/add', AddBalanceSubadmin);

router.post("/subadmin/userdata",DashboardChartData)
router.post("/subadmin/user/balance",DashboardBalanceData)


//profile image

router.post("/ProfileImagedata",ProfileImagedata)
router.post("/updateProfile",updateProfile)
router.post("/profileId",profileId)
router.post("/Profilestatus",Profilestatus)



router.post("/parentname/get",GetParentType)











module.exports = router;


