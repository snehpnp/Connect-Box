"use strict"

const router = require("express").Router()

const  {superadminPanel,addAdminandupdate,AdminHistory,subadmindetail,getUserdetail,updateUserdetail,deleteUser}  = require("../../Controllers/Superadmin/Superadmin")

router.get("/superadminPanel",superadminPanel)
router.post("/addAdminandupdate",addAdminandupdate)
router.post("/AdminHistory",AdminHistory)
router.post("/subadmindetail",subadmindetail)
router.post("/updateUserdetail",updateUserdetail)
router.post("/deleteUser",deleteUser)











module.exports = router;