
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddAdmin } = require('../../Controllers/Admins/Admins/Admin.controller')

const { EditCompany, GetCompanyInfo, GetCompany_logo, EditEmailInfo } = require('../../Controllers/Admins/Admins/company.controller')

// USER ADD EDIT
router.post('/admin/add', AddAdmin);

// COMPANY RELETE ROUTES
router.get('/company/get', GetCompanyInfo);
router.get('/company_logo/get', GetCompany_logo);
router.post('/emailinfo/edit', EditEmailInfo);
router.post('/company/edit', EditCompany);
// router.post('/edit/emailinfo', verifyToken,upload.single('image'), EditEmailInfo);


module.exports = router;


