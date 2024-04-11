

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import AddForm from '../../../Components/ExtraComponents/forms/AddForm';
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast';
import { GetAll_Group_Servics, GET_ALL_SERVICES_GIVEN } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { GetSubStrategys } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { GetOneUser, Get_All_Broker, } from '../../../ReduxStore/Slice/Subadmin/UsersSlice'
import Loader from '../../../Utils/Loader';

import { useFormik } from 'formik';
import { useState, useEffect } from "react";




const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();


  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id


  const [refresh, setrefresh] = useState(false)

  const [getOneUsers, setOneUsers] = useState([]);



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
  const [selectedCheckboxesAndPlan, setSelectedCheckboxesAndPlan] = useState([]);
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
      label: "FullName",
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
      label: "Phone No",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
    },



    // {
    //   name: 'Per_trade', label: 'Per Trade', type: 'text',
    //   showWhen: values => values.subadmin_servic_type === '1'
    //   , label_size: 12, col_size: 6, disable: false
    // },

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
      showWhen: values => values.broker === '2'
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
      if (!values.profile_Img) {
        errors.profile_Img = "Full Name is required";
      }
      if (!values.username) {
        errors.username = "Username is required";
      }
      if (!values.broker) {
        errors.broker = "Username is required";
      }

      if (!values.licence) {
        errors.licence = "Username is required";
      }

      if (!values.groupservice) {
        errors.groupservice = "Username is required";
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

      console.log("req :", req)


      // await dispatch(AddUsers(req))
      //   .unwrap()
      //   .then(async (response) => {


      //     if (response.status) {
      //       toast.success(response.msg);
      //       setTimeout(() => {
      //         navigate("/subadmin/users")
      //       }, 1000);

      //     } else {
      //       toast.error(response.msg);
      //     }

      //   })
      //   .catch((error) => {
      //     console.log("Error", error);
      //   });

    },
  });



  const getAllUsers = async () => {
    var data = { user_ID: id }
    await dispatch(GetOneUser(data)).unwrap()
      .then((response) => {
        if (response.status) {
          setOneUsers(response.data);
          setSelectedCheckboxes(response.data.ClientStrategy.map((stg) => stg.strategy_id))


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
    getAllUsers()
  }, [])



  useEffect(() => {
    formik.setFieldValue('fullName', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].FullName);
    formik.setFieldValue('username', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].UserName);
    formik.setFieldValue('email', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].Email);
    formik.setFieldValue('phone', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].PhoneNo);
    formik.setFieldValue('broker', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].broker);
    formik.setFieldValue('licence', getOneUsers.getClients !== undefined && getOneUsers.getClients[0].license_type);
    formik.setFieldValue('groupservice', getOneUsers.getClients !== undefined && getOneUsers.ClientGroupName[0].groupService_id);


  }, [getOneUsers.getClients])


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

  useEffect(() => {
    getAllGroupService();
  }, [refresh]);




  //FIND ALL GROUP SERVICES
  const FindAllGroupService = allGroupService.data.find(item => item._id === formik.values.groupservice);


  const getAllGroupServicesName = async () => {
    if (formik.values.groupservice) {
      var data= { id:formik.values.groupservice}
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
          console.log("erorr :", error)
        })

    }
  }
  useEffect(() => {
    getAllGroupServicesName();
  }, [refresh, formik.values.groupservice])


  const GetAllStrategy = async () => {
    var data = { id: user_id }
    await dispatch(GetSubStrategys(data)).unwrap()
      .then((response) => {
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
  useState(() => {
    GetAllStrategy();
  }, [])


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



  useState(() => {
    AllBroker();
  }, [])


  var planSelect = [1, 2, 3, 4]


  console.log("serviceName",serviceName)
  return (
    <>
      {
        getAllStategy.data.length == 0 ? <Loader /> :
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
                  {serviceName.data.length > 0 ? <h6>All Group Service</h6> : ''}
                  {serviceName && serviceName.data.map((item) => (
                    <>
                      <div className={`col-lg-2 `} key={item.serviceId}>
                        <div className="col-lg-12 ">
                          <label className="form-check-label bg-primary text-white  rounded py-2 px-4" for={item.serviceName}>{`${item.serviceName}[${item.categoryName}]`}</label>

                        </div>
                      </div>

                    </>
                  ))}

                  <div className="row mt-4">
                    <h6>All Strategy</h6>
                    {getAllStategy.data.map((strategy) => (
                      <div className={`col-lg-3 mt-2`} key={strategy._id}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-check custom-checkbox mb-3">


                              <input
                                type='checkbox'
                                className="form-check-input"
                                name={strategy.strategy_name}
                                value={strategy._id}
                                defaultChecked={getOneUsers.ClientStrategy && getOneUsers.ClientStrategy.some((item) => (
                                  item.strategy_id === strategy._id
                                ))}



                                onChange={() => handleStrategyChange(strategy._id)}
                              />
                              <label className="form-check-label" htmlFor={strategy.strategy_name}>{strategy.strategy_name}</label>


                              {formik.values.licence != 1 && selectedCheckboxes.includes(strategy._id) && (
                                <div className="border rounded" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <div className="form-group d-flex justify-content-between m-3">
                                    {planSelect.map((data) => {
                                      const planId = getOneUsers.ClientStrategy && getOneUsers.ClientStrategy.filter((item) => (
                                        item.strategy_id === strategy._id
                                      )).map((item) => item.plan_id)[0];

                                      return (
                                        <div className="d-flex align-items-center" key={data}>
                                          <input
                                            type="radio"
                                            name={`option_${strategy._id}`}
                                            value={data}
                                            defaultChecked={data == planId}
                                            id={`${strategy._id}_${data}`}
                                            onChange={(e) => PlanSetinState(e.target.id)}
                                          />
                                          <label style={{ margin: '0 10px 0 5px', fontSize: '1rem' }}>{data == 1 ? "monthly" : data == 2 ? "Quaterly" : data == 3 ? "half_yearly" : data == 4 ? "yearly" : "DEMO"} </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}


                            </div>
                          </div>
                        </div>
                      </div>
                    ))}


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