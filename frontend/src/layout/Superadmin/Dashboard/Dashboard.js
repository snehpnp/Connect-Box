import React from 'react'
import html2canvas from 'html2canvas';
import Content from "../../../Components/Dashboard/Content/Content"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { All_Panel_List} from '../../../ReduxStore/Slice/Superadmin/SuperAdminSlice'
import { Get_All_Theme } from '../../../ReduxStore/Slice/ThemeSlice';
import {useLocation, useParams} from 'react-router-dom'
   

        

const Dashboard = () => {

  let { id } = useParams();
console.log(id);

  const location = useLocation()
  console.log(location);
          
  const dispatch = useDispatch();
  const [themeList, setThemeList] = useState();
  
  const [AllData, setAllData] = useState({
    loading: true,
    data: []
});


// console.log(AllData.data)

const activeUsersCount = AllData.data.filter(user => user.is_active).length;
const inActiveUserCount = AllData.data.filter(user=> user.is_expired).length;
  
 

const GetAllThemes = async () => {
  await dispatch(Get_All_Theme()).unwrap()
      .then((response) => {
          setThemeList(response && response.data);
      })
}

  const data = async () => {
    await dispatch(All_Panel_List()).unwrap()
        .then((response) => {
          setAllData({
                loading: false,
                data: response.data
            });
        })
}
useEffect(() => {
    data()
    GetAllThemes()
}, [])
 



  return <>
    <div className="content-body" >
      {/* row */}
      <div className="container-fluid">



        {/* --------theme-8-dashboard start--------- */}

        <div className="theme-9-dashboard">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-xxl-3 col-sm-6">
              <div className="card border-0 rounded">
                <div className="card-body">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto text-center">
                      <h6 className=" mb-0">Lifetime earnings</h6>
                      <h2 className="text-uppercase mb-0">74,206</h2>
                      <a href="#" className=""><i className="fa-regular fa-eye pe-1"></i>View</a>
                    </div>
                    <div className="col-auto text-center px-0">
                      <img
                        src="../assets/images/dash_icon/dash-9-icon.png"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------theme-9-dashboard end--------- */}

      

      </div>
    </div>
  </>
}


export default Dashboard