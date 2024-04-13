import React from 'react'

const Makecall = () => {
    return (
        <div>
            <div className="content container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                            <h5 className="card-title mb-0 w-auto">

                                <i className="fas fa-money-bill-wave pe-2" />
                                Make Call
                            </h5>
                            <div className="pay-btn text-end w-auto" />
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
                                                    <div className="row mt-2">
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_check">
                                                                    <input
                                                                        id="at_check"
                                                                        type="radio"
                                                                        name="at_check"
                                                                        defaultValue="at"
                                                                        defaultChecked=""
                                                                    />
                                                                    At
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_above">
                                                                    <input
                                                                        id="at_above"
                                                                        type="radio"
                                                                        name="at_check"
                                                                        defaultValue="above"
                                                                    />
                                                                    Above
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_below">
                                                                    <input
                                                                        id="at_below"
                                                                        type="radio"
                                                                        name="at_check"
                                                                        defaultValue="below"
                                                                    />
                                                                    Below
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-3">
                                                            <div className="radio">
                                                                <label htmlFor="at_range">
                                                                    <input
                                                                        id="at_range"
                                                                        type="radio"
                                                                        name="at_check"
                                                                        defaultValue="range"
                                                                    />
                                                                    Range
                                                                </label>
                                                            </div>
                                                        </div>
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
                                                <div className="preview-boxs">
                                                    <a href="signature-preview-invoice.html">Preview Invoice</a>
                                                    <form
                                                        action="https://kanakku.dreamstechnologies.com/html/template/invoices.html"
                                                        className="add-customer-btns text-end"
                                                    >

                                                        <button type="submit" className="btn btn-primary">
                                                            Gnenerate
                                                        </button>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <div className="col-lg-12 col-md-12" data-aos="fade-right">

                            <ul className="nav nav-tabs nav-tabs-solid d-flex justify-content-center">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="#solid-tab1"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-solid fa-landmark pe-2"></i>
                                        Below
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#solid-tab2"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-solid fa-envelope pe-2"></i>
                                        Above
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#solid-tab3"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="fa-regular fa-image pe-2"></i>
                                        Range
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <div className="col-lg-12 col-md-12" data-aos="fade-left">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane show active" id="solid-tab1">

                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto"> <i className="fa-solid fa-landmark pe-2"></i>Below</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    {/* <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#company">
                                                        Edit Customer Information
                                                    </button> */}
                                                </div>
                                            </div>


                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th className="no-sort">Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane" id="solid-tab2">
                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto"> <i className="fa-solid fa-envelope pe-2"></i>Above</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#email">
                                                        Edit Email Information
                                                    </button>
                                                </div>
                                            </div>


                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th className="no-sort">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane" id="solid-tab3">
                                            <div className="card-header d-flex justify-content-between align-items-center border-bottom">
                                                <h5 className="card-title mb-0 w-auto">  <i className="fa-regular fa-image pe-2"></i>Range</h5>
                                                <div className="pay-btn text-end w-auto">
                                                    {/* <button className="btn btn-primary " data-bs-toggle="modal"
                                                        data-bs-target="#back">
                                                        Update Images
                                                    </button> */}
                                                </div>
                                            </div>

                                            <div className="invoice-total-box border">
                                                <div className="invoice-total-inner">
                                                    <div className="inventory-table">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Item</th>
                                                                    <th>Code</th>
                                                                    <th>Units</th>
                                                                    <th>Quantity</th>
                                                                    <th>Selling Price</th>
                                                                    <th>Purchase Price</th>
                                                                    <th>Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Nike Jordan</td>
                                                                    <td>P125390</td>
                                                                    <td>Pieces</td>
                                                                    <td>2</td>
                                                                    <td>$1360.00</td>
                                                                    <td>$1350.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Lobar Handy</td>
                                                                    <td>P125393</td>
                                                                    <td>Inches</td>
                                                                    <td>5</td>
                                                                    <td>$155.00</td>
                                                                    <td>$150.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>Iphone 14 Pro</td>
                                                                    <td>P125398</td>
                                                                    <td>Inches</td>
                                                                    <td>7</td>
                                                                    <td>$764.00</td>
                                                                    <td>$750.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>Black Slim 200</td>
                                                                    <td>P125395</td>
                                                                    <td>Inches</td>
                                                                    <td>3</td>
                                                                    <td>$255.00</td>
                                                                    <td>$250.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>Bold V3.2</td>
                                                                    <td>P125397</td>
                                                                    <td>Pieces</td>
                                                                    <td>6</td>
                                                                    <td>$1055.00</td>
                                                                    <td>$1050.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>Woodcraft Sandal</td>
                                                                    <td>P125394</td>
                                                                    <td>Pieces</td>
                                                                    <td>8</td>
                                                                    <td>$175.00</td>
                                                                    <td>$140.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a href="#" className="btn btn-greys bg-success-light me-2" data-bs-toggle="modal" data-bs-target="#stock_in">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock in
                                                                        </a>
                                                                        <a href="#" className="btn btn-greys bg-danger-light me-2" data-bs-toggle="modal" data-bs-target="#stock_out">
                                                                            <i className="fa fa-plus-circle me-1"></i> Stock out
                                                                        </a>
                                                                        <div className="dropdown dropdown-action">
                                                                            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                <ul>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#"><i className="far fa-edit me-2"></i>Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_stock"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
