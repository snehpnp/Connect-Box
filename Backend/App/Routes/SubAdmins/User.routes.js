"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddUser,GetAllUser ,GetUser,GetAllUserStrategyTransaction,UpdateUserStatus} = require('../../Controllers/SubAdmins/Users/user.controller')




// STRATEGY RELETED ROUTES
router.post('/user/add', AddUser);
router.post('/user/getall', GetAllUser);
router.post('/user/get', GetUser);
router.post('/user/status_update', UpdateUserStatus);





router.post('/strategy/transaction', GetAllUserStrategyTransaction);








module.exports = router;
