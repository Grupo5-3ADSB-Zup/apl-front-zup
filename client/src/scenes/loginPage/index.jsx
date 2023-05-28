import { Box, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  return (
    <div className="login">
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      
      >
        <Box
          width={isNonMobileScreens ? "30%" : "93%"}
          p={isNonMobileScreens ? "2rem" : "1rem"}
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
        
          <Form />
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
