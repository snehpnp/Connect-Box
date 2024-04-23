"use strict"

const router = require("express").Router()

const  {superadminPanel,addAdminandupdate}  = require("../../Controllers/Admins/Superadmin/Superadmin")

router.get("/superadminPanel",superadminPanel)
router.post("/addAdminandupdate",addAdminandupdate)











module.exports = router;