"use strict"
const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { Get_Option_Symbol , Get_Option_Symbol_Expiry , update_option_symbols_status, Get_Option_All_Round_Token, Open_Position, Get_Option_All_Token_Chain , update_stop_loss , Stock_chain , subscribr_token } = require('../../Controllers/SubAdmins/OptionChain/OptionChain.controller')




router.post('/get/option_symbols', Get_Option_Symbol);
router.post('/get/option_symbol_expiry', Get_Option_Symbol_Expiry);
router.post('/update/option_symbols_status', update_option_symbols_status);
router.post('/get/all_round_token', Get_Option_All_Round_Token);
router.post('/get/open_position', Open_Position);
router.post('/get/option/chain', Get_Option_All_Token_Chain);
router.post('/update/signal', update_stop_loss);
router.post('/get/stockchain', Stock_chain);
router.post('/update/subscribe/token', subscribr_token);
 







module.exports = router;