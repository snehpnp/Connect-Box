import React from 'react'
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable'
 
const columns = [
    {
        dataField: "index",
        text: "SR. No.",
        formatter: (cell, row, rowIndex) => rowIndex + 1,
    },
    {
        dataField: "UserName",
        text: "User Name",
      

    },
    {
        dataField: "Email",
        text: "Email",
    },   
];
 


 


const AllSubAdmin = () => {
    return (
        <>
            <div className="table-responsive">
                <FullDataTable 
                 TableColumns={columns}
                 />
            </div>
        </>
    )
}

export default AllSubAdmin