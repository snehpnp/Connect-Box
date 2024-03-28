import React, { useState } from 'react'
import EditForm from "../../../Components/ExtraComponents/forms/EditForm"
import { useFormik } from 'formik';
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast'

import Content from '../../../Components/Dashboard/Content/Content';




const EditClient = () => {
  const [first, setfirst] = useState([])
  const [GetBrokerInfo, setGetBrokerInfo] = useState([]);
  const [GetServices, setGetServices] = useState({
    loading: true,
    data: []
  });

  const [AllStrategy, setAllStrategy] = useState({
    loading: true,
    data: []
  });



  const [AllGroupServices, setAllGroupServices] = useState({
    loading: true,
    data: []
  });


  const formik = useFormik({
    initialValues: {
      initialValues: {
        username: '',
        fullName: '',
        email: '',
        mobile: '',

      },

    },
    validate: (values) => {

      const errors = {};
      if (!values.username && formik.touched.username) {
        errors.username = "Error";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        "UserName": values.username,
      }
    }
  });

  const fields = [
    { name: 'username', label: 'Username', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'fullName', label: 'FullName', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'email', label: 'Email', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'mobile', label: 'Mobile', type: 'text', label_size: 12, col_size: 6, disable: false },
    {
      name: 'licence',
      label: 'Licence',
      type: 'select',
      options: [
        { label: '2 Days', value: '0' },
        { label: 'Demo', value: '1' },
        { label: 'Live', value: '2' },
      ]
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'tomonth',
      label: 'To Month',
      type: 'select',
      options: first && first.map((item) => ({ label: item.endDate, value: item.month })),
      showWhen: values => values.licence === '2'
      , label_size: 12, col_size: 6, disable: false, isSelected: true
    },
    {
      name: 'broker',
      label: 'Broker',
      type: 'select',
      options: GetBrokerInfo && GetBrokerInfo.map((item) => ({ label: item.title, value: item.broker_id })),
      showWhen: values => values.licence === '2' || values.licence === '0'
      , label_size: 12, col_size: 6, disable: false
    },
    //  For Demo Only Client
    {
      name: 'fromDate', label: 'From Date', type: 'date',
      showWhen: values => values.licence === '1'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'todate', label: 'To Date', type: 'date',
      showWhen: values => values.licence === '1'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'api_key',
      label: formik.values.broker == 4 ? 'App Key' : formik.values.broker == 7 ? "Consumer Key" : formik.values.broker == 9 ? "Vendor Key" : formik.values.broker == 8 ? 'App Key' : formik.values.broker == 10 ? 'App Key' : "'Api Key", type: 'text',
      showWhen: values => values.broker === '4' || values.broker === '7' || values.broker === '8' || values.broker === '9' || values.broker === '10' || values.broker === '11' || values.broker === '12' || values.broker === '14' || values.broker === '15' || values.broker === '6',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'client_code',
      label: formik.values.broker == 1 ? 'User' : formik.values.broker == 4 ? "Client Code" : formik.values.broker == 7 ? "User Name" : formik.values.broker == 9 ? "Vander Id" : formik.values.broker == 11 ? "Client Code" : formik.values.broker == 11 ? "client_code" : 'User Id', type: 'text',
      showWhen: values => values.broker === '1' || values.broker === '5' || values.broker === '4' || values.broker === '7' || values.broker === '9' || values.broker === '11' || values.broker === '6',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'demat_userid',
      label: formik.values.broker == 9 ? 'User Id' : '', type: 'text',
      showWhen: values => values.broker === '9',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'app_id',
      label: formik.values.broker == 1 ? 'Verification Code' : formik.values.broker == 5 ? 'Password' : formik.values.broker == 7 ? 'Demat Password' : formik.values.broker == 11 ? 'Password' : formik.values.broker == 2 ? 'Demat UserId' : formik.values.broker == 13 ? 'App Id' : formik.values.broker == 9 ? 'Password' : formik.values.broker == 14 ? 'User Id ' : 'App Id', type: 'text',
      showWhen: values =>
        //  values.broker === '2' ||
        values.broker === '1' || values.broker === '2' || values.broker === "3" || values.broker === '5' || values.broker === '7' || values.broker === '9' || values.broker === '11' || values.broker === '13' || values.broker === '14',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'app_key',
      label: formik.values.broker == 5 || 6 ? 'App Key' : "", type: 'text',
      showWhen: values => values.broker === '5',
      label_size: 12, col_size: 6, disable: false
    },

    {
      name: 'api_secret',
      label: formik.values.broker == 1 ? 'Password Code' : formik.values.broker == 5 ? 'DOB' : formik.values.broker == 7 ? 'Consumer Secret' : formik.values.broker == 9 ? 'Encryption Secret Key' : formik.values.broker == 10 ? 'Api Secret Key' : formik.values.broker == 11 ? '2FA' : formik.values.broker == 14 ? 'Encryption Key' : 'Api Secret', type: 'text',
      showWhen: values => values.broker === '1'
        ||
        // values.broker === '2' ||
        values.broker === '3' || values.broker === '5' || values.broker === '6' || values.broker === '7' || values.broker === '8' || values.broker === '9' || values.broker === '10' || values.broker === '11' || values.broker === '13' || values.broker === '14' || values.broker === '15',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'api_type',
      label: formik.values.broker == 5 ? 'DOB' : formik.values.broker == 7 ? 'Trade Api Password' : formik.values.broker == 9 ? 'Encryption IV' : 'Api Secret', type: 'text',
      showWhen: values =>
        values.broker === '7' || values.broker === '9',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'service_given_month',
      label: 'Service Given To Month',
      type: 'select',
      options: [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },

      ],
      showWhen: values =>
        values.licence === '2' || values.licence === 2
      , label_size: 12, col_size: 6, disable: false

    },


    {
      name: 'groupservice',
      label: 'Group Service',
      type: 'select',

      options:
        AllGroupServices.data && AllGroupServices.data.map((item) => ({ label: item.name, value: item._id }))
      , label_size: 12, col_size: 6, disable: false
    }

  ];



  const handleStrategyChange = (event) => {

  };



  return (
    <>
      <div>
        <Content Page_title="Edit Subadmin" button_title='Back' route="/admin/allsubadmin">
          <EditForm fieldtype={fields.filter(field => !field.showWhen || field.showWhen(formik.values))} formik={formik} btn_name="Add Client"
            fromDate={formik.values.fromDate}
            toDate={formik.values.todate}

            additional_field={
              <>

                {/*  For Show All Services */}
                {GetServices && GetServices.data.map((strategy) => (
                  <div className={`col-lg-2 `} key={strategy._id}>
                    <div className="col-lg-12 ">
                      <label className="form-check-label bg-primary text-white py-2 px-4" for={strategy.ServiceResult.name}>{`${strategy.ServiceResult.name}[${strategy.categories.segment}]`}</label>
                    </div>
                  </div>
                ))}
                <label className="toggle mt-3">
                  <input className="toggle-checkbox bg-primary" type="checkbox" onChange={(e) => {
                    // setShowAllStratagy(e.target.checked)
                  }} />
                  {/* <div className={`toggle-switch ${ShowAllStratagy ? 'bg-primary' : "bg-secondary"}`}></div> */}
                  <span className="toggle-label">Show Strategy</span>
                </label>

                {formik.errors.Strategy &&
                  <div style={{ color: 'red' }} className='my-3'>{formik.errors.Strategy} </div>}

                {/*  For Show All Strategy */}
                <div className='d-flex mt-3'>
                  <input type='checkbox' className='m-3'/><label className='m-3'>demo</label>
                  <input type='checkbox' className='m-3' /><label className='m-3'>demo</label>
                  <input type='checkbox' className='m-3' /><label className='m-3'>demo</label>
                  <input type='checkbox' className='m-3' /><label className='m-3'>demo</label>
                  <input type='checkbox' className='m-3'/><label className='m-3'>demo</label>
                  <input type='checkbox' className='m-3'/><label className='m-3'>demo</label>
                  <input type='checkbox' className='m-3' /><label className='m-3'>demo</label>
                </div>

                {/* {AllStrategy.data.map((strategy) => (
                  
                  <div className={`col-lg-2 mt-2`} key={strategy._id}>
                    <div className="row ">
                      <div className="col-lg-12 ">
                        <div className="form-check custom-checkbox mb-3">
                          <input type='checkbox' className="form-check-input" name={strategy.strategy_name}
                            value={strategy._id}
                            onChange={(e) => handleStrategyChange(e)}
                          />
                          <label className="form-check-label" for={strategy.strategy_name}>{strategy.strategy_name}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </>

            }
          />

          <ToastButton />
        </Content >

      </div>

    </>
  )
}
export default EditClient

