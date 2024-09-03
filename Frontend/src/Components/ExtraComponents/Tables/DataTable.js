import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';




const FullDataTable = ({ tableData, TableColumns, tableoptions, selectRow, keyField, pagination1, rowStyle }) => {
    const options = {
        sizePerPage: 10,
        hidePageListOnlyOnePage: true,
        ...tableoptions
    };


    return (
        <div className='table-container'>
            {tableData.length === 0 ? (
                <div style={{width:"50%",height:"40%", marginLeft:"25%"}}>
          <img src="assets/img/icons/Empty.jpg" alt="No data available"/>
          </div>
            ) : (
                <BootstrapTable
                    keyField={keyField ? keyField : "id"}
                    data={tableData}
                    columns={TableColumns}
                    pagination={!pagination1 ? paginationFactory(options) : false}
                    selectRow={selectRow}
                    headerClasses="text-primary text-center header-class"
                    rowClasses={`text-center`}
                    rowStyle={rowStyle}
                />
            )}
        </div>
    );
}

export default FullDataTable;
