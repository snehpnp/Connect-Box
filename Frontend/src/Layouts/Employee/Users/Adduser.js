import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import {   GET_ALL_SERVICES_GIVEN } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { AddUsers, Get_All_Broker, } from "../../../ReduxStore/Slice/Subadmin/UsersSlice";
import { Get_Permission } from '../../../ReduxStore/Slice/Employee/EmployeeSlice'
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import * as valid_err from "../../../Utils/Common_Messages";

import { Email_regex, Mobile_regex, Name_regex, } from "../../../Utils/Common_regex";

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  var subadmin_service_type1 = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type

  
  const [serviceName, setServiceName] = useState({
    loading: true,
    data: [],
  });
   
  const [getPermission, setPermission] = useState({
    loading: true,
    data: [],
    strategyName: [],
    groupService: []
  });

 

  
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedCheckboxesAndPlan, setSelectedCheckboxesAndPlan] = useState(
    []
  );
  const [getAllBroker, setAllBroker] = useState([]);



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
      disable: false,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },

    {
      name: "phone",
      label: "Phone Number",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "licence",
      label: "License Type",
      type: "select",
      options: [
        { label: "Demo", value: "1" },
        { label: "2 Day Live", value: "0" },
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
      disable: false,
      showWhen: (values) => subadmin_service_type1 == 1,

    },
    {
      name: "balance",
      label: "Balance",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
      showWhen: (values) => subadmin_service_type1 == 1 && values.licence === "2" && formik.values.Service_Type == 2,
    },
    {
      name: "broker",
      label: "Broker",
      type: "select",
      options:
        getAllBroker &&
        getAllBroker.map((item) => ({
          label: item.title,
          value: item.broker_id,
        })),
      showWhen: (values) => values.licence === "2" || values.licence === "0",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "demat_userid",
      label: "Demat UserId",
      type: "text",
      showWhen: (values) => values.broker === "2" && values.licence != "1",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "api_key",
      label: "Api Key",
      type: "text",
      showWhen: (values) => values.broker === "12",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "groupservice",
      label: "Group Service",
      type: "select",
      options:
      getPermission.groupService &&
      getPermission.groupService.map((item) => ({
          label: item.name,
          value: item.id,
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

      if (!values.broker && values.licence != 1) {
        errors.broker = "Please Select Broker ";
      }

      if (!values.licence) {
        errors.licence = "Please Select License Type";
      }

      if (!values.groupservice) {
        errors.groupservice = "Please select group service ";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        ProfileImg: ".",
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        license_type: values.licence,
        PhoneNo: values.phone,
        Balance: values.balance || null,
        subadmin_service_type: null,
        strategy_Percentage: null,
        Per_trade: null,
        Strategies: selectedCheckboxesAndPlan,
        parent_id: user_id,
        parent_role: Role ,
        demat_userid: values.demat_userid,
        group_service: values.groupservice,
        broker: values.broker,
        Service_Type: values.Service_Type,
        per_trade_value: values.per_trade_value || null,
        employee_id: values.Employees || null
      };

      await dispatch(AddUsers(req))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            Swal.fire({
              title: "Create Successful!",
              text: response.msg,
              icon: "success",
              timer: 1500,
              timerProgressBar: true
            });
            setTimeout(() => {
              navigate("/employee/allusers");
            }, 1500);
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  });

  const getpermission = async () => {
    const data = { id: user_id }
    await dispatch(Get_Permission(data)).unwrap()
      .then((response) => {
        if (response.status) {
          setPermission({
            loading: false,
            data: response.data,
            strategyName: response.strategyName,
            groupService: response.groupService,
          })
        }
        else {
          setPermission({
            loading: false,
            data: [],
            strategyName: [],
            groupService: [],

          })
        }
      })
      .catch((err) => {
        console.log("Error in fatching in permission ", err)
      })
  }

  useEffect(() => {
    getpermission();
  }, [])


 
 

 

  const getAllGroupServicesName = async () => {
    if (formik.values.groupservice) {
      var data = {
        id: formik.values.groupservice,
      };
      await dispatch(GET_ALL_SERVICES_GIVEN(data))
        .unwrap()
        .then((response) => {
          if (response.status) {
            setServiceName({
              loading: false,
              data: response.data,
            });
          } else {
            setServiceName({
              loading: false,
              data: [],
            });
          }
        })
        .catch((error) => {
          console.log("Erorre :", error);
        });
    }
  };
  useEffect(() => {
    getAllGroupServicesName();
  }, [formik.values.groupservice]);



   

  const AllBroker = async () => {
    await dispatch(Get_All_Broker())
      .unwrap()
      .then((response) => {
        if (response.status) {
          setAllBroker(response.data);
        } else {
          setAllBroker([]);
        }
      })
      .catch((error) => {
        console.log("Error Broker find Error :", error);
      });
  };

  const handleStrategyChange = (id) => {
    console.log("id :", id)
    if (selectedCheckboxes.includes(id)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkboxId) => checkboxId !== id)
      );
      setSelectedCheckboxesAndPlan((prevState) =>
        prevState.filter((item) => item.id !== id)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
      setSelectedCheckboxesAndPlan((prevState) => [
        ...prevState,
        { id: id, plan_id: "1" },
      ]);
    }
  };

  const PlanSetinState = (id) => {
    const strategyPlanMonth = id.split("_")[1];
    const checkboxId = id.split("_")[0];

    if (selectedCheckboxes.includes(checkboxId)) {
      setSelectedCheckboxesAndPlan((prevState) =>
        prevState.map((item) => {
          return item.id == checkboxId
            ? { ...item, plan_id: strategyPlanMonth }
            : item;
        })
      );
    }
  };

  useState(() => {
    AllBroker();
  }, []);


  return (

    <>
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        page_title="Add New User"
        btn_name="Add User"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/employee/allusers"}
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



            {subadmin_service_type1 == 2 ?
              (<div className="row mt-4">
                <div class="input-block ">
                  <label>All Strategies 1</label>
                </div>
                {getPermission.strategyName.map((strategy) => (
                  <div className={`col-lg-3 mt-2`} key={strategy.id}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-check custom-checkbox mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={strategy.strategy_name}
                            value={strategy.id}
                            onChange={() =>
                              handleStrategyChange(strategy.id)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={strategy.strategy_name}
                          >
                            {strategy.strategy_name}
                          </label>

                          {formik.values.licence == 1 || formik.values.licence == 0
                            ? ""
                            : selectedCheckboxes.includes(strategy.id) && (
                              <>
                                <div
                                 
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
                                        name={`option_${strategy.id}`}
                                        value="1"
                                        defaultChecked
                                        id={`${strategy.id}_1`}
                                        onChange={(e) =>
                                          PlanSetinState(e.target.id)
                                        }
                                      />
                                      <label
                                        style={{
                                          margin: "0 10px 0 5px",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        monthly{" "}
                                      </label>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <input
                                        type="radio"
                                        name={`option_${strategy.id}`}
                                        value="2"
                                        id={`${strategy.id}_2`}
                                        onChange={(e) =>
                                          PlanSetinState(e.target.id)
                                        }
                                      />
                                      <label
                                        style={{
                                          margin: "0 10px 0 5px",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        quarterly{" "}
                                      </label>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <input
                                        type="radio"
                                        name={`option_${strategy.id}`}
                                        value="3"
                                        id={`${strategy.id}_3`}
                                        onChange={(e) =>
                                          PlanSetinState(e.target.id)
                                        }
                                      />
                                      <label
                                        style={{
                                          margin: "0 10px 0 5px",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        halfyearly{" "}
                                      </label>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <input
                                        type="radio"
                                        name={`option_${strategy.id}`}
                                        value="3"
                                        id={`${strategy.id}_4`}
                                        onChange={(e) =>
                                          PlanSetinState(e.target.id)
                                        }
                                      />
                                      <label
                                        style={{
                                          margin: "0 10px 0 5px",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        yearly{" "}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>)
              :
              (<div className="row mt-4">
                <div class="input-block ">
                  <label>All Strategy</label>
                </div>
                {getPermission.strategyName.map((strategy) => (

                  strategy.Service_Type == formik.values.Service_Type && (
                    <div className={`col-lg-3 mt-2`} key={strategy.id}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-check custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={strategy.strategy_name}
                              value={strategy.id}
                              // defaultChecked={}
                              onChange={() => handleStrategyChange(strategy.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={strategy.strategy_name}
                            >
                              {strategy.strategy_name}
                            </label>

                            {formik.values.licence == 1 || formik.values.licence == 0 ? (
                              ""
                            ) : (
                              selectedCheckboxes.includes(strategy.id) && (
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
                                          name={`option_${strategy.id}`}
                                          value="1"
                                          defaultChecked
                                          id={`${strategy.id}_1`}
                                          onChange={(e) => PlanSetinState(e.target.id)}
                                        />
                                        <label
                                          style={{
                                            margin: "0 10px 0 5px",
                                            fontSize: "1rem",
                                          }}
                                        >
                                          monthly{" "}
                                        </label>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <input
                                          type="radio"
                                          name={`option_${strategy.id}`}
                                          value="2"
                                          id={`${strategy.id}_2`}
                                          onChange={(e) => PlanSetinState(e.target.id)}
                                        />
                                        <label
                                          style={{
                                            margin: "0 10px 0 5px",
                                            fontSize: "1rem",
                                          }}
                                        >
                                          quarterly{" "}
                                        </label>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <input
                                          type="radio"
                                          name={`option_${strategy.id}`}
                                          value="3"
                                          id={`${strategy.id}_3`}
                                          onChange={(e) => PlanSetinState(e.target.id)}
                                        />
                                        <label
                                          style={{
                                            margin: "0 10px 0 5px",
                                            fontSize: "1rem",
                                          }}
                                        >
                                          halfyearly{" "}
                                        </label>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <input
                                          type="radio"
                                          name={`option_${strategy.id}`}
                                          value="3"
                                          id={`${strategy.id}_4`}
                                          onChange={(e) => PlanSetinState(e.target.id)}
                                        />
                                        <label
                                          style={{
                                            margin: "0 10px 0 5px",
                                            fontSize: "1rem",
                                          }}
                                        >
                                          yearly{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}

              </div>)}

          </>
        }
      />
      <ToastButton />
    </>

  );
};
export default AddClient;
