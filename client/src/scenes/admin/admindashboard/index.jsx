import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";



const AdminDashboard = ({ user }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

console.log(user)
    return (
        <Box m="20px">
          {user === null ?         
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title= "Login to view your dashboard"
          subtitle="Welcome to your dashboard" />
          </Box>:
          
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
          }
        </Box>
    );
  };

export default AdminDashboard;