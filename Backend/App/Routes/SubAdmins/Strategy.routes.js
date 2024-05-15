"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddStragegy, GetOneStragegy, EditStragegy, GetAllStrategy, DeleteStragegy, GetAllStrategyForClient, ClientsAccordingToStrategy, GetAddRemoveStrategy, UpdateAddRemoveStrategy,GetAllSubadminStrategy , getAllResearcherStrategy,subadminTradeCharges,userTradeCharges } = require('../../Controllers/SubAdmins/strategys/strategy.controller')

const { GetDashboardData ,EmployeeDashboardData} = require('../../Controllers/SubAdmins/DashBoardData/DashboardData')


const {allEmployeeData,addEmployee,DeleteEmployee,UpdateEmployee,getEmployeeById,UpdateEmployeeStatus,GetAllStrategyForEmployee,getAllgroupServices} =require("../../Controllers/SubAdmins/Subadmin_Employees/Employees")

// STRATEGY RELETED ROUTES
router.post('/strategy/add', AddStragegy);
router.post('/strategy/get', GetOneStragegy);
router.post('/strategy/edit', EditStragegy);
router.post('/strategy/getall', GetAllStrategy);
router.post('/strategy_for_add_client/getall', GetAllStrategyForClient);
router.post('/strategy/delete', DeleteStragegy);
router.post('/strategy/client/get', ClientsAccordingToStrategy);
router.post('/sub/strategy/getall', GetAllSubadminStrategy);

router.post('/sub/trade/charges', subadminTradeCharges);
router.post('/user/trade/charges', userTradeCharges);


 

//DashBoard Route
router.post('/data/dashboard', GetDashboardData);
router.post('/employee/dashboard', EmployeeDashboardData);





//Employee Related Routes
router.post('/employee/data', allEmployeeData);
router.post('/add/employee/data', addEmployee);
router.post('/Delete/employee', DeleteEmployee);
router.post('/employee/update', UpdateEmployee);
router.post('/employee/edit', getEmployeeById);
router.post('/employee/statusUpdate', UpdateEmployeeStatus);
router.post('/subadmin/allsearcher/strategy', getAllResearcherStrategy);
router.post('/get/strategy', GetAllStrategyForEmployee);
router.post('/get/allgroupServices', getAllgroupServices);



module.exports = router;
