import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import {  GetAll_Group_Servics,  GET_ALL_SERVICES_GIVEN } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { GetSubStrategys } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import {  AddUsers,  Get_All_Broker, } from "../../../ReduxStore/Slice/Subadmin/UsersSlice";
import Loader from "../../../Utils/Loader";

import { useFormik } from "formik";
import { useState, useEffect } from "react";

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  var subadmin_service_type = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type
  console.log("subadmin_service_type", subadmin_service_type)

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

  // 0 = 2 days 1= Demo 2 =Live

  const fields = [
    {
      name: "profile_Img",
      label: "profile_img",
      type: "file",
      label_size: 12,
      col_size: 12,
      disable: false,
    },
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
      label: "Lincense Type",
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
      type: "select",
      options: [
        { label: "Fixed", value: "1" },
        { label: "Per Trade", value: "2" },

      ],
      showWhen: (values) => subadmin_service_type == 1,
      label_size: 12,
      col_size: 6,
      disable: false,
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
        allGroupService.data &&
        allGroupService.data.map((item) => ({
          label: item.name,
          value: item._id,
        })),
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];

  const formik = useFormik({
    initialValues: {
      profile_Img: null,
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
    },
    validate: (values) => {
      let errors = {};
      if (!values.fullName) {
        errors.fullName = "Full Name is required";
      }

      if (!values.username) {
        errors.username = "Username is required";
      }
      if (!values.broker && values.licence != 1) {
        errors.broker = "Please Select Broker ";
      }

      if (!values.licence) {
        errors.licence = "licence  is required";
      }

      if (!values.groupservice) {
        errors.groupservice = "Please select group service ";
      }
      if (!values.email) {
        errors.email = "Please enter your email address.";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
      }
      if (!values.phone) {
        errors.phone = "Please enter your phone number.";
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Please enter a valid 10-digit phone number.";
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
        Balance: null,
        subadmin_service_type: null,
        strategy_Percentage: null,
        Per_trade: null,
        password: null,
        Strategies: selectedCheckboxesAndPlan,
        parent_id: user_id,
        parent_role: Role || "SUBADMIN",
        demat_userid: values.demat_userid,
        group_service: values.groupservice,
        broker: values.broker,
      };

      await dispatch(AddUsers(req))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.msg);
            setTimeout(() => {
              navigate("/subadmin/users");
            }, 1000);
          } else {
            toast.error(response.msg);
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  });


  console.log(formik.values.Service_Type)
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

  useEffect(() => {
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
    var data = { id: user_id };
    await dispatch(GetSubStrategys(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setgetallStrategy({
            loading: true,
            data: response.data,
          });
        } else {
          setgetallStrategy({
            loading: true,
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

  return (
    <>
      {getAllStategy.data.length == 0 ? (
        <Loader />
      ) : (
        <>
          <AddForm
            fields={fields.filter(
              (field) => !field.showWhen || field.showWhen(formik.values)
            )}
            page_title="Add User"
            btn_name="Add User"
            btn_name1="Cancel"
            formik={formik}
            btn_name1_route={"/subadmin/users"}
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
                {subadmin_service_type == 2 ?
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

                              {formik.values.licence == 1
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
                  </div>) : formik.values.Service_Type ? (<div className="row mt-4">
                    <div class="input-block ">
                      <label>All Strategy</label>
                    </div>
                    {getAllStategy.data.map((strategy) => (
                      strategy.Service_Type === formik.values.Service_Type && (
                        <div className={`col-lg-3 mt-2`} key={strategy._id}>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-check custom-checkbox mb-3">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name={strategy.strategy_name}
                                  value={strategy._id}
                                  onChange={() => handleStrategyChange(strategy._id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={strategy.strategy_name}
                                >
                                  {strategy.strategy_name}
                                </label>

                                {formik.values.licence == 1 ? (
                                  ""
                                ) : (
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
                                              defaultChecked
                                              id={`${strategy._id}_1`}
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
                                              name={`option_${strategy._id}`}
                                              value="2"
                                              id={`${strategy._id}_2`}
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
                                              name={`option_${strategy._id}`}
                                              value="3"
                                              id={`${strategy._id}_3`}
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
                                              name={`option_${strategy._id}`}
                                              value="3"
                                              id={`${strategy._id}_4`}
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

                  </div>) : ""}

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
