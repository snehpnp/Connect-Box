
import { AddSubadmin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AddForm from '../../../Components/ExtraComponents/forms/AddForm';
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast';
import { GetAll_Group_Servics, GET_ALL_SERVICES_GIVEN } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { GetSubStrategys } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import Loader from '../../../Utils/Loader';

import { useFormik } from 'formik';
import { useState, useEffect } from "react";




const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id


  const [refresh, setrefresh] = useState(false)

  const [serviceName, setServiceName] = useState({
    loading: true,
    data: [],
  });
  const [getAllStategy, setgetallStrategy] = useState({
    loading: true,
    data: [],
  });

  console.log("getAllStategy :", getAllStategy)


  const [allGroupService, setAllGroupService] = useState({
    loading: true,
    data: [],
  });


  const first = [1, 2, 3, 4]
  const GetBrokerInfo = [1, 2, 3, 4]


  const fields = [
    {
      name: "fullName",
      label: "FullName",
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
      name: "password",
      label: "password",
      type: "password",
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
    {
      name: "balance",
      label: "Balance",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
    },

    {
      name: "prifix_key",
      label: "Prifix Key",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "subadmin_servic_type",
      label: "Subadmin Servic Type",
      type: "select",
      options: [
        { label: "Per Trade", value: "1" },
        { label: "Per Strategy", value: "2" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'Per_trade', label: 'Per Trade', type: 'text',
      showWhen: values => values.subadmin_servic_type === '1'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'Per_strategy', label: 'Per Strategy', type: 'text',
      showWhen: values => values.subadmin_servic_type === '2'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: "licence",
      label: "Lincense Type",
      type: "select",
      options: [
        { label: "Demo", value: "0" },
        { label: "2 Day Live", value: "1" },
        { label: "Live", value: "2" },
      ],
      label_size: 12,
      col_size: 6,
      disable: true,
    },


    {
      name: 'broker',
      label: 'Broker',
      type: 'select',
      options: GetBrokerInfo && GetBrokerInfo.map((item) => ({ label: item.title, value: item.broker_id })),
      showWhen: values => values.licence === '2' || values.licence === '1'
      , label_size: 12, col_size: 6, disable: false
    },
    //  For Demo Only Client
    {
      name: 'fromDate', label: 'From Date', type: 'date',
      showWhen: values => values.licence === '0'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'todate', label: 'To Date', type: 'date',
      showWhen: values => values.licence === '0'
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
      fullName: "",
      username: "",
      email: "",
      phone: "",
      balance: "",
      password: "",
      tomonth: null,
      prifix_key: "",
      licence: null,
      subadmin_servic_type: "0",
      strategy_Percentage: "0",
      Per_trade: "0",
      Per_strategy: '0',
      parent_id: null,
      parent_role: null,
    },
    validate: (values) => {
      let errors = {};
      if (!values.fullName) {
        errors.fullName = "Full Name is required";
      }
      if (!values.username) {
        errors.username = "Username is required";
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
      if (!values.balance) {
        errors.balance = "Balance is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.prifix_key) {
        errors.prifix_key = "Prefix key is required";
      } else if (values.prifix_key.length !== 3) {
        errors.prifix_key = "Key should be exactly 3 characters/number/both";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {

      const data = {
        ProfileImg: "",
        FullName: values.fullName,
        UserName: values.username,
        Email: values.email,
        licence: values.tomonth,
        PhoneNo: values.phone,
        Balance: values.balance,
        subadmin_service_type: values.subadmin_servic_type,
        strategy_Percentage: values.strategy_Percentage,
        Per_trade: values.Per_trade,
        prifix_key: values.prifix_key,
        password: values.password,
        parent_id: user_id || "65feb434ce02a722ac3b997d",
        parent_role: Role || "ADMIN",
      };

      setSubmitting(false);


      await dispatch(AddSubadmin(data))
        .unwrap()
        .then(async (response) => {


          if (response.status) {
            toast.success(response.msg);
            setTimeout(() => {
              navigate("/admin/allsubadmin")
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
      await dispatch(GET_ALL_SERVICES_GIVEN({
        data: FindAllGroupService.result
      })).unwrap()
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
        console.log("Stategy finding Error", error)
      })
  }

  useState(() => {
    GetAllStrategy();
  }, [])


  const handleStrategyChange = (e) => {

  }


  console.log(getAllStategy.data)
  return (
    <>
      {
        getAllStategy.data.length == 0 ? <Loader /> :
          <>
            <AddForm
              fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))}
              page_title="Add User"
              btn_name="Add User"
              btn_name1="Cancel"
              formik={formik}
              btn_name1_route={'/subadmin/users'}
              additional_field={
                <>
                  <h6>All Group Service</h6>

                  {serviceName && serviceName.data.map((item) => (
                    <>
                      <div className={`col-lg-2 `} key={item._id}>
                        <div className="col-lg-12 ">
                          <label className="form-check-label bg-primary text-white py-2 px-4" for={item.data[0].name}>{`${item.data[0].name}[${item.data[0].category.segment}]`}</label>

                        </div>
                      </div>

                    </>
                  ))}

                  <div className="row mt-4">
                    <h6>All Strategy</h6>
                    {/* For Show All Strategy */}
                    {getAllStategy.data.map((strategy) => (
                      <div className={`col-lg-2 mt-2`} key={strategy._id}>
                        <div className="row ">
                          <div className="col-lg-12 ">
                            <div className="form-check custom-checkbox mb-3">
                              <input
                                type='checkbox'
                                className="form-check-input"
                                name={strategy.strategy_name}
                                value={strategy._id}
                                onChange={(e) => handleStrategyChange(e)}
                              />
                              <label className="form-check-label" htmlFor={strategy.strategy_name}>{strategy.strategy_name}</label>
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
