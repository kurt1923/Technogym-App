import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
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
import AddAdmin from "./scenes/admin/addadmin";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";

function App() {
  const [theme, colorMode] = useMode();
  const { user } = useContext(MyContext);

  console.log(user);

  // function handleUpdateProject(patchedProject) {
  //   const updatedProjects = projects.map((project) =>
  //     project.id === patchedProject.id ? patchedProject : project
  //   );
  //   setProjects(updatedProjects);
  // }

  // function handleDeleteProject(id) {
  //   const updatedProjects = projects.filter((project) => project.id !== id);
  //   setProjects(updatedProjects);
  // }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              {user !== null || undefined ? (
                <>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/team" element={<Team />} />
                  <Route path="/admin/team/assign" element={<Assign />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/admin/projects" element={<Projects />} />
                  <Route
                    path="/admin/projects/editProject"
                    element={<EditProject />}
                  />
                  <Route path="/admin/addEmployee" element={<AddEmployee />} />
                </>
              ) : null}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<AddAdmin />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
