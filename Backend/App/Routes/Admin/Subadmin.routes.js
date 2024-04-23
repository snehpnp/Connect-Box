
"use strict"

const router = require("express").Router()

const { AddSubadmin,EditSubadmin,getallSubadmin,getallSubadminClients,getOneSubadmin,GetAllRechargeDetails,UpdateActiveStatusSubadmin,AddBalanceSubadmin,getallSubadminName,GetAllRechargeDetailsById} = require('../../Controllers/Admins/Subadmins/subadmin.controller')

const {DashboardChartData,DashboardBalanceData} =require('../../Controllers/SubAdmins/DashBoardData/DashboardData')
const {ProfileImagedata,updateProfile,profileId,Profilestatus }=require("../../Controllers//Admins/Profile/ProfileImage")




router.post('/subadmin/add', AddSubadmin);
router.post('/subadmin/edit', EditSubadmin);

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







module.exports = router;


