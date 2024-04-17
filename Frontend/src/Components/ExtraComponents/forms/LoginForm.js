import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { MoveLeft, Plus } from "lucide-react";

const Loginform = ({
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





    const [passwordVisible, setPasswordVisible] = useState({});






    return (
        <div className="content container-fluid" data-aos="fade-left">
            <div className="card mb-0">
                 
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
                                            {field.type === "text" ? (
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
                                            ) : field.type === "text3" ? (
                                                <>
                                                    <div className={`col-lg-${field.col_size}`}>
                                                        <div className="row d-flex">
                                                            <div className="col-lg-12 ">
                                                                <div className="form-group input-block mb-3">
                                                                    <label htmlFor={field.name}>
                                                                        {field.label}
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        name={field.name}
                                                                        aria-describedby="basic-addon1"
                                                                        className="form-control"
                                                                        id={field.name}
                                                                        placeholder={`Enter ${field.label}`}
                                                                        {...formik.getFieldProps(field.name)}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            const newValue = value.replace(/\D/g, '').slice(0, 10);
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
                                    <div className="add-customer-btns d-flex justify-content-between text-end mt-3">
                                        {btn_name1 ? (
                                            <Link
                                                to={btn_name1_route}
                                                className="btn btn btn-primary"
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

export default Loginform;
