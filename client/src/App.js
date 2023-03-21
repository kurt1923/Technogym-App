import { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
// import Dashboard from "./scenes/dashboard";
import Team from "./scenes/admin/team";
import Contacts from "./scenes/contacts";
import Projects from "./scenes/admin/projects";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Form from "./scenes/addEmployee";
import Assign from "./scenes/admin/assign";
import EditProject from "./scenes/admin/editProject";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [selectProjects, setSelectProjects] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  useEffect(() => {
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  function addNewProject(addedProject) {
    const updatedProjects = [...projects, addedProject];
    setProjects(updatedProjects);
  }

  function handleUpdateProject(patchedProject) {
    const updatedProjects = projects.map((project) =>
      project.id === patchedProject.id ? patchedProject : project
    );
    setProjects(updatedProjects);
  }
  // function updateQuantity(patchedItem) {
  //   const updatedQuantity = storeItems.map((item) =>
  //     item.id === patchedItem.id ? patchedItem : item
  //   );

  function handleSelectEmployees() {
    const selectedEmployees = employees.filter((employee) => {
      return rowSelectionModel.includes(employee.id);
    });
    rowSelectionModel.length === 0
      ? alert("Please Select a Project.")
      : navigate("/team/assign");
    setSelectEmployees(selectedEmployees);
    // setRowSelectionModel([]);
    // setSelectEmployees([]);
  }



  function handleDeleteProject(id) {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route
                path="/team"
                element={
                  <Team
                    employees={employees}
                    projects={projects}
                    handleSelectEmployees={handleSelectEmployees}
                    rowSelectionModel={rowSelectionModel}
                    setRowSelectionModel={setRowSelectionModel}
                  />
                }
              />
              <Route
                path="/team/assign"
                element={
                  <Assign
                    employees={employees}
                    selectEmployees={selectEmployees}
                    addNewProject={addNewProject}
                  />
                }
              />
              <Route
                path="/contacts"
                element={<Contacts employees={employees} />}
              />
              <Route
                path="/projects"
                element={
                  <Projects
                  projects={projects}
                  handleDeleteProject={handleDeleteProject}
                  selectProjects={selectProjects}
                  setSelectProjects={setSelectProjects}
                  />
                }
              />
                <Route
                  path="/projects/editProject"
                  element={
                    <EditProject
                      projects={projects}
                      selectProjects={selectProjects}
                      handleUpdateProject={handleUpdateProject}
                    />
                  }
                />
              <Route path="/addEmployee" element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
