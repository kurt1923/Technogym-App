import { Box,  useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";

const Projects = ({
  employees,
  projects,
  handleDeleteProject,
  selectProjects,
  setSelectProjects,
  rowSelectionModel,
  setRowSelectionModel,
  admin,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const complete = (params) => {
    return params.row.completed ? "Completed" : "Ongoing";
  };
  const getEmployeeIdName = (params) => {
    const findEmp = employees.filter((employee) => {
      return employee.id === params.row.employee_id;
    });
    return findEmp[0].firstname + " " + findEmp[0].lastname;
  };
  const getAdminIdName = (params) => {
    const findAdmin = admin.filter((a) => {
      return a.id === params.row.admin_id;
    });
    return findAdmin[0].firstname + " " + findAdmin[0].lastname;
  };

  const createDate = (params) => {
    const date = new Date(params.row.created_at);
    return date.toDateString();
  };


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
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "employeeName",
      headerName: "Assigned To",
      flex: 1,
    },
    {
      field: "adminName",
      headerName: "Assigned By",
      flex: 1,
    },
    {
      field: "completed",
      headerName: "Completed",
      flex: 1,
      valueGetter: complete,
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      valueGetter: createDate,
    },
  ];

  function deleteProject() {
    fetch(`/projects/${selectProjects[0].id}`, {
      method: "DELETE",
    });
    handleDeleteProject(selectProjects[0].id);
    setSelectProjects([]);
  }

  function handleSelectProjects(rowSelectionModel) {
    const selectedProjects = projects.filter((project) => {
      return rowSelectionModel.includes(project.id);
    });
    rowSelectionModel.length === 0
    ? setSelectProjects([])
    : setSelectProjects(selectedProjects);
  }

  function navToEdit() {
    navigate("/admin/projects/editProject");
  }

  console.log(selectProjects);
  console.log(rowSelectionModel)

  return (
    <Box m="20px">
      <Header title="PROJECTS" subtitle="List of TAPS Projects" />
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
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.primary[900],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[300],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.grey[50],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[300],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.blueAccent[400]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[900]} !important`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: colors.grey[700],
          },
        }}
      >
        <DataGrid
          checkboxSelection={true}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
            handleSelectProjects(newRowSelectionModel)
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
            onClick={() => {alert ("Select a Project By Clicking the Checkbox")}}
            type="submit"
            sx={{
              backgroundColor: colors.blueAccent[300],
              width: "200px",
              mr: "10px",
            }}
            variant="contained"
          >
            Select Project
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={navToEdit}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[300],
              width: "200px",
              mr: "10px",
            }}
          >
            Edit Project
          </Button>
          <Button
            onClick={deleteProject}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[300],
              width: "200px",
              mr: "10px",
            }}
          >
            Delete Project
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Projects;
