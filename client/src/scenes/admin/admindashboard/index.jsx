import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../../components/StatBox";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";



const AdminDashboard = ({ user, projects, employees, admin }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const employeesWithProjects = employees.filter((employee) => {
      return employee.projects.length > 0;
    });
    const projectsCompleted = projects.filter((project) => {
      return project.completed === true;
    });

    const userAssigned = projects.filter((project) => {
      return project.admin_id === user.id;
    });

    const userAssignedCompleted = projects.filter((project) => {
      return project.admin_id === user.id && project.completed === true;
    });
 


    return (
      <Box m="20px">
      {/* {user === null ?          */}
          {/* <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title= "Login to view your dashboard"
          subtitle="Welcome to your dashboard" />
          </Box>: */}
          
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title= {`${user.firstname} ${user.lastname}`}
          subtitle="Welcome to your dashboard" />
          <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={employees.length + " Employees"}
            subtitle="Assigned"
            progress={employeesWithProjects.length / employees.length}
            increase={(employeesWithProjects.length / employees.length).toFixed(2) * 100 + "%"}
            icon={
              <PersonAddIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={projects.length + " Projects"}
            subtitle={projectsCompleted.length + " Completed"}
            progress={projectsCompleted.length / projects.length}
            increase={(projectsCompleted.length / projects.length).toFixed(2) * 100 + "%"}
            icon={
              <ReceiptOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userAssigned.length + ` ${user.lastname} Projects`}
            subtitle="Completed"
            progress={userAssignedCompleted.length / userAssigned.length}
            increase={(userAssignedCompleted.length / userAssigned.length).toFixed(2) * 100 + "%"}
            icon={
              <PersonAddIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="My Employees"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
              
          
          
        </Box>
      </Box>
    );
  };

export default AdminDashboard;