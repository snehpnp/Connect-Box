//  1= Master Trust, 2=  'Alice Blue, 3= Master Trust , 4 = Motilal Oswal, 5=Zebull ,
//  6=IIFl , 7=Kotak , 8=Mandot , 9=Choice, 10=Anand Rathi, 11=B2C, 13=Angel,
// 13 =Fyers , 14 = 5-Paisa , 15 Zerodha ,
import * as Config from "./Config";
import Swal from "sweetalert2";
import axios from "axios";



export const loginWithApi = async (broker_id, UserDetails, ip) => {


  if (broker_id === "2" || broker_id === 2) {

    if (UserDetails.Role === "USER") {
      const data = { parent_id: UserDetails.parent_id };

      axios({
        url: `${Config.base_url}subadmin/company/GetApi_key`,
        method: "post",
        data: data,

      }).then((res) => {
        if (res.data && res.data.data && res.data.data.api_key) {

          window.location.href = `https://ant.aliceblueonline.com/?appcode=${res.data.data.api_key}`;
        }

      }).catch((error) => {
        console.error("Error", error);
      });
    } else {
      window.location.href = `https://ant.aliceblueonline.com/?appcode=${UserDetails.api_key}`;
    }


  } else if (broker_id === "1" || broker_id === 1) {
  } else if (broker_id === "3" || broker_id === 3) {
    alert("broker-3");
  } else if (broker_id === "4" || broker_id === 4) {
    alert("broker-4");
  } else if (broker_id === "5" || broker_id === 5) {
    alert("broker-5");
  } else if (broker_id === "6" || broker_id === 6) {
    alert("broker-6");
  } else if (broker_id === "7" || broker_id === 7) {
    alert("broker-7");
  }
  if (broker_id === "8" || broker_id === 8) {
    // console.log("mandot");
    axios({
      url: `${Config.base_url}mandotsecurities/access_token`,
      method: "post",
      data: { _id: UserDetails._id, system_ip: ip },
    }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Trading On",
          icon: "success",
          html: "Your trading has On successfully .",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        Swal.fire({
          title: "Error In credentials!",
          text: res.data.data.description,
          icon: "Error",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
  } else if (broker_id === "9" || broker_id === 9) {
    alert("broker-9");
  } else if (broker_id === "10" || broker_id === 10) {
    alert("broker-10");
  } else if (broker_id === "11" || broker_id === 11) {
    alert("broker-11");
  } else if (broker_id === "12" || broker_id === 12) {
    axios({
      url: `${Config.base_url}angel`,
      method: "post",
      data: {
        id: UserDetails._id,
      },
    }).then((res) => {
      if (res.data.status) {
        let value = prompt("Enter Your TOTP Here");
        if (value === null) {
          return;
        }
        axios({
          url: `${Config.base_url}update/angel/totp`,
          method: "post",
          data: {
            id: UserDetails._id,
            totp: value,
            system_ip: ip,
          },
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Trading On",
              icon: "success",
              html: "Your trading has On successfully .",
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1200);
          } else {
            Swal.fire({
              title: "Error In Totp!",
              text: res.data.data,
              icon: "Error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        });
      } else {
        Swal.fire({
          title: "Error In Trading!",
          text: res.data.msg,
          icon: "Error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  } else if (broker_id === "13" || broker_id === 13) {
    alert("broker-13");
  }

  // FIVE PAISA
  else if (broker_id === "14" || broker_id === 14) {
    window.location.href = `https://dev-openapi.5paisa.com/WebVendorLogin/VLogin/Index?VendorKey=${UserDetails.api_key}&ResponseURL=${Config.base_url}fivepaisa&State=${UserDetails.client_key}`;
  } else if (broker_id === "15" || broker_id === 15) {
    window.location.href =
      "https://kite.zerodha.com/connect/login?v=3&api_key=" +
      UserDetails.api_key;
  } else if (broker_id === "16" || broker_id === 16) {
    alert("broker-16");
  } else if (broker_id === "17" || broker_id === 17) {
    alert("broker-17");
  } else if (broker_id === "19" || broker_id === 19) {
    window.location.href = `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${UserDetails.api_key}&redirect_uri=${Config.base_url}upstox&state=${UserDetails.Email}`;
  } else if (broker_id === "20" || broker_id === 20) {
    alert("broker-20");
  } else if (broker_id === "21" || broker_id === 21) {
    alert("broker-21");
  } else if (broker_id === "22" || broker_id === 22) {
    alert("broker-22");
  }
};
