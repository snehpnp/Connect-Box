import { useFormik } from "formik";
import { useState, useEffect } from "react";
import AddForm from "../../../Components/ExtraComponents/forms/AddForm";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

  const [state, setstate] = useState([]);
  const [state1, setstate1] = useState([]);


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
      strateg_servcice: ""
    },
    validate: (values) => {
      let errors = {};
      if (!values.fullName) {
        errors.fullName = "Enter Full Name";
      }
      if (!values.email) {
        errors.email = "Enter Email ID";
      }
      if (!values.userName) {
        errors.userName = "Enter userName";
      }
      if (!values.password) {
        errors.password = "Enter Password";
      }
      if (!values.phone) {
        errors.phone = "Enter Phone Number";
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

      


      if ((values.addemployee || values.editemployee) && values.groupservice && state.length === 0) {
        errors.grouper_servcice = "You must select a Group Service from the list";
      }
      if ((values.addemployee || values.editemployee) && values.Strategy && state1.length === 0) {
        errors.strateg_servcice = "You must select a Strategy from the list";
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
          employee_edit: values.editemployee ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          trade_history_old: values.tradehistory ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          detailsinfo: values.detailsinfo ? "1" : values.all ? "1" : values.updateapikeys ? "0" : "0",
          strategy: state1,
          group_services: state,
        },
      };


      return

      try {
        const response = await dispatch(Add_Employee(req)).unwrap();
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
      } catch (error) {
        console.log("Error:", error);
      }
    },
  });



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
    {
      name: "tradehistory",
      label: "Trade History",
      type: "checkbox",
      label_size: 12,
      col_size: 3,
      check_box_true: formik.values.all || formik.values.tradehistory ? true : false,
    },
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
  ];

  const data = async () => {
    await dispatch(
      GetEmployeeStrategy({
        req: {},
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status) {
          setAllStrategy({
            loading: false,
            data: response.data,
          });
        }
      });

    await dispatch(GetEmployeeServices())
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
  }, [formik.values.updateapikeys]);

  useEffect(() => {

     
    if (
      formik.values.addemployee || formik.values.editemployee || formik.values.Strategy || formik.values.groupservice || formik.values.detailsinfo || formik.values.tradehistory  ) {
      formik.setFieldValue("updateapikeys", false);
      setstate([]);
      setstate1([]); 
    }

    if (formik.values.addemployee ) {
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
   

    if (formik.values.editemployee ) {
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
  }, [formik.values.editemployee, formik.values.addemployee, formik.values.detailsinfo, formik.values.tradehistory, formik.values.Strategy, formik.values.groupservice]);



  const handleGroupChange = (event) => {
    const strategyId = event.target.value;
   
    if (event.target.checked) {
      setstate([...state, strategyId]);
    } else {
      setstate(state.filter((id) => id != strategyId));
    }
    
  };
 

  // useEffect(() => {
   
    
  //   if (state.length > 1) {
  //     formik.setFieldValue("grouper_servcice", "");
  //   }
  //   if (state1.length > 1) {
  //     formik.setFieldValue("grouper_servcice", "");
  //   }
  // }, [state, state1]);

  const handleStrategyChange = (event) => {
    const strategyId = event.target.value;
    if (event.target.checked) {
      setstate1([...state1, strategyId]);
    } else {
      setstate1(state1.filter((id) => id !== strategyId));
    }
  };




























  

  return (
    <>
      <AddForm
        fields={fields.filter(
          (fld) => !fld.showWhen || fld.showWhen(formik.values)
        )}
        page_title="Add Employee"
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
                        <div class="form-check custom-checkbox mb-3">
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
                {formik.errors.grouper_servcice && (
                  <div style={{ color: "red" }}>
                    {formik.errors.grouper_servcice}
                  </div>
                )}
              </>
            ) : (
              ""
            )}
            {formik.values.Strategy ||
              formik.values.all ||
              formik.values.addemployee ||
              formik.values.editemployee ? (
              <>
                <h6>All Strategy</h6>

                {AllStrategy.data.map((strategy) => (
                  <div className={`col-lg-2 mt-2`} key={strategy._id}>
                    <div className="row ">
                      <div className="col-lg-12 ">
                        <div class="form-check custom-checkbox mb-3">
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

                 

                {formik.errors.strateg_servcice && (
                  <div style={{ color: "red" }}>
                    {formik.errors.strateg_servcice}
                  </div>
                )}
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
