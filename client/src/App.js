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
import AddEmployee from "./scenes/admin/addEmployee";
import Assign from "./scenes/admin/assign";
import EditProject from "./scenes/admin/editProject";
import Login from "./scenes/admin/login";
import AdminDashboard from "./scenes/admin/admindashboard";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [selectProjects, setSelectProjects] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [user, setUser] = useState([]);

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

  useEffect(() => {
    fetch("/admins")
      .then((res) => res.json())
      .then((data) => setAdmin(data));
  }, []);
console.log(admin)
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
      : navigate("/admin/team/assign");
    setSelectEmployees(selectedEmployees);
    // setRowSelectionModel([]);
    // setSelectEmployees([]);
  }
  console.log(user)

  function handleUpdateEmployees(patchedEmployee) {
    const updatedEmployees = employees.map((employee) =>
      employee.id === patchedEmployee.id ? patchedEmployee : employee
    );
    setEmployees(updatedEmployees);
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
          <Sidebar isSidebar={isSidebar} user={user} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/admin/team"
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
                path="/admin/team/assign"
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
                path="/admin/projects"
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
                path="/admin/projects/editProject"
                element={
                  <EditProject
                    projects={projects}
                    selectProjects={selectProjects}
                    handleUpdateProject={handleUpdateProject}
                  />
                }
              />
              <Route
                path="/admin/addEmployee"
                element={
                  <AddEmployee handleUpdateEmployees={handleUpdateEmployees} />
                }
              />
              <Route
                path="/login"
                element={
                  <Login user={user} setUser={setUser} />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
