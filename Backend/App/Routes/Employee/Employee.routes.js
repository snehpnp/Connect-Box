
"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')
const { GetPermission,} = require('../../Controllers/Employee/Employee.controller')

router.post('/permission/getall', GetPermission)

module.exports = router;


