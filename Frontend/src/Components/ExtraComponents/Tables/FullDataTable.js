import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const FullDataTable = ({ styles, label, columns, rows, keyField, pagination1, rowStyle }) => {
    var themeMode = localStorage.getItem('theme_mode');

    const backgroundColor = themeMode === 'light' ? 'white' : 'black';
    const Color = themeMode === 'light' ? 'black' : 'white';

    return (
        <>
            <div style={{ height: '100%', backgroundColor: backgroundColor }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    className="custom-data-grid"
                    style={{ border: 'none', fontFamily: 'none', fontWeight: '400', fontSize: '14px', color: Color }}
                />
            </div>
        </>
    );
}

export default FullDataTable;
