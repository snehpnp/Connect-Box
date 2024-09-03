import { useDispatch} from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BalanceGetbyId } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import {
  GetAll_Group_Servics,
  GET_ALL_SERVICES_GIVEN,
  Get_All_Employee_Names,
} from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { GetSubStrategys } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import {
  AddUsers,
  Get_All_Broker,
} from "../../../ReduxStore/Slice/Subadmin/UsersSlice";
import Loader from "../../../Utils/Loader";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import * as valid_err from "../../../Utils/Common_Messages";

import {
  Email_regex,
  Mobile_regex,
  Name_regex,
} from "../../../Utils/Common_regex";

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;

  var subadmin_service_type1 = JSON.parse(
    localStorage.getItem("user_details")
  ).subadmin_service_type;


  const [balance,setBalanace] = useState("")

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
        errors.fullName = valid_err.INVALID_ERROR;
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
        parent_role: Role || "SUBADMIN",
        demat_userid: values.demat_userid,
        group_service: values.groupservice,
        broker: values.broker,
        Service_Type: values.Service_Type,
        per_trade_value: values.per_trade_value || null,
        employee_id: values.Employees || null,
      };
 
      await dispatch(AddUsers(req))
        .unwrap()
        .then(async (response) => {
          if(balance <= 0){
            Swal.fire({
                title: "Insufficient Balance",
                icon: "error",
                timerProgressBar: true,
            });
        
            return;
        }
          if (response.status) {
            
            Swal.fire({
              title: "Create Successful!",
              text: response.msg,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              navigate("/subadmin/users");
            }, 1500);
          } else {
            Swal.fire({
              title: "Error",
              text: response.msg,
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  });



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
      showWhen: (values) =>
        subadmin_service_type1 == 1 &&
        values.licence === "2" &&
        formik.values.Service_Type == 2,
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
      name: "api_key",
      label:
        formik.values.broker == 19
          ? "Api Key"
          : formik.values.broker == 4
          ? "App Key"
          : formik.values.broker == 7
          ? "Consumer Key"
          : formik.values.broker == 9
          ? "Vendor Key"
          : formik.values.broker == 8
          ? "App Key"
          : formik.values.broker == 10
          ? "App Key"
          : "Api Key",
      type: "text",
      showWhen: (values) =>
        values.broker === "4" ||
        values.broker === "7" ||
        values.broker === "8" ||
        values.broker === "9" ||
        values.broker === "10" ||
        values.broker === "11" ||
        values.broker === "12" ||
        values.broker === "14" ||
        values.broker === "15" ||
        values.broker === "6" ||
        values.broker === "19",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "client_code",
      label:
        formik.values.broker == 21
          ? "CLIENT CODE"
          : formik.values.broker == 1
          ? "User"
          : formik.values.broker == 4
          ? "Client Code"
          : formik.values.broker == 7
          ? "User Name"
          : formik.values.broker == 9
          ? "Vander Id"
          : formik.values.broker == 11
          ? "Client Code"
          : formik.values.broker == 11
          ? "client_code"
          : "User Id",
      type: "text",
      showWhen: (values) =>
        values.broker === "1" ||
        values.broker === "5" ||
        values.broker === "4" ||
        values.broker === "7" ||
        values.broker === "9" ||
        values.broker === "11" ||
        values.broker === "6" ||
        values.broker === "21",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "demat_userid",
      label:
        formik.values.broker == 9
          ? "User Id"
          : formik.values.broker == 2
          ? "Demat User ID"
          : "",
      type: "text",
      showWhen: (values) => values.broker === "9" || values.broker === "2",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "app_id",
      label:
        formik.values.broker == 21
          ? "MPIN"
          : formik.values.broker == 1
          ? "Verification Code"
          : formik.values.broker == 5
          ? "Password"
          : formik.values.broker == 7
          ? "Demat Password"
          : formik.values.broker == 11
          ? "Password"
          : formik.values.broker == 13
          ? "App Id"
          : formik.values.broker == 9
          ? "Password"
          : formik.values.broker == 14
          ? "User Id "
          : "App Id",
      type: "text",
      showWhen: (values) =>
        values.broker === "1" ||
        values.broker === "3" ||
        values.broker === "5" ||
        values.broker === "7" ||
        values.broker === "9" ||
        values.broker === "11" ||
        values.broker === "13" ||
        values.broker === "14" ||
        values.broker == "21",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "app_key",
      label: formik.values.broker == 5 || 6 ? "App Key" : "",
      type: "text",
      showWhen: (values) => values.broker === "5",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "api_secret",
      label:
        formik.values.broker == 1
          ? "Password Code"
          : formik.values.broker == 5
          ? "DOB"
          : formik.values.broker == 7
          ? "Consumer Secret"
          : formik.values.broker == 9
          ? "Encryption Secret Key"
          : formik.values.broker == 10
          ? "Api Secret Key"
          : formik.values.broker == 11
          ? "2FA"
          : formik.values.broker == 14
          ? "Encryption Key"
          : "Api Secret",
      type: "text",
      showWhen: (values) =>
        values.broker === "1" ||
        // values.broker === '2' ||
        values.broker === "3" ||
        values.broker === "5" ||
        values.broker === "6" ||
        values.broker === "7" ||
        values.broker === "8" ||
        values.broker === "9" ||
        values.broker === "10" ||
        values.broker === "11" ||
        values.broker === "13" ||
        values.broker === "14" ||
        values.broker === "15" ||
        values.broker === "19",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "api_type",
      label:
        formik.values.broker == 5
          ? "DOB"
          : formik.values.broker == 7
          ? "Trade Api Password"
          : formik.values.broker == 9
          ? "Encryption IV"
          : "Api Secret",
      type: "text",
      showWhen: (values) => values.broker === "7" || values.broker === "9",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "groupservice",
      label: "Group Service",
      type: "select",
      options:
        allGroupService.data &&
        allGroupService.data.map((item) => ({
          label: item.name,
          value: item._id,
        })),
      label_size: 12,
      col_size: 6,
      disable: false,
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



  const getAllGroupService = async () => {
    try {
      var data = { id: user_id };
      const response = await dispatch(GetAll_Group_Servics(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setAllGroupService({
          loading: false,
          data: formattedData,
        });
      } else {
        setAllGroupService({
          loading: false,
          data: [],
        });
      }
    } catch (error) {
      console.log("Error", error);
      setAllGroupService({
        loading: true,
        data: [],
      });
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
    getAllEmployeeName();
    getAllGroupService();
  }, []);



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

  const GetAllStrategy = async () => {
    var data = { id: user_id, key: "1" };
    await dispatch(GetSubStrategys(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setgetallStrategy({
            loading: false,
            data: response.data,
          });
        } else {
          setgetallStrategy({
            loading: false,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error Stategy finding Error", error);
      });
  };

  useState(() => {
    GetAllStrategy();
  }, []);

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





  //checking  blance 
  const getCompanyData = async () => {
    try {
      var data = { id: user_id, subadmin_service_type: subadmin_service_type1 || 0 }
      const response = await dispatch(BalanceGetbyId(data)).unwrap();

      if (response.status) {
          
           setBalanace(response.data[0].Balance)

      } else {
         console.log("err")
      }

    } catch (error) {
      console.log("Error", error);
     
    }
  };

 

  useEffect(()=>{
    getCompanyData()
  },[])




  return (
    <>
      {getAllStategy.loading ? (
        <Loader />
      ) : (
        <>
          <AddForm
            fields={fields.filter(
              (field) => !field.showWhen || field.showWhen(formik.values)
            )}
            page_title="Add New User"
            btn_name="Add User"
            btn_name1="Cancel"
            formik={formik}
            btn_name1_route={"/subadmin/users"}
            additional_field={
              <>
                {serviceName.data.length > 0 ? (
                  <div className="input-block ">
                    {" "}
                    <label>All Group Service</label>{" "}
                  </div>
                ) : (
                  ""
                )}
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

                {subadmin_service_type1 == 2 ? (
                  <div className="row mt-4">
                    <div className="input-block ">
                      <label>All Strategies</label>
                    </div>
                    {getAllStategy.data.map((strategy) => (
                      <div className={`col-lg-3 mt-2`} key={strategy._id}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-check custom-checkbox ">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name={strategy.strategy_name}
                                value={strategy._id}
                                onChange={() =>
                                  handleStrategyChange(strategy._id)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={strategy.strategy_name}
                              >
                                {strategy.strategy_name}
                              </label>

                              {formik.values.licence == 1 ||
                              formik.values.licence == 0
                                ? ""
                                : selectedCheckboxes.includes(strategy._id) && (
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
                                              defaultChecked
                                              id={`${strategy._id}_1`}
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
                                              name={`option_${strategy._id}`}
                                              value="2"
                                              id={`${strategy._id}_2`}
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
                                              name={`option_${strategy._id}`}
                                              value="3"
                                              id={`${strategy._id}_3`}
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
                                              name={`option_${strategy._id}`}
                                              value="3"
                                              id={`${strategy._id}_4`}
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
                  </div>
                ) : (
                  <div className="row mt-4">
                    <div className="input-block ">
                      <label>All Strategy</label>
                    </div>
                    {getAllStategy.data.map(
                      (strategy) =>
                        strategy.Service_Type == formik.values.Service_Type && (
                          <div className={`col-lg-3 mt-2`} key={strategy._id}>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-check custom-checkbox mb-3">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={strategy.strategy_name}
                                    value={strategy._id}
                                    // defaultChecked={}
                                    onChange={() =>
                                      handleStrategyChange(strategy._id)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={strategy.strategy_name}
                                  >
                                    {strategy.strategy_name}
                                  </label>

                                  {formik.values.licence == 1 ||
                                  formik.values.licence == 0
                                    ? ""
                                    : selectedCheckboxes.includes(
                                        strategy._id
                                      ) && (
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
                                                  defaultChecked
                                                  id={`${strategy._id}_1`}
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
                                                  name={`option_${strategy._id}`}
                                                  value="2"
                                                  id={`${strategy._id}_2`}
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
                                                  name={`option_${strategy._id}`}
                                                  value="3"
                                                  id={`${strategy._id}_3`}
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
                                                  name={`option_${strategy._id}`}
                                                  value="3"
                                                  id={`${strategy._id}_4`}
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
                        )
                    )}
                  </div>
                )}
              </>
            }
          />
          <ToastButton />
        </>
      )}
    </>
  );
};
export default AddClient;
