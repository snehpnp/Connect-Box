import { useFormik } from "formik";
import { useState, useEffect } from "react";
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as valid_err from "../../../Utils/Common_Messages";

import { Email_regex, Mobile_regex, Name_regex } from "../../../Utils/Common_regex";
import { Add_Employee, GetEmployeeStrategy, GetEmployeeServices } from "../../../ReduxStore/Slice/Subadmin/Strategy";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const prfix = JSON.parse(localStorage.getItem("user_details")).prifix_key;
  const Role = JSON.parse(localStorage.getItem("user_details")).Role;


  const [AllGroupServices, setAllGroupServices] = useState({
    loading: true,
    data: [],
  });
  const [AllStrategy, setAllStrategy] = useState({
    loading: true,
    data: [],
  });

  const [groupId, setGroupId] = useState([]);
  const [StrategyId, setStrategyId] = useState([]);
  const [groupServiceCheck, setGroupServiceCheck] = useState(false);
  const [strategyCheck, setStrategyCheck] = useState(false);


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
      userName: "",
      email: "",
      password: "",
      phone: "",
      Strategy: false,
      select_strategy: [],
      gotodashboard: false,
      licence: false,
      detailsinfo: false,
      all: false,
      editemployee: false,
      addemployee: false,
      tradehistory: false,
      updateapikeys: false,
      groupservice: false,
      select_group_services: [],
      group: false,
      grouper_servcice: "",
      strateg_servcice: "",
      show_employee_users: false,
      show_all_users: false,
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
      if (!values.password) {
        errors.password = valid_err.PASSWORD_ERROR;
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
        FullName: values.fullName,
        Email: values.email,
        UserName: values.userName,
        password: values.password,
        PhoneNo: values.phone,
        parent_id: user_id,
        parent_role: Role || "SUBADMIN",
        prifix_key: prfix,
        Subadmin_permision_data: {
          employee_add: values.addemployee ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          Update_Api_Key: values.updateapikeys ? "1" : "0",
          show_employee_users: values.show_employee_users ? "1" : "0",
          show_all_users: values.show_all_users ? "1" : "0",
          employee_edit: values.editemployee ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          trade_history_old: values.tradehistory ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          detailsinfo: values.detailsinfo ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          strategy: StrategyId,
          group_services: groupId,
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
        await dispatch(Add_Employee(req)).unwrap()
          .then((response) => {
            if (response.status) {
              Swal.fire({
                title: "Create Successful!",
                text: response.msg,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              }).then(() => {
                navigate("/subadmin/employees");
              });
            }
            else {
              Swal.fire({
                title: "Error !",
                text: response.msg,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
              })

            }

          })
          .catch((err) => {
            console.log("Error in add employee", err)
          })

      }




    }
  })



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
      name: "userName",
      label: "User Name",
      type: "text",
      label_size: 6,
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
      name: "password",
      label: "Password",
      type: "password",
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
      name: "phone",
      label: "Phone Number",
      type: "dammy",
      label_size: 12,
      col_size: 12,
      disable: false,
    },
    {
      name: "all",
      label: "All Permission",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
    },
    {
      name: "addemployee",
      label: "Add Client",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.all || formik.values.addemployee ? true : false,
    },
    {
      name: "editemployee",
      label: "Edit Client",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.all || formik.values.editemployee ? true : false,
    },
    // {
    //   name: "tradehistory",
    //   label: "Trade History",
    //   type: "checkbox",
    //   label_size: 12,
    //   col_size: 3,
    //   check_box_true: formik.values.all || formik.values.tradehistory ? true : false,
    // },
    {
      name: "detailsinfo",
      label: "Full Info View",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.all || formik.values.detailsinfo ? true : false,
    },

    {
      name: "groupservice",
      label: "Group Service Permission",
      type: "checkbox",
      check_box_true: formik.values.all || formik.values.groupservice ? true : false,
      label_size: 12,
      col_size: 3,
    },

    {
      name: "Strategy",
      label: "Strategy Permission",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.all || formik.values.Strategy ? true : false,
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

    await dispatch(
      GetEmployeeStrategy(data))
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
      setGroupId([]);
      setStrategyId([]);
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





  const handleGroupChange = (event) => {
    const strategyId = event.target.value;



    

    if (event.target.checked) {
      setGroupId([...groupId, strategyId]);
    } else {
      setGroupId(groupId.filter((id) => id != strategyId));
    }

  };


  useEffect(() => {
    if (groupId.length > 1) {
      formik.setFieldValue("grouper_servcice", "");
    }
    if (StrategyId.length > 1) {
      formik.setFieldValue("grouper_servcice", "");
    }
  }, [groupId, StrategyId]);

  const handleStrategyChange = (event) => {
    const strategyId = event.target.value;

    
    if (event.target.checked) {
      setStrategyId([...StrategyId, strategyId]);
    } else {
      setStrategyId(StrategyId.filter((id) => id !== strategyId));
    }
  };


  useEffect(() => {
    if (StrategyId.length > 0) {
      setStrategyCheck(true)
    }
    else if (StrategyId.length == 0) {
      setStrategyCheck(false)
    }
    if (groupId.length > 0) {
      setGroupServiceCheck(true)
    }
    else if (groupId.length == 0) {
      setGroupServiceCheck(false)

    }
  }, [StrategyId, groupId])




  return (
    <>
      <AddForm
        fields={fields.filter(
          (fld) => !fld.showWhen || fld.showWhen(formik.values)
        )}
        page_title="Add New Employee"
        btn_name="Add"
        btn_name1="Cancel"
        btn_name1_route="/subadmin/employees"
        formik={formik}
        additional_field={
          <>
            {formik.values.groupservice ? (
              <>
                <h6>All Group Service</h6>
                {AllGroupServices.data.map((strategy) => (
                  <div className={`col-lg-2 mt-2`} key={strategy._id}>
                    <div className="row ">
                      <div className="col-lg-12 ">
                        <div className="form-check custom-checkbox ">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={strategy.name}
                            value={strategy._id}
                            onChange={(e) => handleGroupChange(e)}
                          />
                          <label
                            className="form-check-label"
                            for={strategy.name}
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
            {formik.values.Strategy ||
              formik.values.all ||
              formik.values.addemployee ||
              formik.values.editemployee ? (
              <>
                <h6 className="mt-3">All Strategy</h6>

                {AllStrategy.data.map((strategy) => (
                  <div className={`col-lg-2 mt-2`} key={strategy._id}>
                    <div className="row ">
                      <div className="col-lg-12 ">
                        <div className="form-check custom-checkbox ">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={strategy.strategy_name}
                            value={strategy._id}
                            onChange={(e) => handleStrategyChange(e)}
                          />
                          <label
                            className="form-check-label"
                            for={strategy.strategy_name}
                          >
                            {strategy.strategy_name}
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
    </>
  );
};

export default AddEmployee;
