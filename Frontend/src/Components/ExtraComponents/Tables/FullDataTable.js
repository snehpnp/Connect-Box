import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const FullDataTable = ({
  styles,
  label,
  columns,
  rows,
  keyField,
  rowStyle,
  checkboxSelection,
  paginationSize,
}) => {
  const themeMode = localStorage.getItem("theme_mode") || "light";

  const rowsWithIds = rows.map((row, index) => ({ ...row, id: index }));

  const backgroundColor = themeMode === "light" ? "white" : "#16191c";
  const color = themeMode === "light" ? "black" : "white";

  return (


    <Box sx={{ height: paginationSize ? "400px" : "100%", width: "100%", position: "relative" }}>
    
      {rows.length > 0 ? (
        <DataGrid
          rows={rowsWithIds}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 50, 100]}
          pagination={true}
          disableSelectionOnClick
          checkboxSelection={checkboxSelection}
          disableColumnFilter={true}
          disableColumnMenu={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: paginationSize ? paginationSize : 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          className="custom-data-grid"
          style={{
            border: "none",
            fontFamily: "none",
            fontWeight: "400",
            fontSize: "14px",
            backgroundColor: backgroundColor,
            color: color,
          }}
          headerClassName="custom-header" 
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: backgroundColor,
            color: color,
          }}
        >
          <Typography>
          <div style={{width:"50%",height:"50%", marginLeft:"30%",marginTop:"5%"}}>
          <img src="assets/img/icons/Empty.jpg" alt="No data available"/>
          </div>

          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FullDataTable;
