
"use strict"

const router = require("express").Router()
const {verifyToken}= require('../../Middlewares/autt.middleware')

const { login,verifyUser,logoutUser} = require('../../Controllers/Auth/Auth.controller')



router.post('/login', login)
router.post('/verifyUser', verifyUser)

router.post('/logoutUser', logoutUser)


module.exports = router;


