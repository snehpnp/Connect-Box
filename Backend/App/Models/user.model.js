"use strict"

const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')
const Role = require('./role.model')

// Employee Financial Information Collection
const userModel = Schema({
    profile_img: {
        type: String,
        trim: true,
        default: null
    },
    FullName: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    UserName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: null
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: null
    },
    PhoneNo: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 10,
        unique: true,
        default: null
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    Otp: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    Create_Date: {
        type: Date,
        default: Date.now
    },
    Start_Date: {
        type: Date,
        // required: true,
        default: null
    },
    End_Date: {
        type: Date,
        default: null
    },
    ActiveStatus: {
        type: String,
        enum: ['1', '0'],
        default: '1'
    },

    Is_Active: {
        type: String,
        enum: ['1', '0'],
        default: '1'
    },
    Is_First_login: {
        type: String,
        enum: ['1', '0'],
        default: '0'
    },
    Role: {
        type: String,
        required: true
    },
    license_type: {
        type: String,
        enum: ['0', '1', '2'],  // 0 = 2 days 1= Demo 2 =Live
        default: '0'
    },
    Balance: {
        type: String,
        default: null
    },
    add_balance: {
        type: String,
        default: null
    },

    AppLoginStatus: {
        type: String,
        enum: ['0', '1'],
        default: '0'
    },
    WebLoginStatus: {
        type: String,
        enum: ['0', '1'],
        default: '0'
    },
    TradingStatus: {
        type: String,
        enum: ['off', 'on'],
        default: 'off'
    },
    prifix_key: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: null
    },
    client_key: {
        type: String,
        required: true,
        trim: true,
        default: null,
        unique: true,
    },
    parent_id: {
        type: String,
        required: true,
    },
    employee_id: {
        type: String,
        default:null
    },
    parent_role: {
        type: String,
        required: true,

    },
    reset_password_status: {
        type: String,
        required: true,
        trim: true,
        default: '0'
    },
    service_given_month: {
        type: String,
        default: null
    },
    broker: {
        type: String,
        enum: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',], //1 = Alice Blue Hub,2=Alice Blue,3=Master Trust , 4 = Motilal Oswal
        default: '0'
    },
    access_token: {
        type: String,
        default: null
    },
    api_secret: {
        type: String,
        default: null
    },
    app_id: {
        type: String,
        default: null
    },
    client_code: {
        type: String,
        default: null
    },
    api_key: {
        type: String,
        default: null
    },
    app_key: {
        type: String,
        default: null
    },
    api_type: {
        type: String,
        default: null
    },
    demat_userid: {
        type: String,
        default: null
    },
    web_login_token: {
        type: String,
        default: null
    },
    app_login_token: {
        type: String,
        default: null
    },
    web_url: {
        type: String,
        enum: ['1', '2'], // 1 = Admin panel status , 2 = Tradinview status
        default: '1'
    },
    
    signals_execution_type: {
        type: String,
        enum: ['1', '2'], // 1 = Admin panel status , 2 = Tradinview status
        default: '1'
    },
    count_strategy_select: {
        type: String,
        required: true,
        default: '0'
    },
    subadmin_service_type: {
        type: String,
        enum: ['1', '2'], // 1 = Per Trade wise , 2 =  Strategy Wise
        default: '1'
    },
    strategy_Percentage: {
        type: Number,
        default: '0'
    },
    Per_trade: {
        type: Number,
        default: '0'
    },
    Strategy_percentage_to_researcher: {
        type: Number,
        default: '0'
    },
    Service_Type: {
        type: String,
        enum: ['0','1', '2'], // 0 = No Use , 1= Fixed , 2= per trade
        default: '0'
    },
    per_trade_value: {
        type: String,
        default: null
    },
    
  
},
    {
        timestamps: true
    },

)
const User_model = model('USER', userModel);



module.exports = User_model;
