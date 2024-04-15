"use strict"

const router = require("express").Router()

const { getDematCredential} = require('../../Controllers/Comman/Userinfo')




router.post('/get/userinfo', getDematCredential);



module.exports = router;
