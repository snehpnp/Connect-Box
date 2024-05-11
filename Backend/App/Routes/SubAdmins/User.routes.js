"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddUser,UpdateUser,GetAllUser ,GetUser,GetAllUserStrategyTransaction,UpdateUserStatus, DeleteUser,GetAllUserStrategyhistory,GetAllUserStrategyTransactionUser,GetAllEmaployeeName , GetAllSubadminUser} = require('../../Controllers/SubAdmins/Users/user.controller')




// STRATEGY RELETED ROUTES
router.post('/user/add', AddUser);
router.post('/user/update', UpdateUser);

router.post('/user/getall', GetAllUser);
router.post('/subadmin/user/getAll', GetAllSubadminUser);
router.post('/user/get', GetUser);
router.post('/user/status_update', UpdateUserStatus);
router.post('/user/delete', DeleteUser);






router.post('/strategy/transaction', GetAllUserStrategyTransaction);
router.post('/user/strategy/transaction', GetAllUserStrategyTransactionUser);
router.post('/strategy/history', GetAllUserStrategyhistory);
router.post('/employees/name/get', GetAllEmaployeeName);










module.exports = router;
