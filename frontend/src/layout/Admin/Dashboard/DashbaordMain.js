/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import { useDispatch } from "react-redux";
import { Get_Dashboard_Count } from "../../../ReduxStore/Slice/Admin/DashboardSlice";
import { Link } from 'react-router-dom'
import Content from "../../../Components/Dashboard/Content/Content"

const Dashboard = () => {
  const dispatch = useDispatch();
  const user_token = JSON.parse(localStorage.getItem("user_details")).token;

  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_ID = JSON.parse(localStorage.getItem("user_details")).user_id;



  const [DashboardData, setDashboardData] = useState("");
  const [DashboardData1, setDashboardData1] = useState([]);

  const [getAllClients, setAllClients] = useState({
    loading: true,
    data: [],
  });



  const getGroupeServics = async () => {
    await dispatch(Get_Dashboard_Count(user_token))
      .unwrap()
      .then((response) => {
        if (response.status) {
          if (response.totalCount) {
            setDashboardData(response.totalCount);
          }
        }
      });
  };
  useEffect(() => {
    getGroupeServics();
  }, []);



  let arr = [
    {
      index: 1,
      name: "Total  Client",
      value: DashboardData && DashboardData.total_client,
      icon: 'la la-users',
      route: "/admin/allclients",
      visible: false
    },
    {
      index: 2,
      name: "Total Active Client",
      value: DashboardData && DashboardData.total_active_client,
      icon: 'la la-users',
      route: '/admin/allclients?filter=111',
      visible: true

    },
    {
      index: 3,
      name: "Total Expired Client",
      value: DashboardData && DashboardData.total_expired_client,
      icon: 'la la-users',
      route: "/admin/expiredclients?filter=000",
      visible: true
    },
    {
      index: 4,
      name: "Total Live Client",
      value: DashboardData && DashboardData.total_live_client,
      icon: 'la la-users',
      route: "/admin/allclients?filter=2",
      visible: true
    },
    {
      index: 5,
      name: "Active Live Client",
      value: DashboardData && DashboardData.total_active_live,
      icon: 'la la-users',
      route: "/admin/allclients?filter=21",
      visible: true
    },
    {
      index: 6,
      name: "Expired Live Client",
      value: DashboardData && DashboardData.total_expired_live,
      icon: 'la la-users',
      route: "/admin/allclients?filter=20",
      visible: true
    },
    {
      index: 7,
      name: "Total Demo Client",
      value: DashboardData && DashboardData.total_demo_client,
      icon: 'la la-users',
      route: "/admin/allclients?filter=1",
      visible: true
    },
    {
      index: 8,
      name: "Active Demo Client",
      value: DashboardData && DashboardData.total_active_demo,
      icon: 'la la-users',
      route: "/admin/allclients?filter=11",
      visible: true
    },
    {
      index: 9,
      name: "Expired Demo Client",
      value: DashboardData && DashboardData.total_expired_demo,
      icon: 'la la-users',
      route: "/admin/allclients??filter=10",
      visible: true

    },
    {
      index: 10,
      name: "Total 2 Days Client",
      value: DashboardData && DashboardData.total_two_days,
      icon: 'la la-users',
      route: "/admin/allclients?filter=0",
      visible: true

    },
    {
      index: 11,
      name: "Active 2 Days Client",
      value: DashboardData && DashboardData.total_active_two_days,
      icon: 'la la-users',
      route: "/admin/allclients?filter=01",
      visible: true

    },
    {
      index: 12,
      name: "Expired 2 Days Client",
      value: DashboardData && DashboardData.total_expired_two_days,
      icon: 'la la-users',
      route: "/admin/allclients?filter=00",
      visible: true

    },
    {
      index: 13,
      name: "Total License",
      value: DashboardData && DashboardData.all_licence,
      icon: 'la la-users',
      route: "/admin/allLicence?filter=0",
      visible: true
    }, {
      index: 14,
      name: "Remaining  License",
      value: DashboardData && DashboardData.remaining_licence,
      icon: 'la la-users',
      route: "/admin/allLicence",
      visible: false
    }, {
      index: 15,
      name: "Used  License",
      value: DashboardData && DashboardData.used_licence,
      icon: 'la la-users',
      route: "/admin/allLicence?filter=1",
      visible: true
    },

  ]






  return (
    <>
        <Content Page_title="Dashboard" button_status={false}>
            <div className="row">
              {arr.map((item, index) => {
                return <>
                  <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-6" key={index}>
                    <div className="card fourth-dashboard-card" >
                      <div className="card-body">
                        <div className="row justify-content-center align-items-center">
                          <div className="col-auto text-center">
                            <div>
                              <h4 className='mb-0 my-2'>{item.name}</h4>
                              {/* {item.visible ? <>

                          <Link href="#" className="mb-2" to={item.route}>
                            <i className="fa-regular fa-eye pe-1 my-1" ></i>View</Link>
                        </> : ""} */}

                            </div>

                            <h2 className="text-uppercase mb-0 my-1">{item.value}</h2>

                          </div>
                          <div className="col-auto text-center">
                            <img src='../assets/images/dash_icon/wave-sound.png' className='w-25' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              })}
            </div>

        
        <ToastButton />
      </Content>
    </>
  );
};

export default Dashboard;

