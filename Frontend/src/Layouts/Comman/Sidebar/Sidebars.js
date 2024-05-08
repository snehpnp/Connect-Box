import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>Settings</h5>
                        </div>
                    </div>
                    <div className="widget settings-menu mb-0">
                        <ul>
                           

                            <li className="nav-item">
                                <Link to="/companies" className="nav-link active">
                                    <i className="fe fe-settings" /> <span>Company Settings</span>
                                </Link>

                            </li>

                            <li className="nav-item">
                                <a href="template-invoice.html" className="nav-link">
                                    <i className="fe fe-layers" /> <span>Invoice Templates</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="payment-settings.html" className="nav-link">
                                    <i className="fe fe-credit-card" />{" "}
                                    <span>Payment Methods</span>
                                </a>
                            </li>


                            <li className="nav-item">
                                <a href="email-template.html" className="nav-link">
                                    <i className="fe fe-airplay" /> <span>Email Templates</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="email-settings.html" className="nav-link">
                                    <i className="fe fe-mail" /> <span>Logs</span>
                                </a>
                            </li>


                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
