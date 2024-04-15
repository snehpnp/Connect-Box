const axios = require('axios')

const data = {
  uid: "M1B1",
  exch: "NFO",
  token: "38842"
};


var raw = "jData="+JSON.stringify(data)+"&jKey="+"26e4746e5e6613206b1212f96a4d16dd8132f184b210f581a9c40888c59bd5bc";


const config = {
  url: "https://go.mynt.in/NorenWClientTP/GetQuotes",
  method: "post",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "axios/0.21.4"
  },
  data: raw,
  
};

axios(config)
  .then(response => {
    console.log("Response:", response.data);
    // Handle the response data
  })
  .catch(error => {
    console.error("Error:", error.response.data);
    // Handle errors
  });
