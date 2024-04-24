"use strict"

const router = require("express").Router()

const  {superadminPanel,addAdminandupdate,AdminHistory}  = require("../../Controllers/Superadmin/Superadmin")

router.get("/superadminPanel",superadminPanel)
router.post("/addAdminandupdate",addAdminandupdate)
router.post("/AdminHistory",AdminHistory)











module.exports = router;