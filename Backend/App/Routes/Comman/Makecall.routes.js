"use strict";

const router = require("express").Router();

const {
  GetallCatagory,
  GetServiceByCatagory,
  Getgetexpirymanualtrade,
  GetgetAllStrikePriceApi,
  GetgetStrategyData,
  Getgettokenbysocket,
  GetLiveDataSession,
  AddDataAboveBelowRange,
  GetDataAboveBelowRange,
  DeleteDataMakeCall,
  UpdateDataMakeCall,
} = require("../../Controllers/Comman/Makecall");

router.post("/make/allCatagory", GetallCatagory);

router.post("/make/ServiceByCatagory", GetServiceByCatagory);

router.post("/make/getexpirymanualtrade", Getgetexpirymanualtrade);

router.post("/make/getAllStrikePriceApi", GetgetAllStrikePriceApi);

router.post("/make/getStrategyData", GetgetStrategyData);

router.post("/make/gettokenbysocket", Getgettokenbysocket);

router.post("/make/LiveDataSession", GetLiveDataSession);

router.post("/make/AddDataAboveBelowRange", AddDataAboveBelowRange);

router.post("/make/GetDataAboveBelowRange", GetDataAboveBelowRange);

router.post("/make/DeleteDataMakeCall", DeleteDataMakeCall);

router.post("/make/UpdateDataMakeCall", UpdateDataMakeCall);

module.exports = router;
