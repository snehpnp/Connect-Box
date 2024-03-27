
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddAdmin,GetAll_Broker_details } = require('../../Controllers/Admins/Admins/Admin.controller')

const { EditCompany, GetCompanyInfo, GetCompany_logo, EditEmailInfo } = require('../../Controllers/Admins/Admins/company.controller')


const { EditSubAdminCompany, GetAllCompanyInfo} = require('../../Controllers/Admins/Admins/SubadminCompany.controller')


// USER ADD EDIT
router.post('/admin/add', AddAdmin);

// COMPANY RELETE ROUTES
router.get('/company/get', GetCompanyInfo);
router.get('/company_logo/get', GetCompany_logo);
router.post('/emailinfo/edit', EditEmailInfo);
router.post('/company/edit', EditCompany);
// router.post('/edit/emailinfo', verifyToken,upload.single('image'), EditEmailInfo);



router.get('/broker/get', GetAll_Broker_details);

router.post('/subadmin/company/edit', EditSubAdminCompany);
router.post('/subadmin/company/getall', GetAllCompanyInfo);





module.exports = router;


