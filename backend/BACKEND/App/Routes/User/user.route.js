
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middleware/authjwt')

const { getusertradingStatus, getuserUpdateStatus } = require('../../Controllers/User/Trading_status')
const { getClientServices, updateClientServices, TradingOff, ModifyUpdates, GetUserApiCreate,GetLiveAccountmarginInformation,GetLiveAccountPositionInformation ,GetLiveAccountOrderInformation,chartHistory,GetLiveChartData} = require('../../Controllers/User/Dashboard')
const { GetUserBrokerResponse } = require('../../Controllers/User/BrokerReponse')
const { GetUserTradeSignals } = require('../../Controllers/User/Signals')
const { GetUserTradeHistory } = require('../../Controllers/User/TradeHistory')
const { GetUserStrategy,CreateOder,UpdateOrder ,CreatePlanOder,UpdatePlanOrder,GetUserPaymentDetails,UpdatePaymentGatewayKeyApi ,UpdatePaymentAmountApi} = require('../../Controllers/User/Strategy_Desc')
const { AddHelp } = require('../../Controllers/User/HelpCenter')
const { GetAllSymbols } = require('../../Controllers/User/MakeStrategy')





// CLIENT SERVICES
router.post('/getall/user/clientServices', verifyToken, getClientServices);
router.post('/update/clientServices', updateClientServices);
router.post('/update/modify_details', ModifyUpdates);

// TRADING OFF
router.post('/trading/logout', TradingOff);



// TRADING STATUS
router.post('/getall/user/trading_status', getusertradingStatus);
router.post('/getall/user/update_somthing_status', getuserUpdateStatus);


// BROKER RESPONSE
router.post('/getall/user/brokeresponse', GetUserBrokerResponse);

// SIGNALS
router.post('/getall/user/signals', GetUserTradeSignals);

// SIGNALS
router.post('/getall/user/tradehistory', GetUserTradeHistory);



// Help Center
router.post('/create/user/help', AddHelp);


// Make Strategy...
router.get('/getall/user/symbols', GetAllSymbols);

// get User Api Create Info
router.post('/get/user_api_create', GetUserApiCreate);

router.post('/get/livemargin/data', GetLiveAccountmarginInformation);
router.post('/get/live/position', GetLiveAccountPositionInformation);
router.post('/get/live/order', GetLiveAccountOrderInformation);
router.post('/get/chart', chartHistory);
router.post('/get/live/data', GetLiveChartData);







// Srategy Description

router.post('/getall/user/strategy', GetUserStrategy);
router.post('/api/create-order', CreateOder);
router.post('/api/update-order', UpdateOrder);

router.post('/api/UserPaymentDetails', GetUserPaymentDetails);
router.post('/api/UpdatePaymentGatewayKey', UpdatePaymentGatewayKeyApi);

router.post('/api/UpdatePaymentAmount', UpdatePaymentAmountApi);


router.post('/api/order/plan', CreatePlanOder);
router.post('/api/update/plan', UpdatePlanOrder);







module.exports = router;


