
"use strict"

const router = require("express").Router()
const {verifyToken}= require('../../Middlewares/autt.middleware')

const { login, signup,verifyUser} = require('../../Controllers/Auth/Auth.controller')



router.post('/login', login)
router.post('/signup', signup)
router.post('/verifyUser', verifyUser)




module.exports = router;


