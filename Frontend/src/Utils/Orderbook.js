import axios from "axios";
import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


export const OrderBook = async (UserDetails) => {
    var broker_id = UserDetails.broker;

    if (broker_id === "2" || broker_id === 2) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/fetchOrderBook',
            headers: {
                'Authorization': "Bearer " + UserDetails.demat_userid + " " + UserDetails.access_token,
                'Content-Type': 'application/json',
            },
        };

        // Return a promise
        return new Promise((resolve, reject) => {
            axios(config)
                .then(response => {

                    const fileType =
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                    const fileExtension = ".xlsx";


                        const ws = XLSX.utils.json_to_sheet(response.data);
                        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                        const data = new Blob([excelBuffer], { type: fileType });
                        FileSaver.saveAs(data, "Orderbook" + fileExtension);
            



                    resolve(response.data); // Resolve the promise with response data
                })
                .catch(error => {
                    console.error("Error:", error);
                    reject(error); // Reject the promise with error
                });
        });


    } else if (broker_id === "12" || broker_id === 12) {
        // Logic for broker 12
    }

    // Return null if broker_id is not handled
    return null;
};
