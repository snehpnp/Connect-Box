import React, { useState, useEffect } from "react";
import { Dashboard_admin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import Footer from "../../../Components/Dashboard/Footer/Footer";

const Overview = () => {
  const [options, setOptions] = useState({
    chart: {
      type: 'donut',
      id: "basic",
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }
      ],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230
      }
    },
    xaxis: {
      categories: []
    },
    fill: {
      colors: ['#9423FF']
    }
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: []
    }
  ]);

  const [colors] = useState(["#9423FF"]);
  const [adminData, setAdminData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const percentages = {
    percentage: calculatePercentage(adminData.Totalcount),
    percentage1: calculatePercentage(adminData.TotalActivecount),
    percentage3: calculatePercentage(adminData.TotalInActivecount),
    percentage4: calculatePercentage(adminData.TotalUsercount),
    percentage5: calculatePercentage(adminData.TotalActiveUsercount),
    percentage6: calculatePercentage(adminData.TotalInActiveUsercount)
  };

  const {
    percentage,
    percentage1,
    percentage3,
    percentage4,
    percentage5,
    percentage6
  } = percentages;

  useEffect(() => {
    dashData();
  }, [dispatch, navigate]);

  const calculatePercentage = (count) =>
    count !== undefined && count !== null ? (count / adminData.Totalcount) * 100 : null;

  const dashData = async () => {
    await dispatch(Dashboard_admin())
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setAdminData(response.data);

          const categories = response.data.dummyData.categories;
          const data = response.data.dummyData.data;

          setOptions(prevOptions => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: categories
            }
          }));

          setSeries([{ name: "series-1", data: data }]);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const cardsData = [
    // Card data objects
  ];

  return (
    <div className="main-wrapper">
      {/* Dashboard content */}
    </div>
  );
};

export default Overview;
