import React, { useState } from "react";
import { ChangedPassword } from "../../../ReduxStore/Slice/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const PasswordChange = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user_details"));

  const [password, setPassword] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        ChangedPassword({
          userid: user.user_id,
          CurrentPassword: password.CurrentPassword,
          NewPassword: password.NewPassword,
          ConfirmNewPassword: password.ConfirmNewPassword,
        })
      ).unwrap();

      if (response.success) {
        setPassword({
          CurrentPassword: "",
          NewPassword: "",
          ConfirmNewPassword: "",
        });

        Swal.fire({
          title: "Password Changed",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.message || "Failed to change password",
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
    <div>
      <div className="cardStyle">
        <form
          onSubmit={handleSubmit}
          name="passwordChangeForm"
          id="passwordChangeForm"
        >
          <div className="content-page-header">
          <h5 className="formTitle">Change Password</h5>
          </div>
         
          <div className="inputDiv w-100">
            <label className="inputLabel" htmlFor="currentPassword">
              Current Password
            </label>
            <input
            className="form-control"
              type="password"
              id="currentPassword"
              name="currentPassword"
              required
              value={password.CurrentPassword}
              onChange={(e) =>
                setPassword({ ...password, CurrentPassword: e.target.value })
              }
            />
          </div>
          <div className="inputDiv w-100">
            <label className="inputLabel" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="form-control"
              type="password"
              id="newPassword"
              name="newPassword"
              required
              value={password.NewPassword}
              onChange={(e) =>
                setPassword({ ...password, NewPassword: e.target.value })
              }
            />
          </div>
          <div className="inputDiv w-100">
            <label className="inputLabel" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              required
              value={password.ConfirmNewPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  ConfirmNewPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="buttonWrapper">
            <button type="submit" className="submitButton btn btn-primary w-auto">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
