import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState } from "react";

const Projects = ({ projects }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const complete = projects.completed ? "Complete" : "Ongoing";
  const [selectProjects, setSelectProjects] = useState([]);

  const columns = [
    { field: "id", 
    headerName: "ID",
    flex: 0.5,
    cellClassName: "name-column--cell", 
  },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "completed",
      headerName: "Completed",
      flex: 1,
      renderCell: () => (
        <Typography color={colors.primary[900]}>
          {complete}
        </Typography>
      ),
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <Header title="PROJECTS" subtitle="List of TAPS Projects" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        border={2}
        borderColor={colors.grey[900]}
        borderRadius={2}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            color: colors.primary[900],
          },
          "& .name-column--cell": {
            color: colors.primary[900],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[300],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.grey[50],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[300],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.blueAccent[400]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: colors.grey[700],
          },
        }}
      >
        <DataGrid checkboxSelection rows={projects} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Projects;