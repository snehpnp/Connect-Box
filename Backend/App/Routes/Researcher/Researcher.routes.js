
"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')
const { AddResearcher, GetAllResearcher , addResearcherupdate, DeleteResearcher } = require('../../Controllers/Researchers/Researcher.controller')

router.post('/researcher/add', AddResearcher)
router.post('/researcher/getall', GetAllResearcher)
router.post('/researcher/updatebalance', addResearcherupdate)
router.post('/researcher/delete', DeleteResearcher)



 



module.exports = router;


