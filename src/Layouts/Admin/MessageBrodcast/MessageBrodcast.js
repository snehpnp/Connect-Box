import React from 'react';

function MessageBrodcast() {

    const columns = [
        { label: 'Invoice No', field: 'invoiceNo' },
        { label: 'Category', field: 'category' },
        { label: 'Created On', field: 'createdOn' },
        { label: 'Total Amount', field: 'totalAmount' },
        { label: 'Paid Amount', field: 'paidAmount' },
        { label: 'Payment Mode', field: 'paymentMode' },
        { label: 'Balance', field: 'balance' },
        { label: 'Due Date', field: 'dueDate' },
        { label: 'Status', field: 'status' }
    ];

    const rows = [
        { invoiceNo: '#4987', category: 'Food', createdOn: '23 Mar 2023', totalAmount: '$1,54,220', paidAmount: '$1,50,000', paymentMode: 'Cash', balance: '$2,54,00', dueDate: '25 Mar 2023', status: <span className="badge bg-success-light">Paid</span> },
        { invoiceNo: '#4987', category: 'Food', createdOn: '23 Mar 2023', totalAmount: '$1,54,220', paidAmount: '$1,50,000', paymentMode: 'Cash', balance: '$2,54,00', dueDate: '25 Mar 2023', status: <span className="badge bg-success-light">Paid</span> },
        { invoiceNo: '#4987', category: 'Food', createdOn: '23 Mar 2023', totalAmount: '$1,54,220', paidAmount: '$1,50,000', paymentMode: 'Cash', balance: '$2,54,00', dueDate: '25 Mar 2023', status: <span className="badge bg-success-light">Paid</span> },
        { invoiceNo: '#4987', category: 'Food', createdOn: '23 Mar 2023', totalAmount: '$1,54,220', paidAmount: '$1,50,000', paymentMode: 'Cash', balance: '$2,54,00', dueDate: '25 Mar 2023', status: <span className="badge bg-success-light">Paid</span> },
        { invoiceNo: '#4987', category: 'Food', createdOn: '23 Mar 2023', totalAmount: '$1,54,220', paidAmount: '$1,50,000', paymentMode: 'Cash', balance: '$2,54,00', dueDate: '25 Mar 2023', status: <span className="badge bg-success-light">Paid</span> },
        { invoiceNo: '#4987', category: 'Food', createdOn: '23 Mar 2023', totalAmount: '$1,54,220', paidAmount: '$1,50,000', paymentMode: 'Cash', balance: '$2,54,00', dueDate: '25 Mar 2023', status: <span className="badge bg-success-light">Paid</span> }

    ];

    return (
        <>
            <div className="table-responsive">
                <table className="table table-stripped table-hover datatable">
                    <thead className="thead-light">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>
                                    <label className="custom_check">
                                        <input type="checkbox" name="invoice" />
                                        <span className="checkmark" />
                                    </label>
                                    {column.label}
                                </th>
                            ))}
                            <th className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>
                                        {row[column.field]}
                                    </td>
                                ))}
                                <td>
                                    {/* Dropdown actions here */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MessageBrodcast;
