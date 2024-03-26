"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { AddStragegy, GetOneStragegy, EditStragegy, GetAllStrategy, DeleteStragegy, GetAllStrategyForClient, ClientsAccordingToStrategy, GetAddRemoveStrategy, UpdateAddRemoveStrategy } = require('../../Controllers/SubAdmins/strategys/strategy.controller')




// STRATEGY RELETED ROUTES
router.post('/strategy/add', AddStragegy);
router.post('/strategy/get', GetOneStragegy);
router.post('/strategy/edit', EditStragegy);
router.post('/strategy/getall', GetAllStrategy);
router.get('/strategy_for_add_client/getall', GetAllStrategyForClient);
router.post('/strategy/delete', DeleteStragegy);
router.post('/strategy/client/get', ClientsAccordingToStrategy);








module.exports = router;
