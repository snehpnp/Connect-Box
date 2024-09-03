import React, { useEffect, useState } from "react";
import AddForm from "../../../../Components/ExtraComponents/forms/AddForm";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../../../Utils/Loader";
import Swal from 'sweetalert2'
import { EditSubStrategys, GetSubStrategys_ById } from "../../../../ReduxStore/Slice/Subadmin/Strategy";
import { Get_All_Catagory } from '../../../../ReduxStore/Slice/Subadmin/GroupServicesSlice'

function Edit_Strategies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const makerId = JSON.parse(localStorage.getItem("user_details"))
  var subadmin_service_type = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type


  const [loading, setloading] = useState(false);

  const [allStrategy, setAllStrategy] = useState(null);
  const [getStgDescription, setStgDescription] = useState('');
  const [GetAllSgments, setGetAllSgments] = useState({ loading: true, data: [] });




  const fetchData = async () => {
    try {
      const response = await dispatch(GetSubStrategys_ById({ id })).unwrap();
      if (response.status) {
        setAllStrategy(response.data);
        setStgDescription(response.data.strategy_description);
        setloading(true)
      }
    } catch (error) {
      console.error("Error fetching strategy data:", error);
    }
  };



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

    fetchData();
    getservice();
  }, []);




  const fields = [
    {
      name: "strategy_name",
      label: "Strategy Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: true,
    },
    {
      name: "strategy_category",
      label: "Category",
      type: "select",
      options: [
        { label: "Low Risk", value: "Low Risk" },
        { label: "Medium Risk", value: "Medium Risk" },
        { label: "High Risk", value: "High Risk" },
      ],
      label_size: 12,
      col_size: 6,
      disable: allStrategy && allStrategy.researcher_id != null,

    },

    {
      name: "strategy_demo_days",
      label: "Strategy Demo Days",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: allStrategy && allStrategy.researcher_id != null,
      showWhen: (values) => allStrategy && allStrategy.researcher_id == null
    },
    {
      name: "strategy_segment",
      label: "Strategy Segment",
      type: "select",
      options: GetAllSgments.data.map((item) => ({
        label: item.name,
        value: item.name,
      })),
      label_size: 12,
      col_size: 6,
      disable: allStrategy && allStrategy.researcher_id != null,

    },
    {
      name: "strategy_indicator",
      label: "Indicator",
      type: "file1",
      label_size: 12,
      col_size: 6,
      disable: allStrategy && allStrategy.researcher_id != null,
      showWhen: (values) => allStrategy && allStrategy.researcher_id == null
    },
    {
      name: "strategy_tester",
      label: "Strategy Tester",
      type: "file1",
      label_size: 12,
      col_size: 6,
      disable: allStrategy && allStrategy.researcher_id != null,
      showWhen: (values) => allStrategy && allStrategy.researcher_id == null
    },
    {
      name: "strategy_image",
      label: "Strategy Logo",
      type: "file1",
      label_size: 12,
      col_size: 6,
      disable: allStrategy && allStrategy.researcher_id != null,
      showWhen: (values) => allStrategy && allStrategy.researcher_id == null
    },
    {
      name: "max_trade",
      label: "Maximum Trades",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: allStrategy && allStrategy.researcher_id != null,
    },
    {
      name: "Service_Type",
      label: "Service Type",
      type: "test",
      label_size: 12,
      col_size: 12,
      disable: allStrategy && allStrategy.Service_Type == 0 ? false : true,
    },
    {
      name: "security_fund",
      label: "Strategy Plan",
      type: 'security',
      showWhen: (values) => formik.values.Service_Type == 1 || subadmin_service_type == 2,
    },
    {
      name: "security_fund",
      label: "Security fund",
      type: 'security',
      showWhen: (values) => formik.values.Service_Type == 2,
    },
    {
      name: "security_fund_month",
      label: "Monthly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

    },
    {
      name: "security_fund_quarterly",
      label: "Quaterly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

    },
    {
      name: "security_fund_half_early",
      label: "Half Yearly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

    },
    {
      name: "security_fund_early",
      label: "Yearly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 1 || formik.values.Service_Type == 2 || subadmin_service_type == 2,

    },
    {
      name: "security_fund_fixed",
      label: "Per trade fixed amount",
      type: 'security',
      showWhen: (values) => formik.values.Service_Type == 2,

    },
    {
      name: "fixed_amount_per_trade_month",
      label: "Monthly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 2,

    },
    {
      name: "fixed_amount_per_trade_quarterly",
      label: "Quaterly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 2,

    },
    {
      name: "fixed_amount_per_trade_half_early",
      label: "Half Yearly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 2,

    },
    {
      name: "fixed_amount_per_trade_early",
      label: "Yearly",
      type: "text3",
      label_size: 3,
      col_size: 3,
      disable: false,
      showWhen: (values) => formik.values.Service_Type == 2,

    },
  ];

  const formik = useFormik({
    initialValues: {
      strategy_name: '',
      strategy_category: '',
      strategy_segment: '',
      strategy_tester: '',
      strategy_indicator: '',
      strategy_image: '',
      strategy_description: '',
      security_fund_month: '',
      security_fund_quarterly: '',
      security_fund_half_early: '',
      security_fund_early: '',
      fixed_amount_per_trade_month: '',
      fixed_amount_per_trade_quarterly: '',
      fixed_amount_per_trade_half_early: '',
      fixed_amount_per_trade_early: '',
      strategy_demo_days: '',
      Service_Type: "",
      max_trade: '',
    },
    validate: (values) => {
      let errors = {};
      if (!values.strategy_name) {
        errors.strategy_name = "Please Enter Strategy Name";
      }
      if (!values.strategy_demo_days) {
        errors.strategy_demo_days = "strategy demo day is required";
      }
      if (!values.strategy_category) {
        errors.strategy_category = "strategy category is required";
      }
      if (!values.strategy_segment) {
        errors.strategy_segment = "strategy segment is required";
      }
      if (!values.max_trade) {
        errors.max_trade = "Please enter maximum trade";
      }

      if (!values.security_fund_month) {
        errors.security_fund_month = "amount is required";
      }
      if (!values.security_fund_quarterly) {
        errors.security_fund_quarterly = "amount is required";
      }
      if (!values.security_fund_half_early) {
        errors.security_fund_half_early = "amount is required";
      }

      if (!values.security_fund_early) {
        errors.security_fund_early = "amount is required";
      }


      if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_month) {
        errors.fixed_amount_per_trade_month = "amount is required 3";
      }
      if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_quarterly) {
        errors.fixed_amount_per_trade_quarterly = "amount is required";
      }
      if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_early) {
        errors.fixed_amount_per_trade_early = "amount is required";
      }
      if (subadmin_service_type == 1 && formik.values.Service_Type == 2 && !values.fixed_amount_per_trade_half_early) {
        errors.fixed_amount_per_trade_half_early = "amount is required";
      }

      return errors;


    },
    onSubmit: async (values, { resetForm }) => {
      if (!getStgDescription) {
        
        Swal.fire({
          title: "field strategy description!",
          text: "Please enter a strategy description.",
          icon: "warning",
          confirmButtonText: 'OK'
        });
        return;
      }
      const data = {
        _id: id,
        strategy_name: values.strategy_name,
        strategy_category: values.strategy_category,
        strategy_segment: values.strategy_segment,
        strategy_tester: values.strategy_tester,
        strategy_demo_days: values.strategy_demo_days,
        strategy_indicator: values.strategy_indicator,
        strategy_image: values.strategy_image,
        strategy_description: getStgDescription,
        security_fund_month: values.security_fund_month,
        security_fund_quarterly: values.security_fund_quarterly,
        security_fund_half_early: values.security_fund_half_early,
        security_fund_early: values.security_fund_early,
        fixed_amount_per_trade_month: values.fixed_amount_per_trade_month,
        fixed_amount_per_trade_quarterly: values.fixed_amount_per_trade_quarterly,
        fixed_amount_per_trade_half_early: values.fixed_amount_per_trade_half_early,
        fixed_amount_per_trade_early: values.fixed_amount_per_trade_early,
        maker_id: makerId.user_id,
        max_trade: values.max_trade,
        Role: "SUBADMIN",
        Service_Type: values.Service_Type == '' ? 0 : values.Service_Type
      };

      await dispatch(EditSubStrategys(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
              
            Swal.fire({
              title: "Strategy Updated !",
              text: response.msg,
              icon: "success",
              timer: 1000,
              timerProgressBar: true,
            });
            setTimeout(() => {
              navigate("/subadmin/strategys");
            }, 1000);
          } else {
            Swal.fire({
              title: "Error!",
              text: response.msg,
              icon: "error",
              timer: 1000,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  });

  useEffect(() => {
    if (allStrategy && allStrategy) {
      formik.setFieldValue("strategy_name", allStrategy.strategy_name);
      formik.setFieldValue("strategy_category", allStrategy.strategy_category);
      formik.setFieldValue("strategy_segment", allStrategy.strategy_segment);
      formik.setFieldValue("strategy_tester", allStrategy.strategy_tester);
      formik.setFieldValue("strategy_description", allStrategy.strategy_description);
      formik.setFieldValue("Service_Type", allStrategy.Service_Type);
      formik.setFieldValue("max_trade", allStrategy.max_trade);
      formik.setFieldValue("strategy_indicator", allStrategy.strategy_indicator);
      formik.setFieldValue("strategy_image", allStrategy.strategy_image);
      formik.setFieldValue("security_fund_month", allStrategy.security_fund_month);
      formik.setFieldValue("security_fund_quarterly", allStrategy.security_fund_quarterly);
      formik.setFieldValue("security_fund_half_early", allStrategy.security_fund_half_early);
      formik.setFieldValue("security_fund_early", allStrategy.security_fund_early);
      formik.setFieldValue("fixed_amount_per_trade_month", allStrategy.fixed_amount_per_trade_month);
      formik.setFieldValue("fixed_amount_per_trade_quarterly", allStrategy.fixed_amount_per_trade_quarterly);
      formik.setFieldValue("fixed_amount_per_trade_half_early", allStrategy.fixed_amount_per_trade_half_early);
      formik.setFieldValue("fixed_amount_per_trade_early", allStrategy.fixed_amount_per_trade_early);
      formik.setFieldValue("strategy_demo_days", allStrategy.strategy_demo_days);
    }
  }, [allStrategy]);


  return (
    <>
      {loading ? (
        <AddForm
          ProfileShow={formik.values.strategy_image}
          fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))}
          formik={formik}
          btn_name="Update"
          btn_name1="Cancel"
          btn_name1_route="/subadmin/strategys"
          additional_field={
            <>
              <label>Strategy Description</label>
              <textarea
                className="rounded"
                name="strategy"
                rows="4"
                cols="50"
                placeholder="Enter Strategy Description"
                onChange={(e) => setStgDescription(e.target.value)}
                value={getStgDescription}
                disabled={allStrategy &&  allStrategy.researcher_id != null } // Corrected 'disable' to 'disabled'
               
              ></textarea>
            
            </>
          }

        />
        
      ) : <Loader />}
    </>
  );
}

export default Edit_Strategies;
