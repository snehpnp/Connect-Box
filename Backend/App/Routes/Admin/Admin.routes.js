
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddAdmin,GetAll_Broker_details ,GetAll_Broker,GetApi_key} = require('../../Controllers/Admins/Admins/Admin.controller')
const { GetDashboardData,GetDashboardData1 ,dashboardtopsubadmins} = require('../../Controllers/Admins/Dashboard/Dashboarddata.controller')


const { EditCompany, GetCompanyInfo, GetCompany_logo, EditEmailInfo } = require('../../Controllers/Admins/Admins/company.controller')


const { EditSubAdminCompany, GetAllCompanyInfo,GetCompanyInfoById} = require('../../Controllers/Admins/Admins/SubadminCompany.controller')




// USER ADD EDIT
router.post('/admin/add', AddAdmin);

// COMPANY RELETE ROUTES
router.get('/company/get', GetCompanyInfo);
router.get('/company_logo/get', GetCompany_logo);
router.post('/emailinfo/edit', EditEmailInfo);
router.post('/company/edit', EditCompany);
// router.post('/edit/emailinfo', verifyToken,upload.single('image'), EditEmailInfo);

router.post('/admin/dashboard', GetDashboardData);
router.post('/admin/dashboard1', GetDashboardData1);
router.post('/admin/top/dashboard', dashboardtopsubadmins);




router.get('/broker/get', GetAll_Broker_details);
router.get('/all/brokers/get', GetAll_Broker);


router.post('/subadmin/company/edit', EditSubAdminCompany);
router.post('/subadmin/company/getall', GetAllCompanyInfo);
router.post('/subadmin/company/getone', GetCompanyInfoById);


//api key
router.post('/subadmin/company/GetApi_key', GetApi_key);






module.exports = router;


