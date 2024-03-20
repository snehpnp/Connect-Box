import React from 'react'

function MessageBrodcast() {
  return (
  <>
  
  
  <div className="table-responsive">
                <table className="table table-stripped table-hover datatable">
                    <thead className="thead-light">
                        <tr>
                            <th>
                                <label className="custom_check">
                                    <input type="checkbox" name="invoice" />
                                    <span className="checkmark" />
                                </label>
                                Invoice No
                            </th>
                            <th>Category</th>
                            <th>Created On</th>
                            <th>Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Payment Mode</th>
                            <th>Balance</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label className="custom_check">
                                    <input type="checkbox" name="invoice" />
                                    <span className="checkmark" />
                                </label>
                                <a href="invoice-details.html" className="invoice-link">
                                    #4987
                                </a>
                            </td>
                            <td>Food</td>
                            <td>23 Mar 2023</td>
                            <td>$1,54,220</td>
                            <td>$1,50,000</td>
                            <td>Cash</td>
                            <td>$2,54,00</td>
                            <td>25 Mar 2023</td>
                            <td>
                                <span className="badge bg-success-light">Paid</span>
                            </td>
                            <td>
                                <div className="dropdown dropdown-action">
                                    <a
                                        href="#"
                                        className=" btn-action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end customer-dropdown">
                                        <ul>
                                            <li>
                                                <a className="dropdown-item" href="edit-customer.html">
                                                    <i className="far fa-edit me-2" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="javascript:void(0);"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete_modal"
                                                >
                                                    <i className="far fa-trash-alt me-2" />
                                                    Delete
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="customer-details.html">
                                                    <i className="far fa-eye me-2" />
                                                    View
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-send me-2" />
                                                    Send
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-download me-2" />
                                                    Download
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="add-credit-notes.html">
                                                    <i className="fe fe-file-text me-2" />
                                                    Convert to Sales Return
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-copy me-2" />
                                                    Clone as Invoice
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="custom_check">
                                    <input type="checkbox" name="invoice" />
                                    <span className="checkmark" />
                                </label>
                                <a href="invoice-details.html" className="invoice-link">
                                    #4988
                                </a>
                            </td>
                            <td>Advertising</td>
                            <td>16 Mar 2023</td>
                            <td>$3,54,220</td>
                            <td>$2,50,000</td>
                            <td>Cheque</td>
                            <td>$4,220</td>
                            <td>16 Jan 2023</td>
                            <td>
                                <span className="badge bg-warning-light text-warning">Overdue</span>
                            </td>
                            <td>
                                <div className="dropdown dropdown-action">
                                    <a
                                        href="#"
                                        className=" btn-action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end customer-dropdown">
                                        <ul>
                                            <li>
                                                <a className="dropdown-item" href="edit-customer.html">
                                                    <i className="far fa-edit me-2" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="javascript:void(0);"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete_modal"
                                                >
                                                    <i className="far fa-trash-alt me-2" />
                                                    Delete
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="customer-details.html">
                                                    <i className="far fa-eye me-2" />
                                                    View
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-send me-2" />
                                                    Send
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-download me-2" />
                                                    Download
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="add-credit-notes.html">
                                                    <i className="fe fe-file-text me-2" />
                                                    Convert to Sales Return
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-copy me-2" />
                                                    Clone as Invoice
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="custom_check">
                                    <input type="checkbox" name="invoice" />
                                    <span className="checkmark" />
                                </label>
                                <a href="invoice-details.html" className="invoice-link">
                                    #4989
                                </a>
                            </td>
                            <td>Marketing</td>
                            <td>25 Feb 2023</td>
                            <td>$1,54,220</td>
                            <td>$1,50,000</td>
                            <td>Cash</td>
                            <td>$4,220</td>
                            <td>16 Jan 2023</td>
                            <td>
                                <span className="badge bg-danger-light text-danger">Cancelled</span>
                            </td>
                            <td>
                                <div className="dropdown dropdown-action">
                                    <a
                                        href="#"
                                        className=" btn-action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end customer-dropdown">
                                        <ul>
                                            <li>
                                                <a className="dropdown-item" href="edit-customer.html">
                                                    <i className="far fa-edit me-2" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="javascript:void(0);"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete_modal"
                                                >
                                                    <i className="far fa-trash-alt me-2" />
                                                    Delete
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="customer-details.html">
                                                    <i className="far fa-eye me-2" />
                                                    View
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-send me-2" />
                                                    Send
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-download me-2" />
                                                    Download
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="add-credit-notes.html">
                                                    <i className="fe fe-file-text me-2" />
                                                    Convert to Sales Return
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-copy me-2" />
                                                    Clone as Invoice
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="custom_check">
                                    <input type="checkbox" name="invoice" />
                                    <span className="checkmark" />
                                </label>
                                <a href="invoice-details.html" className="invoice-link">
                                    #4990
                                </a>
                            </td>
                            <td>Repairs</td>
                            <td>25 Mar 2023</td>
                            <td>$1,54,220</td>
                            <td>$1,50,000</td>
                            <td>Cash</td>
                            <td>$4,220</td>
                            <td>12 May 2023</td>
                            <td>
                                <span className="badge bg-primary-light">Partially Paid</span>
                            </td>
                            <td>
                                <div className="dropdown dropdown-action">
                                    <a
                                        href="#"
                                        className=" btn-action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end customer-dropdown">
                                        <ul>
                                            <li>
                                                <a className="dropdown-item" href="edit-customer.html">
                                                    <i className="far fa-edit me-2" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="javascript:void(0);"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete_modal"
                                                >
                                                    <i className="far fa-trash-alt me-2" />
                                                    Delete
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="customer-details.html">
                                                    <i className="far fa-eye me-2" />
                                                    View
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-send me-2" />
                                                    Send
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-download me-2" />
                                                    Download
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="add-credit-notes.html">
                                                    <i className="fe fe-file-text me-2" />
                                                    Convert to Sales Return
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-copy me-2" />
                                                    Clone as Invoice
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="custom_check">
                                    <input type="checkbox" name="invoice" />
                                    <span className="checkmark" />
                                </label>
                                <a href="invoice-details.html" className="invoice-link">
                                    #4991
                                </a>
                            </td>
                            <td>Software</td>
                            <td>12 May 2022</td>
                            <td>$5,54,220</td>
                            <td>$3,50,000</td>
                            <td>Cheque</td>
                            <td>$4,220</td>
                            <td>18 May 2022</td>
                            <td>
                                <span className="badge bg-light-gray text-secondary">Unpaid</span>
                            </td>
                            <td>
                                <div className="dropdown dropdown-action">
                                    <a
                                        href="#"
                                        className=" btn-action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end customer-dropdown">
                                        <ul>
                                            <li>
                                                <a className="dropdown-item" href="edit-customer.html">
                                                    <i className="far fa-edit me-2" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="javascript:void(0);"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete_modal"
                                                >
                                                    <i className="far fa-trash-alt me-2" />
                                                    Delete
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="customer-details.html">
                                                    <i className="far fa-eye me-2" />
                                                    View
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-send me-2" />
                                                    Send
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-download me-2" />
                                                    Download
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="add-credit-notes.html">
                                                    <i className="fe fe-file-text me-2" />
                                                    Convert to Sales Return
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-copy me-2" />
                                                    Clone as Invoice
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="custom_check">
                                    <input type="checkbox" name="invoice" />
                                    <span className="checkmark" />
                                </label>
                                <a href="invoice-details.html" className="invoice-link">
                                    #4992
                                </a>
                            </td>
                            <td>Stationary</td>
                            <td>16 Nov 2022</td>
                            <td>$5,54,220</td>
                            <td>$6,50,000</td>
                            <td>Cash</td>
                            <td>$4,220</td>
                            <td>25 Feb 2022</td>
                            <td>
                                <span className="badge bg-light-gray text-primary">Draft</span>
                            </td>
                            <td>
                                <div className="dropdown dropdown-action">
                                    <a
                                        href="#"
                                        className=" btn-action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-ellipsis-v" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end customer-dropdown">
                                        <ul>
                                            <li>
                                                <a className="dropdown-item" href="edit-customer.html">
                                                    <i className="far fa-edit me-2" />
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="javascript:void(0);"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete_modal"
                                                >
                                                    <i className="far fa-trash-alt me-2" />
                                                    Delete
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="customer-details.html">
                                                    <i className="far fa-eye me-2" />
                                                    View
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-send me-2" />
                                                    Send
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-download me-2" />
                                                    Download
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="add-credit-notes.html">
                                                    <i className="fe fe-file-text me-2" />
                                                    Convert to Sales Return
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="">
                                                    <i className="fe fe-copy me-2" />
                                                    Clone as Invoice
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

isme column or header ko me dynamic karna chata hu ki array array bna ke usme change karu or sab jagah change ho jare esa kar ke do 
  
  </>
  )
}

export default MessageBrodcast