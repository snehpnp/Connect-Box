"use strict";

const db = require('../../../Models');
const SubAdminCompanyInfo = db.SubAdminCompanyInfo;
const mongoose = require('mongoose');

class SubAdminCompany {

    // EDIT COMPANY INFORMATION
    async EditSubAdminCompany(req, res) {
        try {
            const { id, data: companydata } = req.body;

            if (!id) {
                return res.status(400).json({ status: false, msg: 'Please provide an ID.', data: [] });
            }

            const objectId = mongoose.Types.ObjectId(id);
            if (!companydata) {
                return res.status(400).json({ status: false, msg: 'Company data is missing.', data: [] });
            }

            const existingCompany = await SubAdminCompanyInfo.findById(objectId);
            if (!existingCompany) {
                return res.status(404).json({ status: false, msg: 'Company not found.', data: [] });
            }

            const result = await SubAdminCompanyInfo.updateOne({ _id: objectId }, { $set: companydata });
            if (!result) {
                return res.status(500).json({ status: false, msg: 'Failed to update company.', data: [] });
            }

            return res.json({ status: true, msg: 'Company updated successfully.', data: [] });
        } catch (error) {
            console.error("Error updating company:", error);
            return res.status(500).json({ status: false, msg: 'Internal Server Error', data: [] });
        }
    }

    // GET COMPANY DETAILS
    async GetAllCompanyInfo(req, res) {
        try {
            const companyInfo = await SubAdminCompanyInfo.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "maker_id",
                        foreignField: "_id",
                        as: "makerInfo"
                    }
                },
                {
                    $unwind: "$makerInfo"
                },
                {
                    $project: {
                        "_id": 1,
                        "email": 1,
                        "smtp_password": 1,
                        "cc_mail": 1,
                        "bcc_mail": 1,
                        "smtphost": 1,
                        "smtpport": 1,
                        "razorpay_key": 1,
                        "logo": 1,
                        "maker_id": 1,
                        "panel_name": 1,
                        "createdAt": 1, 
                        "makerInfo.FullName": 1,
                    }
                }
            ]);
    
            if (companyInfo.length === 0) {
                return res.status(404).json({ status: false, msg: 'No company information found.', data: [] });
            }
    
            return res.json({ status: true, msg: 'Company information retrieved successfully.', data: companyInfo });
        } catch (error) {
            console.error("Error fetching company information:", error);
            return res.status(500).json({ status: false, msg: 'Internal Server Error', data: [] });
        }
    }
    


    // GET COMPANY DETAILS BY ID
    async GetCompanyInfoById(req, res) {
        try {
            const { id } = req.body; // Assuming the ID is passed as a route parameter

            if (!id) {
                return res.status(400).json({ status: false, msg: 'Please provide an ID.', data: [] });
            }

            const companyInfo = await SubAdminCompanyInfo.findById(id);

            if (!companyInfo) {
                return res.status(404).json({ status: false, msg: 'Company information not found for the provided ID.', data: [] });
            }

            return res.json({ status: true, msg: 'Company information retrieved successfully.', data: companyInfo });
        } catch (error) {
            console.error("Error fetching company information:", error);
            return res.status(500).json({ status: false, msg: 'Internal Server Error', data: [] });
        }
    }

}

module.exports = new SubAdminCompany();
