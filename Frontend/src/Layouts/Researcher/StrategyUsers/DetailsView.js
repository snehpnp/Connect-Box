import React, { useState } from 'react';
import Modal from '../../../Components/ExtraComponents/Modal';
import { fDateTime } from '../../../Utils/Date_formet'
import BasicDataTable from "../../../Components/ExtraComponents/Tables/DataTable";

const DetailsView = ({ showModal, setshowModal, row_data }) => {


    const [isOn, setIsOn] = useState(false);

    // Handle the toggle action
    const handleToggle = () => {

        setIsOn(!isOn);
    };


    const columns1 = [
        {
            dataField: 'index',
            text: 'S.No.',
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },

        {
            dataField: 'Username',
            text: 'SubAdmin'
        },
        {
            dataField: 'purchase_type',
            text: 'Service Type'
        },
        {
            dataField: 'stg_count',
            text: 'Used Count'
        },
        {
            dataField: 'Amount',
            text: 'Amount',

        },
        {
            dataField: 'ActiveStatus',
            text: 'Status',
            formatter: (cell, row, rowIndex) => (

                <>
             
                    <label className="switch">
                        <input type="checkbox"
                            checked={true }
                        // onChange={(e) => {
                        //     activeUser(e, row);
                        //     setSwitchButton(e.target.checked)
                        // }}
                        
                        />
                        <span className="slider round"></span>
                    </label>

                </>

            ),
        },
        {
            dataField: 'createdAt',
            text: 'createdAt',
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? fDateTime(cell) : "-"}</span>
            ),

        },
        {
            dataField: 'End_Date',
            text: 'End Date',
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? fDateTime(cell) : "-"}</span>
            ),
        },
    ];




    return (
        <div>
            <Modal isOpen={showModal} size="xl" title="Subadmins" hideBtn={true}
                handleClose={() => setshowModal(false)}
            >
                <div className="card-body table-responsive">

                    <BasicDataTable TableColumns={columns1} tableData={row_data} />
                </div>
            </Modal >
        </div>
    )
}

export default DetailsView