import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
import { DataGrid } from '@mui/x-data-grid';


const FullDataTable = ({
  styles,
  label,
  columns,
  rows,
  keyField,
  rowStyle,
  checkboxSelection,
}) => {
  var themeMode = localStorage.getItem("theme_mode");

  const rowsWithIds = rows.map((row, index) => ({ ...row, id: index }));

  const backgroundColor = themeMode === "light" ? "white" : "#16191c";
  const Color = themeMode === "light" ? "black" : "white";




 
  return (
    <>

      <DataGrid
        rows={rowsWithIds}
        columns={columns}
        
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20,50]}
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
        pageSizeOptions={[10, 20,50]}
        className="custom-data-grid"
        style={{
          border: "none",
          fontFamily: "none",
          fontWeight: "400",
          fontSize: "14px",
          // color: Color,
        }}
      />
      {/* </div> */}
    </>
  );
};

export default FullDataTable;
