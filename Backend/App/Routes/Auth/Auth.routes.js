
"use strict"

const router = require("express").Router()
const {verifyToken}= require('../../Middlewares/autt.middleware')

const { login,verifyUser,logoutUser,ForgetPassword,ResetPassword,UpdatePassword} = require('../../Controllers/Auth/Auth.controller')



router.post('/login', login)
router.post('/verifyUser', verifyUser)

router.post('/logoutUser', logoutUser)

router.post('/forgetpassword', ForgetPassword)
router.post('/resetpassword', ResetPassword)
router.post('/update', UpdatePassword)


module.exports = router;


