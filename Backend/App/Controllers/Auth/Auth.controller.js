"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { CommonEmail } = require('../../Helper/CommonEmail')
const { firstOptPass, disclaimer } = require("../../Helpers/Email_formate/first_login");

const db = require('../../Models');
const User = db.user;
const company_information = db.company_information;



// Login CLASS
class Auth {

    // Login User
    async login(req, res) {
        try {
            const { Email, Password, device } = req.body;
            // IF Login Time Email CHECK



            const EmailCheck = await User.findOne({ Email: Email });
            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            if (EmailCheck.Role == "USER" || EmailCheck.Role == "SUBADMIN") {
                // WHERE LOGIN CHECKgetIPAddress
                if (device == "APP") {                  //App Login Check
                    if (EmailCheck.AppLoginStatus == 1) {
                        return res.send({ status: false, msg: 'You are already logged in on the phone.', data: [] });
                    }
                } else if (device == "WEB") {          //Web login check
                    if (EmailCheck.WebLoginStatus == 1) {
                        return res.send({ status: false, msg: 'You are already logged in on the Web.', data: [] });
                    }
                }

            }

            // Password Check
            const validPassword = await bcrypt.compare(Password, EmailCheck.Password);
            if (validPassword == false) {
                return res.send({ status: false, msg: 'Password Not Match', data: [] });
            }

            if (EmailCheck.Role == "USER") {

                // User active Status
                if (EmailCheck.ActiveStatus == 0) {
                    return res.send({ status: false, msg: 'please contact admin you are inactive.', data: [] });
                }

                // USER EXPIRY CHECK
                if (new Date(EmailCheck.EndDate) <= new Date()) {
                    return res.send({ status: false, msg: 'your service is terminated please contact to admin', data: [] });
                }
            }



            // JWT TOKEN CREATE
            var token = jwt.sign({ id: EmailCheck._id }, process.env.SECRET, {
                expiresIn: 36000 // 10 hours
            });


            var msg = {
                'Email': EmailCheck.Email,
                'user_id': EmailCheck._id,
                'token': token,
                'mobile': EmailCheck.PhoneNo, Role: EmailCheck.Role,
                "broker": EmailCheck.broker,
                "type": EmailCheck.license_type,
                "UserName": EmailCheck.UserName
            };


            var token_query
            if (device == "APP") {
                token_query = { app_login_token: token }
            } else {
                token_query = { web_login_token: token }
            }


            let result11 = await User.findByIdAndUpdate(
                EmailCheck._id,
                token_query,
                { new: true }
            )


            try {
                return res.send({ status: true, msg: "Login Succesfully", data: msg })
            } catch (error) {
                console.log("Error Some Error in a login", error);
            }
        }
        catch (error) {

            res.send({ status: false, msg: "Server Side error", data: error })
        }

    }


    // Verify user
    async verifyUser(req, res) {
        try {
            const { Email, Otp, Device } = req.body;
            var addData = {}

            // IF Login Time Email CHECK
            const EmailCheck = await User.findOne({ Email: Email });
            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            // CHECK OTP AND VERFIY OUR CLIENTS
            if (EmailCheck.PhoneNo.slice(-4) != Otp) {
                return res.send({ status: false, msg: 'Otp Not Match', data: [] });
            }

            try {
                if (EmailCheck.Role == "USER" || EmailCheck.Role == "SUBADMIN") {

                    // WHERE LOGIN CHECK
                    if (Device.toUpperCase() == "APP") {                  //App Login Check
                        if (EmailCheck.AppLoginStatus == 1) {
                            return res.send({ status: false, msg: 'You are already logged in on the phone.', data: [] });
                        } else {
                            addData["AppLoginStatus"] = 1;
                        }
                    } else if (Device.toUpperCase() == "WEB") {          //Web login check
                        if (EmailCheck.WebLoginStatus == 1) {
                            return res.send({ status: false, msg: 'You are already logged in on the Web.', data: [] });
                        } else {
                            addData["WebLoginStatus"] = 1;
                        }
                    }
                } else {


                    // WHERE LOGIN CHECK
                    if (Device.toUpperCase() == "APP") {                  //App Login Check

                        addData["AppLoginStatus"] = 1;

                    } else if (Device.toUpperCase() == "WEB") {          //Web login check

                        addData["WebLoginStatus"] = 1;

                    }

                }


            } catch (error) {
                return res.send({ status: false, msg: 'Server Issue', data: error });

            }


            if (EmailCheck.Is_First_login == "0") {
                var disclaimerData = await disclaimer();

                var toEmail = EmailCheck.Email;
                var subjectEmail = "disclaimer";
                CommonEmail(toEmail, subjectEmail, disclaimerData);
            }



            addData["Is_First_login"] = 1;
            // Update Successfully
            const result = await User.updateOne(
                { Email: Email },
                { $set: addData }
            );

            // If Not Update User
            if (!result) {
                return res.send({ status: false, msg: 'Server Side issue.', data: [] });
            }

            // ADD USER LOGS COLLECTION DATA
            const user_login = new user_logs({
                user_Id: EmailCheck._id,
                login_status: "Panel On",
                role: EmailCheck.Role,
                device: Device,

            })
            await user_login.save();

            return res.send({ status: true, msg: "Login Successfully", data: [], firstlogin: EmailCheck.Is_First_login })


        } catch (error) {

        }
    }


