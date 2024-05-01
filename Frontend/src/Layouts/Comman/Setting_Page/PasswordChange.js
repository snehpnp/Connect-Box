import React, { useState } from "react";
import { ChangedPassword } from "../../../ReduxStore/Slice/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const PasswordChange = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  //password post
  const postPassword = async () => {
    await dispatch(
      ChangedPassword({
        CurrentPassword: password.CurrentPassword,
        NewPassword: password.NewPassword,
        ConfirmNewPassword: password.ConfirmNewPassword,
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setPassword(response.data);
          console.log("response",response.data)
        .then((result) => {
            console.log("error")
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div className="cardStyle">
        <form action="" method="post" name="signupForm" id="signupForm">
          <h5 className="formTitle">Change Password</h5>
          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">
              Current Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required=""
              value={password.CurrentPassword}
              onChange={(e) =>
                setPassword({ ...password, CurrentPassword: e.target.value })
              }
            />
          </div>
          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">
              New Password
            </label>
            <input type="password" id="password" name="password" required="" 
              value={password.NewPassword}
              onChange={(e) =>
                setPassword({ ...password, NewPassword: e.target.value })
              }
            
            />
          </div>
          <div className="inputDiv">
            <label className="inputLabel" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={password.ConfirmNewPassword}
              onChange={(e) =>
                setPassword({ ...password,ConfirmNewPassword:e.target.value })
              }
            />
          </div>
          <div className="buttonWrapper">
            <button type="submit" id="submitButton" className="submitButton">
              <span onClick={postPassword}>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
