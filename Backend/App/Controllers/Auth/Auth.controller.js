"use strict";
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { CommonEmail } = require('../../Helpers/CommonEmail')
const { firstOptPass, disclaimer,ForgotePasswords } = require("../../Helpers/Email_formate/first_login");

const db = require('../../Models');
const SignUpUser = db.SignUpUser;
const User = db.user;
const company_information = db.company_information;
const user_logs = db.user_activity_logs;


// Login CLASS
class Auth {

    // Login User
    async login(req, res) {
        try {
            const { Email, Password, device, ip } = req.body;
            // IF Login Time Email CHECK



            const EmailCheck = await User.findOne({ Email: Email });
            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            // if (EmailCheck.Role == "USER" || EmailCheck.Role == "SUBADMIN") {
            //     // WHERE LOGIN CHECKgetIPAddress
            //     if (device == "APP") {                  //App Login Check
            //         if (EmailCheck.AppLoginStatus == 1) {
            //             return res.send({ status: false, msg: 'You are already logged in on the phone.', data: [] });
            //         }
            //     } else if (device == "WEB") {          //Web login check
            //         if (EmailCheck.WebLoginStatus == 1) {
            //             return res.send({ status: false, msg: 'You are already logged in on the Web.', data: [] });
            //         }
            //     }

            // }

            // Password Check
            const validPassword = await bcrypt.compare(Password, EmailCheck.Password);
            if (validPassword == false) {
                return res.send({ status: false, msg: 'Password Not Match', data: [] });
            }
            if (EmailCheck.Role == "USER" || EmailCheck.Role == "SUBADMIN" || EmailCheck.Role == "EMPLOYEE" || EmailCheck.Role == "RESEARCH") {

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
                'mobile': EmailCheck.PhoneNo,
                Role: EmailCheck.Role,
                "broker": EmailCheck.broker,
                "type": EmailCheck.license_type,
                "UserName": EmailCheck.UserName,
                "prifix_key": EmailCheck.prifix_key,
                "subadmin_service_type": EmailCheck.Role == "RESEARCH" ? "0" : EmailCheck.subadmin_service_type

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

            const user_login = new user_logs({
                user_Id: EmailCheck._id,
                admin_Id: EmailCheck.parent_id,
                login_status: "Panel On",
                role: EmailCheck.Role,
                device: "WEB",
                system_ip: ip

            })
            await user_login.save();



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
                admin_Id: EmailCheck.parent_id,
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
            const { userId, Device, system_ip } = req.body;
            var addData = {}

            // IF Login Time Email CHECK
            const EmailCheck = await User.find({ _id: userId });
            if (EmailCheck.length === 0) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            try {
                // WHERE LOGIN CHECK
                if (Device.toUpperCase() == "APP") {                  //App Login Check
                    if (EmailCheck[0].AppLoginStatus == 0) {
                    } else {
                        addData["AppLoginStatus"] = 0;
                    }
                } else if (Device.toUpperCase() == "WEB") {          //Web login check
                    if (EmailCheck[0].WebLoginStatus == 0) {
                        // return res.send({ status: false, msg: 'You are already log Out on the Web.', data: [] });
                    } else {
                        addData["WebLoginStatus"] = 0;
                    }
                }

            } catch (error) {
                console.log("Error Verfiy error", error);
            }

            addData = { ...addData, web_login_token: '' }

            const user_login = new user_logs({
                user_Id: EmailCheck[0]._id,
                admin_Id: EmailCheck[0].parent_id,
                login_status: "Panel off",
                role: EmailCheck[0].Role,
                system_ip: system_ip
            })
            await user_login.save();

            return res.send({ status: true, msg: "Logout Succesfully", data: [] })


        } catch (error) {

        }
    }

    // FORGOTE PASSWORD
    async ForgetPassword(req, res) {
        try {
            const { Email } = req.body;

            // Check if the user exists
            const EmailCheck = await User.findOne({ Email: Email });
            const CompanyInformation = await company_information.findOne();
            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User does not exist', data: [] });
            }

            // Generate reset password URL
            const userid = Buffer.from(JSON.stringify(EmailCheck._id)).toString('base64');
            const redirectUrl = `${CompanyInformation.domain_url_https}/#/updatepassword/${userid}`;

            var ForgotePassword = await ForgotePasswords(redirectUrl);

            // Send email
            const toEmail = Email;
            const subjectEmail = "Forget Password";
            const htmlEmail = "URL - " + redirectUrl;
            await CommonEmail(toEmail, subjectEmail, ForgotePassword);

            // Send success response
            return res.send({ status: true, msg: "Mail sent successfully", data: redirectUrl });
        } catch (error) {
            // Handle errors
            console.error("Error in ForgetPassword:", error);
            return res.send({ status: false, msg: "An error occurred", data: [] });
        }
    }

