import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../../components/StatBox";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PieChart from "../../../components/PieChart";

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
  // const allDatesMoretThanAMonthOld = projects.filter((project) => {
  //   return project.created_at < new Date().setMonth(new Date().getMonth() - 1);
  // });
  // console.log(allDatesMoretThanAMonthOld);

  const totalEmployeesByTitle = employees.reduce((acc, employee) => {
    if (acc[employee.title]) {
      acc[employee.title] += 1;
    } else {
      acc[employee.title] = 1;
    }
    return acc;
  }, {});

  console.log(totalEmployeesByTitle);

  return (
    <Box m="20px">
      {/* {user === null ?         
          ( <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title= "Login to view your dashboard"
          subtitle="Welcome to your dashboard" />
          </Box>):  */}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`${user.firstname} ${user.lastname}`}
          subtitle="Welcome to your dashboard"
        />
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
            subtitle={employeesWithProjects.length + "Assigned"}
            progress={employeesWithProjects.length / employees.length}
            increase={
              ((employeesWithProjects.length * 100) / employees.length).toFixed(
                2
              ) + "%"
            }
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
            increase={
              ((projectsCompleted.length * 100) / projects.length).toFixed(2) +
              "%"
            }
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
            subtitle={userAssignedCompleted.length + " Completed"}
            progress={userAssignedCompleted.length / userAssigned.length}
            increase={
              (
                (userAssignedCompleted.length * 100) /
                userAssigned.length
              ).toFixed(2) + "%"
            }
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
            title="Outstanding Projects"
            subtitle={projects.length - projectsCompleted.length}
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon sx={{ color: colors.grey[100], fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <PieChart isDashboard={true} data ={totalEmployeesByTitle}/> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {/* {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))} */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
