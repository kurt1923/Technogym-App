import { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Home from "./scenes/tapspages/Home";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [selectProjects, setSelectProjects] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/login");
  }

  useEffect(() => {
    fetch("/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  useEffect(() => {
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [employees]);

  useEffect(() => {
    fetch("/admins")
      .then((res) => res.json())
      .then((data) => setAdmin(data));
  }, []);

  console.log(user);

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

  function handleAddEmployee(newEmployee) {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
  }
    

  function handleDeleteProject(id) {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  }

  function handleDeleteEmployee(id) {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  }

  const adminPic = () => {
    if (user === null) {
      return "./adminpics/TAPS.jpg";
    }
    if (user.lastname === "Vermillion") {
      return "./adminpics/Vermillion.jpg";
    }
    if (user.lastname === "Purvis") {
      return "./adminpics/Purvis.jpg";
    }
    if (user.lastname === "Meadows") {
      return "./adminpics/Meadows.jpg";
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar
            isSidebar={isSidebar}
            user={user}
            handleLogoutClick={handleLogoutClick}
            adminPic={adminPic}
          />
          <main className="content">
            <Topbar
              setIsSidebar={setIsSidebar}
              handleLogoutClick={handleLogoutClick}
              user={user}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home/>
                }
              />
              {user !== null ? (
              <>
              <Route
                path="/admin"
                element={
                  <AdminDashboard
                    user={user}
                    projects={projects}
                    employees={employees}
                    admin={admin}
                  />
                }
              />
              <Route
                path="/admin/team"
                element={
                  <Team
                    employees={employees}
                    projects={projects}
                    selectEmployees={selectEmployees}
                    setSelectEmployees={setSelectEmployees}
                    rowSelectionModel={rowSelectionModel}
                    setRowSelectionModel={setRowSelectionModel}
                    handleDeleteEmployee={handleDeleteEmployee}
                    user={user}
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
                    user={user}
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
                    employees={employees}
                    rowSelectionModel={rowSelectionModel}
                    setRowSelectionModel={setRowSelectionModel}
                    admin={admin}
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
                  <AddEmployee handleAddEmployee={handleAddEmployee} />
                }
              />
              </>
              ) : null}
              <Route
                path="/login"
                element={<Login user={user} setUser={setUser} />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
