/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import MyPaginationComponent from '../MyPaginationComponent'



const FullDataTable = ({ tableData, TableColumns, tableoptions, selectRow, keyField, pagination1, rowStyle }) => {

    // //  No Data Image
    const NoDataIndication = () => (
        <>
            <img src='../../../../assets/images/norecordfound.png' alt="sss"
                className='mx-auto d-flex'
            />
        </>
    );


    const options = {
        sizePerPage: 10,
        hidePageListOnlyOnePage: true,
        ...tableoptions
    };





    return <>
        <BootstrapTable
            keyField={keyField ? keyField : "id"}
            data={tableData}
            columns={TableColumns}
            pagination={!pagination1 ? paginationFactory(options) : ""}
            selectRow={selectRow}
            noDataIndication={() => <NoDataIndication />}
            headerClasses="text-center  "
            rowClasses={`text-center`}
            headerStyle={{ color: 'red' }}
            rowStyle={rowStyle}
            wrapperClasses="table-responsive"
            defaultSorted={[{ dataField: 'columnName', order: 'asc' }]}  
            sort={{
                sortFunc: (a, b, order, dataField) => {  
                    if (order === 'asc') {
                        return a[dataField].localeCompare(b[dataField]);
                    }
                    return b[dataField].localeCompare(a[dataField]);
                }
            }}
        />
    </>
}


export default FullDataTable
