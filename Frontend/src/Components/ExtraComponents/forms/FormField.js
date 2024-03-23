import React, { useState } from 'react';





const DynamicForm = ({ fields, ProfileShow, page_title, initialValues, validationSchema, onSubmit, btn_name_signUp, btn_name_login, fromDate, fieldtype, formik, btn_name, forlogin, title, additional_field }) => {


  const handleFileChange = (event, index, name) => { }

  const [passwordVisible, setPasswordVisible] = useState({});

  return (
    <div className="content container-fluid">
      <div className="card mb-0">
        <div className="card-body">
          <div className="page-header">
            <div className="content-page-header">
              <h5>{page_title}</h5>
            </div>
          </div>

          {
            ProfileShow && ProfileShow ?
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group-item">
                    <h5 className="form-title">Basic Details</h5>
                    <div className="profile-picture">
                      <div className="upload-profile">
                        <div className="profile-img">
                          <img
                            id="blah"
                            className="avatar"
                            src="assets/img/profiles/avatar-14.jpg"
                            alt="profile-img"
                          />
                        </div>
                        <div className="add-profile">
                          <h5>Upload a New Photo</h5>
                          <span>Profile-pic.jpg</span>
                        </div>
                      </div>
                      <div className="img-upload">
                        <label className="btn btn-upload">
                          Upload <input type="file" />
                        </label>
                        <a className="btn btn-remove">Remove</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              : ''
          }
          <div>
            <div>

              {/*  form  */}
              <div className="row d-flex " >
                {fields.map((field, index) => (

                  <>
                    {field.type === 'text' ? <>
                      <div className={` col-lg-${field.col_size}`} >
                        <div className="input-block mb-3 flex-column">
                          <label
                            className={`col-lg-${field.label_size}`}>
                            {field.label}
                            <span className="text-danger">*</span>
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Enter ${field.label}`}
                            readOnly={field.disable}
                            id={field.name}
                            name={field.name}
                          />
                        </div>
                      </div>









                    </> :
                      field.type === "file" ? <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex ">

                            <div className="input-block mb-3">

                              <label className={`col-form-${field.label_size}`} htmlFor={field.name}>
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                id={field.name}
                                className="form-control"

                                onChange={(e) => handleFileChange(e, index, field.name)}


                              />
                            </div>
                          </div>
                          {/* <img src={formik.getFieldProps(field.name).value} name={field.name} id={field.name} alt={`Preview ${index}`} className={`col-lg-11 ms-3
                                  // ${field.label_size}
                                   mb-3 border border-2`}
                            style={{ height: formik.getFieldProps(field.name).value ? '150px' : "", width: "95%" }}
                          /> */}
                        </div>
                      </> :
                        field.type === 'select' ? <>
                          <div className={`col-lg-${title === "update_theme" ? 12 : 6}`}>
                            <div className="input-block row">
                              <label
                                className={`col-lg-${title === "forlogin" ? 3 : title === "update_theme" ? 12 : 7}  col-form-label`}
                                htmlFor={field.name}
                              >
                                {field.label}
                                <span className="text-danger">*</span>
                              </label>
                              <div className={`col-lg-${title === "addgroup" ? 12 : 12}`}>
                                <select
                                  className="default-select wide form-control"
                                  id={field.name}
                                >
                                  <option value="" selected disable={field.disable}>
                                    Please Select {field.label}
                                  </option>
                                  {field.options.map((option) => (
                                    <option key={option.value} value={option.value}  >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>



                        </> :
                          field.type === "checkbox" ? <>
                            {field.options && field.options.length > 0 ? <>
                              {field.options && field.options.map((option, index) => (
                                <>
                                  <div className={`col-lg-${field.col_size}`} key={option.id}>
                                    <div className="row d-flex">
                                      <div className={`col-lg-${field.col_size}`}>
                                        <div class="form-check custom-checkbox input-block mb-3">
                                          <input type={field.type} className="form-check-input" id={option.label}
                                          //  {...formik.getFieldProps(option.name)}
                                          />
                                          <label className="form-check-label " for={option.label} >{option.label}</label>
                                        </div>
                                        {/* {formik.errors[field.name] &&
              <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>} */}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </> :
                              <>
                                <div className={`col-lg-${field.col_size}`} >
                                  <div className="row d-flex justify-content-start">
                                    <div
                                    //  className={`col-lg-${field.col_size}`}
                                    >
                                      <div class="form-check custom-checkbox mb-3">
                                        <input type={field.type} className="form-check-input" id={field.label}
                                        // {...formik.getFieldProps(field.name)}
                                        // checked={field.check_box_true}
                                        />
                                        <label className="form-check-label" for={field.label} >{field.label}</label>
                                      </div>
                                      {/* {formik.errors[field.name] &&
                                          <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>} */}
                                    </div>
                                  </div>
                                </div>
                              </>
                            }
                          </> :
                            field.type === "radio" ? <>
                              <label
                                className={`col-lg-${field.label_size} col-form-label fw-bold text-decoration-underline`}
                                htmlFor={field.parent_label}
                              >
                                {field.parent_label}
                              </label>

                              <div className={`d-flex`}>
                                <div className={`col-lg-${field.col_size} form-check custom-checkbox my-3`} >
                                  <input type={field.type} name={field.name} value={field.value1} className="form-check-input" id={field.title1}
                                  // {...formik.getFieldProps(field.name)}
                                  />
                                  <label className={`col-lg-${field.label_size} col-form-label mx-2`} for={field.title1}>{field.title1}</label>
                                </div>
                                <div className={`col-lg-${field.col_size} form-check custom-checkbox my-3`}>
                                  <input type={field.type} name={field.name} value={field.value2} className="form-check-input" id={field.title2}
                                  // {...formik.getFieldProps(field.name)}
                                  />
                                  <label className={`col-lg-${field.label_size} col-form-label  mx-2`} for={field.name}>{field.title2}</label>
                                </div>
                              </div>

                            </> :
                              field.type === "password" ? <>
                                <div className={`col-lg-${field.col_size}`}>
                                  <div className="mb-3 input-block row">
                                    <label
                                      className={`col-lg-${field.label_size} col-form-label `}
                                      htmlFor={field.name}
                                    >
                                      {field.label}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div
                                      // className={`col-lg-${field.col_size}`}
                                      style={{ position: 'relative' }}>

                                      <input
                                        id={field.name}
                                        type={passwordVisible[field.name] ? 'text' : field.type}
                                        placeholder={field.label}
                                        // {...formik.getFieldProps(field.name)}
                                        className={` form-control`}
                                      />
                                      <i class={`fa-solid ${passwordVisible[field.name] ? 'fa-eye-slash' : 'fa-eye'}`} style={{
                                        position: 'absolute',
                                        top: '1.5px',
                                        right: '20px',
                                        padding: '12.4px 6.6px',
                                        borderRadius: '3px'
                                      }}
                                        onClick={() => setPasswordVisible((prevState) => ({
                                          ...prevState,
                                          [field.name]: !prevState[field.name],
                                        }))

                                        }
                                      ></i>
                                      {/* {formik.errors[field.name] &&
                              <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>} */}
                                    </div>

                                  </div>
                                </div>
                              </> :
                                field.type === "date" ? <>
                                  <div className="col-lg-3">
                                    <div className="row d-flex">
                                      <div className="col-lg-12 ">
                                        <div class="form-check custom-checkbox input-block  mb-3">
                                          <label className="col-lg-6 " for={field.name}>{field.name}</label>
                                          <input type={field.type} name={field.name} className="form-control" id={field.name}
                                          // {...formik.getFieldProps(field.name)}

                                          //  min={field.name === "todate" ? fromDate : getCurrentDate()}
                                          />
                                        </div>
                                        {/* {formik.errors[field.name] &&
                                <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>} */}
                                      </div>
                                    </div>
                                  </div>
                                </> :
                                  field.type === "msgbox" ? <>
                                    <div className={`col-lg-${field.col_size}`}>
                                      <div className="row d-flex">
                                        <div className={`col-lg-${field.col_size}  `}>
                                          <div class="mb-3 input-block">
                                            <label className={`col-lg-${field.label_size}`} for={field.name}>{field.label}</label>
                                            <textarea class="form-control" rows={field.row_size} id={field.name} name={field.name}
                                              // {...formik.getFieldProps(field.name)}
                                              placeholder={field.label}
                                            ></textarea>
                                            {/* {formik.errors[field.name] &&
                                    <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>} */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </> :
                                    field.type === "test" ? <>
                                      <div className="col-lg-3">
                                        <div className="row d-flex">
                                          <div className="col-lg-12 ">
                                            <div class="form-check custom-checkbox input-block mb-3">
                                              <input type={field.type} name={field.name} className="form-check-input" id={field.name}
                                              // {...formik.getFieldProps(field.name)}
                                              />
                                              <label className="form-check-label" for={field.name}>{field.name}</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </> :
                                      field.type === "number" ? <>
                                        <div className={`col-lg-${field.col_size}`}>
                                          <div className="row d-flex">
                                            <div className="col-lg-12 ">
                                              <div className="form-group input-block mb-3">
                                                <label htmlFor={field.name}>{field.name}</label>
                                                <input
                                                  type="number"
                                                  name={field.name}
                                                  className="form-control"
                                                  id={field.name}
                                                // {...formik.getFieldProps(field.name)}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </> :
                                        <>
                                          <div className={`col-lg-${field.col_size}`} >
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
                                            </div>
                                          </div>
                                        </>

                    }
                  </>
                ))}
                <div className="add-customer-btns text-end">
                  <a href="customers.html" className="btn customer-btn-cancel">
                    Cancel
                  </a>
                  <a href="customers.html" className="btn customer-btn-save">
                    {btn_name}
                  </a>
                </div>
              </div >
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default DynamicForm;
