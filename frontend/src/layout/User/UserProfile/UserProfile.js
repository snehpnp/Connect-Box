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
    <div className={`content-body ${UserDetails && UserDetails.TradingStatus === "on" ? '' : 'overlay-blur'}`}>
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
