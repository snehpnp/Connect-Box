
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import { Trash2 } from 'lucide-react';
import AddForm from '../../../Components/ExtraComponents/forms/AddForm'






const AddStrategy = () => {
    //     const navigate = useNavigate()
    //     const dispatch = useDispatch()
    //     const [state, setstate] = useState([]);
    //     const [SerachService, setSerachService] = useState('');
    const [GetAllSgments, setGetAllSgments] = useState({
        loading: true,
        data: [],
    });
    //     const [allServices, setAllServices] = useState({
    //         loading: true,
    //         data: [],
    //     });
    //     const [selectedServices, setSelectedServices] = useState([]);

    //     const [GroupQty, setGroupQty] = useState([]);
    //     const [selectAllFiltered, setSelectAllFiltered] = useState(false);




    //     //  For Select Services Checkbox
    //     function handleServiceChange(event, id, name, segment, lotsize) {
    //         const serviceId = id;
    //         const isChecked = event.target.checked;

    //         setSelectedServices((prevInfo) => {
    //             if (isChecked) {
    //                 return [...prevInfo, { service_id: serviceId, name: name, segment: segment, group_qty: 0, lotsize: lotsize }];
    //             } else {
    //                 return prevInfo.filter((info) => info.service_id !== serviceId);
    //             }
    //         });
    //     }


    //     //  For Select All 
    //     const handleSelectAllFilteredChange = () => {
    //         setSelectAllFiltered((prevChecked) => !prevChecked);

    //         if (!selectAllFiltered) {
    //             // Filtered services ko select karo aur additional information store karo.
    //             const updatedServices = state.map((service) => ({
    //                 service_id: service._id,
    //                 name: service.name,
    //                 segment: service.category.name,
    //                 group_qty: 0,
    //                 lotsize: service.lotsize

    //             }));

    //             // Set all filtered checkboxes to checked
    //             state.forEach((service) => {
    //                 const checkboxes = document.querySelectorAll(`#service-${service._id}`);
    //                 checkboxes.forEach((checkbox) => {
    //                     checkbox.checked = true;
    //                 });
    //             });

    //             setSelectedServices((prevInfo) => [...prevInfo, ...updatedServices]);
    //         } else {
    //             // Filtered services ko deselect karo aur unka data hatao.
    //             const filteredServiceIds = state.map((service) => service._id);
    //             setSelectedServices((prevInfo) =>
    //                 prevInfo.filter((info) => !filteredServiceIds.includes(info.service_id))
    //             );

    //             // Set all filtered checkboxes to unchecked
    //             state.forEach((service) => {
    //                 const checkboxes = document.querySelectorAll(`#service-${service._id}`);
    //                 checkboxes.forEach((checkbox) => {
    //                     checkbox.checked = false;
    //                 });
    //             });
    //         }
    //     };




    //     //  For Set Group-Qty

    //     const InputGroupQty = (event, id, servicename, segment, lotsize) => {





    //         const updatedQty = event.target.value === "" ? 0 : parseInt(event.target.value);

    //         setSelectedServices((prevInfo) =>
    //             prevInfo.map((info) =>
    //                 info.service_id === id
    //                     ? {
    //                         ...info,
    //                         group_qty: updatedQty,
    //                     }
    //                     : info
    //             )
    //         );

    //         // Update the quantity in the GroupQty array
    //         setGroupQty((prevQtys) => ([
    //             ...prevQtys.filter((qtyInfo) => qtyInfo.service_id !== id),
    //             {
    //                 service_id: id,
    //                 segment: segment,
    //                 name: servicename,
    //                 group_qty: updatedQty,
    //             }
    //         ]));

    // };



    // //  For Remove Service From Select And Table
    // const remoeveService = (id) => {
    //     if (window.confirm("Do you want to delete")) {
    //         let test = selectedServices.filter((item) => {
    //             return item.service_id !== id
    //         })
    //         let checkboxes = document.querySelectorAll(`#service-${id}`);
    //         checkboxes.forEach((checkbox) => {
    //             checkbox.checked = false;
    //         });

    //         setSelectedServices(test)
    //     }
    // }



    // //  -------------------For Show Segment List-----------------


    // // const getservice = async () => {
    // //     await dispatch(Get_All_Catagory())
    // //         .unwrap()
    // //         .then((response) => {

    // //             if (response.status) {
    // //                 setGetAllSgments({
    // //                     loading: false,
    // //                     data: response.data,
    // //                 });
    // //             }
    // //         });
    // // };
    // // useEffect(() => {
    // //     getservice();
    // // }, []);





    // //  -------------------For Show Service According to Segment -----------------

    // // const data = async () => {
    // //     if (formik.values.segment) {
    // //         await dispatch(Service_By_Catagory({ segment: formik.values.segment })).unwrap()
    // //             .then((response) => {
    // //                 if (response.status) {
    // //                     setAllServices({
    // //                         loading: false,
    // //                         data: response.data,
    // //                     });
    // //                 }
    // //             });
    // //     }
    // // };




    // //  For Manage Filter Symboll 
    // // const filterFunction = async () => {
    // //     const filteredData = allServices.data.filter((item) => {
    // //         return item.name.toLowerCase().includes(SerachService.toLowerCase())
    // //     });

    // //    console.log(" filteredData add group ",filteredData)


    // //     if (SerachService === "") {
    // //         setstate([])
    // //     } else {
    // //         setstate(filteredData)
    // //     }
    // // };

    // // useEffect(() => {
    // //     filterFunction()
    // // }, [SerachService]);








    //  --------------------- For Manage Form ---------------

    const formik = useFormik({
        initialValues: {
            groupname: '',
            segment: false
        },
        validate: (values) => {
            const errors = {};
            if (!values.groupname) {
                errors.groupname = "valid_err.EMPTY_GROUP_NAME_ERR";
            }
            if (!values.segment) {
                errors.segment = "valid_err.SEGEMENTSELECT_ERROR";
            }


            return errors;
        },
        onSubmit: async (values) => {
            // let checkValid = true
            // selectedServices && selectedServices.map((item) => {
            //     if (item.lotsize !== 1) {
            //         if ((item.group_qty) % (item.lotsize) !== 0) {
            //             alert(`Please Enter Valid Lot Size Inside ${item.name}`)
            //             checkValid = false
            //             return
            //         }
            //         return
            //     }
            //     return
            // })


            // if (checkValid) {
            //     await dispatch(Add_Group({
            //         groupdetails: { name: values.groupname },
            //         services_id: selectedServices
            //     })).then((response) => {

            //         if (response.payload.status) {
            //             toast.success(response.payload.msg);
            //             setTimeout(() => {
            //                 navigate("/admin/groupservices")
            //             }, 1000);
            //         } else {
            //             toast.error(response.payload.msg);

            //         }
            //     })

            // }
        }
    });



    const fields = [
        { name: 'groupname', label: 'Group Name', type: 'text', label_size: 12, col_size: 3, disable: false },
        { name: 'groupname', label: 'Group Name', type: 'text', label_size: 12, col_size: 3, disable: false },

        { name: 'groupname', label: 'Group Name', type: 'text', label_size: 12, col_size: 3, disable: false },
        {
            name: 'segment',
            label: 'Segment',
            type: 'select',
            options: GetAllSgments.data && GetAllSgments.data.map((item) => ({ label: item.name, value: item.segment })),
            label_size: 12, col_size: 6, disable: false,
        },
    ];




    // useEffect(() => {
    //     data();
    // }, [formik.values.segment]);



    // useEffect(() => {
    //     setSerachService('')
    //     setSelectAllFiltered(false)
    // }, [formik.values.segment]);





    // const fields = [
    //     {
    //         name: "fullName",
    //         label: "FullName",
    //         type: "text",
    //         label_size: 6,
    //         col_size: 6,
    //         disable: false,
    //     },
    //     {
    //         name: "username",
    //         label: "Username",
    //         type: "text",
    //         label_size: 12,
    //         col_size: 6,
    //         disable: false,
    //     },
    //     {
    //         name: "email",
    //         label: "Email",
    //         type: "text",
    //         label_size: 12,
    //         col_size: 6,
    //         disable: false,
    //     },
    //     {
    //         name: "phone",
    //         label: "Phone No",
    //         type: "number",
    //         label_size: 12,
    //         col_size: 6,
    //         disable: false,
    //     },
    //     {
    //         name: "balance",
    //         label: "Balance",
    //         type: "number",
    //         label_size: 12,
    //         col_size: 6,
    //         disable: false,
    //     },
    //     {
    //         name: "password",
    //         label: "password",
    //         type: "password",
    //         label_size: 12,
    //         col_size: 6,
    //         disable: false,
    //     },
    //     {
    //         name: "prifix_key",
    //         label: "Prifix Key",
    //         type: "text",
    //         label_size: 12,
    //         col_size: 6,
    //         disable: false,
    //     },
    //     {
    //         name: "subadmin_servic_type",
    //         label: "Subadmin Servic Type",
    //         type: "select",
    //         options: [
    //             { label: "Per Trade", value: "1" },
    //             { label: "Per Strategy", value: "2" },
    //         ],
    //         label_size: 12,
    //         col_size: 6,
    //         disable: false,
    //     },
    // ];



    // const formik = useFormik({
    //     initialValues: {
    //         fullName: "",
    //         username: "",
    //         email: "",
    //         phone: "",
    //         balance: "",
    //         password: "",
    //         prifix_key: "",
    //         subadmin_servic_type: "0",
    //         strategy_Percentage: "0",
    //         Per_trade: "0",
    //         parent_id: null,
    //         parent_role: null,
    //     },
    //     validate: (values) => {
    //         let errors = {};
    //         if (!values.fullName) {
    //             errors.fullName = "Full Name is required";
    //         }
    //         if (!values.username) {
    //             errors.username = "Username is required";
    //         }
    //         if (!values.email) {
    //             errors.email = "Please enter your email address.";
    //         } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    //             errors.email = "Please enter a valid email address.";
    //         }

    //         if (!values.phone) {
    //             errors.phone = "Please enter your phone number.";
    //         } else if (!/^\d{10}$/.test(values.phone)) {
    //             errors.phone = "Please enter a valid 10-digit phone number.";
    //         }
    //         if (!values.balance) {
    //             errors.balance = "Balance is required";
    //         }
    //         if (!values.password) {
    //             errors.password = "Password is required";
    //         }
    //         if (!values.prifix_key) {
    //             errors.prifix_key = "Prefix key is required";
    //         } else if (values.prifix_key.length !== 3) {
    //             errors.prifix_key = "Key should be exactly 3 characters/number/both";
    //         }
    //         return errors;
    //     },
    //     onSubmit: async (values ) => {

    //         const data = {
    //             ProfileImg: "",
    //             FullName: values.fullName,
    //             UserName: values.username,
    //             Email: values.email,
    //             PhoneNo: values.phone,
    //             Balance: values.balance,
    //             subadmin_service_type: values.subadmin_servic_type,
    //             strategy_Percentage: values.strategy_Percentage,
    //             Per_trade: values.Per_trade,
    //             prifix_key: values.prifix_key,
    //             password: values.password,
    //             // parent_id: user_id || "65feb434ce02a722ac3b997d",
    //             // parent_role: Role || "ADMIN",
    //         };




    //         //   await dispatch(AddSubadmin(data))
    //         //     .unwrap()
    //         //     .then(async (response) => {


    //         //       if (response.status) {
    //         //         toast.success(response.msg);
    //         //         setTimeout(() => {
    //         //           navigate("/admin/allsubadmin")
    //         //         }, 1000);

    //         //       } else {
    //         //         toast.error(response.msg);
    //         //       }

    //         //     })
    //         //     .catch((error) => {
    //         //       console.log("Error", error);
    //         //     });

    //     },
    // });

    return (
        <>

            <AddForm
                fields={fields}
                page_title="Add Group"
                btn_name="Add Group"
                btn_name1="Cancel"
                btn_status="true"
                content_path="/subadmin/group-service"
                content_btn_name="Back"
                formik={formik}
                 
                
            >
                
                <ToastButton />
            </AddForm>

            {/* <Content Page_title="Add Group " button_title="Back" route="/admin/groupservices"
            additional_field={
                <div style={{ overflowY: 'scroll', height: '65vh' }}>
                    <h4 className='text-center text-decoration-underline mb-3'>Select Services And Quantity</h4>
                    <table className="table table-responsive-sm col-md-3 " >
                        <thead className="bg-primary">
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Segment</th>
                                <th>Service Name</th>
                                <th>lotsize</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedServices && selectedServices.map((item, index) => {
                                return <>
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{item.segment}</td>
                                        <td>{item.name}</td>
                                        <td>{item.lotsize}</td>

                                        <td>
                                            <input
                                                type="number"
                                                className="form-control col-md-1"
                                                placeholder="Enter Qty"
                                                value={item.group_qty}
                                                onChange={(e) => InputGroupQty(e, item.service_id, item.name, item.segment, item.lotsize)}
                                            min={0}

                                            />
                                        </td>
                                        <td onClick={() => {
                                            remoeveService(item.service_id)
                                        }}><Trash2 className='text-danger' /></td>

                                    </tr>
                                </>
                            })


                            }

                        </tbody >
                    </table>
                </div>
            }

        >
            <Formikform fieldtype={fields.filter(field => !field.showWhen || field.showWhen(formik.values))} formik={formik} btn_name="Add Group" title='addstrategy'
                additional_field={
                    <>
                        {formik.values.segment ?
                            <div className='col-md-11 px-2 ms-2 '>
                                <input
                                    type="test"
                                    className="form-control"
                                    placeholder="Search ..."
                                    onChange={(e) => { setSerachService(e.target.value) }}
                                    value={SerachService}

                                />
                            </div>

                            : ""}
                        <div className="col-lg-12" style={{ overflowY: 'scroll', height: '50vh' }}>
                            {state.length > 0 && (
                                <div className="mb-3 row">
                                    <div className="col-lg-12">
                                        <div className="row mt-4">
                                            :
                                            <>
                                                <div className="col-md-4 mb-2">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id='selectall'
                                                            checked={selectAllFiltered}
                                                            onChange={() => handleSelectAllFilteredChange()}
                                                        />
                                                        <label className="form-check-label" htmlFor='selectall'>
                                                            Select All
                                                        </label>
                                                    </div>
                                                </div>
                                                {state.map((service) => (
                                                    <div key={service._id} className="col-md-4 mb-2">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id={`service-${service._id}`}
                                                                value={service._id}
                                                                defaultChecked={selectedServices.includes(service._id)}
                                                                onChange={(e) => handleServiceChange(e, service._id, service.name, service.category.name, service.lotsize)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`service-${service._id}`}>
                                                                {service.name}
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}

                                            </>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>



                    </>
                }
            />



            < ToastButton />
        </Content > */}
        </>
    )



}


export default AddStrategy

