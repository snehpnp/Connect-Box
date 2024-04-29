import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ToastButton from "../../../../Components/ExtraComponents/Alert_Toast";
import { Trash2 } from 'lucide-react';
import AddForm from '../../../../Components/ExtraComponents/forms/AddFrom1'
import { Get_All_Catagory, Service_By_Catagory, Get_Group_Data, Edit_Group_Service } from '../../../../ReduxStore/Slice/Subadmin/GroupServicesSlice'
import Content from '../../../../Components/Dashboard/Content/Content1'
import Swal from "sweetalert2";


const AddStrategy = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setstate] = useState([]);
    const [SerachService, setSerachService] = useState('');
    const [selectedValue, setSelectedValue] = useState('')
    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDescription] = useState('')
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServices1, setSelectedServices1] = useState([]);



    const [GroupQty, setGroupQty] = useState([]);
    const [selectAllFiltered, setSelectAllFiltered] = useState(false);


    const [GetAllSgments, setGetAllSgments] = useState({
        loading: true,
        data: [],
    });
    const [getGroupData, setGroupData] = useState({
        loading: true,
        data: [],
    });
    const [allServices, setAllServices] = useState({
        loading: true,
        data: [],
    })
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
    const prifix_key = JSON.parse(localStorage.getItem("user_details")).prifix_key;





    //  For Select Services Checkbox
    function handleServiceChange(event, id, name, segment, lotsize) {
        const serviceId = id;
        const isChecked = event.target.checked;

        setSelectedServices((prevInfo) => {
            if (isChecked) {
                return [...prevInfo, { service_id: serviceId, name: name, segment: segment, group_qty: 0, lotsize: lotsize }];
            } else {
                return prevInfo.filter((info) => info.service_id !== serviceId);
            }
        });
    }


    //  For Select All 
    const handleSelectAllFilteredChange = () => {
        setSelectAllFiltered((prevChecked) => !prevChecked);

        if (!selectAllFiltered) {
            // Filtered services ko select karo aur additional information store karo.
            const updatedServices = state.map((service) => ({
                service_id: service._id,
                name: service.name,
                segment: service.category.name,
                group_qty: 0,
                lotsize: service.lotsize

            }));

            // Set all filtered checkboxes to checked
            state.forEach((service) => {
                const checkboxes = document.querySelectorAll(`#service-${service._id}`);
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = true;
                });
            });

            setSelectedServices((prevInfo) => [...prevInfo, ...updatedServices]);
        } else {
            // Filtered services ko deselect karo aur unka data hatao.
            const filteredServiceIds = state.map((service) => service._id);
            setSelectedServices((prevInfo) =>
                prevInfo.filter((info) => !filteredServiceIds.includes(info.service_id))
            );

            // Set all filtered checkboxes to unchecked
            state.forEach((service) => {
                const checkboxes = document.querySelectorAll(`#service-${service._id}`);
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                });
            });
        }
    };




    //     //  For Set Group-Qty

    const InputGroupQty = (event, id, servicename, segment, lotsize) => {

        const updatedQty = event.target.value === "" ? 0 : parseInt(event.target.value);

        setSelectedServices((prevInfo) =>
            prevInfo.map((info) =>
                info.service_id === id
                    ? {
                        ...info,
                        group_qty: updatedQty,
                    }
                    : info
            )
        );

        // Update the quantity in the GroupQty array
        setGroupQty((prevQtys) => ([
            ...prevQtys.filter((qtyInfo) => qtyInfo.service_id !== id),
            {
                service_id: id,
                segment: segment,
                name: servicename,
                group_qty: updatedQty,
            }
        ]));

    };



    // //  For Remove Service From Select And Table
    const remoeveService = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            let test = selectedServices.filter((item) => {
                return item.service_id !== id
            })
            let checkboxes = document.querySelectorAll(`#service-${id}`);
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });

            setSelectedServices(test)
        }

    }



    // //  -------------------For Show Segment List-----------------


    const getservice = async () => {
        await dispatch(Get_All_Catagory())
            .unwrap()
            .then((response) => {

                if (response.status) {

                    setGetAllSgments({
                        loading: false,
                        data: response.data,
                    });
                }
            });
    };
    useEffect(() => {
        getservice();
    }, []);




    useEffect(() => {
        setSerachService('')
        setSelectAllFiltered(false)
    }, [selectedValue]);


    //  For Manage Filter Symboll 
    const filterFunction = async () => {
        const filteredData = allServices.data.filter((item) => {
            return item.name.toLowerCase().includes(SerachService.toLowerCase())
        });

        if (SerachService === "") {
            setstate([])
        } else {
            setstate(filteredData)
        }
    };


    useEffect(() => {
        filterFunction()
    }, [SerachService,]);









    const formik = useFormik({
        initialValues: {
            groupname: '',
            segment: false
        },
        validate: (values) => {
            const errors = {};

            if (!groupName) {
                errors.groupName = "Group Name is required";
            }
            if (!groupDescription) {
                errors.groupDescription = "Group groupDescription is required";
            }


            return errors;
        },
        onSubmit: async (values) => {

            let checkValid = true
            if (selectedServices.length == 0) {
                Swal.fire({
                    title: "Error!",
                    text: "Please Select atleast one service",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                })
                return
            }
            else {
                selectedServices && selectedServices.map((item) => {
                    if (item.lotsize !== 1) {
                        if ((item.group_qty) % (item.lotsize) !== 0) {
                            Swal.fire({
                                title: "Error!",
                                text: `Please Enter Valid Lot Size Inside ${item.name}`,
                                icon: "error",
                                timer: 1500,
                                timerProgressBar: true,
                            })

                            checkValid = false
                            return
                        }
                        return
                    }
                    return
                })


                if (checkValid) {
                    await dispatch(Edit_Group_Service({
                        groupdetails: { name: groupName, description: groupDescription, id: id },
                        services_id: selectedServices,
                        maker_id: user_id
                    })).then((response) => {
                        if (response.payload.status) {
                            Swal.fire({
                                title: "Create Successful!",
                                text: response.payload.msg,
                                icon: "success",
                                timer: 1500,
                                timerProgressBar: true,
                            }).then(() => {
                                navigate("/subadmin/group-service");
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: response.payload.msg,
                                icon: "error",
                                timer: 1500,
                                timerProgressBar: true,
                            })
                        }
                    })
                }
            }
        }
    });



    const fields = [

    ];





    const handleChange = async (event) => {
        setSelectedValue(event.target.value);

        await dispatch(Service_By_Catagory({ segment: event.target.value })).unwrap()
            .then((response) => {

                if (response.status) {

                    setAllServices({
                        loading: false,
                        data: response.data,
                    });
                }
                else {
                    setAllServices({
                        loading: false,
                        data: [],
                    });
                }
            });
    };

    const FindData = async () => {
        var req = {
            _id: id
        }
        await dispatch(Get_Group_Data(req)).unwrap()
            .then((response) => {
                if (response.status) {

                    setGroupData({
                        loading: true,
                        data: response.data
                    })
                    setGroupDescription(response.data && response.data.group_name[0].description)
                    setGroupName(response.data && response.data.group_name[0].name)
                    setSelectedServices1(response.data && response.data.Service_name_get)

                    response.data && response.data.Service_name_get.map((item) => {
                        selectedServices.push({
                            service_id: item.ServiceResult._id,
                            // ServiceResult_id: item.ServiceResult._id,
                            lotsize: item.ServiceResult.lotsize,
                            name: item.ServiceResult.name,
                            catagory_id: item.catagory._id,
                            segment: item.catagory.name,
                            catagory_segment: item.ServiceResult.segmen,
                            group_qty: item.group_qty

                        })
                    })
                }
                else {
                    setGroupData({
                        loading: true,
                        data: []
                    })

                }
            })


    }

    useEffect(() => {
        FindData();
    }, []);














    return (
        <>
            <Content Page_title="Edit Group " button_title="Back" route="/subadmin/group-service"
                additional_field={
                    <div style={{ overflowY: 'scroll', height: '65vh' }}>
                        <h4 className='text-center text-decoration-underline mb-3'>Select Services And Quantity</h4>
                        <table className="table table-responsive-sm col-md-3 " >
                            <thead className="">
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



                <AddForm fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))} formik={formik} btn_name="Edit Group" title='addstrategy'
                    additional_field={
                        <>

                            <div className='row '>
                                <div className='col-lg-6 col-sm-6 mb-4'>
                                    <div className="form-group mx-2">
                                        <label className='col-sm-12 col-form-label'>Group Name</label>
                                        <div className='col-sm-12'>
                                            <input
                                                type="text"
                                                name="groupname"
                                                style={{ width: '100%', borderRadius: '5px', padding: '5px' }}
                                                placeholder='Enter Group Name'
                                                onChange={(e) => setGroupName(e.target.value)}
                                                value={groupName.startsWith(prifix_key + '_') ? groupName
                                                    : groupName.startsWith(prifix_key) ?
                                                        prifix_key + '_' + groupName.substr(3)
                                                        : prifix_key + '_' + groupName
                                                }
                                            />

                                            {groupName ? '' :
                                                <div style={{ color: 'red' }}>{formik.errors.groupName}</div>
                                            }


                                        </div>
                                    </div>


                                </div>
                                <div className='col-lg-6 col-sm-6 mb-4'>
                                    <div className="form-group mx-2">
                                        <label className='col-sm-12 col-form-label'>Group Description</label>
                                        <div className='col-sm-12'>
                                            <input
                                                type="text"
                                                style={{ width: '100%', borderRadius: '5px', padding: '5px' }}
                                                placeholder='Enter Group description'
                                                onChange={(e) => setGroupDescription(e.target.value)}
                                                value={groupDescription}
                                            />

                                            {groupDescription ? '' :
                                                <div style={{ color: 'red' }}>{formik.errors.groupDescription}</div>
                                            }



                                        </div>


                                    </div>
                                </div>


                            </div>
                            <div className='row'>
                                <div className='col-lg-6 col-sm-6  mb-4'>
                                    <div className="form-group">
                                        <label className='col-sm-12 col-form-label'>Segment</label>
                                        <div className='col-sm-12 '>
                                            <select className='form-control p-2' value={selectedValue} onChange={(e) => handleChange(e)} style={{ width: '100%' }}>
                                                <option value=''>Please Select Segment</option>
                                                {GetAllSgments.data && GetAllSgments.data.map((option, index) => (
                                                    <option key={option.value} value={option.segment} >
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* {selectedValue ? '' :
                                                <div style={{ color: 'red' }}>{formik.errors.selectedValue}</div>
                                            } */}
                                        </div>
                                    </div>
                                </div>
                                {selectedValue ?
                                    <div className='col-lg-5 col-md-11 mt-2 ms-2 input-block'>
                                        <input
                                            type="test"
                                            className="form-control mt-4 p-2"
                                            placeholder="Search..."
                                            onChange={(e) => { setSerachService(e.target.value) }}
                                            value={SerachService}

                                        />
                                    </div>

                                    : ""}
                            </div>






                            <div className="col-lg-12" style={{ overflowY: 'scroll', height: '50vh' }}>
                                {state.length > 0 && (
                                    <div className="mb-3 row">
                                        <div className="col-lg-12">
                                            <div className="row mt-4">

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
            </Content >
        </>
    )



}


export default AddStrategy

