import React from 'react';

const StockOutModal = ({ onClose }) => {

    console.log("neha 1")

    return (

        <div className=" modal custom-modal d-block" >
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                        <div className="form-header modal-header-title text-start mb-0">
                            <h4 className="mb-0">Remove Stock</h4>
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose} // Added onClick handler to close the modal
                        ></button>
                    </div>
                    <form action="#">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="input-block mb-3">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="bg-white-smoke form-control"
                                            placeholder="SEO Service"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="input-block mb-3">
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={0}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="input-block mb-0">
                                        <label>Units</label>
                                        <select className="select form-select">
                                            <option>Pieces</option>
                                            <option>Inches</option>
                                            <option>Kilograms</option>
                                            <option>Inches</option>
                                            <option>Box</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-block mb-0">
                                        <label>Notes</label>
                                        <textarea
                                            rows={3}
                                            cols={3}
                                            className="form-control"
                                            placeholder="Enter Notes"
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                className="btn btn-back cancel-btn me-2"
                                onClick={onClose} // Added onClick handler to close the modal
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                data-bs-dismiss="modal"
                                className="btn btn-primary paid-continue-btn"
                                onClick={onClose} // Added onClick handler to close the modal
                            >
                                Remove Quantity
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

      
    );
};

export default StockOutModal;
