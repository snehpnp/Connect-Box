/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';
import { User_Profile, GET_MESSAGE_BRODS } from "../../../ReduxStore/Slice/Common/commoSlice.js";
import DataTableExtensions from "react-data-table-component-extensions";
import { Get_user_margin, Get_order_data, GetLiveMarketData } from "../../../Service/common.service.js";
import FullDataTable from "../../../Components/ExtraComponents/Datatable/BasicDataTable";

const BrokerResponse = () => {
  const [UserDetails, setUserDetails] = useState([]);
  const [MarginData, setMarginData] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const [livedata, setLiveData] = useState([]);
  const [getSymbolNAme, setSymbolNAme] = useState("");


  const slicedOrderData = OrderData.slice(0, 2);

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;

  const dispatch = useDispatch();

  const Get_margin_data = async () => {
    let Getdata = await Get_user_margin({
      "user_id": user_id
    });
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


  useEffect(() => {
    data();
    Get_margin_data();
    Get_market_data("BankNifty")

  }, [])



  const [activeTab, setActiveTab] = useState('v-pills-home');

  const handleTabClick = (tabId, sym) => {
    setSymbolNAme(sym)
    setActiveTab(tabId);
  };


  const renderTabContent = (tabId) => {
    return (
      <div
        className={`tab-pane fade ${activeTab === tabId ? 'show active' : ''}`}
        id={tabId}
        role="tabpanel"
        aria-labelledby={`${tabId}-tab`}
      >
        <ReactApexChart
          options={data1.options}
          series={data1.series}
          type="candlestick"
          height={400}
        />
      </div>
    );
  };


  useEffect(() => {
    if(activeTab == "v-pills-profile"){
      Get_market_data("Nifty")
    }else{
      Get_market_data("BankNifty")

    }

  }, [activeTab])

  
  return (
    <div className={`content-body ${UserDetails && UserDetails.TradingStatus === "on" ? '' : 'overlay-blur'}`}>
      <div className="container-fluid">
        <h1 className="mb-3">Dashboard</h1>

        <div className="row align-items-end">
          <div className="col-md-5">
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
                            <h4 className="mb-0 text-white">{MarginData.total_cash}</h4>
                            <p className=" mb-0 text-white">Total Margin</p>
                          </li>

                          <li>
                            {" "}
                            <h4 className="mb-0 text-white">{MarginData.available_cash}</h4>
                            <p className=" mb-0 text-white">Avb. Margin</p>
                          </li>
                          <li>
                            <h4 className="mb-0 text-white">{MarginData.cncMarginUsed}</h4>
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

          <div className="col-md-7">
            <div className="bg-white dash-bg">
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
              <div className="d-flex align-items-start">
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
