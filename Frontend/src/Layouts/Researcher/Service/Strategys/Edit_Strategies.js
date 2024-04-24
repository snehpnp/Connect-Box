import React, { useEffect, useState } from "react";
import AddForm from "../../../../Components/ExtraComponents/forms/AddForm";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  EditSubStrategys,
  GetSubStrategys_ById,
} from "../../../../ReduxStore/Slice/Subadmin/Strategy";
function Edit_Strategies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [makerId, setMakerId] = useState("");
  const [allStrategy, setAllStrategy] = useState(null);
  const [getStgDescription, setStgDescription] = useState('');
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(GetSubStrategys_ById({ id }));
        if (response.payload && response.payload.data) {

          setAllStrategy(response.payload.data);
          setStgDescription(response.payload.data.strategy_description)

        }
      } catch (error) {
        console.error("Error fetching strategy data:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const userDetailsStr = localStorage.getItem("user_details");
    if (userDetailsStr) {
      const userDetails = JSON.parse(userDetailsStr);
      setMakerId(userDetails);
    }
  }, []);

  const fields = [
    {
      name: "strategy_name",
      label: "Strategy Name",
      type: "text1",
      label_size: 6,
      col_size: 6,
      disable: false,
    },

    {
      name: "strategy_category",
      label: "Catagory",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "strategy_demo_days",
      label: "Strategy demo days",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "strategy_segment",
      label: "Strategy Segment",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "strategy_indicator",
      label: "Indicator",
      type: "file1",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "strategy_tester",
      label: "Strategy Tester",
      type: "file1",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "strategy_image",
      label: "Strategy Logo",
      type: "file1",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "max_trade",
      label: "Maximum Trades",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "strategy_percentage",
      label: "Strategy Percentage",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
    },


  ];

  const formik = useFormik({
    initialValues: {
      strategy_name: '',
      strategy_category: '',
      strategy_segment: '',
      strategy_demo_days: '',
      strategy_indicator: '',
      strategy_image: '',
      strategy_tester: '',
      max_trade: '',
      strategy_percentage: '',
      maker_id: user_id,


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
      if (!values.max_trade) {
        errors.max_trade = "Please enter maximum trade";
      }
      if (!getStgDescription) {
        errors.getStgDescription = "Please enter strategy description";
      }
      if (!values.strategy_percentage) {
        errors.strategy_percentage = "Please enter strategy percentage";
      }

      return errors;


    },
    onSubmit: async (values, { resetForm }) => {

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
        strategy_percentage: values.strategy_percentage,
        max_trade: values.max_trade,
        maker_id: user_id,
        Service_Type: 0,
        Role: "RESEARCH"
      };

      await dispatch(EditSubStrategys(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            toast.success(response.msg);
            setTimeout(() => {
              navigate("/research/strategys");
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
      formik.setFieldValue("max_trade", allStrategy.max_trade);
      formik.setFieldValue("strategy_percentage", allStrategy.strategy_percentage);
      formik.setFieldValue("strategy_indicator", allStrategy.strategy_indicator);
      formik.setFieldValue(" strategy_image", allStrategy.strategy_image);
      formik.setFieldValue("strategy_demo_days", allStrategy.strategy_demo_days);
    }
  }, [allStrategy]);

  return (
    <AddForm
      ProfileShow={formik.values.strategy_image}
      fields={fields}
      formik={formik}
      btn_name="Update"
      btn_name1="Cancel" btn_name1_route="/research/strategys"
      additional_field={
        <>
          <label>Strategy Description</label>
          <textarea className="rounded" name="strategy" rows="4" cols="50" placeholder="Enter Strategy Description" onChange={(e) => setStgDescription(e.target.value)} value={getStgDescription}>
          </textarea>
        </>

      }
    />
  );
}

export default Edit_Strategies;
