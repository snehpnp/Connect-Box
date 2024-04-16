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
}) => {
  const location = useLocation();

  const [inputPerTrade, setInputPerTrade] = useState("");
  const [inputPerStrategy, setInputPerStrategy] = useState("");

  const [previews, setPreviews] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState({});
  const [inputValue, setInputValue] = useState('');



  const prifix_key = JSON.parse(
    localStorage.getItem("user_details")
  ).prifix_key;

  const handleFileChange = (event, index, name) => {
    if (event.target.files[0].size > 420000) {
      alert("Please  Select file less then 420KB");
      event.target.value = "";
      return;
    } else {
      const file = event.target.files[0];
      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      console.log("newPreviews[index]", newPreviews[index]);
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
    const newValue = e.target.value.toUpperCase()
    if (/^[a-zA-Z]{0,3}$/.test(newValue)) {  
      setInputValue(newValue);
      formik.handleChange(e);  
    }
   
  }




  console.log("inputValue :", inputValue && inputValue)

  return (
    <div className="content container-fluid" data-aos="fade-left">
      <div className="card mb-0">
        <div className="card-header">

          {page_title ? <h5 className="card-title mb-0 w-auto"><i className="fa-regular fa-circle-user pe-2"></i>{page_title} </h5> : ""}

        </div>
        <form onSubmit={formik.handleSubmit}>
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
                                id={field.name}
                                name={field.name}
                                {...formik.getFieldProps(field.name)}
                                value={
                                  formik.values[field.name].startsWith(prifix_key + "_") ?
                                    formik.values[field.name] :
                                    formik.values[field.name].startsWith(prifix_key)
                                      ? prifix_key + "_" + formik.values[field.name].substr(3)
                                      : prifix_key + "_" + formik.values[field.name]
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
                                aria-describedby="basic-addon1"
                                className="form-control"
                                placeholder={`Enter ${field.label}`}
                                readOnly={field.disable}
                                id={field.name}
                                name={field.name}
                                {...formik.getFieldProps(field.name)}
                              />
                            </div>
                            {formik.touched[field.name] &&
                              formik.errors[field.name] ? (
                              <div style={{ color: "red" }}>
                                {formik.errors[field.name]}
                              </div>
                            ) : null}
                          </div>

                        </>
                      ) : field.type === "text2" ? (
                        <>
                          {console.log("cpppppp")}
                          <div className={` col-lg-${field.col_size}`}>
                            <div className="input-block mb-3 flex-column">
                              <label className={`col-lg-${field.label_size}`}>
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                aria-describedby="basic-addon1"
                                className="form-control"
                                placeholder={`Enter ${field.label}`}
                                readOnly={field.disable}
                                id={field.name}
                                name={field.name}

                                onChange={handleOnchange}
                                value={inputValue}
                              // {...formik.getFieldProps(field.name)}
                              />
                              
                            </div>
                            {formik.touched[field.name] &&
                              formik.errors[field.name] ? (
                              <div style={{ color: "red" }}>
                                {formik.errors[field.name]}
                              </div>
                            ) : null}
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
                                    src={formik.values[field.name] ? formik.values[field.name] : "assets/img/profiles/avatar-14.jpg"}
                                    alt="profile-img"
                                  />
                                </div>
                                <div className="add-profile">
                                  <h5>Upload a Photo</h5>
                                  <span>{selectedImage ? selectedImage.name : "Profile-pic.jpg"}</span>
                                </div>
                              </div>
                              <div className="img-upload d-flex">
                                {/* Input field for selecting an image */}
                                <label className="btn btn-upload">
                                  Upload <input type="file"
                                    id={field.name}
                                    className="form-control"
                                    onChange={(e) =>
                                      handleFileChange(e, index, field.name)
                                    } />
                                </label>
                                {/* Button to remove the selected image */}
                                {/* <button className="btn btn-remove" onClick={() => formik.setFieldValue(field.name, '')}>Remove</button> */}
                              </div>
                            </div>




                          </div>
                        </>
                      ) : field.type === "file1" ? (
                        <>
                          {/* <div className={`col-lg-${field.col_size}`}>
                            <div className="profile-picture">
                              <div className="upload-profile">
                                <div className="profile-img">
                                  <img
                                    id="blah"
                                    className="avatar"
                                    src={formik.values[field.name] ? formik.values[field.name] : "assets/img/profiles/avatar-14.jpg"}
                                    alt="profile-img"
                                  />
                                </div>
                                <div className="add-profile">
                                  <h5>Upload a Photo</h5>
                                  <span>{selectedImage ? selectedImage.name : "Profile-pic.jpg"}</span>
                                </div>
                              </div>
                              <div className="img-upload d-flex">
                                <label className="btn btn-upload">
                                  Upload <input type="file"
                                    id={field.name}
                                    className="form-control"
                                    onChange={(e) =>
                                      handleFileChange(e, index, field.name)
                                    } />
                                </label>
                            </div>
                            </div>




                          </div> */}
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="row d-flex">
                              {/* <div className={`col-lg-${field.col_size}`}> */}
                              <div className="mb-3">
                                <label className={`col-form-${field.label_size}`} htmlFor={field.name}>
                                  {field.label}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="file"
                                  id={field.name}
                                  onChange={(e) => handleFileChange(e, index, field.name)} // Pass the index to the handler
                                  className={`form-control`}
                                />
                              </div>
                              {formik.getFieldProps(field.name).value ?
                                <img src={formik.getFieldProps(field.name).value} name={field.name} id={field.name} alt={`Preview ${index}`} className={`col-lg-11 ms-3 ${field.label_size} mb-3 border border-2`}
                                  style={{ height: formik.getFieldProps(field.name).value ? '150px' : "", width: "95%" }}
                                /> : ''}


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
                                  <option value="" selected  >
                                    Please Select {field.label}
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
                                          <div className="form-check custom-checkbox input-block mb-3">
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
                                ))}
                            </>
                          ) : (
                            <>
                              <div className={`col-lg-${field.col_size}`}>
                                <div className="row d-flex justify-content-start">
                                  <div
                                  //  className={`col-lg-${field.col_size}`}
                                  >
                                    <div className="form-check custom-checkbox mb-3">
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
                                  type={
                                    passwordVisible[field.name]
                                      ? "text"
                                      : field.type
                                  }
                                  placeholder={field.label}
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
                          <div className="col-lg-3">
                            <div className="row d-flex">
                              <div className="col-lg-12 ">
                                <div className="form-check custom-checkbox input-block mb-3">
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    className="form-check-input"
                                    id={field.name}
                                    {...formik.getFieldProps(field.name)}
                                  />
                                  <label
                                    className="form-check-label"
                                    for={field.name}
                                  >
                                    {field.name}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
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
                                    onKeyDown={(e) => {

                                      if (
                                        [46, 8, 9, 27, 13, 110, 190].includes(e.keyCode) ||
                                        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                                        (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                                        (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
                                        (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true))
                                      ) {
                                        return;
                                      }
                                      if (
                                        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
                                        (e.keyCode < 96 || e.keyCode > 105)
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
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
                      ) : field.type === "number1" ? (
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

                                    onKeyDown={(e) => {

                                      if (
                                        [46, 8, 9, 27, 13, 110, 190].includes(e.keyCode) ||
                                        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                                        (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                                        (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
                                        (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true))
                                      ) {
                                        return;
                                      }
                                      if (
                                        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
                                        (e.keyCode < 96 || e.keyCode > 105)
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    {...formik.getFieldProps(field.name)}
                                    onChange={(e) => {
                                      const value = e.target.value
                                      if (value.length > 10) {
                                        e.target.value = value.slice(0, 10);
                                      } else {
                                        formik.handleChange(e);
                                      }
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
                      ) : (
                        <>
                          <div className={`col-lg-${field.col_size}`}>
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Enter ${field.label}`}
                                name={field.name}
                                required=""
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
                      <button type="submit" className="btn customer-btn-save">
                        {btn_name}
                      </button>
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
