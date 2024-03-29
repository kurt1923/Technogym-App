import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { MyContext } from "../../../MyContext";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const {
    employees,
    setRowSelectionModel,
    rowSelectionModel,
    selectEmployees,
    setSelectEmployees,
    handleDeleteEmployee,
    user,
  } = useContext(MyContext);
  console.log(user);

  function handleSelectEmployees(rowSelectionModel) {
    const selectedEmployees = employees.filter((employee) => {
      return rowSelectionModel.includes(employee.id);
    });
    rowSelectionModel.length === 0
      ? setSelectEmployees([])
      : setSelectEmployees(selectedEmployees);
  }
  function navToAssign() {
    navigate("/admin/team/assign");
  }
  function deleteEmployee() {
    fetch(`/employees/${selectEmployees[0].id}`, {
      method: "DELETE",
    });
    alert(
      `Employee ${selectEmployees[0].firstname} ${selectEmployees[0].lastname} Deleted`
    );
    setSelectEmployees([]);
    handleDeleteEmployee(selectEmployees[0].id);
  }

  console.log(rowSelectionModel);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "img",
      headerName: "Image",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <img src={params.value} alt="employee" width="50px" height="50px" />
      ),
    },
    {
      field: "lastname",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "completedProjects",
      headerName: "Completed",
      flex: 1,
    },
    {
      field: "incompleteProjects",
      headerName: "Working On",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Job Title",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { title } }) => {
        return (
          <Box
            width="80%"
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
            color: colors.primary[900],
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.primary[900],
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[300],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.grey[50],
            border: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[300],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.blueAccent[400]} !important`,
            border: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[900]} !important`,
            border: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: colors.grey[700],
            border: "none",
          },
          img: {
            width: "5vwv",
            height: "5vw",
            borderRadius: "90%",
            border: "2px solid #fff",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
            handleSelectEmployees(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          {...employees}
          rows={employees}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {selectEmployees.length === 0 ? (
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => {
              alert("Select an Employee By Clicking the Checkbox");
            }}
            type="submit"
            sx={{
              backgroundColor: colors.blueAccent[300],
              width: "200px",
              mr: "10px",
            }}
            variant="contained"
          >
            Select Employee
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={navToAssign}
            type="submit"
            variant="contained"
            sx={{
              width: "200px",
              mr: "10px",
              backgroundColor: colors.blueAccent[300],
            }}
          >
            Assign New Project
          </Button>
          <Button
            onClick={deleteEmployee}
            type="submit"
            variant="contained"
            sx={{
              width: "200px",
              mr: "10px",
              backgroundColor: colors.blueAccent[300],
            }}
          >
            Delete Employee
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Team;
