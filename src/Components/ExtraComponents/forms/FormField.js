import React from 'react';

const DynamicForm = ({ fields, initialValues, validationSchema, onSubmit, btn_name_signUp, btn_name_login, fromDate, fieldtype, formik, btn_name, forlogin, title, additional_field }) => {
  return (
    <div className="content container-fluid">
      <div className="card mb-0">
        <div className="card-body">
          <div className="page-header">
            <div className="content-page-header">
              <h5>Add Customer</h5>
            </div>
          </div>
          <div className="">
            <div className="row d-flex justify-content-center">
              <form action="#">
                {fields.map((field, index) => (

                  <div key={index}>
                    <div className="input-block mb-3" >

                      <label className={`col-lg-6 : 4} col-form-label`}>
                        {field.label}
                        <span className="text-danger">*</span>
                      </label>

                      <div className={`col-lg-6 : 7} `}>
                        <input
                          type='text'
                          className="form-control"
                          placeholder={`Enter ${field.label}`}
                          name={field.name}
                          required=""
                        />
                      </div>
                    </div>

                  </div>












                ))}
                <div className="add-customer-btns text-end">
                  <a href="customers.html" className="btn customer-btn-cancel">
                    Cancel
                  </a>
                  <a href="customers.html" className="btn customer-btn-save">
                    Save Changes
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
