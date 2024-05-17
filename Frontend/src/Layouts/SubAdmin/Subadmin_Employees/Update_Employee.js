import { useFormik } from "formik";
import { useState, useEffect } from "react";
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../Utils/Loader";
import * as valid_err from "../../../Utils/Common_Messages";
import { Email_regex, Mobile_regex, Name_regex } from "../../../Utils/Common_regex";

import {
  Update_Employee,
  GetEmployeeByID,
  GetEmployeeStrategy,
  GetEmployeeServices,
} from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { useParams } from "react-router-dom";

const Edit_Employee = () => {
  const { id } = useParams();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const prfix = JSON.parse(localStorage.getItem("user_details")).prifix_key;
  const role = JSON.parse(localStorage.getItem("user_details")).Role;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkedStrategies, setCheckedStrategies] = useState([]);
  const [checkedGroupServices, setCheckedGroupServices] = useState([]);


  const [selectedStrategyIds, setSelectedStrategyIds] = useState([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [state, setstate] = useState([]);
  const [state1, setstate1] = useState([]);

  const [groupServiceCheck, setGroupServiceCheck] = useState(false);
  const [strategyCheck, setStrategyCheck] = useState(false);


  const [AllGroupServices, setAllGroupServices] = useState({
    loading: true,
    data: [],
  });



  const [AllStrategy, setAllStrategy] = useState({
    loading: true,
    data: [],
  });
  const [UserData, setUserData] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(GetEmployeeByID({ id })).unwrap();
        if (response.status) {
          toast.success("Data Retrieved Successfully");
          setUserData({
            loading: true,
            data: response.data,
          });
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error fetching user data");
      }
    };

    fetchData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: '',
      email: "",
      password: "",
      phone: "",
      Strategy: false,
      select_strategy: [],
      detailsinfo: false,
      all: false,
      editemployee: false,
      addemployee: false,
      tradehistory: false,
      updateapikeys: false,
      groupservice: false,
      select_group_services: [],
      group: false,
      show_all_users: false,
      show_employee_users: false,
      grouper_servcice: "",
      strateg_servcice: "",
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
      if (!values.userName) {
        errors.userName = valid_err.USERNAME_ERROR;
      }
      if (!values.password) {
        errors.password = valid_err.PASSWORD_ERROR;
      }

      if (values.updateapikeys && (!values.show_employee_users && !values.show_all_users)) {
        errors.show_employee_users = "Select show employee or show users";
        errors.show_all_users = "Select show employee or show users";
      }

      if (!values.phone) {
        errors.phone = valid_err.CONTACT_ERROR;
      } else if (!isValidContact(values.phone)) {
        errors.phone = valid_err.INVALID_CONTACT_ERROR;
      }

      if (values.Strategy) {
        if (!values.addemployee && !values.editemployee) {
          errors.addemployee = "select Add Client Also";
          errors.editemployee = "select Edit Client Also";
        }
      }

      if (values.groupservice) {
        if (!values.addemployee && !values.editemployee) {
          errors.addemployee = "select Add Client Also";
          errors.editemployee = "select Edit Client Also";
        }
      }
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        id: id,
        FullName: values.fullName,
        Email: values.email,
        UserName: values.userName,
        Password: values.password,
        PhoneNo: values.phone,
        Role: "EMPLOYEE",
        parent_role: role,
        parent_id: user_id,
        id: id,
        Subadmin_permision_data: {
          employee_add: values.addemployee ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          Update_Api_Key: values.updateapikeys ? "1" : "0",
          show_employee_users: values.show_employee_users ? "1" : "0",
          show_all_users: values.show_all_users ? "1" : "0",
          employee_edit: values.editemployee ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          trade_history_old: values.tradehistory ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          detailsinfo: values.detailsinfo ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          strategy: values.Strategy ? selectedStrategyIds : [],
          group_services: values.groupservice ? selectedGroupIds : [],
        },
      };



      if (!groupServiceCheck && formik.values.groupservice == 1 || !strategyCheck && formik.values.Strategy) {
        Swal.fire({
          title: "Error",
          text: "Select at least one group and strategy",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        })
        return
      }
      else {

        if (values.password.trim() !== "") {
          req.Password = values.password;
        }

        try {
          const response = await dispatch(Update_Employee(req)).unwrap();
          if (response.status) {
            Swal.fire({
              title: "Update Successful!",
              text: response.msg,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            }).then(() => {
              navigate("/subadmin/employees");
            });
          }
        } catch (error) {
          console.log("Error:", error);
        }

      }


    },
  });




  useEffect(() => {
    formik.setFieldValue("fullName", UserData.data[0] && UserData.data[0].FullName)
    formik.setFieldValue("userName", UserData.data[0] && UserData.data[0].UserName)
    formik.setFieldValue("email", UserData.data[0] && UserData.data[0].Email)
    formik.setFieldValue("password", UserData.data[0] && UserData.data[0].Otp)
    formik.setFieldValue("phone", UserData.data[0] && UserData.data[0].PhoneNo)
    formik.setFieldValue("updateapikeys", UserData.data[0] && UserData.data[0].subadmin_permissions[0].Update_Api_Key == 1 ? true : false)
    formik.setFieldValue("all", UserData.data[0] && UserData.data[0].subadmin_permissions[0].all == 1 ? true : false)
    formik.setFieldValue("addemployee", UserData.data[0] && UserData.data[0].subadmin_permissions[0].employee_add == 1 ? true : false)
    formik.setFieldValue("editemployee", UserData.data[0] && UserData.data[0].subadmin_permissions[0].employee_edit == 1 ? true : false)
    formik.setFieldValue("tradehistory", UserData.data[0] && UserData.data[0].subadmin_permissions[0].trade_history_old == 1 ? true : false)
    formik.setFieldValue("detailsinfo", UserData.data[0] && UserData.data[0].subadmin_permissions[0].detailsinfo == 1 ? true : false)
    formik.setFieldValue("groupservice", UserData.data[0] && UserData.data[0].subadmin_permissions[0].group_services.length > 0 ? true : false)
    formik.setFieldValue("Strategy", UserData.data[0] && UserData.data[0].subadmin_permissions[0].strategy.length > 0 ? true : false)
    formik.setFieldValue("show_all_users", UserData.data[0] && UserData.data[0].subadmin_permissions[0].show_all_users == 1 ? true : false)
    formik.setFieldValue("show_employee_users", UserData.data[0] && UserData.data[0].subadmin_permissions[0].show_employee_users == 1 ? true : false)
  }, [UserData.data])


  useEffect(() => {
    if (formik.values.all) {
      formik.setFieldValue("addemployee", true);
      formik.setFieldValue("editemployee", true);
      formik.setFieldValue("groupservice", true);
      formik.setFieldValue("Strategy", true);
      formik.setFieldValue("detailsinfo", true);
      formik.setFieldValue("tradehistory", true);
      formik.setFieldValue("updateapikeys", false);
      formik.setFieldValue("show_all_users", false);
      formik.setFieldValue("show_employee_users", false);
    }
    else if (!formik.values.all) {
      formik.setFieldValue("addemployee", false);
      formik.setFieldValue("editemployee", false);
      formik.setFieldValue("groupservice", false);
      formik.setFieldValue("Strategy", false);
      formik.setFieldValue("detailsinfo", false);
      formik.setFieldValue("tradehistory", false);
    }
  }, [formik.values.all]);


  useEffect(() => {
    if (formik.values.updateapikeys) {
      formik.setFieldValue("addemployee", false);
      formik.setFieldValue("all", false);
      formik.setFieldValue("editemployee", false);
      formik.setFieldValue("groupservice", false);
      formik.setFieldValue("Strategy", false);
      formik.setFieldValue("detailsinfo", false);
      formik.setFieldValue("tradehistory", false);
    }
    else {
      formik.setFieldValue("show_all_users", false);
      formik.setFieldValue("show_employee_users", false);
    }
  }, [formik.values.updateapikeys]);




  useEffect(() => {


    if (
      formik.values.addemployee || formik.values.editemployee || formik.values.Strategy || formik.values.groupservice || formik.values.detailsinfo || formik.values.tradehistory) {
      formik.setFieldValue("updateapikeys", false);
      setstate([]);
      setstate1([]);
    }

    if (formik.values.show_employee_users) {
      // formik.setFieldValue("show_employee_users", true);
      formik.setFieldValue("show_all_users", false);

    }
    if (formik.values.show_all_users) {
      formik.setFieldValue("show_employee_users", false);
      // formik.setFieldValue("show_all_users", true);

    }

    if (formik.values.addemployee) {
      formik.setFieldValue("groupservice", true);
      formik.setFieldValue("Strategy", true);
      return
    }
    if (formik.values.Strategy) {
      formik.setFieldValue("Strategy", true);
      return
    }
    if (formik.values.groupservice) {
      formik.setFieldValue("groupservice", true);
      return
    }

    if (!formik.values.Strategy) {
      setStrategyCheck(false)
    }
    if (!formik.values.groupservice) {
      setGroupServiceCheck(false)
    }


    if (formik.values.editemployee) {
      formik.setFieldValue("groupservice", true);
      formik.setFieldValue("Strategy", true);

    }

    else if (!formik.values.addemployee) {
      formik.setFieldValue("groupservice", false);
      formik.setFieldValue("Strategy", false);
      formik.setFieldValue("strateg_servcice", "");
      formik.setFieldValue("grouper_servcice", "");

    } else {
      formik.setFieldValue("groupservice", false);
      formik.setFieldValue("Strategy", false);

      return;
    }
  }, [formik.values.editemployee, formik.values.addemployee, formik.values.detailsinfo, formik.values.tradehistory, formik.values.Strategy, formik.values.groupservice, formik.values.show_employee_users, formik.values.show_all_users]);


  const fields = [
    {
      name: "fullName",
      label: "FullName",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
    },
    {
      name: "userName",
      label: "UserName",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: true,
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
      name: "password",
      label: "Password",
      type: "password",
      label_size: 12,
      col_size: 6,
      disable: false,
      placeholder: "Enter new password",
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
      name: "phone",
      label: "Phone Number",
      type: "dammy",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "all",
      label: "All Permissions",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
    },
    {
      name: "addemployee",
      label: "Add Employee",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true:
        formik.values.all || formik.values.addemployee ? true : false,
    },
    {
      name: "editemployee",
      label: "Edit Employee",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true:
        formik.values.all || formik.values.editemployee ? true : false,
    },


    // {
    //   name: "tradehistory",
    //   label: "Trade History",
    //   type: "checkbox",
    //   label_size: 12,
    //   col_size: 3,
    //   check_box_true:
    //     formik.values.all || formik.values.tradehistory ? true : false,
    // },
    {
      name: "detailsinfo",
      label: "Full Info View",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true:
        formik.values.all || formik.values.detailsinfo ? true : false,
    },
    {
      name: "groupservice",
      label: "Group Service Permission",
      type: "checkbox",
      check_box_true:
        formik.values.all || formik.values.groupservice ? true : false,
      label_size: 12,
      col_size: 3,
    },
    {
      name: "Strategy",
      label: "Strategy Permission",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true:
        formik.values.all || formik.values.Strategy ? true : false,
    },

    {
      name: "updateapikeys",
      label: "Update Client API Key",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.updateapikeys ? true : false,
    },
    {
      name: "show_all_users",
      label: "Show All Users",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.show_all_users ? true : false,
      showWhen: (values) => formik.values.updateapikeys == 1,
    },
    {
      name: "show_employee_users",
      label: "Show Employee Users",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.show_employee_users ? true : false,
      showWhen: (values) => formik.values.updateapikeys == 1,
    },
  ];


  const data = async () => {
    const data = { id: user_id }

    await dispatch(GetEmployeeStrategy(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setAllStrategy({
            loading: false,
            data: response.data,
          });
        }
      });
    await dispatch(GetEmployeeServices(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setAllGroupServices({
            loading: false,
            data: response.data,
          });
        }
      });
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    if (UserData.data !== undefined && UserData.data && UserData.data.length > 0) {
      const userStrategyIds = UserData.data[0].subadmin_permissions[0].strategy;
      setSelectedStrategyIds(userStrategyIds);

      const usergropupyIds = UserData.data[0].subadmin_permissions[0].group_services;
      setSelectedGroupIds(usergropupyIds);
    }
  }, [UserData.data]);

  //  For Select Strategy Change
  useEffect(() => {
    if (UserData.data !== undefined && UserData.data && UserData.data.length > 0) {
      const userStrategyIds =
        UserData.data !== undefined && UserData.data[0].subadmin_permissions[0].strategy;
      const initialCheckedStrategies = AllStrategy.data.map((strategy) => {
        return {
          id: strategy._id,
          name: strategy.strategy_name,
          checked: userStrategyIds.includes(strategy._id),
        };
      });
      setCheckedStrategies(initialCheckedStrategies);
    }
  }, [UserData.data, AllStrategy.data]);

  const handleStrategyChange = (event) => {
    var strategyId = event.target.value;




    setCheckedStrategies((prevStrategies) => {
      return prevStrategies.map((strategy) => {
        if (strategy.id === strategyId) {
          return { ...strategy, checked: !strategy.checked };
        }
        return strategy;
      });
    });
    setSelectedStrategyIds((prevIds) => {
      if (prevIds.includes(strategyId)) {
        let abc = prevIds.filter((id) => id !== strategyId);

        return abc;
      } else {
        return [...prevIds, strategyId];
      }
    });
  };





  //  For Select Group Change Change
  useEffect(() => {
    if (UserData.data !== undefined && UserData.data && UserData.data.length > 0) {
      const userStrategyIds =
        UserData.data !== undefined &&
        UserData.data[0].subadmin_permissions[0].group_services;
      const initialCheckedStrategies =
        AllGroupServices.data &&
        AllGroupServices.data.map((strategy) => {
          return {
            id: strategy._id,
            name: strategy.name,
            checked: userStrategyIds.includes(strategy._id),
          };
        });
      setCheckedGroupServices(initialCheckedStrategies);

      if (UserData.data && UserData.data[0].subadmin_permissions[0].strategy.length > 0) {

        setStrategyCheck(true)
      }


      // if (UserData.data && UserData.data[0].subadmin_permissions[0].group_services.length > 0) {
      //   setGroupServiceCheck(true)
      // }

    }
  }, [UserData.data, AllGroupServices.data]);

  const handleGroupChange = (event) => {
    const strategyId = event.target.value;

    setCheckedGroupServices((prevStrategies) => {
      return prevStrategies.map((strategy) => {
        if (strategy.id === strategyId) {
          return { ...strategy, checked: !strategy.checked };
        }
        return strategy;
      });
    });

    setSelectedGroupIds((prevIds) => {
      if (prevIds.includes(strategyId)) {
        return prevIds.filter((id) => id !== strategyId);
      } else {
        return [...prevIds, strategyId];
      }
    });
  };


  useEffect(() => {
    if (selectedStrategyIds.length > 0) {
      setStrategyCheck(true)
    }
    else if (selectedStrategyIds.length == 0) {
      setStrategyCheck(false)
    }
    if (selectedGroupIds.length > 0) {
      setGroupServiceCheck(true)
    }
    else if (selectedGroupIds.length == 0) {
      setGroupServiceCheck(false)

    }
  }, [selectedStrategyIds, selectedGroupIds])

  return (

    <>
      {
        UserData.loading ? (
          <AddForm
            fields={fields.filter(
              (fld) => !fld.showWhen || fld.showWhen(formik.values)
            )}
            page_title="Update Employee"
            btn_name="Update"
            btn_name1="Cancel"
            btn_name1_route="/subadmin/employees"
            formik={formik}
            additional_field={
              <>
                {formik.values.groupservice ? (
                  <>
                    <h6 className="fw-bold mt-3 text-decoration-underline">
                      All Group Service
                    </h6>

                    {checkedGroupServices.map((strategy) => (
                      <div className={`col-lg-2 mt-2 `} key={strategy.id}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name={strategy.id}
                                value={strategy.id}
                                onChange={(e) => handleGroupChange(e)}
                                checked={strategy.checked}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={strategy.id}
                              >
                                {strategy.name}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!groupServiceCheck ?
                      <div style={{ color: 'red' }}>
                        <p>You must select a Group Service from the list</p>
                      </div> : ''}
                  </>
                ) : (
                  ""
                )}
                {formik.values.Strategy ? (
                  <>
                    <h6 className="fw-bold mt-3 text-decoration-underline">
                      All Strategy
                    </h6>

                    {checkedStrategies.map((strategy) => (
                      <div className={`col-lg-2 mt-2`} key={strategy.id}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-check custom-checkbox mb-3">
                              <input
                                type="checkbox"
                                className="form-check-input "
                                name={strategy.id}
                                value={strategy.id}
                                onChange={(e) => handleStrategyChange(e)}
                                checked={strategy.checked}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={strategy.id}
                              >
                                {strategy.name}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {!strategyCheck ?
                      <div style={{ color: 'red' }}>
                        <p>You must select a Group Service from the list</p>
                      </div> : ''}
                  </>
                ) : (
                  ""
                )}
              </>
            }
          />
        ) : <Loader />}



    </>
  );
};

export default Edit_Employee;
