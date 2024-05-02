import React from 'react'

function Payment() {
  return (
    <>
    
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
                                                                    <div className="status-toggle">
                                                                        <input
                                                                            id="rating_3"
                                                                            className="check"
                                                                            type="checkbox"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label htmlFor="rating_3" className="checktoggle checkbox-bg">

                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                <div className="input-block mb-0">
                                                                    <label>Razorpay Key Id</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Razorpay Key Id"
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
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* STRIPE */}
                                                    <div className="form-group-item">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="payment-toggle">
                                                                    <h5 className="form-title">Strip</h5>
                                                                    <div className="status-toggle">
                                                                        <input
                                                                            id="rating_1"
                                                                            className="check"
                                                                            type="checkbox"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label htmlFor="rating_1" className="checktoggle checkbox-bg">

                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                <div className="input-block mb-3">
                                                                    <label>Stripe Key</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Stripe Key"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                <div className="input-block mb-3">
                                                                    <label>Stripe Secret</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Stripe Secret"
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
                                                            <a href="javascript:void(0);" className="btn btn-primary">
                                                                Save Changes
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
    
    </>
  )
}

export default Payment