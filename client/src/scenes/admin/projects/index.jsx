import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

const Projects = ({ projects, handleDeleteProject, selectProjects, setSelectProjects }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const complete = projects.completed ? "Complete" : "Ongoing";
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
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
        <Typography color={colors.primary[900]}>{complete}</Typography>
      ),
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
    },
  ];

  function deleteProject() {
    fetch(`/projects/${selectProjects[0].id}`, {
      method: "DELETE",
    });
    handleDeleteProject(selectProjects[0].id);
    setSelectProjects([]);
  }

  function handleSelectProjects() {
    const selectedProjects = projects.filter((project) => {
      return rowSelectionModel.includes(project.id);
    });
    setSelectProjects(selectedProjects);
  }

  function navToEdit() {
    navigate("/projects/editProject");
  }

  console.log(selectProjects);

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
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          {...projects}
          rows={projects}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {selectProjects.length === 0 ? (
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={handleSelectProjects}
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ width: "200px", mr: "10px" }}
          >
            Select Project
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={navToEdit}
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ width: "200px", mr: "10px" }}
          >
            Edit Project
          </Button>
          <Button
            onClick={deleteProject}
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ width: "200px", mr: "10px" }}
          >
            Delete Project
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Projects;
