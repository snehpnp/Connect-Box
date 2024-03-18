/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {  Link } from "react-router-dom";



const DropDown = () => {
   
    const LogoutUser = async () => {
        console.log("LogOut User")
    }

    const profile_Route = () => {
        console.log("Profile btn Click")

        // if (Role === "USER") {
        //     return "/client/profile"
        // }
        // else if (Role === "ADMIN") {
        //     return "/admin/profile"
        // }
        // else if (Role === "SUBADMIN") {
        //     return "/subadmin/profile"
        // }
        // else if (Role === "SUPERADMIN") {
        //     return "/super/profile"
        // } else {
        //     return "/client/profile"
        // }

    }


    return (
        <div className="mb-0 dropdown custom-dropdown">
            <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img src="../assets/images/avatar/1.png" />
                <i className="fa fa-angle-down ms-3" />
            </button>
            <div className="dropdown-menu dropdown-menu-end" style={{ margin: 0, padding: "11px" }}>
                <Link to={profile_Route()} className="btn btn-primary w-100 my-2 ">
                    Profile
                </Link>
                    <button className="btn btn-primary  w-100 " onClick={(e) => LogoutUser(e)}>
                        Logout
                    </button>
            </div>
        </div>
    )
}

export default DropDown