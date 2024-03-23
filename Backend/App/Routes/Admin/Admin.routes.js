
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddAdmin } = require('../../Controllers/Admins/Admins/Admin.controller')

// USER ADD EDIT
router.post('/admin/add', AddAdmin);




module.exports = router;


