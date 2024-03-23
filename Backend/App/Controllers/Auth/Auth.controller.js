"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { CommonEmail } = require('../../Helper/CommonEmail')
const { firstOptPass, disclaimer } = require("../../Helpers/Email_formate/first_login");

const db = require('../../Models');
const company_information = db.company_information;
const User = db.user;
const Subadmin_Permission = db.Subadmin_Permission;
const user_SignUp = db.UserSignUp;



 



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
                        return res.json({ status: false, msg: 'You are already logged in on the phone.', data: [] });
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

            if (EmailCheck.Role == "SUBADMIN") {

                var SubadminPermision = await Subadmin_Permission.find({ user_id: EmailCheck._id })
                var msg = {
                    'Email': EmailCheck.Email,
                    'user_id': EmailCheck._id,
                    'token': token,
                    'mobile': EmailCheck.PhoneNo, Role: EmailCheck.Role,
                    'Subadmin_permision': SubadminPermision,
                    "broker": EmailCheck.broker,
                    "UserName": EmailCheck.UserName
                };
            } else {
                var msg = {
                    'Email': EmailCheck.Email,
                    'user_id': EmailCheck._id,
                    'token': token,
                    'mobile': EmailCheck.PhoneNo, Role: EmailCheck.Role,
                    "broker": EmailCheck.broker,
                    "type": EmailCheck.license_type,
                    "UserName": EmailCheck.UserName


                };
            }


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
                logger.info('Login Succesfully', { Email: EmailCheck.Email, role: EmailCheck.Role, user_id: EmailCheck._id });
                res.send({ status: true, msg: "Login Succesfully", data: msg })
            } catch (error) {
                console.log("Error Some Error in a login", error);
            }
        }
        catch (error) {

            res.send({ status: false, msg: "Server Side error", data: error })
        }

    }

    // User SignUp
    async signup(req, res) {
        try {
            const { UserName, FullName, Email, PhoneNo } = req.body;

            const searchQuery = {
                $or: [
                    { UserName: UserName },
                    { Email: Email },
                    { PhoneNo: PhoneNo }
                ]
            };

            const existingUser_DB = await User.findOne(searchQuery);
            const existingSignupUser_DB = await user_SignUp.findOne(searchQuery);

            if (existingUser_DB) {
                const errorMsg = [];
                if (existingUser_DB.UserName === UserName) {
                    errorMsg.push("Username already exists");
                }
                if (existingUser_DB.Email === Email) {
                    errorMsg.push("Email already exists");
                }
                if (existingUser_DB.PhoneNo === PhoneNo) {
                    errorMsg.push("Phone Number already exists");
                }

                if (errorMsg.length > 0) {
                    return res.status(400).json({
                        status: false,
                        msg: errorMsg.join(', '), // Combine error messages
                        data: errorMsg,
                    });
                }
            }

            if (existingSignupUser_DB) {
                const errorMsg = [];
                if (existingSignupUser_DB.UserName === UserName) {
                    errorMsg.push("Username already exists");
                }
                if (existingSignupUser_DB.Email === Email) {
                    errorMsg.push("Email ID already exists");
                }
                if (existingSignupUser_DB.PhoneNo === PhoneNo) {
                    errorMsg.push("Phone Number already exists");
                }

                if (errorMsg.length > 0) {
                    return res.status(400).json({
                        status: false,
                        msg: errorMsg.join(', '), // Combine error messages
                        data: errorMsg,
                    });
                }
            }


            // If no existing user found, proceed with user creation
            const newUser = new user_SignUp({
                UserName: req.body.UserName,
                FullName: req.body.FullName,
                Email: req.body.Email,
                PhoneNo: req.body.PhoneNo
            });


            await newUser.save();
            return res.status(201).json({ status: true, msg: 'Sign Up successful!' });
        } catch (error) {
            console.log('Error saving user:', error);
            return res.status(500).json({ status: false, error: 'Internal Server Error' });
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
                            logger.info('You are already logged in on the phone.', { role: EmailCheck.Role, user_id: EmailCheck._id });
                            return res.send({ status: false, msg: 'You are already logged in on the phone.', data: [] });
                        } else {
                            addData["AppLoginStatus"] = 1;
                        }
                    } else if (Device.toUpperCase() == "WEB") {          //Web login check
                        if (EmailCheck.WebLoginStatus == 1) {
                            logger.info('You are already logged in on the Web.', { role: EmailCheck.Role, user_id: EmailCheck._id });
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

                system_ip: getIPAddress()
            })
            await user_login.save();

            logger.info('Very Succesfully', { role: EmailCheck.Role, user_id: EmailCheck._id });
            res.send({ status: true, msg: "Login Successfully", data: [], firstlogin: EmailCheck.Is_First_login })


        } catch (error) {

        }
    }



}


module.exports = new Auth();