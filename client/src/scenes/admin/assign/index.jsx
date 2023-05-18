import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Assign = ({
  employees,
  projects,
  selectEmployees,
  addNewProject,
  user,
  setSelectEmployees,
  setRowSelectionModel
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const initialValues = {
    name: "",
    description: "",
    completed: false,
    employee_id: selectEmployees[0].id,
    admin_id: user.id,
    category: "",
  };

  console.log(selectEmployees);
  function handleFormSubmit(values, { resetForm }) {
    fetch(`/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        navigate("/admin/team");
        alert(`Project ${values.name} Added`);
        resetForm();
        setRowSelectionModel([]);
        res.json().then((project) => addNewProject(project));
      } else {
        res.json().then((json) => {
          setError(json.errors);
          alert("All fields must be filled out");
        });
      }
    });
  }

  console.log(selectEmployees[0]);
  console.log(initialValues);


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

  return (
    <Box m="20px">
      <Header title="Assign" subtitle="Assign These Team Members Projects" />
      <Typography component="h1" variant="h5" color="red">
        {" "}
        {error ? "Errors:" + error.map((e) => e).join(", ") : null}
      </Typography>
      <Box
        m="40px 0 20px 0"
        height="fit-content"
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
            backgroundColor: colors.primary[300],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.grey[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[300],
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
          autoHeight
          rows={selectEmployees}
          columns={columns}
        />
      </Box>
      <Header
        title="Create Project"
        subtitle="Add Project Name, Description, and Submit!"
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              backgroundColor={colors.grey[100]}
              padding={2}
              display="grid"
              gap="30px"
              border={2}
              borderColor={colors.grey[900]}
              borderRadius={2}
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
              sx={{
                "& .MuiInputBase-input": {
                  background: colors.primary[400],
                  color: colors.grey[100],
                  borderRadius: "4px",
                },
                "& .MuiTextField-root": {
                  color: colors.primary[100],
                },
                "& .MuiInputBase-root": {
                  background: colors.primary[400],
                  color: colors.primary[900],
                  borderRadius: "4px",
                },
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                // variant="filled"
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2", color: colors.primary[900] }}
              />
              <TextField
                fullWidth
                multiline={true}
                rows={5}
                // variant="filled"
                type="text"
                placeholder="Description"
                // label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                name="category"
                label="Category"
                placeholder="Category"
                select={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
              >
                <MenuItem value="Fire">Fire</MenuItem>
                <MenuItem value="Police">Police</MenuItem>
                <MenuItem value="Military">Military</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Testing">Testing</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <Box display="flex" justifyContent="center" m="10px" p="10px">
                <Button
                  type="submit"
                  sx={{ backgroundColor: colors.blueAccent[300] }}
                  variant="contained"
                >
                  Submit Project
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

// const checkoutSchema = yup.object().shape({
//   name: yup.string().required("required"),
//   description: yup.string().required("required"),
// });

export default Assign;
