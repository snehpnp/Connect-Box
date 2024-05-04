
"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')
const { GetPermission, GetEmployeeById} = require('../../Controllers/Employee/Employee.controller')

router.post('/permission/getall', GetPermission);
router.post('/getEmployee/byid', GetEmployeeById);




module.exports = router;


