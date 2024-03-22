import React from 'react'
import { Link } from 'react-router-dom'
// import ExportToExcel from "../../../Utils/ExportCsv";
import { f_time } from '../../../Utils/Date_formet';


const Content = ({ Page_title, button_title, Page_title_showClient, button_status, show_csv_button, show_Stat_End_date, showEdit, csv_title, csv_data, route, ...rest }) => {




  return (
    <div>
      <div className="content-body mt-5"  >
        <div className="container-fluid ">

          <div className="row page-titles mx-1"   >
            <div className='row mb-3'>
              <div className="col-lg-6"></div>
            </div>
            <ol className="breadcrumb mb-3 border p-3" >
              <div className="col-lg-6" >
                <li className="breadcrumb-item" >
                  <h4 className="font-w500 mb-0" >{Page_title}</h4>
                  <h4 className="font-w500 mb-0">{Page_title_showClient}</h4>

                </li>
              </div>

              {button_status == false ? "" : <div className="col-lg-6 ">
                <Link to={route} className='btn btn-primary float-lg-end active' style={{ padding: '10px !important' }} >
                  <i className={`fa-solid  ${button_title === "Back" ? 'fa-arrow-left' : 'fa-plus'} `}></i> {button_title}</Link>
              </div>}


            </ol>

          </div>

          <div className="row">
            <div className="col-xl-12">

              <div className="row">
                <div className="col-xl-12">
                  <div className="card form-card">
                    {showEdit ? <>
                      <div className='p-2 mt-3 ms-auto'>
                        <h6 className="fw-bold">Start Date - {f_time(show_Stat_End_date.StartDate !== undefined && show_Stat_End_date.StartDate)}</h6>
                        <h6 className="fw-bold">End Date - {f_time(show_Stat_End_date.EndDate !== undefined && show_Stat_End_date.EndDate)}</h6>
                      </div>
                    </> : ""}
               
                    <div className="card-body">
                      {/* {show_csv_button ?
                        <ExportToExcel
                          className="btn btn-primary "
                          apiData={csv_data}
                          fileName={csv_title} />
                        : ""} */}
                      <div className="row page-titles mx-1"   >
                       
                        <ol className="breadcrumb mb-3  p-3" >
                          <div className="col-lg-6" >
                            <li className="breadcrumb-item" >
                              <h4 data-aos="zoom-y-out" className="font-w500 mb-0" >{Page_title}</h4>
                              <h4 className="font-w500 mb-0">{Page_title_showClient}</h4>

                            </li>
                          </div>

                          {button_status == false ? "" : <div className="col-lg-6 ">
                            <Link to={route} className='btn btn-primary float-lg-end active' style={{ padding: '10px !important' }} >
                              <i className={`fa-solid  ${button_title === "Back" ? 'fa-arrow-left' : 'fa-plus'} `}></i> {button_title}</Link>
                          </div>}


                        </ol>
                        <h5>Basic Details</h5>
                        <span className="user-img d-flex justify-content-start gap-4 mt-3 mb-3"  >
                            <img
                                src="assets/img/profiles/avatar-07.jpg"
                                alt="img"
                                className="profilesidebar"
                                style={{height:'100px', width:'100px' , borderRadius:'50%'}}
                            />
                            <h5>Upload a New Photo</h5>
                            <button className='btn btn-primary'>Upload</button>
                            <button className='btn btn-danger'>Remove</button>

                             
                        </span>

                      </div>






                      <div className="form-validation">

                        {rest.children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Content