    // Logout User
    async logoutUser(req, res) {
        try {
            const { userId, Device } = req.body;
            var addData = {}

            // IF Login Time Email CHECK
            const EmailCheck = await User.findById(userId);
            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }


            try {
                // WHERE LOGIN CHECK
                if (Device.toUpperCase() == "APP") {                  //App Login Check
                    if (EmailCheck.AppLoginStatus == 0) {
                    } else {
                        addData["AppLoginStatus"] = 0;
                    }
                } else if (Device.toUpperCase() == "WEB") {          //Web login check
                    if (EmailCheck.WebLoginStatus == 0) {
                        // return res.send({ status: false, msg: 'You are already log Out on the Web.', data: [] });
                    } else {
                        addData["WebLoginStatus"] = 0;
                    }
                }

            } catch (error) {
                console.log("Error Verfiy error", error);
            }


            // Update Successfully
            const result = await User.updateOne(
                { Email: EmailCheck.Email },
                { $set: addData }
            );

            const user_login = new user_logs({
                user_Id: EmailCheck._id,
                login_status: "Panel off",
                role: EmailCheck.Role
            })
            await user_login.save();

            // If Not Update User
            if (!result) {
                return res.send({ status: false, msg: 'Server Side issue.', data: [] });
            }


            return res.send({ status: true, msg: "Logout Succesfully", data: [] })


        } catch (error) {

        }
    }


    async ForgetPassword(req, res) {
        try {

            const { Email, Device } = req.body;

            // // IF Login Time Email CHECK
            var EmailCheck = await User.findOne({ Email: Email })
            var CompanyInformation = await company_information.findOne()

            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }


            var userid = Buffer.from(JSON.stringify(EmailCheck._id)).toString('base64');
            var redirectUrl = `https://${CompanyInformation.domain_url}/#/update/${userid}`

            var toEmail = Email;
            var subjectEmail = "Forget Password";
            var htmlEmail = "URL - " + redirectUrl;
            CommonEmail(toEmail, subjectEmail, htmlEmail)


        } catch (error) {

        }

        return res.send({ status: true, msg: "Mail send successfully", data: redirectUrl })
    }


    // Update Password
    async UpdatePassword(req, res) {
        try {
            const { userid, newpassword, confirmpassword } = req.body;


            // // IF Login Time Email CHECK
            const EmailCheck = await User.findById(userid);

            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            if (newpassword !== confirmpassword) {
                return res.send({ status: false, msg: 'New Password and Confirm Password Not Match', data: [] });
            }

            const hashedPassword = await bcrypt.hash(newpassword, 8);
            let result = await User.findByIdAndUpdate(
                EmailCheck._id,
                {
                    Password: hashedPassword,
                    Otp: newpassword
                },
                { new: true }
            )

            // If Not Update User
            if (!result) {
                return res.send({ status: false, msg: 'Server Side issue.', data: [] });
            }


            return res.send({ status: true, msg: "Password Update Successfully" });
        } catch (error) {

        }
    }

    // Reset Password
    async ResetPassword(req, res) {
        try {
            const { userid, newpassword, oldpassword } = req.body;
            // // IF Login Time Email CHECK
            const EmailCheck = await User.findById(userid);

            // return
            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            const validPassword = await bcrypt.compare(oldpassword.toString(), EmailCheck.Password.toString());

            // return
            if (!validPassword) {
                res.status(409).send({ success: 'false', message: 'old Password Not Match' });
                return
            } else {
                const hashedPassword = await bcrypt.hash(newpassword, 8);
                await User.findByIdAndUpdate(
                    EmailCheck._id,
                    {
                        Password: hashedPassword,
                        Otp: newpassword
                    },
                    { new: true }
                );

            }


            res.send({ status: true, message: "Password Update Successfully" });

            logger.info('Password Update Successfully', { role: EmailCheck.Role, user_id: EmailCheck._id });
            // res.send({ status: true, message: "Password Update Successfully" });
        } catch (error) {

        }
    }



}


module.exports = new Auth();