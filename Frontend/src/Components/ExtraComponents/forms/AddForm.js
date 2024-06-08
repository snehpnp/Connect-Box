import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { MoveLeft, Plus } from "lucide-react";

const DynamicForm = ({
  fields,
  ProfileShow,
  page_title,
  formData,
  btn_name1,
  btn_name1_route,
  initialValues,
  validationSchema,
  onSubmit,
  btn_name_signUp,
  btn_name_login,
  fromDate,
  fieldtype,
  formik,
  btn_name,
  forlogin,
  title,
  additional_field,
  btn_status,
  content_btn_name,
  content_path,
  btn_name2,
}) => {
  const location = useLocation();

  const [inputPerTrade, setInputPerTrade] = useState("");
  const [inputPerStrategy, setInputPerStrategy] = useState("");

  const [previews, setPreviews] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState({});
  const [inputValue, setInputValue] = useState("");

  var subadmin_service_type = JSON.parse(
    localStorage.getItem("user_details")
  ).subadmin_service_type;

  const prifix_key = JSON.parse(
    localStorage.getItem("user_details")
  ).prifix_key;

  const handleFileChange = (event, index, name) => {
    if (event.target.files[0].size > 420000) {
      alert("Select file less then 420KB");
      event.target.value = "";
      return;
    } else {
      const file = event.target.files[0];
      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue(name, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleOnchange = (e) => {
    const newValue = e.target.value.toUpperCase();
    if (/^[a-zA-Z]{0,3}$/.test(newValue)) {
      setInputValue(newValue);
      formik.handleChange(newValue);
    }
  };

  const HandelChange = (value) => {
    formik.setFieldValue("Service_Type", value);
  };

  const PerTradeValueset = (value) => {
    formik.setFieldValue("per_trade_value", value.target.value);
  };

  return (
    <div className="content container-fluid" data-aos="fade-left">
      <div className="card mb-0">
        {page_title ? (
          <div className="card-header">
            {page_title ? (
              <h5 className="card-title mb-0 w-auto">
                <i className="fa-regular fa-circle-user pe-2"></i>
                {page_title}{" "}
              </h5>
            ) : (
              ""
            )}
            {/* {close_btn ? <h5 className="card-title mb-0 w-auto"><i className="fa-regular fa-circle-user pe-2"></i>{} </h5> : ""} */}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}  autoComplete="off">
          <div className="card-body ">
            <div className="page-header">
              <div className="content-page-header d-flex justify-content-between align-items-center">
                {btn_status == "true" ? (
                  content_btn_name == "Back" ? (
                    <Link to={content_path} className="btn btn-primary">
                      {" "}
                      <MoveLeft /> {content_btn_name}{" "}
                    </Link>
                  ) : (
                    <Link to={content_path} className="btn btn-primary">
                      {" "}
                      <Plus /> {content_btn_name}{" "}
                    </Link>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <div>
                {/*  form  */}
                <div className="row d-flex ">
                  {fields.map((field, index) => (
                    <React.Fragment key={index}>
                      {field.type === "text1" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="input-block mb-3 flex-column">
                              <label className={`col-lg-${field.label_size}`}>
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="basic-addon1"
                                placeholder={`Enter Strategy Name (Ex: AAA_demo )`}
                                readOnly={field.disable}
                                autoComplete="new-email"
                                id={field.name}
                                name={field.name}
                                {...formik.getFieldProps(field.name)}
                                value={
                                  formik.values[field.name].startsWith(
                                    prifix_key + "_"
                                  )
                                    ? formik.values[field.name]
                                    : formik.values[field.name].startsWith(
                                      prifix_key
                                    )
                                      ? prifix_key +
                                      "_" +
                                      formik.values[field.name].substr(3)
                                      : prifix_key +
                                      "_" +
                                      formik.values[field.name]
                                }
                              />

                              {formik.touched[field.name] &&
                                formik.errors[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : field.type === "text" ? (
                        <>
                          <div className={` col-lg-${field.col_size}`}>
                            <div className="input-block mb-3 flex-column">
                              <label className={`col-lg-${field.label_size}`}>
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                autoComplete="new-email1"
                                aria-describedby="basic-addon1"
                                className="form-control"
                                placeholder={`Enter ${field.label}`}
                                readOnly={field.disable}
                                id={field.name}
                                name={field.name}
                                {...formik.getFieldProps(field.name)}
                              />
                              {formik.touched[field.name] &&
                                formik.errors[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : field.type === "text2" ? (
                        <>
                          <div className={` col-lg-${field.col_size}`}>
                            <div className="input-block mb-3 flex-column">
                              <label className={`col-lg-${field.label_size}`}>
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                autoComplete="new-email2"
                                aria-describedby="basic-addon1"
                                className="form-control"
                                placeholder={`Enter ${field.label}`}
                                readOnly={field.disable}
                                id={field.name}
                                name={field.name}
                                value={inputValue}
                                onChange={(e) => {
                                  const newValue = e.target.value.toUpperCase();

                                  if (/^[a-zA-Z]{0,3}$/.test(newValue)) {
                                    setInputValue(newValue);
                                    formik.handleChange(e);
                                  }
                                }}
                              />
                              {inputValue == "" ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : field.type === "file" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="profile-picture">
                              <div className="upload-profile">
                                <div className="profile-img">
                                  <img
                                    id="blah"
                                    className="avatar"
                                    src={
                                      formik.values[field.name]
                                        ? formik.values[field.name]
                                        : "assets/img/profiles/avatar-14.jpg"
                                    }
                                    alt="profile-img"
                                  />
                                </div>
                                <div className="add-profile">
                                  <h5>Upload a Photo</h5>
                                  <span>
                                    {selectedImage
                                      ? selectedImage.name
                                      : "Profile-pic.jpg"}
                                  </span>
                                </div>
                              </div>
                              <div className="img-upload d-flex">
                                {/* Input field for selecting an image */}
                                <label className="btn btn-upload">
                                  Upload{" "}
                                  <input
                                    type="file"
                                    id={field.name}
                                    className="form-control"
                                    onChange={(e) =>
                                      handleFileChange(e, index, field.name)
                                    }
                                  />
                                </label>
                                {/* Button to remove the selected image */}
                                {/* <button className="btn btn-remove" onClick={() => formik.setFieldValue(field.name, '')}>Remove</button> */}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "file1" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="row d-flex">
                              <div className="mb-3">
                                <label
                                  className={`col-form-${field.label_size}`}
                                  htmlFor={field.name}
                                >
                                  {field.label}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="file"
                                  id={field.name}
                                  onChange={(e) =>
                                    handleFileChange(e, index, field.name)
                                  } // Pass the index to the handler
                                  className={`form-control`}
                                />
                              </div>
                              {formik.getFieldProps(field.name).value ? (
                                <img
                                  src={formik.getFieldProps(field.name).value}
                                  name={field.name}
                                  id={field.name}
                                  alt={`Preview ${index}`}
                                  className={`col-lg-11 ms-3 ${field.label_size} mb-3 border border-2`}
                                  style={{
                                    height: formik.getFieldProps(field.name)
                                      .value
                                      ? "150px"
                                      : "",
                                    width: "95%",
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      ) : field.type === "select" ? (
                        <>
                          <div
                            className={`col-lg-${title === "update_theme" ? 12 : 6
                              }`}
                          >
                            <div className="input-block row mb-3">
                              <label
                                className={`col-lg-${title === "forlogin"
                                    ? 3
                                    : title === "update_theme"
                                      ? 12
                                      : 7
                                  }  col-form-label p-0 mx-3 `}
                                htmlFor={field.name}
                              >
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>
                              <div
                                className={`col-lg-${title === "addgroup" ? 12 : 12
                                  }`}
                              >
                                <select
                                  className="default-select wide form-control"
                                  aria-describedby="basic-addon1"
                                  disabled={field.disable}
                                  id={field.name}
                                  {...formik.getFieldProps(field.name)}
                                >
                                  <option value="" selected>
                                    Select {field.label}
                                  </option>
                                  {field.options.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>

                                {formik.touched[field.name] &&
                                  formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "select1" ? (
                        <>
                          <div
                            className={`col-lg-${title === "update_theme" ? 12 : 6
                              }`}
                          >
                            <div className="input-block row mb-3">
                              <label
                                className={`col-lg-${title === "forlogin"
                                    ? 3
                                    : title === "update_theme"
                                      ? 12
                                      : 7
                                  }  col-form-label p-0 mx-3 `}
                                htmlFor={field.name}
                              >
                                {field.label}
                              </label>
                              <div
                                className={`col-lg-${title === "addgroup" ? 12 : 12
                                  }`}
                              >
                                <select
                                  className="default-select wide form-control"
                                  aria-describedby="basic-addon1"
                                  disabled={field.disable}
                                  id={field.name}
                                  {...formik.getFieldProps(field.name)}
                                >
                                  <option value="" selected>
                                    Select {field.label}
                                  </option>
                                  {field.options.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>

                                {formik.touched[field.name] &&
                                  formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "checkbox" ? (
                        <>
                          {field.options && field.options.length > 0 ? (
                            <>
                              {field.options &&
                                field.options.map((option, index) => (
                                  <>
                                    <div
                                      className={`col-lg-${field.col_size}`}
                                      key={option.id}
                                    >
                                      <div className="row d-flex">
                                        <div
                                          className={`col-lg-${field.col_size}`}
                                        >
                                          <div className="form-check custom-checkbox input-block  ">
                                            <input
                                              type={field.type}
                                              className="form-check-input"
                                              id={option.label}
                                              {...formik.getFieldProps(
                                                option.name
                                              )}
                                            />
                                            <label
                                              className="form-check-label "
                                              for={option.label}
                                            >
                                              {option.label}
                                            </label>
                                            {formik.errors[field.name] && (
                                              <div style={{ color: "red" }}>
                                                {formik.errors[field.name]}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                            </>
                          ) : (
                            <>
                              <div className={`col-lg-${field.col_size}`}>
                                <div className="row d-flex justify-content-start">
                                  <div className='mb-4' >
                                    <div className="form-check custom-checkbox ">
                                      <input
                                        type={field.type}
                                        className="form-check-input"
                                        id={field.label}
                                        {...formik.getFieldProps(field.name)}
                                        checked={field.check_box_true}
                                      />
                                      <label
                                        className="form-check-label"
                                        for={field.label}
                                      >
                                        {field.label}
                                      </label>
                                    </div>
                                    {formik.errors[field.name] && (
                                      <div style={{ color: "red" }}>
                                        {formik.errors[field.name]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : field.type === "radio" ? (
                        <>
                          <label
                            className={`col-lg-${field.label_size} col-form-label fw-bold text-decoration-underline`}
                            htmlFor={field.parent_label}
                          >
                            {field.parent_label}
                          </label>

                          <div className={`d-flex`}>
                            <div
                              className={`col-lg-${field.col_size} form-check custom-checkbox my-3`}
                            >
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value1}
                                className="form-check-input"
                                id={field.title1}
                                {...formik.getFieldProps(field.name)}
                              />
                              <label
                                className={`col-lg-${field.label_size} col-form-label mx-2`}
                                for={field.title1}
                              >
                                {field.title1}
                              </label>
                            </div>
                            <div
                              className={`col-lg-${field.col_size} form-check custom-checkbox my-3`}
                            >
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value2}
                                className="form-check-input"
                                id={field.title2}
                                {...formik.getFieldProps(field.name)}
                              />
                              <label
                                className={`col-lg-${field.label_size} col-form-label  mx-2`}
                                for={field.name}
                              >
                                {field.title2}
                              </label>
                            </div>
                          </div>
                        </>
                      ) : field.type === "password" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className=" input-block row">
                              <label
                                className={`col-lg-${field.label_size} col-form-labelp-0 `}
                                htmlFor={field.name}
                              >
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>
                              <div
                                // className={`col-lg-${field.col_size}`}
                                style={{ position: "relative" }}
                              >
                                <input
                                  id={field.name}
                                  autoComplete="new-password"
                                  type={
                                    passwordVisible[field.name]
                                      ? "text"
                                      : field.type
                                  }
                                  placeholder={`Enter ${field.label}`}
                                  {...formik.getFieldProps(field.name)}
                                  className={` form-control`}
                                />
                                <i
                                  className={`fa-solid ${passwordVisible[field.name]
                                      ? "fa-eye-slash"
                                      : "fa-eye"
                                    }`}
                                  style={{
                                    position: "absolute",
                                    top: "1.5px",
                                    right: "20px",
                                    padding: "12.4px 6.6px",
                                    borderRadius: "3px",
                                  }}
                                  onClick={() =>
                                    setPasswordVisible((prevState) => ({
                                      ...prevState,
                                      [field.name]: !prevState[field.name],
                                    }))
                                  }
                                ></i>
                                {formik.touched[field.name] &&
                                  formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "password1" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className=" input-block row">
                              <label
                                className={`col-lg-${field.label_size} col-form-labelp-0 `}
                                htmlFor={field.name}
                              >
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>
                              <div
                                // className={`col-lg-${field.col_size}`}
                                style={{ position: "relative" }}
                              >
                                <input
                                  id={field.name}
                                  autoComplete="new-password1"

                                  type={
                                    passwordVisible[field.name]
                                      ? "text"
                                      : field.type
                                  }
                                  placeholder={`Enter ${field.label}`}
                                  {...formik.getFieldProps(field.name)}
                                  className={` form-control`}
                                />

                                {formik.touched[field.name] &&
                                  formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "date" ? (
                        <>
                          <div className="col-lg-3">
                            <div className="row d-flex">
                              <div className="col-lg-12 ">
                                <div className="form-check custom-checkbox input-block  mb-3">
                                  <label className="col-lg-6 " for={field.name}>
                                    {field.name}
                                  </label>
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    className="form-control"
                                    id={field.name}
                                    {...formik.getFieldProps(field.name)}
                                  />
                                </div>
                                {formik.errors[field.name] && (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "msgbox" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="row d-flex">
                              <div className={`col-lg-${field.col_size}  `}>
                                <div className="mb-3 input-block">
                                  <label
                                    className={`col-lg-${field.label_size}`}
                                    for={field.name}
                                  >
                                    {field.label}
                                  </label>
                                  <textarea
                                    className="form-control"
                                    rows={field.row_size}
                                    id={field.name}
                                    name={field.name}
                                    {...formik.getFieldProps(field.name)}
                                    placeholder={field.label}
                                  ></textarea>
                                  {formik.errors[field.name] && (
                                    <div style={{ color: "red" }}>
                                      {formik.errors[field.name]}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "test" ? (
                        <>
                          {subadmin_service_type == 1 ? (
                            <div className={`col-lg-${field.col_size}`}>
                              <div className="input-block mb-3 flex-column">
                                <label className={`col-lg-${field.label_size}`}>
                                  {field.label}
                                  <span className="text-danger">*</span>
                                </label>

                                <div className="row">
                                  <div className="w-auto">
                                    <div className="input-block mb-3 recurring-tab">
                                      <ul
                                        className="nav nav-pills d-flex"
                                        id="pills-tab"
                                        role="tablist"
                                      >
                                        <li
                                          className="nav-item"
                                          role="presentation"
                                        >
                                          <button
                                            className={`nav-link yes ${formik.values[field.name] == 2
                                                ? "active show"
                                                : ""
                                              }`}
                                            onClick={() => HandelChange(2)}
                                            type="button"
                                            disabled={field.disable}
                                          >
                                            Per Trade
                                          </button>
                                        </li>
                                        <li
                                          className="nav-item"
                                          role="presentation"
                                        >
                                          <button
                                            className={`nav-link no ${formik.values[field.name] == 1
                                                ? "active show"
                                                : ""
                                              }`}
                                            onClick={() => HandelChange(1)}
                                            type="button"
                                            disabled={field.disable}
                                          >
                                            Fixed
                                          </button>
                                        </li>
                                      </ul>
                                      {formik.touched[field.name] &&
                                        formik.errors[field.name] ? (
                                        <div style={{ color: "red" }}>
                                          {formik.errors[field.name]}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={`col-lg-${field.col_size}`}>
                              <div className="input-block mb-3 flex-column"></div>
                            </div>
                          )}
                        </>
                      ) : field.type === "number" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="row d-flex">
                              <div className="col-lg-12 ">
                                <div className="form-group input-block mb-3">
                                  <label htmlFor={field.name}>
                                    {field.label}
                                  </label>

                                  <input
                                    type="number"
                                    name={field.name}
                                    aria-describedby="basic-addon1"
                                    className="form-control"
                                    id={field.name}
                                    placeholder={`Enter ${field.label}`}
                                    {...formik.getFieldProps(field.name)}
                                  />

                                  {formik.touched[field.name] &&
                                    formik.errors[field.name] ? (
                                    <div style={{ color: "red" }}>
                                      {formik.errors[field.name]}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "text3" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="row d-flex">
                              <div className="col-lg-12 ">
                                <div className="form-group input-block mb-3">
                                  <label htmlFor={field.name}>
                                    {field.label}
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="text"
                                    name={field.name}
                                    readOnly={field.disable}
                                    aria-describedby="basic-addon1"
                                    className="form-control"
                                    id={field.name}
                                    placeholder={`Enter ${field.label}`}
                                    {...formik.getFieldProps(field.name)}
                                    onChange={(e) => {
                                      const value = e.target.value;

                                      const newValue = value
                                        .replace(/\D/g, "")
                                        .slice(0, 10);
                                      e.target.value = newValue;
                                      formik.handleChange(e);
                                    }}
                                  />

                                  {formik.touched[field.name] &&
                                    formik.errors[field.name] ? (
                                    <div style={{ color: "red" }}>
                                      {formik.errors[field.name]}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "text4" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="row d-flex">
                              <div className="col-lg-12 ">
                                <div className="form-group input-block mb-3">
                                  <label htmlFor={field.name}>
                                    {field.label}
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="number"
                                    name={field.name}
                                    readOnly={field.disable}
                                    aria-describedby="basic-addon1"
                                    className="form-control"
                                    id={field.name}
                                    placeholder={`Enter ${field.label}`}
                                    {...formik.getFieldProps(field.name)}
                                    min={1}

                                    onChange={(e) => {
                                      let value = e.target.value;
                                      // Remove any leading zeros
                                      value = value.replace(/^0+/, "");
                                      // If value is empty, set it to 0
                                      if (value === "") {
                                        value = "";
                                      }
                                      // Enforce maximum value of 100
                                      value = Math.min(parseInt(value), 100);
                                      // Update input value
                                      e.target.value = value;
                                      formik.handleChange(e);
                                    }}
                                  />

                                  {formik.touched[field.name] &&
                                    formik.errors[field.name] ? (
                                    <div style={{ color: "red" }}>
                                      {formik.errors[field.name]}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === "text5" ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="row d-flex">
                              <div className="col-lg-12 ">
                                <div className="form-group input-block mb-3">
                                  <label htmlFor={field.name}>
                                    {field.label}
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="number"
                                    name={field.name}
                                    readOnly={field.disable}
                                    aria-describedby="basic-addon1"
                                    className="form-control"
                                    id={field.name}
                                    placeholder={`Enter ${field.label}`}
                                    {...formik.getFieldProps(field.name)}
                                    min={1}

                                    onChange={(e) => {
                                      let value = e.target.value;
                                      // Remove any leading zeros
                                      value = value.replace(/^0+/, "");
                                      // If value is empty, set it to 0
                                      if (value === "") {
                                        value = "";
                                      }
                                      // Enforce maximum value of 100
                                      value = Math.min(parseInt(value), 10000000000);
                                      // Update input value
                                      e.target.value = value;
                                      formik.handleChange(e);
                                    }}
                                  />

                                  {formik.touched[field.name] &&
                                    formik.errors[field.name] ? (
                                    <div style={{ color: "red" }}>
                                      {formik.errors[field.name]}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : field.type === 'security' ? (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="input-block mb-3 flex-column">
                              <label className={`col-lg-${field.label_size}`}>
                                {field.label}

                              </label>
                            </div>
                          </div>
                        </>

                      ) : (

                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="input-block mb-3"></div>
                          </div>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                  {additional_field}

                  <div className="add-customer-btns text-end mt-3">
                    {btn_name1 ? (
                      <Link
                        to={btn_name1_route}
                        className="btn customer-btn-cancel"
                      >
                        {btn_name1}
                      </Link>
                    ) : (
                      ""
                    )}
                    {
                      <>
                        <button type="submit" className="btn customer-btn-save">
                          {btn_name}
                        </button>
                        {btn_name2 ? (
                          <button
                            type="submit"
                            className="btn customer-btn-save"
                          >
                            {btn_name2}
                          </button>
                        ) : (
                          ""
                        )}
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
