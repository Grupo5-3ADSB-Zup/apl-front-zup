import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import image from "../../assets/info4.jpeg"

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
         Patrocinadores
        </Typography>
        <Typography color={medium}>AD</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={image}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Mika Cosmedicos</Typography>
        <Typography color={medium}>mikacosmedicos.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Com um toque de pincel mágico, Mika Cosmediocos transforma a maquiagem em verdadeiras poções de beleza, revelando a magia que existe em cada pessoa.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
