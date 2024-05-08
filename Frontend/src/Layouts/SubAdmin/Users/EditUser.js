

import { GetAll_Group_Servics, GET_ALL_SERVICES_GIVEN,Get_All_Employee_Names } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { GetOneUser, Get_All_Broker, UpdateUsers } from '../../../ReduxStore/Slice/Subadmin/UsersSlice'
import { GetSubStrategys } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast';
import AddForm from '../../../Components/ExtraComponents/forms/AddForm';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from '../../../Utils/Loader';
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as valid_err from "../../../Utils/Common_Messages";

import {
  Email_regex,
  Mobile_regex,
  Name_regex,
} from "../../../Utils/Common_regex";



const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();

  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
  var subadmin_service_type1 = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type

  const [selectedCheckboxesAndPlan, setSelectedCheckboxesAndPlan] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [getOneUsers, setOneUsers] = useState([]);
  const [stgDiseble, setStgDiseble] = useState([]);
  const [getAllBroker, setAllBroker] = useState([]);


  console.log("stgDiseble :", stgDiseble)

  const [employeeNames, setEmployeeNames] = useState({
    loading: true,
    data: [],
  });

  const [serviceName, setServiceName] = useState({
    loading: true,
    data: [],
  });

  const [getAllStategy, setgetallStrategy] = useState({
    loading: true,
    data: [],
  });

  const [allGroupService, setAllGroupService] = useState({
    loading: true,
    data: [],
  });


  const isValidEmail = (email) => {
    return Email_regex(email);
  };
  const isValidContact = (mobile) => {
    return Mobile_regex(mobile);
  };

  const isValidName = (mobile) => {
    return Name_regex(mobile);
  };


  // 0 = 2 days 1= Demo 2 =Live
  const fields = [
  
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
    },

    {
      name: "phone",
      label: "Phone No",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: true,
    },

    {
      name: "licence",
      label: "Lincense Type",
      type: "select",
      options: getOneUsers.getClients && getOneUsers.getClients[0].license_type == 1 ?
        [
          { label: "Demo", value: "1" },
          { label: "2 Day Live", value: "0" },
          { label: "Live", value: "2" },
        ]
        : getOneUsers.getClients && getOneUsers.getClients[0].license_type == 0 ?
          [
            { label: "2 Day Live", value: "0" },
            { label: "Live", value: "2" },
          ] :
          [

            { label: "Live", value: "2" },
          ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },

    {

      name: "Service_Type",
      label: "Service Type",
      type: "test",
      label_size: 12,
      col_size: 6,
      // disable: false,
      showWhen: (values) => subadmin_service_type1 == 1,
      disable: getOneUsers.getClients !== undefined && getOneUsers.getClients[0].license_type == 2 ? true : false,

    },
    {
      name: "balance",
      label: "Balance",
      type: "text3",
      label_size: 12,
      col_size: 3,
      disable: true,
      showWhen: (values) => subadmin_service_type1 == 1 && values.licence === "2" && formik.values.Service_Type == 2,
    },
    {
      name: "add_balance",
      label: "Add Balance",
      type: "text3",
      label_size: 12,
      col_size: 3,
      disable: false,
      showWhen: (values) => subadmin_service_type1 == 1 && values.licence === "2" && formik.values.Service_Type == 2,
    },
    {
      name: 'broker',
      label: 'Broker',
      type: 'select',
      options: getAllBroker && getAllBroker.map((item) => ({ label: item.title, value: item.broker_id })),
      showWhen: values => values.licence === '2' || values.licence === '0'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'demat_userid',
      label: 'Demat UserId',
      type: 'text',
      showWhen: values => values.broker === '2' && values.licence != '1'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'api_key',
      label: 'Api Key',
      type: 'text',
      showWhen: values => values.broker === '12'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'groupservice',
      label: 'Group Service',
      type: 'select',
      options:
        allGroupService.data && allGroupService.data.map((item) => ({ label: item.name, value: item._id }))
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: "Employees",
      label: "Employees",
      type: "select1",
      options:
        employeeNames.data &&
        employeeNames.data.map((item) => ({
          label: item.UserName,
          value: item._id,
        })),
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];



  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      broker: null,
      groupservice: null,
      licence: null,
      parent_id: null,
      parent_role: null,
      demat_userid: null,
      api_key: null,
      Service_Type: 0,
      balance: 0,
      per_trade_value: null,
      Employees: null,
      add_balance: 0,
    },
    validate: (values) => {
      let errors = {};
      if (!values.fullName) {
        errors.fullName = valid_err.FULLNAME_ERROR;
      } else if (!isValidName(values.fullName)) {
        errors.fullName = valid_err.INVALID_ERROR
      }
      if (!values.email) {
        errors.email = valid_err.EMPTY_EMAIL_ERROR;
      } else if (!isValidEmail(values.email)) {
        errors.email = valid_err.INVALID_EMAIL_ERROR;
      }
      if (!values.username) {
        errors.username = valid_err.USERNAME_ERROR;
      }
      if (!values.phone) {
        errors.phone = valid_err.CONTACT_ERROR;
      } else if (!isValidContact(values.phone)) {
        errors.phone = valid_err.INVALID_CONTACT_ERROR;
      }
      if (!values.broker) {
        errors.broker = "broker is required";
      }

      if (values.broker == 0 && values.licence == 2) {
        errors.broker = "broker is required";
      }
      if (values.broker == 0 && values.licence == 0) {
        errors.broker = "broker is required";
      }
      if (!values.licence) {
        errors.licence = "licence is required";
      }
      if (!values.groupservice) {
        errors.groupservice = "Username is required";
      }
      return errors;
    },
    onSubmit: async (values) => {


      const req = {
        ProfileImg: ".",
        FullName: values.fullName,
        license_type: values.licence,
        add_balance: values.add_balance,
        Balance: Number(values.balance) + Number(values.add_balance)|| 0,
        Per_trade: null,
        Strategies: selectedCheckboxesAndPlan,
        parent_id: user_id,
        parent_role: Role || "SUBADMIN",
        demat_userid: values.demat_userid,
        group_service: values.groupservice,
        broker: values.broker,
        Per_trade: null,
        Service_Type: values.Service_Type,
        per_trade_value: values.per_trade_value || 0,
        _id: getOneUsers.getClients[0]._id,
        employee_id:values.Employees || null,
      

      };


      var stg_error = 0
      if (selectedCheckboxesAndPlan.length > 0) {
        selectedCheckboxesAndPlan.forEach((stg) => {
          if (stg.plan_id == "0") {
            stg_error = 1
            return
          }
        })
      }

      if (stg_error == 1 && values.licence == 2) {
        Swal.fire({
          title: "Error!",
          text: "Please Select A Plan ",
          icon: "error",
          timer: 1200,
          timerProgressBar: true
        });
        return
      }

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then(async (result) => {
        if (result.isConfirmed) {

          await dispatch(UpdateUsers(req))
            .unwrap()
            .then(async (response) => {
              if (response.status) {

                Swal.fire({
                  title: "Update Successful!",
                  text: response.msg,
                  icon: "success",
                  timer: 1200,
                  timerProgressBar: true
                });
                setTimeout(() => {
                  navigate("/subadmin/users")
                }, 1200);

              } else {
                Swal.fire({
                  title: "Error!",
                  text: response.msg,
                  icon: "error"
                });
              }

            })
            .catch((error) => {
              
            });
        } else if (result.isDenied) {

          navigate("/subadmin/users")

        }
      });



    },
  });

  

  const getAllUsers = async () => {
    var data = { user_ID: id }
    await dispatch(GetOneUser(data)).unwrap()
      .then((response) => {
        if (response.status) {
          setOneUsers(response.data);
          setSelectedCheckboxes(response.data.ClientStrategy.map((stg) => stg.strategy_id))
          setSelectedCheckboxesAndPlan(response.data.ClientStrategy.map((stg) => ({ id: stg.strategy_id, plan_id: stg.plan_id })));
          if (response.data.getClients[0].license_type == 2) {
            setStgDiseble(response.data.ClientStrategy.map((stg) => stg.strategy_id))
          }

        }
        else {
          setOneUsers([]);
        }

      })
      .catch((error) => {
        console.log("Error User data find Error", error);
      })
  }




  useEffect(() => {
    formik.setFieldValue('fullName', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].FullName);
    formik.setFieldValue('username', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].UserName);
    formik.setFieldValue('email', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].Email);
    formik.setFieldValue('phone', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].PhoneNo);
    formik.setFieldValue('broker', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].broker);
    formik.setFieldValue('licence', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].license_type);
    formik.setFieldValue('groupservice', getOneUsers.getClients !== undefined && getOneUsers.ClientGroupName[0].groupService_id);
    formik.setFieldValue('Service_Type', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].Service_Type);
    formik.setFieldValue('per_trade_value', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].per_trade_value);
    formik.setFieldValue('balance', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].Balance);
    formik.setFieldValue('demat_userid', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].demat_userid);
    formik.setFieldValue('Employees', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].employee_id);
    

 
  }, [getOneUsers.getClients])



  // GET ALL GROUP SERVICES
  const getAllGroupService = async () => {

    try {
      var data = { id: user_id }
      const response = await dispatch(GetAll_Group_Servics(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setAllGroupService({
          loading: true,
          data: formattedData,
        });
      } else {
        setAllGroupService({
          loading: true,
          data: [],
        });
      }
    } catch (error) {
      console.log("Error", error);
      setAllGroupService({
        loading: false,
        data: [],
      });
    }



  };

  // GET ALL GROUP SERVICES NAME
  const getAllGroupServicesName = async () => {
    if (formik.values.groupservice) {
      var data = { id: formik.values.groupservice }
      await dispatch(GET_ALL_SERVICES_GIVEN(data)).unwrap()
        .then((response) => {
          if (response.status) {
            setServiceName({
              loading: false,
              data: response.data
            })
          }
          else {
            setServiceName({
              loading: false,
              data: []
            })
          }
        })
        .catch((error) => {
          console.log("Erorr :", error)
        })

    }
  }

  // GET ALL STRATEGY
  const GetAllStrategy = async () => {
    var data = { id: user_id ,key:"1"}
    await dispatch(GetSubStrategys(data)).unwrap()
      .then((response) => {
        // console.log(" response.data", response.data)
        if (response.status) {
          setgetallStrategy({
            loading: true,
            data: response.data
          })
        }
        else {
          setgetallStrategy({
            loading: true,
            data: []
          })

        }
      })
      .catch((error) => {
        console.log("Error Stategy finding Error", error)
      })
  }

  // GET ALL BROKER
  const AllBroker = async () => {
    await dispatch(Get_All_Broker()).unwrap()
      .then((response) => {
        if (response.status) {


          setAllBroker(response.data);
        }
        else {
          setAllBroker([]);
        }
      })
      .catch((error) => {
        console.log("Error Broker find Error :", error)
      })

  }



  const handleStrategyChange = (id) => {
    if (selectedCheckboxes.includes(id)) {
      setSelectedCheckboxes(selectedCheckboxes.filter(checkboxId => checkboxId !== id));
      setSelectedCheckboxesAndPlan(prevState => (
        prevState.filter(item => item.id !== id)
      ));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
      setSelectedCheckboxesAndPlan(prevState => (
        [...prevState, { id: id, plan_id: "1" }]
      ));
    }
  };



  // SET PLAN FUNCTION
  const PlanSetinState = (id) => {
    const strategyPlanMonth = id.split('_')[1];
    const checkboxId = id.split('_')[0];


    if (selectedCheckboxes.includes(checkboxId)) {
      setSelectedCheckboxesAndPlan(prevState => (
        prevState.map(item => {
          return item.id == checkboxId ? { ...item, plan_id: strategyPlanMonth } : item;
        })
      ));
    }
  };



  const getAllEmployeeName = async () => {
    try {
      var data = { user_ID: user_id };
      const response = await dispatch(Get_All_Employee_Names(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setEmployeeNames({
          loading: false,
          data: formattedData,
        });
      } else {
        setEmployeeNames({
          loading: false,
          data: [],
        });
      }
    } catch (error) {
      console.log("Error", error);
      setEmployeeNames({
        loading: true,
        data: [],
      });
    }
  };


  useEffect(() => {
    AllBroker();
    getAllEmployeeName()
    getAllUsers()
    GetAllStrategy();
    getAllGroupService();
  }, [])



  useEffect(() => {
    getAllGroupServicesName();
  }, [formik.values.groupservice])


  // console.log("formik.values.Service_Type", formik.values.Service_Type)

  // useEffect(() => {
  //   setSelectedCheckboxesAndPlan([])
  //   setSelectedCheckboxes([])
  // }, [formik.values.Service_Type])

 
  return (
    <>
      {
        getAllStategy.data.length == 0 ?
          <Loader />
          :
          <>
            <AddForm
              fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))}
              page_title="Edit User"
              btn_name="Update User"
              btn_name1="Cancel"
              formik={formik}
              btn_name1_route={'/subadmin/users'}
              
              additional_field={
                <>
                  {serviceName.data.length > 0 ? <div class="input-block "> <label>All Group Service</label> </div> : ""}
                  <div className="row">

                    {serviceName &&
                      serviceName.data.map((item) => (
                        <>

                          <div className={`col-lg-2 `} key={item.serviceId}>

                            <label
                              className="alert alert-primary py-2 "
                              style={{ fontSize: "10px" }}
                              for={item.serviceName}
                            >{`${item.serviceName}[${item.categoryName}]`}</label>

                          </div>

                        </>

                      ))}
                  </div>

                  <div className="row mt-4">
                    {/* STRATEGY CODE */}
                    {subadmin_service_type1 == 2 ?
                      (<div className="row mt-4">
                        <div class="input-block ">
                          <label>All Strategy</label>
                        </div>
                        {getAllStategy.data.map((strategy) => (
                          <div className={`col-lg-3 mt-2`} key={strategy._id}>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-check custom-checkbox mb-3">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={strategy._id}
                                    name={strategy.strategy_name}
                                    value={strategy._id}
                                    checked={selectedCheckboxes && selectedCheckboxes.includes(strategy._id)}
                                    onChange={() => handleStrategyChange(strategy._id)}
                                    disabled={stgDiseble && stgDiseble.includes(strategy._id)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={strategy._id}
                                  >
                                    {strategy.strategy_name}

                                  </label>


                                  {formik.values.licence == 2 ?
                                    
                                    selectedCheckboxes.includes(strategy._id) && (
                                      <>
                                        <div
                                          className=""
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div className="form-group d-flex justify-content-between m-3 border rounded p-2">
                                            <div className="d-flex align-items-center">
                                              <input
                                                type="radio"
                                                name={`option_${strategy._id}`}
                                                value="1"
                                                id={`${strategy._id}_1`}
                                                checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 1)}
                                                onChange={(e) => PlanSetinState(e.target.id)}
                                              />
                                              <label
                                                style={{
                                                  margin: "0 10px 0 5px",
                                                  fontSize: "1rem",
                                                }}
                                              >
                                                Monthly
                                              </label>
                                            </div>
                                            <div className="d-flex align-items-center">
                                              <input
                                                type="radio"
                                                name={`option_${strategy._id}`}
                                                value="2"
                                                id={`${strategy._id}_2`}
                                                checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 2)}
                                                onChange={(e) => PlanSetinState(e.target.id)}
                                              />
                                              <label
                                                style={{
                                                  margin: "0 10px 0 5px",
                                                  fontSize: "1rem",
                                                }}
                                              >
                                                Quarterly
                                              </label>
                                            </div>
                                            <div className="d-flex align-items-center">
                                              <input
                                                type="radio"
                                                name={`option_${strategy._id}`}
                                                value="3"
                                                id={`${strategy._id}_3`}
                                                checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 3)}
                                                onChange={(e) => PlanSetinState(e.target.id)}
                                              />
                                              <label
                                                style={{
                                                  margin: "0 10px 0 5px",
                                                  fontSize: "1rem",
                                                }}
                                              >
                                                Halfyearly
                                              </label>
                                            </div>
                                            <div className="d-flex align-items-center">
                                              <input
                                                type="radio"
                                                name={`option_${strategy._id}`}
                                                value="4"
                                                id={`${strategy._id}_4`}
                                                checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 4)}
                                                onChange={(e) => PlanSetinState(e.target.id)}
                                              />
                                              <label
                                                style={{
                                                  margin: "0 10px 0 5px",
                                                  fontSize: "1rem",
                                                }}
                                              >
                                                Yearly
                                              </label>
                                            </div>
                                          </div>


                                        </div>
                                      </>
                                    )
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>)








                      // Per Trade Code 
                      : formik.values.Service_Type ? (<div className="row mt-4">
                        <div class="input-block ">
                          <label>All Strategy</label>
                        </div>
                        {getAllStategy && getAllStategy.data.map((strategy) => (
                          strategy.Service_Type == formik.values.Service_Type && (
                            <div className={`col-lg-3 mt-2`} key={strategy._id}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-check custom-checkbox mb-3">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={strategy._id}
                                      name={strategy.strategy_name}
                                      value={strategy._id}
                                      checked={selectedCheckboxes && selectedCheckboxes.includes(strategy._id)}
                                      onChange={() => handleStrategyChange(strategy._id)}
                                      disabled={stgDiseble && stgDiseble.includes(strategy._id)}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={strategy._id}
                                    >
                                      {strategy.strategy_name}
                                    </label>


                                    {formik.values.licence == 2
                                      ?
                                      selectedCheckboxes.includes(strategy._id) && (
                                        <>
                                          <div
                                            className=""
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "center",
                                            }}
                                          >
                                            <div className="form-group d-flex justify-content-between m-3 border rounded p-2">
                                              <div className="d-flex align-items-center">
                                                <input
                                                  type="radio"
                                                  name={`option_${strategy._id}`}
                                                  value="1"
                                                  id={`${strategy._id}_1`}
                                                  checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 1)}
                                                  onChange={(e) => PlanSetinState(e.target.id)}
                                                />
                                                <label
                                                  style={{
                                                    margin: "0 10px 0 5px",
                                                    fontSize: "1rem",
                                                  }}
                                                >
                                                  Monthly
                                                </label>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <input
                                                  type="radio"
                                                  name={`option_${strategy._id}`}
                                                  value="2"
                                                  id={`${strategy._id}_2`}
                                                  checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 2)}
                                                  onChange={(e) => PlanSetinState(e.target.id)}
                                                />
                                                <label
                                                  style={{
                                                    margin: "0 10px 0 5px",
                                                    fontSize: "1rem",
                                                  }}
                                                >
                                                  Quarterly
                                                </label>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <input
                                                  type="radio"
                                                  name={`option_${strategy._id}`}
                                                  value="3"
                                                  id={`${strategy._id}_3`}
                                                  checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 3)}
                                                  onChange={(e) => PlanSetinState(e.target.id)}
                                                />
                                                <label
                                                  style={{
                                                    margin: "0 10px 0 5px",
                                                    fontSize: "1rem",
                                                  }}
                                                >
                                                  Halfyearly
                                                </label>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <input
                                                  type="radio"
                                                  name={`option_${strategy._id}`}
                                                  value="4"
                                                  id={`${strategy._id}_4`}
                                                  checked={selectedCheckboxesAndPlan && selectedCheckboxesAndPlan.some((item) => item.id === strategy._id && item.plan_id == 4)}
                                                  onChange={(e) => PlanSetinState(e.target.id)}
                                                />
                                                <label
                                                  style={{
                                                    margin: "0 10px 0 5px",
                                                    fontSize: "1rem",
                                                  }}
                                                >
                                                  Yearly
                                                </label>
                                              </div>
                                            </div>


                                          </div>
                                        </>
                                      )
                                      :
                                      ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        ))}

                      </div>) : ""}


                  </div>


                </>
              }
            />
            <ToastButton />
          </>
      }


    </>

  );
};
export default AddClient;
