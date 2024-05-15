var axios = require('axios');
const db = require('../../Backend/App/Models');
const TradeChargeModel = db.tradeCharge;

const trade_charge = async (data) => {
   
    try {

      var req = {
          user_id: data.user_id,
          order_id: data.order_id,
        }

        let tradeChargeStore = new TradeChargeModel(req)
        var tradeChargeSave = await tradeChargeStore.save();
        return
      } catch (error) {
        console.log("trade_charge add data error",error) 
        return
      }

}


module.exports = { trade_charge }
