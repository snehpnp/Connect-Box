import React, { useState, useEffect, useCallback } from "react";
import { infocompany, edit_company_info } from "../../../ReduxStore/Slice/Subadmin/System";
import { useDispatch } from "react-redux";
import { SubadminDetail } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import Swal from "sweetalert2";

function Payment() {
  const dispatch = useDispatch();
  const [getCompanyData, setCompanyData] = useState(null);
  const user_Id = JSON.parse(localStorage.getItem("user_details")).user_id
  const [razor_payment_key, Setrazor_payment_key] = useState(null);
  const [razor_payment_secretKey, Setrazor_payment_secretKey] = useState(null);

  const [refresh, setrefresh] = useState(null);

  // GET INFORMATION
  const fetchCompanyData = async () => {
    try {
      const response = await dispatch(infocompany({ id: user_Id })).unwrap();
      if (response.status) {
        
        setCompanyData(response.data[0]);
      } else {
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const UpdateRazorpayKey = async () => {

    const updatedData = {
      id: getCompanyData && getCompanyData._id,
      data: {
        razor_payment_key: razor_payment_key || getCompanyData.razor_payment_key,
        razor_payment_secretKey: razor_payment_secretKey || getCompanyData.razor_payment_secretKey,
      }
    };




    await dispatch(SubadminDetail(updatedData))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setrefresh(!refresh)
          Swal.fire({
            title: "Updated success!",
            icon: "success",
          });
        } else {
          setrefresh(!refresh)
        }

      })
      .catch((error) => {
        console.log("Error", error);
      });
  }





  useEffect(() => {
    fetchCompanyData();
  }, [refresh]);



  return (
    <>{getCompanyData && (
      <div className="col-xl-12 col-md-12">
        <div className="card">
          <div className="card-body w-100">
            <div className="content-page-header">
              <h5>Payment Settings</h5>
            </div>

            {/* RAZORPAY */}
            <div className="form-group-item border-0 p-0">
              <div className="row">
                <div className="col-12">
                  <div className="payment-toggle">
                    <h5 className="form-title">Razorpay</h5>
                    {/* <div className="status-toggle">
                    <input
                      id="rating_3"
                      className="check"
                      type="checkbox"
                      defaultChecked=""
                    />
                    <label
                      htmlFor="rating_3"
                      className="checktoggle checkbox-bg"
                    ></label>
                  </div> */}
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="input-block mb-0">
                    <label>Razorpay Key Id</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Razorpay Key Id"
                      onChange={(e) => Setrazor_payment_key(e.target.value)}
                      defaultValue={getCompanyData.razor_payment_key}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="input-block mb-0">
                    <label>Razorpay Secret</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Razorpay Secret"
                      onChange={(e) => Setrazor_payment_secretKey(e.target.value)}

                      defaultValue={getCompanyData.razor_payment_secretKey}
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-12">
              <div className="btn-path text-end">
                <a
                  href="javascript:void(0);"
                  className="btn btn-cancel bg-primary-light me-3"
                >
                  Cancel
                </a>
                <a href="javascript:void(0);" className="btn btn-primary" onClick={(e) => UpdateRazorpayKey()}>
                  Save Changes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    </>
  );
}

export default Payment;
