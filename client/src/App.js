import { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
// import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Projects from "./scenes/projects";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Form from "./scenes/form";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

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

  console.log(employees[projects])
  console.log(projects)
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
              <Route path="/team" element={<Team employees={employees} projects={projects} />} />
              <Route path="/contacts" element={<Contacts employees={employees}/>} />
              <Route path="/projects" element={<Projects projects={projects}/>} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
