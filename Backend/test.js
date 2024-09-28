// const axios = require('axios');
// const sha256 = require('sha256');
// const item = {
//     "api_key": "your_api_key",
//     "api_secret": "your_api_secret",
//     "access_token": "your_access_token"
// };





// var data = {
//     "stock_code": "SBIN",
//     "exchange_code": "NSE",
//     "product": "CNC",
//     "action": "BUY",
//     "order_type": "LIMIT",
//     "quantity": 1,
//     "price": 400,
//     "validity": "DAY",
//     "disclosed_quantity": 0,
//     "expiry_date": convertToISO8601("2021-12-31"),
//     "strike_price": 0,
//     "right": "NA"
// };



// var order_url = 'https://api.icicidirect.com/breezeapi/api/v1/order';

// var send_rr = Buffer.from(JSON.stringify(data)).toString('base64');
// var currentDateOrder = new Date().toISOString().split(".")[0] + '.000Z';
// let checksumcode = sha256(currentDateOrder + JSON.stringify(data) + item.api_secret);


// let config = {
//     method: 'post',
//     url: order_url,
//     headers: {
//         'Content-Type': 'application/json',
//         'X-Checksum': "token " + checksumcode,
//         'X-Timestamp': currentDateOrder,
//         'X-AppKey': item.api_key,
//         'X-SessionToken': item.access_token,
//     },
//     data: data
// };

// axios(config)
//     .then(function (response) {
//      
//     })
//     .catch(function (error) {

//     });


const axios = require('axios');
const crypto = require('crypto');

// Sample order data
const orderData = {
    stock_code: "NIFTY",
    exchange_code: "NFO",
    product: "options",
    action: "buy",
    order_type: "market",
    stoploss: "",
    quantity: 50,
    price: "",
    validity: "day",
    disclosed_quantity: "0",
    expiry_date: "2024-09-19",
    strike_price: "25400",
    right: "call"
};

// API credentials and headers
const apiUrl = "https://api.icicidirect.com/breezeapi/api/v1/order";
const sessionToken = "QUU3MDA2MTc6MzAxODc4MDY=";  // Update this token as needed
const appKey = "48z92A5028s0t23643=Y7gD12557X082"; // Your App Key

// Generate current timestamp
const timestamp = new Date().toISOString();  // Example: '2024-09-19T07:19:33.000Z'

// Generate checksum token (this is a placeholder, replace with correct checksum generation)
const checksum = crypto.createHash('sha256').update(sessionToken + appKey + timestamp).digest('hex');

// Set headers
const headers = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Checksum": `token ${checksum}`,
    "X-Timestamp": timestamp,
    "X-AppKey": appKey,
    "X-SessionToken": sessionToken,
    "User-Agent": "axios/0.21.4"
};

// Axios request
axios.post(apiUrl, orderData, { headers })
    .then(response => {
       
    })
    .catch(error => {
        console.error('Error placing order:', error.response ? error.response.data : error.message);
    });
