/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';
import { User_Profile, GET_MESSAGE_BRODS } from "../../../ReduxStore/Slice/Common/commoSlice.js";
import DataTableExtensions from "react-data-table-component-extensions";
import { Get_user_margin, Get_order_data, GetLiveMarketData } from "../../../Service/common.service.js";
import FullDataTable from "../../../Components/ExtraComponents/Datatable/BasicDataTable";

/////////
import * as LightweightCharts from 'lightweight-charts';
const { createChart, LineStyle, CandlestickSeries, ColorType, CrosshairMode, PriceScaleMode } = LightweightCharts;
/////


const BrokerResponse = () => {
  const [UserDetails, setUserDetails] = useState([]);
  const [MarginData, setMarginData] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const [livedata, setLiveData] = useState([]);
  const [getSymbolNAme, setSymbolNAme] = useState("");


  console.log("livedata ", livedata)

  const slicedOrderData = OrderData.slice(0, 2);

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;

  const dispatch = useDispatch();

  const Get_margin_data = async () => {
    let Getdata = await Get_user_margin({
      "user_id": user_id
    });

    console.log("Getdata --- ",Getdata.data)
    setMarginData(Getdata.data);

  }

  const Get_User_order = async () => {
    let Getdata1 = await Get_order_data({
      "user_id": user_id
    });
    setOrderData(Getdata1.data)

  }


  const Get_market_data = async (sym) => {
    let Getdata1 = await GetLiveMarketData({
      "symbol": sym
    });
    setLiveData(Getdata1.data)

  }

  const data = async () => {
   
    await dispatch(User_Profile({ id: user_id }))
      .unwrap()
      .then((response) => {


        console.log("response userDetails - ",response)
        if (response.status) {
          setUserDetails(response.data);
        }
      });
  };

  const symbolName = getSymbolNAme && getSymbolNAme + ' ( NFO )'
  // const symbolName =   symbol + '   '+ '(  '+getSymbolNAme && getSymbolNAme+'  )'


  const chartOptions = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    colors: ['#FF6384', '#36A2EB', '#FFCE56'],
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
      },
    },
  };

  const chartSeries = [30, 50, 20]; // values should sum up to 100%


  const candlestickOptions = {
    chart: {
      type: 'candlestick',
    },
    title: {
      text: symbolName,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    events: {
      markerClick: (event, chartContext, { seriesIndex, dataPointIndex }) => {
        // Handle marker click event
        const series = chartContext.w.config.series[seriesIndex];
        const selectedPoint = series.data[dataPointIndex];


        console.log('Selected Data:', selectedPoint);

        // setSelectedData(selectedPoint);
      },
    }
  }


  const data1 = {

    series: [
      {
        data: livedata

      },
    ],


    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: symbolName,
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      events: {
        markerClick: (event, chartContext, { seriesIndex, dataPointIndex }) => {
          // Handle marker click event
          const series = chartContext.w.config.series[seriesIndex];
          const selectedPoint = series.data[dataPointIndex];


          console.log('Selected Data:', selectedPoint);

          // setSelectedData(selectedPoint);
        },
      },
    },


  }

  const candlestickSeries = [{
    data: livedata,
  }];



  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
    {
      name: "Action",
      cell: row => (<div className='action-btn'>

        {/* <Tooltip title="Edit" arrow><button className='btn btn-success  mr-2 rounded-circle'><i className="fa-solid fa-pen-to-square "></i></button></Tooltip>
   <Tooltip title="Delete" arrow><button className='btn btn-danger  mr-2 rounded-circle'><i className="fa-solid fa-trash "></i></button></Tooltip> */}
        <button className='btn' ><i className="fa-solid fa-eye text-warning"></i></button>
        <button className='btn' ><i className="fa-solid fa-pencil text-primary"></i></button>
      </div>),
    },
  ];

  const dataa = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]



  const ordercolumns = [
    {
      text: 'Name',
      dataField: "tradingsymbol",
    },
    {
      text: 'Price',
      dataField: "price",
    },
    {
      text: 'Quantity',
      dataField: "quantity",
    },
    {
      text: 'Exchange',
      dataField: "exchange",
    },
    {
      text: 'Order Type',
      dataField: "ordertype",
    },

  ];


  const handleClick = () => {
    Get_User_order()
  };


  

  const [activeTab, setActiveTab] = useState('v-pills-home');

  const handleTabClick = (tabId, sym) => {
    setSymbolNAme(sym)
    setActiveTab(tabId);
  };

  

  useEffect(() => {
    data();
    Get_margin_data();
    Get_market_data("BankNifty")

  }, [])


  const renderTabContent = (tabId) => {
    return (
      <div
        className={`tab-pane fade ${activeTab === tabId ? 'show active' : ''}`}
        id={tabId}
        role="tabpanel"
        aria-labelledby={`${tabId}-tab`}
      >

        <div id="trading-chart" />
      </div>
    );
  };


  useEffect(() => {
    if (UserDetails.TradingStatus == "on") {
      if (activeTab == "v-pills-profile") {
        Get_market_data("Nifty")
      } else {
        Get_market_data("BankNifty")

      }
    }


  }, [activeTab])

  





  useEffect(() => {

    const chart = createChart(document.getElementById('trading-chart'), {
      width: 600,
      height: 300,
      layout: {
        background: {
          type: 'solid',
          color: '#000000',
        },
        textColor: 'white',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.3)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.3)',
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00FF00",
      downColor: '#EB5406',
      borderDownColor: '#EB5406',
      borderUpColor: "#00FF00",
      wickDownColor: '#EB5406',
      wickUpColor: "#00FF00",
    });

    // Set data
    // candleSeries.setData(livedata);


    candleSeries.setData([
      { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
      { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
      { time: '2018-10-23', open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
      { time: '2018-10-24', open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
      { time: '2018-10-25', open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
      { time: '2018-10-26', open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
      { time: '2018-10-29', open: 173.74, high: 175.99, low: 170.95, close: 173.20 },
      { time: '2018-10-30', open: 173.16, high: 176.43, low: 172.64, close: 176.24 },
      { time: '2018-10-31', open: 177.98, high: 178.85, low: 175.59, close: 175.88 },
      { time: '2018-11-01', open: 176.84, high: 180.86, low: 175.90, close: 180.46 },
      { time: '2018-11-02', open: 182.47, high: 183.01, low: 177.39, close: 179.93 },
      { time: '2018-11-05', open: 181.02, high: 182.41, low: 179.30, close: 182.19 },
      { time: '2018-11-06', open: 181.93, high: 182.65, low: 180.05, close: 182.01 },
      { time: '2018-11-07', open: 183.79, high: 187.68, low: 182.06, close: 187.23 },
      { time: '2018-11-08', open: 187.13, high: 188.69, low: 185.72, close: 188.00 },
      { time: '2018-11-09', open: 188.32, high: 188.48, low: 184.96, close: 185.99 },
      { time: '2018-11-12', open: 185.23, high: 186.95, low: 179.02, close: 179.43 },
      { time: '2018-11-13', open: 177.30, high: 181.62, low: 172.85, close: 179.00 },
      { time: '2018-11-14', open: 182.61, high: 182.90, low: 179.15, close: 179.90 },
      { time: '2018-11-15', open: 179.01, high: 179.67, low: 173.61, close: 177.36 },
      { time: '2018-11-16', open: 173.99, high: 177.60, low: 173.51, close: 177.02 },
      { time: '2018-11-19', open: 176.71, high: 178.88, low: 172.30, close: 173.59 },
      { time: '2018-11-20', open: 169.25, high: 172.00, low: 167.00, close: 169.05 },
      { time: '2018-11-21', open: 170.00, high: 170.93, low: 169.15, close: 169.30 },
      { time: '2018-11-23', open: 169.39, high: 170.33, low: 168.47, close: 168.85 },
      { time: '2018-11-26', open: 170.20, high: 172.39, low: 168.87, close: 169.82 },
      { time: '2018-11-27', open: 169.11, high: 173.38, low: 168.82, close: 173.22 },
      { time: '2018-11-28', open: 172.91, high: 177.65, low: 170.62, close: 177.43 },
      { time: '2018-11-29', open: 176.80, high: 177.27, low: 174.92, close: 175.66 },
      { time: '2018-11-30', open: 175.75, high: 180.37, low: 175.11, close: 180.32 },
      { time: '2018-12-03', open: 183.29, high: 183.50, low: 179.35, close: 181.74 },
      { time: '2018-12-04', open: 181.06, high: 182.23, low: 174.55, close: 175.30 },
      { time: '2018-12-06', open: 173.50, high: 176.04, low: 170.46, close: 175.96 },
      { time: '2018-12-07', open: 175.35, high: 178.36, low: 172.24, close: 172.79 },
      { time: '2018-12-10', open: 173.39, high: 173.99, low: 167.73, close: 171.69 },
      { time: '2018-12-11', open: 174.30, high: 175.60, low: 171.24, close: 172.21 },
      { time: '2018-12-12', open: 173.75, high: 176.87, low: 172.81, close: 174.21 },
      { time: '2018-12-13', open: 174.31, high: 174.91, low: 172.07, close: 173.87 },
      { time: '2018-12-14', open: 172.98, high: 175.14, low: 171.95, close: 172.29 },
      { time: '2018-12-17', open: 171.51, high: 171.99, low: 166.93, close: 167.97 },
      { time: '2018-12-18', open: 168.90, high: 171.95, low: 168.50, close: 170.04 },
      { time: '2018-12-19', open: 170.92, high: 174.95, low: 166.77, close: 167.56 },
      { time: '2018-12-20', open: 166.28, high: 167.31, low: 162.23, close: 164.16 },
      { time: '2018-12-21', open: 162.81, high: 167.96, low: 160.17, close: 160.48 },
      { time: '2018-12-24', open: 160.16, high: 161.40, low: 158.09, close: 158.14 },
      { time: '2018-12-26', open: 159.46, high: 168.28, low: 159.44, close: 168.28 },
      { time: '2018-12-27', open: 166.44, high: 170.46, low: 163.36, close: 170.32 },
      { time: '2018-12-28', open: 171.22, high: 173.12, low: 168.60, close: 170.22 },
      { time: '2018-12-31', open: 171.47, high: 173.24, low: 170.65, close: 171.82 },
      { time: '2019-01-02', open: 169.71, high: 173.18, low: 169.05, close: 172.41 },
      { time: '2019-01-03', open: 171.84, high: 171.84, low: 168.21, close: 168.61 },
      { time: '2019-01-04', open: 170.18, high: 174.74, low: 169.52, close: 173.62 },
      { time: '2019-01-07', open: 173.83, high: 178.18, low: 173.83, close: 177.04 },
      { time: '2019-01-08', open: 178.57, high: 179.59, low: 175.61, close: 177.89 },
      { time: '2019-01-09', open: 177.87, high: 181.27, low: 177.10, close: 179.73 },
      { time: '2019-01-10', open: 178.03, high: 179.24, low: 176.34, close: 179.06 },
      { time: '2019-01-11', open: 177.93, high: 180.26, low: 177.12, close: 179.41 },
      { time: '2019-01-14', open: 177.59, high: 179.23, low: 176.90, close: 178.81 },
      { time: '2019-01-15', open: 176.08, high: 177.82, low: 175.20, close: 176.47 },
      { time: '2019-01-16', open: 177.09, high: 177.93, low: 175.86, close: 177.04 },
      { time: '2019-01-17', open: 174.01, high: 175.46, low: 172.00, close: 174.87 },
      { time: '2019-01-18', open: 176.98, high: 180.04, low: 176.18, close: 179.58 },
      { time: '2019-01-22', open: 177.49, high: 178.60, low: 175.36, close: 177.11 },
      { time: '2019-01-23', open: 176.59, high: 178.06, low: 174.53, close: 176.89 },
      { time: '2019-01-24', open: 177.00, high: 177.53, low: 175.30, close: 177.29 },
      { time: '2019-01-25', open: 179.78, high: 180.87, low: 178.61, close: 180.40 },
      { time: '2019-01-28', open: 178.97, high: 179.99, low: 177.41, close: 179.83 },

    ]);



  }, [])





  // useEffect(() => {
  //    //alert("okk")
  //   if (UserDetails.TradingStatus === "on") {
  //     data();
  //     Get_margin_data();
  //     Get_market_data("BankNifty")
  //     console.log("test=")
  //   }

  // }, [])


  return (
    <div className={`content-body`}>
      <div className="container-fluid">
        <h1 className="mb-3">Dashboard</h1>

        <div className="row align-items-end">
          <div className="col-lg-5">
            <div className="bg-white p-3 dash-bg">
              <h4>Accounts</h4>
              <div className="row">
                <div className="col-md-10">
                  <div
                    className="bg-img "
                    style={{
                      backgroundImage: `url("/assets/images/dash_icon/bg.jpg")`,
                      borderRadius: "10px",
                      backgroundSize: "cover",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        bottom: "0px",
                        padding: "15px",
                      }}
                    >
                      <div className="row mb-5">
                        <div className="col-md-6">
                          <p className="mb-0 text-white">M2M Released</p>
                          <h2 className="text-white">{MarginData.realizedMtomPrsnt}</h2>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-0 text-white">M2M Unreleased</p>
                          <h2 className="text-white">{MarginData.unrealizedMtomPrsnt}</h2>
                        </div>
                      </div>
                      <div className="row">
                        <ul className="d-flex justify-content-between">
                          <li>
                          {/* <h4 className="mb-0 text-white">{MarginData.total_cash}</h4> */}
                            <span className="mb-0 text-white"><b>{MarginData.total_cash}</b></span>
                            <p className=" mb-0 text-white">Total Margin</p>
                          </li>

                          <li>
                            {" "}
                            {/* <h4 className="mb-0 text-white">{MarginData.available_cash}</h4> */}
                            <span className="mb-0 text-white"><b>{MarginData.available_cash}</b></span>
                            <p className=" mb-0 text-white">Avb. Margin</p>
                          </li>
                          <li>
                          {/* <h4 className="mb-0 text-white">{MarginData.cncMarginUsed}</h4> */}
                            <span className="mb-0 text-white"><b>{MarginData.cncMarginUsed}</b></span>
                            <p className="mb-0 text-white">Used Margin</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 ps-0">
                  <div class="alert alert-info px-1" role="alert">
                    <p className="mb-0 text-center" style={{ fontSize: "11px" }}>
                      NSE
                      <span>
                        <i
                          className="fa-solid fa-circle ps-1"
                          style={{ fontSize: "8px" }}
                        ></i>
                      </span>
                    </p>
                  </div>
                  <div class="alert alert-warning px-1" role="alert">
                    <p className="mb-0 text-center" style={{ fontSize: "11px" }}>
                      NFO
                      <span>
                        <i
                          className="fa-solid fa-circle ps-1"
                          style={{ fontSize: "8px" }}
                        ></i>
                      </span>
                    </p>
                  </div>
                  <div class="alert alert-success px-1" role="alert">
                    <p className="mb-0 text-center" style={{ fontSize: "11px" }}>
                      MCX
                      <span>
                        <i
                          className="fa-solid fa-circle ps-1"
                          style={{ fontSize: "8px" }}
                        ></i>
                      </span>
                    </p>
                  </div>
                  <div class="alert alert-danger px-1 mb-0" role="alert">
                    <p className="mb-0 text-center" style={{ fontSize: "11px" }}>
                      CDS
                      <span>
                        <i
                          className="fa-solid fa-circle ps-1"
                          style={{ fontSize: "8px" }}
                        ></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="bg-white dash-bg clip-tabs">
              <svg style={{ height: "0px" }}>
                <defs>
                  <path id="thePath" d="M0,0C.565,0,.565,.9715,1,1H0" />
                  <clipPath id="maskLeft" clipPathUnits="objectBoundingBox">
                    <use
                      xlinkHref="#thePath"
                      transform="translate(1, 0) scale(-1, 1)"
                    />
                  </clipPath>
                  <clipPath id="maskRight" clipPathUnits="objectBoundingBox">
                    <use xlinkHref="#thePath" />
                  </clipPath>
                </defs>
              </svg>

              <ul
                className="nav nav-tabs new-tab justify-content-center border-0"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#home"
                  >
                    Position
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#menu1" onClick={handleClick}>
                    Orders Book
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#menu2">
                    Trade History
                  </a>
                </li>
              </ul>

              {/* Tab panes */}
              <div className="tab-content">
                <div id="home" className="container tab-pane active">

                  <div className="row">
                    <div className="col-md-4 px-0">
                      <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={350} />
                    </div>
                    <div className="col-md-8">
                      <DataTable
                        columns={columns}
                        data={dataa}
                      />
                    </div>
                  </div>

                </div>
                <div id="menu1" className="container tab-pane fade">


                  <FullDataTable TableColumns={ordercolumns} tableData={slicedOrderData} />

                </div>

                <div id="menu2" className="container tab-pane fade">
                  <FullDataTable TableColumns={ordercolumns} tableData={slicedOrderData} />
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* MY Watchlist */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="bg-white dash-bg">
              <h4 className="mb-4">My Watchlist</h4>
              <div className="d-lg-flex align-items-start">
                <div
                  className="nav flex-column nav-pills me-3 col-md-2"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className={`nav-link ${activeTab === 'v-pills-home' ? 'active' : ''}`}
                    id="v-pills-home-tab"
                    onClick={() => handleTabClick('v-pills-home', "Banknifty")}
                  >
                    Banknifty
                  </button>
                  <button
                    className={`nav-link ${activeTab === 'v-pills-profile' ? 'active' : ''}`}
                    id="v-pills-profile-tab"
                    onClick={() => handleTabClick('v-pills-profile', "Nifty")}
                  >
                    Nifty
                  </button>
                  <button
                    className={`nav-link ${activeTab === 'v-pills-messages' ? 'active' : ''}`}
                    id="v-pills-messages-tab"
                    onClick={() => handleTabClick('v-pills-messages', "Fin Nifty")}
                  >
                    Fin Nifty
                  </button>
                </div>

                <div className="tab-content col-md-10" id="v-pills-tabContent">
                  {renderTabContent('v-pills-home')}
                  {renderTabContent('v-pills-profile')}
                  {renderTabContent('v-pills-messages')}
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>

    </div>

  );
};

export default BrokerResponse;


// <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
// <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
// <script src="https://cdn.amcharts.com/lib/5/stock.js"></script>
// <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
// <div id="chartcontrols"></div>
// <div id="chartdiv"></div>


// body {
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
// }

// #chartcontrols {
//   height: auto;
//   padding: 5px 5px 0 16px;
//   max-width: 100%;
// }

// #chartdiv {
//   width: 100%;
//   height: 600px;
//   max-width: 100%;
// }


// /**
//  * ---------------------------------------
//  * This demo was created using amCharts 5.
//  * 
//  * For more information visit:
//  * https://www.amcharts.com/
//  * 
//  * Documentation is available at:
//  * https://www.amcharts.com/docs/v5/
//  * ---------------------------------------
//  */

// // Create root element
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/getting-started/#Root_element
// var root = am5.Root.new("chartdiv");


// // Set themes
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//   am5themes_Animated.new(root)
// ]);


// // Create a stock chart
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating_the_chart
// var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
// }));


// // Set global number format
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
// root.numberFormatter.set("numberFormat", "#,###.00");


// // Create a main stock panel (chart)
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding_panels
// var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
//   wheelY: "zoomX",
//   panX: true,
//   panY: true
// }));


// // Create value axis
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
//   renderer: am5xy.AxisRendererY.new(root, {
//     pan: "zoom"
//   }),
//   extraMin: 0.1, // adds some space for for main series
//   tooltip: am5.Tooltip.new(root, {}),
//   numberFormat: "#,###.00",
//   extraTooltipPrecision: 2
// }));

// var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
//   baseInterval: {
//     timeUnit: "day",
//     count: 1
//   },
//   renderer: am5xy.AxisRendererX.new(root, {}),
//   tooltip: am5.Tooltip.new(root, {})
// }));


// // Add series
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
//   name: "MSFT",
//   clustered: false,
//   valueXField: "Date",
//   valueYField: "Close",
//   highValueYField: "High",
//   lowValueYField: "Low",
//   openValueYField: "Open",
//   calculateAggregates: true,
//   xAxis: dateAxis,
//   yAxis: valueAxis,
//   legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
//   legendRangeValueText: ""
// }));


// // Set main value series
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
// stockChart.set("stockSeries", valueSeries);


// // Add a stock legend
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
// var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
//   stockChart: stockChart
// }));


// // Create volume axis
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
//   inside: true
// });

// volumeAxisRenderer.labels.template.set("forceHidden", true);
// volumeAxisRenderer.grid.template.set("forceHidden", true);

// var volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
//   numberFormat: "#.#a",
//   height: am5.percent(20),
//   y: am5.percent(100),
//   centerY: am5.percent(100),
//   renderer: volumeAxisRenderer
// }));

// // Add series
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// var volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
//   name: "Volume",
//   clustered: false,
//   valueXField: "Date",
//   valueYField: "Volume",
//   xAxis: dateAxis,
//   yAxis: volumeValueAxis,
//   legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]"
// }));

// volumeSeries.columns.template.setAll({
//   strokeOpacity: 0,
//   fillOpacity: 0.5
// });

// // color columns by stock rules
// volumeSeries.columns.template.adapters.add("fill", function(fill, target) {
//   var dataItem = target.dataItem;
//   if (dataItem) {
//     return stockChart.getVolumeColor(dataItem);
//   }
//   return fill;
// })


// // Set main series
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
// stockChart.set("volumeSeries", volumeSeries);
// valueLegend.data.setAll([valueSeries, volumeSeries]);


// // Add cursor(s)
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
// mainPanel.set("cursor", am5xy.XYCursor.new(root, {
//   yAxis: valueAxis,
//   xAxis: dateAxis,
//   snapToSeries: [valueSeries],
//   snapToSeriesBy: "y!"
// }));


// // Add scrollbar
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
// var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
//   orientation: "horizontal",
//   height: 50
// }));
// stockChart.toolsContainer.children.push(scrollbar);

// var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
//   baseInterval: {
//     timeUnit: "day",
//     count: 1
//   },
//   renderer: am5xy.AxisRendererX.new(root, {})
// }));

// var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
//   renderer: am5xy.AxisRendererY.new(root, {})
// }));

// var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
//   valueYField: "Close",
//   valueXField: "Date",
//   xAxis: sbDateAxis,
//   yAxis: sbValueAxis
// }));

// sbSeries.fills.template.setAll({
//   visible: true,
//   fillOpacity: 0.3
// });


// // Create a custom indicator
// // -------------------------------------------------------------------------------

// // Define indicator class
// class MyIndicator extends am5stock.ChartIndicator {

//   _editableSettings = [{
//     key: "margin",
//     name: "Margin",
//     type: "number"
//   }, {
//     key: "seriesColor",
//     name: "Color",
//     type: "color"
//   }, {
//     key: "seriesStyle",
//     name: "Line Style",
//     type: "dropdown",
//     options: ["Solid", "Dashed"]
//   }, {
//     key: "showFill",
//     name: "Show fill",
//     type: "checkbox"
//   }];

//   _createSeries() {
//     var stockSeries = this.get("stockSeries");

//     var series = this.panel.series.push(am5xy.SmoothedXLineSeries.new(this._root, {
//       valueXField: "valueX",
//       valueYField: "valueY1",
//       openValueYField: "valueY2",
//       groupDataDisabled: true,
//       calculateAggregates: true,
//       xAxis: this.xAxis,
//       yAxis: this.yAxis,
//       themeTags: ["indicator"],
//       name: "My indicator",
//       legendLabelText: "{name}",
//       legendValueText: "high: [bold]{valueY}[/] - low: [bold]{openValueY}[/]",
//       legendRangeValueText: "",
//       stroke: this.get("seriesColor"),
//       fill: this.get("seriesColor")
//     }));

//     series.fills.template.setAll({
//       fillOpacity: 0.3,
//       visible: true
//     });

//     return series;
//   }

//   _afterNew() {
//     // Set default indicator name
//     this._setDefault("name", "My Indicator");
//     this._setDefault("margin", 100);
//     this._setDefault("seriesColor", am5.color(0x045153));
//     this._setDefault("seriesStyle", "Solid");
//     this._setDefault("showFill", true);

//     // Don't forget inherited stuff
//     super._afterNew();
//   }

//   _beforeChanged() {

//     if (this.isDirty("margin")) {
//       this.prepareData();
//     }

//     if (this.isDirty("seriesStyle")) {
//       var style = this.get("seriesStyle");
//       if (style == "Dashed") {
//         this.series.strokes.template.set("strokeDasharray", [4, 4]);
//       }
//       else {
//         this.series.strokes.template.remove("strokeDasharray");
//       }
//     }

//     if (this.isDirty("showFill")) {
//       this.series.fills.template.set("visible", this.get("showFill"));
//     }

//     // Don't forget inherited stuff
//     super._beforeChanged();
//   }

//   prepareData() {
//     // Setting up data
//     var stockSeries = this.get("stockSeries");
//     var dataItems = stockSeries.dataItems;
//     var data = this._getDataArray(dataItems);

//     var margin = this.get("margin", 0);

//     am5.array.each(data, function(item, i) {
//       let baseValue = dataItems[i].get("valueY", 0);
//       item.valueY1 = baseValue + Math.round(Math.random() * margin);
//       item.valueY2 = baseValue - Math.round(Math.random() * margin);
//     });

//     this.series.data.setAll(data);
//   }

// }

// // Add indicator
// var myIndicator = stockChart.indicators.push(MyIndicator.new(root, {
//   stockChart: stockChart,
//   stockSeries: valueSeries,
//   legend: valueLegend
// }));

// // Create indicator control
// var indicatorControl = am5stock.IndicatorControl.new(root, {
//   stockChart: stockChart,
//   legend: valueLegend
// });

// // Get current indicators
// var indicators = indicatorControl.get("indicators", []);

// // Add custom indicator to the top of the list
// indicators.unshift({
//   id: "myIndicator",
//   name: "My indicator",
//   callback: function() {
//     var myIndicator = stockChart.indicators.push(MyIndicator.new(root, {
//       stockChart: stockChart,
//       stockSeries: valueSeries,
//       legend: valueLegend
//     }));
//     return myIndicator;
//   }
// });

// // Set indicator list back
// indicatorControl.set("indicators", indicators);


// // Stock toolbar
// // -------------------------------------------------------------------------------
// // https://www.amcharts.com/docs/v5/charts/stock/toolbar/
// var toolbar = am5stock.StockToolbar.new(root, {
//   container: document.getElementById("chartcontrols"),
//   stockChart: stockChart,
//   controls: [
//     indicatorControl,
//     am5stock.DateRangeSelector.new(root, {
//       stockChart: stockChart
//     }),
//     am5stock.PeriodSelector.new(root, {
//       stockChart: stockChart
//     }),
//     am5stock.DrawingControl.new(root, {
//       stockChart: stockChart
//     }),
//     am5stock.ResetControl.new(root, {
//       stockChart: stockChart
//     }),
//     am5stock.SettingsControl.new(root, {
//       stockChart: stockChart
//     })
//   ]
// });

// // data
// var data = [
//   { Date: 1617192000000, Open: 515.67, High: 528.13, Low: 515.44, Close: 521.66, Volume: 3503100 },
//   { Date: 1617278400000, Open: 529.93, High: 540.5, Low: 527.03, Close: 539.42, Volume: 3938600 },
//   { Date: 1617624000000, Open: 540.01, High: 542.85, Low: 529.23, Close: 540.67, Volume: 3355900 },
//   { Date: 1617710400000, Open: 544.81, High: 554.17, Low: 543.3, Close: 544.53, Volume: 3474200 },
//   { Date: 1617796800000, Open: 543.5, High: 549.64, Low: 541.45, Close: 546.99, Volume: 2151300 },
//   { Date: 1617883200000, Open: 551.13, High: 556.9, Low: 547.57, Close: 554.58, Volume: 4309800 },
//   { Date: 1617969600000, Open: 552.69, High: 556.9, Low: 547.11, Close: 555.31, Volume: 2894000 },
//   { Date: 1618228800000, Open: 551.05, High: 557.98, Low: 549.58, Close: 552.78, Volume: 2944100 },
//   { Date: 1618315200000, Open: 557, High: 559.75, Low: 550.3, Close: 553.73, Volume: 2720300 },
//   { Date: 1618401600000, Open: 554.87, High: 554.87, Low: 538.53, Close: 540.02, Volume: 3740300 },
//   { Date: 1618488000000, Open: 544.17, High: 553.49, Low: 542.66, Close: 549.22, Volume: 3139100 },
//   { Date: 1618574400000, Open: 550.54, High: 551.98, Low: 539.51, Close: 546.54, Volume: 3209100 },
//   { Date: 1618833600000, Open: 546.9, High: 556.44, Low: 545.53, Close: 554.44, Volume: 4288700 },
//   { Date: 1618920000000, Open: 554.42, High: 563.56, Low: 546.3, Close: 549.57, Volume: 11257600 },
//   { Date: 1619006400000, Open: 508, High: 515.46, Low: 503.6, Close: 508.9, Volume: 22897400 },
//   { Date: 1619092800000, Open: 513.82, High: 513.96, Low: 500.55, Close: 508.78, Volume: 9061100 },
//   { Date: 1619179200000, Open: 509.01, High: 509.7, Low: 500.7, Close: 505.55, Volume: 7307700 },
//   { Date: 1619438400000, Open: 506.76, High: 510.48, Low: 503, Close: 510.3, Volume: 4388800 },
//   { Date: 1619524800000, Open: 512.62, High: 512.99, Low: 504.58, Close: 505.55, Volume: 3761300 },
//   { Date: 1619611200000, Open: 505.2, High: 508.4, Low: 503.34, Close: 506.52, Volume: 3193000 },
//   { Date: 1619697600000, Open: 507.6, High: 509.29, Low: 499, Close: 509, Volume: 5127800 },
//   { Date: 1619784000000, Open: 505, High: 514.55, Low: 505, Close: 513.47, Volume: 4413200 },
//   { Date: 1620043200000, Open: 512.65, High: 518.95, Low: 505.2, Close: 509.11, Volume: 4091900 },
//   { Date: 1620129600000, Open: 510.78, High: 511.63, Low: 496.79, Close: 503.18, Volume: 4349500 },
//   { Date: 1620216000000, Open: 504.99, High: 507.78, Low: 494.63, Close: 496.08, Volume: 3129400 },
//   { Date: 1620302400000, Open: 495.99, High: 499.55, Low: 491.37, Close: 499.55, Volume: 3783700 },
//   { Date: 1620388800000, Open: 504.62, High: 508.55, Low: 501.12, Close: 503.84, Volume: 3132800 },
//   { Date: 1620648000000, Open: 502, High: 503.15, Low: 486.11, Close: 486.69, Volume: 5131600 },
//   { Date: 1620734400000, Open: 479.75, High: 497.99, Low: 478.63, Close: 495.08, Volume: 4401000 },
//   { Date: 1620820800000, Open: 486.83, High: 493.54, Low: 482.7, Close: 484.98, Volume: 4121500 },
//   { Date: 1620907200000, Open: 489.13, High: 490.78, Low: 482.71, Close: 486.66, Volume: 2712500 },
//   { Date: 1620993600000, Open: 487.86, High: 494.85, Low: 486.59, Close: 493.37, Volume: 2882500 },
//   { Date: 1621252800000, Open: 485.59, High: 492.71, Low: 482.81, Close: 488.94, Volume: 2705200 },
//   { Date: 1621339200000, Open: 488.4, High: 493.48, Low: 486.19, Close: 486.28, Volume: 2350500 },
//   { Date: 1621425600000, Open: 481.63, High: 488.57, Low: 478.54, Close: 487.7, Volume: 3349900 },
//   { Date: 1621512000000, Open: 489.55, High: 502.7, Low: 488.98, Close: 501.67, Volume: 3721200 },
//   { Date: 1621598400000, Open: 503.12, High: 505.4, Low: 497.26, Close: 497.89, Volume: 3322900 },
//   { Date: 1621857600000, Open: 501.05, High: 504.25, Low: 499.51, Close: 502.9, Volume: 2412600 },
//   { Date: 1621944000000, Open: 506, High: 506.37, Low: 499.22, Close: 501.34, Volume: 2699500 },
//   { Date: 1622030400000, Open: 502.34, High: 504.14, Low: 500.5, Close: 502.36, Volume: 2465300 },
//   { Date: 1622116800000, Open: 501.8, High: 505.1, Low: 498.54, Close: 503.86, Volume: 3253800 },
//   { Date: 1622203200000, Open: 504.4, High: 511.76, Low: 502.53, Close: 502.81, Volume: 2910300 },
//   { Date: 1622548800000, Open: 504.01, High: 505.41, Low: 497.74, Close: 499.08, Volume: 2482600 },
//   { Date: 1622635200000, Open: 499.82, High: 503.22, Low: 495.82, Close: 499.24, Volume: 2269000 },
//   { Date: 1622721600000, Open: 495.19, High: 496.66, Low: 487.25, Close: 489.43, Volume: 3887400 },
//   { Date: 1622808000000, Open: 492, High: 501.86, Low: 490.95, Close: 494.74, Volume: 3160500 },
//   { Date: 1623067200000, Open: 492.92, High: 496.7, Low: 490.55, Close: 494.66, Volume: 2791900 },
//   { Date: 1623153600000, Open: 497, High: 498.82, Low: 489.37, Close: 492.39, Volume: 2374000 },
//   { Date: 1623240000000, Open: 494.5, High: 496.09, Low: 484.65, Close: 485.81, Volume: 3055000 },
//   { Date: 1623326400000, Open: 487.17, High: 490.21, Low: 482.14, Close: 487.27, Volume: 4382900 },
//   { Date: 1623412800000, Open: 490, High: 491.41, Low: 487.78, Close: 488.77, Volume: 3124000 },
//   { Date: 1623672000000, Open: 489.68, High: 503.5, Low: 486.91, Close: 499.89, Volume: 4400200 },
//   { Date: 1623758400000, Open: 501.23, High: 501.23, Low: 490.4, Close: 491.9, Volume: 3104100 },
//   { Date: 1623844800000, Open: 495, High: 496.46, Low: 486.28, Close: 492.41, Volume: 3533200 },
//   { Date: 1623931200000, Open: 490.25, High: 501.8, Low: 490.15, Close: 498.34, Volume: 3198300 },
//   { Date: 1624017600000, Open: 496.4, High: 504.49, Low: 495.24, Close: 500.77, Volume: 5197600 },
//   { Date: 1624276800000, Open: 501.64, High: 502.05, Low: 492.28, Close: 497, Volume: 5277300 },
//   { Date: 1624363200000, Open: 498.54, High: 513.55, Low: 495.8, Close: 508.82, Volume: 5809300 },
//   { Date: 1624449600000, Open: 508.48, High: 516.63, Low: 508.2, Close: 512.74, Volume: 3944800 },
//   { Date: 1624536000000, Open: 517.96, High: 520.96, Low: 514.4, Close: 518.06, Volume: 3361200 },
//   { Date: 1624622400000, Open: 528.84, High: 533.06, Low: 525, Close: 527.07, Volume: 5299100 },
//   { Date: 1624881600000, Open: 528.12, High: 533.94, Low: 524.56, Close: 533.03, Volume: 2820200 },
//   { Date: 1624968000000, Open: 533.55, High: 536.13, Low: 528.57, Close: 533.5, Volume: 2314600 },
//   { Date: 1625054400000, Open: 534.06, High: 534.38, Low: 526.82, Close: 528.21, Volume: 2773400 },
//   { Date: 1625140800000, Open: 525.72, High: 537.04, Low: 525.72, Close: 533.54, Volume: 2805400 },
//   { Date: 1625227200000, Open: 535.5, High: 538.54, Low: 529.39, Close: 533.98, Volume: 1975500 },
//   { Date: 1625572800000, Open: 533, High: 542.86, Low: 533, Close: 541.64, Volume: 2775100 },
//   { Date: 1625659200000, Open: 544.24, High: 544.64, Low: 531.66, Close: 535.96, Volume: 2722500 },
//   { Date: 1625745600000, Open: 530.93, High: 535.5, Low: 529.09, Close: 530.76, Volume: 3269000 },
//   { Date: 1625832000000, Open: 531, High: 538.26, Low: 528.58, Close: 535.98, Volume: 2777200 },
//   { Date: 1626091200000, Open: 540.3, High: 540.65, Low: 532.92, Close: 537.31, Volume: 1780700 },
//   { Date: 1626177600000, Open: 535.76, High: 545.33, Low: 535.76, Close: 540.68, Volume: 2751600 },
//   { Date: 1626264000000, Open: 541.01, High: 554.1, Low: 541.01, Close: 547.95, Volume: 4659500 },
//   { Date: 1626350400000, Open: 553.97, High: 557.54, Low: 538.2, Close: 542.95, Volume: 5713900 },
//   { Date: 1626436800000, Open: 541.81, High: 544.06, Low: 527.05, Close: 530.31, Volume: 3442100 },
//   { Date: 1626696000000, Open: 526.05, High: 534.91, Low: 522.24, Close: 532.28, Volume: 3885800 },
//   { Date: 1626782400000, Open: 526.07, High: 536.64, Low: 520.3, Close: 531.05, Volume: 6930400 },
//   { Date: 1626868800000, Open: 526.13, High: 530.99, Low: 505.61, Close: 513.63, Volume: 11906800 },
//   { Date: 1626955200000, Open: 510.21, High: 513.68, Low: 507, Close: 511.77, Volume: 4328100 },
//   { Date: 1627041600000, Open: 512.16, High: 517.41, Low: 504.66, Close: 515.41, Volume: 3820500 },
//   { Date: 1627300800000, Open: 514.38, High: 521.13, Low: 509.01, Close: 516.49, Volume: 2254500 },
//   { Date: 1627387200000, Open: 518.08, High: 521.95, Low: 512.05, Close: 518.91, Volume: 2759000 },
//   { Date: 1627473600000, Open: 521.82, High: 524.47, Low: 516.98, Close: 519.3, Volume: 2390500 },
//   { Date: 1627560000000, Open: 519.96, High: 520.78, Low: 513.79, Close: 514.25, Volume: 1736000 },
//   { Date: 1627646400000, Open: 512.69, High: 519.79, Low: 510.96, Close: 517.57, Volume: 2537100 },
//   { Date: 1627905600000, Open: 519, High: 519.85, Low: 510.51, Close: 515.15, Volume: 2096600 },
//   { Date: 1627992000000, Open: 514.39, High: 515.63, Low: 505.37, Close: 510.82, Volume: 2579400 },
//   { Date: 1628078400000, Open: 513, High: 517.98, Low: 510.37, Close: 517.35, Volume: 2039400 },
//   { Date: 1628164800000, Open: 517.13, High: 525.41, Low: 514.02, Close: 524.89, Volume: 2556700 },
//   { Date: 1628251200000, Open: 524, High: 526.84, Low: 519.39, Close: 520.55, Volume: 1919800 },
//   { Date: 1628510400000, Open: 521.15, High: 522.67, Low: 517.99, Close: 519.97, Volume: 1367800 },
//   { Date: 1628596800000, Open: 520, High: 520.79, Low: 512.97, Close: 515.84, Volume: 1960500 },
//   { Date: 1628683200000, Open: 517, High: 519.57, Low: 509.77, Close: 512.4, Volume: 1673900 },
//   { Date: 1628769600000, Open: 511.86, High: 513, Low: 507.2, Close: 510.72, Volume: 1685700 },
//   { Date: 1628856000000, Open: 512.64, High: 521.44, Low: 511.51, Close: 515.92, Volume: 2177700 },
//   { Date: 1629115200000, Open: 515.24, High: 523.38, Low: 512.3, Close: 517.92, Volume: 2032800 },
//   { Date: 1629201600000, Open: 515.47, High: 520.79, Low: 514.2, Close: 518.91, Volume: 2309800 },
//   { Date: 1629288000000, Open: 520, High: 526.38, Low: 518.65, Close: 521.87, Volume: 2582000 },
//   { Date: 1629374400000, Open: 522.74, High: 548.39, Low: 521.87, Close: 543.71, Volume: 7497300 },
//   { Date: 1629460800000, Open: 545.09, High: 551.39, Low: 539.1, Close: 546.88, Volume: 3776400 },
//   { Date: 1629720000000, Open: 545.98, High: 555.55, Low: 543.74, Close: 553.33, Volume: 2602000 },
//   { Date: 1629806400000, Open: 551.48, High: 555.31, Low: 549.27, Close: 553.41, Volume: 2109500 },
//   { Date: 1629892800000, Open: 550.16, High: 552.84, Low: 545.45, Close: 547.58, Volume: 2065600 },
//   { Date: 1629979200000, Open: 546.16, High: 552.6, Low: 545.9, Close: 550.12, Volume: 1595500 },
//   { Date: 1630065600000, Open: 551.6, High: 564.17, Low: 549.25, Close: 558.92, Volume: 3252600 },
//   { Date: 1630324800000, Open: 557.25, High: 567.16, Low: 556.45, Close: 566.18, Volume: 2434800 },
//   { Date: 1630411200000, Open: 566.12, High: 569.48, Low: 561.61, Close: 569.19, Volume: 2431900 },
//   { Date: 1630497600000, Open: 569, High: 591, Low: 569, Close: 582.07, Volume: 5626200 },
//   { Date: 1630584000000, Open: 583.68, High: 598.76, Low: 583.68, Close: 588.55, Volume: 6179900 },
//   { Date: 1630670400000, Open: 585.8, High: 591.88, Low: 583.14, Close: 590.53, Volume: 2681200 },
//   { Date: 1631016000000, Open: 594.69, High: 613.85, Low: 593.99, Close: 606.71, Volume: 5821400 },
//   { Date: 1631102400000, Open: 603.84, High: 615.6, Low: 595.71, Close: 606.05, Volume: 5424500 },
//   { Date: 1631188800000, Open: 606.47, High: 609.44, Low: 596.55, Close: 597.54, Volume: 2954200 },
//   { Date: 1631275200000, Open: 598.16, High: 609.45, Low: 593.67, Close: 598.72, Volume: 3950800 },
//   { Date: 1631534400000, Open: 598.57, High: 598.57, Low: 582.78, Close: 589.29, Volume: 3062900 },
//   { Date: 1631620800000, Open: 584.89, High: 587.28, Low: 575.56, Close: 577.76, Volume: 3457000 },
//   { Date: 1631707200000, Open: 578.17, High: 584.62, Low: 575.37, Close: 582.87, Volume: 2755600 },
//   { Date: 1631793600000, Open: 584.3, High: 587.48, Low: 577.72, Close: 586.5, Volume: 1832000 },
//   { Date: 1631880000000, Open: 587.85, High: 590.28, Low: 580.85, Close: 589.35, Volume: 4145100 },
//   { Date: 1632139200000, Open: 586.79, High: 591.53, Low: 568.08, Close: 575.43, Volume: 3732200 },
//   { Date: 1632225600000, Open: 578.31, High: 581.88, Low: 569.37, Close: 573.14, Volume: 2250900 },
//   { Date: 1632312000000, Open: 579.69, High: 595.65, Low: 579.69, Close: 590.65, Volume: 4021800 },
//   { Date: 1632398400000, Open: 590.79, High: 599.32, Low: 589.13, Close: 593.26, Volume: 2526200 },
//   { Date: 1632484800000, Open: 592.5, High: 592.98, Low: 583.64, Close: 592.39, Volume: 2126200 },
//   { Date: 1632744000000, Open: 587.95, High: 593.58, Low: 576.93, Close: 592.64, Volume: 2504700 },
//   { Date: 1632830400000, Open: 589, High: 599.54, Low: 580.16, Close: 583.85, Volume: 4431100 },
//   { Date: 1632916800000, Open: 589.01, High: 609.88, Low: 588.01, Close: 599.06, Volume: 6221000 },
//   { Date: 1633003200000, Open: 608.05, High: 619, Low: 608.05, Close: 610.34, Volume: 6612600 },
//   { Date: 1633089600000, Open: 604.24, High: 614.99, Low: 597.51, Close: 613.15, Volume: 4090800 },
//   { Date: 1633348800000, Open: 613.39, High: 626.13, Low: 594.68, Close: 603.35, Volume: 4995900 },
//   { Date: 1633435200000, Open: 606.94, High: 640.39, Low: 606.89, Close: 634.81, Volume: 9534300 },
//   { Date: 1633521600000, Open: 628.18, High: 639.87, Low: 626.36, Close: 639.1, Volume: 4580400 },
//   { Date: 1633608000000, Open: 642.23, High: 646.84, Low: 630.45, Close: 631.85, Volume: 3556900 },
//   { Date: 1633694400000, Open: 634.17, High: 643.8, Low: 630.86, Close: 632.66, Volume: 3272100 },
//   { Date: 1633953600000, Open: 633.2, High: 639.42, Low: 626.78, Close: 627.04, Volume: 2862500 },
//   { Date: 1634040000000, Open: 633.02, High: 637.66, Low: 621.99, Close: 624.94, Volume: 3227300 },
//   { Date: 1634126400000, Open: 632.18, High: 632.18, Low: 622.1, Close: 629.76, Volume: 2420300 },
//   { Date: 1634212800000, Open: 632.23, High: 636.88, Low: 626.79, Close: 633.8, Volume: 2671700 },
//   { Date: 1634299200000, Open: 638, High: 639.42, Low: 625.16, Close: 628.29, Volume: 4116900 },
//   { Date: 1634558400000, Open: 632.1, High: 638.41, Low: 620.59, Close: 637.97, Volume: 4669100 },
//   { Date: 1634644800000, Open: 636.97, High: 641, Low: 632.3, Close: 639, Volume: 7633100 },
//   { Date: 1634731200000, Open: 625.57, High: 637.4, Low: 617.15, Close: 625.14, Volume: 10622000 },
//   { Date: 1634817600000, Open: 628.89, High: 654.01, Low: 628.65, Close: 653.16, Volume: 8437100 },
//   { Date: 1634904000000, Open: 651.81, High: 665.46, Low: 651.81, Close: 664.78, Volume: 6186000 },
//   { Date: 1635163200000, Open: 663.74, High: 675.88, Low: 657.07, Close: 671.66, Volume: 3833500 },
//   { Date: 1635249600000, Open: 673.76, High: 676.49, Low: 662.77, Close: 668.52, Volume: 2904800 },
//   { Date: 1635336000000, Open: 669, High: 671.41, Low: 661.85, Close: 662.92, Volume: 2276900 },
//   { Date: 1635422400000, Open: 670.95, High: 676.8, Low: 668.03, Close: 674.05, Volume: 2859400 },
//   { Date: 1635508800000, Open: 673.06, High: 690.97, Low: 671.24, Close: 690.31, Volume: 3825300 },
//   { Date: 1635768000000, Open: 689.06, High: 689.97, Low: 676.54, Close: 681.17, Volume: 3110900 },
//   { Date: 1635854400000, Open: 683.11, High: 687.68, Low: 673.82, Close: 677.72, Volume: 3888600 },
//   { Date: 1635940800000, Open: 677.27, High: 689.39, Low: 677.27, Close: 688.29, Volume: 2334900 },
//   { Date: 1636027200000, Open: 685.89, High: 685.94, Low: 665.5, Close: 668.4, Volume: 4865000 },
//   { Date: 1636113600000, Open: 663.97, High: 665.64, Low: 645.01, Close: 645.72, Volume: 5283500 },
//   { Date: 1636372800000, Open: 650.29, High: 656, Low: 643.79, Close: 651.45, Volume: 2887500 },
//   { Date: 1636459200000, Open: 653.7, High: 660.5, Low: 650.52, Close: 655.99, Volume: 2415600 },
//   { Date: 1636545600000, Open: 653.01, High: 660.33, Low: 642.11, Close: 646.91, Volume: 2405800 },
//   { Date: 1636632000000, Open: 650.24, High: 665.82, Low: 649.71, Close: 657.58, Volume: 2868300 },
//   { Date: 1636718400000, Open: 660.01, High: 683.34, Low: 653.82, Close: 682.61, Volume: 4198400 },
//   { Date: 1636977600000, Open: 681.24, High: 685.26, Low: 671.49, Close: 679.33, Volume: 2872200 },
//   { Date: 1637064000000, Open: 678.27, High: 688.36, Low: 676.9, Close: 687.4, Volume: 2077400 },
//   { Date: 1637150400000, Open: 690, High: 700.99, Low: 686.09, Close: 691.69, Volume: 2732800 },
//   { Date: 1637236800000, Open: 691.61, High: 691.74, Low: 679.74, Close: 682.02, Volume: 2012900 },
//   { Date: 1637323200000, Open: 692.35, High: 694.16, Low: 675, Close: 678.8, Volume: 2613700 },
//   { Date: 1637582400000, Open: 676.02, High: 679.48, Low: 656.47, Close: 659.2, Volume: 2764400 },
//   { Date: 1637668800000, Open: 658.18, High: 666.43, Low: 646.05, Close: 654.06, Volume: 2320200 },
//   { Date: 1637755200000, Open: 658.01, High: 661.44, Low: 651.1, Close: 658.29, Volume: 1867300 },
//   { Date: 1637928000000, Open: 675, High: 676.41, Low: 660.67, Close: 665.64, Volume: 2872500 },
//   { Date: 1638187200000, Open: 663.2, High: 667.99, Low: 658.29, Close: 663.84, Volume: 2529400 },
//   { Date: 1638273600000, Open: 668.2, High: 675.38, Low: 640.01, Close: 641.9, Volume: 5608900 },
//   { Date: 1638360000000, Open: 649.48, High: 654.52, Low: 617.07, Close: 617.77, Volume: 3882800 },
//   { Date: 1638446400000, Open: 617.1, High: 625.36, Low: 612.88, Close: 616.47, Volume: 3331100 },
//   { Date: 1638532800000, Open: 622.75, High: 625.5, Low: 594, Close: 602.13, Volume: 4829300 },
//   { Date: 1638792000000, Open: 606.01, High: 617.29, Low: 601, Close: 612.69, Volume: 3075700 },
//   { Date: 1638878400000, Open: 619.83, High: 628.89, Low: 611.4, Close: 625.58, Volume: 3125200 },
//   { Date: 1638964800000, Open: 630, High: 632.46, Low: 623.2, Close: 628.08, Volume: 2220300 },
//   { Date: 1639051200000, Open: 627.58, High: 630.24, Low: 610.44, Close: 611, Volume: 2376300 },
//   { Date: 1639137600000, Open: 616.78, High: 617.74, Low: 605.88, Close: 611.66, Volume: 2748800 },
//   { Date: 1639396800000, Open: 612, High: 612.64, Low: 599.52, Close: 604.56, Volume: 2517900 },
//   { Date: 1639483200000, Open: 598.71, High: 602.29, Low: 588.13, Close: 597.99, Volume: 2984500 },
//   { Date: 1639569600000, Open: 598.18, High: 605.69, Low: 584.51, Close: 605.04, Volume: 2866200 },
//   { Date: 1639656000000, Open: 597.09, High: 602.83, Low: 588, Close: 591.06, Volume: 3143200 },
//   { Date: 1639742400000, Open: 591.61, High: 593.25, Low: 581.74, Close: 586.73, Volume: 4386900 },
//   { Date: 1640001600000, Open: 586.43, High: 602.88, Low: 584.26, Close: 593.74, Volume: 3358400 },
//   { Date: 1640088000000, Open: 597.54, High: 607.82, Low: 593.86, Close: 604.92, Volume: 2319400 },
//   { Date: 1640174400000, Open: 603.36, High: 614.82, Low: 602.63, Close: 614.24, Volume: 2335700 },
//   { Date: 1640260800000, Open: 616.4, High: 616.88, Low: 607.57, Close: 614.09, Volume: 1621100 },
//   { Date: 1640606400000, Open: 615, High: 615, Low: 609.25, Close: 613.12, Volume: 2061500 },
//   { Date: 1640692800000, Open: 614.95, High: 618.41, Low: 609.69, Close: 610.71, Volume: 1882800 },
//   { Date: 1640779200000, Open: 610.71, High: 613.98, Low: 604.68, Close: 610.54, Volume: 1287200 },
//   { Date: 1640865600000, Open: 612.99, High: 620.61, Low: 611.24, Close: 612.09, Volume: 1625100 },
//   { Date: 1640952000000, Open: 610.01, High: 614.08, Low: 602.05, Close: 602.44, Volume: 1995900 },
//   { Date: 1641211200000, Open: 605.61, High: 609.99, Low: 590.56, Close: 597.37, Volume: 3067500 },
//   { Date: 1641297600000, Open: 599.91, High: 600.41, Low: 581.6, Close: 591.15, Volume: 4393100 },
//   { Date: 1641384000000, Open: 592, High: 592.84, Low: 566.88, Close: 567.52, Volume: 4148700 },
//   { Date: 1641470400000, Open: 554.34, High: 563.36, Low: 542.01, Close: 553.29, Volume: 5711800 },
//   { Date: 1641556800000, Open: 549.46, High: 553.43, Low: 538.22, Close: 541.06, Volume: 3382900 },
//   { Date: 1641816000000, Open: 538.49, High: 543.69, Low: 526.32, Close: 539.85, Volume: 4486100 },
//   { Date: 1641902400000, Open: 536.99, High: 543.91, Low: 530.07, Close: 540.84, Volume: 3077800 },
//   { Date: 1641988800000, Open: 544.27, High: 544.27, Low: 532.02, Close: 537.22, Volume: 3787400 },
//   { Date: 1642075200000, Open: 537.06, High: 540.79, Low: 518.26, Close: 519.2, Volume: 4475100 },
//   { Date: 1642161600000, Open: 517.6, High: 538.37, Low: 511.88, Close: 525.69, Volume: 7861100 },
//   { Date: 1642507200000, Open: 520.08, High: 521.75, Low: 508.68, Close: 510.8, Volume: 4839100 },
//   { Date: 1642593600000, Open: 515, High: 523.21, Low: 510.51, Close: 515.86, Volume: 4353500 },
//   { Date: 1642680000000, Open: 517.75, High: 526.64, Low: 506.93, Close: 508.25, Volume: 12659000 },
//   { Date: 1642766400000, Open: 400.43, High: 409.15, Low: 379.99, Close: 397.5, Volume: 58904300 },
//   { Date: 1643025600000, Open: 383.91, High: 387.26, Low: 351.46, Close: 387.15, Volume: 32346000 },
//   { Date: 1643112000000, Open: 379.14, High: 387.71, Low: 365.13, Close: 366.42, Volume: 15145800 },
//   { Date: 1643198400000, Open: 378.27, High: 382.66, Low: 356.62, Close: 359.7, Volume: 12684000 },
//   { Date: 1643284800000, Open: 382.06, High: 394.8, Low: 378.1, Close: 386.7, Volume: 24324700 },
//   { Date: 1643371200000, Open: 386.76, High: 387, Low: 372.08, Close: 384.36, Volume: 11966600 },
//   { Date: 1643630400000, Open: 401.97, High: 427.7, Low: 398.2, Close: 427.14, Volume: 20047500 },
//   { Date: 1643716800000, Open: 432.96, High: 458.48, Low: 425.54, Close: 457.13, Volume: 22568100 },
//   { Date: 1643803200000, Open: 448.25, High: 451.98, Low: 426.48, Close: 429.48, Volume: 14346000 },
//   { Date: 1643889600000, Open: 421.44, High: 429.26, Low: 404.28, Close: 405.6, Volume: 9905200 },
//   { Date: 1643976000000, Open: 407.31, High: 412.77, Low: 396.64, Close: 410.17, Volume: 7789800 },
//   { Date: 1644235200000, Open: 410.17, High: 412.35, Low: 393.55, Close: 402.1, Volume: 8232900 },
//   { Date: 1644321600000, Open: 398.18, High: 406.61, Low: 395.83, Close: 403.53, Volume: 6818500 },
//   { Date: 1644408000000, Open: 408.65, High: 412.98, Low: 398.79, Close: 412.89, Volume: 7738200 },
//   { Date: 1644494400000, Open: 402.1, High: 408, Low: 396.36, Close: 406.27, Volume: 8452900 },
//   { Date: 1644580800000, Open: 405.33, High: 411.61, Low: 387.65, Close: 391.31, Volume: 7558900 },
//   { Date: 1644840000000, Open: 387.59, High: 409.36, Low: 386.89, Close: 396.57, Volume: 7202200 },
//   { Date: 1644926400000, Open: 403.79, High: 409.16, Low: 401.01, Close: 407.46, Volume: 5392300 },
//   { Date: 1645012800000, Open: 401.53, High: 401.56, Low: 390.38, Close: 398.08, Volume: 5277700 },
//   { Date: 1645099200000, Open: 394.24, High: 399.11, Low: 385.7, Close: 386.67, Volume: 4669200 },
//   { Date: 1645185600000, Open: 392.53, High: 402.87, Low: 389.05, Close: 391.29, Volume: 6801700 },
//   { Date: 1645531200000, Open: 388.95, High: 392.42, Low: 373.02, Close: 377.38, Volume: 6697500 },
//   { Date: 1645617600000, Open: 382.72, High: 386, Low: 366.66, Close: 367.46, Volume: 4614300 },
//   { Date: 1645704000000, Open: 355.09, High: 390.73, Low: 354.72, Close: 390.03, Volume: 7068700 },
//   { Date: 1645790400000, Open: 386.61, High: 391.29, Low: 375.58, Close: 390.8, Volume: 4841600 },
//   { Date: 1646049600000, Open: 387.33, High: 397.75, Low: 382.13, Close: 394.52, Volume: 5030600 },
//   { Date: 1646136000000, Open: 391.6, High: 395, Low: 383.71, Close: 386.24, Volume: 3290400 },
//   { Date: 1646222400000, Open: 388.93, High: 389.22, Low: 375.21, Close: 380.03, Volume: 5356800 },
//   { Date: 1646308800000, Open: 386, High: 386.12, Low: 364.65, Close: 368.07, Volume: 6076800 },
//   { Date: 1646395200000, Open: 368, High: 374.82, Low: 357.17, Close: 361.73, Volume: 5325500 },
//   { Date: 1646654400000, Open: 360.41, High: 362, Low: 350.2, Close: 350.26, Volume: 5708400 },
//   { Date: 1646740800000, Open: 349.8, High: 358.86, Low: 340.67, Close: 341.76, Volume: 6428700 },
//   { Date: 1646827200000, Open: 357.69, High: 364.14, Low: 350.51, Close: 358.79, Volume: 6520200 },
//   { Date: 1646913600000, Open: 356.2, High: 367.02, Low: 353.3, Close: 356.77, Volume: 4807800 },
//   { Date: 1647000000000, Open: 361.19, High: 363.36, Low: 340, Close: 340.32, Volume: 4815500 },
//   { Date: 1647259200000, Open: 338.72, High: 341.32, Low: 329.82, Close: 331.01, Volume: 5907800 },
//   { Date: 1647345600000, Open: 335.1, High: 345.36, Low: 332.36, Close: 343.75, Volume: 5460600 },
//   { Date: 1647432000000, Open: 348.2, High: 359.99, Low: 343.06, Close: 357.53, Volume: 6982500 },
//   { Date: 1647518400000, Open: 359.7, High: 373.31, Low: 354.88, Close: 371.4, Volume: 5818300 },
//   { Date: 1647604800000, Open: 372, High: 381.8, Low: 368.47, Close: 380.6, Volume: 8309200 },
//   { Date: 1647864000000, Open: 378.02, High: 381.82, Low: 368.94, Close: 374.59, Volume: 4866500 },
//   { Date: 1647950400000, Open: 371.14, High: 386.66, Low: 366.76, Close: 382.92, Volume: 4242800 },
//   { Date: 1648036800000, Open: 379.77, High: 382.46, Low: 374.49, Close: 374.49, Volume: 3729000 },
//   { Date: 1648123200000, Open: 379.76, High: 379.76, Low: 368.9, Close: 375.71, Volume: 3888500 },
//   { Date: 1648209600000, Open: 377.07, High: 377.64, Low: 366.43, Close: 373.85, Volume: 3574500 },
//   { Date: 1648468800000, Open: 375.23, High: 380.28, Low: 366.73, Close: 378.51, Volume: 4323400 },
//   { Date: 1648555200000, Open: 384.39, High: 396.5, Low: 380.33, Close: 391.82, Volume: 5880700 },
//   { Date: 1648641600000, Open: 389.55, High: 392.7, Low: 378.63, Close: 381.47, Volume: 4023300 }
// ];

// // set data to all series
// valueSeries.data.setAll(data);
// volumeSeries.data.setAll(data);
// sbSeries.data.setAll(data);