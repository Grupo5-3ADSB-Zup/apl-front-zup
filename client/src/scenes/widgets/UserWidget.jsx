import { ManageAccountsOutlined, EditOutlined, VerifiedUserOutlined} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/twitter.png"
import image2 from "../../assets/linkedin.png"
import axios from "axios";


const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main; 

  const getUse = async () => {
    try {
      const response = await axios.get(`http://44.219.155.152:8080/usuario/${userId}`,  {
      });
      setUser(response.data);
      console.log("chegou");
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error.message);
    }
  };

  useEffect(() => {
    getUse();
  }, []); 

  if (!user) {
    return null;
  }

  const {
    nome,
    influencer 
  } = user;

  return (
    <WidgetWrapper>
          
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage />
              <Box>
                <Typography
                  variant="h4"
                  color={main}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
              {nome} {influencer && <VerifiedUserOutlined />}
                </Typography>
              </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
          </FlexBetween>
          
          <Box p="1rem 0">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
              Redes de contato
            </Typography>

            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="1rem">
                <img src={image} alt="twitter" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Twitter
                  </Typography>
                  <Typography color={medium}>Rede Social</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>

            <FlexBetween gap="1rem">
              <FlexBetween gap="1rem">
                <img src={image2} alt="linkedin" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Plataforma de network</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>
          </Box>
        </WidgetWrapper>
  );
};

export default UserWidget;
