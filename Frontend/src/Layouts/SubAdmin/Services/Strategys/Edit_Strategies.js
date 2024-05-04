import React, { useEffect, useState } from "react";
import AddForm from "../../../../Components/ExtraComponents/forms/AddForm";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../../../Utils/Loader";



import {
  EditSubStrategys,
  GetSubStrategys_ById,
} from "../../../../ReduxStore/Slice/Subadmin/Strategy";
import { Get_All_Catagory } from '../../../../ReduxStore/Slice/Subadmin/GroupServicesSlice'

function Edit_Strategies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const makerId = JSON.parse(localStorage.getItem("user_details"))

  const [loading, setloading] = useState(false);

  const [allStrategy, setAllStrategy] = useState(null);
  const [getStgDescription, setStgDescription] = useState('');
  const [GetAllSgments, setGetAllSgments] = useState({
    loading: true,
    data: [],
  });



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


  console.log("-=====", allStrategy)

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
      name: "strategy_amount_month",
      label: "Monthly",
      type: "text5",
      label_size: 3,
      col_size: 3,
      disable: false,
    },
    {
      name: "strategy_amount_quarterly",
      label: "Quaterly",
      type: "text5",
      label_size: 3,
      col_size: 3,
      disable: false,
    },
    {
      name: "strategy_amount_half_early",
      label: "Half Yearly",
      type: "text5",
      label_size: 3,
      col_size: 3,
      disable: false,
    },
    {
      name: "strategy_amount_early",
      label: "Yearly",
      type: "text5",
      label_size: 3,
      col_size: 3,
      disable: false,
    },
    {
      name: "Service_Type",
      label: "Service Type",
      type: "test",
      label_size: 12,
      col_size: 12,
      disable: false,
    },
  ];

  const formik = useFormik({
    initialValues: {
      strategy_name: "",
      strategy_category: "",
      strategy_segment: "",
      strategy_tester: "",
      strategy_indicator: "",
      strategy_image: "",
      strategy_description: "",
      strategy_amount_month: "",
      strategy_amount_quarterly: "",
      strategy_amount_half_early: "",
      strategy_amount_early: "",
      strategy_demo_days: "",
      Service_Type: ''
    },
    validate: (values) => {
      let errors = {};
      if (!values.strategy_name) {
        errors.strategy_name = "strategy name is required";
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

      if (!values.strategy_amount_month) {
        errors.strategy_amount_month = "amount is required";
      }
      if (!values.strategy_amount_quarterly) {
        errors.strategy_amount_quarterly = "amount is required";
      }
      if (!values.strategy_amount_half_early) {
        errors.strategy_amount_half_early = "amount is required";
      }

      if (!values.strategy_amount_early) {
        errors.strategy_amount_early = "amount is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
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
        strategy_amount_month: values.strategy_amount_month,
        strategy_amount_quarterly: values.strategy_amount_quarterly,
        strategy_amount_half_early: values.strategy_amount_half_early,
        strategy_amount_early: values.strategy_amount_early,
        maker_id: makerId.user_id,
        max_trade: values.max_trade,
        Role: "SUBADMIN",
        Service_Type: values.Service_Type == '' ? 0 : values.Service_Type
      };

      console.log("cp :", data)

      await dispatch(EditSubStrategys(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.msg);
            setTimeout(() => {
              navigate("/subadmin/strategys");
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
      formik.setFieldValue("strategy_amount_month", allStrategy.strategy_amount_month);
      formik.setFieldValue("strategy_amount_quarterly", allStrategy.strategy_amount_quarterly);
      formik.setFieldValue("strategy_amount_half_early", allStrategy.strategy_amount_half_early);
      formik.setFieldValue("strategy_amount_early", allStrategy.strategy_amount_early);
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
              ></textarea>
            </>
          }
        />
      ) : <Loader />}
    </>
  );
}

export default Edit_Strategies;
