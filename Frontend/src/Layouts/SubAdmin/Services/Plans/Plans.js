import React, { useState, useEffect } from "react";
import {
  DELETE_STRATEGY,
  GetAllPlanData,
  AddPlanData,
  EditPlanData,
  DeletePlanData
} from "../../../../ReduxStore/Slice/Subadmin/Strategy";
import { useDispatch } from "react-redux";
import { Get_All_Catagory } from "../../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import AddForm from "../../../../Components/ExtraComponents/forms/AddForm";
import { useFormik } from "formik";
import ToastButton from "../../../../Components/ExtraComponents/Alert_Toast";
import Loader from "../../../../Utils/Loader";
import Swal from "sweetalert2";

function Plans() {
  const dispatch = useDispatch();

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editshowModal, setEditShowModal] = useState(false);
  const [EditPlanData, setEditPlanData] = useState({});
  const [deleteModal, setdeleteModal] = useState(false);
  const [getStgDescription, setStgDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [GetAllSgments, setGetAllSgments] = useState({
    loading: true,
    data: [],
  });

  const [allStategy, setAllStategy] = useState({ loading: false, data: [] });
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    getAllStrategy();
    setStgDescription("");
  }, [refresh, searchInput]);

  const openModal = () => {
    setShowModal(true);
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
    getservice();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var req = {
          _id: id,
        };
        await dispatch(DeletePlanData(req))
          .unwrap()
          .then((response) => {
            if (response.status) {
              setrefresh(!refresh);
              setdeleteModal(false);
              Swal.fire({
                title: "Deleted!",
                text: response.msg,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.msg,
              });
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });

    return;
  };

  const fields = [
    {
      name: "plan",
      label: "Plan Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
    },

    {
      name: "Type",
      label: "Type",
      type: "select",
      options: [
        { label: "Demo", value: "Demo" },
        { label: "Semi Auto", value: "semi_auto" },
        { label: "Full Auto", value: "full_auto" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },

    {
      name: "plan_segment",
      label: "Plan Segment",
      type: "select",
      options: GetAllSgments.data.map((item) => ({
        label: item.name,
        value: item.name,
      })),
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
      name: "monthly_price",
      label: "Monthly Price",
      type: "text",
      label_size: 12,
      col_size: 3,
      disable: false,
    },
    {
      name: "quarterly_price",
      label: "Quarterly Price",
      type: "text",
      label_size: 12,
      col_size: 3,
      disable: false,
    },
    {
      name: "half_yearly_price",
      label: "Half Yearly Price",
      type: "text",
      label_size: 12,
      col_size: 3,
      disable: false,
    },
    {
      name: "yearly_price",
      label: "Yearly Price",
      type: "text",
      label_size: 12,
      col_size: 3,
      disable: false,
    },
  ];

  const formik = useFormik({
    initialValues: {
      plan: "",
      Type: "",
      plan_segment: [],
      max_trade: "",
      monthly_price: "",
      quarterly_price: "",
      half_yearly_price: "",
      yearly_price: "",
      description: "",
      acttype: "add",
    },
    validate: (values) => {
      let errors = {};
      if (!values.plan) {
        errors.plan = "Plan Name is required";
      }
      if (!values.Type) {
        errors.Type = "Type is required";
      }
      if (!values.plan_segment) {
        errors.plan_segment = "Plan Segment is required";
      }
      if (!values.max_trade) {
        errors.max_trade = "Maximum Trades is required";
      }
      if (!values.monthly_price) {
        errors.monthly_price = "Monthly Price is required";
      }
      if (!values.quarterly_price) {
        errors.quarterly_price = "Quarterly Price is required";
      }
      if (!values.half_yearly_price) {
        errors.half_yearly_price = "Half Yearly Price is required";
      }
      if (!values.yearly_price) {
        errors.yearly_price = "Yearly Price is required";
      }
      console.log(errors);
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      let data = {
        acttype: editshowModal ? "edit" : "add",
        plan: values.plan,
        Type: values.Type,
        plan_segment: values.plan_segment,
        max_trade: values.max_trade,
        monthly_price: values.monthly_price,
        quarterly_price: values.quarterly_price,
        half_yearly_price: values.half_yearly_price,
        yearly_price: values.yearly_price,
        admin_id: user_id,
        description: getStgDescription,
      };

      await dispatch(AddPlanData(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            if (editshowModal) {
              Swal.fire({
                title: "Update Successful!",
                text: response.msg,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              });
              setEditShowModal(false);
              setrefresh(!refresh);
              resetForm();
              setStgDescription("");
            } else {
              Swal.fire({
                title: "Create Successful!",
                text: response.msg,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              });
              setShowModal(false);
              setrefresh(!refresh);
              resetForm();
              setStgDescription("");
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.msg,
              timer: 1500,
              timerProgressBar: true,
            });
            setStgDescription("");
          }
        })
        .catch((error) => {
          setStgDescription("");
        });
    },
  });

  const RefreshHandle = () => {
    setrefresh(!refresh);
    setSearchInput("");
  };

  const getAllStrategy = async () => {
    try {
      var data = { id: user_id };
      const response = await dispatch(GetAllPlanData(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        setAllStategy({
          loading: true,
          data: searchInput ? formattedData : formattedData,
        });
      } else {
        setAllStategy({
          loading: true,
          data: [],
        });
      }
    } catch (error) {
      setAllStategy({
        loading: false,
        data: [],
      });
    }
  };

  useEffect(() => {
    if (EditPlanData) {
      formik.setFieldValue("plan", EditPlanData.name);
      formik.setFieldValue("Type", EditPlanData.type);
      formik.setFieldValue("plan_segment", EditPlanData.segments);
      formik.setFieldValue("max_trade", EditPlanData.max_trade);
      formik.setFieldValue("monthly_price", EditPlanData.monthlyPrice);
      formik.setFieldValue("quarterly_price", EditPlanData.quaterlyPrice);
      formik.setFieldValue("half_yearly_price", EditPlanData.halfYearlyPrice);
      formik.setFieldValue("yearly_price", EditPlanData.yealryPrice);
      setStgDescription(
        EditPlanData.description ? EditPlanData.description : ""
      );
    }
  }, [EditPlanData]);

  return (
    <>
      <div className="content container-fluid">
        {/* PAGE HEADER */}
        <div className="card">
          <div className="card-header ">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-title mb-0">
                  <i className=" pe-2 fas fa-chart-line"></i>Plans
                </h5>
              </div>
              <div className="col-auto">
                <div className="list-btn">
                  <ul className="mb-0 filter-list justify-content-lg-end">
                    <li className="">
                      <p
                        className="mb-0 btn-filters"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Refresh"
                        onClick={RefreshHandle}
                      >
                        <span>
                          <i className="fe fe-refresh-ccw" />
                        </span>
                      </p>
                    </li>
                    <li className="serach-li">
                      <div className="input-group input-block">
                        <input
                          type="text"
                          className="form-control "
                          placeholder="Search..."
                          aria-label="Search"
                          aria-describedby="search-addon"
                          onChange={(e) => setSearchInput(e.target.value)}
                          value={searchInput}
                        />
                      </div>
                    </li>

                    <li>
                      <p className="btn btn-primary" onClick={openModal}>
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Create Plan
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="page-content"></div>

            {/* Cards */}
            {allStategy.loading ? (
              <div className="content container-fluid pb-0">
                <div className="row d-flex align-items-center justify-content-center">
                  {allStategy.data.map((stg) => {
                    return (
                      <div
                        key={stg._id}
                        className="col-sm-12 col-md-6 col-lg-6 col-xl-3"
                      >
                        <div className="packages card" data-aos="fade-down">
                          <div className="package-header d-flex justify-content-between">
                            <div className="d-flex justify-content-between w-100">
                              <div>
                                <h2 className="my-2">{stg.name}</h2>
                                Segment:{" "}
                                {stg.segments.length > 0 &&
                                  stg.segments.map((data) => {
                                    return <span>{data}</span>;
                                  })}
                              </div>
                              <span className="icon-frame d-flex align-items-center justify-content-center">
                                <img
                                  src={
                                    stg.strategy_image
                                      ? stg.strategy_image
                                      : "assets/img/icons/price-01.svg"
                                  }
                                  alt="img"
                                />
                              </span>
                            </div>
                          </div>
                          {stg.researcher_id != null && (
                            <span>
                              <i>Researcher :</i>{" "}
                              {stg.researcher_id && stg.researcher_id.UserName}
                            </span>
                          )}
                          <div>
                            {stg.Service_Type == 1
                              ? "Service_type: PER TRADE"
                              : stg.Service_Type == 2
                              ? "Service_type: PER TRADE FIXED"
                              : ""}
                          </div>
                          <div className="text-dark">
                            <b>{stg.strategy_description}</b>
                          </div>
                          <h6 style={{ marginBottom: "10px" }}>Plan</h6>

                          <ul
                            style={{
                              listStyleType: "none",
                              paddingLeft: "0",
                            }}
                          >
                            <li
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="fa-solid fa-circle-check"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <span>Type</span>
                              <span
                                style={{ marginLeft: "auto", color: "#999" }}
                              >
                                {" "}
                                {stg.type}
                              </span>
                            </li>

                            <li
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="fa-solid fa-circle-check"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <span>Max Trade</span>
                              <span
                                style={{ marginLeft: "auto", color: "#999" }}
                              >
                                {" "}
                                {stg.max_trade}
                              </span>
                            </li>

                            <li
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="fa-solid fa-circle-check"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <span>Monthly Price</span>
                              <span
                                style={{ marginLeft: "auto", color: "#999" }}
                              >
                                {" "}
                                {stg.monthlyPrice}
                              </span>
                            </li>
                            <li
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="fa-solid fa-circle-check"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <span>Quarterly Price</span>
                              <span
                                style={{ marginLeft: "auto", color: "#999" }}
                              >
                                {" "}
                                {stg.quaterlyPrice}
                              </span>
                            </li>
                            <li
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="fa-solid fa-circle-check"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <span>Half Yearly Price</span>
                              <span
                                style={{ marginLeft: "auto", color: "#999" }}
                              >
                                {" "}
                                {stg.halfYearlyPrice}
                              </span>
                            </li>
                            <li
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="fa-solid fa-circle-check"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <span>Yearly Price</span>
                              <span
                                style={{ marginLeft: "auto", color: "#999" }}
                              >
                                {" "}
                                {stg.yealryPrice}
                              </span>
                            </li>
                          </ul>

                          <div className="d-flex justify-content-center package-edit">
                            <a className="btn-action-icon me-2">
                              <i
                                className="fe fe-edit"
                                onClick={() => {
                                  setEditPlanData(stg);
                                  setEditShowModal(!editshowModal);
                                }}
                              />
                            </a>
                            {stg.researcher_id == null && (
                              <a
                                className="btn-action-icon"
                                onClick={() => handleDelete(stg._id)}
                              >
                                <i className="fe fe-trash-2" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Loader />
            )}

            <nav aria-label="Page navigation example">
              <ul className="pagination d-flex justify-content-center">
                <li className="page-item">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link">Next</a>
                </li>
              </ul>
            </nav>

            {/* ADD Plan */}
            {showModal && (
              <div className="modal custom-modal custom-lg-modal d-block">
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header border-0 mb-0 pb-0 ">
                      <div className="form-header modal-header-title text-start mb-0">
                        <h4 className="mb-0">Create New Plan</h4>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={(e) => {
                          setShowModal(false);
                          setrefresh(!refresh);
                          setShowError(false);
                          formik.resetForm();
                        }}
                      ></button>
                    </div>

                    <div className="modal-body m-0 p-0">
                      <AddForm
                        ProfileShow={formik.values.strategy_image}
                        fields={fields.filter(
                          (field) =>
                            !field.showWhen || field.showWhen(formik.values)
                        )}
                        formik={formik}
                        btn_name="Add Plan"
                        additional_field={
                          <>
                            <label>Plan Description</label>
                            <textarea
                              className="rounded"
                              name="strategy"
                              rows="4"
                              cols="50"
                              placeholder="Enter Strategy Description"
                              onChange={(e) =>
                                setStgDescription(e.target.value)
                              }
                              value={getStgDescription}
                              onClick={(e) => {
                                setShowError(true);
                              }}
                            ></textarea>

                            {showError && !getStgDescription.length ? (
                              <div style={{ color: "red" }}>
                                {"Please enter strategy description"}
                              </div>
                            ) : null}
                          </>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Plan */}
            {editshowModal && (
              <div className="modal custom-modal custom-lg-modal d-block">
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header border-0 mb-0 pb-0 ">
                      <div className="form-header modal-header-title text-start mb-0">
                        <h4 className="mb-0">Update Plan</h4>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        // onClick={closeModal, formik.resetForm()}
                        onClick={(e) => {
                          setEditShowModal(false);
                          setrefresh(!refresh);
                          setShowError(false);
                          formik.resetForm();
                        }}
                      ></button>
                    </div>

                    <div className="modal-body m-0 p-0">
                      <AddForm
                        ProfileShow={formik.values.strategy_image}
                        fields={fields.filter(
                          (field) =>
                            !field.showWhen || field.showWhen(formik.values)
                        )}
                        formik={formik}
                        btn_name="Update Plan"
                        additional_field={
                          <>
                            <label>Plan Description</label>
                            <textarea
                              className="rounded"
                              name="strategy"
                              rows="4"
                              cols="50"
                              placeholder="Enter Strategy Description"
                              onChange={(e) =>
                                setStgDescription(e.target.value)
                              }
                              value={getStgDescription}
                              onClick={(e) => {
                                setShowError(true);
                              }}
                            ></textarea>

                            {showError && !getStgDescription.length ? (
                              <div style={{ color: "red" }}>
                                {"Please enter strategy description"}
                              </div>
                            ) : null}
                          </>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <ToastButton />
          </div>
          <ToastButton />
        </div>
      </div>
    </>
  );
}

export default Plans;
