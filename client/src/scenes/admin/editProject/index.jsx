import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, TextField } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const EditProject = ({ projects, selectProjects, handleUpdateProject }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [initialValues, setInitialValues] = useState({
    name: selectProjects[0].name,
    description: selectProjects[0].description,
    completed: false,
    employee_id: selectProjects[0].employee_id,
    admin_id: 1,
  });


  function updateProject(values) {
    fetch(`/projects/${selectProjects[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((data) => {
        handleUpdateProject(data);
        alert(`Project ${values.name} Updated`);
      });
  }
  console.log(selectProjects)
  return (
    <Box m="20px">
      <Header
        title="Edit Project"
        subtitle="Add Project Name, Description, and Submit!"
      />
      <Formik
        onSubmit={updateProject}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                variant="filled"
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
                rows={4}
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <Box display="flex" justifyContent="center" m="10px" p="10px">
                <Button type="submit" sx={{ backgroundColor: colors.blueAccent[300] }} variant="contained">
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

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
});

export default EditProject;
