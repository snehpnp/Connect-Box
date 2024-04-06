import React from 'react'

const Makecall = () => {
    return (
        <div>
            <div className="content container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="page-header">
                            <div className="content-page-header">
                                <h5>Make Call</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="edit-card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Script Type * </label>
                                                        <select className="form-select">
                                                            <option name="none" disabled="">Select Script Type</option>
                                                            <option name="CASH" value="24">CASH</option>
                                                            <option name="CASH_BSE" value="40">CASH_BSE</option>
                                                            <option name="CURRENCY FUTURE" value="37">CURRENCY FUTURE</option>
                                                            <option name="CURRENCY OPTION" value="36">CURRENCY OPTION</option>
                                                            <option name="FUTURE" value="25">FUTURE</option>
                                                            <option name="MCXFUTURE" value="34">MCXFUTURE</option>
                                                            <option name="MCXOPTION" value="35">MCXOPTION</option>
                                                            <option name="OPTION" value="26">OPTION</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Script Name</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <select className="form-select">
                                                                    <option>Customer 1</option>
                                                                    <option>Customer 2</option>
                                                                    <option>Customer 3</option>
                                                                </select>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="btn btn-primary form-plus-btn"
                                                                    href="add-customer.html"
                                                                >
                                                                    <i className="fe fe-plus-circle" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Expiry Date</label>
                                                        <select className="form-select">
                                                            <option>Customer 1</option>
                                                            <option>Customer 2</option>
                                                            <option>Customer 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Select Strategy -</label>
                                                        <select className="form-select">
                                                            <option>Customer 1</option>
                                                            <option>Customer 2</option>
                                                            <option>Customer 3</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="edit-card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Type -</label>
                                                        <select className="form-select">
                                                            <option>Buy</option>
                                                            <option>Sell</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Market Time -</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <select className="form-select">
                                                                    <option>Customer 1</option>
                                                                    <option>Customer 2</option>
                                                                    <option>Customer 3</option>
                                                                </select>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="btn btn-primary form-plus-btn"
                                                                    href="add-customer.html"
                                                                >
                                                                    <i className="fe fe-plus-circle" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Entry Price :</label>
                                                        <select className="form-select">
                                                            <option>Customer 1</option>
                                                            <option>Customer 2</option>
                                                            <option>Customer 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Intraday / Delivery -</label>
                                                        <select className="form-select">
                                                            <option>Intraday</option>
                                                            <option>Delivery</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Wise Type -</label>
                                                        <select className="form-select">
                                                            <option>Percentage</option>
                                                            <option>Points</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Makecall
