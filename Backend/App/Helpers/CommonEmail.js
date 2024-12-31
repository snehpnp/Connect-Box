const nodemailer = require('nodemailer');
const db = require('../Models');
const User = db.user;
const company_information = db.company_information;

const CommonEmail = async (toEmail, subjectEmail, htmlEmail, textEmail, res) => {
    try {
        const companyData = await company_information.findOne();
   
        if (companyData) {
            const transport = nodemailer.createTransport({
                host: companyData.smtphost,
                port: companyData.smtpport,
                secure: true,
                auth: {
                    user: companyData.email,
                    pass: companyData.smtp_password
                }
            });
            const mailOptions = {
                from: companyData.email,
                to: toEmail,
                subject: subjectEmail,
                cc: companyData.cc_mail,
                bcc: companyData.bcc_mail,
                text: textEmail,
                html: htmlEmail
            };

            transport.verify((error, success) => {
                if (error) {
                 
                } else {

                }
            });

            transport.sendMail(mailOptions, (err, info) => {
                if (err) {
                  
                    // return res.send({ status: 'Failed!!!' });
                } else {
                  
                    // return res.send({ status: 'success', msg: "Mail send successfully", data: info.response });
                }
            });
        }
    } catch (error) {
        // console.error("Error in CommonEmail function:", error);
        // return res.status(500).send({ status: 'error', msg: 'Internal server error' });
    }
};

module.exports = { CommonEmail };
