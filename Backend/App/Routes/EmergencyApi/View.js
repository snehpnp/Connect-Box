
"use strict"
const router = require("express").Router();
const {CreateAngelView} = require('../../EmergencyApi/View');

router.get('/create/angel', CreateAngelView)

 

module.exports = router;


