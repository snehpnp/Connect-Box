"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddUser } = require('../../Controllers/SubAdmins/Users/user.controller')




// STRATEGY RELETED ROUTES
router.post('/user/add', AddUser);










module.exports = router;
