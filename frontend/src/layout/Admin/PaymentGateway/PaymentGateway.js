import React, { useEffect, useState } from 'react'
import Formikform from "../../../Components/ExtraComponents/Form/Formik_form"
import { useFormik } from 'formik';
import FullDataTable from "../../../Components/ExtraComponents/Datatable/FullDataTable"
import { PaymentGatewayKey, GET_PAYMENT_DETAILS ,UpdatePaymentAmount} from '../../../ReduxStore/Slice/Admin/AdminSlice'
import { useDispatch  } from "react-redux";
import Modal from '../../../Components/ExtraComponents/Modal';
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import toast from 'react-hot-toast';
import Theme_Content from "../../../Components/Dashboard/Content/Content"






const Payment_Gateway_Key = () => {

    const dispatch = useDispatch()


    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
    const [showModal, setshowModal] = useState(false)
    const [showModalAmount, setshowModalAmount] = useState(false)


    const [allPaymentDetails, setAllPaymentDetails] = useState({
        loading: true,
        data: [],
    });
   

    const columns = [
        {
            dataField: 'index',
            text: 'S.No.',
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },
        {
            dataField: 'FullName',
            text: 'FullName',
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span>{row.userDetails.FullName}</span>
                </div >
            ),
        },
        {
            dataField: 'UserName',
            text: 'UserName',
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span>{row.userDetails.UserName}</span>
                </div >
            ),
        },
        {
            dataField: 'PhoneNo',
            text: 'PhoneNo',
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span>{row.userDetails.PhoneNo}</span>
                </div >
            ),
        },
        {
            dataField: 'Email',
            text: 'Email_Id',
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span>{row.userDetails.Email}</span>
                </div >
            ),
        },
        {
            dataField: 'amount',
            text: 'Amount',
        },
        {
            dataField: 'order_status',
            text: 'order_status',
        },
        {
            dataField: 'plan_name',
            text: 'Plan Name',
        },
        {
            dataField: 'order_id',
            text: 'Order_id',
        },


        {
            dataField: 'razorpay_payment_id',
            text: 'Payment Id',
        },
        {
            dataField: 'createdAt',
            text: 'Created Date',
        },
    ];

    const data = async () => {
        await dispatch(GET_PAYMENT_DETAILS())
            .unwrap()
            .then((response) => {


                if (response.status) {

                    setAllPaymentDetails({
                        loading: false,
                        data: response.data,
                    });

                } else {
                    setAllPaymentDetails({
                        loading: false,
                        data: response.data,
                    });
                }
            });
    };


    const getPaymentKey = async () => {
          const req = {
          }
        await dispatch(PaymentGatewayKey(req))
            .unwrap()
            .then((response) => {
               // console.log("getPaymentKey:", response.payment_key)
                if (response.status) {
                   // console.log("res payemt", response.payment_key);

                    formik.setFieldValue('Update_Payment_key',response.payment_key);
                }
                else {
                    toast.error("Not set key");  
                }
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }



    const getPaymentAmountDetails = async () => {
        const req = {
              }
      await dispatch(UpdatePaymentAmount(req))
          .unwrap()
          .then((response) => {
             // console.log("payment amount:", response)
              if (response.status) {
             // console.log("payment monthly:", response.data.monthly)
                  
                  
              formik_amount.setFieldValue('monthly',response.data.monthly);
              formik_amount.setFieldValue('quarterly',response.data.quarterly);
              formik_amount.setFieldValue('halfyearly',response.data.halfyearly);
              formik_amount.setFieldValue('yearly',response.data.yearly);
              }
              else {
                  toast.error("Not set key");  
              }
          })
          .catch((error) => {
              console.log("Error", error);
          });
    }



    useEffect(() => {
        data();
        getPaymentKey();
        getPaymentAmountDetails();
    }, []);

  
    
    const formik = useFormik({
        initialValues: {
            Update_Payment_key: ''
        },

        validate: (values) => {
            const errors = {};
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                "user_id": user_id,
                "payment_key": values.Update_Payment_key
            }
            await dispatch(PaymentGatewayKey(req))
                .unwrap()
                .then((response) => {
                    console.log("response:", response)
                    if (response.status) {
                        toast.success(response.msg);
                        setTimeout(()=>{
                            setshowModal(false)
                        },1000)
                       
                    }
                    else {
                        // toast.error();
                        console.log("error")
                    }
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }
    });

  


    const fields = [
        {
            name: 'Update_Payment_key',
            label: 'Enter Razorpay',
            type: 'text',
            placeholder: 'Enter Razorpay',
             col_size: 6,
            disable: false
        },
    ];


    

    const formik_amount = useFormik({
        initialValues: {
            monthly: 100,
            quarterly: 100,
            halfyearly: 100,
            yearly: 100
        },

        validate: (values) => {
            const errors = {};
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                "user_id": user_id,
                "monthly": values.monthly,
                "quarterly": values.quarterly,
                "halfyearly": values.halfyearly,
                "yearly": values.yearly
            }
              

             console.log("req ",req)
            
            await dispatch(UpdatePaymentAmount(req))
                .unwrap()
                .then((response) => {
                    console.log("response sss:", response)

                    
                    if (response.status) {
                        toast.success(response.msg);
                        setTimeout(()=>{
                            setshowModalAmount(false)
                        },1000)
                       
                    }
                    else {
                        // toast.error();
                        console.log("error")
                    }
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }
    });



    const fields_amount = [
        {
            name: 'monthly',
            label: 'Monthly',
            type: 'number',
            col_size: 12,
            disable: false
        },

        {
            name: 'quarterly',
            label: 'Quarterly',
            type: 'number',
            col_size: 12,
            disable: false
        },

        {
            name: 'halfyearly',
            label: 'Half yearly',
            type: 'number',
            col_size: 12,
            disable: false
        },

        {
            name: 'yearly',
            label: 'Yearly',
            type: 'number',
            col_size: 12,
            disable: false
        },
    ];



    return (
        <>
            {/* {

                GetBrokerInfo.loading ? <Loader /> :
                    <> */}

            <Theme_Content Page_title="User Payment Details" button_status={false}>
               <div className='d-flex justify-content-between'>
               <div className="col-md-6  d-flex justify-content-start  text-secondary ">
                    <button
                        className="btn btn-primary me-2 mb-4"
                        onClick={() => setshowModalAmount(true)}
                    >
                        Amount Fix
                    </button>
                </div>



                <div className="col-md-6 d-flex justify-content-end  text-secondary ">
                    <button
                        className="btn btn-primary me-2 mb-4"
                        onClick={() => setshowModal(true)}
                    >
                        Payment Gateway Key
                    </button>
                </div>

                 </div>
                <FullDataTable TableColumns={columns} tableData={allPaymentDetails.data} />
                {showModal ?
                    <Modal
                        isOpen={showModal}
                        backdrop="static"
                        size="ms-6"
                        title="Set Payment Gateway Key"
                        hideBtn={true}
                        handleClose={() => setshowModal(false)}
                    >
                        <Formikform fieldtype={fields.filter(field => !field.showWhen || field.showWhen(formik.values))} formik={formik} btn_name="Update Payment key"
                        />
                    </Modal>
                    : ""
                }


             
                {showModalAmount ?
                    <Modal
                        isOpen={showModalAmount}
                        backdrop="static"
                        size="lg"
                        title="Set Amount"
                        hideBtn={true}
                        handleClose={() => setshowModalAmount(false)}
                    >
                        <Formikform fieldtype={fields_amount.filter(field => !field.showWhen || field.showWhen(formik_amount.values))} formik={formik_amount} btn_name="Update Amount"
                        />
                    </Modal>
                    : ""
                }
                <ToastButton />
            </Theme_Content>

            {/*                         
                     </>
            } */}

        </ >
    )


}


export default Payment_Gateway_Key;


