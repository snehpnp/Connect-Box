
"use strict"
const router = require("express").Router()
const {verifyToken}= require('../../Middlewares/autt.middleware')

const { login,verifyUser,logoutUser,ForgetPassword,ResetPassword,UpdatePassword , SignUpUser,PasswordChanged} = require('../../Controllers/Auth/Auth.controller')



router.post('/login', login)
router.post('/verifyUser', verifyUser)
router.post('/logoutUser', logoutUser)
router.post('/forgetpassword', ForgetPassword)
router.post('/resetpassword', ResetPassword)
router.post('/UpdatePassword', UpdatePassword)
router.post('/signup', SignUpUser)
router.post('/PasswordChanged', PasswordChanged)



module.exports = router;


