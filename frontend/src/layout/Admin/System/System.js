/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import Content from "../../../Components/Dashboard/Content/Content"
import FullDataTable from '../../../Components/ExtraComponents/Datatable/FullDataTable'
import BasicDataTable from '../../../Components/ExtraComponents/Datatable/BasicDataTable'
import { GET_COMPANY_INFOS } from '../../../ReduxStore/Slice/Admin/AdminSlice'
import Theme_Content from "../../../Components/Dashboard/Content/Theme_Content"
import { Pencil, Trash2 } from 'lucide-react';
import $ from "jquery"


import UpdateCompanyInfo from './UpdateCompanyInfo';
import UpdateImages from './UpdateImages';
import UpdateSmptDetails from './UpdateSmptDetails';

import { useDispatch, useSelector } from "react-redux";

const System = () => {




    const dispatch = useDispatch()
    const [getCompanyName, setCompanyName] = useState({
        loading: true,
        data: []
    });


    //  for Panel Details
    const [PanelDetailsModal, setPanelDetailsModal] = useState(false)

    //  for Show Clients
    const [ShowEmailModal, setShowEmailModal] = useState(false)
    //  for Subadmins
    const [showImgModal, setshowImgModal] = useState(false)


    const CompanyName = async () => {
        await dispatch(GET_COMPANY_INFOS()).unwrap()
            .then((response) => {
                if (response.status) {
                    // console.log("response.status", response.data && response.data[0].favicon)
                    setCompanyName({
                        loading: false,
                        data: response.data
                    });
                    $(".set_Favicon")

                    let favicon = $("link[rel='icon']").length
                        ? $("link[rel='icon']")
                        : $("<link rel='icon' type='image/x-icon' />");
                    favicon.attr('href', response.data && response.data[0].favicon);
                    $('head').append(favicon);
                }
            })
    }
    useEffect(() => {
        CompanyName()
    }, [])

    const Company_columns = [
        {
            dataField: 'index',
            text: 'Company ID',
            formatter: (cell, row, rowIndex) => rowIndex + 1,

        },
        {
            dataField: 'panel_name',
            text: 'Company Name'
        },
        // {
        //     dataField: 'panel_short_name',
        //     text: 'Panel Key'
        // },
        {
            dataField: 'panel_short_name',
            text: 'Company Short Name'
        },
        // {
        //     dataField: 'broker_url',
        //     text: 'Broker Name'
        // },
        // {
        //     dataField: 'prefix',
        //     text: 'Version'
        // },
        {
            dataField: 'Action',
            text: 'Action',
            formatter: (cell, row) => (
                <div>
                    <span data-toggle="tooltip" data-placement="top" title="Edit">
                        <Pencil size={20} color="#198754" strokeWidth={2} className="mx-1" onClick={() => setPanelDetailsModal(true)} />
                    </span>

                </div>
            ),
        },
    ];

    const Email_columns = [
        {
            dataField: 'id',
            text: 'Email ID',
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: 'cc_mail',
            text: 'CC'
        },
        {
            dataField: 'bcc_mail',
            text: 'BCC'
        },
        {
            dataField: 'smtp_password',
            text: 'Password'
        },
        {
            dataField: 'smtphost',
            text: 'SMTP Host'
        },
        {
            dataField: 'smtpport',
            text: 'SMTP Port'
        },
        {
            dataField: 'Action',
            text: 'Action',
            formatter: (cell, row) => (
                <div>
                    <span data-toggle="tooltip" data-placement="top" title="Edit">
                        <Pencil size={20} color="#198754" strokeWidth={2} className="mx-1" onClick={() => setShowEmailModal(true)} />
                    </span>

                </div>
            ),
        },
    ];


    const background_images = [
        {
            dataField: 'id',
            text: 'ID',
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },

        {
            dataField: 'favicon',
            text: 'Favicon',
            formatter: (cell, row, rowIndex) => (
                <img src={cell} alt="Favicon" className="logo-abbr w-50" style={{objectFit:'contain'}} />
            ),
        },
        {
            dataField: 'logo',
            text: 'Logo',
            formatter: (cell, row, rowIndex) => (
                <img src={cell} alt="Logo" className="logo-abbr w-50" style={{objectFit:'contain'}}  />
            ),
        },
        {
            dataField: 'loginimage',
            text: 'Login Image',
            formatter: (cell, row, rowIndex) => (
                <img src={cell} alt="Login Image" className="logo-abbr w-50" style={{objectFit:'contain'}}  />
            ),
        },
        {
            dataField: 'watermark',
            text: 'Water Mark',
            formatter: (cell, row, rowIndex) => (
                <img src={cell} alt="Water Mark" className="logo-abbr w-50" style={{objectFit:'contain'}}  />
            ),
        },

        {
            dataField: 'Action',
            text: 'Action',
            formatter: (cell, row) => (
                <div>
                    <span data-toggle="tooltip" data-placement="top" title="Edit">
                        <Pencil size={20} color="#198754" strokeWidth={2} className="mx-1" onClick={() => setshowImgModal(true)} />
                    </span>

                </div>
            ),
        },
    ];
    return <>
        <Content Page_title="System" button_status={false}>
          <div className="row">
          <div className="col-md-12">
            <div className="bg-white dash-bg clip-tabs pt-0">
          
              <ul
                className="nav nav-tabs justify-content-center border-0 mb-5 mb-md-0 "
                role="tablist"
              > 
                  
               

                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#home"
                  >
                    Company Information
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#menu1">
                   Email Information
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#menu2">
                  Background Images
                  </a>
                </li>
                
              </ul>
              {/* Tab panes */}
              <div className="tab-content">
                
                 


                <div id="home" className="container tab-pane active mt-0">
                 
                <h5>Company Information</h5>
            <BasicDataTable tableData={getCompanyName.data} TableColumns={Company_columns} dropdown={false} />
                  
                </div>


                <div id="menu1" className="container tab-pane fade mt-0">
                <h5>Email Information</h5>
            <BasicDataTable tableData={getCompanyName.data} TableColumns={Email_columns} dropdown={false} />
                
       

                </div>
                <div id="menu2" className="container tab-pane fade mt-0">
                <h5>Background Images</h5>
                <BasicDataTable tableData={getCompanyName.data} TableColumns={background_images} dropdown={false} />


<UpdateCompanyInfo data={getCompanyName && getCompanyName.data} showModal={PanelDetailsModal} setshowModal={() => setPanelDetailsModal(false)} />
<UpdateSmptDetails data={getCompanyName && getCompanyName.data} showModal={ShowEmailModal} setshowModal={() => setShowEmailModal(false)} />
<UpdateImages data={getCompanyName && getCompanyName.data} showModal={showImgModal} setshowModal={() => setshowImgModal(false)} />                
       

                </div>
              </div>
            </div>
          </div>
          </div>

           

        </Content>
    </>
}


export default System

