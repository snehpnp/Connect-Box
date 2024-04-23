
"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')
const { AddResearcher, GetAllResearcher  } = require('../../Controllers/Researchers/Researcher.controller')

router.post('/researcher/add', AddResearcher)
router.post('/researcher/getall', GetAllResearcher)

 



module.exports = router;


