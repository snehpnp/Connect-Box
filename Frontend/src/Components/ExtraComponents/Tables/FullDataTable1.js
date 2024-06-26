import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const FullDataTable = ({ styles, label, columns, rows, keyField, rowStyle, checkboxSelection }) => {
    var themeMode = localStorage.getItem('theme_mode');

    const backgroundColor = themeMode === 'light' ? 'white' : "#16191c";
    const color = themeMode === 'light' ? 'black' : 'white';

    return (
        <div style={{ height: '100%', backgroundColor: backgroundColor }}>
            {rows.length === 0 ? (
                <div style={{width:"50%",height:"50%", marginLeft:"30%",marginTop:"5%"}}>
          <img src="assets/img/icons/Empty.jpg" alt="No data available"/>
          </div>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[5, 10, 20]} 
                    pagination={true}
                    disableSelectionOnClick 
                    checkboxSelection={checkboxSelection}
                    disableColumnFilter={true} 
                    disableColumnMenu={true}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                    className="custom-data-grid"
                    style={{ border: 'none', fontFamily: 'none', fontWeight: '400', fontSize: '14px', color: color }}
                />
            )}
        </div>
    );
}

export default FullDataTable;
