import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = ({
  employees,
  projects,
  setRowSelectionModel,
  rowSelectionModel,
 handleSelectEmployees

}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ongoingProjects = employees.map((employee) => {
    return employee.projects.filter((project) => project.completed === false).length
  });
  const completedProjects = employees.map((employee) => {
    return employee.projects.filter((project) => project.completed === true).length
  });

console.log(completedProjects)
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "completed",
      headerName: "Completed",
      flex: 1,
      //return employee.projects.length
      renderCell: (params) => (
        <Typography color={colors.primary[900]}>
          {completedProjects[params.row.id - 1]}
        </Typography>
      ),
    },
    {
      field: "projects",
      headerName: "Working On",
      flex: 1,
      //return employee.projects.length
      renderCell: (params) => (
        <Typography color={colors.primary[900]}>
          {ongoingProjects[params.row.id - 1]}
        </Typography>
      ),
    },
    {
      field: "title",
      headerName: "Job Title",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { title } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              title === "employee"
                ? colors.blueAccent[500]
                : title === "admin"
                ? colors.blueAccent[400]
                : colors.blueAccent[400]
            }
            borderRadius="4px"
          >
            {title === "employee" && <AdminPanelSettingsOutlinedIcon />}
            {title === "employe" && <SecurityOutlinedIcon />}
            {title === "employe" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {title}
            </Typography>
          </Box>
        );
      },
    },
  ];
  console.log(columns[0].field);
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="70vh"
        border={2}
        borderColor={colors.grey[900]}
        borderRadius={2}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.primary[900],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[300],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.grey[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[300],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.blueAccent[400]} !important`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: colors.grey[700],
          },
        }}
      >
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          {...employees}
          rows={employees}
          columns={columns}
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button onClick={handleSelectEmployees} type="submit" color="secondary" variant="contained">
            Assign Project
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
