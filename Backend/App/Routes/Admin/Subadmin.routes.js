
"use strict"

const router = require("express").Router()
const {verifyToken}= require('../../Middlewares/autt.middleware')

const { AddSubadmin,EditSubadmin,getallSubadmin,getallSubadminClients,getOneSubadmin,GetAllRechargeDetails} = require('../../Controllers/Admins/Subadmins/subadmin.controller')



router.post('/subadmin/add', AddSubadmin);
router.post('/subadmin/edit', EditSubadmin);

router.post('/subadmin/getall', getallSubadmin);
router.post('/subadmin/clients/getall', getallSubadminClients);
router.post('/subadmin/get', getOneSubadmin);

router.post('/recharge/get', GetAllRechargeDetails);







module.exports = router;