    // UPDATE PASSWORD
    async UpdatePassword(req, res) {
        try {
            const { userid, NewPassword } = req.body;

            // Validate input
            if (!mongoose.Types.ObjectId.isValid(userid) || !NewPassword) {
                return res.send({ status: false, msg: 'Missing required fields', data: [] });
            }

            const user = await User.findById(userid);

            if (!user) {
                return res.send({ status: false, msg: 'User not found', data: [] });
            }

            // Check if the new password is the same as the old password
            const isSamePassword = await bcrypt.compare(NewPassword, user.Password);
            if (isSamePassword) {
                return res.send({ status: false, msg: 'New password must be different from the old password', data: [] });
            }

            const hashedPassword = await bcrypt.hash(NewPassword, 8);
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {
                    Password: hashedPassword,
                    Otp: NewPassword
                },
                { new: true }
            );

            if (!updatedUser) {
                return res.send({ status: false, msg: 'Failed to update password', data: [] });
            }

            return res.json({ status: true, msg: 'Password updated successfully' });

        } catch (error) {
            console.error('Error updating password:', error);
            return res.send({ status: false, msg: 'An error occurred', data: [] });
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
                res.send({ success: 'false', message: 'old Password Not Match' });
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

    // SIGNUP USER
    async SignUpUser(req, res) {
        try {
            const { UserName, Email, PhoneNo, ReferralCode } = req.body;
            const searchQuery = {
                $or: [
                    { UserName: UserName },
                    { Email: Email },
                    { PhoneNo: PhoneNo }
                ]
            }

            const find_In_UserDB = await User.findOne(searchQuery);
            const find_In_SignUpDB = await SignUpUser.findOne(searchQuery);

            if (find_In_UserDB) {
                const errorMsg = [];
                if (find_In_UserDB.UserName === UserName) {
                    errorMsg.push("Username already exists");
                }
                if (find_In_UserDB.Email === Email) {
                    errorMsg.push("Email already exists");
                }
                if (find_In_UserDB.PhoneNo === PhoneNo) {
                    errorMsg.push("Phone Number already exists");
                }

                if (errorMsg.length > 0) {
                    return res.status(400).json({
                        status: false,
                        msg: errorMsg.join(', '),
                        data: errorMsg,
                    })
                }
            }

            if (find_In_SignUpDB) {
                const errorMsg = [];

                if (find_In_SignUpDB.UserName === UserName) {
                    errorMsg.push("UserName already exists");
                }
                if (find_In_SignUpDB.Email === Email) {
                    errorMsg.push("Email ID already exitss")
                }
                if (find_In_SignUpDB.PhoneNo === PhoneNo) {
                    errorMsg.push("Phone Number already exists")
                }
                if (errorMsg.length > 0) {
                    return res.ststus(400).json({
                        status: false,
                        msg: errorMsg.join(', '),
                        data: errorMsg,
                    })
                }
            }
            const today = new Date();
            const newUser = new SignUpUser({
                UserName: req.body.UserName,
                FullName: req.body.FullName,
                Email: req.body.Email,
                PhoneNo: req.body.PhoneNo,
                ReferralCode: req.body.ReferralCode,
                End_Date: new Date(today.setDate(today.getDate() + 8))
            });
            await newUser.save();
            return res.send({ status: true, msg: "User SignUp successfully", data: [] });
        } catch (error) {

            console.log("Error in Saving Users", error);
            return res.send({ status: false, msg: "Error in Saving User", data: [] })

        }

    }

    // changed password
    async PasswordChanged(req, res) {
        try {
            const { userid, NewPassword, CurrentPassword, ConfirmNewPassword } = req.body;

            if (CurrentPassword === NewPassword) {
                return res.status(400).send({ success: false, message: "New password must be different from old password" });
            }

            if (NewPassword !== ConfirmNewPassword) {
                return res.status(400).send({ success: false, message: "New password and confirm password do not match" });
            }

            const user = await User.findById(userid);

            if (!user) {
                return res.status(404).send({ success: false, message: 'User not found' });
            }

            const validPassword = await bcrypt.compare(CurrentPassword.toString(), user.Password.toString());

            if (!validPassword) {
                return res.status(409).send({ success: false, message: 'Old password does not match' });
            }

            const hashedPassword = await bcrypt.hash(NewPassword, 8);
            await User.findByIdAndUpdate(
                user._id,
                {
                    Password: hashedPassword,
                    Otp: NewPassword
                },
                { new: true }
            );



            res.send({ success: true, message: "Password updated successfully" });
        } catch (error) {
            console.error("Error resetting password:", error); // Log the specific error
            res.send({ success: false, message: "An error occurred while Updating password" });
        }
    }


}


module.exports = new Auth();