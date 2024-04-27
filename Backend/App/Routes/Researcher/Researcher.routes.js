
"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')
const { AddResearcher, GetAllResearcher , addResearcherupdate, DeleteResearcher , createStrategy, EditResearcherStragegy, GetStragegyById, GetAllResearcherStrategy} = require('../../Controllers/Researchers/Researcher.controller')

router.post('/researcher/add', AddResearcher)
router.post('/researcher/getall', GetAllResearcher)
router.post('/researcher/updatebalance', addResearcherupdate)
router.post('/researcher/delete', DeleteResearcher)
router.post('/researcher/addstrategy',createStrategy)
router.post('/researcher/editstrategy',EditResearcherStragegy)
router.post('/researcher/getonestrategy',GetStragegyById)
router.post('/researcher/getll',GetAllResearcherStrategy)


 

module.exports = router;


