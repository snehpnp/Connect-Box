import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdatePassword } from "../../ReduxStore/Slice/Auth/AuthSlice";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { encode, decode } from "js-base64";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const dcoded_UsrId = decode(id).replace(/"/g, "");

  // State for storing email input
  const [Password, setPassword] = useState({
    userid: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleForget = async (e) => {
    e.preventDefault();
    try {
      if (Password.NewPassword !== Password.ConfirmPassword) {
        Swal.fire({
          title: "Error",
          text: "New password and confirm password do not match",
          icon: "error",
        });
        return;
      }

      const response = await dispatch(
        UpdatePassword({
          userid: dcoded_UsrId,
          NewPassword: Password.NewPassword,
          ConfirmPassword: Password.ConfirmPassword,
        })
      ).unwrap();
      if (response.status) {
        setPassword({
          NewPassword: "",
          ConfirmPassword: "",
        });
        Swal.fire({
          title: "Password Changed",
          icon: "success",
        }).then(() => {
          // Navigate to the login page after success
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.msg || "Failed to send email",
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Error", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox" style={{ width: "500px" }}>
            <div className="row">
              <div className="col-md-12">
                <div className="login-right">
                  <div className="login-right-wrap">
                    <img
                      className="img-fluid logo-dark mb-2"
                      src="/assets/img/pnp.png"
                      alt="Logo"
                      style={{ width: "15rem", margin: "0 auto" }} // Center the logo
                    />
                    <div className="text-center mb-4">
                      <h2 className="mb-0">Set Password</h2>
                    </div>
                    <div className="pt-5" data-aos="fade-left">
                      <div className="input-block mb-3">
                        <label
                          className="form-control-label d-flex justify-content-start"
                          htmlFor="Password"
                        >
                          New Password
                        </label>
                        <input
                          type="Password"
                          id="Password"
                          className="form-control"
                          value={Password.NewPassword}
                          onChange={(e) =>
                            setPassword({
                              ...Password,
                              NewPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input-block mb-3">
                        <label
                          className="form-control-label d-flex justify-content-start"
                          htmlFor="ConPassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="ConPassword"
                          id="Password"
                          className="form-control"
                          value={Password.ConfirmPassword}
                          onChange={(e) =>
                            setPassword({
                              ...Password,
                              ConfirmPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="add-customer-btns d-flex justify-content-between text-end mt-3">
                        <button
                          className="btn customer-btn-save"
                          onClick={handleForget}
                        >
                          Update
                        </button>
                      </div>
                      <Link to="/login" className="text-center d-block">
                        Go To Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
