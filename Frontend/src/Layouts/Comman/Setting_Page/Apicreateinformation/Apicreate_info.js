import React, { useEffect, useState } from "react";
import { brokerdetail } from "../../../../ReduxStore/Slice/Comman/Setting";
import { useDispatch } from "react-redux";
import { Eye, CandlestickChart } from "lucide-react";
import * as Config from "../../../../Utils/Config";

function Apicreate_info() {
  const dispatch = useDispatch();

  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const broker = JSON.parse(localStorage.getItem("user_details")).broker;

  const [selectedItem, setSelectedItem] = useState(null);
  const [model, setModel] = useState(false);
  const [UserDetails, setUserDetails] = useState({
    loading: true,
    data: [],
  });

  // get broker detail
  const data = async () => {
    await dispatch(brokerdetail({}))
      .unwrap()
      .then((response) => {
        if (response.status) {
          var formattedData1;

          if (Role == "USER") {
            formattedData1 = response.data.filter(
              (item) => item.broker_id == broker
            );
          } else {
            formattedData1 = response.data;
          }

          setUserDetails({
            loading: false,
            data: formattedData1,
          });
        }
      });
  };
  useEffect(() => {
    data();
  }, []);

  const Data = [
    {
      id: 1,
      HeadingTitle: "Alice Blue",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      // Kindly click on below mention brokerage firm link it will redirect to your concern brokerage API link and generate API with this. Kindly follow instruction as your broker or sub broker link guide to you and update our link and connect your demat with our Algo software.
      LinkOne: "https://ant.aliceblueonline.com/?appcode=G9EOSWCEIF9ARCB",
      LinkTwo: `${Config.broker_redirect_url}AliceBlue`,
      link3: `${Config.broker_redirect_url}aliceblue/access_token?email=ss@gmail.com`,
      Apicreate:
        "You will get APP code and Secret Key, please Update them on your Profile in this software.",
      youTube: "https://www.youtube.com/watch?v=DEKgwveZ9eM",
      img1: "http://app.smartalgo.in/assets/dist/img/aliceblue/aliceblue1.png",
      img2: "http://app.smartalgo.in/assets/dist/img/aliceblue/aliceblue2.png",
      img3: "",
    },
    {
      id: 2,
      HeadingTitle: "Zerodha",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      LinkOne: " https://kite.trade/",
      LinkTwo: `${Config.broker_redirect_url}zerodha/access_token?email=YOUR_PANEL_EMAIL`,
      link3: `e.g - ${Config.broker_redirect_url}zerodha/access_token?email=ss@gmail.com`,
      Apicreate:
        "You will get API Secret Key and APP code and Update them on your Profile in this software.",
    },
    {
      id: 3,
      HeadingTitle: "Zebull",
      disc1: "",
      disc2: "",
      disc3: "",
      LinkOne: "https://go.mynt.in/#/",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      ZBStep2:
        "Click on Profile-> You can find a API Key button-> You can see your API Key",
      Apicreate:
        "Copy that API key and Update it on your Profile in this software.",
      youTube: "https://www.youtube.com/watch?v=wv0MpWirrVs",
      img1: "http://app.smartalgo.in/assets/dist/img/Zebull/Zebull1.png",
      img2: "http://app.smartalgo.in/assets/dist/img/Zebull/Zebull2.png",
      img3: "http://app.smartalgo.in/assets/dist/img/Zebull/Zebull3.png",
      // LinkTwo: "encryption key 5 paisa :- vEhJgDxk3PJbRqhK5b2BrA80ez5aJY8x",
      // describtion1:""
    },
    {
      id: 4,
      HeadingTitle: "5 Paisa",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      LinkOne: "https://invest.5paisa.com/DeveloperAPI/APIKeys",
      LinkTwo: "",
      youTube: "https://www.youtube.com/watch?v=LAzzIWtp79w",
      img1: "http://app.smartalgo.in/assets/dist/img/5paisa/5paisa.png",

      // LinkTwo: "encryption key 5 paisa :- vEhJgDxk3PJbRqhK5b2BrA80ez5aJY8x",
    },
    {
      id: 5,
      HeadingTitle: "Market Hub",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Please Update CLIENT CODE , PASSWORD CODE And VERIFICATION CODE for all these details please contact with Market hub broker then Submit  And  Login With Api Trading On...",
      // LinkOne: "https://www.5paisa.com/developerapi/authorization",
      // LinkTwo: "encryption key 5 paisa :- vEhJgDxk3PJbRqhK5b2BrA80ez5aJY8x",
      // Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...'
    },
    {
      id: 6,
      HeadingTitle: "Angel",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      LinkOne: "https://smartapi.angelbroking.com/",
      LinkTwo: `${Config.broker_redirect_url}angelbroking/access_token?email=YOUR_PANEL_EMAIL`,
      link3: `e.g - ${Config.broker_redirect_url}angelbroking/access_token?email=ss@gmail.com`,
      Apicreate:
        "You will get API Secret Key and APP code, please Update them on your Profile in this software.",
      youTube: "https://www.youtube.com/watch?v=zI7FX-yUgyw",
      img1: "http://app.smartalgo.in/assets/dist/img/angel/angel1.png",
      img2: "http://app.smartalgo.in/assets/dist/img/angel/angel2.png",
      img3: "http://app.smartalgo.in/assets/dist/img/angel/angel3.png",
    },
    {
      id: 7,
      HeadingTitle: "Master Trust",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      LinkOne: "https://develop-masterswift.mastertrust.co.in/",
      LinkTwo: `${Config.broker_redirect_url}mastertrust/access_token`,
      Apicreate:
        "You will get API Secret Key and APP code, please Update them on your Profile in this software.",
      youTube:
        "https://www.youtube.com/playlist?list=PL3FfWOswH_LhZAcXyiBFCsZ-1PcEzP4Na",
    },
    {
      id: 8,
      HeadingTitle: "Fyers",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      LinkOne: "https://myapi.fyers.in/dashboard/",
      LinkTwo: `${Config.broker_redirect_url}fyers/access_token`,
      Apicreate:
        "You will get API Secret Key and APP code, please Update them on your Profile in this software.",
      youTube: "https://www.youtube.com/watch?v=TO2mPpqww34",
      img1: "http://app.smartalgo.in/assets/dist/img/fyers/fyers1.png",
      img2: "http://app.smartalgo.in/assets/dist/img/fyers/fyers2.png",
      img3: "http://app.smartalgo.in/assets/dist/img/fyers/fyers3.png",
    },
    {
      id: 9,
      HeadingTitle: "B2C",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly follow these steps to link your demat account with this Algo Software.",
      B2C: "https://odinconnector.63moons.com/market-place/api?sAppToken=IndiraSecuritiesB2C1070464deef&sTwoWayToken=abc&sPartnerId=01F00F&sTenantId=15",
      youTube: "https://www.youtube.com/watch?v=dVNRHBRxCHg",
      img1: "http://app.smartalgo.in/assets/dist/img/B2C/B2C1.png",
      // LinkOne: "https://login.fyers.in/?cb=https://apidashboard.fyers.in",
      // LinkTwo: `${Config.broker_redirect_url}fyersapi`,
      //    Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...'
    },
    {
      id: 10,
      HeadingTitle: "Anand Rathi",
      disc1: "",
      disc2: "",
      disc3: "",
      // describtion:
      //   "Please Update SECRET KEY And APP KEY for all these details please contact with Anand Rathi broker then Submit  And Login With Api Trading On...",
      // youTube: "https://www.youtube.com/playlist?list=PL3FfWOswH_LhZAcXyiBFCsZ-1PcEzP4Na",
      describtion: "Insert Interactive API",
      // LinkOne: "https://login.fyers.in/?cb=https://apidashboard.fyers.in",
      // LinkTwo: `${Config.broker_redirect_url}fyersapi`,
      //    Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...',
    },
    {
      id: 11,
      HeadingTitle: "Choice",
      // describtion: "1) Mail to the broker for the live details with the refferal code- PNPINFOTECH ",
      describtion: "",
      describtion3: `2) Subject: Request for Live API Details -------------------------------------------,
  
      Dear Choice,
      Kindly provide the API live details for trading and market data access from Choice. Refferal code- PNPINFOTECH.Thank you for your assistance.  -------
      Best Regards,`,
      // describtion2: "Update VENDOR ID,USER ID, PASSWORD, VENDOR KEY, ENCRYPTION SECRET KEY And ENCRYPTION KEY that you have received by broker.",
      // youTube: "https://www.youtube.com/playlist?list=PL3FfWOswH_LhZAcXyiBFCsZ-1PcEzP4Na",
      // disc1:"1 Mail to the broker for the",
      // disc2:"live details",
      // disc3:"with the refferal code- PNPINFOTECH ",
      describtion2:
        "Update VENDOR ID,Demate ID, PASSWORD, VENDOR KEY, ENCRYPTION SECRET KEY And ENCRYPTION KEY that you have received by broker.",
      youTube:
        "https://www.youtube.com/playlist?list=PL3FfWOswH_LhZAcXyiBFCsZ-1PcEzP4Na",
      disc1: "1 Mail to the broker for the",
      disc2: "live details",
      disc3: "with the refferal code- PNPINFOTECH ",
    },
    {
      id: 12,
      HeadingTitle: "Mandot",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Please Update USERNAME And PASSWORD for all these details please contact with Mandot broker then Submit And  Login With Api Trading On...",
      youTube:
        "https://www.youtube.com/playlist?list=PL3FfWOswH_LhZAcXyiBFCsZ-1PcEzP4Na",
      // LinkOne: "https://login.fyers.in/?cb=https://apidashboard.fyers.in",
      // LinkTwo: `${Config.broker_redirect_url}fyersapi`,
      //    Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...'
    },
    {
      id: 13,
      HeadingTitle: "Motilal Oswal ",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Kindly click on the link given below and  Go to Get Start Button And login Your Account and Next Step is create App Follow Next step and mail To motilal broker.",

      LinkOne: `https://invest.motilaloswal.com/Home/TradingAPI`,

      LinkTwo: `${Config.broker_redirect_url}motilaloswal/access_token?email=YOUR_PANEL_EMAIL`,
      link3: `e.g - ${Config.broker_redirect_url}motilaloswal/access_token?email=ss@gmail.com`,
      Apicreate:
        "You will get API Key, please mail the broker(Follow below mail format) to acitvate your API key and update them on your Profile in this software.",

      describtion1: `  To :- tradingapi@motilaloswal.com
      Subject :- Motilal Api Key
      ---------------------------------------------------------------------------
      Hello Sir,
  
      Please Activate the given API Key for the "Enter Your Client Code" Demat Code.
  
      1. Api Key :- "Enter Your APIKEY"
  
      In Reference to "CDPL9786" ID.
  
      Regards & Thanks
  
      `,
      youTube:
        "https://www.youtube.com/playlist?list=PL3FfWOswH_LhZAcXyiBFCsZ-1PcEzP4Na",
      img1: "http://app.smartalgo.in/assets/dist/img/motilal/motilal1.png",
      img2: "http://app.smartalgo.in/assets/dist/img/motilal/motilal2.png",
      img3: "http://app.smartalgo.in/assets/dist/img/motilal/motilal3.png",
    },
    {
      id: 14,
      HeadingTitle: "Kotak Securities",

      disc1: "",
      disc2: "",
      disc3: "",
      // describtion:
      //   "Kindly follow instruction as your broker or sub broker link guide to you and update our link and connect your demat with our Algo software.",
      describtion:
        "Kotak securities do not provide any API information for new clients.",

      // LinkOne: "https://tradeapi.kotaksecurities.com/devportal/apis",

      // Apicreate: 'Login account and click "default application" and next click on the production key in the sidebar and the consumer key and consumer secret update on your profile and demat password and trading API password both update on your profile. The access code generated is sent to the registered email address & mobile number. A generated access code is valid for the day (till 11:59:59 pm on the same day).',
      // img1: "http://app.smartalgo.in/assets/dist/img/kotak/kotak1.png",
      // img3: "http://app.smartalgo.in/assets/dist/img/kotak/kotak2.png",
      // LinkTwo: `${Config.broker_redirect_url}fyersapi`,
      //    Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...'
      youTube: "https://www.youtube.com/watch?v=DRpbvo2ku8s",
    },
    {
      id: 15,
      HeadingTitle: "IIFL",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion: `Step 1: If you are using IIFL broker, fill all user information in the below sheet file and send to
        ttblazesupport@iifl.com`,
      youTube:
        "https://www.youtube.com/playlist?list=PL3FfWOswH_LhZAcXyiBFCsZ-1PcEzP4Na",
      iifl: "http://app.smartalgo.in/assets/dist/img/iifl/ClientMappinFormat.xls",
      //    Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...'
    },
    {
      id: 16,
      HeadingTitle: "Arihant",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion: `To get Api Key and 2FA click below link and after that click on GET API button to get keys, After clicking GET API button you will see this page Login with your User Id and Password.If you cant't login your account or your account is suspended call Arihant support and tell them to Always Activate your Odin Account for API Place Orders.`,
      LinkOne:
        "https://app-saas.odinconnector.co.in/market-place/api?sAppToken=ArihantB2C1906b23c8b9&sTwoWayToken=abc&sPartnerId=020019&sTenantId=25",
      // Apicreate: `After clicking GET API button you will see this page Login with your User Id and Password.If you cant't login your account or your account is suspended call Arihant support and tell them to Always Activate your Odin Account for API Place Orders.`,
      img1: "http://app.smartalgo.in/assets/dist/img/arihant/arihantgetapi.png",
      // img2: "http://app.smartalgo.in/assets/dist/img/arihant/arihantloginpage.png",
      // Apicreate: 'You will get your Client Id in Profile and Access Token DhanHQTrading APIs & Access.'
    },
    {
      id: 17,
      HeadingTitle: "MasterTrust Dealer",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Please Update USER ID, App Key, PASSWORD and Account ID and Vendor Code for all these details please contact with MasterTrust Dealer broker then Submit  And  Login With Api Trading On...",
      // LinkOne: "https://login.fyers.in/?cb=https://apidashboard.fyers.in",
      // LinkTwo: `${Config.broker_redirect_url}fyersapi`,
      //    Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...'
    },
    {
      id: 18,
      HeadingTitle: "Laxmi",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Please Update SECRET KEY and APP KEY for all these details please contact with Laxmi broker then Submit And Login With Api Trading On...",
      // LinkOne: "https://login.fyers.in/?cb=https://apidashboard.fyers.in",
      // LinkTwo: `${Config.broker_redirect_url}fyersapi`,
      //    Apicreate:'you will get Api Secret Key And App id please Update this detail in your Profile...'
    },
    {
      id: 19,
      HeadingTitle: "Kotak Neo",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Please Update CONSUMER KEY, CONSUMER SECRET, USERNAME and TRADE API PASSWORD for all these details please contact with Kotak Neo broker then Submit And Login With Api Trading On...",
      LinkOne: "https://neo.kotaksecurities.com/Login",
      img1: "http://app.smartalgo.in/assets/dist/img/kotakneo/kotakneo.png",
      img3: "http://app.smartalgo.in/assets/dist/img/kotak/kotak2.png",
      Apicreate:
        "You will get Api Secret Key And App key please Update this detail in your Profile.",
    },
    {
      id: 20,
      HeadingTitle: "Indira XTS",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion:
        "Please Update SECRET KEY and APP KEY for all these details please contact with Indira XTS broker then Submit And Login With Api Trading On...",
    },
    {
      id: 21,
      HeadingTitle: "ICICI Direct",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion: `For SECRET KEY and API KEY click below given link after redirection you want to login your account with your userID and password after login you can generate Keys.`,
      LinkOne: "https://api.icicidirect.com/apiuser/home",
      LinkTwo: `${Config.broker_redirect_url}icicidirect/access_token?email=YOUR_EMAIL_HERE`,
      img1: "http://app.smartalgo.in/assets/dist/img/icicidirect/icicidirectsignup.png",
      img2: "http://app.smartalgo.in/assets/dist/img/icicidirect/iciciredirecturl.png",
      img3: "http://app.smartalgo.in/assets/dist/img/icicidirect/apisecretkey.png",
      Apicreate:
        "You will get API KEY and SECRET KEY please Update this detail in your Profile.",
    },
    {
      id: 22,
      HeadingTitle: "Dhan",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion: `For CLIENT ID and ACCESS TOKEN go to your My Profile Dhan and click on "DhanHQ Trading APIs & Access" to generate ACCESS TOKEN and also select 30 days validity to expiry for token, You will get your Client Id in Profile and Access Token DhanHQTrading APIs & Access.`,
      LinkOne: "https://dhan.co/",
      // LinkTwo: `${Config.broker_redirect_url}icicidirect/access_token`,
      img1: "http://app.smartalgo.in/assets/dist/img/dhan/dhanaccestoken.png",
      // img2: "http://app.smartalgo.in/assets/dist/img/icicidirect/iciciredirecturl.png",
      // Apicreate: 'You will get your Client Id in Profile and Access Token DhanHQTrading APIs & Access.'
    },
    {
      id: 23,
      HeadingTitle: "Swastika",
      describtion: `Please Update CLIENT CODE, MPIN  for all these details please contact with Swastika  broker then get TOTP from google authenticator  And then Login With Api Trading On....You can use this link for get TOTP`,
      LinkOne: "https://www.swastika.co.in/",
      Swastika:
        "Click on Profile-> You can find a API Key button-> You can see your API Key",
      newlink: "https://totp.danhersam.com/",
      // img3:"http://app.smartalgo.in/assets/dist/img/swastika/swastika.png",
    },
    {
      id: 28,
      HeadingTitle: "Upstox",
      disc1: "",
      disc2: "",
      disc3: "",
      describtion: `Click below link to generate API KEY and SECRET KEY after login to below page you will see New App button click on that button and put your Redirect URL in url field and continue after this process you will get your API and SECRET Keys`,
      LinkOne: "https://account.upstox.com/developer/apps",
      LinkTwo: `${Config.broker_redirect_url}upstox/access_token`,
      img1: "http://app.smartalgo.in/assets/dist/img/upstox/upstoxgenerateapikeyandsecretkey.png",
      img2: "http://app.smartalgo.in/assets/dist/img/upstox/upstoxredirecturl.png",
      // Apicreate: 'You will get your Client Id in Profile and Access Token DhanHQTrading APIs & Access.'
    },
    {
      id: 30,
      HeadingTitle: "Smc",
      describtion:
        "Please Update SECRET KEY and APP KEY for all these details please contact with SMC broker then Submit And Login With Api Trading On...",
    },
  ];

  const handleOpenModel = (title) => {
    const selectedItem = Data.find(
      (item) =>
        item.HeadingTitle.trim().toLowerCase() === title.trim().toLowerCase()
    );
    if (selectedItem) {
      setSelectedItem(selectedItem);
      setModel(true);
    }
  };

  return (
    <>
      <div className="row">
        {UserDetails.data &&
          UserDetails.data.map((item) => {
            return (
              <section
                key={item.id}
                id="advertisers"
                className="advertisers-service-sec pt-5 pb-5 col-lg-4"
              >
                <div className="container">
                  <div className="">
                    <div className="ol">
                      <div className="service-card">
                        <div className="icon-wrapper">
                          <CandlestickChart />
                        </div>
                        <div className="d-flex justify-content-center">
                          <h3>{item.title}</h3>
                        </div>
                        <div className="d-flex justify-content-center">
                          <p>
                            <Eye onClick={() => handleOpenModel(item.title)} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
      </div>
      {model && selectedItem && (
        <>
          <div className="modal custom-modal d-block kk" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0 d-flex justify-content-between ">
                  <div className="form-header modal-header-title text-start mb-0">
                    <h4 className="mb-0">Information</h4>
                  </div>
                  <div className="form-header modal-header-title text-start mb-0 ">
                    <a
                      className="btn btn-primary mb-2 ms-2"
                      onClick={() => setModel(false)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </a>
                  </div>
                </div>
                <div className="your-model-class">
                  <h2 className="text-center">{selectedItem.HeadingTitle}</h2>
                  <p className="ms-3">{selectedItem.describtion}</p>
                  <p className="ms-3">
                    <a href={selectedItem.LinkOne}>
                      Link One :{selectedItem.LinkOne}
                    </a>
                  </p>
                  <p className="ms-3">
                    <a className href={selectedItem.LinkTwo}>
                      Link Two :{selectedItem.LinkTwo}
                    </a>
                  </p>
                  {selectedItem.img1 && (
                    <img src={selectedItem.img1} alt="Image 1" />
                  )}
                  <div>
                    {selectedItem.img2 && (
                      <img src={selectedItem.img2} alt="Image 2" />
                    )}
                  </div>

                  <button
                    className="btn btn-primary mb-2 ms-2"
                    onClick={() => setModel(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Apicreate_info;
