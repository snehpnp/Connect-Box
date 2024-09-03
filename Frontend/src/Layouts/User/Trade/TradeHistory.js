import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullDataTable from "../../../Components/ExtraComponents/Tables/DataTable";

import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { useNavigate } from "react-router-dom";
import { Userinfo } from "../../../ReduxStore/Slice/Comman/Userinfo";
import { User_Tradehistory_data } from "../../../ReduxStore/Slice/Comman/Trades";
import { ipAddress } from "../../../Utils/Ipaddress";
import $ from "jquery";
import { fDateTimeSuffix } from "../../../Utils/Date_formet";
import {
  CreateSocketSession,
  ConnctSocket,
  GetAccessToken,
} from "../../../Utils/Alice_Socket";
import { ShowColor1 } from "../../../Utils/ShowTradeColor";
import { Eye } from "lucide-react";

import { allStrategy_subAd } from "../../../ReduxStore/Slice/Admin/Subadmins";

import { Get_All_Strategy } from "../../../ReduxStore/Slice/Users/ClientServiceSlice";

import DetailsView from "../../SubAdmin/Trade/DetailsView";

import { GetBrokerLiveDatas } from "../../../ReduxStore/Slice/Comman/Makecall/make";

export default function AllEmployees() {
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const token = JSON.parse(localStorage.getItem("user_details")).token;

  const [showModal, setshowModal] = useState(false);

  const [SelectService, setSelectService] = useState("null");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const [rowData, setRowData] = useState({ loading: true, data: [] });

  const [profileData, setProfileData] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [ForGetCSV, setForGetCSV] = useState([]);
  const [ip, setIp] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [StrategyClientStatus, setStrategyClientStatus] = useState("null");
  const [tradeHistoryData, setTradeHistoryData] = useState({
    loading: false,
    data: [],
  });
  const [SocketState, setSocketState] = useState("null");

  const [tableData, setTableData] = useState({
    loading: false,
    data: [],
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    card: {
      width: "auto",
    },
    boldHeader: {
      fontWeight: "bold",
    },
    headerButton: {
      marginRight: 8,
    },
  };
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const [inputSearch, SetInputSearch] = useState("");
  const [getLoginStatus, setLoginStatus] = useState({
    loading: false,
    data: [],
  });

  const [UserDetails, seUserDetails] = useState("");
  const [livePriceDataDetails, setLivePriceDataDetails] = useState("");
  const [userIdSocketRun, setUserIdSocketRun] = useState("none");
  const [GetAllStrategy, setAllStrategy] = useState([]);




  const fetchData = async () => {
    try {
      let data = { id: user_id };

      await dispatch(Userinfo(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            setProfileData({
              loading: true,
              data: response.data,
            });
            if (response.data[0].TradingStatus == "on") {
              setLoginStatus(true);
              setrefresh(!refresh);
            } else {
              setLoginStatus(false);
              setrefresh(!refresh);
            }
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } catch (error) { }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const GetBrokerLiveData = async (userIdSocketRun) => {
    await dispatch(
      GetBrokerLiveDatas({
        req: {
          id: user_id,
          exist_user: userIdSocketRun,
          exist_user_details: livePriceDataDetails,
        },

        token: token,
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setLivePriceDataDetails(response.data);
        }
      });
  };

  useEffect(() => {
    GetBrokerLiveData(userIdSocketRun);
  }, [userIdSocketRun]);

  const columns = [
    {
      dataField: "index",
      text: "S.No.",
      // hidden: true,
      formatter: (cell, row, rowIndex) => rowIndex + 1,
    },
    {
      dataField: "createdAt",
      text: "Signals Entry Time",
      formatter: (cell) => <>{fDateTimeSuffix(cell)}</>,
    },
    {
      dataField: "live",
      text: "Live Price",
      formatter: (cell, row, rowIndex) => (
        <div>
          <span className={`LivePrice_${row.token}`}></span>
        </div>
      ),
    },
    // {
    //   dataField: "closeprice",
    //   text: "Previous Price",
    //   formatter: (cell, row, rowIndex) => (
    //     <div>
    //       <span className={`ClosePrice_${row.token}`}></span>
    //     </div>
    //   ),
    // },

    {
      dataField: "trade_symbol",
      text: "Symbol",
    },
    {
      dataField: "strategy",
      text: "Strategy",
    },
    {
      dataField: "2",
      text: "Entry Type",
      formatter: (cell, row, rowIndex) => (
        <div>
          <span>{row.entry_type === "LE" ? "BUY ENTRY" : "SELL ENTRY"}</span>
        </div>
      ),
    },
    {
      dataField: "entry_qty",
      text: "Entry Qty",
      formatter: (cell, row, rowIndex) => (
        <span className="text">{cell !== "" ? parseInt(cell) : "-"}</span>
      ),
    },
    {
      dataField: "exit_qty",
      text: "Exit Qty",
      formatter: (cell, row, rowIndex) => (
        <span className="text">{cell !== "" ? parseInt(cell) : "-"}</span>
      ),
    },
    {
      dataField: "entry_price",
      text: "Entry Price",
      formatter: (cell, row, rowIndex) => (
        <div>{cell !== "" ? parseFloat(cell).toFixed(2) : "-"}</div>
      ),
    },
    {
      dataField: "exit_price",
      text: "Exit Price",
      formatter: (cell, row, rowIndex) => (
        <div>{cell !== "" ? parseFloat(cell).toFixed(2) : "-"}</div>
      ),
    },

    {
      dataField: "Action",
      text: "Realised",
      formatter: (cell, row, rowIndex) => {
        return (
          <div>
            <span className={`fw-bold show_rpl_${row.token}_${row._id}`}></span>
            <span className={`d-none entry_qty_${row.token}_${row._id}`}>
              {row.entry_qty_percent}
            </span>
            <span className={`d-none exit_qty_${row.token}_${row._id}`}>
              {row.exit_qty_percent}
            </span>
            <span className={`d-none exit_price_${row.token}_${row._id}`}>
              {row.exit_price}
            </span>
            <span className={`d-none entry_price_${row.token}_${row._id}`}>
              {row.entry_price}
            </span>
            <span className={`d-none entry_type_${row.token}_${row._id}`}>
              {row.entry_type}
            </span>
            <span className={`d-none exit_type_${row.token}_${row._id}`}>
              {row.exit_type}
            </span>
            <span className={`d-none strategy_${row.token}_${row._id}`}>
              {row.strategy}
            </span>
            <span className={`d-none _id_${row.token}_${row._id}`}>
              {row._id}
            </span>
          </div>
        );
      },
    },

    {
      dataField: "UPL",
      text: "Un-Realised",
      formatter: (cell, row, rowIndex) => (
        <div>
          <span className={`fw-bold UPL_${row.token}_${row._id}`}></span>
        </div>
      ),
    },

    {
      dataField: "TPL",
      text: "Total",
      formatter: (cell, row, rowIndex) => (
        <div>
          <span className={`fw-bold  TPL_${row.token}_${row._id}`}></span>
        </div>
      ),
    },
    {
      dataField: "",
      text: "Entry Status",
      formatter: (cell, row, rowIndex) => (
        <div>
          <span>
            {row.result[0].exit_status === "above"
              ? "ABOVE"
              : row.result[0].exit_status === "below"
                ? "BELOW"
                : row.result[0].exit_status == "range"
                  ? "RANGE"
                  : " - "}
          </span>
        </div>
      ),
    },
    {
      dataField: "exit_status",
      text: "Exit Status",
      formatter: (cell, row, rowIndex) => (
        <div>
          <span>{row.exit_status}</span>
        </div>
      ),
    },

    {
      dataField: "",
      text: "Details View",
      formatter: (cell, row, rowIndex) => (
        <div>
          <Eye
            className="mx-2"
            onClick={() => {
              setRowData(row);
              setshowModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const RefreshHandle = () => {
    setrefresh(!refresh);
    setSearchInput("");
  };

  const getActualDateFormate = (date) => {
    const dateParts = date.split("-");
    const formattedDate = `${dateParts[0]}/${parseInt(
      dateParts[1],
      10
    )}/${parseInt(dateParts[2], 10)}`;
    return formattedDate;
  };

  const userDataRes = async () => {
    let abc = new Date();
    let month = abc.getMonth() + 1;
    let date = abc.getDate();
    let year = abc.getFullYear();
    let full = `${year}/${month}/${date}`;

    const startDate = fromDate ? getActualDateFormate(fromDate) : full;
    const endDate = toDate ? getActualDateFormate(toDate) : full;

    const subadminId = userDetails.user_id;
    await dispatch(
      User_Tradehistory_data({
        Role: Role,
        subadminId: userDetails.user_id,
        startDate: startDate,
        endDate: endDate,
        service: SelectService,
        strategy: strategies,
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setTableData({ loading: true, data: response.data });
          setTradeHistoryData({ loading: true, data: response.data });
        } else {
          setTradeHistoryData({ loading: true, data: [] });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    userDataRes();
  }, [refresh, fromDate, toDate, strategies, SelectService]);

  var CreatechannelList = "";
  tradeHistoryData.data &&
    tradeHistoryData.data?.map((item) => {
      CreatechannelList += `${item.exchange}|${item.token}#`;
    });

  //  SHOW lIVE PRICE
  const ShowLivePrice = async () => {
    let type = { loginType: "API" };
    let channelList = CreatechannelList;

    if (
      livePriceDataDetails &&
      livePriceDataDetails.demate_user_id !== undefined &&
      livePriceDataDetails.access_token !== undefined &&
      livePriceDataDetails.trading_status == "on"
    ) {
      const res = await CreateSocketSession(
        type,
        livePriceDataDetails.demate_user_id,
        livePriceDataDetails.access_token
      );

      if (res.status === 200) {
        setSocketState("Ok");
      }
      if (res.status === 401 || res.status === "401") {
        setSocketState("Unauthorized");

        tradeHistoryData.data &&
          tradeHistoryData.data.forEach((row, i) => {
            const previousRow = i > 0 ? tradeHistoryData.data[i - 1] : null;
            calcultateRPL(row, null, previousRow);
          });
      } else {
        if (res.data.stat) {
          const handleResponse = async (response) => {
            $(".BP1_Put_Price_" + response.tk).html();
            $(".SP1_Call_Price_" + response.tk).html();

            // UPL_
            $(".LivePrice_" + response.tk).html(response.lp);
            $(".ClosePrice_" + response.tk).html(response.c);

            var live_price = response.lp === undefined ? "" : response.lp;

            //  if entry qty and exist qty both exist
            tradeHistoryData.data &&
              tradeHistoryData.data.forEach((row, i) => {
                let get_ids = "_id_" + response.tk + "_" + row._id;
                let get_id_token = $("." + get_ids).html();

                const get_entry_qty = $(
                  ".entry_qty_" + response.tk + "_" + row._id
                ).html();
                const get_exit_qty = $(
                  ".exit_qty_" + response.tk + "_" + row._id
                ).html();
                const get_exit_price = $(
                  ".exit_price_" + response.tk + "_" + row._id
                ).html();
                const get_entry_price = $(
                  ".entry_price_" + response.tk + "_" + row._id
                ).html();
                const get_entry_type = $(
                  ".entry_type_" + response.tk + "_" + row._id
                ).html();
                const get_exit_type = $(
                  ".exit_type_" + response.tk + "_" + row._id
                ).html();
                const get_Strategy = $(
                  ".strategy_" + response.tk + "_" + row._id
                ).html();

                if (
                  (get_entry_type === "LE" && get_exit_type === "LX") ||
                  (get_entry_type === "SE" && get_exit_type === "SX")
                ) {
                  if (get_entry_qty !== "" && get_exit_qty !== "") {
                    if (parseInt(get_entry_qty) >= parseInt(get_exit_qty)) {
                      let rpl =
                        (parseFloat(get_exit_price) -
                          parseFloat(get_entry_price)) *
                        parseInt(get_exit_qty);

                      if (get_entry_type === "SE") {
                        rpl =
                          (parseFloat(get_entry_price) -
                            parseFloat(get_exit_price)) *
                          parseInt(get_exit_qty);
                      }

                      let upl =
                        parseInt(get_exit_qty) - parseInt(get_entry_qty);
                      let finalyupl =
                        (parseFloat(get_entry_price) - parseFloat(live_price)) *
                        upl;

                      if (isNaN(finalyupl) || isNaN(rpl)) {
                        return "-";
                      } else {
                        $(".show_rpl_" + response.tk + "_" + get_id_token).html(
                          rpl.toFixed(2)
                        );
                        $(".UPL_" + response.tk + "_" + get_id_token).html(
                          finalyupl.toFixed(2)
                        );
                        $(".TPL_" + response.tk + "_" + get_id_token).html(
                          (finalyupl + rpl).toFixed(2)
                        );

                        ShowColor1(
                          ".show_rpl_" + response.tk + "_" + get_id_token,
                          rpl.toFixed(2),
                          response.tk,
                          get_id_token
                        );
                        ShowColor1(
                          ".UPL_" + response.tk + "_" + get_id_token,
                          finalyupl.toFixed(2),
                          response.tk,
                          get_id_token
                        );
                        ShowColor1(
                          ".TPL_" + response.tk + "_" + get_id_token,
                          (finalyupl + rpl).toFixed(2),
                          response.tk,
                          get_id_token
                        );
                      }
                    }
                  }
                }
                //  if Only entry qty Exist
                else if (
                  (get_entry_type === "LE" && get_exit_type === "") ||
                  (get_entry_type === "SE" && get_exit_type === "")
                ) {
                  let abc = (
                    (parseFloat(live_price) - parseFloat(get_entry_price)) *
                    parseInt(get_entry_qty)
                  ).toFixed();

                  if (get_entry_type === "SE") {
                    abc = (
                      (parseFloat(get_entry_price) - parseFloat(live_price)) *
                      parseInt(get_entry_qty)
                    ).toFixed();
                  }

                  if (
                    get_entry_qty !== "" &&
                    (get_exit_qty == "" || get_exit_qty == 0)
                  ) {
                    if (isNaN(abc)) {
                      return "-";
                    } else {
                      $(".UPL_" + response.tk + "_" + get_id_token).html(abc);
                      $(".TPL_" + response.tk + "_" + get_id_token).html(abc);
                      ShowColor1(
                        ".UPL_" + response.tk + "_" + get_id_token,
                        abc,
                        response.tk,
                        get_id_token
                      );
                      ShowColor1(
                        ".TPL_" + response.tk + "_" + get_id_token,
                        abc,
                        response.tk,
                        get_id_token
                      );
                    }
                  } else {
                    if (isNaN(abc)) {
                      return "-";
                    } else {
                      $(".show_rpl_" + response.tk + "_" + get_id_token).html(
                        "-"
                      );
                      $(".TPL_" + response.tk + "_" + get_id_token).html(abc);
                      ShowColor1(
                        ".show_rpl_" + response.tk + "_" + get_id_token,
                        "-",
                        response.tk,
                        get_id_token
                      );
                      ShowColor1(
                        ".TPL_" + response.tk + "_" + get_id_token,
                        abc,
                        response.tk,
                        get_id_token
                      );
                    }
                  }
                }

                //  if Only Exist qty Exist
                else if (
                  (get_entry_type === "" && get_exit_type === "LX") ||
                  (get_entry_type === "" && get_exit_type === "SX")
                ) {
                } else {
                }
              });

            // }
          };
          await ConnctSocket(
            handleResponse,
            channelList,
            livePriceDataDetails.demate_user_id,
            livePriceDataDetails.access_token
          ).then((res) => { });
        } else {
          // $(".UPL_").html("-");
          // $(".show_rpl_").html("-");
          // $(".TPL_").html("-");
        }
      }
    } else {
      // alert("ELSE")
      tradeHistoryData.data &&
        tradeHistoryData.data.forEach((row, i) => {
          let get_ids = "_id_" + row.token + "_" + row._id;
          let get_id_token = $("." + get_ids).html();

          const get_entry_qty = $(
            ".entry_qty_" + row.token + "_" + row._id
          ).html();
          const get_exit_qty = $(
            ".exit_qty_" + row.token + "_" + row._id
          ).html();
          const get_exit_price = $(
            ".exit_price_" + row.token + "_" + row._id
          ).html();
          const get_entry_price = $(
            ".entry_price_" + row.token + "_" + row._id
          ).html();
          const get_entry_type = $(
            ".entry_type_" + row.token + "_" + row._id
          ).html();
          const get_exit_type = $(
            ".exit_type_" + row.token + "_" + row._id
          ).html();
          const get_Strategy = $(
            ".strategy_" + row.token + "_" + row._id
          ).html();

          if (
            (get_entry_type === "LE" && get_exit_type === "LX") ||
            (get_entry_type === "SE" && get_exit_type === "SX")
          ) {
            if (get_entry_qty !== "" && get_exit_qty !== "") {
              if (parseInt(get_entry_qty) == parseInt(get_exit_qty)) {
                let rpl =
                  (parseFloat(get_exit_price) - parseFloat(get_entry_price)) *
                  parseInt(get_exit_qty);
                if (get_entry_type === "SE") {
                  rpl =
                    (parseFloat(get_entry_price) - parseFloat(get_exit_price)) *
                    parseInt(get_exit_qty);
                }

                let upl = parseInt(get_exit_qty) - parseInt(get_entry_qty);
                let finalyupl =
                  (parseFloat(get_entry_price) - parseFloat(get_exit_price)) *
                  upl;

                if (isNaN(finalyupl) || isNaN(rpl)) {
                  return "-";
                } else {
                  $(".show_rpl_" + row.token + "_" + get_id_token).html(
                    rpl.toFixed(2)
                  );
                  $(".UPL_" + row.token + "_" + get_id_token).html(
                    finalyupl.toFixed(2)
                  );
                  $(".TPL_" + row.token + "_" + get_id_token).html(
                    (finalyupl + rpl).toFixed(2)
                  );

                  ShowColor1(
                    ".show_rpl_" + row.token + "_" + get_id_token,
                    rpl.toFixed(2),
                    row.token,
                    get_id_token
                  );
                  ShowColor1(
                    ".UPL_" + row.token + "_" + get_id_token,
                    finalyupl.toFixed(2),
                    row.token,
                    get_id_token
                  );
                  ShowColor1(
                    ".TPL_" + row.token + "_" + get_id_token,
                    (finalyupl + rpl).toFixed(2),
                    row.token,
                    get_id_token
                  );
                }
              }
            }
          }
          //  if Only entry qty Exist
          else if (
            (get_entry_type === "LE" && get_exit_type === "") ||
            (get_entry_type === "SE" && get_exit_type === "")
          ) {
            let abc = (
              (parseFloat(get_exit_price) - parseFloat(get_entry_price)) *
              parseInt(get_entry_qty)
            ).toFixed();

            if (get_entry_type === "SE") {
              abc = (
                (parseFloat(get_entry_price) - parseFloat(get_exit_price)) *
                parseInt(get_entry_qty)
              ).toFixed();
            }

            if (isNaN(abc)) {
              return "-";
            } else {
              $(".show_rpl_" + row.token + "_" + get_id_token).html("-");
              $(".UPL_" + row.token + "_" + get_id_token).html(abc);
              $(".TPL_" + row.token + "_" + get_id_token).html(abc);
              ShowColor1(
                ".show_rpl_" + row.token + "_" + get_id_token,
                "-",
                row.token,
                get_id_token
              );
              ShowColor1(
                ".UPL_" + row.token + "_" + get_id_token,
                abc,
                row.token,
                get_id_token
              );
              ShowColor1(
                ".TPL_" + row.token + "_" + get_id_token,
                abc,
                row.token,
                get_id_token
              );
            }
          }

          //  if Only Exist qty Exist
          else if (
            (get_entry_type === "" && get_exit_type === "LX") ||
            (get_entry_type === "" && get_exit_type === "SX")
          ) {
          } else {
          }
        });
    }
  };

  const calcultateRPL = (row, livePrice, pre_row) => {
    let get_ids = "_id_" + row.token + "_" + row._id;
    let get_id_token = $("." + get_ids).html();

    if (row.entry_type !== "" && row.exit_type !== "") {
      if (row.entry_type === "LE" || row.entry_type === "SE") {
        const entryQty = parseInt(row.entry_qty_percent);
        const exitQty = parseInt(row.exit_qty_percent);
        const entryPrice = parseFloat(row.entry_price);
        const exitPrice = parseFloat(row.exit_price);
        const rpl = (exitPrice - entryPrice) * Math.min(entryQty, exitQty);

        $(".show_rpl_" + row.token + "_" + get_id_token).html(rpl.toFixed(2));
        $(".UPL_" + row.token + "_" + get_id_token).html("-");
        $(".TPL_" + row.token + "_" + get_id_token).html(rpl.toFixed(2));

        ShowColor1(
          ".show_rpl_" + row.token + "_" + get_id_token,
          rpl.toFixed(2),
          row.token,
          get_id_token
        );
        ShowColor1(
          ".UPL_" + row.token + "_" + get_id_token,
          "-",
          row.token,
          get_id_token
        );
        ShowColor1(
          ".TPL_" + row.token + "_" + get_id_token,
          rpl.toFixed(2),
          row.token,
          get_id_token
        );
      }
    } else if (row.entry_type && row.exit_type === "") {
      $(".show_rpl_" + row.token + "_" + row._id).html("-");
      $(".UPL_" + row.token + "_" + row._id).html("-");
      $(".TPL_" + row.token + "_" + row._id).html("-");
    }
    if (row.entry_type === "" && row.exit_type !== "") {
      $(".show_rpl_" + row.token + "_" + row._id).html("-");
      $(".UPL_" + row.token + "_" + row._id).html("-");
      $(".TPL_" + row.token + "_" + row._id).html("-");
    }
  };

  useEffect(() => {
    ShowLivePrice();
  }, [tradeHistoryData.data, SocketState, livePriceDataDetails]);

  // FIND IP ADDRESS
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ip = await ipAddress();
        setIp(ip);
      } catch (error) {
        console.error("Failed to fetch IP address:", error);
      }
    };

    fetchIP();

    // Clean up function
    return () => { };
  }, []);

  let total = 0;
  tradeHistoryData.data &&
    tradeHistoryData.data?.map((item) => {
      CreatechannelList += `${item.exchange}|${item.token}#`;

      if (
        parseInt(item.exit_qty) == parseInt(item.entry_qty) &&
        item.entry_price != "" &&
        item.exit_price
      ) {
        if (item.entry_type === "LE") {
          let total1 =
            (parseFloat(item.exit_price) - parseFloat(item.entry_price)) *
            parseInt(item.exit_qty_percent);
          if (!isNaN(total1)) {
            total += total1;
          }
        } else {
          let total1 =
            (parseFloat(item.entry_price) - parseFloat(item.exit_price)) *
            parseInt(item.exit_qty_percent);
          if (!isNaN(total1)) {
            total += total1;
          }
        }
      }
    });

  const fetchStrategies = async () => {
    const data = { id: user_id };
    try {
      await dispatch(allStrategy_subAd(data))
        .unwrap()
        .then((response) => {
          if (response.status) {
            setStrategies(response.data);
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.error("Error in API response:", error);
          toast.error("Failed to fetch strategies");
        });
    } catch (error) {
      console.error("Error in dispatching action:", error);
      toast.error("Failed to dispatch action for fetching strategies");
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);



  const Get_AllStrategy = async () => {
    const data = { id: user_id };
    await dispatch(Get_All_Strategy(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          
          setAllStrategy({
            loading: false,
            data: response.data,
          });
        } else {
          setAllStrategy({
            loading: false,
            data: response.data,
          });
        }
      });
  };



  useEffect(() => {
    Get_AllStrategy();
  }, []);

  return (
    <>
      {tradeHistoryData.loading ? (
        <>
          <div className="content container-fluid" data-aos="fade-left">
            <div className="card">
              <div className="card-header">
                <div className="row align-center">
                  <div className="col">
                    <h5 className="card-title mb-0">
                      <i className="pe-2 far fa-clock"></i>Trade Hisatory
                    </h5>
                  </div>
                  <div className="col-auto">
                    <div className="list-btn">
                      <ul className="filter-list mb-0">
                        <li className="">
                          <p
                            className=" mb-0 btn-filters"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Refresh"
                            onClick={RefreshHandle}
                          >
                            <span>
                              <i className="fe fe-refresh-ccw" />
                            </span>
                          </p>
                        </li>
                        <li className="serach-li">
                          <div className="input-group input-block">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              aria-label="Search"
                              aria-describedby="search-addon"
                              onChange={(e) =>
                                SetInputSearch(e.target.value || "")
                              }
                              value={inputSearch}
                            />
                          </div>
                        </li>
                        <li className="serach-li">
                          <div className="input-group input-block">
                            <select
                              className="default-select wide form-control"
                              aria-label="Default select example"
                              id="select"
                              onChange={(e) => setStrategies(e.target.value)}
                              value={strategies}
                            >
                              <option value="null">All</option>
                              {GetAllStrategy.data &&
                                GetAllStrategy.data.map((item) => (
                                  <option key={item.strategy_name} value={item.strategy_name}>
                                    {item.strategy_name}
                                  </option>
                                ))}
                            </select>
                          </div>

                        </li>
                        <li>
                          <ExportToExcel
                            className="btn btn-primary "
                            apiData={ForGetCSV}
                            fileName={"All Strategy"}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">

                <div className="card-body table-responsive">
                  {tradeHistoryData.data.length > 0 ? (
                    total >= 0 ? (
                      <h4>
                        Total Realised P/L :{" "}
                        <span style={{ color: "green" }}>
                          {" "}
                          {total.toFixed(2)}
                        </span>{" "}
                      </h4>
                    ) : (
                      <h4>
                        Total Realised P/L :{" "}
                        <span style={{ color: "red" }}>
                          {" "}
                          {total.toFixed(2)}
                        </span>{" "}
                      </h4>
                    )
                  ) : (
                    ""
                  )}
                  <FullDataTable
                    TableColumns={columns}
                    tableData={tradeHistoryData.data}
                    pagination1={true}
                  />
                  <DetailsView
                    showModal={showModal}
                    setshowModal={() => setshowModal(false)}
                    tradeHistoryData={rowData}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
