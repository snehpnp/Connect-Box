//  1= Master Trust, 2=  'Alice Blue, 3= Master Trust , 4 = Motilal Oswal, 5=Zebull ,
//  6=IIFl , 7=Kotak , 8=Mandot , 9=Choice, 10=Anand Rathi, 11=B2C, 13=Angel,
// 13 =Fyers , 14 = 5-Paisa , 15 Zerodha ,
import * as Config from "./Config";
import Swal from 'sweetalert2';
import axios from "axios";
import { PDFDownloadLink, PDFViewer, Document, Page, Text } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";


export const OrderBook = async (UserDetails, ip) => {

    var broker_id = UserDetails.broker

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

        axios(config)
            .then(async (response) => {
                console.log("response", response.data);


            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error
            });
    }


    else if (broker_id === "12" || broker_id === 12) {

    }
   
}