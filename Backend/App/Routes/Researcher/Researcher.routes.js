
"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')
const { AddResearcher, GetAllResearcher , DeleteResearcher , createStrategy, EditResearcherStragegy ,  GetStragegyById, GetAllResearcherStrategy , UpdateResearcher , UpdateResearcherBalance , DeleteResearcherStrategy,GetAllStrategyUsers} = require('../../Controllers/Researchers/Researcher.controller')

router.post('/researcher/add', AddResearcher)
router.post('/researcher/getall', GetAllResearcher)
router.post('/researcher/updatebalance', UpdateResearcherBalance)
router.post('/researcher/delete', DeleteResearcher)
router.post('/researcher/addstrategy',createStrategy)
router.post('/researcher/editstrategy',EditResearcherStragegy)
router.post('/researcher/getonestrategy',GetStragegyById)
router.post('/researcher/getll',GetAllResearcherStrategy)
router.post('/researcher/edit',UpdateResearcher)
router.post('/researcher/strategy/delete', DeleteResearcherStrategy)
router.post('/researcher/strategy/users', GetAllStrategyUsers)
// router.post('/dome', DemoData)







 

module.exports = router;


