const db = require('../../../Models');
const FAQ = db.FAQ


class FaqData {

    async FAQmessage(req,res) {
        try {
          let FAQmessage = FAQ(req.body);
          let messagedata = await FAQmessage.save();
          if (!messagedata) {
            return res.send({ status: false, msg: "message not send ", data: [] });
          }
    
          return res.send({
            status: true,
            msg: "message send  Successfully.",
            data: messagedata,
          });
        } catch (error) {
          console.error("internal error:", error);
        }
      }

    
      // get Faq data 


      async getFAQ(req, res) {
        try {
          const { Role } = req.body; 
      
          let messagedata = await FAQ.find({ Role:Role });
      
          if (!messagedata || messagedata.length === 0) {
            return res.send({ status: false, msg: "No messages found", data: [] });
          }
      
          return res.send({
            status: true,
            msg: "Messages retrieved successfully.",
            data: messagedata,
          });
        } catch (error) {
          console.error("Internal error:", error);
          return res.status(500).send({ status: false, msg: "Internal server error" });
        }
      }
      
    
        
    









}


module.exports = new FaqData();
