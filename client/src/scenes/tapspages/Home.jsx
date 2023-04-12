import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";


const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    
    return (
        <Box display="flex" justifyContent="center" p={2} backgroundColor= {colors.primary[500]} zIndex ={2} >
            <Header title= "Admin Employee Management is all thats currently built"></Header>
            
        </Box>
    );
    };

export default Home;