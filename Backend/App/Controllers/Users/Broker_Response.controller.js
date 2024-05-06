"use strict";
const bcrypt = require("bcrypt");
const db = require('../../Models');


const BrokerResponse = db.BrokerResponse;

var dateTime = require('node-datetime');


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class BrokerResponses {

    async BrokerResponse(req, res) {
        const { id } = req.body;

        try {

            if (!id) {
                return res.send({ status: false, msg: "User Id not found", data: [] })
            }
            const findResponse = await BrokerResponse.find({ user_id: id })

            if (!findResponse) {
                return res.send({ status: false, msg: "Empty Broker Response ", data: [] })
            }

            return res.send({ status: true, msg: "all broker response fatched successfully" , data: findResponse})

        }
        catch (err) {
            return res.send({ status: false, msg: "server side error", data: [] })
        }

    }



}

module.exports = new BrokerResponses();