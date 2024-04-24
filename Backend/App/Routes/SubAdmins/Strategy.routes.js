"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddStragegy, GetOneStragegy, EditStragegy, GetAllStrategy, DeleteStragegy, GetAllStrategyForClient, ClientsAccordingToStrategy, GetAddRemoveStrategy, UpdateAddRemoveStrategy,GetAllSubadminStrategy } = require('../../Controllers/SubAdmins/strategys/strategy.controller')

const { GetDashboardData } = require('../../Controllers/SubAdmins/DashBoardData/DashboardData')

const {Signal_data,getAllSignalByPrefix}=require("../../Controllers/SubAdmins/Order/Order")

const {allEmployeeData,addEmployee,DeleteEmployee,UpdateEmployee,getEmployeeById,UpdateEmployeeStatus} =require("../../Controllers/SubAdmins/Subadmin_Employees/Employees")

// STRATEGY RELETED ROUTES
router.post('/strategy/add', AddStragegy);
router.post('/strategy/get', GetOneStragegy);
router.post('/strategy/edit', EditStragegy);
router.post('/strategy/getall', GetAllStrategy);
router.get('/strategy_for_add_client/getall', GetAllStrategyForClient);
router.post('/strategy/delete', DeleteStragegy);
router.post('/strategy/client/get', ClientsAccordingToStrategy);
router.post('/sub/strategy/getall', GetAllSubadminStrategy);
 

//DashBoard Route
router.post('/data/dashboard', GetDashboardData);

//Order Releated Routes
router.post('/orders/data', Signal_data);
router.post('/client/Order', getAllSignalByPrefix);


//Employee Related Routes
router.post('/employee/data', allEmployeeData);
router.post('/add/employee/data', addEmployee);
router.post('/Delete/employee', DeleteEmployee);
router.post('/employee/update', UpdateEmployee);
router.post('/employee/edit', getEmployeeById);
router.post('/employee/statusUpdate', UpdateEmployeeStatus);









module.exports = router;
