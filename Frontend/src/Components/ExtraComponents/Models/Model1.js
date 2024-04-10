import React from 'react'

const Model1 = ({closeModal , page_title}) => {
    return (
        <>
            <div className="modal custom-modal custom-lg-modal p-20 d-block" data-aos="fade-down">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <div className="form-header modal-header-title text-start mb-0">
                                <h4 className="mb-0">{page_title}</h4>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <form action="https://kanakku.dreamstechnologies.com/html/template/companies.html">
                            <div className="modal-body">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Strategy Name*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Strategy Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Per Lot Amount*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Per Lot Amount"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="form-label">catagory*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter catagory*" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Select Segment*</label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Please Select Segment"
                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="mb-2">Indicator*</label>
                                            <input
                                                className="form-control"

                                                type="file"
                                                placeholder="No file Choosen    "
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Strategy Tester*</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                placeholder="No file Choosen"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="form-control-label">Strategy Logo*</label>
                                            <div className="pass-group modal-password-field">
                                                <input
                                                    type="file"
                                                    className="form-control pass-input"
                                                    placeholder="No file Choosen"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <label className="form-control-label">Strategy description</label>
                                            <div className="pass-group modal-password-field">
                                                <input
                                                    type="text"
                                                    className="form-control pass-input-two"
                                                    placeholder="Strategy description"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Monthly</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                placeholder='Enter Monthly'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Quaterly</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                placeholder='Enter Quaterly'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Half Yearly</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                placeholder='Enter Half Yearly'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-block mb-3">
                                            <label className="form-label">Yearly</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                placeholder='Enter Yearly'
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">

                                <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary paid-continue-btn mt-2"
                                >
                                    Add Strategy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Model1