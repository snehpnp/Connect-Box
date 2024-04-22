
"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')
const { AddResearcher  } = require('../../Controllers/Researchers/Researcher.controller')

router.post('/researcher/add', AddResearcher)
 



module.exports = router;


