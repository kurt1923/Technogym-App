import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = React.createContext();

function MyProvider({ children }) {
  const [admin, setAdmin] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
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
  }, [projects]);

  useEffect(() => {
    fetch("/admins")
      .then((res) => res.json())
      .then((data) => setAdmin(data));
  }, []);

  useEffect(() => {
    fetch("/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [projects]);

  useEffect(() => {
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/login");
  }

  console.log(user);

  function handleAddAdmin(newAdmin) {
    const updatedAdmin = [...admin, newAdmin];
    setAdmin(updatedAdmin);
  }

  function addNewProject(addedProject) {
    const updatedProjects = [...projects, addedProject];
    setProjects(updatedProjects);
  }

  function handleAddEmployee(newEmployee) {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
  }

  function handleDeleteEmployee(id) {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  }

  function handleUpdateProject(patchedProject) {
    const updatedProjects = projects.map((project) =>
      project.id === patchedProject.id ? patchedProject : project
    );
    setProjects(updatedProjects);
  }

  function handleDeleteProject(project) {
    const updatedProjects = projects.filter((p) => p.id !== project.id);
    setProjects(updatedProjects);
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
    <MyContext.Provider
      value={{
        admin,
        setAdmin,
        handleAddAdmin,
        handleLogoutClick,
        handleDeleteEmployee,
        handleDeleteProject,
        handleAddEmployee,
        handleUpdateProject,
        addNewProject,
        adminPic,
        selectEmployees,
        setSelectEmployees,
        rowSelectionModel,
        setRowSelectionModel,
        user,
        setUser,
        employees,
        projects,
        selectProjects,
        setSelectProjects,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyProvider, MyContext };
